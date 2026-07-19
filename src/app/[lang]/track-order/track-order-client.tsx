"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logIn } from "@/lib/actions/auth"
import { trackOrder, requestReturn, type TrackedOrder } from "@/lib/actions/track-order"
import { localePath, type Dictionary, type Locale } from "@/i18n"
import { formatMoney } from "@/lib/format"

export function TrackOrderClient({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const T = dict.track
  const router = useRouter()

  // Sign-in column
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Guest tracking column
  const [orderNumber, setOrderNumber] = useState("")
  const [trackEmail, setTrackEmail] = useState("")
  const [trackError, setTrackError] = useState("")
  const [tracked, setTracked] = useState<TrackedOrder | null>(null)
  const [returnSent, setReturnSent] = useState(false)

  const [pending, startTransition] = useTransition()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError("")
    startTransition(async () => {
      const result = await logIn({ email: loginEmail, password: loginPassword })
      if (result.success) {
        router.push(localePath(locale, "/account/orders"))
        router.refresh()
      } else {
        setLoginError(result.error ?? "Login failed")
      }
    })
  }

  function handleTrack(e: React.FormEvent) {
    e.preventDefault()
    setTrackError("")
    setTracked(null)
    setReturnSent(false)
    startTransition(async () => {
      const result = await trackOrder({ orderNumber, email: trackEmail })
      if (result.success && result.order) {
        setTracked(result.order)
      } else {
        setTrackError(result.error ?? T.tracking)
      }
    })
  }

  function handleReturn() {
    startTransition(async () => {
      const result = await requestReturn({ orderNumber, email: trackEmail })
      if (result.success) setReturnSent(true)
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Sign-in column */}
      <section className="border border-mainwave-border p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <svg className="w-8 h-8 text-mainwave-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <h2 className="text-base font-bold text-mainwave-black">{T.signInTitle}</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          {loginError && <p className="text-sm text-brand-accent">{loginError}</p>}
          <div>
            <label htmlFor="login-email" className="block text-xs font-medium text-mainwave-text mb-1">{T.email}</label>
            <input
              id="login-email"
              type="email"
              required
              autoComplete="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="w-full border border-mainwave-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-xs font-medium text-mainwave-text mb-1">
              {dict.auth.password} *
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-mainwave-border px-3 py-2.5 pr-10 text-sm focus:outline-none focus:border-brand-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-mainwave-black"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-mainwave-text cursor-pointer">
              <input type="checkbox" className="accent-mainwave-red w-3.5 h-3.5" />
              {T.rememberMe}
            </label>
            <span className="text-gray-400 cursor-not-allowed" title="Coming soon">
              {T.forgotPassword}
            </span>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full bg-mainwave-black text-white text-sm font-bold uppercase tracking-wider py-3.5 hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {T.signIn}
          </button>
        </form>
      </section>

      {/* Guest tracking column */}
      <section className="border border-mainwave-border p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-8 h-8 text-mainwave-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <h2 className="text-base font-bold text-mainwave-black">{T.guestTitle}</h2>
        </div>
        <p className="text-xs text-gray-500 mb-6">{T.guestHelper}</p>

        {!tracked ? (
          <form onSubmit={handleTrack} className="space-y-4">
            {trackError && <p className="text-sm text-brand-accent">{trackError}</p>}
            <div>
              <label htmlFor="order-number" className="block text-xs font-medium text-mainwave-text mb-1">{T.orderNumber}</label>
              <input
                id="order-number"
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="w-full border border-mainwave-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
              />
            </div>
            <div>
              <label htmlFor="track-email" className="block text-xs font-medium text-mainwave-text mb-1">{T.email}</label>
              <input
                id="track-email"
                type="email"
                required
                value={trackEmail}
                onChange={(e) => setTrackEmail(e.target.value)}
                className="w-full border border-mainwave-border px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
              />
            </div>
            <button
              type="submit"
              disabled={pending}
              className="w-full bg-mainwave-black text-white text-sm font-bold uppercase tracking-wider py-3.5 hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {pending ? T.tracking : T.trackCta}
            </button>
            <p className="text-xs text-gray-500 text-center">
              <Link href={localePath(locale, "/account/signup")} className="underline text-mainwave-black">
                {T.createAccountLink}
              </Link>{" "}
              {T.createAccountSuffix}
            </p>
          </form>
        ) : (
          <div>
            <div className="bg-mainwave-grey border border-mainwave-border p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold font-mono text-mainwave-black">#{tracked.reference}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white border border-mainwave-border text-mainwave-text">
                  {tracked.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                {T.orderedOn} {new Date(tracked.date).toLocaleDateString(locale === "th" ? "th-TH" : "en-AU", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <div className="space-y-1 text-sm text-mainwave-text">
                {tracked.items.map((item, i) => (
                  <p key={i}>{item.name} ({item.detail}) × {item.quantity}</p>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-mainwave-border flex justify-between text-sm">
                <span className="text-gray-500">{T.totalLabel}</span>
                <span className="font-bold text-brand-accent">{formatMoney(tracked.total)}</span>
              </div>
            </div>
            {returnSent ? (
              <p className="text-sm text-green-700 bg-green-50 border border-green-200 px-4 py-3">{T.returnSent}</p>
            ) : (
              <button
                onClick={handleReturn}
                disabled={pending}
                className="w-full border border-mainwave-black text-mainwave-black text-sm font-bold uppercase tracking-wider py-3 hover:bg-mainwave-black hover:text-white transition-colors disabled:opacity-50"
              >
                {T.startReturn}
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
