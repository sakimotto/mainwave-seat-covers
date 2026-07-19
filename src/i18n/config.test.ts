import { describe, it, expect } from "vitest"
import { localePath, isLocale } from "./config"

describe("isLocale", () => {
  it("accepts supported locales", () => {
    expect(isLocale("en")).toBe(true)
    expect(isLocale("th")).toBe(true)
  })
  it("rejects unknown locales", () => {
    expect(isLocale("fr")).toBe(false)
    expect(isLocale("")).toBe(false)
    expect(isLocale("EN")).toBe(false)
  })
})

describe("localePath", () => {
  it("keeps English paths clean", () => {
    expect(localePath("en", "/shop")).toBe("/shop")
    expect(localePath("en", "/")).toBe("/")
  })
  it("prefixes Thai paths", () => {
    expect(localePath("th", "/shop")).toBe("/th/shop")
    expect(localePath("th", "/")).toBe("/th")
    expect(localePath("th", "/product/x?q=1")).toBe("/th/product/x?q=1")
  })
})
