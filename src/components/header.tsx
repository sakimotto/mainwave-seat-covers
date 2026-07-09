"use client";

import Link from "next/link";
import { useState } from "react";
import { PhoneIcon, CartIcon, MenuIcon, XIcon, ChevronDownIcon, SearchIcon, FacebookIcon, InstagramIcon } from "@/components/icons";
import type { Vehicle } from "@/types";

export function Header({ vehicles }: { vehicles: Vehicle[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-mainwave-border">
      {/* Top bar */}
      <div className="bg-mainwave-black text-white text-sm">
        <div className="container-site flex items-center justify-between py-1.5">
          <span className="text-xs md:text-sm font-medium">Australian Made - Premium Neoprene Seat Covers</span>
          <div className="flex items-center gap-3">
            <a href="tel:0392626977" className="flex items-center gap-1 text-xs md:text-sm hover:text-mainwave-red transition-colors">
              <PhoneIcon className="w-3.5 h-3.5" />
              <span>(03) 9262 6977</span>
            </a>
            <div className="hidden md:flex items-center gap-2">
              <a href="https://facebook.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="hover:text-mainwave-red transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/mainwaveseatcovers" target="_blank" rel="noopener noreferrer" className="hover:text-mainwave-red transition-colors" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container-site">
        <div className="flex items-center justify-between py-3 md:py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-mainwave-black leading-tight tracking-tight">Mainwave</span>
              <span className="text-[10px] md:text-xs text-mainwave-text font-medium tracking-wider uppercase -mt-1">Seat Covers</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-mainwave-text">
            <Link href="/" className="hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs">Home</Link>
            <div className="relative group"
              onMouseEnter={() => setVehicleDropdownOpen(true)}
              onMouseLeave={() => setVehicleDropdownOpen(false)}
              onFocus={() => setVehicleDropdownOpen(true)}
              onBlur={() => setVehicleDropdownOpen(false)}>
              <button
                className="flex items-center gap-1 hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs"
                aria-expanded={vehicleDropdownOpen}
              >
                Shop By Make
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${vehicleDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute top-full left-0 pt-2 z-50 ${vehicleDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-200`}>
                <div className="bg-white border border-mainwave-border shadow-lg min-w-[220px] max-h-[60vh] overflow-y-auto">
                  {vehicles.map((v) => (
                    <div key={v.id} className="relative group/sub">
                      <Link
                        href={`/vehicle/${v.slug}`}
                        className="block px-4 py-2.5 text-xs hover:bg-mainwave-grey hover:text-mainwave-red transition-colors border-b border-mainwave-border/50"
                      >
                        <span className="flex items-center justify-between">
                          {v.make}
                          {v.models.length > 0 && <ChevronDownIcon className="w-2.5 h-2.5 -rotate-90 opacity-50" />}
                        </span>
                      </Link>
                      {v.models.length > 0 && (
                        <div className="absolute left-full top-0 pl-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200">
                          <div className="bg-white border border-mainwave-border shadow-lg min-w-[180px]">
                            {v.models.map((model) => (
                              <Link
                                key={model}
                                href={`/shop/${v.slug}/${model.toLowerCase().replace(/\s+/g, "-")}`}
                                className="block px-4 py-2 text-xs hover:bg-mainwave-grey hover:text-mainwave-red transition-colors border-b border-mainwave-border/50 last:border-b-0"
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
                href="/shop"
                className="flex items-center gap-1 hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs"
              >
                Merchandise
                <ChevronDownIcon className="w-3 h-3" />
              </Link>
              <div className="absolute top-full left-0 pt-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-mainwave-border shadow-lg min-w-[160px]">
                  <Link href="/shop?category=Apparel" className="block px-4 py-2.5 text-xs hover:bg-mainwave-grey hover:text-mainwave-red transition-colors border-b border-mainwave-border/50">Apparel</Link>
                  <Link href="/shop?category=Car+Accessories" className="block px-4 py-2.5 text-xs hover:bg-mainwave-grey hover:text-mainwave-red transition-colors border-b border-mainwave-border/50">Car Accessories</Link>
                  <Link href="/shop?category=Lifestyle" className="block px-4 py-2.5 text-xs hover:bg-mainwave-grey hover:text-mainwave-red transition-colors">Lifestyle</Link>
                </div>
              </div>
            </div>
            <Link href="/about-us" className="hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs">About Us</Link>
            <Link href="/installation" className="hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs">Installation</Link>
            <Link href="/blog/6-car-care-tips" className="hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs">Blog</Link>
            <Link href="/form/contact-us" className="hover:text-mainwave-red transition-colors uppercase tracking-wider text-xs">Contact</Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <button className="hidden md:flex items-center gap-1 text-mainwave-text hover:text-mainwave-red transition-colors" aria-label="Search">
              <SearchIcon className="w-5 h-5" />
            </button>
            <Link href="/shop/cart" className="flex items-center gap-1 text-mainwave-text hover:text-mainwave-red transition-colors relative">
              <CartIcon className="w-5 h-5" />
              <span className="hidden md:inline text-sm font-medium">$0.00</span>
              <span className="absolute -top-1.5 -right-1.5 bg-mainwave-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">0</span>
            </Link>
            <button
              className="lg:hidden text-mainwave-text"
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
        <div className="lg:hidden bg-white border-t border-mainwave-border">
          <div className="container-site py-4 space-y-1">
            <Link href="/" className="block py-2 text-sm font-medium hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <div>
              <button
                onClick={() => setVehicleDropdownOpen(!vehicleDropdownOpen)}
                className="flex items-center justify-between w-full py-2 text-sm font-medium hover:text-mainwave-red transition-colors"
              >
                Shop By Make
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${vehicleDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {vehicleDropdownOpen && (
                <div className="pb-2 space-y-0">
                  {vehicles.map((v) => (
                    <div key={v.id}>
                      <Link
                        href={`/vehicle/${v.slug}`}
                        className="block py-1.5 pl-4 text-xs text-mainwave-text hover:text-mainwave-red transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {v.make} — All Models
                      </Link>
                      {v.models.map((model) => (
                        <Link
                          key={model}
                          href={`/shop/${v.slug}/${model.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block py-1.5 pl-8 text-xs text-gray-500 hover:text-mainwave-red transition-colors"
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
            <Link href="/shop" className="block py-2 text-sm font-medium hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
            <Link href="/shop?category=Apparel" className="block py-1.5 pl-4 text-xs text-mainwave-text hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Apparel</Link>
            <Link href="/shop?category=Car+Accessories" className="block py-1.5 pl-4 text-xs text-mainwave-text hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Car Accessories</Link>
            <Link href="/shop?category=Lifestyle" className="block py-1.5 pl-4 text-xs text-mainwave-text hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Lifestyle</Link>
            <Link href="/about-us" className="block py-2 text-sm font-medium hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link href="/installation" className="block py-2 text-sm font-medium hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Installation</Link>
            <Link href="/blog/6-car-care-tips" className="block py-2 text-sm font-medium hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link href="/form/contact-us" className="block py-2 text-sm font-medium hover:text-mainwave-red transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="pt-3 border-t border-mainwave-border flex items-center gap-3">
              <a href="tel:0392626977" className="flex items-center gap-1 text-sm text-mainwave-text hover:text-mainwave-red">
                <PhoneIcon className="w-4 h-4" />(03) 9262 6977
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
