"use client"

import { useState, useEffect } from "react"
import { SearchModal } from "@/components/search-modal"
import type { Dictionary, Locale } from "@/i18n"
import type { Product, Vehicle } from "@/types"

export function SearchWrapper({ vehicles, dict, locale }: { vehicles: Vehicle[]; dict: Dictionary; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // Fetch products on mount (localized names)
    fetch(`/api/products?lang=${locale}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => {})
  }, [locale])

  // Listen for search trigger from header
  useEffect(() => {
    const handleSearchTrigger = () => setOpen(true)
    window.addEventListener("open-search", handleSearchTrigger)
    return () => window.removeEventListener("open-search", handleSearchTrigger)
  }, [])

  return (
    <SearchModal
      open={open}
      onClose={() => setOpen(false)}
      products={products}
      vehicles={vehicles}
      dict={dict}
      locale={locale}
    />
  )
}
