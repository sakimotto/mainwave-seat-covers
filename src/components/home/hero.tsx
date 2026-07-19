import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { HeroVideo } from "@/components/home/hero-video"
import { localePath, type Dictionary, type Locale } from "@/i18n"

export function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Ambient video + overlays */}
      <HeroVideo />
      <div className="absolute inset-0 bg-ink/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-grain opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-[60vh] red-glow" aria-hidden="true" />

      <div className="container-wide relative z-10 flex min-h-[88vh] flex-col justify-center py-24 md:py-32">
        <Reveal>
          <p className="text-brand-accent text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-6">
            {dict.hero.kicker}
          </p>
        </Reveal>

        <h1 className="text-display text-[clamp(3.2rem,10.5vw,9rem)] text-bone">
          <Reveal delay={100}>
            <span className="block">{dict.hero.line1}</span>
          </Reveal>
          <Reveal delay={220}>
            <span className="block text-brand-accent">{dict.hero.line2}</span>
          </Reveal>
        </h1>

        <Reveal delay={340}>
          <p className="mt-8 max-w-xl text-bone/60 text-base md:text-lg leading-relaxed">
            {dict.hero.sub}
          </p>
        </Reveal>

        <Reveal delay={460}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={localePath(locale, "/shop")}
              className="bg-brand-accent text-white text-sm font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-red-700 transition-colors"
            >
              {dict.hero.ctaPrimary}
            </Link>
            <Link
              href="#story"
              className="border border-bone/25 text-bone text-sm font-bold uppercase tracking-[0.2em] px-8 py-4 hover:border-brand-accent hover:text-brand-accent transition-colors"
            >
              {dict.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <div className="mt-16 flex items-center gap-3 text-bone/30" aria-hidden="true">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{dict.hero.scroll}</span>
            <span className="block w-16 h-px bg-bone/20 overflow-hidden relative">
              <span className="absolute inset-y-0 left-0 w-6 bg-brand-accent animate-pulse" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
