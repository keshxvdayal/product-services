import BookCard from '@/components/BookCard'
import { BOOKS } from '@/lib/catalog'
import { getVisitorCountry } from '@/lib/visitor'

export const metadata = { title: 'All guides' }

export default async function ProductsPage() {
  const country = await getVisitorCountry()
  const isIntl = country !== '' && country !== 'IN'

  return (
    <main className="bg-dots">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-grape">The Money Brain series</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">All guides</h1>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {BOOKS.map((book) => (
            <BookCard key={book.slug} book={book} country={isIntl ? 'US' : 'IN'} />
          ))}
        </div>
      </div>
    </main>
  )
}
