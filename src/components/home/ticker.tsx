const items = [
  "Seat Covers",
  "Camping",
  "Apparel",
  "Merch",
  "Factory Direct",
  "Made in Thailand",
]

export function Ticker() {
  const row = [...items, ...items]
  return (
    <div className="bg-mainwave-red overflow-hidden border-y border-ink/20 py-3" aria-hidden="true">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center text-ink text-sm md:text-base font-black uppercase tracking-[0.25em] whitespace-nowrap"
              >
                <span className="px-6">{item}</span>
                <span className="text-ink/50">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
