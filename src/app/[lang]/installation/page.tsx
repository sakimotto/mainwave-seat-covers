import type { Metadata } from "next";
import Link from "next/link";
import { WrenchIcon, CheckCircleIcon } from "@/components/icons";


export const metadata: Metadata = {
  title: "Installation Guide",
  description:
    "Step-by-step guide to installing your Mainwave neoprene seat covers. Tips and tools for a perfect fit.",
};

const steps = [
  {
    number: 1,
    title: "Unpack and Inspect",
    description:
      "Remove the seat covers from the packaging and inspect all pieces. Lay them out on a clean surface and match each piece to the corresponding seat using the labels provided.",
  },
  {
    number: 2,
    title: "Remove Headrests",
    description:
      "Remove the headrests from each seat that will be covered. Most headrests have a release button or lever at the base of the posts. Set them aside in a safe place.",
  },
  {
    number: 3,
    title: "Position the Seat Back Cover",
    description:
      "Slide the seat back cover over the top of the seat, ensuring the seams align with the seat edges. Pull it down evenly, smoothing out any wrinkles as you go.",
  },
  {
    number: 4,
    title: "Secure the Fastenings",
    description:
      "Use the provided hooks, elastic straps, and Velcro closures to secure the seat back cover in place. Ensure all fastenings are tight and evenly distributed for a snug fit.",
  },
  {
    number: 5,
    title: "Fit the Seat Base Cover",
    description:
      "Place the seat base cover over the seat cushion, aligning it with the seat contours. Tuck the edges between the seat base and seat back. Secure with the provided straps and hooks under the seat.",
  },
  {
    number: 6,
    title: "Reinstall Headrests",
    description:
      "Reinsert the headrest posts through the designated openings in the seat cover. Push the headrests back into their locked position.",
  },
  {
    number: 7,
    title: "Adjust and Smooth",
    description:
      "Sit in each seat and check the fit. Smooth out any bunching or wrinkles. Adjust the straps and fastenings as needed to achieve a clean, factory-finish look.",
  },
  {
    number: 8,
    title: "Final Check",
    description:
      "Ensure all seatbelt buckles are fully accessible and unobstructed. Verify that all airbag seams (if applicable) are not blocked. Check that all armrests and console lids operate freely.",
  },
];

const toolsNeeded = [
  "Flat-head screwdriver (for tucking fabric into tight gaps)",
  "Hook tool (often included with your seat covers)",
  "Clean microfibre cloth",
];

const tips = [
  "Installation is easiest when performed in warm, dry conditions — the neoprene material becomes more pliable at room temperature.",
  "Work on one seat at a time to keep track of parts and fastenings.",
  "Take your time pulling the covers over the seats. Rushing can cause creases and uneven fitment.",
  "If your vehicle has side airbags, ensure the airbag deployment seams are aligned correctly as indicated on the seat cover.",
  "Periodically check and retighten straps after the first few weeks of use as the material settles.",
];

export default function InstallationPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Installation Guide
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Follow our step-by-step guide to install your Mainwave neoprene seat
            covers for a professional, custom fit finish.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <p className="text-mainwave-text leading-relaxed text-lg">
              Installing your new Mainwave Seat Covers is straightforward and
              typically takes 15 – 30 minutes per seat. No special tools are
              required, and each set comes with all the fastenings you need.
              Follow the steps below for the best results.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-mainwave-grey py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-mainwave-black mb-8">
              Step-by-Step Instructions
            </h2>
            <ol className="space-y-6">
              {steps.map((step) => (
                <li
                  key={step.number}
                  className="flex gap-4 bg-white p-5 md:p-6 border border-mainwave-border"
                >
                  <span className="flex-shrink-0 w-9 h-9 bg-brand-accent text-white text-sm font-bold rounded-full flex items-center justify-center">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-mainwave-black mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-mainwave-text leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Tools Needed */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <WrenchIcon className="w-6 h-6 text-brand-accent" />
              <h2 className="text-2xl font-bold text-mainwave-black">
                Tools Needed
              </h2>
            </div>
            <ul className="space-y-3">
              {toolsNeeded.map((tool) => (
                <li
                  key={tool}
                  className="flex items-start gap-3 text-sm text-mainwave-text"
                >
                  <CheckCircleIcon className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-mainwave-grey py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-mainwave-black mb-6">
              Tips for Best Fit
            </h2>
            <ul className="space-y-4">
              {tips.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 text-sm text-mainwave-text"
                >
                  <span className="flex-shrink-0 w-1.5 h-1.5 bg-brand-accent rounded-full mt-2" />
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Video Note */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-mainwave-black mb-4">
              Video Installation Guide
            </h2>
            <div className="bg-mainwave-grey border border-mainwave-border p-8 text-center">
              <p className="text-sm text-mainwave-text mb-4">
                We are currently producing a comprehensive video installation
                guide for each vehicle model. In the meantime, the written
                instructions above cover the full installation process.
              </p>
              <p className="text-sm text-mainwave-text">
                Need help?{" "}
                <Link
                  href="/form/contact-us"
                  className="text-brand-accent font-medium hover:underline"
                >
                  Contact our team
                </Link>{" "}
                for personalised installation support.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


