import { Reveal } from "@/components/motion/reveal"

const stats = [
  { value: "30+", label: "Years of textile craft" },
  { value: "1", label: "Factory — ours, in Thailand" },
  { value: "4", label: "Worlds under one brand" },
  { value: "0", label: "Middlemen. You skip the markup" },
]

export function Story() {
  return (
    <section id="story" className="bg-ink-soft py-20 md:py-28 border-y border-white/5">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Reveal>
            <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">02 — Factory Direct</p>
            <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone">
              We <span className="text-mainwave-red">own</span> the factory.<br />
              You skip the markup.
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="text-bone/60 text-base md:text-lg leading-relaxed">
              Most brands rent someone else&apos;s production line and bill you
              for the privilege. Mainwave is the production line. Our Thailand
              factory has cut, stitched, and tested technical textiles for over
              three decades — first for work utes and mine sites, now for every
              part of your life.
            </p>
            <p className="mt-4 text-bone/60 text-base md:text-lg leading-relaxed">
              That&apos;s how an affordable lifestyle brand keeps its promise:
              no importers, no distributors, no retail theatre. Just gear made
              properly, sold honestly.
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
          {stats.map((stat, i) => (
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
