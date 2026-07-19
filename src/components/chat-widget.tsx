"use client"

import { useState, useRef, useEffect, useTransition, useCallback } from "react"
import { useChat } from "@ai-sdk/react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { addToCart } from "@/commerce/vercel/cart"
import { formatMoney } from "@/lib/format"
import { localePath, type Dictionary, type Locale } from "@/i18n"
import { brand } from "@/brands"
import type { Vehicle } from "@/types"

const years = Array.from({ length: 26 }, (_, i) => (2026 - i).toString())

/** Product shape returned by the AI tools (searchProducts / getVehicleFitments). */
type ToolProduct = {
  name: string
  slug: string
  image?: string
  price: number
  originalPrice?: number
  inStock?: boolean
  variantId?: string
}

function ProductCardChat({ product, dict, locale }: { product: ToolProduct; dict: Dictionary; locale: Locale }) {
  const [isPending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)

  const handleAddToCart = useCallback(() => {
    const variantId = product.variantId
    if (!variantId) return
    startTransition(async () => {
      const result = await addToCart(variantId, 1)
      if (result.success) {
        window.dispatchEvent(new CustomEvent("cart-updated"))
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
      }
    })
  }, [product])

  const salePercentage = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex gap-3 p-3">
          <Link
            href={localePath(locale, `/product/${product.slug}`)}
            className="size-16 shrink-0 rounded-lg bg-mainwave-grey overflow-hidden hover:opacity-90 transition-opacity"
          >
            {product.image && (
              <img src={product.image} alt={product.name} className="size-full object-cover" />
            )}
          </Link>
          <div className="min-w-0 flex-1">
            <Link href={localePath(locale, `/product/${product.slug}`)} className="text-left">
              <p className="text-xs font-medium text-mainwave-text leading-tight line-clamp-2 hover:text-brand-accent transition-colors">
                {product.name}
              </p>
            </Link>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-sm font-bold text-brand-accent">{formatMoney(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[10px] text-gray-400 line-through">{formatMoney(product.originalPrice)}</span>
              )}
              {salePercentage > 0 && (
                <span className="text-[10px] font-medium text-green-600 bg-green-50 px-1 rounded">{salePercentage}% OFF</span>
              )}
            </div>
            <div className="flex gap-1.5 mt-2">
              <Link
                href={localePath(locale, `/product/${product.slug}`)}
                className="text-[11px] px-2.5 py-1 rounded-md border border-mainwave-border text-mainwave-text hover:bg-mainwave-grey transition-colors"
              >
                {dict.chat.viewDetails}
              </Link>
              <button
                onClick={handleAddToCart}
                disabled={isPending || added || !product.inStock || !product.variantId}
                className={cn(
                  "text-[11px] px-2.5 py-1 rounded-md font-medium transition-colors disabled:opacity-50",
                  added
                    ? "bg-green-600 text-white"
                    : "bg-brand-accent text-white hover:bg-red-700"
                )}
              >
                {!product.inStock
                  ? dict.chat.outOfStock
                  : isPending
                    ? "..."
                    : added
                      ? dict.chat.added
                      : dict.chat.addToCart}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/** Render products from a tool result as cards. */
function ToolProductCards({ output, dict, locale }: { output: unknown; dict: Dictionary; locale: Locale }) {
  let products: ToolProduct[] = []
  if (Array.isArray(output)) {
    products = output as ToolProduct[]
  } else if (output && typeof output === "object" && "fitments" in output) {
    products = (output as { fitments: ToolProduct[] }).fitments
  }
  if (products.length === 0) return null
  return (
    <div className="mt-2 space-y-2">
      {products.slice(0, 3).map((p) => (
        <ProductCardChat key={p.slug} product={p} dict={dict} locale={locale} />
      ))}
    </div>
  )
}

function VehicleSelectorWidget({
  vehicles,
  onCheckFitment,
  dict,
}: {
  vehicles: Vehicle[]
  onCheckFitment: (text: string) => void
  dict: Dictionary
}) {
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const selectedVehicle = vehicles.find((v) => v.slug === make)

  const handleCheckFitment = () => {
    if (!make || !model) return
    const makeName = selectedVehicle?.make ?? make
    onCheckFitment(`I need seat covers for a ${year ? `${year} ` : ""}${makeName} ${model}`)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1.5">
        <div className="flex-1">
          <Select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(""); setYear("") }}
            placeholder={dict.garage.make}
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
            placeholder={dict.garage.model}
            disabled={!make}
            className="h-8 text-xs"
          >
            {selectedVehicle?.models.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Select>
        </div>
        <div className="w-20">
          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={dict.garage.year}
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
          className="w-full bg-brand-accent text-white text-xs font-medium py-1.5 rounded-md hover:bg-red-700 transition-colors"
        >
          {dict.chat.checkFitment}
        </button>
      )}
    </div>
  )
}

export function ChatWidget({ vehicles, dict, locale }: { vehicles: Vehicle[]; dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    messages: [
      {
        id: "welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: dict.chat.welcome }],
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

  const send = (text: string) => {
    if (!text.trim() || isLoading) return
    sendMessage({ text }, { body: { locale } })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    send(input)
    setInput("")
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed bottom-6 right-6 z-50 size-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300",
          open ? "bg-mainwave-black scale-0" : "bg-brand-accent hover:bg-red-700 scale-100 hover:scale-110"
        )}
        aria-label={dict.chat.title}
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
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-mainwave-border bg-mainwave-black text-white rounded-t-xl shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-brand-accent flex items-center justify-center text-xs font-bold ring-2 ring-white/20">
              S
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">{dict.chat.title}</p>
              <p className="text-[10px] text-gray-400 leading-tight">{dict.chat.subtitle}</p>
            </div>
          </div>
          <a href={brand.phone.href} className="text-gray-400 hover:text-white transition-colors p-1" aria-label={brand.phone.display}>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1" aria-label="Close chat">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={msg.id}>
              <div className={cn("flex", (msg.role as string) === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                    (msg.role as string) === "user"
                      ? "bg-brand-accent text-white rounded-br-sm"
                      : "bg-mainwave-grey text-mainwave-text rounded-bl-sm"
                  )}
                >
                  {msg.parts.map((part, i) =>
                    part.type === "text" ? <span key={i}>{part.text}</span> : null
                  )}
                </div>
              </div>

              {/* Generative UI: product cards from tool results */}
              {msg.parts.map((part, i) => {
                const toolPart = part as unknown as { type: string; state?: string; output?: unknown }
                if (
                  (toolPart.type === "tool-searchProducts" || toolPart.type === "tool-getVehicleFitments") &&
                  toolPart.state === "output-available"
                ) {
                  return <ToolProductCards key={i} output={toolPart.output} dict={dict} locale={locale} />
                }
                return null
              })}

              {/* Welcome quick actions */}
              {(msg.role as string) === "assistant" && idx === 0 && !hasMessages && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[
                    { text: dict.chat.quickFind, icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { text: dict.chat.quickTrack, icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
                    { text: dict.chat.quickHuman, icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" },
                  ].map((action) => (
                    <button
                      key={action.text}
                      onClick={() => send(action.text)}
                      className="inline-flex items-center gap-1.5 bg-white border border-mainwave-border text-mainwave-text text-xs px-3 py-2 rounded-full hover:border-brand-accent hover:text-brand-accent transition-colors"
                    >
                      <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                      </svg>
                      {action.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

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
            <div className="text-xs text-red-500 text-center">{dict.chat.error}</div>
          )}
        </div>

        {/* Footer: fitment selector + input */}
        <div className="border-t border-mainwave-border shrink-0 p-3 pb-2 space-y-2">
          <VehicleSelectorWidget vehicles={vehicles} onCheckFitment={send} dict={dict} />
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={dict.chat.placeholder}
              className="flex-1 px-3 py-2 text-sm border border-mainwave-border rounded-md focus:outline-none focus:border-brand-accent transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-accent text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send"
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
