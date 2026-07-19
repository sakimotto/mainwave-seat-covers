import { NextResponse } from "next/server"
import { getCommerce } from "@/commerce"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lang = searchParams.get("lang") ?? undefined
  const products = await getCommerce().catalog.getProducts(lang)
  return NextResponse.json(products)
}
