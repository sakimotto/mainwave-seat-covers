import { describe, it, expect } from "vitest"
import { formatMoney } from "./format"

describe("formatMoney", () => {
  it("formats AUD with narrow symbol by default", () => {
    expect(formatMoney(119.95)).toBe("$119.95")
  })
  it("handles zero and large amounts", () => {
    expect(formatMoney(0)).toBe("$0.00")
    expect(formatMoney(1299)).toBe("$1,299.00")
  })
})
