import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-gray-900">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
            Legal
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            This Privacy Policy explains how LearnWithZavio collects, uses,
            and protects information when you visit our website or purchase
            our digital products.
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
              1. About This Privacy Policy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              LearnWithZavio respects your privacy and is committed to
              handling your personal information responsibly.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              This Privacy Policy explains what information we may collect,
              why we collect it, how it may be used, and the circumstances
              in which it may be shared with service providers.
            </p>
          </section>

          {/* 2 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              2. Information We Collect
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Depending on how you use our website, we may collect the
              following information:
            </p>

            <ul className="mt-5 space-y-3 text-gray-600">
              <li>
                <strong className="text-gray-900">Name:</strong> Used to
                identify and communicate with you.
              </li>

              <li>
                <strong className="text-gray-900">Email address:</strong>{" "}
                Used to communicate with you and deliver purchased digital
                products.
              </li>

              <li>
                <strong className="text-gray-900">Country:</strong> May be
                collected to determine the applicable product price,
                payment method, or transaction flow.
              </li>

              <li>
                <strong className="text-gray-900">Contact information:</strong>{" "}
                Information you voluntarily provide through our Contact Us
                form.
              </li>

              <li>
                <strong className="text-gray-900">Transaction information:</strong>{" "}
                Information associated with your purchase, such as product,
                order, and payment status.
              </li>
            </ul>
          </section>

          {/* 3 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              3. How We Use Your Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may use the information we collect to:
            </p>

            <ul className="mt-5 space-y-3 text-gray-600">
              <li>• Process and manage purchases.</li>
              <li>• Deliver purchased digital products by email.</li>
              <li>• Respond to customer questions and support requests.</li>
              <li>• Confirm payment and order status.</li>
              <li>• Prevent fraud, abuse, or unauthorized activity.</li>
              <li>• Maintain and improve our website and services.</li>
              <li>• Comply with applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          {/* 4 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              4. Payment Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Payments may be processed through third-party payment
              providers, including Razorpay for applicable Indian
              transactions and PayPal for applicable international
              transactions.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Payment providers may collect and process payment information
              according to their own privacy policies and terms.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We do not need to store your complete card, bank account, or
              other sensitive payment credentials on our website in order
              to process your purchase.
            </p>
          </section>

          {/* 5 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              5. Digital Product Delivery
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              When you purchase a digital product, we use the email address
              provided during checkout to deliver the purchased product or
              provide information necessary to access it.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We may use third-party automation and email services to help
              process orders and deliver digital products.
            </p>
          </section>

          {/* 6 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              6. Contact Form
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you contact us through our website, we may collect the
              information you submit, such as your name, email address,
              subject, and message.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              We use this information to respond to your request and provide
              customer support.
            </p>
          </section>

          {/* 7 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              7. Third-Party Service Providers
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may use trusted third-party services to operate our
              website, process payments, store data, automate workflows,
              and send emails.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              These services may process information on our behalf and may
              have their own privacy policies governing their use of your
              information.
            </p>

            <div className="mt-6 space-y-3 text-gray-600">
              <p>
                <strong className="text-gray-900">Payment processing:</strong>{" "}
                Razorpay and/or PayPal, depending on the transaction.
              </p>

              <p>
                <strong className="text-gray-900">Automation:</strong>{" "}
                Make.com may be used to automate order processing, email
                delivery, and customer communication.
              </p>
            </div>
          </section>

          {/* 8 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              8. Cookies & Technical Information
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our website or third-party services used by the website may
              use cookies or similar technologies to maintain functionality,
              understand website usage, improve performance, or provide
              security.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              The specific cookies and technologies used may depend on the
              services enabled on the website.
            </p>
          </section>

          {/* 9 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              9. Data Security
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We take reasonable measures to protect information submitted
              through our website against unauthorized access, misuse, loss,
              or disclosure.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              However, no method of transmitting or storing information
              electronically can be guaranteed to be completely secure.
            </p>
          </section>

          {/* 10 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              10. Data Retention
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may retain information for as long as reasonably necessary
              to provide our services, maintain transaction and customer
              records, resolve disputes, prevent fraud, and comply with
              applicable legal or accounting requirements.
            </p>
          </section>

          {/* 11 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              11. Your Choices
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              You may contact us regarding personal information you have
              provided to us, including questions about how your information
              is used or requests relating to your information, subject to
              applicable law.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Some information may need to be retained when required for
              legitimate business, legal, security, or transaction-related
              purposes.
            </p>
          </section>

          {/* 12 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              12. Children's Privacy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Our website and digital products are not specifically directed
              toward children. We do not knowingly request or collect
              personal information from children in violation of applicable
              law.
            </p>
          </section>

          {/* 13 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              13. Changes to This Privacy Policy
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              We may update this Privacy Policy from time to time to reflect
              changes to our services, technology, legal requirements, or
              business practices.
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Any updated version will be posted on this page with a revised
              "Last updated" date.
            </p>
          </section>

          {/* 14 */}
          <section className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-semibold">
              14. Contact Us
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              If you have questions about this Privacy Policy or how your
              information is handled, please contact us.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Contact Us
            </Link>
          </section>

          {/* Disclaimer */}
          <div className="border-t border-gray-200 pt-8 text-sm leading-6 text-gray-500">
            <p>
              This Privacy Policy is a general template and should be
              reviewed and adapted to your actual data practices, service
              providers, business structure, and applicable privacy laws
              before publication.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}