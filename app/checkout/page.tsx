import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import CheckoutForm from '@/components/CheckoutForm'
import BuyerActivity from '@/components/BuyerActivity'
import Image from 'next/image'
import Link from 'next/link'

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>
}) {
  const { product } = await searchParams

  if (!product) {
    notFound()
  }

  const supabase = await createClient()

  const { data: productData, error } = await supabase
    .from('products')
    .select(
      `
        id,
        title,
        description,
        price_inr,
        price_usd,
        cover_url,
        active
      `
    )
    .eq('id', product)
    .eq('active', true)
    .single()

  if (error || !productData) {
    console.error('Product fetch error:', error)
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 selection:bg-indigo-500/30 selection:text-white">

      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div className="absolute -top-48 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-[150px]" />

        <div className="absolute right-[-220px] top-[25%] h-[500px] w-[500px] rounded-full bg-violet-600/[0.05] blur-[150px]" />

        <div className="absolute bottom-[-250px] left-[-180px] h-[550px] w-[550px] rounded-full bg-blue-600/[0.05] blur-[160px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.035),transparent_40%)]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#070A12]/80 backdrop-blur-2xl">

          <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

            {/* Back */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] transition group-hover:border-white/[0.14] group-hover:bg-white/[0.06]">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </span>

              <span className="hidden sm:inline">
                Back to guides
              </span>

              <span className="sm:hidden">
                Back
              </span>
            </Link>

            {/* Logo */}
            <Link
              href="/"
              className="group text-xl font-black tracking-[0.18em]"
            >
              <span className="bg-gradient-to-r from-white via-white to-indigo-400 bg-clip-text text-transparent">
                ZAVIO
              </span>

              <span className="text-indigo-500 transition group-hover:text-indigo-400">
                .
              </span>
            </Link>

            {/* Secure */}
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">

              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                >
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>

              <span className="hidden sm:inline">
                Secure checkout
              </span>

            </div>
          </div>
        </header>

        {/* ============================================================
            MAIN
        ============================================================ */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

          {/* ==========================================================
              HERO
          =========================================================== */}
          <div className="mx-auto mb-12 max-w-3xl text-center">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-indigo-300">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
              </span>

              Secure purchase
            </div>

            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Get instant access.
              <span className="mt-1 block bg-gradient-to-r from-indigo-300 via-violet-300 to-white bg-clip-text text-transparent">
                Start building today.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
              Complete your purchase below and receive your digital resource
              directly by email.
            </p>

          </div>

          {/* ==========================================================
              MAIN GRID
          =========================================================== */}
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">

            {/* ========================================================
                LEFT COLUMN
            ========================================================= */}
            <section className="lg:col-span-7">

              {/* ======================================================
                  PRODUCT IMAGE
              ======================================================= */}
              <div className="group relative">

                <div className="absolute -inset-1 rounded-[30px] bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-blue-500/20 opacity-50 blur-2xl transition duration-700 group-hover:opacity-80" />

                <div className="relative overflow-hidden rounded-[27px] border border-white/[0.09] bg-[#0D111C] p-2 shadow-2xl shadow-black/40">

                  <div className="relative aspect-[16/10] overflow-hidden rounded-[21px] bg-[#090C14] sm:aspect-[16/9]">

                    {productData.cover_url ? (
                      <Image
                        src={productData.cover_url}
                        alt={productData.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-600">
                        No preview available
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Preview badge */}
                    <div className="absolute bottom-4 left-4">

                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-xl">

                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]" />

                        Digital resource

                      </span>

                    </div>

                  </div>
                </div>
              </div>

              {/* ======================================================
                  PRODUCT INFORMATION
              ======================================================= */}
              <div className="mt-8">

                <div className="mb-4 flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-300">
                    Premium resource
                  </span>

                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-1 text-[10px] font-semibold text-emerald-300">
                    Instant delivery
                  </span>

                </div>

                <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
                  {productData.title}
                </h2>

                {productData.description && (
                  <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-400">
                    {productData.description}
                  </p>
                )}

                {/* ====================================================
                    BUYER ACTIVITY
                ===================================================== */}
                <BuyerActivity
                  productId={productData.id}
                  demo={true}
                />

              </div>

              {/* ======================================================
                  VALUE STACK
              ======================================================= */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">

                <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    Your purchase includes
                  </p>

                </div>

                <div className="divide-y divide-white/[0.05]">

                  {[
                    {
                      title: 'Full digital access',
                      description:
                        'Get the complete resource delivered directly to your email after payment.',
                    },
                    {
                      title: 'Lifetime updates',
                      description:
                        'Future improvements and additional material are included with your purchase.',
                    },
                    {
                      title: 'Ready-to-use resources',
                      description:
                        'Practical templates, workflows, examples and supporting material.',
                    },
                  ].map((item) => (

                    <div
                      key={item.title}
                      className="flex gap-4 px-5 py-5 sm:px-6"
                    >

                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-400/[0.07]">

                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-indigo-300"
                        >
                          <path d="m5 12 4 4L19 6" />
                        </svg>

                      </div>

                      <div>

                        <p className="text-sm font-bold text-slate-200">
                          {item.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  ))}

                </div>
              </div>

              {/* ======================================================
                  WHAT HAPPENS NEXT
              ======================================================= */}
              <div className="mt-5 rounded-2xl border border-white/[0.07] bg-[#0B0F19]/70 p-5 sm:p-6">

                <div className="mb-6">

                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                    What happens next
                  </p>

                </div>

                <div className="grid gap-6 sm:grid-cols-3">

                  {[
                    [
                      '01',
                      'Complete payment',
                      'Enter your details and securely complete checkout.',
                    ],
                    [
                      '02',
                      'Check your email',
                      'Your purchase confirmation and access details arrive by email.',
                    ],
                    [
                      '03',
                      'Start using it',
                      'Open your resource and start applying what you learned.',
                    ],
                  ].map(([number, title, description]) => (

                    <div key={number}>

                      <span className="text-[10px] font-black tracking-widest text-indigo-400">
                        {number}
                      </span>

                      <p className="mt-2 text-xs font-bold text-slate-200">
                        {title}
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-slate-500">
                        {description}
                      </p>

                    </div>

                  ))}

                </div>
              </div>

              {/* ======================================================
                  TRUST MESSAGE
              ======================================================= */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.018] p-4">

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-400/[0.08]">

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-400"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>

                </div>

                <div>

                  <p className="text-xs font-semibold text-slate-300">
                    Your transaction is protected
                  </p>

                  <p className="mt-0.5 text-[11px] leading-5 text-slate-500">
                    Payment details are handled securely by our payment
                    processing infrastructure. Zavio does not store your
                    complete card details.
                  </p>

                </div>

              </div>

            </section>

            {/* ========================================================
                RIGHT COLUMN — CHECKOUT
            ========================================================= */}
            <aside className="lg:col-span-5 lg:sticky lg:top-[92px]">

              <div className="relative">

                {/* Checkout glow */}
                <div className="absolute -inset-2 rounded-[32px] bg-indigo-500/[0.07] blur-2xl" />

                <div className="relative overflow-hidden rounded-[27px] border border-white/[0.1] bg-[#0D111C]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl">

                  {/* top accent */}
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

                  <div className="p-5 sm:p-7">

                    {/* ==================================================
                        CHECKOUT HEADER
                    =================================================== */}
                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-400">
                          Order summary
                        </p>

                        <h3 className="mt-2 text-xl font-black tracking-tight text-white">
                          Complete your purchase
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          One secure payment. Instant digital access.
                        </p>

                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06]">

                        <svg
                          width="17"
                          height="17"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-400"
                        >
                          <rect x="3" y="11" width="18" height="10" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>

                      </div>

                    </div>

                    {/* ==================================================
                        PRODUCT MINI CARD
                    =================================================== */}
                    <div className="mt-6 flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">

                      <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-900">

                        {productData.cover_url ? (
                          <Image
                            src={productData.cover_url}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-900" />
                        )}

                      </div>

                      <div className="min-w-0">

                        <p className="line-clamp-2 text-xs font-bold leading-5 text-slate-200">
                          {productData.title}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-500">
                          Digital access · Lifetime updates
                        </p>

                      </div>

                    </div>

                    {/* ==================================================
                        PRICE CARD
                    =================================================== */}
                    {/* <div className="mt-5 rounded-2xl border border-white/[0.06] bg-[#080B13] p-5">

                      <div className="flex items-end justify-between gap-4">

                        <div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                            Total today
                          </p>

                          <p className="mt-1 text-[11px] text-slate-600">
                            One-time payment
                          </p>

                        </div>

                        <div className="text-right">

                          <div className="text-3xl font-black tracking-tight text-white">
                            ₹{productData.price_inr}
                          </div>

                          {productData.price_usd && (
                            <div className="mt-0.5 text-[11px] font-medium text-slate-500">
                              Approx. ${productData.price_usd} USD
                            </div>
                          )}

                        </div>

                      </div>

                      <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3 text-[11px]">

                        <span className="text-slate-500">
                          Lifetime updates
                        </span>

                        <span className="font-semibold text-emerald-400">
                          Included
                        </span>

                      </div>

                    </div> */}

                    {/* ==================================================
                        CHECKOUT FORM
                    =================================================== */}
                    <div className="mt-6">

                      <CheckoutForm
                        productId={productData.id}
                        priceInr={productData.price_inr}
                        priceUsd={Number(productData.price_usd)}
                      />

                    </div>

                    {/* ==================================================
                        SECURITY FEATURES
                    =================================================== */}
                    <div className="mt-6 grid grid-cols-3 gap-2">

                      {/* Secure */}
                      <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-2 py-3 text-center">

                        <svg
                          className="mx-auto text-slate-500"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="11" width="18" height="10" rx="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>

                        <p className="mt-1.5 text-[9px] font-semibold text-slate-500">
                          Secure
                        </p>

                      </div>

                      {/* One-time */}
                      <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-2 py-3 text-center">

                        <svg
                          className="mx-auto text-slate-500"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v20" />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
                        </svg>

                        <p className="mt-1.5 text-[9px] font-semibold text-slate-500">
                          One-time
                        </p>

                      </div>

                      {/* Email */}
                      <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-2 py-3 text-center">

                        <svg
                          className="mx-auto text-slate-500"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />
                          <path d="m3 7 9 6 9-6" />
                        </svg>

                        <p className="mt-1.5 text-[9px] font-semibold text-slate-500">
                          Email delivery
                        </p>

                      </div>

                    </div>

                    {/* Fine print */}
                    <p className="mt-5 text-center text-[10px] leading-5 text-slate-600">
                      By completing your purchase, you agree to the applicable
                      terms and acknowledge that this is a digital product.
                    </p>

                  </div>
                </div>
              </div>
            </aside>

          </div>
        </main>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer className="mt-10 border-t border-white/[0.05] bg-[#05070D]">

          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-[11px] text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">

            <div>
              © 2026 Zavio. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">

              <span>
                Secure digital delivery
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />

              <a
                href="mailto:support@zavio.com"
                className="transition hover:text-slate-300"
              >
                support@zavio.com
              </a>

            </div>

          </div>

        </footer>

      </div>
    </div>
  )
}