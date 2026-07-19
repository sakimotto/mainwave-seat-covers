import type { Metadata } from "next";
import Link from "next/link";
import { TruckIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Delivery Information",
  description:
    "Delivery information for Mainwave Seat Covers. Shipping within Australia and internationally. Free shipping on orders over $150.",
};

const deliveryZones = [
  {
    zone: "Metro Areas",
    estimate: "2 – 5 business days",
    description: "Sydney, Melbourne, Brisbane, Adelaide, Perth, Canberra and surrounding suburbs.",
  },
  {
    zone: "Regional Areas",
    estimate: "5 – 10 business days",
    description: "Regional centres and surrounding towns within each state.",
  },
  {
    zone: "Remote Areas",
    estimate: "10 – 14 business days",
    description: "Remote and rural locations including WA, NT and TAS regional areas.",
  },
];

export default function DeliveryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <TruckIcon className="w-12 h-12 mx-auto mb-4 text-brand-accent" />
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Delivery Information
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Fast, reliable shipping across Australia and selected international
            destinations.
          </p>
        </div>
      </section>

      {/* Domestic Shipping */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Shipping Within Australia
            </h2>
            <p className="text-mainwave-text leading-relaxed mb-8">
              We ship all orders via Australia Post and selected courier
              partners. All orders are dispatched from our Melbourne warehouse.
              You will receive a confirmation email with tracking details once
              your order has been dispatched.
            </p>

            {/* Delivery Zones Table */}
            <div className="border border-mainwave-border overflow-hidden mb-10">
              <div className="bg-mainwave-black text-white grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_2fr] text-sm font-bold uppercase tracking-wider">
                <div className="px-4 py-3 border-r border-white/10">Zone</div>
                <div className="px-4 py-3 border-r border-white/10">Estimated Time</div>
                <div className="hidden md:block px-4 py-3">Details</div>
              </div>
              {deliveryZones.map((zone, index) => (
                <div
                  key={zone.zone}
                  className={`grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_2fr] text-sm text-mainwave-text ${
                    index < deliveryZones.length - 1 ? "border-b border-mainwave-border" : ""
                  }`}
                >
                  <div className="px-4 py-3 font-semibold border-r border-mainwave-border">
                    {zone.zone}
                  </div>
                  <div className="px-4 py-3 font-medium text-brand-accent border-r border-mainwave-border md:border-r-0">
                    {zone.estimate}
                  </div>
                  <div className="hidden md:block px-4 py-3 text-gray-500">
                    {zone.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Free Shipping */}
            <div className="bg-mainwave-grey p-6 md:p-8 border border-mainwave-border mb-10">
              <h3 className="text-lg font-bold text-mainwave-black mb-2">
                Free Shipping Over $150
              </h3>
              <p className="text-sm text-mainwave-text leading-relaxed">
                We offer free standard shipping on all Australian orders over
                $150. This is automatically applied at checkout. Free shipping
                applies to metro and regional areas. Remote area surcharges may
                apply.
              </p>
            </div>

            {/* International Shipping */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-mainwave-black mb-4">
                International Shipping
              </h2>
              <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                We ship to select international destinations including New
                Zealand, the United Kingdom, and parts of Southeast Asia.
                International shipping rates are calculated at checkout based on
                destination and package weight.
              </p>
              <p className="text-sm text-mainwave-text leading-relaxed">
                Please note that international orders may be subject to customs
                duties and import taxes, which are the responsibility of the
                customer. Delivery times for international orders vary by
                destination and typically range from 10 – 21 business days.
              </p>
            </div>

            {/* Tracking */}
            <div>
              <h2 className="text-2xl font-bold text-mainwave-black mb-4">
                Tracking Your Order
              </h2>
              <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                Once your order has been dispatched you will receive an email
                containing your tracking number. You can use this number to track
                your parcel via the Australia Post or courier website.
              </p>
              <p className="text-sm text-mainwave-text leading-relaxed">
                If you have any questions about your delivery, please{" "}
                <Link
                  href="/form/contact-us"
                  className="text-brand-accent font-medium hover:underline"
                >
                  contact our team
                </Link>
                {" "}and we will be happy to assist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
