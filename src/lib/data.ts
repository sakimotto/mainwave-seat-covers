import type { Vehicle, Product, BlogPost } from "@/types";

export const vehicles: Vehicle[] = [
  { id: "toyota", make: "Toyota", slug: "toyota", image: "/images/vehicles/toyota.svg", models: ["Hilux", "Landcruiser 200", "Landcruiser 300", "Landcruiser 79 Series", "Prado", "RAV4", "Corolla", "Camry", "Fortuner", "Kluger"] },
  { id: "ford", make: "Ford", slug: "ford", image: "/images/vehicles/ford.svg", models: ["Ranger PX", "Ranger Next Gen", "Ranger Raptor", "Everest", "Ranger XL/XLS/XLT"] },
  { id: "nissan", make: "Nissan", slug: "nissan", image: "/images/vehicles/nissan.svg", models: ["Navara", "Patrol", "X-Trail", "Qashqai"] },
  { id: "mazda", make: "Mazda", slug: "mazda", image: "/images/vehicles/mazda.svg", models: ["BT-50", "CX-3", "CX-5", "CX-9", "Mazda 3"] },
  { id: "mitsubishi", make: "Mitsubishi", slug: "mitsubishi", image: "/images/vehicles/mitsubishi.svg", models: ["Triton", "Outlander", "Pajero Sport", "ASX"] },
  { id: "isuzu", make: "Isuzu", slug: "isuzu", image: "/images/vehicles/isuzu.svg", models: ["D-Max", "MU-X"] },
  { id: "gwm", make: "Great Wall", slug: "gwm", image: "/images/vehicles/gwm.svg", models: ["Cannon", "Steed", "Ute"] },
  { id: "holden", make: "Holden", slug: "holden", image: "/images/vehicles/holden.svg", models: ["Colorado", "Commodore"] },
  { id: "subaru", make: "Subaru", slug: "subaru", image: "/images/vehicles/subaru.svg", models: ["Forester", "Outback", "XV"] },
  { id: "hyundai", make: "Hyundai", slug: "hyundai", image: "/images/vehicles/hyundai.svg", models: ["Tucson", "Kona", "Santa Fe", "i30"] },
  { id: "ldv", make: "LDV", slug: "ldv", image: "/images/vehicles/ldv.svg", models: ["T60", "V80", "Deliver 9"] },
  { id: "volkswagen", make: "Volkswagen", slug: "volkswagen", image: "/images/vehicles/volkswagen.svg", models: ["Amarok", "Tiguan", "Golf"] },
  { id: "byd", make: "BYD", slug: "byd", image: "/images/vehicles/byd.svg", models: ["Shark 6", "Atto 3", "Seal"] },
];

export const topSellingProducts: Product[] = [
  { id: "TY7035N", name: "Premium Neoprene Front Seat Covers - Toyota Hilux 8th Gen", slug: "front-seat-covers-suit-toyota-hilux-8th-gen", image: "/images/products/toyota-hilux-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 247, vehicle: "Toyota Hilux", category: "Front Set", isSale: true },
  { id: "FD1045N", name: "Premium Neoprene Front Seat Covers - Ford Ranger PX", slug: "front-seat-covers-suit-ford-ranger-px", image: "/images/products/ford-ranger-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 189, vehicle: "Ford Ranger", category: "Front Set", isSale: true },
  { id: "IZ3025N", name: "Premium Neoprene Front Seat Covers - Isuzu D-Max", slug: "front-seat-covers-suit-isuzu-dmax", image: "/images/products/isuzu-dmax-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.8, reviewCount: 156, vehicle: "Isuzu D-Max", category: "Front Set", isSale: true },
  { id: "TY7035N-FS", name: "Full Set Neoprene Seat Covers - Toyota Landcruiser 200 Series", slug: "full-set-of-seat-covers-suit-toyota-landcruiser-200", image: "/images/products/toyota-lc200-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.9, reviewCount: 312, vehicle: "Toyota Landcruiser 200", category: "Full Set", isSale: true },
  { id: "MN3025N", name: "Premium Neoprene Front Seat Covers - Mitsubishi Triton", slug: "front-seat-covers-suit-mitsubishi-triton", image: "/images/products/mitsubishi-triton-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 134, vehicle: "Mitsubishi Triton", category: "Front Set", isSale: true },
  { id: "TY7035N-RRS", name: "Rear Seat Covers - Toyota Landcruiser 300 Series", slug: "rear-seat-covers-suit-toyota-landcruiser-300", image: "/images/products/toyota-lc300-rear.jpg", price: 199.95, originalPrice: 329.95, rating: 4.7, reviewCount: 98, vehicle: "Toyota Landcruiser 300", category: "Rear Set", isSale: true },
  { id: "FD1045N-FLS", name: "Full Set Neoprene Seat Covers - Ford Ranger Raptor", slug: "full-set-of-seat-covers-suit-ford-ranger-raptor", image: "/images/products/ford-ranger-raptor-full.jpg", price: 379.95, originalPrice: 629.95, rating: 4.8, reviewCount: 203, vehicle: "Ford Ranger Raptor", category: "Full Set", isSale: true },
  { id: "BYD17000N", name: "Premium Neoprene Front Seat Covers - BYD Shark 6", slug: "front-set-of-seat-covers-byd-shark-6", image: "/images/products/byd-shark6-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.5, reviewCount: 42, vehicle: "BYD Shark 6", category: "Front Set", isSale: true },
  { id: "NU3025N", name: "Premium Neoprene Front Seat Covers - Nissan Navara", slug: "front-seat-covers-suit-nissan-navara", image: "/images/products/nissan-navara-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.7, reviewCount: 167, vehicle: "Nissan Navara", category: "Front Set", isSale: true },
  { id: "MZ1025N", name: "Premium Neoprene Front Seat Covers - Mazda BT-50", slug: "front-seat-covers-suit-mazda-bt50", image: "/images/products/mazda-bt50-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 112, vehicle: "Mazda BT-50", category: "Front Set", isSale: true },
];

export const extraProducts: Product[] = [
  { id: "TY7935N", name: "Premium Neoprene Front Seat Covers - Toyota Landcruiser 79 Series", slug: "front-seat-covers-for-toyota-landcruiser-79-series", image: "/images/products/toyota-lc79-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.8, reviewCount: 203, vehicle: "Toyota Landcruiser 79 Series", category: "Front Set", isSale: true },
  { id: "NU4025N", name: "Full Set Neoprene Seat Covers - Nissan Patrol Y62", slug: "full-set-seat-covers-nissan-patrol-y62", image: "/images/products/nissan-patrol-full.jpg", price: 399.95, originalPrice: 649.95, rating: 4.7, reviewCount: 88, vehicle: "Nissan Patrol", category: "Full Set", isSale: true },
  { id: "FO3025N", name: "Premium Neoprene Front Seat Covers - Subaru Forester", slug: "front-seat-covers-subaru-forester", image: "/images/products/subaru-forester-front.jpg", price: 169.95, originalPrice: 279.95, rating: 4.5, reviewCount: 76, vehicle: "Subaru Forester", category: "Front Set", isSale: true },
  { id: "VW1025N", name: "Premium Neoprene Front Seat Covers - Volkswagen Amarok", slug: "front-seat-covers-volkswagen-amarok", image: "/images/products/vw-amarok-front.jpg", price: 189.95, originalPrice: 319.95, rating: 4.6, reviewCount: 94, vehicle: "Volkswagen Amarok", category: "Front Set", isSale: true },
  { id: "HY2025N", name: "Premium Neoprene Front Seat Covers - Hyundai Tucson", slug: "front-seat-covers-hyundai-tucson", image: "/images/products/hyundai-tucson-front.jpg", price: 169.95, originalPrice: 279.95, rating: 4.4, reviewCount: 63, vehicle: "Hyundai Tucson", category: "Front Set", isSale: true },
  { id: "LD4025N", name: "Full Set Neoprene Seat Covers - LDV T60", slug: "full-set-seat-covers-ldv-t60", image: "/images/products/ldv-t60-full.jpg", price: 369.95, originalPrice: 599.95, rating: 4.5, reviewCount: 51, vehicle: "LDV T60", category: "Full Set", isSale: true },
  { id: "HO1025N", name: "Premium Neoprene Front Seat Covers - Holden Colorado", slug: "front-seat-covers-holden-colorado", image: "/images/products/holden-colorado-front.jpg", price: 179.95, originalPrice: 299.95, rating: 4.6, reviewCount: 108, vehicle: "Holden Colorado", category: "Front Set", isSale: true },
  { id: "MZ2025N", name: "Full Set Neoprene Seat Covers - Mazda BT-50", slug: "full-set-seat-covers-mazda-bt50", image: "/images/products/mazda-bt50-full.jpg", price: 359.95, originalPrice: 589.95, rating: 4.7, reviewCount: 77, vehicle: "Mazda BT-50", category: "Full Set", isSale: true },
  { id: "TY8035N", name: "Premium Neoprene Rear Seat Covers - Toyota Prado 150 Series", slug: "rear-seat-covers-toyota-prado-150", image: "/images/products/toyota-prado-rear.jpg", price: 199.95, originalPrice: 329.95, rating: 4.6, reviewCount: 84, vehicle: "Toyota Prado", category: "Rear Set", isSale: true },
  { id: "MN4025N", name: "Full Set Neoprene Seat Covers - Mitsubishi Pajero Sport", slug: "full-set-seat-covers-mitsubishi-pajero-sport", image: "/images/products/mitsubishi-pajero-full.jpg", price: 349.95, originalPrice: 579.95, rating: 4.5, reviewCount: 66, vehicle: "Mitsubishi Pajero Sport", category: "Full Set", isSale: true },
];

export const allProducts: Product[] = [...topSellingProducts, ...extraProducts];

export const blogPosts: BlogPost[] = [
  {
    id: "1", title: "6 Car Care Tips to Keep Your Vehicle Looking New", slug: "blog/6-car-care-tips", excerpt: "Keep your car looking showroom fresh with these 6 essential car care tips from the experts at Mainwave Seat Covers.", image: "/images/blog/car-care-tips.jpg", date: "March 15, 2026", category: "Car Care",
    content: "Keeping your car in pristine condition doesn't have to be difficult. Here are 6 tips to maintain your vehicle's interior and exterior..."
  },
  {
    id: "2", title: "What Is Neoprene? Benefits & Features for Seat Covers", slug: "blog/what-is-neoprene-seat-cover-material", excerpt: "Discover why neoprene is the ultimate material for car seat covers - waterproof, durable, and comfortable.", image: "/images/blog/neoprene-material.jpg", date: "February 28, 2026", category: "Materials",
    content: "Neoprene is a synthetic rubber material that offers exceptional durability, water resistance, and comfort for automotive applications..."
  },
  {
    id: "3", title: "What to Look for When Buying Car Seat Covers", slug: "blog/what-to-look-for-when-buying-car-seat-covers", excerpt: "A comprehensive guide to choosing the right seat covers for your vehicle, from material to fitment.", image: "/images/blog/buying-guide.jpg", date: "February 10, 2026", category: "Buying Guide",
    content: "Choosing the right seat covers can be overwhelming with so many options available. This guide will help you make the right choice..."
  },
  {
    id: "4", title: "Removing Ink Stains from Car Seats", slug: "blog/removing-ink-stains-from-car-seats", excerpt: "Learn how to remove stubborn ink stains from your car seats with these proven methods.", image: "/images/blog/ink-stains.jpg", date: "January 25, 2026", category: "Car Care",
    content: "Ink stains on car seats can be frustrating, but they're not impossible to remove. Here are the best methods..."
  },
  {
    id: "5", title: "Best Seat Covers for Families and School Runs Australia", slug: "best-seat-covers-for-families-and-school-runs-australia", excerpt: "Discover the most durable and easy-to-clean seat covers for Australian families doing the daily school run.", image: "/images/blog/family-seat-covers.jpg", date: "January 5, 2026", category: "Guides",
    content: "Family life means messes happen. From spilled drinks to muddy shoes, your car seats take a beating..."
  },
  {
    id: "6", title: "Best Seat Covers for Toyota Hilux Work Utes", slug: "best-seat-covers-for-toyota-hilux-work-utes", excerpt: "Tough seat covers built for the toughest conditions. Find the perfect fit for your work ute.", image: "/images/blog/hilux-work-ute.jpg", date: "December 20, 2025", category: "Guides",
    content: "The Toyota Hilux is Australia's favourite work ute, and for good reason. But a work ute needs work-ready seat covers..."
  },
  {
    id: "7", title: "Who Makes the Best Heavy-Duty Seat Covers in Australia?", slug: "who-makes-the-best-heavy-duty-seat-cover", excerpt: "We compare the top heavy-duty seat cover brands in Australia and explain why Mainwave leads the pack.", image: "/images/blog/heavy-duty-comparison.jpg", date: "December 5, 2025", category: "Guides",
    content: "When it comes to heavy-duty seat covers, Australian tradies and miners need products that can withstand extreme conditions..."
  },
  {
    id: "8", title: "Top Reasons to Buy Rip-Proof Neoprene Seat Covers", slug: "top-reasons-to-buy-rip-proof-neoprene-seat-covers", excerpt: "Discover why rip-proof neoprene is the smart choice for Australian drivers who demand durability.", image: "/images/blog/rip-proof-neoprene.jpg", date: "November 18, 2025", category: "Materials",
    content: "Rip-proof neoprene represents the pinnacle of seat cover technology, combining the best properties of neoprene with reinforced construction..."
  },
  {
    id: "9", title: "Best Seat Covers for Mining Vehicles Australia", slug: "best-seat-covers-for-mining-vehicles", excerpt: "Built for the harshest conditions. Find the best seat covers for mining vehicles operating across Australia.", image: "/images/blog/mining-seat-covers.jpg", date: "November 2, 2025", category: "Industry",
    content: "Mining vehicles face some of the toughest operating conditions in the world. From red dust to extreme heat, your seat covers need to be up to the task..."
  },
  {
    id: "10", title: "Most Durable Seat Covers for Rental Fleets Australia", slug: "most-durable-seat-covers-for-rental-fleets", excerpt: "Protect your fleet investment with the most durable seat covers designed for high-turnover rental vehicles.", image: "/images/blog/rental-fleet-covers.jpg", date: "October 15, 2025", category: "Industry",
    content: "Managing a rental fleet means dealing with constant vehicle turnover. Every new renter brings different habits, and your seats bear the brunt of it all..."
  },
  {
    id: "11", title: "Seat Covers That Handle Red Dirt and Mud", slug: "seat-covers-that-can-handle-red-dirt", excerpt: "Australian conditions demand tough gear. Find seat covers that resist red dirt, mud, and the harsh Outback environment.", image: "/images/blog/red-dirt-covers.jpg", date: "September 28, 2025", category: "Guides",
    content: "If you drive on unsealed roads, work on rural properties, or explore Australia's vast Outback, you know the battle against red dust and mud is real..."
  },
];

export const popularProducts: Product[] = allProducts.slice(0, 8);

