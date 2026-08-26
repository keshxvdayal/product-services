import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-lg text-center">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✓
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for your purchase.
          Your book will be sent to your email shortly.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-black px-6 py-3 font-semibold text-white"
        >
          Browse More Products
        </Link>

      </div>
    </main>
  )
}