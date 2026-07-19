import type { Product } from "@/types"

/**
 * Fitment matching against a customer's garage.
 * Products without a vehicleId are universal (merch) — they match every garage.
 */
export function matchesGarage(product: Product, garageVehicleIds: string[]): boolean {
  if (!product.vehicleId) return true
  return garageVehicleIds.includes(product.vehicleId)
}

export function garageVehicleIdsFrom(
  garage: { vehicleId: string }[] | undefined
): string[] {
  return (garage ?? []).map((g) => g.vehicleId)
}
