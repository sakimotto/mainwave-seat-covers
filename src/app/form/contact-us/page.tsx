"use client";

import { useState } from "react";
import { PhoneIcon, MailIcon, MapPinIcon, ClockIcon } from "@/components/icons";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      {/* Hero */}
      <section className="bg-mainwave-black text-white py-16 md:py-24">
        <div className="container-site text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16">
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="bg-mainwave-grey p-6 border border-mainwave-border text-center">
              <PhoneIcon className="w-6 h-6 text-mainwave-red mx-auto mb-3" />
              <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-1">
                Phone
              </h3>
              <a
                href="tel:0392626977"
                className="text-sm text-mainwave-text hover:text-mainwave-red transition-colors"
              >
                (03) 9262 6977
              </a>
            </div>
            <div className="bg-mainwave-grey p-6 border border-mainwave-border text-center">
              <MailIcon className="w-6 h-6 text-mainwave-red mx-auto mb-3" />
              <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-1">
                Email
              </h3>
              <a
                href="mailto:sales@mainwaveseatcovers.com.au"
                className="text-sm text-mainwave-text hover:text-mainwave-red transition-colors"
              >
                sales@mainwaveseatcovers.com.au
              </a>
            </div>
            <div className="bg-mainwave-grey p-6 border border-mainwave-border text-center">
              <MapPinIcon className="w-6 h-6 text-mainwave-red mx-auto mb-3" />
              <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-1">
                Address
              </h3>
              <p className="text-sm text-mainwave-text">
                8 Jersey Road<br />
                Bayswater VIC 3153
              </p>
            </div>
            <div className="bg-mainwave-grey p-6 border border-mainwave-border text-center">
              <ClockIcon className="w-6 h-6 text-mainwave-red mx-auto mb-3" />
              <h3 className="text-sm font-bold text-mainwave-black uppercase tracking-wider mb-1">
                Business Hours
              </h3>
              <p className="text-sm text-mainwave-text">
                Mon – Fri<br />
                9:00 AM – 5:00 PM AEST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="bg-mainwave-grey py-12 md:py-16">
        <div className="container-site">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-mainwave-black mb-6">
                Send Us a Message
              </h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 p-6 text-center">
                  <div className="text-3xl mb-2">✓</div>
                  <h3 className="text-base font-bold text-green-800 mb-1">Message Sent!</h3>
                  <p className="text-sm text-green-700">Thank you for your message. We will get back to you shortly.</p>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-mainwave-black mb-1"
                  >
                    Name <span className="text-mainwave-red">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white border border-mainwave-border px-4 py-2.5 text-sm text-mainwave-text focus:outline-none focus:ring-2 focus:ring-mainwave-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-mainwave-black mb-1"
                  >
                    Email <span className="text-mainwave-red">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-mainwave-border px-4 py-2.5 text-sm text-mainwave-text focus:outline-none focus:ring-2 focus:ring-mainwave-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-mainwave-black mb-1"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-mainwave-border px-4 py-2.5 text-sm text-mainwave-text focus:outline-none focus:ring-2 focus:ring-mainwave-red focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-mainwave-black mb-1"
                  >
                    Subject <span className="text-mainwave-red">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white border border-mainwave-border px-4 py-2.5 text-sm text-mainwave-text focus:outline-none focus:ring-2 focus:ring-mainwave-red focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Enquiry</option>
                    <option value="order">Order Enquiry</option>
                    <option value="fitment">Fitment Question</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="returns">Returns &amp; Exchanges</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-mainwave-black mb-1"
                  >
                    Message <span className="text-mainwave-red">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-mainwave-border px-4 py-2.5 text-sm text-mainwave-text focus:outline-none focus:ring-2 focus:ring-mainwave-red focus:border-transparent resize-y"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 px-3 py-2">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-mainwave-red text-white text-sm font-bold uppercase tracking-wider px-6 py-3 hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-mainwave-black mb-6">
                Our Location
              </h2>
              <div className="flex-1 bg-gray-200 border border-mainwave-border min-h-[300px] lg:min-h-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <MapPinIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    8 Jersey Road, Bayswater VIC 3153
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=8+Jersey+Road+Bayswater+VIC+3153"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-mainwave-red hover:underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
