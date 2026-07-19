import { tool } from "ai"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { specsForProduct } from "./specs"
import { addToCart as addToCartAction } from "@/commerce/vercel/cart"
import { trackOrder as trackOrderAction } from "@/lib/actions/track-order"
import { getSessionCustomer } from "@/lib/actions/auth"

/** Build the AI toolset. Locale selects localized product names (en|th). */
export function makeAiTools(locale: string) {
  const th = locale === "th"

  return {
    searchProducts: tool({
      description: "Search the catalog by keyword — product names, descriptions, vehicle compatibility. Use for ANY product, price, or stock question; never answer from memory.",
      inputSchema: z.object({
        query: z.string().describe("Search term (e.g. 'Toyota Hilux', 'neoprene front set', 'duffel bag')"),
      }),
      execute: async ({ query }: { query: string }) => {
        const products = await prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { vehicleLabel: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
              ...(th ? [{ nameTh: { contains: query } }] : []),
            ],
          },
          include: {
            variants: { select: { id: true, price: true, originalPrice: true, stock: true, sku: true }, take: 1 },
            vehicle: { select: { make: true } },
          },
          take: 8,
        })
        return products.map((p) => ({
          name: (th && p.nameTh) || p.name,
          slug: p.slug,
          image: p.image,
          vehicle: p.vehicleLabel ?? p.vehicle?.make ?? "",
          category: p.category ?? "",
          price: p.variants[0] ? Number(p.variants[0].price) : 0,
          originalPrice: p.variants[0]?.originalPrice ? Number(p.variants[0].originalPrice) : undefined,
          inStock: (p.variants[0]?.stock ?? 0) > 0,
          variantId: p.variants[0]?.id,
        }))
      },
    }),

    getVehicleFitments: tool({
      description: "Get seat covers that fit a specific vehicle make/model, including year ranges from the fitment table. Use whenever the customer names a vehicle.",
      inputSchema: z.object({
        make: z.string().describe("Vehicle make (e.g. 'Toyota', 'Ford', 'Mazda')"),
        model: z.string().optional().describe("Vehicle model (e.g. 'Hilux', 'Ranger', 'BT-50')"),
      }),
      execute: async ({ make, model }: { make: string; model?: string }) => {
        const vehicle = await prisma.vehicle.findFirst({
          where: { make: { equals: make, mode: "insensitive" } },
          include: { models: { select: { name: true } } },
        })
        if (!vehicle) return { error: `We don't pattern for ${make} yet. Log an inquiry for custom fitment.`, models: [] }

        const fitments = await prisma.fitment.findMany({
          where: {
            vehicleId: vehicle.id,
            ...(model ? { product: { vehicleLabel: { contains: model, mode: "insensitive" } } } : {}),
          },
          include: {
            product: {
              include: {
                variants: { select: { id: true, price: true, originalPrice: true, stock: true }, take: 1 },
              },
            },
          },
          take: 20,
        })

        return {
          make: vehicle.make,
          availableModels: vehicle.models.map((m) => m.name),
          fitments: fitments.map((f) => ({
            name: (th && f.product.nameTh) || f.product.name,
            slug: f.product.slug,
            image: f.product.image,
            category: f.product.category ?? "",
            price: f.product.variants[0] ? Number(f.product.variants[0].price) : 0,
            originalPrice: f.product.variants[0]?.originalPrice ? Number(f.product.variants[0].originalPrice) : undefined,
            inStock: (f.product.variants[0]?.stock ?? 0) > 0,
            variantId: f.product.variants[0]?.id,
            yearStart: f.yearStart ?? undefined,
            yearEnd: f.yearEnd ?? undefined,
            trim: f.trim ?? undefined,
            fitmentNotes: f.notes ?? undefined,
          })),
        }
      },
    }),

    getProductDetails: tool({
      description: "Get full technical details for a product by slug — description, construction specs, variants, stock.",
      inputSchema: z.object({
        slug: z.string().describe("Product slug"),
      }),
      execute: async ({ slug }: { slug: string }) => {
        const product = await prisma.product.findUnique({
          where: { slug },
          include: { variants: true, vehicle: { select: { make: true } } },
        })
        if (!product) return { error: "Product not found." }
        return {
          name: (th && product.nameTh) || product.name,
          description: (th && product.descriptionTh) || product.description,
          features: product.features,
          specs: specsForProduct(product.category),
          vehicle: product.vehicleLabel ?? product.vehicle?.make ?? "",
          category: product.category,
          variants: product.variants.map((v) => ({
            variantId: v.id,
            color: v.color,
            size: v.size,
            sku: v.sku,
            price: Number(v.price),
            originalPrice: v.originalPrice ? Number(v.originalPrice) : undefined,
            stock: v.stock,
          })),
        }
      },
    }),

    addToCart: tool({
      description: "Add a product variant to the customer's cart. Only use with a variantId returned by searchProducts, getVehicleFitments, or getProductDetails — never invent one.",
      inputSchema: z.object({
        variantId: z.string().describe("The variantId from a tool result"),
        quantity: z.number().int().min(1).default(1),
      }),
      execute: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
        const result = await addToCartAction(variantId, quantity)
        return result.success
          ? { success: true, message: "Added to cart. The cart badge is updated." }
          : { success: false, message: result.error ?? "Could not add to cart." }
      },
    }),

    trackOrder: tool({
      description: "Look up an order's status for a GUEST. Requires the order number AND the email address on the order — ask for both before calling. If the customer is signed in, use getMyOrders instead.",
      inputSchema: z.object({
        orderNumber: z.string().describe("Order number (e.g. the 8-character reference)"),
        email: z.string().describe("Email address on the order"),
      }),
      execute: async ({ orderNumber, email }: { orderNumber: string; email: string }) => {
        return trackOrderAction({ orderNumber, email })
      },
    }),

    getMyOrders: tool({
      description: "List the signed-in customer's recent orders with status. Use for any order/tracking question from a signed-in customer — never ask them for an order number first.",
      inputSchema: z.object({}),
      execute: async () => {
        const customer = await getSessionCustomer()
        if (!customer) return { signedIn: false }

        const orders = await prisma.order.findMany({
          where: { customerId: customer.id },
          include: { items: { include: { variant: { include: { product: true } } } } },
          orderBy: { createdAt: "desc" },
          take: 5,
        })

        return {
          signedIn: true,
          orders: orders.map((o) => ({
            reference: o.id.slice(-8).toUpperCase(),
            status: o.status,
            date: o.createdAt.toISOString().slice(0, 10),
            total: Number(o.total),
            items: o.items.map((i) => ({
              name: i.variant.product.name,
              quantity: i.quantity,
            })),
          })),
        }
      },
    }),

    createInquiry: tool({
      description: "Log a customer inquiry for human follow-up. Use when the customer asks for a human, needs a vehicle we don't pattern for, or you can't answer confidently.",
      inputSchema: z.object({
        name: z.string().describe("Customer's full name"),
        email: z.string().describe("Customer's email address"),
        phone: z.string().optional().describe("Customer's phone number"),
        message: z.string().describe("Customer's question or request"),
        subject: z.string().describe("Brief subject line"),
      }),
      execute: async ({ name, email, phone, message, subject }: { name: string; email: string; phone?: string; message: string; subject: string }) => {
        await prisma.inquiry.create({
          data: { name, email, phone, subject, message },
        })
        return {
          success: true,
          message: "Inquiry logged. The team gets back to the customer within one business day.",
        }
      },
    }),
  }
}
