import { Reveal } from "@/components/motion/reveal"
import type { Dictionary } from "@/i18n"

export function Story({ dict }: { dict: Dictionary }) {
  return (
    <section id="story" className="bg-ink-soft py-20 md:py-28 border-y border-white/5">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">{dict.story.kicker}</p>
            <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone">
              {dict.story.titleA} <span className="text-mainwave-red">{dict.story.titleEm}</span> {dict.story.titleB}<br />
              {dict.story.title2}
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-bone/60 text-base md:text-lg leading-relaxed">
              {dict.story.p1}
            </p>
            <p className="mt-4 text-bone/60 text-base md:text-lg leading-relaxed">
              {dict.story.p2}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <img
                src="/images/lifestyle/journey-hiker.jpg"
                alt="Hiker overlooking a mountain valley at dawn"
                className="w-full h-48 md:h-56 object-cover border border-white/10"
              />
              <img
                src="/images/lifestyle/forest-path.jpg"
                alt="Winding path through a dark forest"
                className="w-full h-48 md:h-56 object-cover border border-white/10 mt-6"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {dict.story.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} className="bg-ink-soft">
              <div className="p-6 md:p-8">
                <p className="text-display text-4xl md:text-5xl text-mainwave-red">{stat.value}</p>
                <p className="mt-2 text-xs text-bone/50 uppercase tracking-[0.15em] leading-relaxed">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
