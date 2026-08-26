'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    Razorpay: any
  }
}

type Props = {
  productId: string
  priceInr: number
  priceUsd: number
}

const COUNTRIES = [
  { code: 'IN', flag: '🇮🇳', name: 'India' },

  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand' },

  { code: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },

  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: 'IE', flag: '🇮🇪', name: 'Ireland' },

  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea' },

  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: 'VN', flag: '🇻🇳', name: 'Vietnam' },

  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico' },

  { code: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria' },

  { code: 'OTHER', flag: '🌍', name: 'Other Country' },
]

export default function CheckoutForm({
  productId,
  priceInr,
  priceUsd,
}: Props) {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  /*
   * Price is intentionally hidden until a country
   * has been selected.
   */
  const hasSelectedCountry = country !== ''

  const isIndia = country === 'IN'

  const selectedCountry = COUNTRIES.find(
    (item) => item.code === country
  )

  const displayPrice = isIndia
    ? `₹${priceInr}`
    : `$${priceUsd}`

  async function loadRazorpay() {
    return new Promise<boolean>((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }

      const existingScript = document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
      )

      if (existingScript) {
        existingScript.addEventListener('load', () =>
          resolve(true)
        )

        existingScript.addEventListener('error', () =>
          resolve(false)
        )

        return
      }

      const script = document.createElement('script')

      script.src =
        'https://checkout.razorpay.com/v1/checkout.js'

      script.async = true

      script.onload = () => resolve(true)

      script.onerror = () => resolve(false)

      document.body.appendChild(script)
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (loading) return

    setError('')

    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    if (!country) {
      setError('Please select your country to continue.')
      return
    }

    setLoading(true)

    try {
      // ============================================================
      // 1. LOAD RAZORPAY
      // ============================================================

      const razorpayLoaded = await loadRazorpay()

      if (!razorpayLoaded) {
        throw new Error(
          'Unable to load the secure payment system. Please check your internet connection and try again.'
        )
      }

      // ============================================================
      // 2. CREATE CHECKOUT ORDER
      // ============================================================

      const response = await fetch(
        '/api/create-checkout',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            productId,
            name: name.trim(),
            email: email.trim(),
            country,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.error ||
            'We could not create your checkout. Please try again.'
        )
      }

      // ============================================================
      // 3. RAZORPAY OPTIONS
      // ============================================================

      const options = {
        key: data.keyId,

        amount: data.order.amount,

        currency: data.order.currency,

        name: 'Zavio',

        description: data.product.title,

        order_id: data.order.id,

        prefill: {
          name: name.trim(),
          email: email.trim(),
        },

        notes: {
          product_id: productId,
          customer_name: name.trim(),
          customer_email: email.trim(),
          country,
        },

        theme: {
          color: '#6366f1',
        },

        modal: {
          ondismiss: function () {
            setLoading(false)
          },
        },

        // ==========================================================
        // PAYMENT SUCCESS
        // ==========================================================

        handler: async function (paymentResponse: any) {
          try {
            const verificationResponse = await fetch(
              '/api/verify-payment',
              {
                method: 'POST',

                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  razorpay_order_id:
                    paymentResponse.razorpay_order_id,

                  razorpay_payment_id:
                    paymentResponse.razorpay_payment_id,

                  razorpay_signature:
                    paymentResponse.razorpay_signature,

                  productId,

                  name: name.trim(),

                  email: email.trim(),

                  country,
                }),
              }
            )

            const verification =
              await verificationResponse.json()

            if (
              !verificationResponse.ok ||
              !verification.success
            ) {
              throw new Error(
                verification.error ||
                  'Payment verification failed. Please contact support.'
              )
            }

            router.push(
              `/payment-success?order_id=${encodeURIComponent(
                paymentResponse.razorpay_order_id
              )}`
            )
          } catch (err) {
            setError(
              err instanceof Error
                ? err.message
                : 'Payment verification failed. Please contact support.'
            )

            setLoading(false)
          }
        },
      }

      // ============================================================
      // 4. CREATE RAZORPAY INSTANCE
      // ============================================================

      const razorpay = new window.Razorpay(options)

      // ============================================================
      // 5. PAYMENT FAILED
      // ============================================================

      razorpay.on(
        'payment.failed',
        function (response: any) {
          setError(
            response.error?.description ||
              'Payment failed. Please check your payment details and try again.'
          )

          setLoading(false)
        }
      )

      // ============================================================
      // 6. OPEN CHECKOUT
      // ============================================================

      razorpay.open()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )

      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      {/* ============================================================
          INTRO
      ============================================================ */}

      <div className="mb-1">

        <p className="text-xs font-semibold text-slate-400">
          Almost there
        </p>

        <p className="mt-1 text-[11px] leading-5 text-slate-600">
          Enter your details below. Your price will be shown
          based on your selected country.
        </p>

      </div>

      {/* ============================================================
          NAME
      ============================================================ */}

      <div>

        <label
          htmlFor="name"
          className="mb-2 block text-xs font-semibold text-slate-300"
        >
          Full name
        </label>

        <div className="group relative">

          <div className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-600 transition group-focus-within:text-indigo-400">

            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21a8 8 0 0 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>

          </div>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            required
            disabled={loading}
            className="h-[52px] w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-indigo-400/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-indigo-500/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
          />

        </div>

      </div>

      {/* ============================================================
          EMAIL
      ============================================================ */}

      <div>

        <label
          htmlFor="email"
          className="mb-2 block text-xs font-semibold text-slate-300"
        >
          Email address
        </label>

        <div className="group relative">

          <div className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-600 transition group-focus-within:text-indigo-400">

            <svg
              width="17"
              height="17"
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

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={loading}
            className="h-[52px] w-full rounded-xl border border-white/[0.08] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none placeholder:text-slate-700 transition focus:border-indigo-400/50 focus:bg-white/[0.04] focus:ring-4 focus:ring-indigo-500/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
          />

        </div>

        <p className="mt-1.5 text-[10px] text-slate-600">
          Your digital resource will be delivered to this email.
        </p>

      </div>

      {/* ============================================================
          COUNTRY
      ============================================================ */}

      <div>

        <div className="mb-2 flex items-center justify-between">

          <label
            htmlFor="country"
            className="text-xs font-semibold text-slate-300"
          >
            Country
          </label>

          {!hasSelectedCountry && (
            <span className="text-[10px] font-medium text-indigo-400">
              Required to see price
            </span>
          )}

        </div>

        <div className="relative">

          <span
            className={`pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-lg leading-none ${
              !selectedCountry
                ? 'opacity-40 grayscale'
                : ''
            }`}
          >
            {selectedCountry?.flag || '🌍'}
          </span>

          <select
            id="country"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
              setError('')
            }}
            disabled={loading}
            required
            className={`h-[52px] w-full appearance-none rounded-xl border bg-white/[0.025] pl-11 pr-11 text-sm outline-none transition disabled:cursor-not-allowed disabled:opacity-50 ${
              hasSelectedCountry
                ? 'border-indigo-400/25 text-white focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/[0.07]'
                : 'border-white/[0.08] text-slate-500 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/[0.07]'
            }`}
          >
            <option
              value=""
              disabled
              className="bg-[#0D111C] text-slate-500"
            >
              Select your country
            </option>

            <optgroup
              label="Popular countries"
              className="bg-[#0D111C]"
            >
              {COUNTRIES.slice(0, 9).map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                  className="bg-[#0D111C] text-white"
                >
                  {item.flag} {item.name}
                </option>
              ))}
            </optgroup>

            <optgroup
              label="More countries"
              className="bg-[#0D111C]"
            >
              {COUNTRIES.slice(9).map((item) => (
                <option
                  key={item.code}
                  value={item.code}
                  className="bg-[#0D111C] text-white"
                >
                  {item.flag} {item.name}
                </option>
              ))}
            </optgroup>
          </select>

          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">

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
              <path d="m6 9 6 6 6-6" />
            </svg>

          </div>

        </div>

      </div>

      {/* ============================================================
          PRICE REVEAL
          IMPORTANT: NOTHING HERE IS RENDERED BEFORE COUNTRY SELECTION
      ============================================================ */}

      {hasSelectedCountry ? (
        <div className="animate-[fadeIn_0.3s_ease-out] overflow-hidden rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.04] to-transparent">

          <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3">

            <div className="flex items-center gap-2.5">

              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-400/[0.1] text-lg">
                {selectedCountry?.flag}
              </span>

              <div>

                <p className="text-xs font-semibold text-slate-200">
                  Your price
                </p>

                <p className="text-[10px] text-slate-500">
                  For {selectedCountry?.name}
                </p>

              </div>

            </div>

            <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
              {isIndia ? 'INR' : 'USD'}
            </span>

          </div>

          <div className="flex items-end justify-between px-4 py-4">

            <div>

              <p className="text-[10px] text-slate-500">
                One-time payment
              </p>

              <p className="mt-1 text-3xl font-black tracking-tight text-white">
                {displayPrice}
              </p>

            </div>

            <div className="pb-1 text-right">

              <p className="text-[10px] font-medium text-emerald-400">
                ✓ Price confirmed
              </p>

              <p className="mt-1 text-[9px] text-slate-600">
                No subscription
              </p>

            </div>

          </div>

        </div>
      ) : (
        /* ==========================================================
           PRICE PLACEHOLDER
           DOES NOT REVEAL ANY PRICE
        ========================================================== */

        <div className="rounded-2xl border border-dashed border-white/[0.07] bg-white/[0.012] px-4 py-4">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.035]">

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-600"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v8" />
                <path d="M9 12h6" />
              </svg>

            </div>

            <div>

              <p className="text-xs font-semibold text-slate-400">
                Your price will appear here
              </p>

              <p className="mt-0.5 text-[10px] text-slate-600">
                Select your country to calculate your price.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* ============================================================
          ERROR
      ============================================================ */}

      {error && (
        <div className="flex gap-3 rounded-xl border border-red-400/15 bg-red-400/[0.06] p-4">

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-400/10">

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-red-400"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>

          </div>

          <div>

            <p className="text-xs font-semibold text-red-300">
              Something needs your attention
            </p>

            <p className="mt-1 text-[11px] leading-5 text-red-400/70">
              {error}
            </p>

          </div>

        </div>
      )}

      {/* ============================================================
          PAYMENT BUTTON
      ============================================================ */}

      <button
        type="submit"
        disabled={loading || !hasSelectedCountry}
        className={`group relative flex h-[56px] w-full items-center justify-center overflow-hidden rounded-xl px-6 text-sm font-bold text-white transition duration-300 ${
          !hasSelectedCountry || loading
            ? 'cursor-not-allowed bg-slate-800/70 text-slate-500'
            : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-600/30'
        }`}
      >

        {!loading && hasSelectedCountry && (
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent transition duration-700 group-hover:translate-x-full" />
        )}

        {loading ? (
          <span className="relative flex items-center gap-2.5">

            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            Opening secure payment...

          </span>
        ) : !hasSelectedCountry ? (
          <span className="flex items-center gap-2">
            Select country to continue
          </span>
        ) : (
          <span className="relative flex items-center gap-2">

            Pay {displayPrice}

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

          </span>
        )}

      </button>

      {/* ============================================================
          TRUST ROW
      ============================================================ */}

      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 text-[10px] text-slate-600">

        <span className="flex items-center gap-1.5">

          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-500/70"
          >
            <rect
              x="3"
              y="11"
              width="18"
              height="10"
              rx="2"
            />

            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>

          Secure checkout

        </span>

        <span className="h-1 w-1 rounded-full bg-slate-700" />

        <span>Instant delivery</span>

        <span className="h-1 w-1 rounded-full bg-slate-700" />

        <span>One-time payment</span>

      </div>

      {/* ============================================================
          DELIVERY INFORMATION
      ============================================================ */}

      <div className="rounded-xl border border-white/[0.05] bg-white/[0.018] px-4 py-3">

        <div className="flex items-start gap-3">

          <div className="mt-0.5 text-indigo-400">

            <svg
              width="15"
              height="15"
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

          <p className="text-[10px] leading-5 text-slate-600">
            After successful payment, your digital resource and
            purchase information will be delivered directly to
            <span className="text-slate-400">
              {' '}
              {email || 'your email address'}
            </span>
            .
          </p>

        </div>

      </div>
    </form>
  )
}