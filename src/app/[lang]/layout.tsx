import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Thai } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { SearchWrapper } from "@/components/search-wrapper";
import { getCommerce } from "@/commerce";
import { brand } from "@/brands";
import { getDictionary } from "@/i18n";
import { locales } from "@/i18n/config";
import { headers, cookies } from "next/headers";
import { RegionPopup } from "@/components/region-popup";
import { FloatingToolbar } from "@/components/floating-toolbar";

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
  name: brand.legalName,
  url: brand.url,
  telephone: brand.phone.display,
  email: brand.email,
  address: brand.address,
  description: "Affordable lifestyle brand. Custom-fit seat covers, camping gear, apparel and merchandise, made in our own Thailand factory.",
  image: `${brand.url}/favicon.svg`,
  sameAs: [brand.socials.facebook, brand.socials.instagram].filter(Boolean),
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
  const vehicles = await getCommerce().catalog.getVehicles();

  // Region switcher: show when the visitor's detected country differs from
  // this deployment's home market and they haven't chosen before.
  const headerStore = await headers();
  const cookieStore = await cookies();
  const detectedCountry = headerStore.get("x-detected-country");
  const regionChoice = cookieStore.get("region_choice")?.value;
  const currentMarket =
    brand.markets.find((m) => m.id === brand.homeMarket) ?? brand.markets[0];
  const showRegionPopup =
    !!detectedCountry &&
    !!currentMarket &&
    detectedCountry !== currentMarket.countryCode &&
    !regionChoice;

  return (
    <html
      lang={locale}
      className={`h-full antialiased ${montserrat.variable} ${notoThai.variable}`}
      style={{ "--color-brand-accent": brand.theme.accent } as React.CSSProperties}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-brand-accent focus:text-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Skip to content
        </a>
        <Header vehicles={vehicles} dict={dict} locale={locale} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer dict={dict} locale={locale} />
        {brand.features.chat && <ChatWidget />}
        <SearchWrapper vehicles={vehicles} dict={dict} locale={locale} />
        {showRegionPopup && (
          <RegionPopup
            detectedCountry={detectedCountry}
            currentMarket={currentMarket}
            markets={brand.markets}
            dict={dict}
            locale={locale}
          />
        )}
        <FloatingToolbar dict={dict} locale={locale} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
