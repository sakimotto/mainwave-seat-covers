/** Deep-partial where arrays are replaced wholesale, not merged. */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends readonly unknown[]
    ? T[K]
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K]
}

export function deepMerge<T>(base: T, override: DeepPartial<T> | undefined): T {
  if (!override) return base
  if (Array.isArray(base) || Array.isArray(override)) return (override ?? base) as T
  if (typeof base !== "object" || base === null) return (override ?? base) as T

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const [key, value] of Object.entries(override as Record<string, unknown>)) {
    if (value === undefined) continue
    const baseValue = (base as Record<string, unknown>)[key]
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      typeof baseValue === "object" &&
      baseValue !== null &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue, value as never)
    } else {
      result[key] = value
    }
  }
  return result as T
}
