import { redirect } from "next/navigation"
import Link from "next/link"
import { getDictionary, localePath } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { formatMoney } from "@/lib/format"
import { ReferralCodeCard } from "./referral-code-card"
import { SignOutButton } from "./sign-out-button"

export default async function AccountPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)
  const customer = await getSessionCustomer()
  if (!customer) {
    redirect(locale === "th" ? "/th/account/login" : "/account/login")
  }

  const creditBalance = customer.creditEntries?.reduce((sum, e) => sum + Number(e.amount), 0) ?? 0

  return (
    <div className="container-site py-12 md:py-16">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black">
            {dict.account.welcome}, {customer.name ?? customer.email}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {dict.account.memberSince}{" "}
            {customer.createdAt.toLocaleDateString(locale === "th" ? "th-TH" : "en-AU", { year: "numeric", month: "long" })}
          </p>
        </div>
        <SignOutButton dict={dict} locale={locale} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-ink border border-white/10 p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bone/40 mb-2">{dict.account.creditBalance}</p>
          <p className="text-3xl font-black text-brand-accent">{formatMoney(creditBalance)}</p>
        </div>
        {customer.referralCode && (
          <div className="md:col-span-2">
            <ReferralCodeCard code={customer.referralCode} dict={dict} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href={localePath(locale, "/account/garage")}
          className="group bg-mainwave-grey border border-mainwave-border p-6 hover:border-brand-accent transition-colors"
        >
          <p className="text-lg font-bold text-mainwave-black group-hover:text-brand-accent transition-colors">
            {dict.account.garage} →
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {customer.garage.length > 0
              ? customer.garage.map((g) => g.vehicle.make).join(", ")
              : dict.garage.empty}
          </p>
        </Link>
        <Link
          href={localePath(locale, "/account/orders")}
          className="group bg-mainwave-grey border border-mainwave-border p-6 hover:border-brand-accent transition-colors"
        >
          <p className="text-lg font-bold text-mainwave-black group-hover:text-brand-accent transition-colors">
            {dict.account.orders} →
          </p>
          <p className="text-sm text-gray-500 mt-1">{dict.orders.title}</p>
        </Link>
      </div>
    </div>
  )
}
