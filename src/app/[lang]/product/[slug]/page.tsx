import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getCommerce } from "@/commerce"
import { getDictionary } from "@/i18n"
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
  const [product, all] = await Promise.all([
    getCommerce().catalog.getProductBySlug(slug, locale),
    getCommerce().catalog.getProducts(locale),
  ])

  if (!product) notFound()

  const related = all.filter((p) => p.vehicle === product.vehicle && p.id !== product.id).slice(0, 4)

  return <ProductDetailClient product={product} related={related} dict={dict} locale={locale} />
}
