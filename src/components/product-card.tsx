import Link from "next/link";
import Image from "next/image";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/types";

export function ProductCard({ product, showRating }: { product: Product; showRating?: boolean }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 aspect-[4/3] mb-3 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      {showRating && (
        <div className="flex items-center gap-1 mb-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-mainwave-gold" : "text-gray-200"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] text-gray-400 ml-1">({product.reviewCount})</span>
        </div>
      )}
      <h3 className="text-sm font-medium text-mainwave-black group-hover:text-brand-accent transition-colors leading-snug mb-1">
        {product.name}
      </h3>
      <span className="text-sm font-semibold text-mainwave-black">
        {formatMoney(product.price)}
      </span>
    </Link>
  );
}
