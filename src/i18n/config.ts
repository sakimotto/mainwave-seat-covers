export const locales = ["en", "th"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Prefix a path with the locale. English stays clean (/shop), Thai gets /th/shop. */
export function localePath(locale: Locale, href: string): string {
  if (locale === defaultLocale) return href
  if (href === "/") return `/${locale}`
  return `/${locale}${href}`
}
