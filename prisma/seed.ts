import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../src/generated/prisma/client"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const vehiclesData = [
  { make: "Toyota", slug: "toyota", image: "/images/vehicles/toyota.svg", models: ["Hilux", "Landcruiser 200", "Landcruiser 300", "Landcruiser 79 Series", "Prado", "RAV4", "Corolla", "Camry", "Fortuner", "Kluger"] },
  { make: "Ford", slug: "ford", image: "/images/vehicles/ford.svg", models: ["Ranger PX", "Ranger Next Gen", "Ranger Raptor", "Everest", "Ranger XL/XLS/XLT"] },
  { make: "Nissan", slug: "nissan", image: "/images/vehicles/nissan.svg", models: ["Navara", "Patrol", "X-Trail", "Qashqai"] },
  { make: "Mazda", slug: "mazda", image: "/images/vehicles/mazda.svg", models: ["BT-50", "CX-3", "CX-5", "CX-9", "Mazda 3"] },
  { make: "Mitsubishi", slug: "mitsubishi", image: "/images/vehicles/mitsubishi.svg", models: ["Triton", "Outlander", "Pajero Sport", "ASX"] },
  { make: "Isuzu", slug: "isuzu", image: "/images/vehicles/isuzu.svg", models: ["D-Max", "MU-X"] },
  { make: "Great Wall", slug: "gwm", image: "/images/vehicles/gwm.svg", models: ["Cannon", "Steed", "Ute"] },
  { make: "Holden", slug: "holden", image: "/images/vehicles/holden.svg", models: ["Colorado", "Commodore"] },
  { make: "Subaru", slug: "subaru", image: "/images/vehicles/subaru.svg", models: ["Forester", "Outback", "XV"] },
  { make: "Hyundai", slug: "hyundai", image: "/images/vehicles/hyundai.svg", models: ["Tucson", "Kona", "Santa Fe", "i30"] },
  { make: "LDV", slug: "ldv", image: "/images/vehicles/ldv.svg", models: ["T60", "V80", "Deliver 9"] },
  { make: "Volkswagen", slug: "volkswagen", image: "/images/vehicles/volkswagen.svg", models: ["Amarok", "Tiguan", "Golf"] },
  { make: "BYD", slug: "byd", image: "/images/vehicles/byd.svg", models: ["Shark 6", "Atto 3", "Seal"] },
]

const productsData = [
  { name: "Premium Neoprene Front Seat Covers - Toyota Hilux 8th Gen", slug: "front-seat-covers-suit-toyota-hilux-8th-gen", image: "/images/products/toyota-hilux-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 247, vehicle: "Toyota Hilux", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "TY7035N" },
  { name: "Premium Neoprene Front Seat Covers - Ford Ranger PX", slug: "front-seat-covers-suit-ford-ranger-px", image: "/images/products/ford-ranger-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 189, vehicle: "Ford Ranger", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "FD1045N" },
  { name: "Premium Neoprene Front Seat Covers - Isuzu D-Max", slug: "front-seat-covers-suit-isuzu-dmax", image: "/images/products/isuzu-dmax-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 156, vehicle: "Isuzu D-Max", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "IZ3025N" },
  { name: "Full Set Neoprene Seat Covers - Toyota Landcruiser 200 Series", slug: "full-set-of-seat-covers-suit-toyota-landcruiser-200", image: "/images/products/toyota-lc200-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.9, reviewCount: 312, vehicle: "Toyota Landcruiser 200", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "TY7035N-FS" },
  { name: "Premium Neoprene Front Seat Covers - Mitsubishi Triton", slug: "front-seat-covers-suit-mitsubishi-triton", image: "/images/products/mitsubishi-triton-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 134, vehicle: "Mitsubishi Triton", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "MN3025N" },
  { name: "Rear Seat Covers - Toyota Landcruiser 300 Series", slug: "rear-seat-covers-suit-toyota-landcruiser-300", image: "/images/products/toyota-lc300-rear.jpg", price: 199.95, originalPrice: 329.95, rating: 4.7, reviewCount: 98, vehicle: "Toyota Landcruiser 300", category: "Rear Set", isSale: true, color: "Black with Red Stitching", sku: "TY7035N-RRS" },
  { name: "Full Set Neoprene Seat Covers - Ford Ranger Raptor", slug: "full-set-of-seat-covers-suit-ford-ranger-raptor", image: "/images/products/ford-ranger-raptor-full.jpg", price: 379.95, originalPrice: 629.95, rating: 4.8, reviewCount: 203, vehicle: "Ford Ranger Raptor", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "FD1045N-FLS" },
  { name: "Premium Neoprene Front Seat Covers - BYD Shark 6", slug: "front-set-of-seat-covers-byd-shark-6", image: "/images/products/byd-shark6-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.5, reviewCount: 42, vehicle: "BYD Shark 6", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "BYD17000N" },
  { name: "Premium Neoprene Front Seat Covers - Nissan Navara", slug: "front-seat-covers-suit-nissan-navara", image: "/images/products/nissan-navara-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 167, vehicle: "Nissan Navara", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "NU3025N" },
  { name: "Premium Neoprene Front Seat Covers - Mazda BT-50", slug: "front-seat-covers-suit-mazda-bt50", image: "/images/products/mazda-bt50-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 112, vehicle: "Mazda BT-50", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "MZ1025N" },
  { name: "Premium Neoprene Front Seat Covers - Toyota Landcruiser 79 Series", slug: "front-seat-covers-for-toyota-landcruiser-79-series", image: "/images/products/toyota-lc79-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.8, reviewCount: 203, vehicle: "Toyota Landcruiser 79 Series", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "TY7935N" },
  { name: "Full Set Neoprene Seat Covers - Nissan Patrol Y62", slug: "full-set-seat-covers-nissan-patrol-y62", image: "/images/products/nissan-patrol-full.jpg", price: 399.95, originalPrice: 649.95, rating: 4.7, reviewCount: 88, vehicle: "Nissan Patrol", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "NU4025N" },
  { name: "Premium Neoprene Front Seat Covers - Subaru Forester", slug: "front-seat-covers-subaru-forester", image: "/images/products/subaru-forester-front.jpg", price: 169.95, originalPrice: 279.95, rating: 4.5, reviewCount: 76, vehicle: "Subaru Forester", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "FO3025N" },
  { name: "Premium Neoprene Front Seat Covers - Volkswagen Amarok", slug: "front-seat-covers-volkswagen-amarok", image: "/images/products/vw-amarok-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.6, reviewCount: 94, vehicle: "Volkswagen Amarok", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "VW1025N" },
  { name: "Premium Neoprene Front Seat Covers - Hyundai Tucson", slug: "front-seat-covers-hyundai-tucson", image: "/images/products/hyundai-tucson-front.jpg", price: 169.95, originalPrice: 279.95, rating: 4.4, reviewCount: 63, vehicle: "Hyundai Tucson", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "HY2025N" },
  { name: "Full Set Neoprene Seat Covers - LDV T60", slug: "full-set-seat-covers-ldv-t60", image: "/images/products/ldv-t60-full.jpg", price: 369.95, originalPrice: 599.95, rating: 4.5, reviewCount: 51, vehicle: "LDV T60", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "LD4025N" },
  { name: "Premium Neoprene Front Seat Covers - Holden Colorado", slug: "front-seat-covers-holden-colorado", image: "/images/products/holden-colorado-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 108, vehicle: "Holden Colorado", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "HO1025N" },
  { name: "Full Set Neoprene Seat Covers - Mazda BT-50", slug: "full-set-seat-covers-mazda-bt50", image: "/images/products/mazda-bt50-full.jpg", price: 359.95, originalPrice: 589.95, rating: 4.7, reviewCount: 77, vehicle: "Mazda BT-50", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "MZ2025N" },
  { name: "Premium Neoprene Rear Seat Covers - Toyota Prado 150 Series", slug: "rear-seat-covers-toyota-prado-150", image: "/images/products/toyota-prado-rear.jpg", price: 199.95, originalPrice: 329.95, rating: 4.6, reviewCount: 84, vehicle: "Toyota Prado", category: "Rear Set", isSale: true, color: "Black with Red Stitching", sku: "TY8035N" },
  { name: "Full Set Neoprene Seat Covers - Mitsubishi Pajero Sport", slug: "full-set-seat-covers-mitsubishi-pajero-sport", image: "/images/products/mitsubishi-pajero-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.5, reviewCount: 66, vehicle: "Mitsubishi Pajero Sport", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "MN4025N" },
]

const merchandiseData = [
  { name: "Mainwave Premium Cotton T-Shirt", slug: "mainwave-cotton-tshirt", image: "/images/products/merch-tshirt.jpg", price: 49.95, category: "Apparel", color: "Black", sku: "MW-APP-T01", colorHex: "#1a1a1a", description: "Premium heavy-weight cotton t-shirt with embroidered Mainwave logo.", material: "100% Cotton 250gsm" },
  { name: "Mainwave Cap — Structured Fit", slug: "mainwave-structured-cap", image: "/images/products/merch-cap.jpg", price: 34.95, category: "Apparel", color: "Black/Red", sku: "MW-APP-C01", colorHex: "#1a1a1a", description: "Structured 6-panel cap with embroidered Mainwave logo and adjustable strap.", material: "Cotton Twill" },
  { name: "Mainwave Duffel Bag — 60L", slug: "mainwave-duffel-bag-60l", image: "/images/products/merch-duffel.jpg", price: 89.95, originalPrice: 129.95, category: "Accessories", color: "Black", sku: "MW-ACC-D01", colorHex: "#1a1a1a", description: "Heavy-duty 60L duffel bag with waterproof base and Mainwave branding.", material: "600D Polyester" },
  { name: "Mainwave Camping Chair — Heavy Duty", slug: "mainwave-camping-chair", image: "/images/products/merch-chair.jpg", price: 119.95, originalPrice: 169.95, category: "Accessories", color: "Black/Red", sku: "MW-ACC-C01", colorHex: "#1a1a1a", description: "Heavy-duty folding camping chair with cup holder, armrests, and Mainwave embroidery.", material: "Steel Frame + Oxford Fabric" },
  { name: "Mainwave Keyring — Leather", slug: "mainwave-leather-keyring", image: "/images/products/merch-keyring.jpg", price: 19.95, category: "Accessories", color: "Black", sku: "MW-ACC-K01", colorHex: "#1a1a1a", description: "Genuine leather keyring with embossed Mainwave logo.", material: "Genuine Leather" },
  { name: "Mainwave Stubby Cooler", slug: "mainwave-stubby-cooler", image: "/images/products/merch-stubby.jpg", price: 24.95, category: "Accessories", color: "Black/Red", sku: "MW-ACC-S01", colorHex: "#1a1a1a", description: "Neoprene stubby cooler to keep your drink cold. Same material as our seat covers!", material: "4mm Neoprene" },
  { name: "Mainwave Outdoor Blanket — Picnic Size", slug: "mainwave-outdoor-blanket", image: "/images/products/merch-blanket.jpg", price: 69.95, category: "Lifestyle", color: "Black/Red", sku: "MW-LIF-B01", colorHex: "#1a1a1a", description: "Waterproof outdoor blanket with carry handle and Mainwave branding. Perfect for camping, picnics, and the beach.", material: "300D Polyester with waterproof backing" },
  { name: "Mainwave Insulated Lunch Bag", slug: "mainwave-insulated-lunch-bag", image: "/images/products/merch-lunch.jpg", price: 39.95, category: "Lifestyle", color: "Black", sku: "MW-LIF-L01", colorHex: "#1a1a1a", description: "Insulated lunch bag with Mainwave logo. Keeps food cold for up to 6 hours.", material: "Insulated Polyester" },
]

const blogPostsData = [
  { title: "6 Car Care Tips to Keep Your Vehicle Looking New", slug: "blog/6-car-care-tips", excerpt: "Keep your car looking showroom fresh with these 6 essential car care tips.", image: "/images/blog/car-care-tips.jpg", date: new Date("2026-03-15"), category: "Car Care", content: "Full article content here..." },
  { title: "What Is Neoprene? Benefits & Features for Seat Covers", slug: "blog/what-is-neoprene-seat-cover-material", excerpt: "Discover why neoprene is the ultimate material for car seat covers.", image: "/images/blog/neoprene-material.jpg", date: new Date("2026-02-28"), category: "Materials", content: "Full article content here..." },
  { title: "What to Look for When Buying Car Seat Covers", slug: "blog/what-to-look-for-when-buying-car-seat-covers", excerpt: "A comprehensive guide to choosing the right seat covers.", image: "/images/blog/buying-guide.jpg", date: new Date("2026-02-10"), category: "Buying Guide", content: "Full article content here..." },
  { title: "Removing Ink Stains from Car Seats", slug: "blog/removing-ink-stains-from-car-seats", excerpt: "Learn how to remove stubborn ink stains from your car seats.", image: "/images/blog/ink-stains.jpg", date: new Date("2026-01-25"), category: "Car Care", content: "Full article content here..." },
  { title: "Best Seat Covers for Families and School Runs Australia", slug: "best-seat-covers-for-families-and-school-runs-australia", excerpt: "Discover the most durable and easy-to-clean seat covers for families.", image: "/images/blog/family-seat-covers.jpg", date: new Date("2026-01-05"), category: "Guides", content: "Full article content here..." },
  { title: "Best Seat Covers for Toyota Hilux Work Utes", slug: "best-seat-covers-for-toyota-hilux-work-utes", excerpt: "Tough seat covers built for the toughest conditions.", image: "/images/blog/hilux-work-ute.jpg", date: new Date("2025-12-20"), category: "Guides", content: "Full article content here..." },
  { title: "Who Makes the Best Heavy-Duty Seat Covers in Australia?", slug: "who-makes-the-best-heavy-duty-seat-cover", excerpt: "A comparative look at Australia's heavy-duty seat cover manufacturers.", image: "/images/blog/heavy-duty-comparison.jpg", date: new Date("2025-12-05"), category: "Guides", content: "Full article content here..." },
  { title: "Top Reasons to Buy Rip-Proof Neoprene Seat Covers", slug: "top-reasons-to-buy-rip-proof-neoprene-seat-covers", excerpt: "Why rip-proof neoprene is the smart choice for your vehicle.", image: "/images/blog/rip-proof-neoprene.jpg", date: new Date("2025-11-18"), category: "Materials", content: "Full article content here..." },
  { title: "Best Seat Covers for Mining Vehicles Australia", slug: "best-seat-covers-for-mining-vehicles", excerpt: "Heavy-duty seat covers built for Australia's mining industry.", image: "/images/blog/mining-seat-covers.jpg", date: new Date("2025-11-02"), category: "Industry", content: "Full article content here..." },
  { title: "Most Durable Seat Covers for Rental Fleets Australia", slug: "most-durable-seat-covers-for-rental-fleets", excerpt: "Find the most durable seat covers for your rental fleet.", image: "/images/blog/rental-fleet-covers.jpg", date: new Date("2025-10-15"), category: "Industry", content: "Full article content here..." },
  { title: "Seat Covers That Handle Red Dirt and Mud", slug: "seat-covers-that-can-handle-red-dirt", excerpt: "Seat covers built to withstand the toughest Australian conditions.", image: "/images/blog/red-dirt-covers.jpg", date: new Date("2025-09-28"), category: "Guides", content: "Full article content here..." },
]

async function main() {
  console.log("Clearing existing data...")
  await prisma.productEmbedding.deleteMany()
  await prisma.fitment.deleteMany()
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.customer.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.vehicleModel.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.inquiry.deleteMany()
  await prisma.blogPost.deleteMany()
  console.log("Cleared. Seeding database...")

  for (const v of vehiclesData) {
    const vehicle = await prisma.vehicle.create({
      data: {
        make: v.make,
        slug: v.slug,
        image: v.image,
        models: {
          create: v.models.map((name) => ({
            name,
            slug: name.toLowerCase().replace(/\s+/g, "-"),
          })),
        },
      },
    })
    console.log(`  Vehicle: ${vehicle.make}`)
  }

  for (const p of productsData) {
    const vehicleMake = p.vehicle.split(" ")[0]
    const vehicle = await prisma.vehicle.findUnique({ where: { slug: vehicleMake.toLowerCase() } })

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        image: p.image,
        images: [p.image],
        category: p.category,
        vehicleLabel: p.vehicle,
        isSale: p.isSale,
        material: "Premium 4mm Neoprene",
        features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"],
        vehicleId: vehicle?.id ?? null,
        variants: {
          create: {
            color: p.color,
            colorHex: "#1a1a1a",
            sku: p.sku,
            price: p.price,
            originalPrice: p.originalPrice,
            stock: 50,
          },
        },
      },
    })
    console.log(`  Product: ${product.name}`)
  }

  for (const m of merchandiseData) {
    await prisma.product.create({
      data: {
        name: m.name,
        slug: m.slug,
        image: m.image,
        images: [m.image],
        description: m.description,
        material: m.material,
        features: ["Official Mainwave merchandise", "Premium quality"],
        category: m.category,
        isSale: !!m.originalPrice,
        variants: {
          create: {
            color: m.color,
            colorHex: m.colorHex,
            sku: m.sku,
            price: m.price,
            originalPrice: m.originalPrice ?? null,
            stock: 100,
          },
        },
      },
    })
    console.log(`  Merch: ${m.name}`)
  }

  for (const b of blogPostsData) {
    await prisma.blogPost.create({ data: b })
    console.log(`  Blog: ${b.title}`)
  }

  const allProducts = await prisma.product.findMany({ include: { variants: true } })
  const allVehicles = await prisma.vehicle.findMany()

  for (const product of allProducts) {
    const vehicleName = productsData.find((p) => p.slug === product.slug)?.vehicle ?? ""
    const vehicle = allVehicles.find((v) => vehicleName.toLowerCase().startsWith(v.make.toLowerCase()))
    if (vehicle) {
      await prisma.fitment.create({
        data: {
          productId: product.id,
          vehicleId: vehicle.id,
        },
      })
    }
  }

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
