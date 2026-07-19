import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import { blogPosts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Seat Covers for Mining Vehicles Australia",
  description: "Built for the harshest conditions. Find the best seat covers for mining vehicles operating across Australia.",
}

export default function MiningVehiclesPage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "best-seat-covers-for-mining-vehicles"
  ).slice(0, 4)

  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-mainwave-black py-12 md:py-16">
        <div className="container-site">
          <nav className="flex items-center gap-1 text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-white">Mining Vehicles</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Best Seat Covers for Mining Vehicles Australia
          </h1>
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <span className="bg-brand-accent text-white px-2 py-0.5 font-medium">Industry</span>
              <span>November 2, 2025</span>
            </div>

            <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
              Mining vehicle seat covers
            </div>

            <div className="prose prose-sm max-w-none text-mainwave-text">
              <p className="text-base leading-relaxed mb-6">
                Mining vehicles face some of the toughest operating conditions in the world. From the red dust of Western Australia&apos;s Pilbara region to the humidity and mud of Queensland coal mines, your vehicle&apos;s interior copes with extreme heat, abrasive particles, moisture, and constant wear. Standard seat covers simply aren&apos;t built for this environment. You need purpose-engineered protection.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Key Requirements for Mining Seat Covers</h2>
              <p className="leading-relaxed mb-4">
                Mining seat covers must meet a strict set of requirements. Dust resistance is paramount — fine red dust penetrates every gap and clings to fabric, making breathable materials unsuitable. Heat resistance ensures covers don&apos;t degrade when vehicles are parked under the blazing sun. Moisture management prevents mould and mildew in humid conditions. Abrasion resistance protects against the constant wear from work gear, tools, and equipment. And finally, ease of cleaning is essential for maintaining hygiene and appearance in demanding work environments.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Why Neoprene Is Ideal for Mining</h2>
              <p className="leading-relaxed mb-4">
                Neoprene&apos;s closed-cell structure makes it naturally resistant to dust and moisture. Unlike canvas or polyester, neoprene doesn&apos;t absorb dust particles into its fibres — they simply sit on the surface and can be wiped or hosed off. The material&apos;s thermal properties also provide insulation against both heat and cold, improving driver comfort during long shifts. Mainwave&apos;s 4mm neoprene with reinforced stitching offers the abrasion resistance needed for mining environments, while the custom fit ensures covers stay in place even on rough haul roads.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Recommended Products</h2>
              <p className="leading-relaxed mb-4">
                For mining applications, Mainwave recommends our Premium Neoprene Front Seat Covers and Full Set options for popular mining vehicles including the Toyota Landcruiser 200 and 300 Series, Toyota Hilux, Ford Ranger, and Isuzu D-Max. Our Full Set covers provide complete interior protection, while Front Set options are ideal for single-cab configurations. All covers feature 4mm neoprene, reinforced seams, and waterproof backing.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Fleet Discounts Available</h2>
              <p className="leading-relaxed mb-4">
                Mainwave offers volume pricing for mining companies and fleet operators. Whether you need to outfit a single site or an entire national fleet, we can provide customised pricing and bulk delivery. Every set is manufactured to the same exacting standards, ensuring consistent quality across your entire fleet. Contact our team for a fleet quote tailored to your operational needs.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
              <p className="leading-relaxed mb-4">
                Mining vehicles demand seat covers that are as tough as the conditions they operate in. Mainwave&apos;s Australian-made neoprene seat covers deliver the dust resistance, durability, and comfort that mining operators need. With custom patterns for popular mining vehicles and volume fleet pricing, Mainwave is the smart choice for Australian mining operations.
              </p>
              <p className="leading-relaxed mb-4">
                <Link href="/shop" className="text-brand-accent font-semibold hover:underline">
                  Explore Mainwave covers for mining vehicles →
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-mainwave-border">
              <Link
                href="/blog"
                className="text-sm text-brand-accent font-semibold hover:underline"
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
                    <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                      {recent.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{recent.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-mainwave-black group-hover:text-brand-accent transition-colors leading-tight">
                    {recent.title}
                  </h4>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
