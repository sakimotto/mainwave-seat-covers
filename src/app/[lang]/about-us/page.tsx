import type { Metadata } from "next";
import { ShieldIcon, TruckIcon, StarIcon, ClockIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mainwave Seat Covers - an Australian brand with 30+ years of textile engineering experience, made in our own Thailand factory. Premium custom neoprene seat covers.",
};

const features = [
  {
    icon: StarIcon,
    title: "Premium Quality",
    description:
      "We use only the highest grade neoprene materials, ensuring durability, comfort, and a perfect fit for your vehicle.",
  },
  {
    icon: ShieldIcon,
    title: "Factory Direct",
    description:
      "An Australian brand made in our own Thailand factory. No middlemen — honest quality at honest prices.",
  },
  {
    icon: TruckIcon,
    title: "Custom Fit",
    description:
      "Every seat cover is precision-engineered to match the exact contours of your vehicle's seats for a seamless, factory finish.",
  },
  {
    icon: ClockIcon,
    title: "30+ Years Experience",
    description:
      "With over three decades in the textile engineering industry, our expertise ensures you receive the best product every time.",
  },
];

export default function AboutUsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            About Mainwave Seat Covers
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Premium neoprene seat covers made in our own Thailand factory,
            backed by over three decades of textile engineering excellence.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-mainwave-text leading-relaxed">
              <p>
                Founded in Melbourne, Mainwave Seat Covers was born from a passion
                for quality craftsmanship and a deep understanding of automotive
                textiles. With over 30 years of experience in the textile
                engineering industry, our team has honed the skills and knowledge
                needed to produce seat covers that meet the highest standards of
                quality, durability, and fit.
              </p>
              <p>
                What started as a small workshop has grown into one of
                Australia&apos;s most trusted names in custom seat covers. Our
                commitment to using premium neoprene materials and precision
                manufacturing techniques means every product we deliver is built
                to last.
              </p>
              <p>
                We understand that every vehicle is unique. That&apos;s why we
                invest in continuous research and development to ensure our seat
                covers are tailored to the exact specifications of each make and
                model we support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Mainwave */}
      <section className="bg-mainwave-grey py-16 md:py-20">
        <div className="container-site">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-10 text-center">
            Why Choose Mainwave?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 md:p-8 border border-mainwave-border"
              >
                <feature.icon className="w-8 h-8 text-mainwave-red mb-4" />
                <h3 className="text-lg font-bold text-mainwave-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-mainwave-text leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-6">
              Our Commitment
            </h2>
            <div className="space-y-4 text-mainwave-text leading-relaxed">
              <p>
                At Mainwave Seat Covers, quality is not just a promise &mdash;
                it&apos;s the foundation of everything we do. From the selection
                of raw materials to the final stitch, every step of our
                manufacturing process is guided by rigorous quality control
                standards.
              </p>
              <p>
                We are equally committed to exceptional customer service. Our
                knowledgeable team is always available to help you choose the
                right seat covers for your vehicle and driving needs. Whether
                you&apos;re a weekend adventurer, a tradie on the tools, or a
                family on the daily school run, we have a solution for you.
              </p>
              <p>
                We stand behind every product we sell with comprehensive
                warranty coverage and a dedicated after-sales support team.
                Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
