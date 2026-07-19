import Link from "next/link"
import Image from "next/image"
import { Reveal } from "@/components/motion/reveal"
import { localePath, type Dictionary, type Locale } from "@/i18n"

const worldMedia = [
  { image: "/images/lifestyle/drive-canyon.jpg", href: "/shop" },
  { image: "/images/lifestyle/camp-canoe.jpg", href: "/shop?category=Lifestyle" },
  { image: "/images/products/merch-tshirt.jpg", href: "/shop?category=Apparel" },
  { image: "/images/lifestyle/live-kombi.jpg", href: "/shop?category=Car+Accessories" },
]

export function Worlds({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section id="worlds" className="bg-ink py-20 md:py-28">
      <div className="container-wide">
        <Reveal>
          <p className="text-brand-accent text-xs font-bold tracking-[0.4em] uppercase mb-4">{dict.worlds.kicker}</p>
          <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone max-w-3xl">
            {dict.worlds.title1}<br />{dict.worlds.title2}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {dict.worlds.items.map((world, i) => (
            <Reveal key={world.name} delay={i * 120}>
              <Link
                href={localePath(locale, worldMedia[i].href)}
                className="group relative block aspect-[3/4] overflow-hidden border border-white/10 hover:border-brand-accent/60 transition-colors duration-500"
              >
                <Image
                  src={worldMedia[i].image}
                  alt={world.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
                <span className="absolute top-4 left-4 text-[11px] font-bold tracking-[0.3em] text-bone/50 group-hover:text-brand-accent transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-display text-3xl md:text-4xl text-bone group-hover:text-brand-accent transition-colors duration-300">
                    {world.name}
                  </p>
                  <p className="mt-1 text-xs text-bone/60 leading-snug">{world.tagline}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-bone/40 group-hover:text-bone transition-colors">
                    {dict.worlds.explore}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
