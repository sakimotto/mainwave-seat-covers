/**
 * Construction specs per product category, returned by AI tools so Saki
 * can speak technically. These are honest category-level facts about how
 * Mainwave builds things — never per-product inventions.
 */

export const SEAT_COVER_SPECS = {
  material: "4mm closed-cell neoprene (wetsuit-grade)",
  waterproofing: "Closed-cell construction — spills sit on the surface, never soak through to the OEM upholstery",
  uv: "UV-stabilised outer layer to resist fade in sustained sun",
  safety: "Airbag-compatible side seams (burst stitching) — side airbags deploy as designed",
  seams: "Double-stitched with reinforced stress points",
  fitment: "Precision-cut per make/model/year — headrests, armrests, seat controls, split-fold access",
  care: "Machine washable",
  warranty: "3-year manufacturer's warranty",
  install: "DIY, ~15 minutes, no tools",
} as const

const MERCH_SPECS: Record<string, Record<string, string>> = {
  Apparel: {
    fabric: "Premium cotton (see product for GSM)",
    construction: "Double-needle stitching, reinforced collar",
    care: "Machine washable",
  },
  "Car Accessories": {
    construction: "Heavy-duty automotive-grade materials",
    warranty: "Covered by Mainwave product warranty",
  },
  Lifestyle: {
    construction: "Built for outdoor abuse — see product for materials",
    care: "Wipe-clean or machine washable (see product)",
  },
}

/** Spec sheet for a product, keyed by whether it's a seat cover or merch. */
export function specsForProduct(category: string | null | undefined): Record<string, string> {
  if (category && ["Front Set", "Rear Set", "Full Set"].includes(category)) {
    return { ...SEAT_COVER_SPECS }
  }
  return MERCH_SPECS[category ?? ""] ?? {}
}
