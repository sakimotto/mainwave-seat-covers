import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description:
    "Mainwave Seat Covers returns and exchanges policy. 30-day return policy, easy exchanges, and fast refund processing.",
};

const returnConditions = [
  "Items must be returned within 30 days of delivery",
  "Products must be unused, uninstalled, and in original packaging",
  "All tags and labels must be attached and intact",
  "Items must be in resaleable condition with no marks, stains, or odours",
  "Proof of purchase (order confirmation or receipt) is required",
  "Return shipping costs are the responsibility of the customer unless the item is faulty",
];

export default function ReturnsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Returns &amp; Exchanges
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Not quite right? We make returns and exchanges simple.
          </p>
        </div>
      </section>

      {/* 30-Day Policy */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              30-Day Return Policy
            </h2>
            <p className="text-mainwave-text leading-relaxed mb-4">
              We want you to be completely satisfied with your purchase. If for
              any reason you are not happy with your seat covers, you may return
              them within 30 days of delivery for a full refund or exchange,
              subject to the conditions below.
            </p>
            <p className="text-mainwave-text leading-relaxed">
              This policy applies to standard, off-the-shelf products. Custom or
              made-to-order items may have different return conditions &mdash;
              please contact our team for details.
            </p>
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="bg-mainwave-grey py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Conditions for Returns
            </h2>
            <ul className="space-y-3">
              {returnConditions.map((condition) => (
                <li
                  key={condition}
                  className="flex items-start gap-3 text-sm text-mainwave-text"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-mainwave-red rounded-full mt-2" />
                  <span className="leading-relaxed">{condition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How to Initiate */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              How to Initiate a Return
            </h2>
            <ol className="space-y-6">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Contact Us
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Email or call our customer service team with your order
                    number and the reason for your return.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Receive a Return Authorisation
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Our team will provide you with a return authorisation number
                    and return shipping instructions.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Pack and Ship
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Securely package the item(s) in the original packaging and
                    ship them to the address provided. We recommend using a
                    trackable shipping service.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-mainwave-red text-white text-sm font-bold rounded-full flex items-center justify-center">
                  4
                </span>
                <div>
                  <h3 className="text-base font-bold text-mainwave-black mb-1">
                    Refund or Exchange Processed
                  </h3>
                  <p className="text-sm text-mainwave-text leading-relaxed">
                    Once we receive and inspect the returned item, we will
                    process your refund or ship your exchange.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Refund Processing */}
      <section className="bg-mainwave-grey py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Refund Processing
            </h2>
            <div className="space-y-4 text-sm text-mainwave-text leading-relaxed">
              <p>
                Refunds are processed within 5 – 7 business days of receiving
                your returned item. The refund will be issued to the original
                payment method used at checkout.
              </p>
              <p>
                Please allow an additional 3 – 5 business days for the refund
                to appear in your account, depending on your bank or payment
                provider.
              </p>
              <p>
                Original shipping costs are non-refundable unless the return is
                due to a faulty or incorrect item.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exchanges */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Exchanges
            </h2>
            <div className="space-y-4 text-sm text-mainwave-text leading-relaxed">
              <p>
                If you need a different size, model, or colour, we are happy to
                arrange an exchange. Contact our team to confirm availability of
                the replacement item before sending your return.
              </p>
              <p>
                If the replacement item is of a higher value, we will provide
                instructions for the additional payment. If it is of a lower
                value, the difference will be refunded to your original payment
                method.
              </p>
              <p>
                Exchange shipping for faulty items is covered by Mainwave Seat
                Covers. For all other exchanges, return shipping is the
                customer&apos;s responsibility.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/form/contact-us"
                className="inline-block bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors"
              >
                Contact Us to Start a Return
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
