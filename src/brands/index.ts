import { mainwave } from "./mainwave/config"
import type { BrandConfig } from "./types"

const brands: Record<string, BrandConfig> = {
  mainwave,
}

const brandId = process.env.NEXT_PUBLIC_BRAND ?? "mainwave"

const base: BrandConfig =
  brands[brandId] ??
  (() => {
    throw new Error(
      `Unknown NEXT_PUBLIC_BRAND "${brandId}". Registered brands: ${Object.keys(brands).join(", ")}`
    )
  })()

/**
 * Deployment-level overrides: the same brand can deploy to different markets
 * (e.g. Mainwave AU = AUD, Mainwave TH = THB) without forking the brand config.
 */
export const brand: BrandConfig = {
  ...base,
  currency: process.env.NEXT_PUBLIC_CURRENCY ?? base.currency,
  currencyLocale: process.env.NEXT_PUBLIC_CURRENCY_LOCALE ?? base.currencyLocale,
  addressRegion:
    process.env.NEXT_PUBLIC_ADDRESS_REGION === "th" ? "th" : base.addressRegion,
  homeMarket: process.env.NEXT_PUBLIC_HOME_MARKET ?? base.homeMarket,
}

export type { BrandConfig }
