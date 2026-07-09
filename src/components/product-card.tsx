import Link from "next/link";
import { StarIcon } from "@/components/icons";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const salePercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative bg-mainwave-grey aspect-[4/3] mb-3 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {product.isSale && (
          <div className="absolute top-2 left-2 bg-mainwave-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            SALE {salePercentage}% OFF
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
      </div>
      <div className="flex items-center gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon
            key={i}
            className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-mainwave-gold" : "text-gray-300"}`}
          />
        ))}
        <span className="text-[11px] text-gray-500 ml-1">({product.reviewCount})</span>
      </div>
      <h3 className="text-sm font-medium text-mainwave-text group-hover:text-mainwave-red transition-colors leading-tight mb-1">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-mainwave-black">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>
    </Link>
  );
}
