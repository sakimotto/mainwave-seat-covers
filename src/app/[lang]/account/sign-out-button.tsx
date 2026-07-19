"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { logOut } from "@/lib/actions/auth"
import { localePath, type Dictionary, type Locale } from "@/i18n"

export function SignOutButton({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          await logOut()
          router.push(localePath(locale, "/"))
          router.refresh()
        })
      }
      disabled={pending}
      className="text-xs font-bold uppercase tracking-wider px-4 py-2 border border-white/20 text-bone/60 hover:border-brand-accent hover:text-brand-accent transition-colors disabled:opacity-50"
    >
      {dict.account.signOut}
    </button>
  )
}
