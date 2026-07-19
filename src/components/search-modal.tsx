"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { Product, Vehicle } from "@/types"

interface SearchModalProps {
  open: boolean
  onClose: () => void
  products: Product[]
  vehicles: Vehicle[]
}

export function SearchModal({ open, onClose, products, vehicles }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleClose = () => {
    setQuery("")
    onClose()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("")
        onClose()
      }
    }
    if (open) {
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    if (!query.trim()) return { products: [], vehicles: [] }
    const q = query.toLowerCase()
    
    const matchedProducts = products
      .filter((p) => 
        p.name.toLowerCase().includes(q) ||
        p.vehicle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
      .slice(0, 6)
    
    const matchedVehicles = vehicles
      .filter((v) => 
        v.make.toLowerCase().includes(q) ||
        v.models.some((m) => m.toLowerCase().includes(q))
      )
      .slice(0, 4)
    
    return { products: matchedProducts, vehicles: matchedVehicles }
  }, [query, products, vehicles])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`)
      handleClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <form onSubmit={handleSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search seat covers, vehicles, merchandise..."
            className="w-full px-6 py-4 text-lg border-0 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-mainwave-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {(results.products.length > 0 || results.vehicles.length > 0) && (
          <div className="border-t border-mainwave-border max-h-[400px] overflow-y-auto">
            {/* Vehicles */}
            {results.vehicles.length > 0 && (
              <div className="p-4">
                <p className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-3">Vehicles</p>
                <div className="space-y-2">
                  {results.vehicles.map((v) => (
                    <Link
                      key={v.id}
                      href={`/vehicle/${v.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-mainwave-grey transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-mainwave-grey flex items-center justify-center">
                        <img src={v.image} alt={v.make} className="w-6 h-6 object-contain" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-mainwave-black">{v.make}</p>
                        <p className="text-xs text-gray-500">{v.models.length} models available</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Products */}
            {results.products.length > 0 && (
              <div className="p-4">
                <p className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-3">Products</p>
                <div className="space-y-2">
                  {results.products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-mainwave-grey transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-mainwave-grey overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-mainwave-black line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.vehicle || p.category}</p>
                      </div>
                      <p className="text-sm font-bold text-mainwave-black">${p.price.toFixed(2)}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No results */}
        {query.trim() && results.products.length === 0 && results.vehicles.length === 0 && (
          <div className="border-t border-mainwave-border p-6 text-center">
            <p className="text-sm text-gray-500">No results found for &quot;{query}&quot;</p>
            <p className="text-xs text-gray-400 mt-1">Try searching for a vehicle make or product name</p>
          </div>
        )}

        {/* Quick links */}
        {!query.trim() && (
          <div className="border-t border-mainwave-border p-4">
            <p className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {["Toyota Hilux", "Ford Ranger", "Neoprene", "Front Set", "Full Set"].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3 py-1.5 text-xs bg-mainwave-grey rounded-full hover:bg-mainwave-red hover:text-white transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}