import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ChevronLeft, Lock } from 'lucide-react'
import Logo from '@/components/Logo'
import CheckoutPanel from '@/components/CheckoutPanel'
import { getBook } from '@/lib/catalog'
import { slugForProductId } from '@/lib/products'
import { getVisitorCountry } from '@/lib/visitor'

export const metadata = {
  title: 'Checkout',
  robots: { index: false },
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ book?: string; product?: string }>
}) {
  const { book: slug, product } = await searchParams

  // Support old links that used ?product=<supabase id>.
  if (!slug && product) {
    const legacySlug = await slugForProductId(product)
    if (legacySlug && getBook(legacySlug)) redirect(`/checkout?book=${legacySlug}`)
    notFound()
  }

  const book = getBook(slug)
  if (!book) notFound()

  const country = await getVisitorCountry()

  return (
    <div className="min-h-screen bg-dots">
      <header className="border-b-2 border-ink bg-grape-deep">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href={`/products/${book.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-white/75 hover:text-white"
          >
            <ChevronLeft size={18} /> <span className="hidden sm:inline">Back to guide</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <Logo />
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-mint">
            <Lock size={15} /> <span className="hidden sm:inline">Secure checkout</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          You’re one step away.
        </h1>
        <CheckoutPanel
          slug={book.slug}
          title={book.title}
          subtitle={book.subtitle}
          cover={book.cover}
          pages={book.pages}
          includes={book.includes.map((i) => i.title)}
          priceInr={book.priceInr}
          priceUsd={book.priceUsd}
          initialCountry={country}
        />
      </main>
    </div>
  )
}
