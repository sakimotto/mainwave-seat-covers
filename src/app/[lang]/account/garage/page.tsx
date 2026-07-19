import { redirect } from "next/navigation"
import { getDictionary } from "@/i18n"
import { getSessionCustomer } from "@/lib/actions/auth"
import { getCommerce } from "@/commerce"
import { GarageClient } from "./garage-client"

export default async function GaragePage({
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

  const vehicles = await getCommerce().catalog.getVehicles()

  return (
    <div className="container-site py-12 md:py-16 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">{dict.garage.title}</h1>
      <GarageClient
        dict={dict}
        locale={locale}
        catalogVehicles={vehicles}
        garage={customer.garage.map((g) => ({
          id: g.id,
          make: g.vehicle.make,
          model: g.model,
          year: g.year,
          nickname: g.nickname,
        }))}
      />
    </div>
  )
}
