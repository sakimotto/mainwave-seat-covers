"use client"

import { useState } from "react"
import Link from "next/link"
import type { BlogPost } from "@/types"
import { ChevronRightIcon } from "@/components/icons"

const categories = [
  { label: "All", value: "all" },
  { label: "Car Care", value: "Car Care" },
  { label: "Guides", value: "Guides" },
  { label: "Materials", value: "Materials" },
  { label: "Industry", value: "Industry" },
  { label: "Buying Guide", value: "Buying Guide" },
]

export function BlogListingClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = initialPosts.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory
    const matchesSearch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="bg-white">
      <div className="bg-mainwave-black py-12 md:py-16">
        <div className="container-site">
          <nav className="flex items-center gap-1 text-xs text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-white">Blog</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
            Tips &amp; Tricks from Mainwave
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Expert advice on car care, seat cover materials, buying guides, and industry insights.
          </p>
        </div>
      </div>

      <div className="container-site py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 text-xs font-semibold border transition-colors uppercase tracking-wider ${
                  activeCategory === cat.value
                    ? "bg-brand-accent text-white border-brand-accent"
                    : "border-mainwave-border text-mainwave-text hover:bg-brand-accent hover:text-white hover:border-brand-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-mainwave-border bg-white text-mainwave-text focus:outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="group block"
              >
                <div className="aspect-[16/10] bg-mainwave-grey mb-3 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold text-brand-accent uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="text-[10px] text-gray-400">{post.date}</span>
                </div>
                <h2 className="text-sm md:text-base font-bold text-mainwave-black group-hover:text-brand-accent transition-colors leading-snug mb-1">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">No articles found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
              className="mt-3 text-brand-accent text-sm font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
