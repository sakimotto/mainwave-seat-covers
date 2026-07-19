import { getDictionary } from "@/i18n"
import { TrackOrderClient } from "./track-order-client"

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)

  return (
    <div className="container-site py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-10">{dict.track.title}</h1>
      <TrackOrderClient dict={dict} locale={locale} />
    </div>
  )
}
