import Link from "next/link";

export default function ShippingDeliveryPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Delivery Information
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Shipping & Delivery Policy
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            LearnWithZavio provides digital ebooks and educational resources.
            This policy explains how your purchased digital products are
            delivered.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Last updated: August 27, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-8">

          {/* Digital Products */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              ↓
            </div>

            <h2 className="text-2xl font-semibold">
              1. Digital Products Only
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              LearnWithZavio currently sells digital products such as ebooks,
              guides, and other digital educational resources.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We do not ship physical products. Therefore, there are no
              physical shipping charges, delivery addresses, or courier
              services associated with our digital products.
            </p>
          </section>

          {/* Delivery Method */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              ✉
            </div>

            <h2 className="text-2xl font-semibold">
              2. Delivery Method
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              After your payment has been successfully completed and
              confirmed, your purchased digital product will be delivered
              electronically.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The ebook or digital product may be delivered to the email
              address provided during checkout or through a secure digital
              download link.
            </p>
          </section>

          {/* Delivery Time */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-900 text-xl text-white">
              ✓
            </div>

            <h2 className="text-2xl font-semibold">
              3. Delivery Time
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Digital products are normally delivered shortly after successful
              payment confirmation.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              In some cases, delivery may be delayed due to payment
              verification, technical issues, email delivery problems, or
              other circumstances outside our immediate control.
            </p>
          </section>

          {/* Email Address */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              4. Customer Email Address
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Customers are responsible for providing a correct and accessible
              email address during checkout.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If an incorrect email address is provided, delivery may not be
              successful. Please contact us if you entered an incorrect email
              address or did not receive your purchase.
            </p>
          </section>

          {/* Didn't Receive */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              5. Didn't Receive Your Ebook?
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you completed your payment but did not receive your digital
              product, please check your spam, junk, promotions, or other email
              folders first.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If the email is still not available, contact us with the email
              address used for the purchase and, where available, your order
              or payment details.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Contact Support
            </Link>
          </section>

          {/* Failed Payment */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              6. Failed or Pending Payments
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Digital products are delivered only after the applicable payment
              has been successfully processed and confirmed.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              If a payment is pending, failed, cancelled, or reversed, the
              digital product may not be delivered until the payment status is
              successfully confirmed.
            </p>
          </section>

          {/* International */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              7. International Customers
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              International customers receive their purchased digital
              products electronically in the same manner as other customers.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              There are no international shipping or customs charges because
              our products are delivered digitally and no physical goods are
              shipped.
            </p>
          </section>

          {/* No Physical Shipping */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              8. No Physical Shipping
            </h2>

            <div className="mt-5 rounded-2xl bg-gray-50 p-5">
              <p className="font-medium text-gray-900">
                All products sold through LearnWithZavio are digital.
              </p>

              <p className="mt-2 leading-7 text-gray-600">
                No physical item will be sent to your postal or delivery
                address.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              9. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you have any questions about digital product delivery or
              haven't received your purchase after successful payment, please
              contact our support team.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-xl border border-gray-900 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Contact Us
            </Link>
          </section>

          {/* Note */}
          <div className="border-t border-gray-200 pt-8 text-sm leading-6 text-gray-500">
            <p>
              This Shipping & Delivery Policy applies to the digital products
              currently offered by LearnWithZavio. If physical products are
              offered in the future, this policy will be updated accordingly.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}