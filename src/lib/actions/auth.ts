"use server"

import { cookies, headers } from "next/headers"
import { scrypt, randomBytes, timingSafeEqual } from "crypto"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"
import type { Customer, CustomerVehicle, CreditEntry, Vehicle } from "@/generated/prisma/client"

const SESSION_COOKIE = "session_token"
const SESSION_DAYS = 30
const SCRYPT_N = 16384

function scryptAsync(password: string, salt: string): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scrypt(password, salt, 64, { N: SCRYPT_N }, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  )
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex")
  const derived = await scryptAsync(password, salt)
  return `${salt}:${derived.toString("hex")}`
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":")
  if (!salt || !hash) return false
  const derived = await scryptAsync(password, salt)
  const expected = Buffer.from(hash, "hex")
  return derived.length === expected.length && timingSafeEqual(derived, expected)
}

function generateReferralCode(): string {
  return `MW-${randomBytes(4).toString("hex").toUpperCase()}`
}

async function createSession(customerId: string): Promise<void> {
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  await prisma.session.create({ data: { token, customerId, expiresAt } })
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
    path: "/",
  })
}

/** Merge the anonymous cart_session cart into the customer's cart. */
async function mergeGuestCart(customerId: string): Promise<void> {
  const cookieStore = await cookies()
  const guestSessionId = cookieStore.get("cart_session")?.value
  if (!guestSessionId) return

  const guestCart = await prisma.cart.findUnique({
    where: { sessionId: guestSessionId },
    include: { items: true },
  })
  if (!guestCart || guestCart.items.length === 0) return

  let customerCart = await prisma.cart.findUnique({ where: { customerId } })
  if (!customerCart) {
    customerCart = await prisma.cart.create({ data: { customerId } })
  }

  for (const item of guestCart.items) {
    await prisma.cartItem.upsert({
      where: { cartId_variantId: { cartId: customerCart.id, variantId: item.variantId } },
      update: { quantity: { increment: item.quantity } },
      create: { cartId: customerCart.id, variantId: item.variantId, quantity: item.quantity },
    })
  }

  await prisma.cart.delete({ where: { id: guestCart.id } })
  cookieStore.delete("cart_session")
}

export type SessionCustomer = Customer & {
  garage: (CustomerVehicle & { vehicle: Vehicle })[]
  creditEntries: CreditEntry[]
}

/** Current signed-in customer (with garage), or null. */
export async function getSessionCustomer(): Promise<SessionCustomer | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null

  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      customer: {
        include: {
          garage: { include: { vehicle: true } },
          creditEntries: { orderBy: { createdAt: "desc" } },
        },
      },
    },
  })
  if (!session) return null
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {})
    return null
  }
  return session.customer
}

export async function signUp(input: {
  name: string
  email: string
  password: string
}): Promise<{ success: boolean; error?: string }> {
  const email = input.email.trim().toLowerCase()
  const name = input.name.trim()

  if (!name) return { success: false, error: "Name is required" }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Enter a valid email address" }
  }
  if (input.password.length < 8) {
    return { success: false, error: "Password must be at least 8 characters" }
  }

  const existing = await prisma.customer.findUnique({ where: { email } })
  if (existing) {
    // Deliberately vague — don't confirm whether an account exists
    return { success: false, error: "Could not create account. Try signing in instead." }
  }

  const customer = await prisma.customer.create({
    data: {
      email,
      name,
      password: await hashPassword(input.password),
      referralCode: generateReferralCode(),
    },
  })

  await mergeGuestCart(customer.id)
  await createSession(customer.id)
  return { success: true }
}

export async function logIn(input: {
  email: string
  password: string
}): Promise<{ success: boolean; error?: string }> {
  const headerStore = await headers()
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const { ok } = rateLimit({ key: `login:${ip}`, limit: 5, windowMs: 60_000 })
  if (!ok) {
    return { success: false, error: "Too many attempts. Please wait a minute." }
  }

  const email = input.email.trim().toLowerCase()
  const customer = await prisma.customer.findUnique({ where: { email } })

  // Uniform failure — no account enumeration
  if (!customer?.password || !(await verifyPassword(input.password, customer.password))) {
    return { success: false, error: "Invalid email or password" }
  }

  await mergeGuestCart(customer.id)
  await createSession(customer.id)
  return { success: true }
}

export async function logOut(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (token) {
    await prisma.session.deleteMany({ where: { token } })
  }
  cookieStore.delete(SESSION_COOKIE)
}
