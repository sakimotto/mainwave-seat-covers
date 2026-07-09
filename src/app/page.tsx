import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { QuoteIcon, ChevronRightIcon } from "@/components/icons";
import { getVehicles, getPopularProducts, getBlogPosts, getAllProducts } from "@/lib/db";

export default async function HomePage() {
  const [vehicles, popularProducts, blogPosts, allProducts] = await Promise.all([
    getVehicles(),
    getPopularProducts(),
    getBlogPosts(),
    getAllProducts(),
  ]);
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-mainwave-red overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-[10%] text-[120px] font-black text-white leading-none select-none">
            SALE
          </div>
          <div className="absolute bottom-4 right-[10%] text-[120px] font-black text-white leading-none select-none">
            SALE
          </div>
        </div>
        <div className="container-site py-16 md:py-24 text-center relative z-10">
          <p className="text-white/80 text-sm md:text-base font-semibold tracking-[0.3em] uppercase mb-4">
            Limited Time Offer
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-4 leading-none">
            SALE ON NOW!
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-white uppercase mb-2">
            40% OFF ALL SEAT COVERS
          </p>
          <p className="text-white/70 text-sm md:text-base mb-8 max-w-md mx-auto">
            Australian made premium neoprene seat covers. Custom fitted for your vehicle.
          </p>
          <Link
            href="/vehicle/toyota"
            className="inline-block bg-white text-mainwave-red font-bold uppercase tracking-wider px-10 py-4 text-sm hover:bg-mainwave-grey transition-colors"
          >
            SHOP NOW →
          </Link>
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className="bg-mainwave-black py-3">
        <div className="container-site text-center">
          <p className="text-white text-xs md:text-sm font-semibold tracking-wider uppercase">
            FREE SHIPPING ON ORDERS OVER $150 | USE CODE: Mainwave150
          </p>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2 text-center">
            Our Most Popular Seat Covers
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Thousands of happy customers across Australia
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop By Make */}
      <section className="py-12 md:py-16 bg-mainwave-grey">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2 text-center">
            Shop By Vehicle Make
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Select your vehicle for a custom fit
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {vehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/vehicle/${vehicle.slug}`}
                className="group bg-white border border-mainwave-border p-4 md:p-6 text-center hover:border-mainwave-red hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 bg-gray-100 flex items-center justify-center p-2">
                  <img
                    src={vehicle.image}
                    alt={vehicle.make}
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <h3 className="text-sm md:text-base font-semibold text-mainwave-black group-hover:text-mainwave-red transition-colors">
                  {vehicle.make}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">
                  {vehicle.models.length} models
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight">
              Top Selling Products
            </h2>
            <Link
              href="/shop"
              className="text-sm text-mainwave-red font-semibold hover:underline hidden md:flex items-center gap-1"
            >
              View All <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 md:py-16 bg-mainwave-grey">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2 text-center">
            Tips &amp; Tricks
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Expert advice from the Mainwave team
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.slice(0, 4).map((post) => (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="group bg-white overflow-hidden border border-mainwave-border hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/10] bg-gray-200 flex items-center justify-center text-gray-400 text-xs p-4 text-center">
                  {post.title}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold text-mainwave-red uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-gray-400">|</span>
                    <span className="text-[10px] text-gray-400">{post.date}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-mainwave-black group-hover:text-mainwave-red transition-colors leading-tight mb-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-12 md:py-20">
        <div className="container-site max-w-3xl text-center">
          <QuoteIcon className="w-10 h-10 text-mainwave-red mx-auto mb-6" />
          <blockquote className="text-lg md:text-xl text-mainwave-text leading-relaxed mb-6">
            &ldquo;These are hands down the best seat covers I&apos;ve ever bought. The fit is
            perfect, the neoprene feels premium, and knowing they&apos;re Australian made gives
            me confidence they&apos;ll last. Highly recommend Mainwave to anyone looking for
            quality seat covers.&rdquo;
          </blockquote>
          <p className="text-sm font-semibold text-mainwave-black">— Happy Customer, Melbourne</p>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-mainwave-gold" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
