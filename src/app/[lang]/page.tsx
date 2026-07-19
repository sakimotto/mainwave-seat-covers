import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Worlds } from "@/components/home/worlds";
import { Story } from "@/components/home/story";
import { Spotlight } from "@/components/home/spotlight";
import { Band } from "@/components/home/band";
import { Roadmap } from "@/components/home/roadmap";
import { Closer } from "@/components/home/closer";
import { getPopularProducts } from "@/lib/db";
import { getDictionary } from "@/i18n";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { locale, dict } = getDictionary(lang);
  const popularProducts = await getPopularProducts();

  return (
    <>
      <Hero dict={dict} locale={locale} />
      <Ticker items={dict.ticker} />
      <Worlds dict={dict} locale={locale} />
      <Story dict={dict} />
      <Spotlight products={popularProducts.slice(0, 8)} dict={dict} locale={locale} />
      <Band dict={dict} />
      <Roadmap dict={dict} />
      <Closer dict={dict} locale={locale} />
    </>
  );
}
