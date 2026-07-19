import Link from "next/link"
import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"
import { localePath, type Dictionary, type Locale } from "@/i18n"
import type { Product } from "@/types"

export function Spotlight({ products, dict, locale }: { products: Product[]; dict: Dictionary; locale: Locale }) {
  return (
    <section className="bg-ink py-20 md:py-28 overflow-hidden">
      <div className="container-wide">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">{dict.spotlight.kicker}</p>
              <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone">
                {dict.spotlight.title}
              </h2>
            </div>
            <p className="hidden md:block text-bone/30 text-xs font-bold uppercase tracking-[0.3em]">{dict.spotlight.scrollHint}</p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={150}>
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 md:px-8 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <Link
              key={product.id}
              href={localePath(locale, `/product/${product.slug}`)}
              className="group snap-start shrink-0 w-[260px] md:w-[320px] border border-white/10 hover:border-mainwave-red/60 transition-colors duration-500"
            >
              <div className="relative aspect-square bg-ink-soft overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 320px, 260px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-bone/40 mb-1">
                  {product.vehicle || product.category}
                </p>
                <p className="text-sm font-semibold text-bone leading-snug line-clamp-2 group-hover:text-mainwave-red transition-colors">
                  {product.name}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-mainwave-red font-black text-lg">${product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-bone/30 text-xs line-through">${product.originalPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          <Link
            href={localePath(locale, "/shop")}
            className="group snap-start shrink-0 w-[260px] md:w-[320px] border border-white/10 hover:border-mainwave-red flex items-center justify-center bg-ink-soft transition-colors duration-500"
          >
            <span className="text-display text-2xl text-bone/40 group-hover:text-mainwave-red transition-colors text-center px-8">
              {dict.spotlight.viewAll}
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
