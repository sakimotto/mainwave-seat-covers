import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import { blogPosts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Who Makes the Best Heavy-Duty Seat Covers in Australia?",
  description: "We compare the top heavy-duty seat cover brands in Australia and explain why Mainwave leads the pack.",
}

export default function HeavyDutyPage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "who-makes-the-best-heavy-duty-seat-cover"
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
            <span className="text-white">Heavy-Duty Seat Covers</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Who Makes the Best Heavy-Duty Seat Covers in Australia?
          </h1>
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <span className="bg-mainwave-red text-white px-2 py-0.5 font-medium">Guides</span>
              <span>December 5, 2025</span>
            </div>

            <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
              Heavy-duty seat cover comparison
            </div>

            <div className="prose prose-sm max-w-none text-mainwave-text">
              <p className="text-base leading-relaxed mb-6">
                Australian conditions are notoriously tough on vehicles. From the scorching heat of the Outback to the red dust of mining sites, the abrasive grit of construction zones, and the humidity of the tropics, your vehicle&apos;s interior takes a relentless beating. When it comes to protecting your seats, heavy-duty seat covers are not a luxury — they&apos;re a necessity.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">What Makes a Seat Cover &ldquo;Heavy Duty&rdquo;?</h2>
              <p className="leading-relaxed mb-4">
                Not all seat covers marketed as &ldquo;heavy duty&rdquo; live up to the name. True heavy-duty construction starts with material thickness. Premium neoprene at 4mm thickness offers the best balance of protection and comfort. Stitching reinforcement is equally critical — double-stitched seams in high-wear areas prevent failure under load. UV resistance ensures the material won&apos;t degrade after months in the Australian sun. Finally, a waterproof backing prevents liquids, mud, and dust from reaching your original upholstery.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Top Brands Compared</h2>
              <p className="leading-relaxed mb-4">
                The Australian market offers several options for heavy-duty seat covers. Imported polyester and canvas brands come in at lower price points but typically lack the durability and fit of premium alternatives. Universal-fit covers from overseas manufacturers often shift around, bunch up, and wear out within months. Some local competitors offer canvas or PVC covers, but these materials lack the comfort and water resistance that neoprene provides.
              </p>
              <p className="leading-relaxed mb-4">
                Mainwave Seat Covers sits at the premium end of the market, and for good reason. Our 4mm neoprene material, custom vehicle-specific patterns, and factory-direct manufacturing set us apart from every competitor. When you compare the long-term value, Mainwave covers often outlast cheaper alternatives by several years.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Why Mainwave Wins</h2>
              <p className="leading-relaxed mb-4">
                Mainwave&apos;s heavy-duty seat covers are factory direct — an Australian brand with 30+ years of textile craft, manufactured in our own Thailand facility. Every set is cut and sewn to custom patterns specific to your vehicle&apos;s make and model — no universal-fit compromises. Our 4mm neoprene material provides superior impact absorption, thermal insulation, and waterproof protection. With reinforced double-stitched seams, UV-stabilised fabric, and a comprehensive warranty, Mainwave covers are engineered to outlast the competition.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
              <p className="leading-relaxed mb-4">
                When it comes to heavy-duty seat covers in Australia, Mainwave Seat Covers is the clear choice. Our combination of factory-direct manufacturing, premium 4mm neoprene, custom vehicle patterns, and proven durability makes us the go-to for tradies, miners, fleet operators, and anyone who demands the best protection for their vehicle.
              </p>
              <p className="leading-relaxed mb-4">
                <Link href="/shop" className="text-mainwave-red font-semibold hover:underline">
                  Shop our full range of heavy-duty seat covers →
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
