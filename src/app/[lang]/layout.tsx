import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Thai } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { SearchWrapper } from "@/components/search-wrapper";
import { getVehicles } from "@/lib/db";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-thai",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const { dict } = getDictionary(lang);
  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: ["car seat covers", "neoprene seat covers", "Mainwave", "camping gear", "lifestyle brand", "คลุมเบาะรถยนต์"],
    alternates: {
      languages: {
        en: "/",
        th: "/th",
      },
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Mainwave Seat Covers",
  url: "https://www.mainwaveseatcovers.com.au",
  telephone: "(03) 9262 6977",
  email: "sales@mainwaveseatcovers.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8 Jersey Road",
    addressLocality: "Bayswater",
    addressRegion: "VIC",
    postalCode: "3153",
    addressCountry: "AU",
  },
  description: "Affordable lifestyle brand. Custom-fit seat covers, camping gear, apparel and merchandise, made in our own Thailand factory.",
  image: "https://www.mainwaveseatcovers.com.au/favicon.svg",
  sameAs: [
    "https://facebook.com/mainwaveseatcovers",
    "https://instagram.com/mainwaveseatcovers",
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const { locale, dict } = getDictionary(lang);
  const vehicles = await getVehicles();

  return (
    <html lang={locale} className={`h-full antialiased ${montserrat.variable} ${notoThai.variable}`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-mainwave-red focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <Header vehicles={vehicles} dict={dict} locale={locale} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer dict={dict} locale={locale} />
        <ChatWidget />
        <SearchWrapper vehicles={vehicles} dict={dict} locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
