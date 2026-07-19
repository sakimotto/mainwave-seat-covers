import type { CommerceProvider } from "../types"
import { vercelCatalog } from "./catalog"

export const vercelCommerce: CommerceProvider = {
  id: "vercel",
  catalog: vercelCatalog,
  capabilities: {
    hostedCheckout: false,
  },
}
