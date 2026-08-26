import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('id, title, slug, description, price_inr, price_usd, cover_url')
    .eq('active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load products:', error)
  }

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* BACKGROUND AMBIENT GLOWS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090D16]/70 border-b border-slate-800/80">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent hover:opacity-90 transition"
            >
              ZAVIO<span className="text-indigo-500">.</span>
            </Link>

            <nav className="flex items-center gap-6 text-sm font-medium">
              <a
                href="#products"
                className="text-slate-400 transition hover:text-white"
              >
                Products
              </a>
              <a
                href="#how-it-works"
                className="text-slate-400 transition hover:text-white"
              >
                How It Works
              </a>
            </nav>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden border-b border-slate-800/60 py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-4xl text-center">
              
              {/* BADGE */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs md:text-sm font-medium text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Digital knowledge. Delivered instantly.
              </div>

              {/* MAIN HEADING */}
              <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl lg:text-7xl leading-none">
                Learn something useful.
                <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Build something better.
                </span>
              </h1>

              <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl font-normal leading-relaxed">
                Practical digital guides and resources engineered to help you learn, build, and scale faster.
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="#products"
                  className="group relative inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] active:scale-95"
                >
                  Browse Products
                </a>

                <a
                  href="#how-it-works"
                  className="rounded-xl border border-slate-800 bg-slate-900/50 px-8 py-4 text-base font-semibold text-slate-300 backdrop-blur-md transition hover:border-slate-700 hover:bg-slate-800 hover:text-white active:scale-95"
                >
                  How It Works
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-indigo-400">
                Explore Catalog
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Digital Guides
              </h2>
            </div>
            <p className="text-slate-400 max-w-md">
              Pick a guide and get instant access sent straight to your inbox after checkout.
            </p>
          </div>

          {!products || products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 py-24 text-center">
              <p className="text-slate-500 font-medium text-lg">
                No guides available right now. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-slate-700 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* COVER IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                    {product.cover_url ? (
                      <Image
                        src={product.cover_url}
                        alt={product.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-900">
                        <span className="text-sm text-slate-600">No cover available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  </div>

                  {/* CARD CONTENT */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition">
                        {product.title}
                      </h3>

                      {product.description && (
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-slate-800/80 pt-4">
                      <div>
                        <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                          Price
                        </p>
                        <p className="text-2xl font-black text-white">
                          ₹{product.price_inr}
                        </p>
                      </div>

                      <Link
                        href={`/checkout?product=${encodeURIComponent(product.id)}`}
                        className="rounded-lg bg-slate-800 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 hover:shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                      >
                        Get Guide →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-y border-slate-800/60 bg-slate-950/50 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Simple Process
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                From purchase to reading in under 2 minutes.
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <Step
                number="01"
                title="Choose a guide"
                description="Browse our library and select the topic you'd like to master."
              />
              <Step
                number="02"
                title="Instant checkout"
                description="Secure payment handling via our high-speed checkout."
              />
              <Step
                number="03"
                title="Direct delivery"
                description="Receive instant access via email link and immediate download."
              />
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="relative overflow-hidden py-24">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-12 backdrop-blur-xl shadow-2xl">
              <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
                Ready to level up your skills?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-slate-400">
                Join thousands of builders learning faster with curated digital knowledge.
              </p>
              <a
                href="#products"
                className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
              >
                Explore All Guides
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/80 bg-[#060910]">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Zavio. All rights reserved.</p>
            <p className="text-slate-400">Digital knowledge, delivered instantly.</p>
          </div>
        </footer>
      </div>
    </main>
  )
}

/* STEP COMPONENT */
function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 backdrop-blur-sm transition duration-300 hover:border-slate-700">
      <div className="text-3xl font-black text-indigo-500/40">{number}</div>
      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
    </div>
  )
}