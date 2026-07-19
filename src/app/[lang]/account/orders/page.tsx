import { redirect } from "next/navigation"
import Link from "next/link"
import { getDictionary, localePath } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { prisma } from "@/lib/prisma"
import { formatMoney } from "@/lib/format"

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const { locale, dict } = getDictionary(lang)
  const customer = await getSessionCustomer()
  if (!customer) {
    redirect(locale === "th" ? "/th/account/login" : "/account/login")
  }

  const orders = await prisma.order.findMany({
    where: { customerId: customer.id },
    include: { items: { include: { variant: { include: { product: true } } } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="container-site py-12 md:py-16 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">{dict.orders.title}</h1>

      {orders.length === 0 ? (
        <div className="bg-mainwave-grey border border-mainwave-border p-8 text-center">
          <p className="text-sm font-medium text-mainwave-black">{dict.orders.empty}</p>
          <p className="text-xs text-gray-500 mt-2 mb-6">{dict.orders.emptyBody}</p>
          <Link
            href={localePath(locale, "/shop")}
            className="inline-block bg-brand-accent text-white text-sm font-bold uppercase tracking-wider px-8 py-3 hover:bg-red-700 transition-colors"
          >
            {dict.orders.shopNow}
          </Link>
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
    </div>
  )
}
