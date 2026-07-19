import { mainwave } from "./mainwave/config"
import type { BrandConfig } from "./types"

const brands: Record<string, BrandConfig> = {
  mainwave,
}

const brandId = process.env.NEXT_PUBLIC_BRAND ?? "mainwave"

export const brand: BrandConfig =
  brands[brandId] ??
  (() => {
    throw new Error(
      `Unknown NEXT_PUBLIC_BRAND "${brandId}". Registered brands: ${Object.keys(brands).join(", ")}`
    )
  })()

export type { BrandConfig }
