import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"

export function Closer() {
  return (
    <section className="relative bg-mainwave-red overflow-hidden">
      <img
        src="/images/lifestyle/coast-cliffs.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-mainwave-red/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
      <div className="container-wide relative z-10 py-24 md:py-32 text-center">
        <Reveal>
          <p className="text-ink/60 text-xs font-bold tracking-[0.4em] uppercase mb-6">
            Drive · Camp · Wear · Live
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-display text-[clamp(3rem,10vw,8.5rem)] text-white">
            Join the<br />journey
          </h2>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-10">
            <Link
              href="/shop"
              className="inline-block bg-ink text-white text-sm font-bold uppercase tracking-[0.2em] px-10 py-5 hover:bg-black transition-colors"
            >
              Shop Mainwave
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
