"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logIn } from "@/lib/actions/auth"
import { localePath, type Dictionary, type Locale } from "@/i18n"

export function LoginForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    startTransition(async () => {
      const result = await logIn({ email, password })
      if (result.success) {
        router.push(localePath(locale, "/account"))
        router.refresh()
      } else {
        setError(result.error ?? "Login failed")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <p className="text-sm text-brand-accent border border-brand-accent/30 bg-brand-accent/5 px-4 py-3">{error}</p>
      )}
      <div>
        <label htmlFor="email" className="block text-xs font-medium text-mainwave-text mb-1">{dict.auth.email}</label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-mainwave-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-xs font-medium text-mainwave-text mb-1">{dict.auth.password}</label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-mainwave-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-brand-accent text-white text-sm font-bold uppercase tracking-wider py-3.5 hover:bg-red-700 transition-colors disabled:opacity-50"
      >
        {pending ? dict.auth.signingIn : dict.auth.loginCta}
      </button>
      <p className="text-xs text-gray-500 text-center">
        {dict.auth.noAccount}{" "}
        <Link href={localePath(locale, "/account/signup")} className="text-brand-accent font-medium hover:underline">
          {dict.auth.signup}
        </Link>
      </p>
    </form>
  )
}
