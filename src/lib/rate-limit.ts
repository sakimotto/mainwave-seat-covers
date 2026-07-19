/**
 * In-memory token-bucket rate limiter.
 *
 * Caveat: state lives per server instance. On serverless platforms each
 * instance has its own bucket map, so limits are approximate — good enough
 * to stop naive abuse, not a guarantee. Move to Redis/Upstash for strict
 * distributed limits.
 */

type Bucket = { tokens: number; resetAt: number }

const buckets = new Map<string, Bucket>()

const MAX_BUCKETS = 5000

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}): { ok: boolean; retryAfter: number } {
  const now = Date.now()

  // Lazy sweep to bound memory
  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (now > b.resetAt) buckets.delete(k)
    }
  }

  const bucket = buckets.get(key)

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { tokens: limit - 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  if (bucket.tokens <= 0) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.tokens -= 1
  return { ok: true, retryAfter: 0 }
}

export function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  )
}

export function tooManyRequests(retryAfter: number): Response {
  return new Response(JSON.stringify({ error: "Too many requests. Please slow down." }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfter),
    },
  })
}
