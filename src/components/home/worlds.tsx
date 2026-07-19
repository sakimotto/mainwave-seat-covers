import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"

const worlds = [
  {
    index: "01",
    name: "Drive",
    tagline: "Custom-fit seat covers & car gear",
    image: "/images/lifestyle/drive-canyon.jpg",
    href: "/shop",
  },
  {
    index: "02",
    name: "Camp",
    tagline: "Built-tough outdoor equipment",
    image: "/images/lifestyle/camp-canoe.jpg",
    href: "/shop?category=Lifestyle",
  },
  {
    index: "03",
    name: "Wear",
    tagline: "Everyday apparel, factory priced",
    image: "/images/products/merch-tshirt.jpg",
    href: "/shop?category=Apparel",
  },
  {
    index: "04",
    name: "Live",
    tagline: "Merch & accessories for the daily",
    image: "/images/lifestyle/live-kombi.jpg",
    href: "/shop?category=Car+Accessories",
  },
]

export function Worlds() {
  return (
    <section id="worlds" className="bg-ink py-20 md:py-28">
      <div className="container-wide">
        <Reveal>
          <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">01 — The Four Worlds</p>
          <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone max-w-3xl">
            One brand.<br />Every journey.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {worlds.map((world, i) => (
            <Reveal key={world.name} delay={i * 120}>
              <Link
                href={world.href}
                className="group relative block aspect-[3/4] overflow-hidden border border-white/10 hover:border-mainwave-red/60 transition-colors duration-500"
              >
                <img
                  src={world.image}
                  alt={world.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" aria-hidden="true" />
                <span className="absolute top-4 left-4 text-[11px] font-bold tracking-[0.3em] text-bone/50 group-hover:text-mainwave-red transition-colors">
                  {world.index}
                </span>
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-display text-3xl md:text-4xl text-bone group-hover:text-mainwave-red transition-colors duration-300">
                    {world.name}
                  </p>
                  <p className="mt-1 text-xs text-bone/60 leading-snug">{world.tagline}</p>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-bone/40 group-hover:text-bone transition-colors">
                    Explore →
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
