"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import type { Product, Vehicle } from "@/types"
import { ChevronRightIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"
import { localePath, type Dictionary, type Locale } from "@/i18n"
import { matchesGarage } from "@/lib/fitment"

const ITEMS_PER_PAGE = 9

export function ShopPageClient({
  initialProducts,
  initialVehicles,
  initialCategory,
  initialQuery,
  dict,
  locale,
  garageVehicleIds,
  initialMyVehicles,
}: {
  initialProducts: Product[]
  initialVehicles: Vehicle[]
  initialCategory?: string
  initialQuery?: string
  dict: Dictionary
  locale: Locale
  garageVehicleIds: string[]
  initialMyVehicles?: boolean
}) {
  const [selectedMakes, setSelectedMakes] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "All")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [sort, setSort] = useState("popularity")
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [myVehiclesOnly, setMyVehiclesOnly] = useState(initialMyVehicles ?? false)
  const S = dict.shop
  const hasGarage = garageVehicleIds.length > 0

  const filtered = useMemo(() => {
    let result = [...initialProducts]

    if (myVehiclesOnly && hasGarage) {
      result = result.filter((p) => matchesGarage(p, garageVehicleIds))
    }

    if (initialQuery?.trim()) {
      const q = initialQuery.toLowerCase()
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.vehicle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    }

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
  }, [initialProducts, initialQuery, myVehiclesOnly, hasGarage, garageVehicleIds, selectedMakes, selectedCategory, priceRange, sort])

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
            <Link href={localePath(locale, "/")} className="hover:text-brand-accent transition-colors">{S.breadcrumbHome}</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">{S.breadcrumbShop}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-mainwave-black">
            {initialQuery ? `${S.resultsFor} "${initialQuery}"` : S.title}
          </h1>
          <p className="text-sm text-gray-500 mt-1">{filtered.length} {S.productsFound}</p>
        </div>
      </div>

      <div className="container-site py-6 md:py-8">
        <div className="flex gap-6">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white border border-mainwave-border p-5 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-3">{S.vehicleMake}</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {initialVehicles.map((v) => (
                    <label key={v.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedMakes.includes(v.make)}
                        onChange={() => toggleMake(v.make)}
                        className="accent-brand-accent w-4 h-4"
                      />
                      <span className="text-xs text-mainwave-text group-hover:text-brand-accent transition-colors">
                        {v.make}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-3">{S.category}</h3>
                <div className="space-y-2">
                  {S.categories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => { setSelectedCategory(cat.key); setPage(1) }}
                      className={cn(
                        "block w-full text-left text-xs py-1.5 px-2 transition-colors",
                        selectedCategory === cat.key
                          ? "bg-brand-accent text-white font-medium"
                          : "text-mainwave-text hover:text-brand-accent"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-3">{S.priceRange}</h3>
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
                  className="w-full accent-brand-accent"
                />
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden text-xs font-medium text-brand-accent uppercase tracking-wider"
              >
                {showFilters ? S.hideFilters : S.showFilters}
              </button>
              {hasGarage && (
                <button
                  onClick={() => { setMyVehiclesOnly(!myVehiclesOnly); setPage(1) }}
                  className={cn(
                    "text-xs font-bold uppercase tracking-wider px-3 py-1.5 border transition-colors",
                    myVehiclesOnly
                      ? "bg-brand-accent text-white border-brand-accent"
                      : "border-mainwave-border text-mainwave-text hover:border-brand-accent"
                  )}
                >
                  {dict.garage.myVehicles}
                </button>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-gray-500">{S.sortBy}</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="text-xs border border-mainwave-border bg-white px-2 py-1.5 text-mainwave-text focus:outline-none focus:border-brand-accent"
                >
                  {S.sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="md:hidden bg-white border border-mainwave-border p-4 mb-4 space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">{S.vehicleMake}</h3>
                  <div className="grid grid-cols-2 gap-1">
                    {initialVehicles.map((v) => (
                      <label key={v.id} className="flex items-center gap-1.5 cursor-pointer">
                        <input type="checkbox" checked={selectedMakes.includes(v.make)} onChange={() => toggleMake(v.make)} className="accent-brand-accent w-3.5 h-3.5" />
                        <span className="text-xs text-mainwave-text">{v.make}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">{S.category}</h3>
                  <div className="flex flex-wrap gap-1">
                    {S.categories.map((cat) => (
                      <button key={cat.key} onClick={() => { setSelectedCategory(cat.key); setPage(1) }} className={cn("text-xs px-2 py-1 border transition-colors", selectedCategory === cat.key ? "bg-brand-accent text-white border-brand-accent" : "border-mainwave-border text-mainwave-text hover:text-brand-accent")}>
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {paginated.length === 0 ? (
              <div className="bg-white border border-mainwave-border p-8 text-center">
                <p className="text-gray-500 text-sm">{S.noMatch}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    matchesGarage={hasGarage && matchesGarage(product, garageVehicleIds)}
                    fitsLabel={dict.garage.fitsYourVehicle}
                  />
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
                        ? "bg-brand-accent text-white border-brand-accent"
                        : "border-mainwave-border text-mainwave-text hover:text-brand-accent"
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
