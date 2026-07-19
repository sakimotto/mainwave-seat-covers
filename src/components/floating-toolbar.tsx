"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { localePath, type Dictionary, type Locale } from "@/i18n"

type Panel = "none" | "links" | "a11y"
type TextSize = "normal" | "lg" | "xl"

function applyA11y(size: TextSize, contrast: boolean) {
  const root = document.documentElement
  root.classList.toggle("a11y-text-lg", size === "lg")
  root.classList.toggle("a11y-text-xl", size === "xl")
  root.classList.toggle("a11y-contrast", contrast)
}

export function FloatingToolbar({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [panel, setPanel] = useState<Panel>("none")
  const [textSize, setTextSize] = useState<TextSize>(() =>
    typeof window !== "undefined"
      ? ((localStorage.getItem("a11y-text-size") as TextSize) || "normal")
      : "normal"
  )
  const [contrast, setContrast] = useState<boolean>(() =>
    typeof window !== "undefined" && localStorage.getItem("a11y-contrast") === "1"
  )
  const T = dict.toolbar

  // Apply persisted preferences to <html>
  useEffect(() => {
    applyA11y(textSize, contrast)
  }, [textSize, contrast])

  const updateSize = (size: TextSize) => {
    setTextSize(size)
    localStorage.setItem("a11y-text-size", size)
    applyA11y(size, contrast)
  }

  const updateContrast = (on: boolean) => {
    setContrast(on)
    localStorage.setItem("a11y-contrast", on ? "1" : "0")
    applyA11y(textSize, on)
  }

  const reset = () => {
    updateSize("normal")
    updateContrast(false)
  }

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel("none")
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [])

  const btnClass =
    "w-10 h-10 flex items-center justify-center bg-ink border border-white/15 text-bone/70 hover:text-brand-accent hover:border-brand-accent transition-colors"

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col shadow-lg">
      {/* Quick links */}
      <div className="relative">
        <button
          onClick={() => setPanel(panel === "links" ? "none" : "links")}
          className={btnClass}
          aria-label={T.quickLinks}
          aria-expanded={panel === "links"}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </button>
        {panel === "links" && (
          <div className="absolute right-full top-0 mr-2 w-44 bg-ink border border-white/15 shadow-2xl py-1">
            {[
              { label: dict.nav.shop, href: "/shop" },
              { label: dict.footer.links.trackOrder, href: "/track-order" },
              { label: dict.nav.account, href: "/account" },
              { label: dict.nav.contact, href: "/form/contact-us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={localePath(locale, link.href)}
                onClick={() => setPanel("none")}
                className="block px-4 py-2.5 text-xs text-bone/70 hover:bg-white/5 hover:text-brand-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Contact */}
      <Link href={localePath(locale, "/form/contact-us")} className={btnClass} aria-label={T.contact}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </Link>

      {/* Accessibility */}
      <div className="relative">
        <button
          onClick={() => setPanel(panel === "a11y" ? "none" : "a11y")}
          className={btnClass}
          aria-label={T.accessibility}
          aria-expanded={panel === "a11y"}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="4.5" r="2" />
            <path d="M12 8v6m0 0l-3.5 6M12 14l3.5 6M5 10h14" />
          </svg>
        </button>
        {panel === "a11y" && (
          <div className="absolute right-full top-0 mr-2 w-52 bg-ink border border-white/15 shadow-2xl p-4 space-y-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-bone/40 mb-2">{T.textSize}</p>
              <div className="flex gap-1">
                {(["normal", "lg", "xl"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => updateSize(size)}
                    className={`flex-1 text-xs py-1.5 border transition-colors ${
                      textSize === size
                        ? "border-brand-accent text-brand-accent"
                        : "border-white/15 text-bone/60 hover:border-white/40"
                    }`}
                    aria-pressed={textSize === size}
                  >
                    {size === "normal" ? "A" : size === "lg" ? "A+" : "A++"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="flex items-center justify-between text-xs text-bone/60 cursor-pointer">
                <span className="font-bold uppercase tracking-wider text-[10px] text-bone/40">{T.contrast}</span>
                <input
                  type="checkbox"
                  checked={contrast}
                  onChange={(e) => updateContrast(e.target.checked)}
                  className="accent-mainwave-red w-4 h-4"
                />
              </label>
            </div>
            <button
              onClick={reset}
              className="w-full text-[10px] font-bold uppercase tracking-wider border border-white/15 text-bone/50 py-1.5 hover:border-brand-accent hover:text-brand-accent transition-colors"
            >
              {T.reset}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
