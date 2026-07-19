"use server"

import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"

export async function subscribe(input: {
  email: string
  preferences: string[]
  locale?: string
  _gotcha?: string
}): Promise<{ success: boolean; error?: string }> {
  const headerStore = await headers()
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  const { ok } = rateLimit({ key: `subscribe:${ip}`, limit: 5, windowMs: 60_000 })
  if (!ok) return { success: false, error: "Too many attempts. Please wait a minute." }

  // Honeypot — pretend success to bots
  if (input._gotcha) return { success: true }

  const email = input.email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Enter a valid email address" }
  }

  await prisma.subscriber.upsert({
    where: { email },
    update: { preferences: input.preferences, locale: input.locale, active: true },
    create: { email, preferences: input.preferences, locale: input.locale },
  })

  return { success: true }
}
