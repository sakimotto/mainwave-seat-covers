import { Reveal } from "@/components/motion/reveal"
import type { Dictionary } from "@/i18n"

export function Roadmap({ dict }: { dict: Dictionary }) {
  return (
    <section id="roadmap" className="bg-ink py-20 md:py-28 border-t border-white/5">
      <div className="container-wide">
        <Reveal>
          <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">{dict.roadmap.kicker}</p>
          <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone max-w-3xl">
            {dict.roadmap.title1}<br />{dict.roadmap.title2}
          </h2>
        </Reveal>

        <div className="mt-12">
          {dict.roadmap.stops.map((stop, i) => (
            <Reveal key={stop.market} delay={i * 120}>
              <div className="group flex flex-col md:flex-row md:items-center justify-between gap-3 py-8 border-b border-white/10">
                <div className="flex items-baseline gap-6">
                  <span className="text-[11px] font-bold tracking-[0.3em] text-bone/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className={`text-display text-3xl md:text-5xl ${i === 0 ? "text-mainwave-red" : "text-bone"}`}>
                      {stop.market}
                    </p>
                    <p className="mt-2 text-sm text-bone/50 max-w-md">{stop.detail}</p>
                  </div>
                </div>
                <span
                  className={`self-start md:self-center text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] px-4 py-2 border ${
                    i === 0
                      ? "border-mainwave-red text-mainwave-red"
                      : "border-white/15 text-bone/40"
                  }`}
                >
                  {stop.status}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
