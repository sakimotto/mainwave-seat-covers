import { NextResponse } from "next/server"
import { getCommerce } from "@/commerce"

export async function GET() {
  const products = await getCommerce().catalog.getProducts()
  return NextResponse.json(products)
}
