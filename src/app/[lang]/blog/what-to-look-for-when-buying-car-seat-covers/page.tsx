import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { ChevronRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "What to Look for When Buying Car Seat Covers",
  description:
    "A comprehensive guide to choosing the right seat covers for your vehicle, from material to fitment.",
};

const checklist = [
  "Material type (neoprene recommended for best all-round protection)",
  "Vehicle-specific custom fit vs universal fit",
  "Airbag compatibility and safety certification",
  "Ease of installation and removal for cleaning",
  "UV resistance for Australian climate conditions",
  "Water and stain resistance rating",
  "Warranty coverage and return policy",
  "Customer reviews and ratings from verified buyers",
];

export default function BuyingGuidePage() {
  const recentPosts = blogPosts.filter(
    (p) => p.slug !== "blog/what-to-look-for-when-buying-car-seat-covers"
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
          <span className="text-mainwave-text">Buying Guide</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[11px] font-bold text-mainwave-red uppercase tracking-wider">
                  Buying Guide
                </span>
                <span className="text-[11px] text-gray-400">|</span>
                <span className="text-[11px] text-gray-400">February 10, 2026</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-mainwave-black leading-tight">
                What to Look for When Buying Car Seat Covers
              </h1>
            </div>

            <div className="aspect-[16/9] bg-gray-200 mb-8 flex items-center justify-center text-gray-400 text-sm">
              Buying Guide
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-mainwave-text leading-relaxed text-base mb-6">
                Choosing the right seat covers for your car can feel overwhelming with the
                sheer number of options on the market. From universal-fit polyester covers
                to custom-moulded neoprene sets, the differences in quality, fit, and
                protection are significant. This guide will walk you through the key factors
                to consider so you can make the best choice for your vehicle and lifestyle.
              </p>

              {/* Material Matters */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Material Matters
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                The material of your seat covers is arguably the most important factor.
                Neoprene is widely regarded as the gold standard for automotive seat
                protection. It&apos;s water resistant, durable, comfortable, and provides
                a snug, custom-like fit. Canvas is another option for heavy-duty use but
                lacks the flexibility and comfort of neoprene. Polyester and nylon are
                budget-friendly but offer less protection and tend to wear out faster.
                For most Australian drivers, neoprene offers the best balance of
                protection, comfort, and longevity.
              </p>

              {/* Fit is Crucial */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Fit is Crucial
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                A seat cover that doesn&apos;t fit properly will look sloppy, shift around
                while driving, and may even interfere with seatbelt operation or airbag
                deployment. Always opt for vehicle-specific custom-fit seat covers over
                universal-fit options. Custom covers are designed using 3D scans and
                patterns specific to your vehicle&apos;s make, model, and year, ensuring
                a factory-like fit that looks OEM. At Mainwave, every set is cut and sewn
                to match your exact seat specifications.
              </p>

              {/* Durability */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Durability
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Consider how your vehicle is used day-to-day. If you&apos;re a tradie
                throwing tools and gear on your seats, you need heavy-duty construction
                with reinforced seams. If you&apos;re a parent dealing with spills and
                crumbs, stain resistance and ease of cleaning are paramount. Premium
                neoprene seat covers excel in both scenarios — they&apos;re tough enough
                for the worksite yet easy enough to hose off after a beach trip. Look for
                covers with reinforced stitching and quality zippers that won&apos;t fail
                after a few months.
              </p>

              {/* Ease of Installation */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Ease of Installation
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                Nobody wants to spend hours wrestling with ill-fitting covers. Good quality
                seat covers should come with clear instructions and be designed for
                straightforward installation. Custom-fit covers typically slide over your
                existing seats and secure with straps, hooks, or Velcro — no tools
                required. They should also be easy to remove when it&apos;s time to wash
                them, so consider how simple the removal process is before purchasing.
              </p>

              {/* Warranty */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Warranty
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base mb-4">
                A strong warranty is a sign that the manufacturer stands behind their
                product. Look for seat covers that come with at least a 12-month warranty
                covering defects in materials and workmanship. Mainwave Seat Covers offers
                comprehensive warranty coverage on all our products, giving you peace of
                mind that your investment is protected. Be wary of cheap imported covers
                that offer no warranty — if something goes wrong, you&apos;re on your own.
              </p>

              {/* Buying Checklist */}
              <h2 className="text-xl font-bold text-mainwave-black mt-10 mb-4">
                Your Seat Cover Buying Checklist
              </h2>
              <div className="bg-mainwave-grey p-6 mb-6">
                <ul className="space-y-3">
                  {checklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-mainwave-text"
                    >
                      <span className="mt-0.5 flex-shrink-0 w-5 h-5 border border-mainwave-red text-mainwave-red flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conclusion */}
              <h2 className="text-xl font-bold text-mainwave-black mt-8 mb-3">
                Conclusion
              </h2>
              <p className="text-mainwave-text leading-relaxed text-base">
                Buying car seat covers is an investment in your vehicle&apos;s longevity
                and your daily comfort. By focusing on material quality, custom fit,
                durability, ease of installation, and warranty coverage, you can make a
                choice you&apos;ll be happy with for years. At Mainwave Seat Covers, we
                tick every box on this checklist with our premium Australian-made neoprene
                seat covers. Browse our range for your vehicle today.
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
