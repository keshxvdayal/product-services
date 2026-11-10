import Image from 'next/image'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import type { Book } from '@/lib/catalog'
import { priceFor } from '@/lib/catalog'

export default function BookCard({ book, country }: { book: Book; country: string }) {
  const price = priceFor(book, country === 'IN' ? 'IN' : 'US')

  return (
    <article className="group grid overflow-hidden rounded-[28px] border-2 border-ink bg-white shadow-sticker-lg transition duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#1A1238] sm:grid-cols-[42%_1fr]">
      {/* Cover fills its whole panel edge to edge: no empty side space */}
      <Link
        href={`/products/${book.slug}`}
        className="relative block aspect-[921/1316] overflow-hidden border-b-2 border-ink sm:aspect-auto sm:min-h-full sm:border-b-0 sm:border-r-2"
        aria-label={`Look inside ${book.title}`}
      >
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          sizes="(min-width: 768px) 240px, (min-width: 640px) 42vw, 100vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full border-2 border-ink bg-white px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
          Book {book.number}
        </span>
      </Link>

      <div className="flex flex-col p-5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-grape">{book.subtitle}</p>
        <h3 className="mt-1.5 text-xl font-extrabold leading-tight text-ink sm:text-2xl">
          <Link href={`/products/${book.slug}`} className="hover:text-grape">
            {book.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-6 text-ink/70">{book.hook}</p>

        <ul className="mt-4 space-y-2">
          {book.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-sm text-ink/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/30 text-ink">
                <Check size={13} strokeWidth={3} />
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <p className="text-3xl font-extrabold text-ink">
            {price.label} <span className="text-xs font-medium text-ink/55">one-time</span>
          </p>
          <div className="mt-3 flex gap-2">
            <Link
              href={`/checkout?book=${book.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border-2 border-ink bg-sun px-4 py-2.5 text-sm font-bold text-ink shadow-sticker transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
            >
              Buy now <ArrowRight size={16} />
            </Link>
            <Link
              href={`/products/${book.slug}`}
              className="rounded-full border-2 border-ink px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-cream"
            >
              Look inside
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
