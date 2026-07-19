import Link from "next/link"
import { localePath, type Dictionary, type Locale } from "@/i18n"

export function GarageStrip({
  makes,
  dict,
  locale,
}: {
  makes: string[]
  dict: Dictionary
  locale: Locale
}) {
  return (
    <section className="bg-ink-soft border-y border-white/10">
      <div className="container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm md:text-base text-bone/70">
          <span className="text-bone/40 text-xs font-bold uppercase tracking-[0.2em] mr-3">
            {dict.account.garage}
          </span>
          {dict.garage.gearFor}{" "}
          <span className="font-bold text-white">{makes.join(", ")}</span>
        </p>
        <Link
          href={localePath(locale, "/shop?myvehicles=1")}
          className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-colors"
        >
          {dict.garage.myVehicles} →
        </Link>
      </div>
    </section>
  )
}
