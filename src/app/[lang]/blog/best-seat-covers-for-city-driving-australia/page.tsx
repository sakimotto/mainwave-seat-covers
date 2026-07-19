import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Seat Covers for City Driving Australia",
  description: "Protect your car seats from the unique challenges of city driving with stylish and practical seat covers.",
}

export default function CityDrivingPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-mainwave-border">
        <div className="container-site py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-brand-accent transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Best Seat Covers for City Driving Australia</span>
          </div>
        </div>
      </div>

      <article className="container-site py-8 md:py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-brand-accent text-white px-2 py-0.5 font-medium">Guides</span>
          <span>November 15, 2025</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black leading-tight mb-6">
          Best Seat Covers for City Driving Australia
        </h1>

        <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
          Blog featured image placeholder
        </div>

        <div className="prose prose-sm max-w-none text-mainwave-text">
          <p className="text-base leading-relaxed mb-6">
            City driving presents unique challenges for your car&apos;s interior. From the daily commute through peak hour traffic to coffee runs and after-work errands, your seats see constant use. Choosing the right seat covers for city driving means balancing style, protection, and practicality.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">City Driving Wear and Tear</h2>
          <p className="leading-relaxed mb-4">
            City drivers face different wear patterns than highway or off-road users. Frequent entry and exit causes friction on the side bolsters, while coffee spills, food crumbs, and general urban grime accumulate over time. Parking in the sun accelerates fabric fading and cracking. Mainwave&apos;s neoprene seat covers are designed to handle all of these challenges while keeping your interior looking sharp.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Style Meets Function</h2>
          <p className="leading-relaxed mb-4">
            Just because you need protection doesn&apos;t mean you have to sacrifice style. Mainwave offers several colour and stitching options, including Black with Red Stitching, Charcoal with Grey Stitching, and Tan with White Stitching. These options complement modern vehicle interiors while providing full protection.
          </p>
          <p className="leading-relaxed mb-4">
            The custom-fit design ensures the covers look like they came from the factory, with no loose fabric or awkward bunching. Your passengers will never know they are covers.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Easy Maintenance</h2>
          <p className="leading-relaxed mb-4">
            One of the biggest advantages of neoprene for city drivers is ease of maintenance. A quick wipe with a damp cloth handles most everyday spills and dirt. For deeper cleaning, the covers can be removed and machine washed, making it simple to keep your interior fresh without professional detailing.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Recommended Products</h2>
          <p className="leading-relaxed mb-4">
            For city drivers, we recommend our Premium Neoprene Front Seat Covers - they offer the perfect balance of protection, comfort, and style. Popular choices for city vehicles include our covers for the Toyota RAV4, Mazda CX-5, Hyundai Tucson, and Subaru Forester. For those driving smaller city cars, our slim-profile neoprene covers provide excellent protection without adding bulk.
          </p>
          <p className="leading-relaxed mb-4">
            If you frequently carry passengers, consider our Full Set option which covers both front and rear seats, ensuring the entire cabin stays protected.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
          <p className="leading-relaxed mb-4">
            City driving demands seat covers that can keep up with your lifestyle. Mainwave&apos;s Australian-made neoprene covers offer the perfect combination of style, protection, and easy maintenance for the urban driver. Explore our range to find the perfect fit for your vehicle.
          </p>
        </div>
      </article>
    </div>
  )
}
