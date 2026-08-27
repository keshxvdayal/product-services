import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Legal
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            These Terms & Conditions govern your use of the LearnWithZavio
            website and your purchase and use of our digital products.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: August 27, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-10">

          {/* 1 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              1. About LearnWithZavio
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              LearnWithZavio provides digital educational products, including
              ebooks, guides, and other digital resources relating to topics
              such as artificial intelligence, technology, productivity, and
              digital skills.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              By accessing this website or purchasing a product, you agree to
              be bound by these Terms & Conditions.
            </p>
          </section>

          {/* 2 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              2. Digital Products
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              All products sold through LearnWithZavio are digital products
              unless explicitly stated otherwise.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Digital products are delivered electronically after successful
              payment. No physical product is shipped.
            </p>
          </section>

          {/* 3 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              3. Product Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We aim to provide accurate descriptions of our digital products,
              including their contents, features, and pricing.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Please review the product description before purchasing to make
              sure the product is appropriate for your needs.
            </p>
          </section>

          {/* 4 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              4. Pricing & Payment
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              The price of each digital product is displayed on its respective
              product page before you complete your purchase.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Prices may differ between products and may be displayed in
              different currencies depending on the customer's location or
              selected country.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Payments may be processed through third-party payment providers,
              including Razorpay for applicable Indian transactions and PayPal
              for applicable international transactions.
            </p>
          </section>

          {/* 5 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              5. Order & Delivery
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              After a successful payment, the purchased digital product will
              be delivered electronically using the email address provided
              during checkout.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Customers are responsible for providing a valid and accessible
              email address.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If you do not receive your product after completing payment,
              please contact us with your order or transaction details.
            </p>
          </section>

          {/* 6 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              6. Personal Use & Restrictions
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Unless otherwise stated, purchased digital products are provided
              for the purchaser's personal, non-commercial use.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              You may not, without prior written permission:
            </p>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>• Resell or commercially distribute the product.</li>
              <li>• Share the purchased PDF or download link publicly.</li>
              <li>• Upload the product to file-sharing or public websites.</li>
              <li>• Reproduce or redistribute substantial portions of the content.</li>
              <li>• Claim the content as your own work.</li>
            </ul>
          </section>

          {/* 7 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              7. Intellectual Property
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              The LearnWithZavio name, branding, website content, ebooks,
              written materials, graphics, and other original materials are
              protected by applicable intellectual property laws.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Purchasing a digital product does not transfer ownership of the
              underlying intellectual property to the purchaser.
            </p>
          </section>

          {/* 8 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              8. Educational Disclaimer
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our ebooks and digital resources are provided for educational
              and informational purposes.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We do not guarantee any particular result, income, employment,
              business performance, audience growth, or other outcome from
              using the information provided in our products.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Results may vary depending on individual circumstances,
              experience, implementation, market conditions, and other
              factors.
            </p>
          </section>

          {/* 9 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              9. Third-Party Services
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our website may use third-party services for payment processing,
              website hosting, email delivery, analytics, database services,
              and automation.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Your use of third-party services may also be subject to their
              respective terms and policies.
            </p>
          </section>

          {/* 10 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              10. Refunds & Cancellations
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Refunds and cancellations for digital products are governed by
              our Refund & Cancellation Policy.
            </p>

            <Link
              href="/refund-policy"
              className="mt-5 inline-flex font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600"
            >
              View Refund & Cancellation Policy →
            </Link>
          </section>

          {/* 11 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              11. Privacy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Information collected through our website is handled according
              to our Privacy Policy.
            </p>

            <Link
              href="/privacy"
              className="mt-5 inline-flex font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600"
            >
              View Privacy Policy →
            </Link>
          </section>

          {/* 12 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              12. Website Use
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              You agree not to misuse the website, attempt to gain
              unauthorized access to our systems, interfere with the operation
              of the website, or use the website for unlawful purposes.
            </p>
          </section>

          {/* 13 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              13. Changes to These Terms
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may update these Terms & Conditions from time to time.
              Changes will be posted on this page with an updated revision
              date.
            </p>
          </section>

          {/* 14 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              14. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you have questions about these Terms & Conditions, our
              products, or an order, please contact us.
            </p>

            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Contact Us
            </Link>
          </section>

          {/* Footer note */}
          <div className="border-t border-gray-200 pt-8 text-sm leading-6 text-gray-500">
            <p>
              These Terms & Conditions are provided as a general website
              template and should be reviewed and adapted to your actual
              business, products, and applicable laws before publication.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}