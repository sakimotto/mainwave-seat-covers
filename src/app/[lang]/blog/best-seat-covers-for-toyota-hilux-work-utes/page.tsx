import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Seat Covers for Toyota Hilux Work Utes",
  description: "Tough seat covers built for the toughest conditions. Find the perfect fit for your work ute.",
}

export default function HiluxWorkUtesPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-mainwave-border">
        <div className="container-site py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-brand-accent transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Best Seat Covers for Toyota Hilux Work Utes</span>
          </div>
        </div>
      </div>

      <article className="container-site py-8 md:py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-brand-accent text-white px-2 py-0.5 font-medium">Guides</span>
          <span>December 20, 2025</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black leading-tight mb-6">
          Best Seat Covers for Toyota Hilux Work Utes
        </h1>

        <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
          Blog featured image placeholder
        </div>

        <div className="prose prose-sm max-w-none text-mainwave-text">
          <p className="text-base leading-relaxed mb-6">
            The Toyota Hilux is Australia&apos;s favourite work ute, and for good reason. But a work ute needs work-ready seat covers. From dusty job sites to muddy boots and tools, the interior of a Hilux takes a pounding. Here is why Mainwave&apos;s heavy-duty neoprene seat covers are the perfect solution for your work ute.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Why Hilux Utes Need Tough Covers</h2>
          <p className="leading-relaxed mb-4">
            Work utes face conditions that regular cars never encounter. Dust, mud, oil, tools, and heavy equipment all take their toll on factory upholstery. Once the original fabric is stained or damaged, it significantly reduces the resale value of your vehicle. Heavy-duty seat covers protect your investment and keep your cabin looking professional.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Best Options for Work Utes</h2>
          <p className="leading-relaxed mb-4">
            For the Toyota Hilux, we recommend our Premium Neoprene Front Seat Covers designed specifically for the 8th Gen Hilux. These covers feature 4mm thick neoprene with reinforced stitching in high-wear areas. The waterproof backing prevents liquids from seeping through, while the UV-resistant outer layer protects against sun damage.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Heavy-Duty Features</h2>
          <p className="leading-relaxed mb-4">
            Mainwave work ute covers come with several heavy-duty features: reinforced double-stitched seams for maximum durability, non-slip backing to keep covers firmly in place during the work day, easy-clean surface that wipes down with a damp cloth, and UV-resistant material that won&apos;t fade in the harsh Australian sun.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Recommended Products</h2>
          <p className="leading-relaxed mb-4">
            Our top recommendation for the Toyota Hilux 8th Gen is the Premium Neoprene Front Seat Covers (Product TY7035N). At $179.95 (reduced from $299.95), they offer exceptional value and durability. For complete coverage, consider adding our Rear Seat Covers for crew cab models.
          </p>
          <p className="leading-relaxed mb-4">
            For other popular work utes, we also carry covers for the Ford Ranger PX and Next Gen, Isuzu D-Max, Mitsubishi Triton, and Nissan Navara - all built to the same heavy-duty standards.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
          <p className="leading-relaxed mb-4">
            Your Toyota Hilux works hard, and your seat covers should too. Mainwave&apos;s Australian-made neoprene covers provide the durability, protection, and professional appearance that work ute owners need. Protect your investment and keep your cabin in top condition with Mainwave.
          </p>
        </div>
      </article>
    </div>
  )
}
