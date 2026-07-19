import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCommerce } from "@/commerce";
import { getDictionary } from "@/i18n";
import { ProductCard } from "@/components/product-card";
import { ChevronRightIcon } from "@/components/icons";

interface ModelPageProps {
  params: Promise<{ lang: string; make: string; model: string }>;
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { make, model } = await params;
  const vehicle = await getCommerce().catalog.getVehicleBySlug(make);
  const modelName = model.replace(/-/g, " ");
  return {
    title: vehicle
      ? `${vehicle.make} ${modelName} Seat Covers`
      : "Vehicle Not Found",
    description: vehicle
      ? `Premium neoprene seat covers for ${vehicle.make} ${modelName}. Custom fit, factory direct.`
      : "",
  };
}

export default async function ModelPage({ params }: ModelPageProps) {
  const { lang, make, model } = await params;
  const { locale } = getDictionary(lang);
  const vehicle = await getCommerce().catalog.getVehicleBySlug(make);
  const modelName = model.replace(/-/g, " ");

  if (!vehicle) {
    notFound();
  }

  const [matchingProducts, allVehicleProducts] = await Promise.all([
    getCommerce().catalog.getProductsByMakeModel(make, modelName, locale),
    getCommerce().catalog.getProductsByVehicle(make, locale),
  ]);

  return (
    <main>
      {/* Breadcrumb */}
      <div className="bg-mainwave-grey border-b border-mainwave-border">
        <div className="container-site py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href={`/vehicle/${vehicle.slug}`} className="hover:text-brand-accent transition-colors">{vehicle.make}</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-brand-accent font-medium capitalize">{modelName}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-mainwave-black text-white py-12 md:py-16">
        <div className="container-site text-center">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3">
            {vehicle.make} {modelName} Seat Covers
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Premium custom-fit neoprene seat covers for your {vehicle.make} {modelName}.
            Made in our own Thailand factory with 4mm neoprene.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          {matchingProducts.length > 0 ? (
            <>
              <h2 className="text-xl md:text-2xl font-bold text-mainwave-black mb-6">
                Available Seat Covers
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {matchingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-mainwave-text mb-3">
                We do not have specific seat covers listed for {vehicle.make} {modelName} yet.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Check our full range for {vehicle.make} below or contact us for availability.
              </p>
              {allVehicleProducts.length > 0 && (
                <>
                  <h3 className="text-lg font-bold text-mainwave-black mb-4">
                    Other {vehicle.make} Seat Covers
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                    {allVehicleProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
              <Link
                href={`/vehicle/${vehicle.slug}`}
                className="inline-block mt-6 bg-brand-accent text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors"
              >
                Back to {vehicle.make}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-mainwave-grey py-12 md:py-16">
        <div className="container-site text-center">
          <h2 className="text-xl font-bold text-mainwave-black mb-3">Need Help?</h2>
          <p className="text-sm text-mainwave-text mb-5 max-w-lg mx-auto">
            Not sure which seat covers fit your {vehicle.make} {modelName}? Contact our team for expert advice.
          </p>
          <Link
            href="/form/contact-us"
            className="inline-block bg-brand-accent text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
