import Link from "next/link";
import { FacebookIcon, InstagramIcon, PhoneIcon, MailIcon, MapPinIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-mainwave-black text-white">
      <div className="container-site py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Brand column */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="text-2xl font-bold text-white leading-tight tracking-tight">Mainwave</span>
              <span className="text-xs text-gray-400 font-medium tracking-wider uppercase -mt-1">Seat Covers</span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-sm">
              Premium custom neoprene seat covers. Australian made business located in Melbourne, we offer 30+ years&apos; experience in the textile engineering industry.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mainwave-red transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-mainwave-red transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 space-y-2 text-sm text-gray-400">
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

          {/* Help & Info */}
          <nav aria-label="Help and Information">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-white">Help & Info</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <Link href="/about-us" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">About Us</Link>
              <Link href="/delivery" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Delivery</Link>
              <Link href="/installation" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Installation</Link>
              <Link href="/warranty" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Warranty</Link>
              <Link href="/returns" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Returns</Link>
              <Link href="/website-terms" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Website Terms</Link>
              <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Privacy Policy</Link>
              <Link href="/form/contact-us" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Contact Us</Link>
              <Link href="/100-gift-card" className="text-sm text-gray-400 hover:text-mainwave-red transition-colors">Gift Cards</Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <span>&copy; {new Date().getFullYear()} Mainwave Seat Covers Pty Ltd. All rights reserved.</span>
            <span>ABN: 34 661 298 531</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
