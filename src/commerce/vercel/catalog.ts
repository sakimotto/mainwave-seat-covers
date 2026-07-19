import { prisma } from "@/lib/prisma"
import type { Vehicle, Product, BlogPost } from "@/types"
import type { CatalogProvider } from "../types"
import { cache } from "react"

const mapVehicle = (v: {
  id: string; make: string; slug: string; image: string;
  models: { name: string }[]
}): Vehicle => ({
  id: v.id,
  make: v.make,
  slug: v.slug,
  image: v.image,
  models: v.models.map((m) => m.name),
})

function mapProduct(p: {
  id: string; name: string; slug: string; image: string;
  category: string | null; vehicleLabel: string | null; vehicleId: string | null;
  isSale: boolean; description: string | null; features: string[];
  material: string | null;
  nameTh: string | null; descriptionTh: string | null;
  variants: { id: string; price: unknown; originalPrice: unknown; color: string; colorHex: string | null; size: string | null; sku: string; stock: number }[];
  reviews: { rating: number }[];
}, locale?: string): Product {
  const v = p.variants[0]
  const avgRating = p.reviews.length > 0
    ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length
    : 0
  const th = locale === "th"
  return {
    id: p.id,
    name: (th && p.nameTh) || p.name,
    slug: p.slug,
    image: p.image,
    price: v ? Number(v.price) : 0,
    originalPrice: v?.originalPrice ? Number(v.originalPrice) : undefined,
    rating: Math.round(avgRating * 10) / 10 || 4.5,
    reviewCount: p.reviews.length || 0,
    vehicle: p.vehicleLabel ?? "",
    vehicleId: p.vehicleId ?? undefined,
    category: p.category ?? "",
    isSale: p.isSale || undefined,
    description: (th && p.descriptionTh) || p.description || undefined,
    features: p.features.length > 0 ? p.features : undefined,
    material: p.material ?? undefined,
    variants: p.variants.map((v) => ({
      color: v.color,
      colorHex: v.colorHex ?? undefined,
      size: v.size ?? undefined,
      sku: v.sku,
      id: v.id,
      price: Number(v.price),
      originalPrice: v.originalPrice ? Number(v.originalPrice) : undefined,
      stock: v.stock,
    })),
  }
}

const mapBlogPost = (b: {
  id: string; title: string; slug: string; excerpt: string;
  image: string; date: Date; category: string; content: string | null;
}): BlogPost => ({
  id: b.id,
  title: b.title,
  slug: b.slug,
  excerpt: b.excerpt,
  image: b.image,
  date: b.date.toLocaleDateString("en-AU", {
    year: "numeric", month: "long", day: "numeric",
  }),
  category: b.category,
  content: b.content ?? undefined,
})

const productInclude = {
  variants: { select: { id: true, price: true, originalPrice: true, color: true, colorHex: true, size: true, sku: true, stock: true }, take: 1 },
  reviews: { select: { rating: true } },
} as const

const productDetailInclude = {
  variants: { select: { id: true, price: true, originalPrice: true, color: true, colorHex: true, size: true, sku: true, stock: true } },
  reviews: { select: { rating: true } },
} as const

export const vercelCatalog: CatalogProvider = {
  getVehicles: cache(async (): Promise<Vehicle[]> => {
    const rows = await prisma.vehicle.findMany({
      include: { models: { select: { name: true } } },
      orderBy: { make: "asc" },
    })
    return rows.map(mapVehicle)
  }),

  getVehicleBySlug: cache(async (slug: string): Promise<Vehicle | null> => {
    const row = await prisma.vehicle.findUnique({
      where: { slug },
      include: { models: { select: { name: true } } },
    })
    return row ? mapVehicle(row) : null
  }),

  getProducts: cache(async (locale?: string): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      include: productInclude,
      orderBy: { createdAt: "desc" },
    })
    return rows.map((p) => mapProduct(p, locale))
  }),

  getProductBySlug: cache(async (slug: string, locale?: string): Promise<Product | null> => {
    const row = await prisma.product.findUnique({
      where: { slug },
      include: productDetailInclude,
    })
    return row ? mapProduct(row, locale) : null
  }),

  getProductsByVehicle: cache(async (vehicleSlug: string, locale?: string): Promise<Product[]> => {
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug: vehicleSlug },
      select: { id: true, make: true },
    })
    if (!vehicle) return []
    const rows = await prisma.product.findMany({
      where: { vehicleId: vehicle.id },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    })
    return rows.map((p) => mapProduct(p, locale))
  }),

  getProductsByMakeModel: cache(async (makeSlug: string, modelName: string, locale?: string): Promise<Product[]> => {
    const vehicle = await prisma.vehicle.findUnique({
      where: { slug: makeSlug },
      select: { id: true, make: true },
    })
    if (!vehicle) return []
    const rows = await prisma.product.findMany({
      where: {
        vehicleId: vehicle.id,
        vehicleLabel: { contains: modelName, mode: "insensitive" },
      },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    })
    return rows.map((p) => mapProduct(p, locale))
  }),

  getPopularProducts: cache(async (locale?: string): Promise<Product[]> => {
    const rows = await prisma.product.findMany({
      include: productInclude,
      orderBy: { createdAt: "desc" },
      take: 8,
    })
    return rows.map((p) => mapProduct(p, locale))
  }),

  getBlogPosts: cache(async (): Promise<BlogPost[]> => {
    const rows = await prisma.blogPost.findMany({
      orderBy: { date: "desc" },
    })
    return rows.map(mapBlogPost)
  }),

  getBlogPostBySlug: cache(async (slug: string): Promise<BlogPost | null> => {
    const row = await prisma.blogPost.findUnique({
      where: { slug },
    })
    return row ? mapBlogPost(row) : null
  }),
}
