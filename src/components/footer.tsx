import Link from "next/link";
import { FacebookIcon, InstagramIcon, PhoneIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { localePath, type Dictionary, type Locale } from "@/i18n";
import { brand } from "@/brands";

export function Footer({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const lp = (href: string) => localePath(locale, href);
  const L = dict.footer.links;

  return (
    <footer className="bg-ink text-white border-t border-white/10">
      {/* Giant wordmark */}
      <div className="container-site pt-12 md:pt-16">
        <p className="text-display text-[clamp(3rem,10vw,8.5rem)] text-white leading-none select-none">
          {brand.name}<span className="text-brand-accent">.</span>
        </p>
        <p className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-bone/40">
          {dict.footer.tagline}
        </p>
      </div>

      <div className="container-site py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <p className="text-sm text-bone/50 mb-5 leading-relaxed max-w-sm">
              {dict.footer.blurb}
            </p>
            <div className="flex items-center gap-3">
              {brand.socials.facebook && (
                <a href={brand.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-bone/40 hover:text-brand-accent transition-colors" aria-label="Facebook">
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {brand.socials.instagram && (
                <a href={brand.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-bone/40 hover:text-brand-accent transition-colors" aria-label="Instagram">
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
            </div>
            <div className="mt-6 space-y-2 text-sm text-bone/50">
              <a href={brand.phone.href} className="flex items-center gap-2 hover:text-brand-accent transition-colors">
                <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                <span>{brand.phone.display}</span>
              </a>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-2 hover:text-brand-accent transition-colors">
                <MailIcon className="w-4 h-4 flex-shrink-0" />
                <span>{brand.email}</span>
              </a>
              <address className="flex items-start gap-2 not-italic">
                <MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{brand.address}</span>
              </address>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">{dict.footer.shopCol}</h3>
            <div className="flex flex-col gap-2">
              <Link href={lp("/shop")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.allProducts}</Link>
              <Link href={lp("/shop?category=Front+Set")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.seatCovers}</Link>
              <Link href={lp("/shop?category=Apparel")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.apparel}</Link>
              <Link href={lp("/shop?category=Car+Accessories")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.carAccessories}</Link>
              <Link href={lp("/shop?category=Lifestyle")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.lifestyle}</Link>
              <Link href={lp("/100-gift-card")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.giftCards}</Link>
            </div>
          </nav>

          {/* Support */}
          <nav aria-label="Help and Information">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">{dict.footer.supportCol}</h3>
            <div className="flex flex-col gap-2">
              <Link href={lp("/about-us")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.aboutUs}</Link>
              <Link href={lp("/delivery")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.delivery}</Link>
              <Link href={lp("/installation")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.installation}</Link>
              <Link href={lp("/warranty")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.warranty}</Link>
              <Link href={lp("/returns")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.returns}</Link>
              <Link href={lp("/blog")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.blog}</Link>
              <Link href={lp("/form/contact-us")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.contactUs}</Link>
              <Link href={lp("/privacy-policy")} className="text-sm text-bone/50 hover:text-brand-accent transition-colors">{L.privacyPolicy}</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-bone/30">
            <span>&copy; {new Date().getFullYear()} {brand.legalName}. {dict.footer.rights}</span>
            <span className="uppercase tracking-[0.2em]">{dict.footer.madeIn}</span>
            {brand.abn && <span>ABN: {brand.abn}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
