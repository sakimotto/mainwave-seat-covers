"use client"

import { useState } from "react"
import Link from "next/link"
import type { Product } from "@/types"
import { StarIcon, TruckIcon, ShieldIcon, PhoneIcon, ChevronRightIcon, CartIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"

const colorOptions = [
  { name: "Black with Red Stitching", color: "#1a1a1a" },
  { name: "Charcoal with Grey Stitching", color: "#444444" },
  { name: "Tan with White Stitching", color: "#d4a574" },
  { name: "Grey with Black Stitching", color: "#888888" },
]

const tabs = ["Description", "Specifications", "Warranty", "Reviews"]

const specs = [
  { label: "Material", value: "Premium 4mm Neoprene" },
  { label: "Fitment", value: "Custom pattern - tailored to vehicle" },
  { label: "Color", value: "Black with Red Stitching" },
  { label: "Warranty", value: "3 Years" },
  { label: "Installation", value: "DIY - no tools required" },
  { label: "Cleaning", value: "Machine washable" },
]

const sampleReviews = [
  { name: "Michael T.", rating: 5, text: "Absolutely fantastic quality. Fit perfectly on my Hilux and looks amazing.", date: "2 weeks ago" },
  { name: "Sarah K.", rating: 5, text: "Easy to install and feels really premium. Great value for money.", date: "1 month ago" },
  { name: "David R.", rating: 4, text: "Good quality covers. Took a bit of effort to fit but once on they look great.", date: "3 months ago" },
  { name: "Emma L.", rating: 5, text: "Best seat covers I've bought. The neoprene material is top notch.", date: "2 months ago" },
]

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className={cn("w-4 h-4", i < Math.floor(rating) ? "text-mainwave-gold" : "text-gray-300")}
        />
      ))}
    </div>
  )
}

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const [activeTab, setActiveTab] = useState("Description")
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(colorOptions[0])
  const [selectedImage, setSelectedImage] = useState(0)

  const salePercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const breadcrumbVehicle = product.vehicle || "Vehicle"

  return (
    <div className="bg-white">
      <div className="border-b border-mainwave-border">
        <div className="container-site py-3">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-mainwave-red transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/shop" className="hover:text-mainwave-red transition-colors">{breadcrumbVehicle}</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container-site py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <div className="bg-mainwave-grey aspect-square mb-3 relative overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.isSale && (
                <div className="absolute top-3 left-3 bg-mainwave-red text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wider">
                  SALE {salePercentage}% OFF
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {[
                { label: "Front View", file: "front" },
                { label: "Side View", file: "side" },
                { label: "Detail", file: "detail" },
                { label: "Fitment", file: "fitment" },
              ].map((view, i) => (
                <button
                  key={view.label}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-16 h-16 bg-mainwave-grey border-2 transition-colors overflow-hidden",
                    selectedImage === i ? "border-mainwave-red" : "border-transparent"
                  )}
                >
                  <img src={product.image} alt={`${product.name} - ${view.label}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-xl md:text-2xl font-bold text-mainwave-black leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-3">
              <StarDisplay rating={product.rating} />
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-mainwave-red">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.isSale && (
                <span className="bg-mainwave-red text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  SALE {salePercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-sm text-mainwave-text leading-relaxed mb-6">
              Premium neoprene seat covers custom patterned to fit your {product.vehicle}. Features 4mm thick neoprene with reinforced stitching, waterproof backing, and UV-resistant fabric. Designed and manufactured in Australia for the perfect fit.
            </p>

            <div className="mb-6">
              <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">Color / Style</h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.name}
                    onClick={() => setSelectedColor(opt)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-xs border transition-colors",
                      selectedColor.name === opt.name
                        ? "border-mainwave-red bg-mainwave-red/5 text-mainwave-red font-medium"
                        : "border-mainwave-border text-mainwave-text hover:border-mainwave-red"
                    )}
                  >
                    <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: opt.color }} />
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-mainwave-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 flex items-center justify-center text-sm text-mainwave-text hover:text-mainwave-red hover:bg-mainwave-grey transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-9 text-center text-sm text-mainwave-text border-x border-mainwave-border focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 flex items-center justify-center text-sm text-mainwave-text hover:text-mainwave-red hover:bg-mainwave-grey transition-colors"
                >
                  +
                </button>
              </div>
              <div className="text-xs text-gray-500">
                Usually ships in 1-2 business days
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-mainwave-red text-white text-sm font-bold py-3 px-6 hover:bg-red-700 transition-colors">
                <CartIcon className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="flex-1 bg-mainwave-black text-white text-sm font-bold py-3 px-6 hover:bg-gray-800 transition-colors">
                Buy Now
              </button>
            </div>

            <div className="space-y-2 text-xs text-mainwave-text">
              <div className="flex items-center gap-2">
                <TruckIcon className="w-4 h-4 text-mainwave-red" />
                <span>Free shipping over $150</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldIcon className="w-4 h-4 text-mainwave-red" />
                <span>3 Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-mainwave-red" />
                <span>Call us: (03) 9262 6977</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          <div className="border-b border-mainwave-border">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 md:px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab
                      ? "border-mainwave-red text-mainwave-red"
                      : "border-transparent text-gray-500 hover:text-mainwave-red"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            {activeTab === "Description" && (
              <div className="max-w-3xl">
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                  Our premium neoprene seat covers are designed and manufactured right here in Australia. Using 4mm thick neoprene, the same material used in high-end wetsuits, these covers provide exceptional protection against spills, UV damage, and daily wear and tear.
                </p>
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                  Each set is custom patterned to match the exact contours of your {product.vehicle} seats, ensuring a snug factory-like fit. The waterproof neoprene backing prevents liquids from reaching your original upholstery, while the UV-resistant outer layer protects against fading and cracking.
                </p>
                <p className="text-sm text-mainwave-text leading-relaxed">
                  Installation is straightforward with our easy-fit design - no tools or professional help required. Simply slip the covers over your existing seats and secure using the integrated fastening system.
                </p>
              </div>
            )}

            {activeTab === "Specifications" && (
              <div className="max-w-xl">
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-mainwave-border">
                        <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">{spec.label}</td>
                        <td className="py-3 text-mainwave-text">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Warranty" && (
              <div className="max-w-3xl">
                <h3 className="text-base font-bold text-mainwave-black mb-3">3 Year Manufacturer&apos;s Warranty</h3>
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                  All Mainwave Seat Covers are backed by a comprehensive 3-year manufacturer&apos;s warranty against defects in materials and workmanship. We stand by the quality of our Australian-made products.
                </p>
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                  The warranty covers stitching separation, material degradation, and fastener failure under normal use. It does not cover damage caused by improper installation, accidents, or intentional misuse.
                </p>
                <p className="text-sm text-mainwave-text leading-relaxed">
                  For warranty claims, please contact our customer service team with your order number and photographs of the issue.
                </p>
              </div>
            )}

            {activeTab === "Reviews" && (
              <div className="max-w-2xl space-y-4">
                {sampleReviews.map((review, i) => (
                  <div key={i} className="border border-mainwave-border p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-mainwave-black">{review.name}</span>
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <StarDisplay rating={review.rating} />
                    <p className="text-sm text-mainwave-text mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-10 md:mt-14 pt-8 md:pt-10 border-t border-mainwave-border">
            <h2 className="text-lg md:text-xl font-bold text-mainwave-black mb-6">More From This Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
