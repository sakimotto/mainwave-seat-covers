"use client"

import { useState, useMemo, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Product } from "@/types"
import { StarIcon, TruckIcon, ShieldIcon, PhoneIcon, ChevronRightIcon, CartIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"
import { addToCart } from "@/lib/actions/cart"

const tabs = ["Description", "Specifications", "Warranty", "Reviews"]

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
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [pending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)
  const router = useRouter()

  const colors = useMemo(() => {
    if (!product.variants?.length) return []
    const seen = new Set<string>()
    return product.variants.filter((v) => {
      if (seen.has(v.color)) return false
      seen.add(v.color)
      return true
    }).map((v) => ({ color: v.color, colorHex: v.colorHex }))
  }, [product.variants])

  const sizes = useMemo(() => {
    if (!product.variants?.length) return []
    const hasSizes = product.variants.some((v) => v.size)
    if (!hasSizes) return []
    const seen = new Set<string>()
    const order = ["S", "M", "L", "XL", "XXL", "OSFM"]
    return product.variants
      .filter((v) => !selectedColor || v.color === selectedColor)
      .filter((v) => {
        if (seen.has(v.size!)) return false
        seen.add(v.size!)
        return true
      })
      .map((v) => v.size!)
      .sort((a, b) => order.indexOf(a) - order.indexOf(b))
  }, [product.variants, selectedColor])

  const selectedVariant = useMemo(() => {
    if (!product.variants?.length) return null
    if (selectedColor && selectedSize) {
      return product.variants.find((v) => v.color === selectedColor && v.size === selectedSize) ?? null
    }
    if (selectedColor && sizes.length === 0) {
      return product.variants.find((v) => v.color === selectedColor) ?? null
    }
    return product.variants[0]
  }, [product.variants, selectedColor, selectedSize, sizes.length])

  const price = selectedVariant?.price ?? product.price
  const originalPrice = selectedVariant?.originalPrice ?? product.originalPrice

  const salePercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  const hasVariants = product.variants && product.variants.length > 1
  const hasSizes = sizes.length > 0

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
              <span className="text-2xl font-bold text-mainwave-red">${price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-base text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
              )}
              {product.isSale && (
                <span className="bg-mainwave-red text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                  SALE {salePercentage}% OFF
                </span>
              )}
            </div>

            <p className="text-sm text-mainwave-text leading-relaxed mb-6">
              {product.description}
            </p>

            {hasVariants && colors.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">
                  Colour / Style
                </h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((opt) => (
                    <button
                      key={opt.color}
                      onClick={() => { setSelectedColor(opt.color); setSelectedSize("") }}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 text-xs border transition-colors",
                        selectedColor === opt.color
                          ? "border-mainwave-red bg-mainwave-red/5 text-mainwave-red font-medium"
                          : "border-mainwave-border text-mainwave-text hover:border-mainwave-red"
                      )}
                    >
                      {opt.colorHex && (
                        <span className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: opt.colorHex }} />
                      )}
                      {opt.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {hasSizes && (
              <div className="mb-4">
                <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 text-xs border font-medium transition-colors min-w-[48px] text-center",
                        selectedSize === size
                          ? "border-mainwave-red bg-mainwave-red/5 text-mainwave-red"
                          : "border-mainwave-border text-mainwave-text hover:border-mainwave-red"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
              <button
                onClick={() => {
                  if (!selectedVariant) return
                  startTransition(async () => {
                    const result = await addToCart(selectedVariant.sku, quantity)
                    if (result.success) {
                      setAdded(true)
                      setTimeout(() => setAdded(false), 2000)
                    }
                  })
                }}
                disabled={pending || !selectedVariant}
                className="flex-1 flex items-center justify-center gap-2 bg-mainwave-red text-white text-sm font-bold py-3 px-6 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CartIcon className="w-5 h-5" />
                {pending ? "Adding..." : added ? "Added!" : "Add to Cart"}
              </button>
              <button
                onClick={() => {
                  if (!selectedVariant) return
                  startTransition(async () => {
                    await addToCart(selectedVariant.sku, quantity)
                    router.push("/shop/cart")
                  })
                }}
                disabled={pending || !selectedVariant}
                className="flex-1 bg-mainwave-black text-white text-sm font-bold py-3 px-6 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
                  {product.description}
                </p>
                {product.features && (
                  <ul className="list-disc pl-5 space-y-1 text-sm text-mainwave-text">
                    {product.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {activeTab === "Specifications" && (
              <div className="max-w-xl">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-mainwave-border">
                      <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">Material</td>
                      <td className="py-3 text-mainwave-text">{product.material ?? "Premium 4mm Neoprene"}</td>
                    </tr>
                    <tr className="border-b border-mainwave-border">
                      <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">Category</td>
                      <td className="py-3 text-mainwave-text">{product.category}</td>
                    </tr>
                    <tr className="border-b border-mainwave-border">
                      <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">Vehicle</td>
                      <td className="py-3 text-mainwave-text">{product.vehicle || "Universal"}</td>
                    </tr>
                    <tr className="border-b border-mainwave-border">
                      <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">Warranty</td>
                      <td className="py-3 text-mainwave-text">3 Years</td>
                    </tr>
                    <tr className="border-b border-mainwave-border">
                      <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">Installation</td>
                      <td className="py-3 text-mainwave-text">DIY - no tools required</td>
                    </tr>
                    <tr className="border-b border-mainwave-border">
                      <td className="py-3 pr-4 font-medium text-mainwave-black w-1/3">Cleaning</td>
                      <td className="py-3 text-mainwave-text">Machine washable</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Warranty" && (
              <div className="max-w-3xl">
                <h3 className="text-base font-bold text-mainwave-black mb-3">3 Year Manufacturer&apos;s Warranty</h3>
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">
                  All Mainwave products are backed by a comprehensive 3-year manufacturer&apos;s warranty against defects in materials and workmanship. We stand by the quality of our Australian-made products.
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
