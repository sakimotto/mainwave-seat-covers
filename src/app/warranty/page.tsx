import type { Metadata } from "next";
import Link from "next/link";
import { ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Warranty Information",
  description:
    "Mainwave Seat Covers warranty policy. 2-year warranty on manufacturing defects. Learn about coverage and how to make a claim.",
};

const covered = [
  "Manufacturing defects in materials and workmanship",
  "Premature wear under normal use conditions",
  "Colour fading beyond normal expectations",
  "Stitching failure under standard use",
  "Zipper and fastening defects",
  "Peeling or delamination of neoprene layers",
];

const notCovered = [
  "Damage caused by misuse, neglect, or accident",
  "Normal wear and tear from heavy commercial use",
  "Damage from harsh chemicals or cleaning agents",
  "Modifications or alterations made by the customer",
  "Damage caused by pets or animals",
  "Improper installation leading to damage",
  "Damage from exposure to extreme temperatures beyond specified limits",
];

export default function WarrantyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <ShieldIcon className="w-12 h-12 mx-auto mb-4 text-mainwave-red" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Warranty Information
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            We stand behind the quality of every product we sell.
          </p>
        </div>
      </section>

      {/* Warranty Coverage */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Warranty Coverage
            </h2>
            <div className="bg-mainwave-grey p-6 md:p-8 border border-mainwave-border mb-8">
              <p className="text-lg font-semibold text-mainwave-black mb-2">
                2-Year Limited Warranty
              </p>
              <p className="text-sm text-mainwave-text leading-relaxed">
                Mainwave Seat Covers provides a 2-year limited warranty from the
                date of purchase on all seat cover products against defects in
                materials and workmanship. This warranty applies to the original
                purchaser and is non-transferable.
              </p>
            </div>
            <p className="text-sm text-mainwave-text leading-relaxed">
              If a product is found to be defective within the warranty period,
              Mainwave Seat Covers will, at its discretion, repair, replace, or
              refund the defective product. Warranty claims must be submitted
              with proof of purchase.
            </p>
          </div>
        </div>
      </section>

      {/* What's Covered */}
      <section className="bg-mainwave-grey py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              What&apos;s Covered
            </h2>
            <ul className="space-y-3">
              {covered.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-mainwave-text"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    &#10003;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What's Not Covered */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              What&apos;s Not Covered
            </h2>
            <ul className="space-y-3">
              {notCovered.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-mainwave-text"
                >
                  <span className="flex-shrink-0 w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    &#10007;
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Make a Claim */}
      <section className="bg-mainwave-grey py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              How to Make a Claim
            </h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Contact Our Team
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Reach out to our customer service team via phone or email
                    with your order number and a description of the issue.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Provide Documentation
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Submit your proof of purchase (order confirmation or receipt)
                    along with clear photographs of the defect.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Assessment
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Our team will assess your claim within 5 business days and
                    advise on the next steps, which may include returning the
                    product for inspection.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  4
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Resolution
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Once approved, we will repair, replace, or refund the
                    product in accordance with Australian Consumer Law.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Contact Us for Warranty Claims
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-mainwave-grey p-6 border border-mainwave-border">
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-2">
                  Phone
                </h3>
                <a
                  href="tel:0392626977"
                  className="text-mainwave-red font-medium hover:underline"
                >
                  (03) 9262 6977
                </a>
              </div>
              <div className="bg-mainwave-grey p-6 border border-mainwave-border">
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-2">
                  Email
                </h3>
                <a
                  href="mailto:sales@mainwaveseatcovers.com.au"
                  className="text-mainwave-red font-medium hover:underline text-sm"
                >
                  sales@mainwaveseatcovers.com.au
                </a>
              </div>
            </div>
            <p className="text-sm text-mainwave-text mt-6 leading-relaxed">
              Our team is available Monday to Friday, 9:00 AM – 5:00 PM AEST.
              For more ways to get in touch, visit our{" "}
              <Link
                href="/form/contact-us"
                className="text-mainwave-red font-medium hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
