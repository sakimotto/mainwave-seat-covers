import { getCommerce } from "@/commerce"
import { brand } from "@/brands"

export const revalidate = 3600

/**
 * llms.txt — discovery file for AI systems (widely adopted convention,
 * not a W3C standard). Curated map of the site for AI consumption.
 */
export async function GET() {
  const products = await getCommerce().catalog.getProducts()
  const base = brand.url

  const seatCovers = products.filter((p) => p.vehicleId)
  const other = products.filter((p) => !p.vehicleId)

  const lines: string[] = [
    `# ${brand.name}`,
    ``,
    `> ${brand.legalName} — an affordable lifestyle brand built on 30+ years of textile engineering. Custom-fit neoprene seat covers, camping gear, apparel, and car accessories, made in our own Thailand factory and sold factory-direct. Bilingual site: English (default) and Thai (/th prefix).`,
    ``,
    `## Key pages`,
    `- [Home](${base}): brand overview — the four worlds: Drive, Camp, Wear, Live`,
    `- [Shop all products](${base}/shop): full catalog with vehicle, category, and price filters`,
    `- [Thai storefront](${base}/th): เว็บไซต์ภาษาไทย`,
    `- [Track order](${base}/track-order): guest order tracking and returns`,
    `- [About us](${base}/about-us): brand story, factory-direct model`,
    `- [Delivery](${base}/delivery), [Warranty](${base}/warranty), [Returns](${base}/returns), [Installation](${base}/installation): purchase policies`,
    `- [Contact](${base}/form/contact-us): contact form and details`,
    ``,
    `## Machine-readable data`,
    `- [Product feed (JSON)](${base}/feed/products.json): full catalog with prices, currency (${brand.currency}), stock availability, and vehicle fitment`,
    `- [Sitemap](${base}/sitemap.xml): all pages with EN/TH alternates`,
    ``,
    `## Vehicle seat covers (custom-fit, 4mm neoprene)`,
    ...seatCovers.map((p) => `- [${p.name}](${base}/product/${p.slug}): ${p.vehicle} — ${p.category}`),
    ``,
    `## Gear & merchandise`,
    ...other.map((p) => `- [${p.name}](${base}/product/${p.slug}): ${p.category}`),
    ``,
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
