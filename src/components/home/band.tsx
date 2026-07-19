import { Reveal } from "@/components/motion/reveal"
import type { Dictionary } from "@/i18n"

export function Band({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
      <img
        src="/images/lifestyle/band-blacksand.jpg"
        alt="Waves breaking against black rock on a dark shoreline"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-ink/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink" aria-hidden="true" />
      <div className="container-wide relative z-10 h-full flex flex-col justify-center">
        <Reveal>
          <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">
            {dict.band.kicker}
          </p>
          <p className="text-display text-[clamp(2.4rem,7vw,6rem)] text-bone max-w-4xl">
            {dict.band.title}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
