"use server"

import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { rateLimit } from "@/lib/rate-limit"

async function callerIp(): Promise<string> {
  const headerStore = await headers()
  return headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
}

export type TrackedOrder = {
  reference: string
  status: string
  date: string
  total: number
  items: { name: string; detail: string; quantity: number; price: number }[]
}

const GENERIC_ERROR = "No order found for that order number and email combination."

export async function trackOrder(input: {
  orderNumber: string
  email: string
}): Promise<{ success: boolean; order?: TrackedOrder; error?: string }> {
  const { ok } = rateLimit({ key: `track:${await callerIp()}`, limit: 5, windowMs: 60_000 })
  if (!ok) return { success: false, error: "Too many attempts. Please wait a minute." }

  const orderNumber = input.orderNumber.trim().toLowerCase().replace(/^#/, "")
  const email = input.email.trim().toLowerCase()
  if (!orderNumber || !email) return { success: false, error: GENERIC_ERROR }

  const order = await prisma.order.findFirst({
    where: { id: { endsWith: orderNumber } },
    include: {
      customer: true,
      items: { include: { variant: { include: { product: true } } } },
    },
  })

  // Uniform failure — no order enumeration
  if (!order || order.customer.email.toLowerCase() !== email) {
    return { success: false, error: GENERIC_ERROR }
  }

  return {
    success: true,
    order: {
      reference: order.id.slice(-8).toUpperCase(),
      status: order.status,
      date: order.createdAt.toISOString(),
      total: Number(order.total),
      items: order.items.map((item) => ({
        name: item.variant.product.name,
        detail: `${item.variant.color}${item.variant.size ? ` / ${item.variant.size}` : ""}`,
        quantity: item.quantity,
        price: Number(item.price),
      })),
    },
  }
}

export async function requestReturn(input: {
  orderNumber: string
  email: string
  reason?: string
}): Promise<{ success: boolean; error?: string }> {
  const { ok } = rateLimit({ key: `track:${await callerIp()}`, limit: 5, windowMs: 60_000 })
  if (!ok) return { success: false, error: "Too many attempts. Please wait a minute." }

  // Re-verify ownership before logging the return
  const tracked = await trackOrder({ orderNumber: input.orderNumber, email: input.email })
  if (!tracked.success || !tracked.order) {
    return { success: false, error: GENERIC_ERROR }
  }

  await prisma.inquiry.create({
    data: {
      name: "Return Request",
      email: input.email.trim().toLowerCase(),
      subject: `Return Request — Order #${tracked.order.reference}`,
      message: `Customer requested a return for order #${tracked.order.reference}.\nReason: ${input.reason?.trim() || "Not provided"}`,
    },
  })

  return { success: true }
}
