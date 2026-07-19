import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Best Seat Covers for Families and School Runs Australia",
  description: "Discover the most durable and easy-to-clean seat covers for Australian families doing the daily school run.",
}

export default function FamiliesSchoolRunsPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-mainwave-border">
        <div className="container-site py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-brand-accent transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Best Seat Covers for Families</span>
          </div>
        </div>
      </div>

      <article className="container-site py-8 md:py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-brand-accent text-white px-2 py-0.5 font-medium">Guides</span>
          <span>January 5, 2026</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black leading-tight mb-6">
          Best Seat Covers for Families and School Runs Australia
        </h1>

        <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
          Blog featured image placeholder
        </div>

        <div className="prose prose-sm max-w-none text-mainwave-text">
          <p className="text-base leading-relaxed mb-6">
            Family life means messes happen. From spilled drinks to muddy shoes, your car seats take a beating during the daily school run. Protecting your vehicle&apos;s interior with durable, easy-to-clean seat covers is one of the smartest investments you can make as a busy parent.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Why Families Need Durable Seat Covers</h2>
          <p className="leading-relaxed mb-4">
            Australian families spend countless hours in the car - school drop-offs, weekend sports, grocery runs, and holiday road trips. Each journey brings the risk of spills, crumbs, dirt, and general wear. Factory upholstery is expensive to replace, making protective seat covers a practical and cost-effective solution.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Top Features to Look For</h2>

          <h3 className="text-base font-bold text-mainwave-black mt-6 mb-2">Easy to Clean</h3>
          <p className="leading-relaxed mb-4">
            Neoprene seat covers are naturally water-resistant and easy to wipe clean. For deeper cleans, most Mainwave covers are machine washable - simply remove, wash, and reinstall.
          </p>

          <h3 className="text-base font-bold text-mainwave-black mt-6 mb-2">Durable</h3>
          <p className="leading-relaxed mb-4">
            4mm thick neoprene offers superior durability against daily wear and tear. The material resists tearing, stretching, and fading, ensuring your seat covers last for years.
          </p>

          <h3 className="text-base font-bold text-mainwave-black mt-6 mb-2">Comfortable</h3>
          <p className="leading-relaxed mb-4">
            Unlike cheap nylon or polyester covers, neoprene provides a comfortable, padded seating surface that maintains the original comfort of your vehicle&apos;s seats.
          </p>

          <h3 className="text-base font-bold text-mainwave-black mt-6 mb-2">Safe</h3>
          <p className="leading-relaxed mb-4">
            Mainwave Seat Covers are designed to be compatible with factory airbags and seat belt systems. Our custom-fit patterns ensure no interference with safety features.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Recommended Products for Family Cars</h2>
          <p className="leading-relaxed mb-4">
            For families, we recommend our Full Set Neoprene Seat Covers which protect both front and rear seats. The Toyota Landcruiser 200 Series Full Set and Ford Ranger Raptor Full Set are popular choices for larger family vehicles. These complete sets offer maximum coverage and protection for the entire family.
          </p>
          <p className="leading-relaxed mb-4">
            For SUVs and wagons, our Premium Neoprene Front Seat Covers paired with Rear Seat Covers provide comprehensive protection at a more accessible price point.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
          <p className="leading-relaxed mb-4">
            Protecting your car seats from the chaos of family life is essential. With Mainwave&apos;s Australian-made neoprene seat covers, you get durable, easy-to-clean, and comfortable protection that stands up to the demands of the daily school run. Browse our range to find the perfect fit for your family vehicle.
          </p>
        </div>
      </article>
    </div>
  )
}
