import type { BlogPost, Product, Vehicle } from "@/types"

/** Result of a checkout attempt, per backend capability. */
export type CheckoutResult =
  | { type: "order"; orderId: string }
  | { type: "redirect"; url: string }

export type CommerceCapabilities = {
  /** true = checkout happens on the platform (Shopify); local checkout form is skipped */
  hostedCheckout: boolean
}

export type CatalogProvider = {
  getVehicles(): Promise<Vehicle[]>
  getVehicleBySlug(slug: string): Promise<Vehicle | null>
  getProducts(locale?: string): Promise<Product[]>
  getProductBySlug(slug: string, locale?: string): Promise<Product | null>
  getProductsByVehicle(vehicleSlug: string, locale?: string): Promise<Product[]>
  getProductsByMakeModel(makeSlug: string, modelName: string, locale?: string): Promise<Product[]>
  getPopularProducts(locale?: string): Promise<Product[]>
  getBlogPosts(): Promise<BlogPost[]>
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>
}

/**
 * A commerce backend. Cart mutations stay as server actions per adapter
 * (client components import them directly); catalog reads go through
 * `catalog` so pages work against any backend.
 */
export type CommerceProvider = {
  id: string
  catalog: CatalogProvider
  capabilities: CommerceCapabilities
}
