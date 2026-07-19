import { getDictionary } from "@/i18n"
import { brand } from "@/brands"

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)

  return (
    <div className="container-site py-12 md:py-16 max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">{dict.region.seeAll}</h1>
      <div className="space-y-3">
        {brand.markets.map((m) => (
          <a
            key={m.id}
            href={m.url}
            className="flex items-center justify-between border border-mainwave-border p-5 hover:border-brand-accent transition-colors group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-accent transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="text-sm font-bold text-mainwave-black">
                {m.country[locale] ?? m.country.en}
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">{m.currency}</span>
          </a>
        ))}
      </div>
    </div>
  )
}
