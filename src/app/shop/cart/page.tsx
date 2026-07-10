import type { Metadata } from "next"
import { CartContent } from "./cart-content"

export const metadata: Metadata = {
  title: "Shopping Cart",
}

export default function CartPage() {
  return (
    <div className="container-site py-12 md:py-20">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">Shopping Cart</h1>
      <CartContent />
    </div>
  )
}