import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Hero */}
      <section className="px-6 pb-16 pt-24 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            About LearnWithZavio
          </p>

          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
            Practical knowledge for the AI-powered world.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600">
            LearnWithZavio creates practical digital resources designed to
            help people understand AI, technology, digital skills, and
            opportunities in a simple and actionable way.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">

          {/* Who we are */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              ✦
            </div>

            <h2 className="text-xl font-semibold">
              Who we are
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              LearnWithZavio is an independent digital education platform
              focused on creating accessible and practical learning
              resources.
            </p>
          </div>

          {/* What we provide */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              ◆
            </div>

            <h2 className="text-xl font-semibold">
              What we provide
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We provide digital ebooks, guides, and other educational
              resources covering topics such as artificial intelligence,
              technology, productivity, and digital skills.
            </p>
          </div>

          {/* Our approach */}
          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              → 
            </div>

            <h2 className="text-xl font-semibold">
              Our approach
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our goal is to make useful information easier to understand
              and apply through clear, practical, and easy-to-follow
              digital resources.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Our mission
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Make learning practical, accessible, and useful.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            We believe learning should not stop at understanding a concept.
            Our resources are created to help readers take what they learn
            and apply it to real-world projects, workflows, and everyday
            challenges.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl rounded-3xl bg-gray-900 px-8 py-12 text-white sm:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400">
              Explore our resources
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Learn something useful today.
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Explore our collection of digital ebooks and educational
              resources and find something that matches your interests and
              goals.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
            >
              Explore Products
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Have a question?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            If you have a question about LearnWithZavio, our products,
            payments, or an order, we're happy to help.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-xl border border-gray-900 px-6 py-3.5 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}