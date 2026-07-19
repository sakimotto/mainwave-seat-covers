import { getDictionary } from "@/i18n"
import { CartContent } from "./cart-content"

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)

  return (
    <div className="container-site py-12 md:py-20">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">{dict.cart.title}</h1>
      <CartContent dict={dict} locale={locale} />
    </div>
  )
}
