import Link from "next/link";
import { FacebookIcon, InstagramIcon, PhoneIcon, MailIcon, MapPinIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-ink text-white border-t border-white/10">
      {/* Giant wordmark */}
      <div className="container-site pt-12 md:pt-16">
        <p className="text-display text-[clamp(3rem,10vw,8.5rem)] text-white leading-none select-none">
          Mainwave<span className="text-mainwave-red">.</span>
        </p>
        <p className="mt-3 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-bone/40">
          Drive · Camp · Wear · Live — Factory-direct gear made in Thailand
        </p>
      </div>

      <div className="container-site py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-2">
            <p className="text-sm text-bone/50 mb-5 leading-relaxed max-w-sm">
              An affordable lifestyle brand built on 30+ years of textile engineering. We own the factory, so you skip the markup. Launching first in Thailand, then Australia, then Southeast Asia.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="text-bone/40 hover:text-mainwave-red transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="text-bone/40 hover:text-mainwave-red transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 space-y-2 text-sm text-bone/50">
              <a href="tel:0392626977" className="flex items-center gap-2 hover:text-mainwave-red transition-colors">
                <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                <span>(03) 9262 6977</span>
              </a>
              <a href="mailto:sales@mainwaveseatcovers.com.au" className="flex items-center gap-2 hover:text-mainwave-red transition-colors">
                <MailIcon className="w-4 h-4 flex-shrink-0" />
                <span>sales@mainwaveseatcovers.com.au</span>
              </a>
              <address className="flex items-start gap-2 not-italic">
                <MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>8 Jersey Road, Bayswater VIC 3153</span>
              </address>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">Shop</h3>
            <div className="flex flex-col gap-2">
              <Link href="/shop" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">All Products</Link>
              <Link href="/shop?category=Front+Set" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Seat Covers</Link>
              <Link href="/shop?category=Apparel" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Apparel</Link>
              <Link href="/shop?category=Car+Accessories" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Car Accessories</Link>
              <Link href="/shop?category=Lifestyle" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Lifestyle</Link>
              <Link href="/100-gift-card" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Gift Cards</Link>
            </div>
          </nav>

          {/* Support */}
          <nav aria-label="Help and Information">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white">Support</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about-us" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">About Us</Link>
              <Link href="/delivery" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Delivery</Link>
              <Link href="/installation" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Installation</Link>
              <Link href="/warranty" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Warranty</Link>
              <Link href="/returns" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Returns</Link>
              <Link href="/blog" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Blog</Link>
              <Link href="/form/contact-us" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Contact Us</Link>
              <Link href="/privacy-policy" className="text-sm text-bone/50 hover:text-mainwave-red transition-colors">Privacy Policy</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-bone/30">
            <span>&copy; {new Date().getFullYear()} Mainwave Seat Covers Pty Ltd. All rights reserved.</span>
            <span className="uppercase tracking-[0.2em]">Made in Thailand · Launching 2026</span>
            <span>ABN: 34 661 298 531</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
