
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { VehicleSelector } from "@/components/vehicle-selector";
import { getVehicles, getPopularProducts, getBlogPosts } from "@/lib/db";

export default async function HomePage() {
  const [vehicles, popularProducts, blogPosts] = await Promise.all([
    getVehicles(),
    getPopularProducts(),
    getBlogPosts(),
  ]);

  const featured = popularProducts.slice(0, 4);
  const blogPreview = blogPosts.slice(0, 4);

  return (
    <>
      {/* Hero — Vehicle Selector as the star */}
      <section className="relative bg-mainwave-black overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_#fff_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="container-site py-20 md:py-28 text-center relative z-10">
          <p className="text-mainwave-red text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            Australian Made
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[1.05]">
            Seat Covers Built<br />
            <span className="text-mainwave-red">For The Job</span>
          </h1>
          <p className="text-white/60 text-base md:text-lg mb-12 max-w-lg mx-auto">
            Premium neoprene, custom-fitted for your vehicle. Made in Melbourne for Australian conditions.
          </p>

          {/* Vehicle Selector */}
          <div className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10">
            <VehicleSelector vehicles={vehicles} />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black tracking-tight mb-2">
                Most Popular
              </h2>
              <p className="text-sm text-gray-500">Thousands of Australians trust Mainwave</p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-mainwave-red hover:text-red-700 transition-colors"
            >
              View All
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Mainwave */}
      <section className="py-16 md:py-24 bg-mainwave-grey">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black tracking-tight text-center mb-12">
            Why Choose Mainwave
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-mainwave-red/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-mainwave-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-mainwave-black mb-2">Made in Melbourne</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Every cover is designed, patterned, and manufactured in our Melbourne factory. No middlemen, no imports — just Australian quality.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-mainwave-red/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-mainwave-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-mainwave-black mb-2">3 Year Warranty</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                We stand behind every stitch. All seat covers come with a 3-year manufacturer&apos;s warranty against defects.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-mainwave-red/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-6 h-6 text-mainwave-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-mainwave-black mb-2">15 Minute Install</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                No tools, no mechanics, no stress. Our custom-fit covers slip on in minutes with perfect factory-like fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Make */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black tracking-tight text-center mb-2">
            Shop By Make
          </h2>
          <p className="text-sm text-gray-500 text-center mb-10">
            Custom patterns for every vehicle
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-3">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/vehicle/${vehicle.slug}`}
                className="group flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-mainwave-red/20 transition-all text-center"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <img
                    src={vehicle.image}
                    alt={vehicle.make}
                    className="w-6 h-6 md:w-7 md:h-7 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <span className="text-xs font-medium text-mainwave-black group-hover:text-mainwave-red transition-colors leading-tight">
                  {vehicle.make}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-mainwave-black text-white">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "These covers have taken an absolute beating on the mine site and still look brand new. Best investment for my Hilux.",
                name: "Jason R.",
                vehicle: "Toyota Hilux — Mining",
              },
              {
                quote: "Ordered a full set for the family Prado. The kids have spilled everything imaginable and these just wipe clean. Game changer.",
                name: "Sarah M.",
                vehicle: "Toyota Prado — Family",
              },
              {
                quote: "Fitted perfectly on my Ranger Raptor. The quality is insane for the price — and supporting Australian manufacturing feels great.",
                name: "Dave K.",
                vehicle: "Ford Ranger Raptor — Tradie",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-mainwave-gold" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/50">{t.vehicle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16 md:py-24">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black tracking-tight mb-2">
                Tips &amp; Guides
              </h2>
              <p className="text-sm text-gray-500">Expert advice from the Mainwave team</p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-mainwave-red hover:text-red-700 transition-colors"
            >
              View All
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPreview.map((post, i) => {
              const gradients = [
                "from-blue-600 to-blue-800",
                "from-slate-700 to-slate-900",
                "from-zinc-700 to-zinc-900",
                "from-red-800 to-red-950",
              ]
              const icons = ["🚗", "🧵", "🛋️", "✨"]
              return (
                <Link
                  key={post.id}
                  href={`/${post.slug}`}
                  className="group block"
                >
                  <div className={`aspect-[16/10] rounded-lg overflow-hidden mb-4 bg-gradient-to-br ${gradients[i % 4]} flex items-center justify-center relative`}>
                    <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-500 select-none">
                      {icons[i % 4]}
                    </span>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold text-mainwave-red uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-mainwave-black group-hover:text-mainwave-red transition-colors leading-snug mb-1.5">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </>
  );
}
