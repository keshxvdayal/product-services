import Link from 'next/link'

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    order_id?: string
  }>
}) {
  const { order_id } = await searchParams

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-white selection:bg-indigo-500 selection:text-white">

      {/* ============================================================
          AMBIENT BACKGROUND
      ============================================================ */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        {/* Top glow */}
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/[0.12] blur-[150px]" />

        {/* Green success glow */}
        <div className="absolute left-1/2 top-[18%] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-emerald-500/[0.07] blur-[120px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-180px] right-[-100px] h-[450px] w-[450px] rounded-full bg-violet-600/[0.07] blur-[150px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

      </div>

      {/* ============================================================
          PAGE
      ============================================================ */}

      <div className="relative z-10 flex min-h-screen flex-col">

        {/* ============================================================
            HEADER
        ============================================================ */}

        <header className="border-b border-white/[0.06] bg-[#070A12]/70 backdrop-blur-xl">

          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">

            <Link
              href="/"
              className="group flex items-center gap-2"
            >

              <span className="text-xl font-black tracking-[0.18em] text-white">
                ZAVIO
                <span className="text-indigo-500">.</span>
              </span>

            </Link>

            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />

              Payment confirmed

            </div>

          </div>

        </header>

        {/* ============================================================
            MAIN
        ============================================================ */}

        <section className="flex flex-1 items-center justify-center px-5 py-14 sm:px-6 sm:py-20">

          <div className="w-full max-w-[620px]">

            {/* ========================================================
                SUCCESS ICON
            ======================================================== */}

            <div className="flex justify-center">

              <div className="relative">

                {/* Outer glow */}
                <div className="absolute inset-[-18px] rounded-full bg-emerald-400/[0.08] blur-2xl" />

                {/* Pulse ring */}
                <div className="absolute inset-[-8px] animate-pulse rounded-full border border-emerald-400/10" />

                {/* Icon */}
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/20 bg-gradient-to-br from-emerald-400/[0.16] to-emerald-400/[0.04] shadow-[0_0_50px_rgba(52,211,153,0.12)]">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-[#06110D] shadow-[0_0_25px_rgba(52,211,153,0.35)]">

                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>

                  </div>

                </div>

              </div>

            </div>

            {/* ========================================================
                HEADLINE
            ======================================================== */}

            <div className="mt-10 text-center">

              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                  Payment successful
                </span>

              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Youre all set.
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400 sm:text-base">
                Thank you for your purchase. Your digital resource is
                being prepared and will be delivered to your email.
              </p>

            </div>

            {/* ========================================================
                ORDER CARD
            ======================================================== */}

            <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.025] shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">

              {/* Top accent */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

              <div className="p-5 sm:p-7">

                {/* Order heading */}

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Purchase receipt
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-200">
                      Your order has been confirmed
                    </p>

                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/10 bg-emerald-400/[0.06]">

                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-emerald-400"
                    >
                      <path d="M6 2h9l3 3v17H6z" />
                      <path d="M14 2v4h4" />
                      <path d="M9 13h6" />
                      <path d="M9 17h6" />
                    </svg>

                  </div>

                </div>

                {/* Divider */}

                <div className="my-6 h-px bg-white/[0.06]" />

                {/* Order ID */}

                {order_id ? (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#050810]/70 p-4">

                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">

                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                          Order ID
                        </p>

                        <p className="mt-2 break-all font-mono text-xs leading-5 text-slate-300">
                          {order_id}
                        </p>

                      </div>

                      <span className="shrink-0 rounded-lg border border-emerald-400/10 bg-emerald-400/[0.05] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        Confirmed
                      </span>

                    </div>

                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/[0.06] bg-[#050810]/70 p-4">

                    <p className="text-xs text-slate-500">
                      Your payment has been successfully processed.
                    </p>

                  </div>
                )}

                {/* ====================================================
                    DELIVERY STATUS
                ==================================================== */}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  {/* Email delivery */}

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-500/[0.08] text-indigo-400">

                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="5"
                            width="18"
                            height="14"
                            rx="2"
                          />
                          <path d="m3 7 9 6 9-6" />
                        </svg>

                      </div>

                      <div>

                        <p className="text-xs font-semibold text-slate-300">
                          Email delivery
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-600">
                          Being delivered shortly
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Digital access */}

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.018] p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/[0.08] text-emerald-400">

                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 3v12" />
                          <path d="m7 10 5 5 5-5" />
                          <path d="M5 21h14" />
                        </svg>

                      </div>

                      <div>

                        <p className="text-xs font-semibold text-slate-300">
                          Digital access
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-600">
                          Instant after delivery
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* ========================================================
                INBOX NOTICE
            ======================================================== */}

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-400/10 bg-amber-400/[0.035] px-4 py-4">

              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-400/[0.08]">

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-400"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>

              </div>

              <div>

                <p className="text-xs font-semibold text-slate-300">
                  Dont see the email?
                </p>

                <p className="mt-1 text-[11px] leading-5 text-slate-600">
                  Give it a few moments, then check your
                  <span className="text-slate-500">
                    {' '}spam, promotions, or updates
                  </span>{' '}
                  folder.

                </p>

              </div>

            </div>

            {/* ========================================================
                ACTIONS
            ======================================================== */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/products"
                className="group flex h-[52px] flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/25"
              >

                Browse more resources

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>

              </Link>

              <Link
                href="/"
                className="flex h-[52px] items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] px-6 text-sm font-semibold text-slate-300 transition hover:border-white/[0.14] hover:bg-white/[0.045] hover:text-white"
              >
                Back home
              </Link>

            </div>

            {/* ========================================================
                TRUST FOOTER
            ======================================================== */}

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-slate-600">

              <span className="flex items-center gap-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />

                Secure payment

              </span>

              <span className="h-1 w-1 rounded-full bg-slate-700" />

              <span>Digital delivery</span>

              <span className="h-1 w-1 rounded-full bg-slate-700" />

              <span>© 2026 Zavio</span>

            </div>

          </div>

        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}

        <footer className="border-t border-white/[0.05] px-6 py-5">

          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-[10px] text-slate-600 sm:flex-row">

            <p>
              Your purchase is complete and securely recorded.
            </p>

            <p>
              Need help?{' '}
              <a
                href="mailto:support@zavio.com"
                className="text-slate-500 transition hover:text-indigo-400"
              >
                support@zavio.com
              </a>
            </p>

          </div>

        </footer>

      </div>

    </main>
  )
}