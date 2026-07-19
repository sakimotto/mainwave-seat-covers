"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { getCart, placeOrder } from "@/lib/actions/cart"
import type { Cart } from "@/types"

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    suburb: "",
    state: "",
    postcode: "",
    notes: "",
  })

  useEffect(() => {
    getCart().then((c) => {
      setCart(c)
      setLoading(false)
    })
  }, [])

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOrderError(null)
    startTransition(async () => {
      const result = await placeOrder(form)
      if (result.success) {
        setOrderId(result.orderId ?? null)
        setSubmitted(true)
      } else {
        setOrderError(result.error ?? "Something went wrong")
      }
    })
  }

  if (loading) {
    return (
      <div className="container-site py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">Checkout</h1>
        <div className="bg-mainwave-grey border border-mainwave-border p-8 md:p-12 text-center">
          <p className="text-sm text-mainwave-text">Loading checkout...</p>
        </div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container-site py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">Checkout</h1>
        <div className="bg-mainwave-grey border border-mainwave-border p-8 md:p-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-bold text-mainwave-black mb-3">Your cart is empty</h2>
            <Link
              href="/shop"
              className="inline-block bg-mainwave-red text-white font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-red-700 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="container-site py-12 md:py-20">
        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">Checkout</h1>
        <div className="bg-mainwave-grey border border-mainwave-border p-8 md:p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-mainwave-black mb-3">Order Placed!</h2>
          {orderId && (
            <p className="text-sm text-gray-500 mb-2">
              Order reference: <span className="font-mono font-bold text-mainwave-black">{orderId.slice(-8).toUpperCase()}</span>
            </p>
          )}
          <p className="text-sm text-mainwave-text mb-6">
            Thank you for your order. We&apos;ll send you a confirmation email shortly with your order details and tracking information.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-mainwave-red text-white font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-red-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-site py-12 md:py-20">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact */}
            <div className="bg-mainwave-grey border border-mainwave-border p-6">
              <h2 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-4">Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-mainwave-text mb-1">Full Name *</label>
                  <input id="name" required value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-mainwave-text mb-1">Email *</label>
                  <input id="email" type="email" required value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-mainwave-text mb-1">Phone</label>
                  <input id="phone" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red" />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-mainwave-grey border border-mainwave-border p-6">
              <h2 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-4">Shipping Address</h2>
              <div>
                <label htmlFor="address" className="block text-xs font-medium text-mainwave-text mb-1">Street Address *</label>
                <input id="address" required value={form.address} onChange={(e) => updateField("address", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red mb-4" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="suburb" className="block text-xs font-medium text-mainwave-text mb-1">Suburb *</label>
                  <input id="suburb" required value={form.suburb} onChange={(e) => updateField("suburb", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red" />
                </div>
                <div>
                  <label htmlFor="state" className="block text-xs font-medium text-mainwave-text mb-1">State *</label>
                  <select id="state" required value={form.state} onChange={(e) => updateField("state", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red bg-white">
                    <option value="">Select</option>
                    <option value="VIC">VIC</option>
                    <option value="NSW">NSW</option>
                    <option value="QLD">QLD</option>
                    <option value="WA">WA</option>
                    <option value="SA">SA</option>
                    <option value="TAS">TAS</option>
                    <option value="ACT">ACT</option>
                    <option value="NT">NT</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="postcode" className="block text-xs font-medium text-mainwave-text mb-1">Postcode *</label>
                  <input id="postcode" required value={form.postcode} onChange={(e) => updateField("postcode", e.target.value)} className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red" />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-mainwave-grey border border-mainwave-border p-6">
              <h2 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-4">Order Notes</h2>
              <textarea
                value={form.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={3}
                placeholder="Special instructions or delivery notes..."
                className="w-full border border-mainwave-border px-3 py-2 text-sm focus:outline-none focus:border-mainwave-red resize-none"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-mainwave-grey border border-mainwave-border p-6 h-fit">
            <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-14 bg-white flex-shrink-0">
                    <Image src={item.productImage} alt={item.productName} width={56} height={56} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-mainwave-black line-clamp-1">{item.productName}</p>
                    <p className="text-xs text-gray-500">{item.color}{item.size ? ` / ${item.size}` : ""}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      <span className="text-xs font-medium text-mainwave-black">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-mainwave-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-mainwave-text">Subtotal</span>
                <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mainwave-text">Shipping</span>
                <span className={cart.subtotal >= 150 ? "text-green-600 font-medium" : "text-mainwave-text"}>
                  {cart.subtotal >= 150 ? "Free" : "Calculated"}
                </span>
              </div>
              <div className="border-t border-mainwave-border pt-2 flex justify-between text-base">
                <span className="font-bold text-mainwave-black">Total</span>
                <span className="font-bold text-mainwave-red">${cart.subtotal.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider text-center py-3 mt-4 hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {pending ? "Processing..." : "Place Order"}
            </button>
            {orderError && (
              <p className="text-red-600 text-xs text-center mt-2">{orderError}</p>
            )}
            <p className="text-[10px] text-gray-400 text-center mt-3">
              By placing this order you agree to our Terms &amp; Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}