import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Website Terms & Conditions",
  description:
    "Terms and conditions governing the use of the Mainwave Seat Covers website.",
};

const sections = [
  {
    number: 1,
    title: "Acceptance of Terms",
    content: [
      "By accessing and using the Mainwave Seat Covers website (mainwaveseatcovers.com.au), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this website.",
      "These terms may be updated from time to time without notice. Continued use of the website following any changes constitutes acceptance of the revised terms.",
    ],
  },
  {
    number: 2,
    title: "Intellectual Property",
    content: [
      "All content on this website, including but not limited to text, graphics, logos, images, product descriptions, and software, is the property of Mainwave Seat Covers Pty Ltd or its licensors and is protected by Australian and international copyright laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on this website without prior written consent from Mainwave Seat Covers Pty Ltd.",
    ],
  },
  {
    number: 3,
    title: "Product Information",
    content: [
      "We strive to ensure that all product descriptions, images, specifications, and pricing on this website are accurate and up to date. However, we do not warrant that product descriptions or other content is error-free, complete, or current.",
      "Colours of products may vary slightly from those displayed on your screen due to monitor settings and display differences.",
      "All seat covers are designed to fit the specific vehicle models listed on the product page. It is the customer's responsibility to ensure they have selected the correct product for their vehicle.",
    ],
  },
  {
    number: 4,
    title: "Pricing",
    content: [
      "All prices listed on this website are in Australian Dollars (AUD) and include GST unless otherwise stated.",
      "We reserve the right to change prices at any time without notice. If a product has been mistakenly listed at an incorrect price, we reserve the right to cancel the order and notify the customer.",
      "Promotional pricing and discount codes are valid for the stated period only and cannot be retroactively applied.",
    ],
  },
  {
    number: 5,
    title: "Orders",
    content: [
      "Placing an order on this website constitutes an offer to purchase. All orders are subject to acceptance and availability.",
      "We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraudulent activity.",
      "An order confirmation email does not constitute acceptance of your order. Acceptance occurs only when the order has been dispatched and a shipping confirmation email has been sent.",
    ],
  },
  {
    number: 6,
    title: "Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Mainwave Seat Covers Pty Ltd shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of this website or the purchase of any products.",
      "Our total liability for any claim arising from or related to a product purchased through this website shall not exceed the purchase price of that product.",
      "Nothing in these terms excludes or limits any rights you may have under the Australian Consumer Law, including consumer guarantee rights.",
    ],
  },
  {
    number: 7,
    title: "Privacy",
    content: [
      "Your use of this website is also governed by our Privacy Policy, which can be found on our Privacy Policy page. Please review it to understand our practices regarding the collection and use of your personal information.",
    ],
  },
  {
    number: 8,
    title: "Governing Law",
    content: [
      "These Terms and Conditions are governed by the laws of Victoria, Australia. Any disputes arising from these terms or the use of this website shall be subject to the exclusive jurisdiction of the courts of Victoria.",
    ],
  },
];

export default function WebsiteTermsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Website Terms &amp; Conditions
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Please read these terms carefully before using our website.
          </p>
        </div>
      </section>

      {/* Last Updated */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: 1 January 2026
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.number}>
                  <h2 className="text-lg md:text-xl font-bold text-mainwave-black mb-3">
                    {section.number}. {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-sm text-mainwave-text leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
