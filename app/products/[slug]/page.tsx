import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BookOpen, Check, FileText, Mail, ShieldCheck } from 'lucide-react'
import PreviewGallery from '@/components/PreviewGallery'
import Faq from '@/components/Faq'
import { BOOKS, getBook } from '@/lib/catalog'
import { getVisitorCountry } from '@/lib/visitor'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) return {}
  return {
    title: book.title,
    description: `${book.subtitle}. ${book.hook}`,
    openGraph: { images: [book.cover] },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = getBook(slug)
  if (!book) notFound()

  const country = await getVisitorCountry()
  const isIntl = country !== '' && country !== 'IN'
  const mainPrice = isIntl ? `$${book.priceUsd}` : `₹${book.priceInr}`
  const otherPrice = isIntl ? `₹${book.priceInr} in India` : `$${book.priceUsd} outside India`
  const other = BOOKS.find((b) => b.slug !== book.slug)
  const buyHref = `/checkout?book=${book.slug}`

  return (
    <main className="pb-24 lg:pb-0">
      {/* TOP */}
      <section className="bg-dots">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[440px_1fr] lg:gap-16 lg:py-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PreviewGallery cover={book.cover} title={book.title} previews={book.previews} />
          </div>

          <div>
            <nav className="text-sm text-ink/60" aria-label="Breadcrumb">
              <Link href="/#guides" className="hover:text-grape">Guides</Link> <span className="mx-1">/</span> Book {book.number}
            </nav>

            <p className="mt-4 inline-block rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
              {book.series} · Book {book.number}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">{book.title}</h1>
            <p className="mt-3 text-xl font-semibold text-grape">{book.subtitle}</p>
            <p className="mt-5 text-lg leading-8 text-ink/75">{book.description}</p>

            {/* Buy box */}
            <div className="mt-8 rounded-3xl border-2 border-ink bg-white p-6 shadow-sticker-lg">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-extrabold text-ink">{mainPrice}</p>
                  <p className="mt-1 text-sm text-ink/60">One-time payment · {otherPrice}</p>
                </div>
                <span className="rounded-full bg-mint/25 px-3 py-1 text-xs font-bold text-ink">Instant delivery</span>
              </div>
              <Link
                href={buyHref}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-sun py-4 text-lg font-bold text-ink shadow-sticker transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              >
                Get the guide <ArrowRight size={20} />
              </Link>
              <ul className="mt-5 grid gap-2.5 text-sm text-ink/75 sm:grid-cols-3">
                <li className="flex items-center gap-2"><FileText size={16} className="text-grape" /> {book.pages}-page PDF</li>
                <li className="flex items-center gap-2"><Mail size={16} className="text-grape" /> Emailed in minutes</li>
                <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-grape" /> Secure Razorpay</li>
              </ul>
            </div>

            {/* For you if */}
            <div className="mt-10">
              <h2 className="text-2xl font-extrabold text-ink">This guide is for you if…</h2>
              <ul className="mt-5 space-y-3">
                {book.forYouIf.map((line) => (
                  <li key={line} className="flex gap-3 text-base text-ink/85">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-sun">
                      <Check size={14} strokeWidth={3} />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* What you get */}
            <div className="mt-10">
              <h2 className="text-2xl font-extrabold text-ink">What you get</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {book.includes.map((item) => (
                  <div key={item.title} className="rounded-2xl border-2 border-ink/15 bg-white p-5">
                    <p className="font-bold text-ink">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-ink/70">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="border-y-2 border-ink bg-grape-deep text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sun">Backed by research</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {book.research.map((r) => (
              <div key={r.stat} className="rounded-3xl border border-white/10 bg-white/[0.05] p-6">
                <p className="text-4xl font-extrabold text-sun">{r.stat}</p>
                <p className="mt-3 leading-7 text-white/85">{r.label}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-white/45">{r.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTERS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-3">
          <BookOpen className="text-grape" />
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">What’s inside</h2>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {book.chapters.map((c) => (
            <li key={c.n} className="flex gap-4 rounded-2xl border-2 border-ink bg-white p-5">
              <span className="text-2xl font-extrabold text-sun-deep">{c.n}</span>
              <div>
                <p className="font-bold text-ink">{c.title}</p>
                <p className="mt-1 text-sm text-ink/65">{c.blurb}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-ink/60">Plus a toolkit, a one-page cheat sheet, and a full list of sources so you can check every study yourself.</p>
      </section>

      {/* FAQ + other book */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">FAQ</h2>
          <div className="mt-6">
            <Faq />
          </div>
        </div>

        {other && (
          <aside>
            <h2 className="text-3xl font-extrabold tracking-tight text-ink">Also in the series</h2>
            <Link
              href={`/products/${other.slug}`}
              className="group mt-6 flex gap-5 rounded-3xl border-2 border-ink bg-white p-5 transition hover:-translate-y-1 hover:shadow-sticker"
            >
              <div className="relative aspect-[921/1316] w-28 shrink-0 overflow-hidden rounded-lg border border-ink/20">
                <Image src={other.cover} alt={other.title} fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-grape">Book {other.number}</p>
                <p className="mt-1 text-lg font-bold leading-snug text-ink">{other.title}</p>
                <p className="mt-2 text-sm text-ink/65">{other.hook}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-grape group-hover:underline">
                  Look inside <ArrowRight size={14} />
                </p>
              </div>
            </Link>
          </aside>
        )}
      </section>

      {/* Mobile sticky buy bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-ink/60">{book.title}</p>
            <p className="text-xl font-extrabold text-ink">{mainPrice}</p>
          </div>
          <Link
            href={buyHref}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-sun px-5 py-3 text-sm font-bold text-ink"
          >
            Get the guide <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  )
}
