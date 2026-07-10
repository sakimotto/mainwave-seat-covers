"use server"

import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import type { Cart, CartItem } from "@/types"

function generateSessionId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get("cart_session")?.value
  if (!sessionId) {
    sessionId = generateSessionId()
  }
  return sessionId
}

async function getOrCreateCart(sessionId: string) {
  let cart = await prisma.cart.findUnique({ where: { sessionId } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId } })
  }
  return cart
}

export async function addToCart(
  variantId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const sessionId = await getOrCreateSessionId()
    const cart = await getOrCreateCart(sessionId)

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_variantId: { cartId: cart.id, variantId } },
    })

    if (existing) {
      await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      })
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, variantId, quantity },
      })
    }

    const cookieStore = await cookies()
    cookieStore.set("cart_session", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })

    return { success: true }
  } catch {
    return { success: false, error: "Failed to add item to cart" }
  }
}

export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  try {
    if (quantity < 1) {
      return { success: false, error: "Quantity must be at least 1" }
    }
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    })
    return { success: true }
  } catch {
    return { success: false, error: "Failed to update item" }
  }
}

export async function removeCartItem(
  itemId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.cartItem.delete({ where: { id: itemId } })
    return { success: true }
  } catch {
    return { success: false, error: "Failed to remove item" }
  }
}

export async function getCart(): Promise<Cart | null> {
  try {
    const sessionId = await getOrCreateSessionId()
    const cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: {
        items: {
          include: {
            variant: {
              include: { product: true },
            },
          },
        },
      },
    })

    if (!cart || cart.items.length === 0) {
      return null
    }

    const items: CartItem[] = cart.items.map((item) => ({
      id: item.id,
      variantId: item.variantId,
      productId: item.variant.productId,
      productName: item.variant.product.name,
      productSlug: item.variant.product.slug,
      productImage: item.variant.product.image,
      color: item.variant.color,
      size: item.variant.size ?? undefined,
      sku: item.variant.sku,
      price: Number(item.variant.price),
      quantity: item.quantity,
    }))

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return { id: cart.id, items, subtotal, itemCount }
  } catch {
    return null
  }
}