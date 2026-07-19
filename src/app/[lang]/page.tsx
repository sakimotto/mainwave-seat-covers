import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Worlds } from "@/components/home/worlds";
import { Story } from "@/components/home/story";
import { Spotlight } from "@/components/home/spotlight";
import { Band } from "@/components/home/band";
import { Roadmap } from "@/components/home/roadmap";
import { Closer } from "@/components/home/closer";
import { GarageStrip } from "@/components/home/garage-strip";
import { Newsletter } from "@/components/home/newsletter";
import { getCommerce } from "@/commerce";
import { getDictionary } from "@/i18n";
import { getSessionCustomer } from "@/lib/actions/auth";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { locale, dict } = getDictionary(lang);
  const [popularProducts, customer] = await Promise.all([
    getCommerce().catalog.getPopularProducts(locale),
    getSessionCustomer(),
  ]);

  const garageMakes = customer ? [...new Set(customer.garage.map((g) => g.vehicle.make))] : [];

  return (
    <>
      <Hero dict={dict} locale={locale} />
      {garageMakes.length > 0 && (
        <GarageStrip makes={garageMakes} dict={dict} locale={locale} />
      )}
      <Ticker items={dict.ticker} />
      <Worlds dict={dict} locale={locale} />
      <Story dict={dict} />
      <Spotlight products={popularProducts.slice(0, 8)} dict={dict} locale={locale} />
      <Band dict={dict} />
      <Roadmap dict={dict} />
      <Newsletter dict={dict} locale={locale} />
      <Closer dict={dict} locale={locale} />
    </>
  );
}
