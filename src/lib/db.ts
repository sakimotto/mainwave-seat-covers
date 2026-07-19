/**
 * Legacy shim — prefer `getCommerce().catalog` from "@/commerce" in new code.
 * Kept so existing imports keep working while consumers migrate.
 */
import { vercelCatalog } from "@/commerce/vercel/catalog"

export const getVehicles = vercelCatalog.getVehicles
export const getVehicleBySlug = vercelCatalog.getVehicleBySlug
export const getAllProducts = vercelCatalog.getProducts
export const getProductBySlug = vercelCatalog.getProductBySlug
export const getProductsByVehicle = vercelCatalog.getProductsByVehicle
export const getProductsByMakeModel = vercelCatalog.getProductsByMakeModel
export const getPopularProducts = vercelCatalog.getPopularProducts
export const getBlogPosts = vercelCatalog.getBlogPosts
export const getBlogPostBySlug = vercelCatalog.getBlogPostBySlug
