"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { Product, Vehicle } from "@/types"
import { ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"

const categories = ["All", "Front Set", "Rear Set", "Full Set", "Apparel", "Car Accessories", "Lifestyle"]

const sortOptions = [
  { label: "Popularity", value: "popularity" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
]

const ITEMS_PER_PAGE = 9

export function ShopPageClient({
  initialProducts,
  initialVehicles,
  initialCategory,
}: {
  initialProducts: Product[]
  initialVehicles: Vehicle[]
  initialCategory?: string
}) {
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "All")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sort, setSort] = useState("popularity")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...initialProducts]

    if (selectedMakes.length > 0) {
      result = result.filter((p) =>
        selectedMakes.some((m) => p.vehicle.toLowerCase().includes(m.toLowerCase()))
      )
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "newest":
        result.reverse()
        break
      default:
        break
    }

    return result
  }, [selectedMakes, selectedCategory, priceRange, sort])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const toggleMake = (make: string) => {
    setPage(1)
    setSelectedMakes((prev) =>
      prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]
    )
  }

  return (
    <div className="bg-mainwave-grey min-h-screen">
      <div className="bg-white border-b border-mainwave-border">
        <div className="container-site py-4 md:py-6">
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <Link href="/" className="hover:text-mainwave-red transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Shop</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black">All Products</h1>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} products found</p>
        </div>
      </div>

      <div className="container-site py-6 md:py-8">
        <div className="flex gap-6">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white border border-mainwave-border p-5 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-3">Vehicle Make</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {initialVehicles.map((v) => (
                    <label key={v.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedMakes.includes(v.make)}
                        onChange={() => toggleMake(v.make)}
                        className="accent-mainwave-red w-4 h-4"
                      />
                      <span className="text-xs text-mainwave-text group-hover:text-mainwave-red transition-colors">
                        {v.make}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setSelectedCategory(cat); setPage(1) }}
                      className={cn(
                        "block w-full text-left text-xs py-1.5 px-2 transition-colors",
                        selectedCategory === cat
                          ? "bg-mainwave-red text-white font-medium"
                          : "text-mainwave-text hover:text-mainwave-red"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-3">Price Range</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                  <span>${priceRange[0]}</span>
                  <span>-</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  step={50}
                  value={priceRange[1]}
                  onChange={(e) => { setPriceRange([0, Number(e.target.value)]); setPage(1) }}
                  className="w-full accent-mainwave-red"
                />
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden text-xs font-medium text-mainwave-red uppercase tracking-wider"
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-gray-500">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-xs border border-mainwave-border bg-white px-2 py-1.5 text-mainwave-text focus:outline-none focus:border-mainwave-red"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="md:hidden bg-white border border-mainwave-border p-4 mb-4 space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">Vehicle Make</h3>
                  <div className="grid grid-cols-2 gap-1">
                    {initialVehicles.map((v) => (
                      <label key={v.id} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={selectedMakes.includes(v.make)} onChange={() => toggleMake(v.make)} className="accent-mainwave-red w-3.5 h-3.5" />
                        <span className="text-xs text-mainwave-text">{v.make}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">Category</h3>
                  <div className="flex flex-wrap gap-1">
                    {categories.map((cat) => (
                      <button key={cat} onClick={() => { setSelectedCategory(cat); setPage(1) }} className={cn("text-xs px-2 py-1 border transition-colors", selectedCategory === cat ? "bg-mainwave-red text-white border-mainwave-red" : "border-mainwave-border text-mainwave-text hover:text-mainwave-red")}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {paginated.length === 0 ? (
              <div className="bg-white border border-mainwave-border p-8 text-center">
                <p className="text-gray-500 text-sm">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {paginated.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "w-8 h-8 text-xs font-medium border transition-colors",
                      p === page
                        ? "bg-mainwave-red text-white border-mainwave-red"
                        : "border-mainwave-border text-mainwave-text hover:text-mainwave-red"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
