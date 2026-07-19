import { redirect } from "next/navigation"
import { getDictionary } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { LoginForm } from "./login-form"

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)
  const customer = await getSessionCustomer()
  if (customer) {
    redirect(locale === "th" ? "/th/account" : "/account")
  }

  return (
    <div className="container-site py-16 md:py-24 max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">{dict.auth.login}</h1>
      <LoginForm dict={dict} locale={locale} />
    </div>
  )
}
