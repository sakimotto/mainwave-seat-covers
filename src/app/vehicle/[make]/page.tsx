import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicleBySlug, getProductsByVehicle } from "@/lib/db";
import { ProductCard } from "@/components/product-card";
import { ChevronRightIcon } from "@/components/icons";

interface VehicleMakePageProps {
  params: Promise<{ make: string }>;
}

export async function generateMetadata({
  params,
}: VehicleMakePageProps): Promise<Metadata> {
  const { make } = await params;
  const vehicle = await getVehicleBySlug(make);
  return {
    title: vehicle ? `${vehicle.make} Seat Covers` : "Vehicle Not Found",
    description: vehicle
      ? `Browse premium neoprene seat covers for ${vehicle.make}. Custom fit for all ${vehicle.make} models.`
      : "",
  };
}

export default async function VehicleMakePage({ params }: VehicleMakePageProps) {
  const { make } = await params;
  const vehicle = await getVehicleBySlug(make);

  if (!vehicle) {
    notFound();
  }

  const matchingProducts = (await getProductsByVehicle(make)).slice(0, 4);

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-mainwave-grey border-b border-mainwave-border">
        <div className="container-site py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-mainwave-red transition-colors">
              Home
            </Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-text font-medium">Vehicle</span>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-red font-medium">
              {vehicle.make}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {vehicle.make} Seat Covers
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Premium custom-fit neoprene seat covers for all{" "}
            {vehicle.make} models.
          </p>
        </div>
      </section>

      {/* Models */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">
              Select Your Model
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {vehicle.models.map((model) => (
                <Link
                  key={model}
                  href={`/shop/${vehicle.slug}/${model.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-mainwave-grey border border-mainwave-border p-4 md:p-6 text-center hover:border-mainwave-red hover:shadow-sm transition-all group"
                >
                  <img
                    src={vehicle.image}
                    alt={vehicle.make}
                    className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-2 object-contain"
                  />
                  <h3 className="text-sm md:text-base font-semibold text-mainwave-text group-hover:text-mainwave-red transition-colors">
                    {model}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      {matchingProducts.length > 0 && (
        <section className="bg-mainwave-grey py-12 md:py-16">
          <div className="container-site">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">
                {vehicle.make} Seat Covers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {matchingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* No products message */}
      {matchingProducts.length === 0 && (
        <section className="bg-mainwave-grey py-12 md:py-16">
          <div className="container-site">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-mainwave-text mb-2">
                We are currently adding seat covers for {vehicle.make} models.
              </p>
              <p className="text-sm text-gray-500">
                Please select your model above or contact us for availability.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-mainwave-black mb-4">
              Not Sure Which Fit Is Right?
            </h2>
            <p className="text-sm text-mainwave-text leading-relaxed mb-6">
              Our team can help you find the perfect seat covers for your{" "}
              {vehicle.make}. Get in touch with your vehicle details and we will
              recommend the best options.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/form/contact-us"
                className="bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="tel:0392626977"
                className="bg-mainwave-black text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-gray-800 transition-colors"
              >
                Call (03) 9262 6977
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
