"use client"

import { useState } from "react"
import type { Dictionary } from "@/i18n"

export function ReferralCodeCard({ code, dict }: { code: string; dict: Dictionary }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard unavailable — user can copy manually
    }
  }

  return (
    <div className="bg-ink border border-white/10 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-bone/40 mb-2">{dict.account.referralCode}</p>
      <div className="flex items-center gap-3">
        <span className="text-xl font-black text-white tracking-widest font-mono">{code}</span>
        <button
          onClick={copy}
          className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 border border-white/20 text-bone/60 hover:border-brand-accent hover:text-brand-accent transition-colors"
        >
          {copied ? dict.account.copied : dict.account.copy}
        </button>
      </div>
      <p className="mt-3 text-xs text-bone/40 leading-relaxed">{dict.account.referralBlurb}</p>
    </div>
  )
}
