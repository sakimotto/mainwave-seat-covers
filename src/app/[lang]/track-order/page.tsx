import { getDictionary, localePath } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { prisma } from "@/lib/prisma"
import { formatMoney } from "@/lib/format"
import { TrackOrderClient } from "./track-order-client"

export default async function TrackOrderPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)
  const customer = await getSessionCustomer()

  // Signed-in customers see their own orders — no forms, no re-login
  if (customer) {
    const orders = await prisma.order.findMany({
      where: { customerId: customer.id },
      include: { items: { include: { variant: { include: { product: true } } } } },
      orderBy: { createdAt: "desc" },
      take: 10,
    })

    return (
      <div className="container-site py-12 md:py-16 max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-2">{dict.track.title}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {dict.account.welcome}, {customer.name ?? customer.email}
        </p>

        {orders.length === 0 ? (
          <div className="bg-mainwave-grey border border-mainwave-border p-8 text-center">
            <p className="text-sm font-medium text-mainwave-black">{dict.orders.empty}</p>
            <p className="text-xs text-gray-500 mt-2">{dict.orders.emptyBody}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-mainwave-border p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-mainwave-black font-mono">
                      #{order.id.slice(-8).toUpperCase()}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-mainwave-grey text-mainwave-text">
                      {order.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {order.createdAt.toLocaleDateString(locale === "th" ? "th-TH" : "en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-mainwave-text">
                  {order.items.map((item) => (
                    <p key={item.id}>
                      {item.variant.product.name} ({item.variant.color}
                      {item.variant.size ? ` / ${item.variant.size}` : ""}) × {item.quantity}
                    </p>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-mainwave-border flex justify-between text-sm">
                  <span className="text-gray-500">{dict.orders.total}</span>
                  <span className="font-bold text-brand-accent">{formatMoney(Number(order.total))}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 text-xs text-gray-500 text-center">
          {dict.track.guestHelper}{" "}
          <a href={localePath(locale, "/form/contact-us")} className="underline text-brand-accent">
            {dict.nav.contact}
          </a>
        </p>
      </div>
    )
  }

  // Guests: sign-in or order-number lookup
  return (
    <div className="container-site py-12 md:py-16">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-10">{dict.track.title}</h1>
      <TrackOrderClient dict={dict} locale={locale} />
    </div>
  )
}
