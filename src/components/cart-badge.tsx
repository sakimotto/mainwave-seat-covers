"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CartIcon } from "@/components/icons"
import { getCartSummary } from "@/lib/actions/cart"
import { localePath, type Locale } from "@/i18n"

export function CartBadge({ locale }: { locale: Locale }) {
  const [summary, setSummary] = useState({ itemCount: 0, subtotal: 0 })

  useEffect(() => {
    const refresh = () => {
      getCartSummary().then(setSummary)
    }
    refresh()
    window.addEventListener("cart-updated", refresh)
    return () => window.removeEventListener("cart-updated", refresh)
  }, [])

  return (
    <Link href={localePath(locale, "/shop/cart")} className="flex items-center gap-1 text-bone/70 hover:text-mainwave-red transition-colors relative">
      <CartIcon className="w-5 h-5" />
      <span className="hidden md:inline text-sm font-medium">${summary.subtotal.toFixed(2)}</span>
      {summary.itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-mainwave-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
          {summary.itemCount > 9 ? "9+" : summary.itemCount}
        </span>
      )}
    </Link>
  )
}
