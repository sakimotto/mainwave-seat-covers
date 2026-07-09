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
  { name: "Premium Neoprene Front Seat Covers - Toyota Hilux 8th Gen", slug: "front-seat-covers-suit-toyota-hilux-8th-gen", image: "/images/products/toyota-hilux-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 247, vehicle: "Toyota Hilux", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "TY7035N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Ford Ranger PX", slug: "front-seat-covers-suit-ford-ranger-px", image: "/images/products/ford-ranger-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 189, vehicle: "Ford Ranger", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "FD1045N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Isuzu D-Max", slug: "front-seat-covers-suit-isuzu-dmax", image: "/images/products/isuzu-dmax-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 156, vehicle: "Isuzu D-Max", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "IZ3025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Full Set Neoprene Seat Covers - Toyota Landcruiser 200 Series", slug: "full-set-of-seat-covers-suit-toyota-landcruiser-200", image: "/images/products/toyota-lc200-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.9, reviewCount: 312, vehicle: "Toyota Landcruiser 200", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "TY7035N-FS", material: "Premium 4mm Neoprene", features: ["Full front & rear coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Mitsubishi Triton", slug: "front-seat-covers-suit-mitsubishi-triton", image: "/images/products/mitsubishi-triton-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 134, vehicle: "Mitsubishi Triton", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "MN3025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Rear Seat Covers - Toyota Landcruiser 300 Series", slug: "rear-seat-covers-suit-toyota-landcruiser-300", image: "/images/products/toyota-lc300-rear.jpg", price: 199.95, originalPrice: 329.95, rating: 4.7, reviewCount: 98, vehicle: "Toyota Landcruiser 300", category: "Rear Set", isSale: true, color: "Black with Red Stitching", sku: "TY7035N-RRS", material: "Premium 4mm Neoprene", features: ["Rear seat coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Full Set Neoprene Seat Covers - Ford Ranger Raptor", slug: "full-set-of-seat-covers-suit-ford-ranger-raptor", image: "/images/products/ford-ranger-raptor-full.jpg", price: 379.95, originalPrice: 629.95, rating: 4.8, reviewCount: 203, vehicle: "Ford Ranger Raptor", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "FD1045N-FLS", material: "Premium 4mm Neoprene", features: ["Full front & rear coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - BYD Shark 6", slug: "front-set-of-seat-covers-byd-shark-6", image: "/images/products/byd-shark6-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.5, reviewCount: 42, vehicle: "BYD Shark 6", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "BYD17000N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Nissan Navara", slug: "front-seat-covers-suit-nissan-navara", image: "/images/products/nissan-navara-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 167, vehicle: "Nissan Navara", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "NU3025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Mazda BT-50", slug: "front-seat-covers-suit-mazda-bt50", image: "/images/products/mazda-bt50-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 112, vehicle: "Mazda BT-50", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "MZ1025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Toyota Landcruiser 79 Series", slug: "front-seat-covers-for-toyota-landcruiser-79-series", image: "/images/products/toyota-lc79-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.8, reviewCount: 203, vehicle: "Toyota Landcruiser 79 Series", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "TY7935N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Full Set Neoprene Seat Covers - Nissan Patrol Y62", slug: "full-set-seat-covers-nissan-patrol-y62", image: "/images/products/nissan-patrol-full.jpg", price: 399.95, originalPrice: 649.95, rating: 4.7, reviewCount: 88, vehicle: "Nissan Patrol", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "NU4025N", material: "Premium 4mm Neoprene", features: ["Full front & rear coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Subaru Forester", slug: "front-seat-covers-subaru-forester", image: "/images/products/subaru-forester-front.jpg", price: 169.95, originalPrice: 279.95, rating: 4.5, reviewCount: 76, vehicle: "Subaru Forester", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "FO3025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Volkswagen Amarok", slug: "front-seat-covers-volkswagen-amarok", image: "/images/products/vw-amarok-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.6, reviewCount: 94, vehicle: "Volkswagen Amarok", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "VW1025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Hyundai Tucson", slug: "front-seat-covers-hyundai-tucson", image: "/images/products/hyundai-tucson-front.jpg", price: 169.95, originalPrice: 279.95, rating: 4.4, reviewCount: 63, vehicle: "Hyundai Tucson", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "HY2025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Full Set Neoprene Seat Covers - LDV T60", slug: "full-set-seat-covers-ldv-t60", image: "/images/products/ldv-t60-full.jpg", price: 369.95, originalPrice: 599.95, rating: 4.5, reviewCount: 51, vehicle: "LDV T60", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "LD4025N", material: "Premium 4mm Neoprene", features: ["Full front & rear coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Front Seat Covers - Holden Colorado", slug: "front-seat-covers-holden-colorado", image: "/images/products/holden-colorado-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 108, vehicle: "Holden Colorado", category: "Front Set", isSale: true, color: "Black with Red Stitching", sku: "HO1025N", material: "Premium 4mm Neoprene", features: ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Full Set Neoprene Seat Covers - Mazda BT-50", slug: "full-set-seat-covers-mazda-bt50", image: "/images/products/mazda-bt50-full.jpg", price: 359.95, originalPrice: 589.95, rating: 4.7, reviewCount: 77, vehicle: "Mazda BT-50", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "MZ2025N", material: "Premium 4mm Neoprene", features: ["Full front & rear coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Premium Neoprene Rear Seat Covers - Toyota Prado 150 Series", slug: "rear-seat-covers-toyota-prado-150", image: "/images/products/toyota-prado-rear.jpg", price: 199.95, originalPrice: 329.95, rating: 4.6, reviewCount: 84, vehicle: "Toyota Prado", category: "Rear Set", isSale: true, color: "Black with Red Stitching", sku: "TY8035N", material: "Premium 4mm Neoprene", features: ["Rear seat coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
  { name: "Full Set Neoprene Seat Covers - Mitsubishi Pajero Sport", slug: "full-set-seat-covers-mitsubishi-pajero-sport", image: "/images/products/mitsubishi-pajero-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.5, reviewCount: 66, vehicle: "Mitsubishi Pajero Sport", category: "Full Set", isSale: true, color: "Black with Red Stitching", sku: "MN4025N", material: "Premium 4mm Neoprene", features: ["Full front & rear coverage", "Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"] },
]

interface MerchVariantInput {
  color: string
  colorHex: string
  size?: string
  sku: string
  price: number
  originalPrice?: number
  stock: number
}

interface MerchInput {
  name: string
  slug: string
  image: string
  description: string
  material: string
  features: string[]
  category: string
  variants: MerchVariantInput[]
}

const sizes = ["S", "M", "L", "XL", "XXL"] as const

function generateApparelVariants(
  baseSku: string,
  price: number,
  originalPrice: number | undefined,
  colors: { name: string; hex: string }[]
): MerchVariantInput[] {
  const result: MerchVariantInput[] = []
  for (const c of colors) {
    for (let i = 0; i < sizes.length; i++) {
      result.push({
        color: c.name,
        colorHex: c.hex,
        size: sizes[i],
        sku: `${baseSku}-${c.name.replace(/\s+/g, "").toUpperCase()}-${sizes[i]}`,
        price,
        originalPrice: originalPrice ?? undefined,
        stock: 50,
      })
    }
  }
  return result
}

const merchandiseData: MerchInput[] = [
  {
    name: "Mainwave Premium Cotton T-Shirt",
    slug: "mainwave-cotton-tshirt",
    image: "/images/products/merch-tshirt.jpg",
    category: "Apparel",
    description: "Made from 100% premium ringspun cotton with a 250gsm heavyweight feel, this t-shirt delivers lasting comfort and durability. Features a reinforced neckband, double-needle stitch detailing, and a screen-printed Mainwave logo on the chest. The modern regular fit sits well tucked or untucked, making it just as suitable for the workshop as it is for the weekend. Pre-shrunk fabric ensures the fit stays true wash after wash. Available in five sizes across four colours so you can rep your brand your way.",
    material: "100% Ringspun Cotton 250gsm",
    features: ["Heavyweight 250gsm fabric", "Reinforced neckband", "Double-needle stitching", "Pre-shrunk", "Machine washable", "Screen-printed Mainwave logo"],
    variants: generateApparelVariants("MW-APP-T01", 49.95, undefined, [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Navy", hex: "#1a2744" },
      { name: "Charcoal", hex: "#4a4a4a" },
    ]),
  },
  {
    name: "Mainwave Performance Polo Shirt",
    slug: "mainwave-polo-shirt",
    image: "/images/products/merch-polo.jpg",
    category: "Apparel",
    description: "A premium polo engineered for the Australian tradie and outdoors enthusiast. Cut from a breathable cotton-piqué blend with a touch of elastane for stretch, this polo moves with you whether you're behind the wheel, on the job site, or out on the weekend. Features include a classic three-button placket, reinforced side vents, and an embroidered Mainwave logo on the left chest in contrasting red thread. The tailored fit avoids looking baggy while still allowing full range of motion. Designed to hold its shape and colour through repeated washing.",
    material: "65% Cotton / 35% Polyester Piqué with Elastane",
    features: ["Breathable piqué weave", "Four-way stretch", "Embroidered Mainwave logo", "Reinforced side vents", "Classic three-button placket", "Tailored fit"],
    variants: generateApparelVariants("MW-APP-P01", 69.95, undefined, [
      { name: "Black", hex: "#1a1a1a" },
      { name: "Navy", hex: "#1a2744" },
      { name: "White", hex: "#ffffff" },
    ]),
  },
  {
    name: "Mainwave Structured Fit Cap",
    slug: "mainwave-structured-cap",
    image: "/images/products/merch-cap.jpg",
    category: "Apparel",
    description: "A structured six-panel cap built for the elements. The high-profile front panels hold their shape thanks to a stiff inner lining, while the pre-curved visor keeps the sun off without needing to be broken in. An embroidered Mainwave logo sits dead centre in contrasting red thread. The rear features a premium snap-back closure — one size fits most adults. An internal sweatband wicks moisture on hot days, and the eyelets provide ventilation when things heat up.",
    material: "Cotton Twill",
    features: ["Structured six-panel design", "Pre-curved visor", "Snap-back closure", "Embroidered Mainwave logo", "Internal moisture-wicking sweatband", "One size fits most"],
    variants: [
      { color: "Black with Red Logo", colorHex: "#1a1a1a", size: "OSFM", sku: "MW-APP-C01", price: 34.95, stock: 80 },
      { color: "Navy with Red Logo", colorHex: "#1a2744", size: "OSFM", sku: "MW-APP-C02", price: 34.95, stock: 60 },
    ],
  },
  {
    name: "Mainwave Heavy-Duty Duffel Bag — 60L",
    slug: "mainwave-duffel-bag-60l",
    image: "/images/products/merch-duffel.jpg",
    category: "Car Accessories",
    description: "Built to handle the abusive life of a tradie's ute or the family boot on a road trip. Constructed from 600D rip-stop polyester with a waterproof TPU-coated base, this 60-litre duffel shrugs off mud, rain, and red dust. The main compartment opens fully with a heavy-duty YKK zipper for easy packing, while the end pocket swallows boots or dirty gear separately. Padded carry handles and a detachable, adjustable shoulder strap let you carry it comfortably when it's loaded to the brim. Reflective Mainwave branding keeps you visible on early starts and late finishes.",
    material: "600D Rip-Stop Polyester with TPU-Coated Base",
    features: ["60-litre capacity", "Waterproof TPU-coated base", "Heavy-duty YKK zippers", "Separate end pocket for boots/dirty gear", "Padded carry handles", "Detachable adjustable shoulder strap", "Reflective Mainwave branding"],
    variants: [
      { color: "Black", colorHex: "#1a1a1a", size: undefined, sku: "MW-ACC-D01", price: 89.95, originalPrice: 129.95, stock: 40 },
      { color: "Olive", colorHex: "#4a5d23", size: undefined, sku: "MW-ACC-D02", price: 89.95, originalPrice: 129.95, stock: 25 },
    ],
  },
  {
    name: "Mainwave Seat Back Organiser",
    slug: "mainwave-seat-back-organiser",
    image: "/images/products/merch-seatback.jpg",
    category: "Car Accessories",
    description: "Keep the cabin clutter-free with this heavy-duty seat back organiser. Hangs securely over any standard vehicle headrest and features a clear touchscreen phone pocket, two large main compartments, a zip pouch for valuables, and dual mesh drink holders. The 600D polyester construction handles the weight of tablets, snacks, toys, and tools without sagging. An integrated tablet pocket holds most 10-inch devices, making it a lifesaver on long family trips. Installs in seconds with adjustable straps and quick-release buckles — no tools required.",
    material: "600D Polyester with Mesh Accents",
    features: ["Universal fit — hangs over any headrest", "Clear touchscreen phone pocket", "Tablet pocket fits up to 10\"", "Two main compartments", "Zip-secure valuables pouch", "Dual mesh drink holders", "Quick-release buckles", "Easy installation — no tools"],
    variants: [
      { color: "Black", colorHex: "#1a1a1a", size: undefined, sku: "MW-ACC-SB01", price: 49.95, stock: 60 },
      { color: "Charcoal", colorHex: "#444444", size: undefined, sku: "MW-ACC-SB02", price: 49.95, stock: 35 },
    ],
  },
  {
    name: "Mainwave Boot Organiser — Collapsible",
    slug: "mainwave-boot-organiser",
    image: "/images/products/merch-boot.jpg",
    category: "Car Accessories",
    description: "Tame the chaos in your boot with this collapsible cargo organiser. Rigid sides hold their shape when loaded but fold flat in seconds when not in use. Two padded dividers let you section off space for groceries, tools, sports gear, or camping equipment. A reinforced base with anti-slip pads prevents sliding during cornering. Dual carry handles make it easy to lift out and carry to the door. The 600D polyester exterior wipes clean after muddy trips, and the internal lining is waterproof to contain any leaks or spills from wet gear or melted ice.",
    material: "600D Polyester with Waterproof Internal Lining",
    features: ["Collapsible — folds flat when not in use", "Two adjustable padded dividers", "Reinforced anti-slip base", "Dual carry handles", "Waterproof internal lining", "Wipe-clean exterior", "Approx. 50L capacity"],
    variants: [
      { color: "Black", colorHex: "#1a1a1a", size: undefined, sku: "MW-ACC-BO01", price: 79.95, stock: 40 },
    ],
  },
  {
    name: "Mainwave Custom Fit Car Mats — Front Set",
    slug: "mainwave-car-mats-front",
    image: "/images/products/merch-mats.jpg",
    category: "Car Accessories",
    description: "Precision-cut car mats designed to match the exact floorpan contours of your vehicle. Laser-measured and CNC-cut from heavy-duty 900g/sqm carpet with a waterproof rubber heel pad in the driver's footwell. The non-slip rubberised backing keeps them firmly in place — no curling, no sliding, no interference with pedals. Each set includes driver and passenger mats with factory-style clip holes for vehicles that have locating posts. Available in black or charcoal to suit most interiors. Built to withstand mud, sand, coffee spills, and daily abuse. Sold as a front pair.",
    material: "900gsm Heavy-Duty Carpet with Rubberised Backing",
    features: ["Laser-measured vehicle-specific fit", "900gsm dense carpet pile", "Waterproof rubber heel pad (driver side)", "Non-slip rubberised backing", "Factory-style clip hole compatibility", "Sold as front pair (driver + passenger)", "Easy to clean — hose off or vacuum"],
    variants: [
      { color: "Black", colorHex: "#1a1a1a", size: undefined, sku: "MW-ACC-CM01", price: 149.95, originalPrice: 199.95, stock: 30 },
      { color: "Charcoal", colorHex: "#444444", size: undefined, sku: "MW-ACC-CM02", price: 149.95, originalPrice: 199.95, stock: 25 },
    ],
  },
  {
    name: "Mainwave Scuff Plate Protectors — 4-Piece Set",
    slug: "mainwave-scuff-plate-protectors",
    image: "/images/products/merch-scuff.jpg",
    category: "Car Accessories",
    description: "Stop door scuffs, boot scrapes, and loading damage before they ruin your paint. This 4-piece kit covers the top edge of your tailgate bumper (the most scuffed surface on any ute or SUV) and three common door-sill entry points. Each protector is precision-cut from 3M-brand carbon-fibre-look vinyl with an aggressive adhesive backing that bonds permanently to clean painted surfaces. UV-stable and weatherproof, they won't yellow, peel, or lift even after years in the Australian sun. Invisible once fitted — they blend into the door recess so only you know they're there. Your paint stays perfect underneath.",
    material: "3M Carbon-Fibre-Look Vinyl with Acrylic Adhesive",
    features: ["4-piece set (tailgate + 3 door sills)", "3M carbon-fibre-look vinyl", "UV-stable — won't yellow or fade", "Weatherproof", "Permanent adhesive — bonds to clean paint", "Nearly invisible when fitted", "Protects against scratches, scuffs, and loading damage"],
    variants: [
      { color: "Black Carbon Fibre", colorHex: "#2a2a2a", size: undefined, sku: "MW-ACC-SP01", price: 59.95, stock: 50 },
    ],
  },
  {
    name: "Mainwave Outdoor Blanket — Picnic Size",
    slug: "mainwave-outdoor-blanket",
    image: "/images/products/merch-blanket.jpg",
    category: "Lifestyle",
    description: "A rugged outdoor blanket designed for the Australian lifestyle. The top layer is soft-touch polyester fleece, while the bottom layer is waterproof 300D polyester that keeps moisture and dirt away from your picnic, camping chair setup, or beach towel. Generous 150 x 180 cm size seats four adults comfortably. Features webbed carry straps and a roll-top closure — fold, roll, clip, and go. The integrated carry handle doubles as a hanging loop for drying. Mainwave branding is subtly woven into the corner. Machine washable on a gentle cycle.",
    material: "300D Polyester (Waterproof Backing) / Polyester Fleece Top",
    features: ["150 x 180 cm — seats 4 adults", "Waterproof bottom layer", "Soft fleece top layer", "Roll-top closure with carry straps", "Integrated carry handle / hanging loop", "Machine washable", "Woven Mainwave branding"],
    variants: [
      { color: "Black / Red", colorHex: "#1a1a1a", size: undefined, sku: "MW-LIF-B01", price: 69.95, stock: 35 },
    ],
  },
  {
    name: "Mainwave Insulated Lunch Bag",
    slug: "mainwave-insulated-lunch-bag",
    image: "/images/products/merch-lunch.jpg",
    category: "Lifestyle",
    description: "A tough, insulated lunch bag that keeps your food cold for up to six hours — or hot for up to three. The 8mm closed-cell foam insulation is sandwiched between a durable 600D polyester exterior and a food-grade PEVA lining that wipes clean in seconds. The main compartment swallows a full-sized meal container, drink bottle, and snacks, while the front zip pocket holds cutlery, napkins, or a phone. A reinforced webbing carry handle and detachable shoulder strap make it easy to carry from the ute to the job site. Mainwave reflective logo for low-light visibility.",
    material: "600D Polyester with 8mm Closed-Cell Foam Insulation",
    features: ["Keeps food cold up to 6 hours / hot up to 3 hours", "8mm closed-cell foam insulation", "Food-grade PEVA lining — wipe clean", "Main compartment + front zip pocket", "Detachable shoulder strap", "Reflective Mainwave logo"],
    variants: [
      { color: "Black", colorHex: "#1a1a1a", size: undefined, sku: "MW-LIF-L01", price: 39.95, stock: 50 },
    ],
  },
  {
    name: "Mainwave Genuine Leather Keyring",
    slug: "mainwave-leather-keyring",
    image: "/images/products/merch-keyring.jpg",
    category: "Lifestyle",
    description: "A simple, well-made keyring that ages beautifully. Cut from full-grain Australian leather in a traditional saddle-brown finish, it develops a unique patina over time. The Mainwave logo is hot-foil embossed — not printed — so it will never peel or fade. Double-stitched with bonded nylon thread for strength, and fitted with a solid brass swivel clip that won't rust or seize. Supplied in a natural cotton gift pouch, making it an easy gift for customers, team members, or the driver who has everything.",
    material: "Full-Grain Australian Leather / Solid Brass Hardware",
    features: ["Full-grain Australian leather", "Hot-foil embossed Mainwave logo", "Double-stitched bonded nylon thread", "Solid brass swivel clip — rust-proof", "Develops natural patina over time", "Supplied in cotton gift pouch"],
    variants: [
      { color: "Saddle Brown", colorHex: "#8b6914", size: undefined, sku: "MW-LIF-K01", price: 19.95, stock: 100 },
    ],
  },
  {
    name: "Mainwave Neoprene Stubby Cooler",
    slug: "mainwave-stubby-cooler",
    image: "/images/products/merch-stubby.jpg",
    category: "Lifestyle",
    description: "Made from the same 4mm neoprene we use in our seat covers — because if it's tough enough for your ute, it's tough enough for your drink. This stubby cooler fits standard 375 mL cans and 330 mL bottles snugly, with a 3 mm closed-cell neoprene body that keeps your drink cold and your hands dry. The fully wrapped construction has a welded side seam (no glue to fail) and a reinforced base. Features a contrast red Mainwave logo printed on the front. Dishwasher safe, stretchy, and virtually indestructible.",
    material: "4mm Closed-Cell Neoprene",
    features: ["Same neoprene as our seat covers", "Fits 375 mL cans and 330 mL bottles", "Welded side seam — no glue failure", "Reinforced base", "Keeps drink cold, hands dry", "Dishwasher safe", "Mainwave logo"],
    variants: [
      { color: "Black / Red", colorHex: "#1a1a1a", size: undefined, sku: "MW-LIF-S01", price: 24.95, stock: 80 },
    ],
  },
  {
    name: "Mainwave Heavy-Duty Folding Camp Chair",
    slug: "mainwave-camping-chair",
    image: "/images/products/merch-chair.jpg",
    category: "Lifestyle",
    description: "Built for the kind of camping that involves corrugations, red dust, and a cold beer at the end of the day. This heavy-duty folding chair features a powder-coated steel frame rated to 150 kg, with reinforced armrests and double-stitched Oxford fabric that won't sag after a season of use. A deep cup holder moulded into the right armrest keeps your drink stable on uneven ground. The high back provides head and neck support when you're leaning back around the fire. Folds flat with a carry bag for easy storage behind the seat or in the boot. Embroidered Mainwave logo on the headrest.",
    material: "Powder-Coated Steel Frame / 600D Oxford Fabric",
    features: ["150 kg weight rating", "Powder-coated steel frame", "Reinforced armrests with cup holder", "High back with head support", "Double-stitched Oxford fabric", "Folds flat with carry bag", "Embroidered Mainwave logo"],
    variants: [
      { color: "Black / Red", colorHex: "#1a1a1a", size: undefined, sku: "MW-LIF-C01", price: 119.95, originalPrice: 169.95, stock: 25 },
    ],
  },
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
        description: `Premium neoprene seat covers custom patterned to fit your ${p.vehicle}. Manufactured in Melbourne from 4mm closed-cell neoprene — the same material used in high-end wetsuits. Each set is precision-cut using vehicle-specific templates to ensure a factory-like fit that won't sag or shift. The waterproof backing protects your original upholstery from spills, mud, and daily wear, while the UV-stable outer layer resists fading even after prolonged sun exposure. Installation takes under 15 minutes with no tools required — simply slip over the seats and secure with the integrated fastening system. Backed by a 3-year manufacturer's warranty.`,
        material: p.material ?? "Premium 4mm Neoprene",
        features: p.features ?? ["Waterproof backing", "UV-resistant", "Custom fit", "Machine washable", "3-year warranty"],
        category: p.category,
        vehicleLabel: p.vehicle,
        isSale: p.isSale,
        vehicleId: vehicle?.id ?? null,
        variants: {
          create: {
            color: p.color,
            colorHex: "#1a1a1a",
            sku: p.sku,
            price: p.price,
            originalPrice: p.originalPrice ?? null,
            stock: 50,
          },
        },
      },
    })
    console.log(`  Product: ${product.name}`)
  }

  for (const m of merchandiseData) {
    const product = await prisma.product.create({
      data: {
        name: m.name,
        slug: m.slug,
        image: m.image,
        images: [m.image],
        description: m.description,
        material: m.material,
        features: m.features,
        category: m.category,
        isSale: m.variants.some((v) => v.originalPrice != null),
        variants: {
          create: m.variants.map((v) => ({
            color: v.color,
            colorHex: v.colorHex,
            size: v.size ?? null,
            sku: v.sku,
            price: v.price,
            originalPrice: v.originalPrice ?? null,
            stock: v.stock,
          })),
        },
      },
    })
    console.log(`  Merch: ${product.name} (${m.variants.length} variants)`)
  }

  for (const b of blogPostsData) {
    await prisma.blogPost.create({ data: b })
    console.log(`  Blog: ${b.title}`)
  }

  const allProducts = await prisma.product.findMany({ include: { variants: true } })
  const allVehicles = await prisma.vehicle.findMany()

  for (const product of allProducts) {
    const seatCover = productsData.find((p) => p.slug === product.slug)
    if (!seatCover) continue
    const vehicleName = seatCover.vehicle
    const vehicle = allVehicles.find((v) => vehicleName.toLowerCase().startsWith(v.make.toLowerCase()))
    if (vehicle) {
      await prisma.fitment.create({
        data: { productId: product.id, vehicleId: vehicle.id },
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
