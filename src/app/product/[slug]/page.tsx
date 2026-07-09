import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProductBySlug, getAllProducts } from "@/lib/db"
import { ProductDetailClient } from "./client"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  return {
    title: product ? `${product.name} - Mainwave Seat Covers` : "Product Not Found",
    description: product
      ? `Premium neoprene seat covers for ${product.vehicle}. ${product.description ?? ""}`
      : "",
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const [product, all] = await Promise.all([
    getProductBySlug(slug),
    getAllProducts(),
  ])

  if (!product) notFound()

  const related = all.filter((p) => p.vehicle === product.vehicle && p.id !== product.id).slice(0, 4)

  return <ProductDetailClient product={product} related={related} />
}
