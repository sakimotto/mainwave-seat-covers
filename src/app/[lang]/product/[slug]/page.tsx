import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCommerce } from "@/commerce"
import { getDictionary } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { matchesGarage } from "@/lib/fitment"
import { ProductDetailClient } from "./client"

interface Props {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getCommerce().catalog.getProductBySlug(slug)
  return {
    title: product ? `${product.name} - Mainwave` : "Product Not Found",
    description: product
      ? `Premium neoprene seat covers for ${product.vehicle}. ${product.description ?? ""}`
      : "",
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const { locale, dict } = getDictionary(lang)
  const [product, all, customer] = await Promise.all([
    getCommerce().catalog.getProductBySlug(slug, locale),
    getCommerce().catalog.getProducts(locale),
    getSessionCustomer(),
  ])

  if (!product) notFound()

  const related = all.filter((p) => p.vehicle === product.vehicle && p.id !== product.id).slice(0, 4)
  const garageVehicleIds = customer?.garage.map((g) => g.vehicleId) ?? []
  const fits = garageVehicleIds.length > 0 && Boolean(product.vehicleId) && matchesGarage(product, garageVehicleIds)

  return (
    <ProductDetailClient
      product={product}
      related={related}
      dict={dict}
      locale={locale}
      fitsYourVehicle={fits}
    />
  )
}
