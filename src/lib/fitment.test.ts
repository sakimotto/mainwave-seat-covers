import { describe, it, expect } from "vitest"
import { matchesGarage, garageVehicleIdsFrom } from "./fitment"
import type { Product } from "@/types"

function product(vehicleId?: string): Product {
  return {
    id: "p1",
    name: "Test",
    slug: "test",
    image: "/x.jpg",
    price: 100,
    rating: 5,
    reviewCount: 1,
    vehicle: "",
    category: "Front Set",
    vehicleId,
  }
}

describe("matchesGarage", () => {
  it("matches when product vehicleId is in the garage", () => {
    expect(matchesGarage(product("v1"), ["v1", "v2"])).toBe(true)
  })
  it("does not match when product vehicleId is absent from garage", () => {
    expect(matchesGarage(product("v3"), ["v1", "v2"])).toBe(false)
  })
  it("universal products (no vehicleId) match any garage", () => {
    expect(matchesGarage(product(undefined), ["v1"])).toBe(true)
    expect(matchesGarage(product(undefined), [])).toBe(true)
  })
  it("empty garage matches only universal products", () => {
    expect(matchesGarage(product("v1"), [])).toBe(false)
  })
})

describe("garageVehicleIdsFrom", () => {
  it("extracts ids", () => {
    expect(garageVehicleIdsFrom([{ vehicleId: "a" }, { vehicleId: "b" }])).toEqual(["a", "b"])
  })
  it("handles undefined garage", () => {
    expect(garageVehicleIdsFrom(undefined)).toEqual([])
  })
})
