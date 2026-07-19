import { getCommerce } from "@/commerce"
import { getDictionary } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { ShopPageClient } from "./shop-page-client"

export default async function ShopPage(props: {
  params: Promise<{ lang: string }>
  searchParams?: Promise<{ category?: string; q?: string; myvehicles?: string }>
}) {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])
  const { locale, dict } = getDictionary(params.lang)
  const [products, vehicles, customer] = await Promise.all([
    getCommerce().catalog.getProducts(locale),
    getCommerce().catalog.getVehicles(),
    getSessionCustomer(),
  ])

  const garageVehicleIds = customer?.garage.map((g) => g.vehicleId) ?? []

  return (
    <ShopPageClient
      initialProducts={products}
      initialVehicles={vehicles}
      initialCategory={searchParams?.category}
      initialQuery={searchParams?.q}
      dict={dict}
      locale={locale}
      garageVehicleIds={garageVehicleIds}
      initialMyVehicles={searchParams?.myvehicles === "1"}
    />
  )
}
