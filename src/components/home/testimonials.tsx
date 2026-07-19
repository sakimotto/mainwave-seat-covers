import { Reveal } from "@/components/motion/reveal"

const testimonials = [
  {
    quote: "These covers have taken an absolute beating on the mine site and still look brand new. Best investment for my Hilux.",
    name: "Jason R.",
    context: "Toyota Hilux — Mining",
  },
  {
    quote: "Ordered a full set for the family Prado. The kids have spilled everything imaginable and these just wipe clean. Game changer.",
    name: "Sarah M.",
    context: "Toyota Prado — Family",
  },
  {
    quote: "Fitted perfectly on my Ranger Raptor. The quality is insane for the price — and supporting real manufacturing feels great.",
    name: "Dave K.",
    context: "Ford Ranger Raptor — Tradie",
  },
]

export function Testimonials() {
  return (
    <section className="bg-ink-soft py-20 md:py-28 border-y border-white/5">
      <div className="container-wide">
        <Reveal>
          <p className="text-mainwave-red text-xs font-bold tracking-[0.4em] uppercase mb-4">05 — Proof</p>
          <h2 className="text-display text-[clamp(2.2rem,5.5vw,4.5rem)] text-bone mb-12">
            Beaten up.<br />Still going.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="h-full border border-white/10 bg-ink p-6 md:p-8 flex flex-col">
                <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-mainwave-gold" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="flex-1 text-bone/70 text-sm md:text-base leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-sm font-bold text-bone">{t.name}</p>
                  <p className="text-xs text-bone/40 mt-0.5">{t.context}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
