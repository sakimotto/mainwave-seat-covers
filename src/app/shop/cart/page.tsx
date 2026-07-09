import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

export default function CartPage() {
  return (
    <div className="container-site py-12 md:py-20">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">Shopping Cart</h1>
      <div className="bg-mainwave-grey border border-mainwave-border p-8 md:p-12 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-mainwave-black mb-3">Your cart is empty</h2>
          <p className="text-sm text-mainwave-text mb-6">
            Looks like you haven&apos;t added any seat covers yet. Browse our range of premium Australian-made neoprene seat covers.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-mainwave-red text-white font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-red-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
