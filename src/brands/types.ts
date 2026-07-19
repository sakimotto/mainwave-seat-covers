export type BrandConfig = {
  /** Short brand id — matches folder name and NEXT_PUBLIC_BRAND env */
  id: string
  /** Display name, e.g. "Mainwave" */
  name: string
  /** Legal entity for footer/ABN lines */
  legalName: string
  abn?: string
  tagline: string
  phone: { display: string; href: string }
  email: string
  address: string
  socials: { facebook?: string; instagram?: string }
  /** Canonical production URL (metadata, sitemap, JSON-LD) */
  url: string
  /** ISO 4217 — display currency for this deployment */
  currency: string
  /** BCP-47 locale used for currency formatting */
  currencyLocale: string
  /** Which region/province list the checkout address form uses */
  addressRegion: "au" | "th"
  /** Enabled locales — must be a subset of i18n locales */
  locales: readonly string[]
  /** Theme tokens (override Tailwind @theme defaults via inline CSS vars) */
  theme: {
    accent: string
    accentHover: string
  }
  features: {
    chat: boolean
    blog: boolean
    reviews: boolean
    vehicleSelector: boolean
  }
}
