"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { subscribe } from "@/lib/actions/newsletter"
import { Reveal } from "@/components/motion/reveal"
import { localePath, type Dictionary, type Locale } from "@/i18n"

export function Newsletter({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const N = dict.newsletter
  const [email, setEmail] = useState("")
  const [prefs, setPrefs] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()

  const togglePref = (pref: string) =>
    setPrefs((prev) => (prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      const form = e.target as HTMLFormElement
      const gotcha = (new FormData(form).get("_gotcha") as string) ?? ""
      const result = await subscribe({ email, preferences: prefs, locale, _gotcha: gotcha })
      if (result.success) {
        setDone(true)
      } else {
        setError(result.error ?? "Failed")
      }
    })
  }

  return (
    <section className="bg-ink py-20 md:py-28 border-t border-white/5">
      <div className="container-wide max-w-2xl text-center">
        <Reveal>
          <h2 className="text-display text-[clamp(2rem,5vw,3.8rem)] text-bone">
            {N.title}
          </h2>
          <p className="mt-4 text-bone/50 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            {N.sub}
          </p>
        </Reveal>

        <Reveal delay={120}>
          {done ? (
            <p className="mt-10 text-brand-accent font-bold text-lg">{N.success}</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="hidden" aria-hidden="true">
                <label htmlFor="nl-gotcha">Leave this field empty</label>
                <input type="text" id="nl-gotcha" name="_gotcha" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-bone/60">
                <span>{N.preference}</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.includes("women")}
                    onChange={() => togglePref("women")}
                    className="accent-mainwave-red w-4 h-4"
                  />
                  {N.women}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefs.includes("men")}
                    onChange={() => togglePref("men")}
                    className="accent-mainwave-red w-4 h-4"
                  />
                  {N.men}
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={N.placeholder}
                  className="flex-1 bg-white/5 border border-white/15 px-4 py-3.5 text-sm text-bone placeholder:text-bone/30 focus:outline-none focus:border-brand-accent"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="bg-white text-ink text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 hover:bg-brand-accent hover:text-white transition-colors disabled:opacity-50"
                >
                  {N.cta}
                </button>
              </div>
              {error && <p className="text-sm text-brand-accent">{error}</p>}
            </form>
          )}
        </Reveal>

        <Reveal delay={200}>
          <p className="mt-6 text-[11px] text-bone/30 leading-relaxed">
            {N.privacyPrefix}{" "}
            <Link href={localePath(locale, "/privacy-policy")} className="underline hover:text-bone/60 transition-colors">
              {N.privacyLink}
            </Link>
            .
          </p>
        </Reveal>
      </div>
    </section>
  )
}
