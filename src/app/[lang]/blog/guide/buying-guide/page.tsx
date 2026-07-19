import Link from "next/link"
import { ChevronRightIcon } from "@/components/icons"

const materialGuides = [
  {
    name: "Neoprene",
    description:
      "The premium choice for Australian conditions. Neoprene is a synthetic rubber that's waterproof, UV-resistant, and incredibly durable. It provides excellent protection against spills, mud, dust, and daily wear. Mainwave's neoprene covers are 8mm thick with reinforced stitching for maximum longevity.",
    pros: ["Waterproof", "UV resistant", "Durable and long-lasting", "Comfortable in all seasons", "Easy to clean"],
    cons: ["Higher price point", "Can retain heat in direct sun"],
    bestFor: "Tradies, 4WD owners, families, daily drivers",
  },
  {
    name: "Canvas",
    description:
      "Heavy-duty woven fabric designed for extreme conditions. Canvas seat covers offer exceptional tear resistance and are ideal for work vehicles and mining applications. Mainwave canvas covers feature double-stitched seams and are treated for water resistance.",
    pros: ["Extremely tough and rip-resistant", "Heavy-duty protection", "Good for work environments", "Breathable"],
    cons: ["Not fully waterproof", "Can be less comfortable than neoprene", "Bulkier fit"],
    bestFor: "Mining, construction, farming, heavy commercial use",
  },
  {
    name: "Leather",
    description:
      "Premium leather offers a luxurious look and feel for your vehicle's interior. Mainwave's leather seat covers are crafted from top-grain leather with precise stitching and a custom fit design. They add instant resale value and sophistication to any vehicle.",
    pros: ["Premium appearance", "Luxurious feel", "Increases resale value", "Durable with proper care"],
    cons: ["Expensive", "Requires regular conditioning", "Can get hot in summer, cold in winter"],
    bestFor: "Luxury vehicles, executive cars, show cars",
  },
  {
    name: "Cloth / Fabric",
    description:
      "Affordable and comfortable fabric seat covers made from high-quality polyester blends. These covers offer a good balance of protection and value, with machine-washable convenience. Available in a range of colours to match your interior.",
    pros: ["Budget-friendly", "Machine washable", "Breathable", "Wide colour selection"],
    cons: ["Less durable than neoprene or canvas", "Not waterproof", "Can fade over time"],
    bestFor: "Budget-conscious buyers, city cars, temporary protection",
  },
]

const fitmentTypes = [
  {
    name: "Custom Fit",
    description:
      "Tailored specifically for your vehicle's make and model. Custom-fit covers are designed using precise 3D scanning or moulds of the original seats, ensuring a perfect fit that looks factory-installed. Every Mainwave custom cover is vehicle-specific with provisions for armrests, seatbelts, airbags, and adjusters.",
    benefits: [
      "Perfect fit — no sagging or bunching",
      "Factory-matched design",
      "Airbag compatible (tested)",
      "Full access to seat functions",
      "Professional appearance",
    ],
  },
  {
    name: "Universal Fit",
    description:
      "One-size-fits-most seat covers designed to accommodate a wide range of vehicles. Universal covers are more affordable and can be transferred between vehicles, but they rarely achieve the same level of fit and finish as custom options.",
    benefits: [
      "Lower cost",
      "Can be moved between vehicles",
      "Easy to purchase off the shelf",
      "Quick installation",
    ],
    drawbacks: [
      "Loose fit on many vehicles",
      "May interfere with seat controls",
      "Less precise airbag deployment path",
      "Can look saggy or baggy",
    ],
  },
]

const features = [
  {
    title: "Waterproof Protection",
    description:
      "A critical feature for anyone who eats, drinks, or transports kids and pets in their vehicle. Waterproof seat covers prevent liquids from soaking into the foam, preventing mould, odours, and permanent stains. Mainwave neoprene covers feature a waterproof membrane layer.",
  },
  {
    title: "UV Protection",
    description:
      "Australian UV radiation is among the harshest in the world. UV rays can crack, fade, and degrade your original upholstery over time. Quality seat covers with UV protection prolong your interior's life and maintain your vehicle's resale value.",
  },
  {
    title: "Reinforced Stitching",
    description:
      "The stitching is the weakest point on any seat cover. Mainwave uses double-stitched, heavy-duty nylon thread with reinforced stress points. This prevents seams from splitting under tension and extends the life of your covers significantly.",
  },
  {
    title: "Airbag Compatibility",
    description:
      "Safety first. All Mainwave Seat Covers are designed with airbag-compatible stitching that allows side airbags to deploy without obstruction. Look for covers that have been tested and certified for airbag deployment.",
  },
  {
    title: "Easy Installation",
    description:
      "The best seat covers are those you can install yourself in under 30 minutes. Features like elastic hems, hook-and-loop fasteners, adjustable straps, and clear instructions make DIY installation straightforward.",
  },
  {
    title: "Machine Washable",
    description:
      "For busy families and tradies, the ability to remove and machine-wash seat covers is a game-changer. Look for covers that are designed for repeated washing without shrinking or losing their fit.",
  },
]

const installationSteps = [
  {
    step: 1,
    title: "Prepare Your Seats",
    description:
      "Remove any existing covers or accessories. Vacuum the seats thoroughly to remove dust and debris. If installing over leather, clean with a gentle leather cleaner first.",
  },
  {
    step: 2,
    title: "Fit the Cover Over the Seat Back",
    description:
      "Slide the cover over the top of the seat backrest. Ensure the seams align with the seat contours. For custom covers, the fit should be snug from the start.",
  },
  {
    step: 3,
    title: "Secure the Base Section",
    description:
      "Pull the cover down over the seat base. Tuck any excess material into the crevice between the seat back and base. Use the provided straps and clips to secure underneath.",
  },
  {
    step: 4,
    title: "Work Around Headrests and Armrests",
    description:
      "Remove headrests if needed, fit the cover, and reinstall. For armrests, use the designated cutouts or tuck the cover neatly around them.",
  },
  {
    step: 5,
    title: "Check Airbag Deploy Zones",
    description:
      "Verify that side airbag deployment seams (if applicable) are positioned correctly and unobstructed. This is critical for safety.",
  },
  {
    step: 6,
    title: "Final Adjustments",
    description:
      "Smooth out any wrinkles. Double-check all straps and hooks. Allow the covers to settle for 24 hours; minor adjustments may be needed as the material conforms.",
  },
]

const budgetTiers = [
  {
    tier: "Budget",
    price: "$50 - $100",
    materials: "Basic fabric/polyester",
    bestFor: "Short-term protection, rental vehicles, budget-conscious buyers",
    recommendations: "Basic universal-fit cloth covers offer essential protection at the lowest cost.",
  },
  {
    tier: "Mid-Range",
    price: "$150 - $250",
    materials: "Quality neoprene or canvas (front set)",
    bestFor: "Daily drivers, families, tradies looking for good protection",
    recommendations: "Mainwave Premium Neoprene Front Sets offer the best value for money with excellent durability.",
  },
  {
    tier: "Premium",
    price: "$300 - $600",
    materials: "Premium neoprene, canvas, or leather (full set)",
    bestFor: "Complete vehicle protection, 4WDs, luxury vehicles",
    recommendations: "Mainwave Full Sets provide comprehensive coverage with the highest quality materials.",
  },
]

const faqs = [
  {
    q: "What type of seat cover material is best for Australian conditions?",
    a: "Neoprene is widely considered the best all-rounder for Australian conditions. It handles heat, UV exposure, dust, mud, and spills exceptionally well. For extreme work environments like mining, heavy-duty canvas is the preferred choice. Consider your specific driving conditions and needs when choosing.",
  },
  {
    q: "Will seat covers interfere with my side airbags?",
    a: "Mainwave custom seat covers are designed and tested for airbag compatibility. They feature specifically engineered stitching that allows side airbags to deploy correctly. Always ensure you purchase from a brand that explicitly tests and certifies airbag compatibility.",
  },
  {
    q: "How do I know if seat covers will fit my vehicle?",
    a: "Custom-fit covers are vehicle-specific. On our website, select your vehicle's make and model to see exactly which covers fit. Universal covers use a sizing chart based on seat dimensions. When in doubt, custom-fit is always the safest choice.",
  },
  {
    q: "Can I wash my seat covers?",
    a: "Yes. Most Mainwave neoprene and fabric seat covers are machine washable. Canvas covers can be spot-cleaned or professionally cleaned. Always follow the care instructions for your specific covers to maintain their appearance and longevity.",
  },
  {
    q: "How long do seat covers typically last?",
    a: "With proper care, high-quality neoprene seat covers from Mainwave can last 5-10 years depending on usage. Canvas covers in work environments typically last 3-5 years. Leather covers can last a decade or more with regular conditioning.",
  },
  {
    q: "Are custom seat covers worth the extra cost?",
    a: "Absolutely. Custom-fit covers provide superior protection, a factory-like appearance, proper airbag compatibility, and access to all seat functions. The difference in fit and finish is dramatic compared to universal covers, and they typically last longer too.",
  },
]

export default function BuyingGuidePage() {
  return (
    <div className="min-h-screen bg-mainwave-grey">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-mainwave-border">
        <div className="container-site py-4">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Link href="/" className="hover:text-brand-accent transition-colors">Home</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <Link href="/blog" className="hover:text-brand-accent transition-colors">Blog</Link>
            <ChevronRightIcon className="w-3 h-3" />
            <span className="text-mainwave-black">Buying Guide</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-brand-accent py-16 md:py-20">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Ultimate Car Seat Cover Buying Guide
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
            Everything you need to know before buying seat covers for your vehicle. From materials to fitment, features to budget, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      <div className="container-site py-12 md:py-16 space-y-16">
        {/* Material Guide */}
        <section id="material-guide">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2">
            Material Guide
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Choosing the right material is the most important decision when buying seat covers
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {materialGuides.map((material) => (
              <div key={material.name} className="bg-white border border-mainwave-border p-6">
                <h3 className="text-lg font-bold text-mainwave-black mb-2">{material.name}</h3>
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">{material.description}</p>
                <div className="mb-3">
                  <p className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">Pros</p>
                  <ul className="space-y-1">
                    {material.pros.map((pro) => (
                      <li key={pro} className="text-xs text-mainwave-text flex items-start gap-2">
                        <span className="text-brand-accent flex-shrink-0 mt-0.5">+</span> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">Cons</p>
                  <ul className="space-y-1">
                    {material.cons.map((con) => (
                      <li key={con} className="text-xs text-mainwave-text flex items-start gap-2">
                        <span className="text-mainwave-text flex-shrink-0 mt-0.5">-</span> {con}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-brand-accent font-semibold">
                  Best for: {material.bestFor}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fitment Guide */}
        <section id="fitment-guide">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2">
            Fitment Guide
          </h2>
          <p className="text-sm text-gray-500 mb-8">Custom fit vs universal — what&apos;s right for you?</p>
          <div className="grid md:grid-cols-2 gap-6">
            {fitmentTypes.map((type) => (
              <div key={type.name} className="bg-white border border-mainwave-border p-6">
                <h3 className="text-lg font-bold text-mainwave-black mb-2">{type.name}</h3>
                <p className="text-sm text-mainwave-text leading-relaxed mb-4">{type.description}</p>
                <p className="text-xs font-bold text-mainwave-black uppercase tracking-wider mb-2">
                  {type.drawbacks ? "Drawbacks" : "Benefits"}
                </p>
                <ul className="space-y-1">
                  {(type.benefits || type.drawbacks || []).map((item) => (
                    <li key={item} className="text-xs text-mainwave-text flex items-start gap-2">
                      <span className="text-brand-accent flex-shrink-0">{type.drawbacks ? "−" : "+"}</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Features to Look For */}
        <section id="features">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2">
            Features to Look For
          </h2>
          <p className="text-sm text-gray-500 mb-8">Key features that separate quality seat covers from the rest</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white border border-mainwave-border p-6">
                <h3 className="text-base font-bold text-mainwave-black mb-2">{feature.title}</h3>
                <p className="text-sm text-mainwave-text leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Installation Considerations */}
        <section id="installation">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2">
            Installation Considerations
          </h2>
          <p className="text-sm text-gray-500 mb-8">How to install your seat covers for the best results</p>
          <div className="space-y-4">
            {installationSteps.map((step) => (
              <div key={step.step} className="bg-white border border-mainwave-border p-5 flex gap-4">
                <div className="w-8 h-8 bg-brand-accent text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-mainwave-black mb-1">{step.title}</h3>
                  <p className="text-xs text-mainwave-text leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Budget Guide */}
        <section id="budget-guide">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2">
            Budget Guide
          </h2>
          <p className="text-sm text-gray-500 mb-8">Find the right seat covers for your budget</p>
          <div className="grid md:grid-cols-3 gap-6">
            {budgetTiers.map((tier) => (
              <div key={tier.tier} className="bg-white border border-mainwave-border p-6 flex flex-col">
                <h3 className="text-lg font-bold text-mainwave-black mb-1">{tier.tier}</h3>
                <p className="text-xl font-bold text-brand-accent mb-4">{tier.price}</p>
                <p className="text-xs text-mainwave-text mb-3">
                  <span className="font-semibold">Materials:</span> {tier.materials}
                </p>
                <p className="text-xs text-mainwave-text mb-4 flex-1">
                  <span className="font-semibold">Best for:</span> {tier.bestFor}
                </p>
                <p className="text-xs text-mainwave-text italic border-t border-mainwave-border pt-3">
                  {tier.recommendations}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black uppercase tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-gray-500 mb-8">Common questions about buying car seat covers</p>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white border border-mainwave-border group">
                <summary className="p-5 text-sm font-semibold text-mainwave-black cursor-pointer list-none flex items-center justify-between group-open:bg-mainwave-grey transition-colors">
                  {faq.q}
                  <ChevronRightIcon className="w-4 h-4 text-brand-accent flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 border-t border-mainwave-border">
                  <p className="text-xs text-mainwave-text leading-relaxed mt-3">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
