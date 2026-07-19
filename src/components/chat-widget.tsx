"use client"

import { useState, useRef, useEffect, useTransition, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { addToCart } from "@/lib/actions/cart"

const years = Array.from({ length: 26 }, (_, i) => (2010 + i).toString())

const vehicles = [
  { make: "Toyota", slug: "toyota", models: ["Hilux", "Landcruiser 200", "Landcruiser 300", "Landcruiser 79 Series", "Prado", "RAV4", "Corolla", "Camry", "Fortuner", "Kluger"] },
  { make: "Ford", slug: "ford", models: ["Ranger PX", "Ranger Next Gen", "Ranger Raptor", "Everest", "Ranger XL/XLS/XLT"] },
  { make: "Nissan", slug: "nissan", models: ["Navara", "Patrol", "X-Trail", "Qashqai"] },
  { make: "Mazda", slug: "mazda", models: ["BT-50", "CX-3", "CX-5", "CX-9", "Mazda 3"] },
  { make: "Mitsubishi", slug: "mitsubishi", models: ["Triton", "Outlander", "Pajero Sport", "ASX"] },
  { make: "Isuzu", slug: "isuzu", models: ["D-Max", "MU-X"] },
  { make: "GWM", slug: "gwm", models: ["Cannon", "Steed", "Ute"] },
  { make: "Holden", slug: "holden", models: ["Colorado", "Commodore"] },
  { make: "Subaru", slug: "subaru", models: ["Forester", "Outback", "XV"] },
  { make: "Hyundai", slug: "hyundai", models: ["Tucson", "Kona", "Santa Fe", "i30"] },
  { make: "LDV", slug: "ldv", models: ["T60", "V80", "Deliver 9"] },
  { make: "Volkswagen", slug: "volkswagen", models: ["Amarok", "Tiguan", "Golf"] },
  { make: "BYD", slug: "byd", models: ["Shark 6", "Atto 3", "Seal"] },
]

interface FeaturedProduct {
  name: string
  slug: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  variantId?: string
}

const featuredProducts: FeaturedProduct[] = [
  { name: "Toyota Hilux 8th Gen Front Set", slug: "front-seat-covers-suit-toyota-hilux-8th-gen", image: "/images/products/toyota-hilux-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 247, variantId: "MW-HILUX-F" },
  { name: "Ford Ranger PX Front Set", slug: "front-seat-covers-suit-ford-ranger-px", image: "/images/products/ford-ranger-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 189, variantId: "MW-RANGER-F" },
  { name: "Ford Ranger Raptor Full Set", slug: "full-set-of-seat-covers-ford-ranger-raptor", image: "/images/products/ford-ranger-raptor-full.jpg", price: 379.95, originalPrice: 629.95, rating: 4.9, reviewCount: 156, variantId: "MW-RAPTOR-FUL" },
]

const knownProducts: FeaturedProduct[] = [
  { name: "Toyota Hilux 8th Gen Front Set", slug: "front-seat-covers-suit-toyota-hilux-8th-gen", image: "/images/products/toyota-hilux-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 247, variantId: "MW-HILUX-F" },
  { name: "Ford Ranger PX Front Set", slug: "front-seat-covers-suit-ford-ranger-px", image: "/images/products/ford-ranger-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 189, variantId: "MW-RANGER-F" },
  { name: "Ford Ranger Raptor Full Set", slug: "full-set-of-seat-covers-ford-ranger-raptor", image: "/images/products/ford-ranger-raptor-full.jpg", price: 379.95, originalPrice: 629.95, rating: 4.9, reviewCount: 156, variantId: "MW-RAPTOR-FUL" },
  { name: "Full Set - Landcruiser 200", slug: "full-set-of-seat-covers-suit-toyota-landcruiser-200", image: "/images/products/toyota-lc200-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.9, reviewCount: 312, variantId: "MW-LC200-FUL" },
  { name: "Mitsubishi Triton Front Set", slug: "front-seat-covers-suit-mitsubishi-triton", image: "/images/products/mitsubishi-triton-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 134, variantId: "MW-TRITON-F" },
  { name: "Nissan Navara Front Set", slug: "front-seat-covers-suit-nissan-navara", image: "/images/products/nissan-navara-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 167, variantId: "MW-NAVARA-F" },
  { name: "Mazda BT-50 Front Set", slug: "front-seat-covers-suit-mazda-bt50", image: "/images/products/mazda-bt50-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 112, variantId: "MW-BT50-F" },
  { name: "Holden Colorado Front Set", slug: "front-seat-covers-holden-colorado", image: "/images/products/holden-colorado-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 108, variantId: "MW-COLORADO-F" },
  { name: "BYD Shark 6 Front Set", slug: "front-set-of-seat-covers-byd-shark-6", image: "/images/products/byd-shark6-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.5, reviewCount: 42, variantId: "MW-BYD-F" },
  { name: "Isuzu D-Max Front Set", slug: "front-seat-covers-suit-isuzu-dmax", image: "/images/products/isuzu-dmax-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 98, variantId: "MW-DMAX-F" },
  { name: "Landcruiser 300 Rear Set", slug: "rear-seat-covers-toyota-landcruiser-300", image: "/images/products/toyota-lc300-rear.jpg", price: 169.95, originalPrice: 279.95, rating: 4.7, reviewCount: 89, variantId: "MW-LC300-R" },
  { name: "Subaru Forester Front Set", slug: "front-seat-covers-subaru-forester", image: "/images/products/subaru-forester-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.5, reviewCount: 76, variantId: "MW-FORESTER-F" },
]

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={cn("size-3", i < Math.floor(rating) ? "text-mainwave-gold" : "text-gray-300")} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-[10px] text-gray-400">({count})</span>
    </div>
  )
}

function ProductCardChat({ product }: { product: FeaturedProduct }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    startTransition(async () => {
      const result = await addToCart(product.variantId ?? product.slug, 1)
      if (result.success) {
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
      }
    })
  }, [product])

  const salePercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-3 p-3">
          <button
            onClick={() => router.push(`/product/${product.slug}`)}
            className="size-16 shrink-0 rounded-lg bg-mainwave-grey overflow-hidden hover:opacity-90 transition-opacity"
          >
            <img src={product.image} alt={product.name} className="size-full object-cover" />
          </button>
          <div className="min-w-0 flex-1">
            <button
              onClick={() => router.push(`/product/${product.slug}`)}
              className="text-left"
            >
              <p className="text-xs font-medium text-mainwave-text leading-tight line-clamp-2 hover:text-mainwave-red transition-colors">
                {product.name}
              </p>
            </button>
            <StarRating rating={product.rating} count={product.reviewCount} />
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-sm font-bold text-mainwave-red">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-[10px] text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {salePercentage > 0 && (
                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1 rounded">{salePercentage}% OFF</span>
              )}
            </div>
            <div className="flex gap-1.5 mt-2">
              <button
                onClick={() => router.push(`/product/${product.slug}`)}
                className="text-[11px] px-2.5 py-1 rounded-md border border-mainwave-border text-mainwave-text hover:bg-mainwave-grey transition-colors"
              >
                View Details
              </button>
              <button
                onClick={handleAddToCart}
                disabled={isPending || added}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors",
                  added
                    ? "bg-green-600 text-white"
                    : "bg-mainwave-red text-white hover:bg-red-700"
                )}
              >
                {isPending ? "..." : added ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VehicleSelectorWidget({
  onCheckFitment,
  compact,
}: {
  onCheckFitment: (text: string) => void
  compact?: boolean
}) {
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const models = vehicles.find((v) => v.slug === make)?.models ?? []

  const handleCheckFitment = () => {
    const text = `I need seat covers for a ${year ? `${year} ` : ""}${make === "gwm" ? "GWM" : vehicles.find(v => v.slug === make)?.make ?? make}${model ? ` ${model}` : ""}`
    onCheckFitment(text)
  }

  return (
    <div className={cn("flex flex-col gap-1.5", compact && "")}>
      <div className="flex gap-1.5">
        <div className="flex-1">
          <Select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(""); setYear("") }}
            placeholder="Make"
            className="h-8 text-xs"
          >
            {vehicles.map((v) => (
              <option key={v.slug} value={v.slug}>{v.make}</option>
            ))}
          </Select>
        </div>
        <div className="flex-1">
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder="Model"
            disabled={!make}
            className="h-8 text-xs"
          >
            {models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Select>
        </div>
        <div className="w-20">
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            disabled={!model}
            className="h-8 text-xs"
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </Select>
        </div>
      </div>
      {make && model && (
        <button
          onClick={handleCheckFitment}
          className="w-full bg-mainwave-red text-white text-xs font-medium py-1.5 rounded-md hover:bg-red-700 transition-colors"
        >
          Check Fitment
        </button>
      )}
    </div>
  )
}

export function ChatWidget() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [
          { type: "text" as const, text: "G'day! I'm Saki, the Mainwave AI assistant. How can I find you the perfect seat covers today?" },
        ],
      },
    ],
  })

  const isLoading = status === "streaming" || status === "submitted"
  const hasMessages = messages.length > 1

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  const handleQuickAction = (text: string) => {
    sendMessage({ text })
  }

  const handleCheckFitment = (text: string) => {
    setInput(text)
    inputRef.current?.focus()
  }

  function matchProducts(text: string): FeaturedProduct[] {
    const lower = text.toLowerCase()
    return knownProducts.filter((p) => {
      // Require at least 2 significant words to match, not just one common word
      const name = p.name.toLowerCase()
      const words = name.split(" ").filter(
        (w) => w.length > 3 && !["front", "rear", "full", "seat", "covers", "cover", "suit"].includes(w)
      )
      const matchCount = words.filter((w) => lower.includes(w)).length
      return matchCount >= 2
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          open ? "bg-mainwave-black scale-0" : "bg-mainwave-red hover:bg-red-700 scale-100 hover:scale-110"
        )}
        aria-label="Chat with Saki AI"
      >
        <svg className="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-mainwave-border flex flex-col transition-all duration-300 origin-bottom-right",
          open ? "opacity-100 scale-100 h-[620px]" : "opacity-0 scale-0 h-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-mainwave-border bg-mainwave-black text-white rounded-t-xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-mainwave-red flex items-center justify-center text-xs font-bold ring-2 ring-white/20">
              S
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Saki AI</p>
              <p className="text-[10px] text-gray-400 leading-tight">Mainwave Assistant</p>
            </div>
          </div>
          <a href="tel:0392626977" className="text-gray-400 hover:text-white transition-colors p-1">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => {
            const productMatches = (msg.role as string) === "assistant"
              ? matchProducts(msg.parts.map((p) => (p.type === "text" ? p.text : "")).join(" "))
              : []

            return (
              <div key={msg.id}>
                <div className={cn("flex", (msg.role as string) === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      (msg.role as string) === "user"
                        ? "bg-mainwave-red text-white rounded-br-sm"
                        : "bg-mainwave-grey text-mainwave-text rounded-bl-sm"
                    )}
                  >
                    {msg.parts.map((part, i) =>
                      part.type === "text" ? <span key={i}>{part.text}</span> : null
                    )}
                  </div>
                </div>

                {productMatches.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {productMatches.slice(0, 2).map((p) => (
                      <ProductCardChat key={p.slug} product={p} />
                    ))}
                  </div>
                )}

                {(msg.role as string) === "assistant" && idx === 0 && !hasMessages && (
                  <div className="mt-3 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => handleQuickAction("Can you help me find seat covers for my vehicle?")}
                        className="inline-flex items-center gap-1.5 bg-white border border-mainwave-border text-mainwave-text text-xs px-3 py-2 rounded-full hover:border-mainwave-red hover:text-mainwave-red transition-colors"
                      >
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Find My Vehicle
                      </button>
                      <button
                        onClick={() => handleQuickAction("I want to track my order")}
                        className="inline-flex items-center gap-1.5 bg-white border border-mainwave-border text-mainwave-text text-xs px-3 py-2 rounded-full hover:border-mainwave-red hover:text-mainwave-red transition-colors"
                      >
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Track Order
                      </button>
                      <button
                        onClick={() => handleQuickAction("I need to speak to a human please")}
                        className="inline-flex items-center gap-1.5 bg-white border border-mainwave-border text-mainwave-text text-xs px-3 py-2 rounded-full hover:border-mainwave-red hover:text-mainwave-red transition-colors"
                      >
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        Talk to Human
                      </button>
                    </div>

                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium mb-2">Featured Products</p>
                      <div className="space-y-2">
                        {featuredProducts.map((p) => (
                          <ProductCardChat key={p.slug} product={p} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-mainwave-grey rounded-lg rounded-bl-sm px-3.5 py-3">
                <span className="inline-flex gap-1">
                  <span className="size-2 bg-mainwave-text/40 rounded-full animate-bounce" />
                  <span className="size-2 bg-mainwave-text/40 rounded-full animate-bounce [animation-delay:0.12s]" />
                  <span className="size-2 bg-mainwave-text/40 rounded-full animate-bounce [animation-delay:0.24s]" />
                </span>
              </div>
            </div>
          )}
          {error && (
            <div className="text-xs text-red-500 text-center">
              Something went wrong. Please try again.
            </div>
          )}
        </div>

        <div className="border-t border-mainwave-border shrink-0 p-3 pb-2 space-y-2">
          <VehicleSelectorWidget onCheckFitment={handleCheckFitment} compact />
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about seat covers..."
              className="flex-1 px-3 py-2 text-sm border border-mainwave-border rounded-md focus:outline-none focus:border-mainwave-red transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-mainwave-red text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  )
}