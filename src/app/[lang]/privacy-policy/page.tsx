import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Mainwave Seat Covers privacy policy. How we collect, use, and protect your personal information.",
};

const sections = [
  {
    title: "Information We Collect",
    content: [
      "We collect personal information that you voluntarily provide when using our website, including:",
      "• Full name, email address, phone number, and postal address when you place an order or create an account.",
      "• Payment information (credit card details) processed securely through our payment providers.",
      "• Vehicle information when you use our vehicle selector tools.",
      "• Communication records when you contact our customer service team.",
      "• Technical data such as your IP address, browser type, device information, and browsing behaviour collected automatically through cookies and analytics tools.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use your personal information for the following purposes:",
      "• To process and fulfil your orders, including shipping and delivery.",
      "• To communicate with you about your orders, account, and customer service enquiries.",
      "• To improve our website, products, and services.",
      "• To send promotional communications, newsletters, and marketing materials (only with your consent).",
      "• To detect and prevent fraud, unauthorised access, and other illegal activities.",
      "• To comply with legal obligations and resolve disputes.",
    ],
  },
  {
    title: "Data Security",
    content: [
      "We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission, secure server hosting, and restricted access to personal data within our organisation.",
      "While we take reasonable steps to safeguard your information, no method of electronic transmission or storage is completely secure. We cannot guarantee absolute security of your data.",
    ],
  },
  {
    title: "Third Parties",
    content: [
      "We may share your personal information with trusted third parties for the purposes of fulfilling orders and providing services, including:",
      "• Shipping and logistics providers for order delivery.",
      "• Payment processors for secure transaction handling.",
      "• Analytics providers to help us understand website usage.",
      "• Email marketing platforms (only if you have opted in to marketing communications).",
      "We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us remember your preferences and understand how you use our site.",
      "You can manage your cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain features on our website.",
      "We use the following types of cookies: essential cookies required for site functionality, analytics cookies to measure website performance, and marketing cookies for targeted advertising (with your consent).",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "Under Australian Privacy Principles (APPs), you have the right to:",
      "• Access the personal information we hold about you.",
      "• Request correction of any inaccurate or incomplete information.",
      "• Opt out of marketing communications at any time by clicking the unsubscribe link or contacting us directly.",
      "• Request deletion of your personal information, subject to our legal obligations.",
      "To exercise any of these rights, please contact us using the details below.",
    ],
  },
  {
    title: "Contact Us",
    content: [
      "If you have any questions about this Privacy Policy or wish to make a request regarding your personal information, please contact us:",
      "Mainwave Seat Covers Pty Ltd",
      "Phone: (03) 9262 6977",
      "Email: sales@mainwaveseatcovers.com.au",
      "Address: 8 Jersey Road, Bayswater VIC 3153",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-8">
              Last updated: 1 January 2026
            </p>

            <p className="text-sm text-mainwave-text leading-relaxed mb-8">
              Mainwave Seat Covers Pty Ltd (&quot;we&quot;, &quot;us&quot;, or
              &quot;our&quot;) is committed to protecting the privacy and
              security of your personal information. This Privacy Policy
              describes how we collect, use, store, and disclose your information
              when you visit our website or purchase our products.
            </p>

            <div className="space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-lg md:text-xl font-bold text-mainwave-black mb-3">
                    {section.title}
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

            <div className="mt-10 pt-8 border-t border-mainwave-border">
              <p className="text-sm text-mainwave-text leading-relaxed">
                For more information about your rights or to make a complaint
                about our handling of your personal information, you may contact
                the Office of the Australian Information Commissioner (OAIC) at{" "}
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mainwave-red hover:underline"
                >
                  www.oaic.gov.au
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
