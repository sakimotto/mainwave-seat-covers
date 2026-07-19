import { NextResponse } from "next/server"
import { getCommerce } from "@/commerce"
import { brand } from "@/brands"

export const revalidate = 3600

/**
 * Machine-readable product feed for AI agents, shopping channels,
 * and external integrations. Full catalog, localized by ?lang= (en|th).
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang") ?? "en"
  const products = await getCommerce().catalog.getProducts(lang === "th" ? "th" : "en")

  const feed = {
    brand: brand.name,
    currency: brand.currency,
    generatedAt: new Date().toISOString(),
    productCount: products.length,
    products: products.map((p) => {
      const variant = p.variants?.[0]
      return {
        id: p.id,
        sku: variant?.sku ?? null,
        name: p.name,
        slug: p.slug,
        url: `${brand.url}/product/${p.slug}`,
        description: p.description ?? null,
        category: p.category || null,
        vehicle: p.vehicle || null,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        currency: brand.currency,
        onSale: Boolean(p.isSale),
        inStock: (variant?.stock ?? 1) > 0,
        image: `${brand.url}${p.image}`,
        variants: (p.variants ?? []).map((v) => ({
          sku: v.sku,
          color: v.color,
          size: v.size ?? null,
          price: v.price,
          originalPrice: v.originalPrice ?? null,
          inStock: v.stock > 0,
        })),
      }
    }),
  }

  return NextResponse.json(feed)
}
