import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { ChevronRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "What Is Neoprene? Benefits & Features for Seat Covers",
  description:
    "Discover why neoprene is the ultimate material for car seat covers — waterproof, durable, and comfortable.",
};

const benefits = [
  {
    title: "Water Resistant",
    description:
      "Neoprene is inherently water resistant, making it ideal for protecting your seats from spills, rain, and moisture. Liquid beads on the surface rather than soaking in, giving you time to wipe it away.",
  },
  {
    title: "Durable",
    description:
      "Built to last, neoprene withstands heavy daily use without cracking, peeling, or wearing thin. It maintains its shape and appearance even after years of use in demanding conditions.",
  },
  {
    title: "Comfortable",
    description:
      "The soft, flexible nature of neoprene provides a comfortable seating experience. It has a slight cushioning effect that adds extra comfort on long drives, unlike hard vinyl or stiff polyester covers.",
  },
  {
    title: "Easy to Clean",
    description:
      "Neoprene seat covers are incredibly easy to maintain. Simply remove them, wash with mild soap and water, and they dry quickly. No special cleaners or treatments required.",
  },
  {
    title: "UV Resistant",
    description:
      "Australian sun is harsh, but neoprene holds up against UV exposure. It resists fading and degradation from prolonged sun contact, keeping your seats looking newer for longer.",
  },
];

export default function NeopreneGuidePage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "blog/what-is-neoprene-seat-cover-material"
  ).slice(0, 4);

  return (
    <div className="py-8 md:py-12">
      <div className="container-site">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-mainwave-red transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <Link href="/blog" className="hover:text-mainwave-red transition-colors">
            Blog
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span className="text-mainwave-text">What Is Neoprene</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold text-mainwave-red uppercase tracking-wider">
                  Materials
                </span>
                <span className="text-[11px] text-gray-400">|</span>
                <span className="text-[11px] text-gray-400">February 28, 2026</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-mainwave-black leading-tight">
                What Is Neoprene? Benefits &amp; Features for Seat Covers
              </h1>
            </div>

            <div className="aspect-[16/9] bg-gray-200 mb-8 flex items-center justify-center text-gray-400 text-sm">
              Neoprene Material
            </div>

            <div className="prose prose-gray max-w-none">
              {/* What is Neoprene */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                What Is Neoprene?
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Neoprene is a synthetic rubber material originally developed by DuPont in
                the 1930s. Also known as polychloroprene, it was designed to be a versatile,
                durable alternative to natural rubber. Today, neoprene is used across a wide
                range of industries — from wetsuits and medical braces to laptop sleeves
                and, increasingly, premium automotive seat covers.
              </p>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                What makes neoprene special is its combination of properties: it&apos;s
                flexible, water resistant, chemical resistant, and maintains its integrity
                across a wide temperature range. These characteristics make it an ideal
                material for protecting your vehicle&apos;s seats.
              </p>

              {/* Benefits */}
              <h2 className="text-xl font-bold text-mainwave-black mt-10 mb-4">
                Benefits of Neoprene for Seat Covers
              </h2>
              <div className="space-y-6 mb-6">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="border-l-2 border-mainwave-red pl-4">
                    <h3 className="text-base font-bold text-mainwave-black mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-mainwave-text leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Why Choose Neoprene */}
              <h2 className="text-xl font-bold text-mainwave-black mt-10 mb-3">
                Why Choose Neoprene for Your Seat Covers?
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                When it comes to protecting your vehicle&apos;s interior, neoprene stands
                out from the competition. Unlike polyester or canvas seat covers, neoprene
                provides a custom, glove-like fit that looks and feels like a factory
                upgrade. It doesn&apos;t shift or bunch, and it won&apos;t interfere with
                seatbelt operation or built-in airbags.
              </p>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                For Australian drivers, neoprene is particularly well suited. It handles the
                extreme heat of summer, resists UV damage from intense sunlight, and shrugs
                off moisture from beach trips or rainy commutes. Whether you&apos;re
                protecting a brand new vehicle or refreshing an older one, neoprene seat
                covers offer the best combination of protection, comfort, and style.
              </p>
              <p className="text-mainwave-text leading-relaxed text-base">
                At Mainwave Seat Covers, we use only premium-grade neoprene in our seat
                covers, manufactured right here in Melbourne. Each set is custom cut and
                sewn for a perfect fit on your specific vehicle. Browse our range today and
                experience the neoprene difference.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-mainwave-border">
              <Link
                href="/blog"
                className="text-sm text-mainwave-red font-semibold hover:underline"
              >
                ← Back to all articles
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside>
            <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-4">
              Recent Posts
            </h3>
            <div className="space-y-4">
              {recentPosts.map((recent) => (
                <Link
                  key={recent.id}
                  href={`/${recent.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/10] bg-gray-200 mb-2 flex items-center justify-center text-gray-400 text-[10px] p-2 text-center">
                    {recent.title}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-mainwave-red uppercase tracking-wider">
                      {recent.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{recent.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-mainwave-black group-hover:text-mainwave-red transition-colors leading-tight">
                    {recent.title}
                  </h4>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
