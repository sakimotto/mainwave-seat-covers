import { getCommerce } from "@/commerce"
import { getDictionary } from "@/i18n"
import { ShopPageClient } from "./shop-page-client"

export default async function ShopPage(props: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<{ category?: string; q?: string }>
}) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])
  const { locale, dict } = getDictionary(params.lang)
  const [products, vehicles] = await Promise.all([
    getCommerce().catalog.getProducts(locale),
    getCommerce().catalog.getVehicles(),
  ])

  return (
    <ShopPageClient
      initialProducts={products}
      initialVehicles={vehicles}
      initialCategory={searchParams?.category}
      initialQuery={searchParams?.q}
      dict={dict}
      locale={locale}
    />
  )
}
