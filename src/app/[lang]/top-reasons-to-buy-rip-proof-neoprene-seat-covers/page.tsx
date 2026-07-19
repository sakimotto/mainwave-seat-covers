import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import { blogPosts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Reasons to Buy Rip-Proof Neoprene Seat Covers",
  description: "Discover why rip-proof neoprene is the smart choice for Australian drivers who demand durability.",
}

export default function RipProofPage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "top-reasons-to-buy-rip-proof-neoprene-seat-covers"
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
            <span className="text-white">Rip-Proof Neoprene</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Top Reasons to Buy Rip-Proof Neoprene Seat Covers
          </h1>
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <span className="bg-mainwave-red text-white px-2 py-0.5 font-medium">Materials</span>
              <span>November 18, 2025</span>
            </div>

            <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
              Rip-proof neoprene material
            </div>

            <div className="prose prose-sm max-w-none text-mainwave-text">
              <p className="text-base leading-relaxed mb-6">
                Why does rip-proof matter? Because standard seat covers fail. Cheap polyester covers tear under stress, canvas covers fray at the edges, and universal-fit covers stretch and rip at the seams. Rip-proof neoprene seat covers are engineered to withstand the daily abuse of Australian driving — whether you&apos;re a tradie hauling tools, a miner working in remote conditions, or a family managing the chaos of school runs and weekend adventures.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Reason 1: Unmatched Durability</h2>
              <p className="leading-relaxed mb-4">
                Rip-proof neoprene is constructed with a reinforced inner layer that resists tearing even under significant stress. Unlike standard seat covers that can split at the seams after a few months of heavy use, neoprene&apos;s closed-cell structure distributes force across the material, preventing tears from starting or spreading. For tradies and work ute owners, this means seat covers that last years, not months.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Reason 2: Waterproof Protection</h2>
              <p className="leading-relaxed mb-4">
                Neoprene is naturally waterproof. The closed-cell foam structure prevents water, mud, and other liquids from penetrating through to your original seat fabric. This is a game-changer for anyone who deals with wet gear, muddy boots, or accidental spills. Unlike canvas covers that absorb moisture and stay wet for hours, neoprene sheds water and dries quickly.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Reason 3: UV Resistance</h2>
              <p className="leading-relaxed mb-4">
                Australian UV levels are among the highest in the world. Standard seat cover materials can fade, crack, and degrade within a single summer. Rip-proof neoprene is formulated with UV stabilisers that prevent degradation from sun exposure, keeping your covers looking great and performing well for years. This makes them ideal for vehicles parked outdoors or used in open-cut mining environments.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Reason 4: Comfort and Fit</h2>
              <p className="leading-relaxed mb-4">
                Rip-proof neoprene isn&apos;t just tough — it&apos;s comfortable. The 4mm thickness provides excellent padding that reduces fatigue on long drives, while the material naturally regulates temperature to keep you cooler in summer and warmer in winter. When combined with a custom vehicle-specific pattern, neoprene seat covers fit like a second skin — no bunching, no sliding, no loose fabric.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Reason 5: Australian Engineered</h2>
              <p className="leading-relaxed mb-4">
                Mainwave&apos;s rip-proof neoprene seat covers are designed and manufactured in Australia for Australian conditions. Unlike imported alternatives that are designed for milder climates, our covers are built to handle the extremes of the Australian environment — from the heat of the Pilbara to the humidity of Far North Queensland. Every set is cut to exact vehicle patterns in our Melbourne facility, ensuring a fit that imported universal covers simply cannot match.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
              <p className="leading-relaxed mb-4">
                Rip-proof neoprene seat covers represent the ultimate in vehicle interior protection. With unmatched durability, waterproof protection, UV resistance, superior comfort, and Australian engineering, they are the smart choice for anyone who demands the best. Mainwave Seat Covers offers a full range of rip-proof neoprene covers for Australia&apos;s most popular vehicles.
              </p>
              <p className="leading-relaxed mb-4">
                <Link href="/shop" className="text-mainwave-red font-semibold hover:underline">
                  Browse Mainwave rip-proof neoprene seat covers →
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
