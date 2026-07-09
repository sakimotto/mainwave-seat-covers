import { tool } from "ai"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

export const aiTools = {
  searchProducts: tool({
    description: "Search for seat covers by keyword. Searches product names, descriptions, and vehicle compatibility.",
    inputSchema: z.object({
      query: z.string().describe("Search term (e.g. 'Toyota Hilux', 'neoprene front set', 'waterproof')"),
    }),
    execute: async ({ query }: { query: string }) => {
      const products = await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { vehicleLabel: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          variants: { select: { price: true, originalPrice: true }, take: 1 },
          vehicle: { select: { make: true } },
        },
        take: 10,
      })
      return products.map((p) => ({
        name: p.name,
        slug: p.slug,
        vehicle: p.vehicleLabel ?? p.vehicle?.make ?? "",
        category: p.category ?? "",
        price: p.variants[0] ? Number(p.variants[0].price) : 0,
        originalPrice: p.variants[0]?.originalPrice ? Number(p.variants[0].originalPrice) : undefined,
        isSale: p.isSale,
      }))
    },
  }),

  getVehicleFitments: tool({
    description: "Get seat covers available for a specific vehicle make and optional model.",
    inputSchema: z.object({
      make: z.string().describe("Vehicle make (e.g. 'Toyota', 'Ford', 'Mazda')"),
      model: z.string().optional().describe("Vehicle model (e.g. 'Hilux', 'Ranger', 'BT-50')"),
    }),
    execute: async ({ make, model }: { make: string; model?: string }) => {
      const vehicle = await prisma.vehicle.findFirst({
        where: { make: { equals: make, mode: "insensitive" } },
        include: { models: { select: { name: true } } },
      })
      if (!vehicle) return { error: `We don't have products for ${make} yet.`, models: [] }

      const productFilter: Record<string, unknown> = { vehicleId: vehicle.id }
      if (model) {
        productFilter.vehicleLabel = { contains: model, mode: "insensitive" }
      }

      const products = await prisma.product.findMany({
        where: productFilter,
        include: {
          variants: { select: { price: true, originalPrice: true }, take: 1 },
        },
        take: 20,
      })

      return {
        make: vehicle.make,
        models: vehicle.models.map((m) => m.name),
        products: products.map((p) => ({
          name: p.name,
          slug: p.slug,
          category: p.category ?? "",
          price: p.variants[0] ? Number(p.variants[0].price) : 0,
          originalPrice: p.variants[0]?.originalPrice ? Number(p.variants[0].originalPrice) : undefined,
          isSale: p.isSale,
        })),
      }
    },
  }),

  getProductDetails: tool({
    description: "Get full details about a specific product by its URL slug.",
    inputSchema: z.object({
      slug: z.string().describe("Product slug (e.g. 'front-seat-covers-suit-toyota-hilux-8th-gen')"),
    }),
    execute: async ({ slug }: { slug: string }) => {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          variants: true,
          vehicle: { select: { make: true } },
          reviews: { select: { rating: true, text: true, name: true, createdAt: true } },
        },
      })
      if (!product) return { error: "Product not found." }
      return {
        name: product.name,
        description: product.description,
        features: product.features,
        material: product.material,
        vehicle: product.vehicleLabel ?? product.vehicle?.make ?? "",
        category: product.category,
        isSale: product.isSale,
        variants: product.variants.map((v) => ({
          color: v.color,
          sku: v.sku,
          price: Number(v.price),
          originalPrice: v.originalPrice ? Number(v.originalPrice) : undefined,
          stock: v.stock,
        })),
        reviews: product.reviews.map((r) => ({
          name: r.name,
          rating: r.rating,
          text: r.text,
        })),
      }
    },
  }),

  createInquiry: tool({
    description: "Log a customer inquiry for human follow-up. Use when a customer wants to talk to a person or you can't answer their question.",
    inputSchema: z.object({
      name: z.string().describe("Customer's full name"),
      email: z.string().describe("Customer's email address"),
      phone: z.string().optional().describe("Customer's phone number"),
      message: z.string().describe("Customer's question or request"),
      subject: z.string().describe("Brief subject line for the inquiry"),
    }),
    execute: async ({ name, email, phone, message, subject }: { name: string; email: string; phone?: string; message: string; subject: string }) => {
      await prisma.inquiry.create({
        data: { name, email, phone, subject, message },
      })
      return {
        success: true,
        message: "Thanks! Your inquiry has been logged. Our team will get back to you within 1 business day.",
      }
    },
  }),
}
