import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { ChevronRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "6 Car Care Tips to Keep Your Vehicle Looking New",
  description:
    "Keep your car looking showroom fresh with these 6 essential car care tips from the experts at Mainwave Seat Covers.",
};

export default function CarCareTipsPage() {
  const post = blogPosts.find((p) => p.slug === "blog/6-car-care-tips");
  const recentPosts = blogPosts.filter((p) => p.id !== post?.id).slice(0, 4);

  return (
    <div className="py-8 md:py-12">
      <div className="container-site">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-brand-accent transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <Link href="/blog" className="hover:text-brand-accent transition-colors">
            Blog
          </Link>
          <ChevronRightIcon className="w-3 h-3" />
          <span className="text-mainwave-text">6 Car Care Tips</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold text-brand-accent uppercase tracking-wider">
                  Car Care
                </span>
                <span className="text-[11px] text-gray-400">|</span>
                <span className="text-[11px] text-gray-400">March 15, 2026</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-mainwave-black leading-tight">
                6 Car Care Tips to Keep Your Vehicle Looking New
              </h1>
            </div>

            <div className="aspect-[16/9] bg-gray-200 mb-8 overflow-hidden">
              <img src={post?.image || "/images/blog/car-care-tips.jpg"} alt="Car Care Tips" className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-mainwave-text leading-relaxed text-base mb-6">
                Your vehicle is one of your biggest investments, and keeping it in top
                condition doesn&apos;t have to be difficult or expensive. Whether you drive
                a rugged work ute or a family SUV, these six car care tips will help keep
                your vehicle looking showroom fresh for years to come.
              </p>

              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Tip 1: Invest in Quality Seat Covers
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                The easiest way to protect your vehicle&apos;s interior is with a set of
                premium seat covers. Neoprene seat covers from Mainwave are custom fitted
                for your specific vehicle, providing a snug, factory-like fit that shields
                your original seats from spills, stains, UV damage, and everyday wear.
                They&apos;re also easy to remove and wash, keeping your interior fresh with
                minimal effort.
              </p>

              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Tip 2: Wash Your Car Regularly
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Regular washing is the foundation of car care. Dirt, bird droppings, tree
                sap, and road grime can all damage your paintwork if left unchecked. Aim to
                wash your vehicle at least every two weeks, or more frequently if you drive
                on dirt roads or park under trees. Always use a pH-neutral car wash soap
                and dry with a microfibre towel to prevent water spots.
              </p>

              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Tip 3: Protect Your Interior from UV Damage
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Australia&apos;s harsh sun can wreak havoc on your car&apos;s interior.
                UV rays cause dashboard cracking, seat fading, and leather deterioration.
                Use a windshield sunshade when parked, apply UV protectant to your
                dashboard and trim, and consider neoprene seat covers which offer built-in
                UV resistance to keep your seats looking new.
              </p>

              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Tip 4: Keep Your Interior Clean and Vacuumed
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                A clean interior makes your car feel newer and more pleasant to drive.
                Vacuum your seats, carpets, and floor mats regularly to remove dirt, sand,
                and debris. Wipe down your dashboard and door panels with a damp cloth and
                use interior detailer for a fresh finish. For families, this is especially
                important — kids and pets can create quite a mess.
              </p>

              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Tip 5: Address Scratches and Chips Promptly
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Small scratches and stone chips may seem minor, but they can lead to rust
                and paint deterioration if ignored. Keep a touch-up paint pen handy for
                quick fixes, and consider applying a ceramic coating or paint protection
                film for longer-lasting defense against the elements.
              </p>

              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Tip 6: Follow Your Service Schedule
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Regular mechanical maintenance is just as important as cosmetic care.
                Stick to your vehicle&apos;s service schedule for oil changes, filter
                replacements, brake inspections, and fluid top-ups. A well-maintained
                vehicle runs better, lasts longer, and holds its resale value.
              </p>

              <p className="text-mainwave-text leading-relaxed text-base mt-8">
                By following these six simple tips, you can keep your vehicle in excellent
                condition inside and out. At Mainwave Seat Covers, we&apos;re here to help
                you protect your investment with our range of premium Australian-made
                neoprene seat covers. Browse our collection today or get in touch for
                personalised advice.
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
                  <div className="aspect-[16/10] bg-gray-200 mb-2 overflow-hidden">
                    <img src={recent.image} alt={recent.title} className="w-full h-full object-cover" />
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
  );
}
