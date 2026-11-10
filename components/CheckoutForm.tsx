'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowRight, Globe, Loader2, Lock, Mail, Phone, User } from 'lucide-react'
import { COUNTRIES, DIAL_CODES, POPULAR_COUNT, findCountry, normalizePhone } from '@/lib/countries'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any
  }
}

type Props = {
  slug: string
  title: string
  priceInr: number
  priceUsd: number
  initialCountry: string
  onPriceChange?: (label: string) => void
}

type Status = 'idle' | 'creating' | 'awaiting' | 'verifying'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const STORAGE_KEY = 'np-checkout-details'

// Common typos people make in email domains.
const DOMAIN_FIXES: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.in': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outlook.co': 'outlook.com',
  'icloud.co': 'icloud.com',
  'rediffmail.co': 'rediffmail.com',
}

function suggestEmail(email: string) {
  const at = email.lastIndexOf('@')
  if (at < 1) return null
  const fix = DOMAIN_FIXES[email.slice(at + 1).toLowerCase()]
  return fix ? `${email.slice(0, at)}@${fix}` : null
}

/** Guess the buyer's country in the browser when the server couldn't. */
function guessCountry(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'IN'
    for (const lang of navigator.languages || [navigator.language]) {
      const match = findCountry(lang.split('-')[1])
      if (match && match.code !== 'IN') return match.code
    }
  } catch {}
  return ''
}

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true)
    const src = 'https://checkout.razorpay.com/v1/checkout.js'
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    const script = existing ?? document.createElement('script')
    script.addEventListener('load', () => resolve(true))
    script.addEventListener('error', () => resolve(false))
    if (!existing) {
      script.src = src
      script.async = true
      document.body.appendChild(script)
    }
  })
}

async function readJson(res: Response) {
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : {}
  } catch {
    return {}
  }
}

export default function CheckoutForm({ slug, title, priceInr, priceUsd, initialCountry, onPriceChange }: Props) {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState(initialCountry)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let saved: { name?: string; email?: string; phone?: string; country?: string } = {}
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    } catch {}
    if (saved.name) setName(saved.name)
    if (saved.email) setEmail(saved.email)
    if (saved.phone) setPhone(saved.phone)
    if (!initialCountry) setCountry(findCountry(saved.country)?.code ?? guessCountry())
    // Warm up the payment script so the popup opens instantly.
    loadRazorpay()
  }, [initialCountry])

  const isIndia = country === 'IN'
  const priceLabel = !country ? '' : isIndia ? `₹${priceInr}` : `$${priceUsd}`

  useEffect(() => {
    onPriceChange?.(priceLabel)
  }, [priceLabel, onPriceChange])

  const emailSuggestion = useMemo(() => suggestEmail(email.trim()), [email])
  const errors = {
    name: name.trim().length < 2 ? 'Enter your name.' : '',
    email: !email.trim()
      ? 'Enter your email so we can send your guide.'
      : !EMAIL_RE.test(email.trim())
        ? 'That email doesn’t look right.'
        : '',
    country: !country ? 'Select your country.' : '',
    phone: !phone.trim()
      ? 'Enter your phone number.'
      : country && !normalizePhone(phone, country)
        ? country === 'IN'
          ? 'Enter a valid 10-digit mobile number.'
          : 'Enter a valid phone number, with country code if needed.'
        : '',
  }
  const busy = status !== 'idle'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setTouched({ name: true, email: true, country: true, phone: true })
    setError('')
    setNotice('')

    if (Object.values(errors).some(Boolean)) {
      const first = errors.name ? 'name' : errors.email ? 'email' : errors.country ? 'country' : 'phone'
      document.getElementById(first)?.focus()
      return
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanPhone = normalizePhone(phone, country)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: cleanName, email: cleanEmail, phone: phone.trim(), country }))
    } catch {}

    setStatus('creating')

    try {
      const loaded = await loadRazorpay()
      if (!loaded) {
        throw new Error('We couldn’t load the secure payment window. Check your connection and try again.')
      }

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name: cleanName, email: cleanEmail, phone: cleanPhone, country }),
      })
      const data = await readJson(res)
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'We couldn’t start your checkout. Please try again.')
      }

      let failedAttempt = ''

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: 'NudgePops',
        description: title,
        image: `${window.location.origin}/brand/icon.png`,
        prefill: { name: cleanName, email: cleanEmail, contact: cleanPhone },
        readonly: { email: true, name: true, contact: true },
        theme: { color: '#4A1FA8' },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setStatus('idle')
            if (failedAttempt) setError(failedAttempt)
            else setNotice('Payment window closed. You haven’t been charged. Tap pay again whenever you’re ready.')
          },
        },
        handler: async (payment: {
          razorpay_order_id: string
          razorpay_payment_id: string
          razorpay_signature: string
        }) => {
          setStatus('verifying')
          try {
            const vRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payment),
            })
            const v = await readJson(vRes)
            if (!vRes.ok || !v.success) {
              throw new Error(
                (v.error || 'We couldn’t confirm your payment.') + ` Payment ID: ${payment.razorpay_payment_id}`
              )
            }
            router.push(`/payment-success?order_id=${encodeURIComponent(payment.razorpay_order_id)}`)
          } catch (err) {
            setStatus('idle')
            setError(err instanceof Error ? err.message : 'We couldn’t confirm your payment. Please contact support.')
          }
        },
      })

      rzp.on('payment.failed', (resp: { error?: { description?: string } }) => {
        failedAttempt =
          (resp.error?.description || 'Your payment didn’t go through.') +
          ' No money was taken. You can try again or use a different method.'
      })

      setStatus('awaiting')
      rzp.open()
    } catch (err) {
      setStatus('idle')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const fieldBase =
    'h-14 w-full rounded-2xl border-2 bg-white pl-12 pr-4 text-base text-ink outline-none transition placeholder:text-ink/35 focus:border-grape focus:ring-4 focus:ring-grape/15 disabled:opacity-60'
  const fieldState = (key: keyof typeof errors) =>
    touched[key] && errors[key] ? 'border-red-400' : 'border-ink/15 hover:border-ink/30'

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* NAME */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold text-ink">
          Full name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            disabled={busy}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={Boolean(touched.name && errors.name)}
            className={`${fieldBase} ${fieldState('name')}`}
          />
        </div>
        {touched.name && errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-ink">
          Email <span className="font-normal text-ink/55">(your PDF is sent here)</span>
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="you@example.com"
            value={email}
            disabled={busy}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={Boolean(touched.email && errors.email)}
            className={`${fieldBase} ${fieldState('email')}`}
          />
        </div>
        {emailSuggestion ? (
          <button
            type="button"
            onClick={() => setEmail(emailSuggestion)}
            className="mt-2 rounded-lg bg-sun/30 px-2 py-1 text-sm text-ink"
          >
            Did you mean <strong>{emailSuggestion}</strong>?
          </button>
        ) : (
          touched.email && errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      {/* COUNTRY: pre-filled from location; the price follows it automatically */}
      <div>
        <label htmlFor="country" className="mb-2 block text-sm font-bold text-ink">
          Country
        </label>
        <div className="relative">
          <Globe className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
          <select
            id="country"
            value={country}
            disabled={busy}
            onChange={(e) => {
              setCountry(e.target.value)
              setError('')
            }}
            onBlur={() => setTouched((t) => ({ ...t, country: true }))}
            aria-invalid={Boolean(touched.country && errors.country)}
            className={`${fieldBase} ${fieldState('country')} appearance-none pr-10 ${country ? '' : 'text-ink/40'}`}
          >
            <option value="" disabled>
              Select your country
            </option>
            {COUNTRIES.slice(0, POPULAR_COUNT).map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
            <option disabled>──────────</option>
            {COUNTRIES.slice(POPULAR_COUNT).map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.name}
              </option>
            ))}
          </select>
        </div>
        {touched.country && errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
      </div>

      {/* PHONE: Razorpay needs a contact number */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-bold text-ink">
          Phone number <span className="font-normal text-ink/55">(for payment receipts)</span>
        </label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
          {DIAL_CODES[country] && !phone.trim().startsWith('+') && (
            <span className="pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 text-base font-semibold text-ink/70">
              +{DIAL_CODES[country]}
            </span>
          )}
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder={country === 'IN' ? '98765 43210' : 'Phone number'}
            value={phone}
            disabled={busy}
            maxLength={20}
            onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, ''))}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            style={
              DIAL_CODES[country] && !phone.trim().startsWith('+')
                ? { paddingLeft: `${3.25 + (DIAL_CODES[country].length + 1) * 0.62}rem` }
                : undefined
            }
            className={`${fieldBase} ${fieldState('phone')}`}
          />
        </div>
        {touched.phone && errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
      </div>

      {/* MESSAGES */}
      {error && (
        <div role="alert" className="flex gap-3 rounded-2xl border-2 border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mt-0.5 shrink-0" size={18} />
          <p>{error}</p>
        </div>
      )}
      {notice && !error && (
        <div role="status" className="rounded-2xl border-2 border-ink/10 bg-cream-deep p-4 text-sm text-ink/80">
          {notice}
        </div>
      )}

      {/* ONE-CLICK PAY */}
      <button
        type="submit"
        disabled={busy}
        className="group flex h-16 w-full items-center justify-center gap-2 rounded-full border-2 border-ink bg-sun text-lg font-extrabold text-ink shadow-sticker transition hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
      >
        {status === 'creating' ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Opening secure payment…
          </>
        ) : status === 'awaiting' ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Complete payment in the popup
          </>
        ) : status === 'verifying' ? (
          <>
            <Loader2 className="animate-spin" size={20} /> Confirming payment…
          </>
        ) : (
          <>
            <Lock size={18} /> Pay {priceLabel || 'now'}
            <ArrowRight className="transition group-hover:translate-x-1" size={20} />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-5 text-ink/55">
        Secure payment by Razorpay. We never see your card or UPI details. By paying you agree to our{' '}
        <a href="/terms" className="underline">terms</a> and <a href="/refund-policy" className="underline">refund policy</a>.
      </p>

      {/* Verifying overlay: stop people closing the tab mid-confirmation */}
      {status === 'verifying' && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-grape-deep/90 p-6 backdrop-blur"
          role="alertdialog"
          aria-live="assertive"
        >
          <div className="max-w-sm rounded-3xl border-2 border-ink bg-white p-8 text-center shadow-sticker-lg">
            <Loader2 className="mx-auto animate-spin text-grape" size={40} />
            <p className="mt-5 text-xl font-extrabold text-ink">Payment received!</p>
            <p className="mt-2 text-sm text-ink/70">
              We’re confirming it and sending your guide to <strong>{email.trim()}</strong>. Please don’t close this page.
            </p>
          </div>
        </div>
      )}
    </form>
  )
}
