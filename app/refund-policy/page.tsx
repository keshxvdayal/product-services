import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Legal
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Refund & Cancellation Policy
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            This policy explains our approach to refunds and cancellations for
            digital products purchased through LearnWithZavio.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: August 27, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* 1 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              1. Digital Products
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              LearnWithZavio sells digital products, including ebooks, guides,
              and other downloadable educational resources.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Because digital products can be accessed or downloaded
              electronically after purchase, refund eligibility may differ
              from physical products.
            </p>
          </section>

          {/* 2 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              2. Refund Requests
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you have an issue with your purchase, please contact us as
              soon as possible using the email address or contact form on our
              website.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Please include the email address used during checkout and
              relevant order or payment information so that we can locate
              your transaction.
            </p>
          </section>

          {/* 3 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              3. Delivery Problems
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you successfully completed a payment but did not receive your
              digital product, please contact us before requesting a refund.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We will first attempt to resolve the delivery issue, including
              verifying the payment and resending or providing access to the
              purchased digital product where appropriate.
            </p>
          </section>

          {/* 4 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              4. Duplicate Payments
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you believe you have been charged more than once for the same
              purchase, please contact us with the relevant transaction
              details.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Duplicate transactions will be reviewed and, where confirmed,
              handled appropriately.
            </p>
          </section>

          {/* 5 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              5. Incorrect Email Address
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Customers are responsible for providing an accurate email
              address during checkout.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If you entered an incorrect email address, contact us as soon as
              possible. We will make reasonable efforts to help you receive
              your purchased product.
            </p>
          </section>

          {/* 6 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              6. Non-Receipt of Product
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Before contacting support about a missing ebook, please check
              your inbox, spam, junk, promotions, and other filtered folders.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If you still cannot find your purchase, contact us and provide
              your transaction details so we can investigate the issue.
            </p>
          </section>

          {/* 7 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              7. Refund Eligibility
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Refund requests are reviewed on a case-by-case basis, subject
              to applicable consumer protection laws and the circumstances of
              the transaction.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Nothing in this policy is intended to exclude or limit any
              rights that cannot legally be excluded or limited under
              applicable law.
            </p>
          </section>

          {/* 8 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              8. Refund Processing
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If a refund is approved, the refund will generally be processed
              through the applicable payment provider used for the original
              transaction.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The time required for the refunded amount to appear in your
              account may depend on the payment provider and your financial
              institution.
            </p>
          </section>

          {/* 9 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              9. Cancellations
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Orders for digital products may not be cancellable once the
              product has been delivered or access has been provided.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If you need to cancel an order, contact us as soon as possible
              after placing it. We will review the request based on the
              payment and delivery status of the order and applicable law.
            </p>
          </section>

          {/* 10 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              10. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              For refund, cancellation, payment, or delivery questions,
              please contact us through our Contact Us page.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Contact Us
            </Link>
          </section>

          {/* Important Note */}
          <div className="border-t border-gray-200 pt-8 text-sm leading-6 text-gray-500">
            <p>
              This Refund & Cancellation Policy is a general template and
              should be reviewed and adapted to your actual business,
              products, payment providers, and applicable laws before
              publication.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}