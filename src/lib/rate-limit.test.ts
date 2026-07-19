import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { rateLimit } from "./rate-limit"

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it("allows up to the limit within the window", () => {
    const key = `test-${Math.random()}`
    for (let i = 0; i < 5; i++) {
      expect(rateLimit({ key, limit: 5, windowMs: 60_000 }).ok).toBe(true)
    }
    expect(rateLimit({ key, limit: 5, windowMs: 60_000 }).ok).toBe(false)
  })

  it("reports retry-after when limited", () => {
    const key = `test-${Math.random()}`
    rateLimit({ key, limit: 1, windowMs: 60_000 })
    const result = rateLimit({ key, limit: 1, windowMs: 60_000 })
    expect(result.ok).toBe(false)
    expect(result.retryAfter).toBeGreaterThan(0)
    expect(result.retryAfter).toBeLessThanOrEqual(60)
  })

  it("resets after the window expires", () => {
    const key = `test-${Math.random()}`
    rateLimit({ key, limit: 1, windowMs: 60_000 })
    expect(rateLimit({ key, limit: 1, windowMs: 60_000 }).ok).toBe(false)
    vi.advanceTimersByTime(61_000)
    expect(rateLimit({ key, limit: 1, windowMs: 60_000 }).ok).toBe(true)
  })

  it("tracks keys independently", () => {
    const a = `test-a-${Math.random()}`
    const b = `test-b-${Math.random()}`
    rateLimit({ key: a, limit: 1, windowMs: 60_000 })
    expect(rateLimit({ key: b, limit: 1, windowMs: 60_000 }).ok).toBe(true)
  })
})
