import type { CommerceProvider } from "./types"
import { vercelCommerce } from "./vercel"

const backend = process.env.COMMERCE ?? "vercel"

function resolve(): CommerceProvider {
  switch (backend) {
    case "vercel":
      return vercelCommerce
    default:
      throw new Error(
        `Unknown COMMERCE backend "${backend}". Available: vercel (shopify, odoo coming)`
      )
  }
}

let instance: CommerceProvider | undefined

export function getCommerce(): CommerceProvider {
  if (!instance) {
    instance = resolve()
  }
  return instance
}

export type { CommerceProvider, CatalogProvider, CheckoutResult } from "./types"
