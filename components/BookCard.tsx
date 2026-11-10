import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import type { Book } from '@/lib/catalog'
import { priceFor } from '@/lib/catalog'

export default function BookCard({ book, country }: { book: Book; country: string }) {
  const isIndia = country === 'IN'
  const main = priceFor(book, isIndia ? 'IN' : 'US')
  const other = isIndia ? `$${book.priceUsd} outside India` : `₹${book.priceInr} in India`

  return (
    <article className="group flex flex-col overflow-hidden rounded-[28px] border-2 border-ink bg-white shadow-sticker-lg transition duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#1A1238]">
      <Link
        href={`/products/${book.slug}`}
        className="relative flex h-56 justify-center overflow-hidden border-b-2 border-ink px-6 pt-6 sm:h-64"
        style={{ backgroundColor: book.accentSoft }}
      >
        <span className="absolute left-4 top-4 z-10 rounded-full border-2 border-ink bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink">
          Book {book.number}
        </span>
        <div className="relative aspect-[921/1316] w-40 shrink-0 overflow-hidden rounded-t-lg shadow-2xl ring-1 ring-black/10 transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-1.5deg] sm:w-44">
          <Image
            src={book.cover}
            alt={`${book.title} cover`}
            fill
            sizes="180px"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-grape">{book.subtitle}</p>
        <h3 className="mt-2 text-2xl font-extrabold leading-tight text-ink">
          <Link href={`/products/${book.slug}`} className="hover:text-grape">
            {book.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink/70">{book.hook}</p>

        <ul className="mt-5 space-y-2.5">
          {book.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2.5 text-sm text-ink/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/30 text-ink">
                <Check size={13} strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-7">
          <div>
            <p className="text-3xl font-extrabold text-ink">{main.label}</p>
            <p className="text-xs text-ink/55">One-time · {other}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/products/${book.slug}`}
              className="rounded-full border-2 border-ink px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-cream"
            >
              Look inside
            </Link>
            <Link
              href={`/checkout?book=${book.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-sun px-5 py-2.5 text-sm font-bold text-ink shadow-sticker transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Buy now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
