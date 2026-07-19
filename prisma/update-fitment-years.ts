import "dotenv/config"
import { prisma } from "../src/lib/prisma"

// Confident generation year ranges (product team can refine)
const RANGES: { slugLike: string; yearStart: number; yearEnd: number | null }[] = [
  { slugLike: "%toyota-hilux%", yearStart: 2015, yearEnd: null },
  { slugLike: "%landcruiser-200%", yearStart: 2007, yearEnd: 2021 },
  { slugLike: "%landcruiser-300%", yearStart: 2021, yearEnd: null },
  { slugLike: "%landcruiser-79%", yearStart: 2007, yearEnd: null },
  { slugLike: "%prado-150%", yearStart: 2009, yearEnd: null },
  { slugLike: "%ford-ranger-px%", yearStart: 2011, yearEnd: 2022 },
  { slugLike: "%ranger-raptor%", yearStart: 2018, yearEnd: null },
  { slugLike: "%triton%", yearStart: 2015, yearEnd: null },
  { slugLike: "%navara%", yearStart: 2015, yearEnd: null },
  { slugLike: "%patrol-y62%", yearStart: 2010, yearEnd: null },
  { slugLike: "%pajero-sport%", yearStart: 2015, yearEnd: null },
  { slugLike: "%colorado%", yearStart: 2012, yearEnd: 2020 },
  { slugLike: "%ldv-t60%", yearStart: 2017, yearEnd: null },
  { slugLike: "%byd-shark-6%", yearStart: 2024, yearEnd: null },
]

async function main() {
  let updated = 0
  for (const r of RANGES) {
    const res = await prisma.fitment.updateMany({
      where: { product: { slug: { contains: r.slugLike.replace(/%/g, "") } } },
      data: { yearStart: r.yearStart, yearEnd: r.yearEnd },
    })
    updated += res.count
  }
  console.log(`Updated ${updated} fitment rows`)
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1) })
