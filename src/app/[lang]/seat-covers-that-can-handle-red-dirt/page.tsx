import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import { blogPosts } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Seat Covers That Handle Red Dirt and Mud",
  description: "Australian conditions demand tough gear. Find seat covers that resist red dirt, mud, and the harsh Outback environment.",
}

export default function RedDirtPage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "seat-covers-that-can-handle-red-dirt"
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
            <span className="text-white">Red Dirt and Mud</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Seat Covers That Handle Red Dirt and Mud
          </h1>
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <span className="bg-brand-accent text-white px-2 py-0.5 font-medium">Guides</span>
              <span>September 28, 2025</span>
            </div>

            <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
              Red dirt and mud seat covers
            </div>

            <div className="prose prose-sm max-w-none text-mainwave-text">
              <p className="text-base leading-relaxed mb-6">
                If you drive on unsealed roads, work on rural properties, or explore Australia&apos;s vast Outback, you know the battle against red dust and mud is real. Fine red dirt finds its way into every crevice, staining fabric and grinding into upholstery fibres. Wet mud cakes onto seats and dries into a crust that&apos;s difficult to remove. Standard seat covers simply aren&apos;t equipped for these uniquely Australian challenges.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">The Problem with Red Dirt and Mud</h2>
              <p className="leading-relaxed mb-4">
                Red dirt is particularly problematic because of its fine particle size. Unlike coarse sand that brushes off easily, red dust particles are microscopic and become embedded in fabric fibres. Once stained, the iron oxide content in red dirt leaves permanent discolouration. Mud introduces moisture that can lead to mould and mildew if not dried properly, while the abrasive nature of both dirt and mud accelerates wear on seat upholstery.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Material Solutions</h2>
              <p className="leading-relaxed mb-4">
                Neoprene is the ideal material for combating red dirt and mud. Its closed-cell structure prevents particles from penetrating into the material — dirt sits on the surface and can be hosed off or wiped away with a damp cloth. Unlike fabric-based covers that absorb moisture and hold onto stains, neoprene&apos;s waterproof nature means mud dries on the surface and flakes off easily. The smooth, non-porous surface doesn&apos;t give red dust a foothold, making cleaning quick and effective.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Cleaning and Maintenance</h2>
              <p className="leading-relaxed mb-4">
                Keeping your seat covers clean in dusty and muddy conditions is straightforward with neoprene. For dry dust and dirt, a quick vacuum or wipe with a damp cloth is usually sufficient. For mud, allow it to dry completely, then brush off the dry residue before wiping down with a mild soap solution. Mainwave neoprene covers are UV-stable and won&apos;t degrade with repeated cleaning, making them ideal for vehicles that regularly encounter dirty conditions.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Recommended Products</h2>
              <p className="leading-relaxed mb-4">
                For vehicles operating in red dirt and muddy conditions, Mainwave&apos;s Premium Neoprene Front and Full Set covers are the top recommendation. Our 4mm neoprene with reinforced stitching handles the toughest conditions, while the custom vehicle-specific fit ensures no gaps where dust can sneak through to your original upholstery. Popular choices include covers for the Toyota Landcruiser 79 Series, Ford Ranger, and Isuzu D-Max — all common vehicles on Australian rural properties and Outback tracks.
              </p>

              <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
              <p className="leading-relaxed mb-4">
                Red dirt and mud are part of Australian driving, but they don&apos;t have to destroy your vehicle&apos;s interior. Mainwave&apos;s Australian-made neoprene seat covers provide the particle resistance, waterproof protection, and easy cleaning that Outback and rural drivers need. Protect your seats from the unique challenges of the Australian landscape with Mainwave.
              </p>
              <p className="leading-relaxed mb-4">
                <Link href="/shop" className="text-brand-accent font-semibold hover:underline">
                  Shop Mainwave covers for Outback and rural driving →
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
