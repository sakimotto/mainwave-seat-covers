"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getSessionCustomer } from "@/lib/actions/auth"
import type { Customer } from "@/generated/prisma/client"
import type { Cart, CartItem } from "@/types"

type CartContext = { customerId: string } | { sessionId: string }

async function getOrCreateGuestSessionId(): Promise<string> {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get("cart_session")?.value
  if (!sessionId) {
    sessionId = crypto.randomUUID()
  }
  return sessionId
}

async function getCartContext(): Promise<CartContext> {
  const customer = await getSessionCustomer()
  if (customer) return { customerId: customer.id }
  return { sessionId: await getOrCreateGuestSessionId() }
}

async function getOrCreateCart(ctx: CartContext) {
  if ("customerId" in ctx) {
    let cart = await prisma.cart.findUnique({ where: { customerId: ctx.customerId } })
    if (!cart) {
      cart = await prisma.cart.create({ data: { customerId: ctx.customerId } })
    }
    return cart
  }
  let cart = await prisma.cart.findUnique({ where: { sessionId: ctx.sessionId } })
  if (!cart) {
    cart = await prisma.cart.create({ data: { sessionId: ctx.sessionId } })
  }
  return cart
}

function scopeWhere(ctx: CartContext) {
  return "customerId" in ctx ? { customerId: ctx.customerId } : { sessionId: ctx.sessionId }
}

async function persistGuestCookie(ctx: CartContext) {
  if ("sessionId" in ctx) {
    const cookieStore = await cookies()
    cookieStore.set("cart_session", ctx.sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    })
  }
}

export async function addToCart(
  variantId: string,
  quantity: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const ctx = await getCartContext()
    const cart = await getOrCreateCart(ctx)

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

    await persistGuestCookie(ctx)

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
    const ctx = await getCartContext()
    const result = await prisma.cartItem.updateMany({
      where: { id: itemId, cart: scopeWhere(ctx) },
      data: { quantity },
    })
    if (result.count === 0) {
      return { success: false, error: "Item not found" }
    }
    return { success: true }
  } catch {
    return { success: false, error: "Failed to update item" }
  }
}

export async function removeCartItem(
  itemId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const ctx = await getCartContext()
    const result = await prisma.cartItem.deleteMany({
      where: { id: itemId, cart: scopeWhere(ctx) },
    })
    if (result.count === 0) {
      return { success: false, error: "Item not found" }
    }
    return { success: true }
  } catch {
    return { success: false, error: "Failed to remove item" }
  }
}

export async function getCart(): Promise<Cart | null> {
  try {
    const ctx = await getCartContext()
    const cart = await prisma.cart.findFirst({
      where: scopeWhere(ctx),
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

export async function getCartSummary(): Promise<{ itemCount: number; subtotal: number }> {
  try {
    const cart = await getCart()
    if (!cart) return { itemCount: 0, subtotal: 0 }
    return { itemCount: cart.itemCount, subtotal: cart.subtotal }
  } catch {
    return { itemCount: 0, subtotal: 0 }
  }
}

export async function placeOrder(formData: {
  name: string
  email: string
  phone: string
  address: string
  suburb: string
  state: string
  postcode: string
  notes?: string
}): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const cart = await getCart()
    if (!cart || cart.items.length === 0) {
      return { success: false, error: "Cart is empty" }
    }

    // Signed-in customers order as themselves; guests find-or-create by email
    const sessionCustomer = await getSessionCustomer()
    let customer: Customer | null = sessionCustomer
    if (!customer) {
      const email = formData.email.trim().toLowerCase()
      customer = await prisma.customer.findUnique({ where: { email } })
      if (!customer) {
        customer = await prisma.customer.create({
          data: { email, name: formData.name },
        })
      }
    }

    // Create the order (with a snapshot of the shipping details)
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        status: "PENDING",
        total: cart.subtotal,
        shippingName: formData.name,
        shippingPhone: formData.phone || null,
        shippingAddress: formData.address,
        shippingSuburb: formData.suburb,
        shippingState: formData.state,
        shippingPostcode: formData.postcode,
        shippingNotes: formData.notes || null,
        items: {
          create: cart.items.map((item) => ({
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: true },
    })

    // Create inquiry for the shipping details
    await prisma.inquiry.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Order #${order.id.slice(-8)} — Shipping Details`,
        message: `Order ID: ${order.id}\n\nShipping Address:\n${formData.address}\n${formData.suburb}, ${formData.state} ${formData.postcode}\n\nNotes: ${formData.notes || "None"}\n\nProducts:\n${cart.items.map((i) => `- ${i.productName} (${i.color}${i.size ? ` / ${i.size}` : ""}) x${i.quantity} @ $${i.price.toFixed(2)}`).join("\n")}`,
      },
    })

    // Clear the cart
    const ctx = await getCartContext()
    await prisma.cart.deleteMany({ where: scopeWhere(ctx) })
    const cookieStore = await cookies()
    cookieStore.delete("cart_session")

    revalidatePath("/en/checkout")
    revalidatePath("/th/checkout")

    return { success: true, orderId: order.id }
  } catch (err) {
    console.error("placeOrder error:", err)
    return { success: false, error: "Failed to place order. Please try again." }
  }
}
