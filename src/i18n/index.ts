import { defaultLocale, isLocale, type Locale } from "./config"
import { en, type Dictionary } from "./dictionaries/en"
import { th } from "./dictionaries/th"

const dictionaries: Record<Locale, Dictionary> = { en, th }

export function getDictionary(lang: string): { locale: Locale; dict: Dictionary } {
  const locale = isLocale(lang) ? lang : defaultLocale
  return { locale, dict: dictionaries[locale] }
}

export { localePath } from "./config"
export type { Locale, Dictionary }
