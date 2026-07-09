import type { Metadata } from "next"
import { getBlogPosts } from "@/lib/db"
import { BlogListingClient } from "./blog-listing-client"

export const metadata: Metadata = {
  title: "Car Care Tips & Buying Guides - Mainwave Seat Covers",
  description: "Expert advice on car care, seat cover materials, buying guides, and industry insights from Mainwave Seat Covers.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogListingClient initialPosts={posts} />
}
