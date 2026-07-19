import { brand } from "@/brands"

/**
 * Format a price in the deployment's configured currency.
 * Currency follows the market (brand/deployment config), not the UI locale —
 * e.g. Mainwave shows AUD on both /en and /th until the Thailand launch
 * switches that deployment to THB.
 */
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(brand.currencyLocale, {
    style: "currency",
    currency: brand.currency,
    currencyDisplay: "narrowSymbol",
  }).format(amount)
}
