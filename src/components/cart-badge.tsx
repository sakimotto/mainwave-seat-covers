"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CartIcon } from "@/components/icons"
import { getCartSummary } from "@/lib/actions/cart"

export function CartBadge() {
  const [summary, setSummary] = useState({ itemCount: 0, subtotal: 0 })

  useEffect(() => {
    getCartSummary().then(setSummary)
    // Poll every 30 seconds for updates
    const interval = setInterval(() => {
      getCartSummary().then(setSummary)
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Link href="/shop/cart" className="flex items-center gap-1 text-mainwave-text hover:text-mainwave-red transition-colors relative">
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
