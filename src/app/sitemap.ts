import type { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export const revalidate = 3600

const baseUrl = "https://www.mainwaveseatcovers.com.au"

function withAlternates(path: string) {
  return {
    languages: {
      en: `${baseUrl}${path}`,
      th: `${baseUrl}/th${path === "/" ? "" : path}`,
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, vehicles, blogPosts] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.vehicle.findMany({
      select: { slug: true, models: { select: { slug: true } } },
    }),
    prisma.blogPost.findMany({ select: { slug: true, date: true } }),
  ])

  const launchDate = new Date("2026-07-19")

  const staticPaths: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/shop", changeFrequency: "weekly", priority: 0.9 },
    { path: "/about-us", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
    { path: "/delivery", changeFrequency: "monthly", priority: 0.7 },
    { path: "/installation", changeFrequency: "monthly", priority: 0.7 },
    { path: "/warranty", changeFrequency: "monthly", priority: 0.7 },
    { path: "/returns", changeFrequency: "monthly", priority: 0.7 },
    { path: "/form/contact-us", changeFrequency: "monthly", priority: 0.6 },
    { path: "/100-gift-card", changeFrequency: "monthly", priority: 0.6 },
    { path: "/shop/cart", changeFrequency: "weekly", priority: 0.5 },
    { path: "/website-terms", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy-policy", changeFrequency: "monthly", priority: 0.5 },
  ]

  const staticPages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${baseUrl}${p.path}`,
    lastModified: launchDate,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    alternates: withAlternates(p.path),
  }))

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/product/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: withAlternates(`/product/${p.slug}`),
  }))

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: post.slug.startsWith("blog/") ? `${baseUrl}/${post.slug}` : `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: withAlternates(post.slug.startsWith("blog/") ? `/${post.slug}` : `/blog/${post.slug}`),
  }))

  const vehiclePages: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${baseUrl}/vehicle/${v.slug}`,
    lastModified: launchDate,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    alternates: withAlternates(`/vehicle/${v.slug}`),
  }))

  const modelPages: MetadataRoute.Sitemap = vehicles.flatMap((v) =>
    v.models.map((m) => ({
      url: `${baseUrl}/shop/${v.slug}/${m.slug}`,
      lastModified: launchDate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      alternates: withAlternates(`/shop/${v.slug}/${m.slug}`),
    }))
  )

  return [...staticPages, ...productPages, ...blogPages, ...vehiclePages, ...modelPages]
}
