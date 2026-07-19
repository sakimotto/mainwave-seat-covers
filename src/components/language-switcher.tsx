"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n"

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (next: Locale) => {
    if (next === locale) return
    const path =
      next === "th"
        ? `/th${pathname === "/" ? "" : pathname}`
        : pathname.replace(/^\/th(?=\/|$)/, "") || "/"
    router.push(path)
  }

  return (
    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase" role="group" aria-label="Language">
      <button
        onClick={() => switchLocale("en")}
        className={cn("transition-colors", locale === "en" ? "text-brand-accent" : "text-bone/50 hover:text-bone")}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
      <span className="text-bone/20" aria-hidden="true">|</span>
      <button
        onClick={() => switchLocale("th")}
        className={cn("transition-colors", locale === "th" ? "text-brand-accent" : "text-bone/50 hover:text-bone")}
        aria-current={locale === "th" ? "true" : undefined}
      >
        ไทย
      </button>
    </div>
  )
}
