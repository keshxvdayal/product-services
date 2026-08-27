"use client";

import { FormEvent, useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setStatus(
        "Thanks! Your message has been sent. We'll get back to you soon."
      );

      form.reset();
    } catch {
      setStatus(
        "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fafafa] px-6 py-20">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Contact Us
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            We'd love to hear from you.
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Have a question about an ebook, payment, order, or anything
            else? Send us a message and we'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Contact information */}
          <div className="rounded-3xl bg-gray-900 p-8 text-white sm:p-10">
            <p className="text-sm font-medium text-gray-400">
              Get in touch
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              We're here to help.
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              If you have questions about our digital products, payments,
              delivery, or your order, feel free to contact us.
            </p>

            <div className="mt-10 space-y-7">

              {/* Email */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </p>

                <a
                  href="mailto:support@learnwithzavio.com"
                  className="mt-2 inline-block text-base font-medium text-white transition hover:text-gray-300"
                >
                  support@learnwithzavio.com
                </a>
              </div>

              {/* Response time */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Response time
                </p>

                <p className="mt-2 text-gray-300">
                  Usually within 1–2 business days.
                </p>
              </div>

              {/* Products */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Products
                </p>

                <p className="mt-2 text-gray-300">
                  Digital ebooks and educational resources.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Your name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="Product question">
                    Product question
                  </option>
                  <option value="Payment issue">
                    Payment issue
                  </option>
                  <option value="Order / Delivery">
                    Order / Delivery
                  </option>
                  <option value="Refund request">
                    Refund request
                  </option>
                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-900"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="How can we help?"
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status */}
              {status && (
                <div className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                  {status}
                </div>
              )}

              <p className="text-center text-xs leading-5 text-gray-500">
                By submitting this form, you agree to our Privacy Policy.
              </p>

            </form>
          </div>
        </div>
      </div>
    </main>
  );
}