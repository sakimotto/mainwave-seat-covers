"use client"

import { useState } from "react"
import Link from "next/link"
import type { Market } from "@/brands/types"
import { localePath, type Dictionary, type Locale } from "@/i18n"

const COOKIE_NAME = "region_choice"
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

function setChoiceCookie(value: string) {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; samesite=lax`
}

export function RegionPopup({
  detectedCountry,
  currentMarket,
  markets,
  dict,
  locale,
}: {
  detectedCountry: string
  currentMarket: Market
  markets: Market[]
  dict: Dictionary
  locale: Locale
}) {
  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState(markets[0]?.id ?? "")
  const R = dict.region

  if (!open) return null

  const countryName = currentMarket.country[locale] ?? currentMarket.country.en
  const suggested = markets.find((m) => m.countryCode === detectedCountry)

  const stay = () => {
    setChoiceCookie(currentMarket.id)
    setOpen(false)
  }

  const change = () => {
    const target = markets.find((m) => m.id === selected)
    if (!target) return
    setChoiceCookie(target.id)
    window.location.href = target.url
  }

  return (
    <div className="fixed bottom-24 right-4 md:right-6 z-[90] w-[calc(100vw-2rem)] max-w-sm bg-white border border-mainwave-border shadow-2xl p-6">
      <button
        onClick={stay}
        className="absolute top-3 right-3 text-gray-400 hover:text-mainwave-black transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <p className="text-base font-bold text-mainwave-black mb-2 pr-6">
        {R.currentSite.replace("{region}", countryName)}
      </p>
      <p className="text-xs text-gray-500 mb-5">{R.notRight}</p>

      <button
        onClick={stay}
        className="w-full bg-mainwave-black text-white text-xs font-bold uppercase tracking-wider py-3 mb-4 hover:bg-gray-800 transition-colors"
      >
        {R.stay.replace("{region}", countryName)}
      </button>

      <label htmlFor="region-select" className="block text-xs font-medium text-mainwave-text mb-1">
        {R.changeLabel}
      </label>
      <select
        id="region-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border border-mainwave-border bg-white px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-brand-accent"
      >
        {markets.map((m) => (
          <option key={m.id} value={m.id}>
            {m.country[locale] ?? m.country.en} ({m.currency})
            {m.countryCode === detectedCountry ? " ✓" : ""}
          </option>
        ))}
      </select>
      <button
        onClick={change}
        className="w-full border border-mainwave-black text-mainwave-black text-xs font-bold uppercase tracking-wider py-3 mb-4 hover:bg-mainwave-black hover:text-white transition-colors"
      >
        {R.changeCta}
      </button>

      <Link
        href={localePath(locale, "/locations")}
        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-accent transition-colors"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        {R.seeAll}
      </Link>
      {suggested && suggested.id !== currentMarket.id && (
        <span className="sr-only">{suggested.country.en}</span>
      )}
    </div>
  )
}
