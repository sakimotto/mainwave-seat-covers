import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { Worlds } from "@/components/home/worlds";
import { Story } from "@/components/home/story";
import { Spotlight } from "@/components/home/spotlight";
import { Roadmap } from "@/components/home/roadmap";
import { Testimonials } from "@/components/home/testimonials";
import { Closer } from "@/components/home/closer";
import { getPopularProducts } from "@/lib/db";

export default async function HomePage() {
  const popularProducts = await getPopularProducts();

  return (
    <>
      <Hero />
      <Ticker />
      <Worlds />
      <Story />
      <Spotlight products={popularProducts.slice(0, 8)} />
      <Roadmap />
      <Testimonials />
      <Closer />
    </>
  );
}
