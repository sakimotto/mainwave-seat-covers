"use client";

import Link from "next/link";
import { useState } from "react";
import { PhoneIcon, MenuIcon, XIcon, ChevronDownIcon, SearchIcon, FacebookIcon, InstagramIcon } from "@/components/icons"
import { CartBadge } from "@/components/cart-badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { localePath, type Dictionary, type Locale } from "@/i18n"
import type { Vehicle } from "@/types";

export function Header({ vehicles, dict, locale }: { vehicles: Vehicle[]; dict: Dictionary; locale: Locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);
  const lp = (href: string) => localePath(locale, href);

  return (
    <header className="sticky top-0 z-50 bg-ink border-b border-white/10">
      {/* Announcement bar */}
      <div className="bg-mainwave-red text-white text-xs">
        <div className="container-site flex items-center justify-between py-1.5">
          <span className="font-semibold uppercase tracking-[0.18em]">{dict.announcement}</span>
          <div className="flex items-center gap-3">
            <a href="tel:0392626977" className="hidden sm:flex items-center gap-1 hover:text-ink transition-colors">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>(03) 9262 6977</span>
            </a>
            <div className="hidden md:flex items-center gap-2">
              <a href="https://facebook.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-site">
        <div className="flex items-center justify-between py-3 md:py-4">
          <Link href={lp("/")} className="flex items-center gap-1.5 group">
            <span className="text-xl md:text-2xl font-black text-white leading-none tracking-tight uppercase">
              Mainwave
            </span>
            <span className="w-2 h-2 bg-mainwave-red group-hover:scale-125 transition-transform" aria-hidden="true" />
          </Link>

          <div className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <div className="relative group"
              onMouseEnter={() => setVehicleDropdownOpen(true)}
              onMouseLeave={() => setVehicleDropdownOpen(false)}
              onFocus={() => setVehicleDropdownOpen(true)}
              onBlur={() => setVehicleDropdownOpen(false)}>
              <button
                className="flex items-center gap-1 text-bone/70 hover:text-mainwave-red transition-colors uppercase tracking-widest text-xs font-semibold"
                aria-expanded={vehicleDropdownOpen}
              >
                {dict.nav.shopByMake}
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${vehicleDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 pt-2 z-50 ${vehicleDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200`}>
                <div className="bg-ink-soft border border-white/10 shadow-2xl shadow-black/60 min-w-[220px] max-h-[60vh] overflow-y-auto">
                  {vehicles.map((v) => (
                    <div key={v.id} className="relative group/sub">
                      <Link
                        href={lp(`/vehicle/${v.slug}`)}
                        className="block px-4 py-2.5 text-xs text-bone/70 hover:bg-white/5 hover:text-mainwave-red transition-colors border-b border-white/5"
                      >
                        <span className="flex items-center justify-between">
                          {v.make}
                          {v.models.length > 0 && <ChevronDownIcon className="w-2.5 h-2.5 -rotate-90 opacity-50" />}
                        </span>
                      </Link>
                      {v.models.length > 0 && (
                        <div className="absolute left-full top-0 pl-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                          <div className="bg-ink-soft border border-white/10 shadow-2xl shadow-black/60 min-w-[180px]">
                            {v.models.map((model) => (
                              <Link
                                key={model}
                                href={lp(`/shop/${v.slug}/${model.toLowerCase().replace(/\s+/g, "-")}`)}
                                className="block px-4 py-2 text-xs text-bone/70 hover:bg-white/5 hover:text-mainwave-red transition-colors border-b border-white/5 last:border-b-0"
                              >
                                {v.make} {model}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative group">
              <Link
                href={lp("/shop")}
                className="flex items-center gap-1 text-bone/70 hover:text-mainwave-red transition-colors uppercase tracking-widest text-xs font-semibold"
              >
                {dict.nav.shop}
                <ChevronDownIcon className="w-3 h-3" />
              </Link>
              <div className="absolute top-full left-0 pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-ink-soft border border-white/10 shadow-2xl shadow-black/60 min-w-[180px]">
                  <Link href={lp("/shop")} className="block px-4 py-2.5 text-xs text-bone/70 hover:bg-white/5 hover:text-mainwave-red transition-colors border-b border-white/5">{dict.nav.allProducts}</Link>
                  <Link href={lp("/shop?category=Apparel")} className="block px-4 py-2.5 text-xs text-bone/70 hover:bg-white/5 hover:text-mainwave-red transition-colors border-b border-white/5">{dict.nav.apparel}</Link>
                  <Link href={lp("/shop?category=Car+Accessories")} className="block px-4 py-2.5 text-xs text-bone/70 hover:bg-white/5 hover:text-mainwave-red transition-colors border-b border-white/5">{dict.nav.carAccessories}</Link>
                  <Link href={lp("/shop?category=Lifestyle")} className="block px-4 py-2.5 text-xs text-bone/70 hover:bg-white/5 hover:text-mainwave-red transition-colors">{dict.nav.lifestyle}</Link>
                </div>
              </div>
            </div>
            <Link href={lp("/about-us")} className="text-bone/70 hover:text-mainwave-red transition-colors uppercase tracking-widest text-xs font-semibold">{dict.nav.brand}</Link>
            <Link href={lp("/installation")} className="text-bone/70 hover:text-mainwave-red transition-colors uppercase tracking-widest text-xs font-semibold">{dict.nav.installation}</Link>
            <Link href={lp("/blog")} className="text-bone/70 hover:text-mainwave-red transition-colors uppercase tracking-widest text-xs font-semibold">{dict.nav.blog}</Link>
            <Link href={lp("/form/contact-us")} className="text-bone/70 hover:text-mainwave-red transition-colors uppercase tracking-widest text-xs font-semibold">{dict.nav.contact}</Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher locale={locale} />
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
              className="hidden md:flex items-center gap-1 text-bone/70 hover:text-mainwave-red transition-colors"
              aria-label="Search"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            <CartBadge />
            <button
              className="lg:hidden text-bone/80"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ink border-t border-white/10">
          <div className="container-site py-4 space-y-1">
            <Link href={lp("/")} className="block py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.home}</Link>
            <div>
              <button
                onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors"
              >
                {dict.nav.shopByMake}
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${vehicleDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {vehicleDropdownOpen && (
                <div className="pb-2 space-y-0">
                  {vehicles.map((v) => (
                    <div key={v.id}>
                      <Link
                        href={lp(`/vehicle/${v.slug}`)}
                        className="block py-1.5 pl-4 text-xs text-bone/60 hover:text-mainwave-red transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {v.make} — {dict.nav.allModels}
                      </Link>
                      {v.models.map((model) => (
                        <Link
                          key={model}
                          href={lp(`/shop/${v.slug}/${model.toLowerCase().replace(/\s+/g, "-")}`)}
                          className="block py-1.5 pl-8 text-xs text-bone/40 hover:text-mainwave-red transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {v.make} {model}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Link href={lp("/shop")} className="block py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.allProducts}</Link>
            <Link href={lp("/shop?category=Apparel")} className="block py-1.5 pl-4 text-xs text-bone/60 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.apparel}</Link>
            <Link href={lp("/shop?category=Car+Accessories")} className="block py-1.5 pl-4 text-xs text-bone/60 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.carAccessories}</Link>
            <Link href={lp("/shop?category=Lifestyle")} className="block py-1.5 pl-4 text-xs text-bone/60 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.lifestyle}</Link>
            <Link href={lp("/about-us")} className="block py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.brand}</Link>
            <Link href={lp("/installation")} className="block py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.installation}</Link>
            <Link href={lp("/blog")} className="block py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.blog}</Link>
            <Link href={lp("/form/contact-us")} className="block py-2 text-sm font-medium text-bone/80 hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>{dict.nav.contact}</Link>
            <div className="pt-3 border-t border-white/10 flex items-center gap-3">
              <a href="tel:0392626977" className="flex items-center gap-1 text-sm text-bone/60 hover:text-mainwave-red">
                <PhoneIcon className="w-4 h-4" />(03) 9262 6977
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
