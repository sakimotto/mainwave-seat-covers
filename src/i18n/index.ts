import { defaultLocale, isLocale, type Locale } from "./config"
import { en, type Dictionary } from "./dictionaries/en"
import { th } from "./dictionaries/th"
import { deepMerge, type DeepPartial } from "./merge"
import { brand } from "@/brands"

const dictionaries: Record<Locale, Dictionary> = { en, th }

/**
 * Per-brand copy overrides, deep-merged over the base dictionaries.
 * Mainwave needs none — the base dictionaries ARE Mainwave's copy.
 * New brands drop en.ts/th.ts overrides here (see brands/<id>/i18n/).
 */
const brandOverrides: Partial<Record<string, Partial<Record<Locale, DeepPartial<Dictionary>>>>> = {}

export function getDictionary(lang: string): { locale: Locale; dict: Dictionary } {
  const locale = isLocale(lang) ? lang : defaultLocale
  const base = dictionaries[locale]
  const override = brandOverrides[brand.id]?.[locale]
  return { locale, dict: override ? deepMerge(base, override) : base }
}

export { localePath } from "./config"
export type { Locale, Dictionary }
