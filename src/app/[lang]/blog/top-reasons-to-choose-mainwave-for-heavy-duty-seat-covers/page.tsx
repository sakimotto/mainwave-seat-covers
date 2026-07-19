import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Reasons to Choose Mainwave for Heavy Duty Seat Covers",
  description: "Discover why Mainwave Seat Covers are the top choice for heavy-duty vehicle protection in Australia.",
}

export default function TopReasonsPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-mainwave-border">
        <div className="container-site py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-brand-accent transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Top Reasons to Choose Mainwave</span>
          </div>
        </div>
      </div>

      <article className="container-site py-8 md:py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-brand-accent text-white px-2 py-0.5 font-medium">Guides</span>
          <span>November 1, 2025</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black leading-tight mb-6">
          Top Reasons to Choose Mainwave for Heavy Duty Seat Covers
        </h1>

        <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
          Blog featured image placeholder
        </div>

        <div className="prose prose-sm max-w-none text-mainwave-text">
          <p className="text-base leading-relaxed mb-6">
            When it comes to protecting your vehicle&apos;s interior, not all seat covers are created equal. Mainwave Seat Covers has established itself as Australia&apos;s premier choice for heavy-duty neoprene seat covers. Here are the top reasons why Mainwave stands out from the competition.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">1. Factory-Direct Quality</h2>
          <p className="leading-relaxed mb-4">
            Every Mainwave seat cover is designed and manufactured right here in Australia. Our Melbourne-based facility has over 30 years of experience in textile engineering, ensuring each set meets the highest standards of quality and durability. By choosing Mainwave, you are supporting local manufacturing and Australian jobs.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">2. Premium 4mm Neoprene Material</h2>
          <p className="leading-relaxed mb-4">
            We use only the highest quality 4mm thick neoprene - the same material used in professional wetsuits. This provides superior protection against water, UV damage, and everyday wear. The material is naturally insulating, keeping seats cooler in summer and warmer in winter, while providing excellent padding for long drives.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">3. Custom Fit for Every Vehicle</h2>
          <p className="leading-relaxed mb-4">
            Unlike universal one-size-fits-all covers, Mainwave Seat Covers are custom patterned for each specific vehicle model. We hold patterns for over 30 popular vehicle makes and models, ensuring a factory-like fit that looks great and stays in place. No loose fabric, no bunching, no sliding.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">4. Comprehensive 3-Year Warranty</h2>
          <p className="leading-relaxed mb-4">
            We stand behind our products with a full 3-year manufacturer&apos;s warranty against defects in materials and workmanship. This industry-leading warranty gives you peace of mind that your investment is protected. If something goes wrong, we make it right.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">5. Easy Installation and Maintenance</h2>
          <p className="leading-relaxed mb-4">
            Mainwave Seat Covers are designed for easy DIY installation - no tools or professional help required. The simple slip-on design with integrated fastening system means you can install them in minutes. When it comes time to clean, most covers are machine washable, making maintenance effortless.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">6. Proven Track Record</h2>
          <p className="leading-relaxed mb-4">
            With thousands of satisfied customers across Australia and hundreds of 5-star reviews, Mainwave has proven its commitment to quality and customer satisfaction. Our products consistently receive ratings of 4.7 stars and above, with customers praising the fit, durability, and appearance of our covers.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Why Mainwave Stands Out</h2>
          <p className="leading-relaxed mb-4">
            In a market flooded with cheap imported seat covers, Mainwave differentiates itself through factory-direct manufacturing in our own Thailand facility, premium materials, and a commitment to customer satisfaction. Our covers are not just accessories - they are investments in protecting your vehicle.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
          <p className="leading-relaxed mb-4">
            When you choose Mainwave, you are choosing Australian-made quality, premium materials, custom fit, and a company that stands behind its products. Whether you need heavy-duty protection for a work ute or stylish covers for your family SUV, Mainwave has the perfect solution.
          </p>
        </div>
      </article>
    </div>
  )
}
