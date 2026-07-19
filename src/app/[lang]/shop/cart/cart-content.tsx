"use client"

import { useState, useEffect, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { TrashIcon, MinusIcon, PlusIcon } from "@/components/icons"
import { getCart, updateCartItemQuantity, removeCartItem } from "@/lib/actions/cart"
import { localePath, type Dictionary, type Locale } from "@/i18n"
import type { Cart } from "@/types"

export function CartContent({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(true)
  const [pending, startTransition] = useTransition()
  const C = dict.cart
  const lp = (href: string) => localePath(locale, href)

  useEffect(() => {
    getCart().then((c) => {
      setCart(c)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="bg-mainwave-grey border border-mainwave-border p-8 md:p-12 text-center">
        <p className="text-sm text-mainwave-text">{C.loading}</p>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="bg-mainwave-grey border border-mainwave-border p-8 md:p-12 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-mainwave-black mb-3">{C.emptyTitle}</h2>
          <p className="text-sm text-mainwave-text mb-6">
            {C.emptyBody}
          </p>
          <Link
            href={lp("/shop")}
            className="inline-block bg-mainwave-red text-white font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-red-700 transition-colors"
          >
            {C.emptyCta}
          </Link>
        </div>
      </div>
    )
  }

  function handleUpdateQuantity(itemId: string, newQty: number) {
    if (newQty < 1) return
    startTransition(async () => {
      await updateCartItemQuantity(itemId, newQty)
      window.dispatchEvent(new CustomEvent("cart-updated"))
      const updated = await getCart()
      setCart(updated)
    })
  }

  function handleRemove(itemId: string) {
    startTransition(async () => {
      await removeCartItem(itemId)
      window.dispatchEvent(new CustomEvent("cart-updated"))
      const updated = await getCart()
      setCart(updated)
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4 bg-mainwave-grey border border-mainwave-border p-4">
            <div className="w-20 h-20 bg-white flex-shrink-0">
              <Image
                src={item.productImage}
                alt={item.productName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={lp(`/product/${item.productSlug}`)}
                className="text-sm font-bold text-mainwave-black hover:text-mainwave-red transition-colors line-clamp-2"
              >
                {item.productName}
              </Link>
              <p className="text-xs text-gray-500 mt-1">
                {item.color}{item.size ? ` / ${item.size}` : ""}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">SKU: {item.sku}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={pending || item.quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center border border-mainwave-border text-xs hover:bg-white transition-colors disabled:opacity-50"
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={pending}
                    className="w-7 h-7 flex items-center justify-center border border-mainwave-border text-xs hover:bg-white transition-colors disabled:opacity-50"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-mainwave-black">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    disabled={pending}
                    className="text-gray-400 hover:text-mainwave-red transition-colors disabled:opacity-50"
                    aria-label={C.remove}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-mainwave-grey border border-mainwave-border p-6 h-fit">
        <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-4">{C.orderSummary}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-mainwave-text">{C.subtotal} ({cart.itemCount} {C.items})</span>
            <span className="font-medium text-mainwave-black">${cart.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-mainwave-text">{C.shipping}</span>
            <span className="text-green-600 font-medium">
              {cart.subtotal >= 150 ? C.free : C.calculated}
            </span>
          </div>
        </div>
        {cart.subtotal < 150 && (
          <p className="text-xs text-gray-500 mt-2">
            {C.freeShippingNote}
          </p>
        )}
        <div className="border-t border-mainwave-border mt-4 pt-4">
          <div className="flex justify-between text-base">
            <span className="font-bold text-mainwave-black">{C.total}</span>
            <span className="font-bold text-mainwave-red">${cart.subtotal.toFixed(2)}</span>
          </div>
        </div>
        <Link
          href={lp("/checkout")}
          className="block w-full bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider text-center py-3 mt-4 hover:bg-red-700 transition-colors"
        >
          {C.checkout}
        </Link>
        <Link
          href={lp("/shop")}
          className="block w-full text-center text-xs text-mainwave-text hover:text-mainwave-red transition-colors mt-3"
        >
          {C.continueShopping}
        </Link>
      </div>
    </div>
  )
}
