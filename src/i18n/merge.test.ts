import { describe, it, expect } from "vitest"
import { deepMerge } from "./merge"

describe("deepMerge", () => {
  it("merges nested objects", () => {
    const base = { a: { b: 1, c: 2 }, d: 3 }
    const result = deepMerge(base, { a: { c: 9 } })
    expect(result).toEqual({ a: { b: 1, c: 9 }, d: 3 })
  })

  it("replaces arrays wholesale instead of merging", () => {
    const base = { list: [1, 2, 3] }
    const result = deepMerge(base, { list: [9] })
    expect(result.list).toEqual([9])
  })

  it("skips undefined override values", () => {
    const base = { a: 1, b: 2 }
    const result = deepMerge(base, { a: undefined })
    expect(result.a).toBe(1)
  })

  it("returns base when override is undefined", () => {
    const base = { a: 1 }
    expect(deepMerge(base, undefined)).toBe(base)
  })

  it("replaces primitives and handles nulls", () => {
    expect(deepMerge({ a: 1 }, { a: 0 }).a).toBe(0)
    expect(deepMerge({ a: 1 }, { a: "x" }).a).toBe("x")
  })
})
