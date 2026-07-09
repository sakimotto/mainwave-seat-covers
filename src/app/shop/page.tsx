import { getAllProducts, getVehicles } from "@/lib/db"
import { ShopPageClient } from "./shop-page-client"

export default async function ShopPage() {
  const [products, vehicles] = await Promise.all([
    getAllProducts(),
    getVehicles(),
  ])

  return <ShopPageClient initialProducts={products} initialVehicles={vehicles} />
}
