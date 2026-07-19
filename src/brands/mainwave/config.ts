import type { BrandConfig } from "../types"

export const mainwave: BrandConfig = {
  id: "mainwave",
  name: "Mainwave",
  legalName: "Mainwave Seat Covers Pty Ltd",
  abn: "34 661 298 531",
  tagline: "Drive · Camp · Wear · Live — Factory-direct gear made in Thailand",
  phone: { display: "(03) 9262 6977", href: "tel:0392626977" },
  email: "sales@mainwaveseatcovers.com.au",
  address: "8 Jersey Road, Bayswater VIC 3153",
  socials: {
    facebook: "https://facebook.com/mainwaveseatcovers",
    instagram: "https://instagram.com/mainwaveseatcovers",
  },
  url: "https://www.mainwaveseatcovers.com.au",
  currency: "AUD",
  currencyLocale: "en-AU",
  addressRegion: "au",
  markets: [
    {
      id: "au",
      country: { en: "Australia", th: "ออสเตรเลีย" },
      countryCode: "AU",
      currency: "AUD",
      url: "https://www.mainwaveseatcovers.com.au",
    },
    {
      id: "th",
      country: { en: "Thailand", th: "ประเทศไทย" },
      countryCode: "TH",
      currency: "THB",
      url: "/th",
    },
  ],
  homeMarket: "au",
  locales: ["en", "th"],
  theme: {
    accent: "#cc0000",
    accentHover: "#b91c1c",
  },
  features: {
    chat: true,
    blog: true,
    reviews: false,
    vehicleSelector: true,
  },
}
