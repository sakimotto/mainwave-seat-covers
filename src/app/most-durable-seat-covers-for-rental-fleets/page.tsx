import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import { blogPosts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Most Durable Seat Covers for Rental Fleets Australia",
  description: "Protect your fleet investment with the most durable seat covers designed for high-turnover rental vehicles.",
}

export default function RentalFleetsPage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "most-durable-seat-covers-for-rental-fleets"
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
            <span className="text-white">Rental Fleets</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Most Durable Seat Covers for Rental Fleets Australia
          </h1>
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <span className="bg-mainwave-red text-white px-2 py-0.5 font-medium">Industry</span>
              <span>October 15, 2025</span>
            </div>

            <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
              Rental fleet seat covers
            </div>

            <div className="prose prose-sm max-w-none text-mainwave-text">
              <p className="text-base leading-relaxed mb-6">
                Managing a rental fleet means dealing with constant vehicle turnover. Every new renter brings different habits, different cleanliness standards, and different levels of care. Your seats bear the brunt of it all — spills, dirt, Sunscreen, sweat, pet hair, and general wear accumulate rapidly. Without proper protection, seat degradation directly impacts your fleet&apos;s resale value and customer satisfaction scores.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Features That Matter for Rentals</h2>
              <p className="leading-relaxed mb-4">
                Rental fleet seat covers need to excel in specific areas. First and foremost is cleanability — covers should wipe clean in minutes between rentals. Waterproof construction is non-negotiable to prevent damage from spills. Durability must withstand hundreds of rental cycles without visible wear. The installation must be straightforward so damaged covers can be swapped quickly. Finally, a professional appearance is essential for maintaining your brand image.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Cost-Benefit Analysis</h2>
              <p className="leading-relaxed mb-4">
                Investing in premium seat covers for your rental fleet delivers measurable returns. A typical vehicle with unprotected seats can lose $1,000&ndash;$3,000 in resale value due to interior wear over its fleet lifecycle. By contrast, fitting Mainwave neoprene seat covers at approximately $180 per front set preserves your original upholstery in showroom condition. When those covers eventually show wear after hundreds of rentals, simply replace the covers — not the seats. For a fleet of 50 vehicles, the savings can exceed $50,000 over five years.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Recommended Configurations</h2>
              <p className="leading-relaxed mb-4">
                For rental fleets, Mainwave recommends our Premium Neoprene Front Seat Covers as the minimum protection level. For dual-cab and SUV rental vehicles, Full Set covers provide complete rear seat protection — especially important for family rentals. Key fleet-friendly models include the Toyota Hilux, Ford Ranger, Toyota Landcruiser, and Isuzu D-Max, all of which have dedicated Mainwave patterns ready for bulk production.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Bulk Ordering Information</h2>
              <p className="leading-relaxed mb-4">
                Mainwave offers dedicated fleet pricing and bulk ordering for rental companies of all sizes. Our fleet program includes volume discounts, standardised product configurations, priority manufacturing, and consolidated shipping. We can also arrange custom branding on covers for larger fleets. Contact our fleet sales team to discuss your requirements and receive a tailored quotation.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
              <p className="leading-relaxed mb-4">
                Protecting your rental fleet investment starts with the right seat covers. Mainwave&apos;s Australian-made neoprene covers offer the durability, cleanability, and professional appearance that rental operators need. With cost-effective fleet pricing and a proven track record across Australian rental fleets, Mainwave is the partner you can trust.
              </p>
              <p className="leading-relaxed mb-4">
                <Link href="/shop" className="text-mainwave-red font-semibold hover:underline">
                  Shop Mainwave fleet-rated seat covers →
                </Link>
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
  )
}
