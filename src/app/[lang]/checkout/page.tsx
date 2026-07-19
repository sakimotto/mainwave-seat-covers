import { getDictionary } from "@/i18n"
import { CheckoutClient } from "./checkout-client"

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)
  return <CheckoutClient dict={dict} locale={locale} />
}
