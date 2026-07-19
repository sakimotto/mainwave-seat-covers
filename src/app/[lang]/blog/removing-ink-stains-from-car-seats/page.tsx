import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Removing Ink Stains from Car Seats",
  description: "Learn how to remove stubborn ink stains from your car seats with these proven methods.",
}

export default function RemovingInkStainsPage() {
  return (
    <div className="bg-white">
      <div className="border-b border-mainwave-border">
        <div className="container-site py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-mainwave-red transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-mainwave-red transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Removing Ink Stains from Car Seats</span>
          </div>
        </div>
      </div>

      <article className="container-site py-8 md:py-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <span className="bg-mainwave-red text-white px-2 py-0.5 font-medium">Car Care</span>
          <span>January 25, 2026</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black leading-tight mb-6">
          Removing Ink Stains from Car Seats
        </h1>

        <div className="bg-mainwave-grey aspect-video mb-8 flex items-center justify-center text-gray-400 text-sm">
          Blog featured image placeholder
        </div>

        <div className="prose prose-sm max-w-none text-mainwave-text">
          <p className="text-base leading-relaxed mb-6">
            Ink stains on car seats can be frustrating, but they are not impossible to remove. Whether a pen has exploded in your pocket or the kids have been creative with markers, acting quickly and using the right method can save your seats. Here are the most effective ways to remove ink stains from car seats.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Method 1: Rubbing Alcohol</h2>
          <p className="leading-relaxed mb-4">
            Rubbing alcohol (isopropyl alcohol) is one of the most effective solvents for breaking down ink. Dampen a clean cloth with rubbing alcohol and gently blot the stain - do not rub, as this can spread the ink. As the stain lifts, move to a clean area of the cloth. Repeat until the stain is gone, then blot with a damp cloth to remove any residue.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Method 2: Hairspray</h2>
          <p className="leading-relaxed mb-4">
            Hairspray contains alcohol which can help dissolve ink. Spray a generous amount directly onto the stain and let it sit for 30-60 seconds. Blot with a clean cloth, reapplying as needed. Once the stain lifts, wipe the area with a damp cloth and allow to dry. Test on an inconspicuous area first, as some hairsprays contain oils that could leave residue.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Method 3: Vinegar Solution</h2>
          <p className="leading-relaxed mb-4">
            Mix equal parts white vinegar and water in a spray bottle. Spray the solution onto the ink stain and let it sit for 5-10 minutes. Blot with a clean cloth until the stain transfers. For stubborn stains, add a small amount of dish soap to the mixture. Rinse with clean water and blot dry.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Method 4: Commercial Cleaners</h2>
          <p className="leading-relaxed mb-4">
            There are many commercial upholstery cleaners designed specifically for ink and stubborn stains. Look for products containing enzymes or oxygen-based bleach that break down organic compounds. Always follow the manufacturer&apos;s instructions and test on a hidden area first. Products like Tuff Stuff or Chemical Guys upholstery cleaner are popular choices.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Prevention Tips</h2>
          <p className="leading-relaxed mb-4">
            The best way to deal with ink stains is to prevent them. Keep pens secured in the glove box or centre console, use capped markers for kids, and consider using seat covers for added protection. Mainwave&apos;s neoprene seat covers provide a waterproof barrier that makes cleaning spills and stains much easier - simply wipe clean or machine wash the covers.
          </p>

          <h2 className="text-lg font-bold text-mainwave-black mt-8 mb-3">Conclusion</h2>
          <p className="leading-relaxed mb-4">
            Ink stains do not have to be permanent. With prompt action and the right technique, most ink stains can be successfully removed from car seats. For ultimate peace of mind, investing in a set of custom-fit seat covers will protect your original upholstery and make future cleaning much simpler.
          </p>
        </div>
      </article>
    </div>
  )
}
