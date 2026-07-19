import type { Metadata } from "next";
import { GiftIcon } from "@/components/icons";


export const metadata: Metadata = {
  title: "Mainwave Gift Card - $100",
  description:
    "Give the gift of quality seat covers. Mainwave Seat Covers $100 gift card — the perfect present for any vehicle owner.",
};

const terms = [
  "Gift cards are delivered electronically via email to the recipient.",
  "Gift cards are valid for 12 months from the date of purchase.",
  "Gift cards can be redeemed for any product on the Mainwave Seat Covers website.",
  "Gift cards are non-refundable and cannot be exchanged for cash.",
  "If the total order value exceeds the gift card balance, the remaining amount must be paid using another payment method.",
  "Lost or stolen gift cards cannot be replaced.",
  "Gift cards may not be used to purchase other gift cards.",
  "Mainwave Seat Covers reserves the right to modify these terms at any time.",
];

export default function GiftCardPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <GiftIcon className="w-12 h-12 mx-auto mb-4 text-mainwave-red" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Mainwave Gift Card
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Give the gift of premium seat covers.
          </p>
        </div>
      </section>

      {/* Gift Card Display */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <div className="bg-mainwave-black text-white p-8 md:p-12 border border-mainwave-red relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-10">
                <GiftIcon className="w-32 h-32" />
              </div>
              <div className="relative">
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Mainwave Seat Covers
                </p>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">
                  Gift Card
                </p>
                <p className="text-5xl md:text-7xl font-bold mb-6">
                  $100
                </p>
                <p className="text-sm text-gray-300 max-w-md leading-relaxed mb-8">
                  Treat someone special to the gift of quality seat covers. Our
                  $100 gift card can be put towards any product in our range of
                  premium neoprene seat covers — from front sets to full
                  vehicle packages.
                </p>
                <button className="bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider px-8 py-3 hover:bg-red-700 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-mainwave-black mb-4">
                The Perfect Gift
              </h2>
              <div className="space-y-4 text-sm text-mainwave-text leading-relaxed">
                <p>
                  Not sure which seat covers they need? A Mainwave gift card lets
                  them choose exactly what fits their vehicle and style. Whether
                  it&apos;s for a birthday, Christmas, Father&apos;s Day, or
                  just because — a gift card is always the right choice.
                </p>
                <p>
                  The gift card is delivered instantly via email, making it the
                  perfect last-minute gift. Simply enter the recipient&apos;s
                  email address at checkout and they will receive their gift
                  card within minutes.
                </p>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-10 pt-8 border-t border-mainwave-border">
              <h2 className="text-xl font-bold text-mainwave-black mb-4">
                Terms &amp; Conditions
              </h2>
              <ul className="space-y-2">
                {terms.map((term) => (
                  <li
                    key={term}
                    className="flex items-start gap-2 text-xs text-mainwave-text leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-1 h-1 bg-mainwave-text rounded-full mt-2" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


