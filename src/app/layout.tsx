import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatWidget } from "@/components/chat-widget";
import { SearchWrapper } from "@/components/search-wrapper";
import { getVehicles } from "@/lib/db";

export const metadata: Metadata = {
  title: {
    default: "Mainwave Seat Covers | Premium Custom Neoprene Car Seat Covers Australia",
    template: "%s | Mainwave Seat Covers",
  },
  description: "Australian made premium neoprene car seat covers. Custom fit for Toyota, Ford, Nissan, Mazda, Mitsubishi, Isuzu and more. 30+ years experience. Melbourne based.",
  keywords: ["car seat covers", "neoprene seat covers", "Mainwave Seat Covers", "custom seat covers", "Australian seat covers", "vehicle seat covers"],
  openGraph: {
    title: "Mainwave Seat Covers | Premium Custom Neoprene Car Seat Covers",
    description: "Australian made premium neoprene car seat covers. Custom fit for all popular vehicles.",
    type: "website",
    locale: "en_AU",
  },
};

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
  description: "Australian made premium neoprene car seat covers. Custom fit for Toyota, Ford, Nissan and more.",
  image: "https://www.mainwaveseatcovers.com.au/favicon.svg",
  sameAs: [
    "https://facebook.com/mainwaveseatcovers",
    "https://instagram.com/mainwaveseatcovers",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const vehicles = await getVehicles()
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header vehicles={vehicles} />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
        <SearchWrapper vehicles={vehicles} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
