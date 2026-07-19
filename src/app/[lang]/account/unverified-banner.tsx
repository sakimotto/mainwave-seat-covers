"use client"

import { useState, useTransition } from "react"
import { resendVerification } from "@/lib/actions/auth"
import type { Dictionary } from "@/i18n"

export function UnverifiedBanner({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <div className="bg-brand-accent/10 border border-brand-accent/30 px-4 py-3 mb-6 flex items-center justify-between">
      <p className="text-sm text-mainwave-black">{dict.account.unverified}</p>
      <button
        onClick={() =>
          startTransition(async () => {
            const result = await resendVerification()
            if (result.success) setSent(true)
          })
        }
        disabled={pending || sent}
        className="text-xs font-bold uppercase tracking-wider text-brand-accent hover:underline disabled:opacity-50"
      >
        {sent ? dict.account.resent : dict.account.resend}
      </button>
    </div>
  )
}
