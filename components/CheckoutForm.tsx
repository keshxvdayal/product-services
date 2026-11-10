'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowRight, Globe, Loader2, Lock, Mail, Pencil, User } from 'lucide-react'
import { COUNTRIES, POPULAR_COUNT, findCountry } from '@/lib/countries'

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
type Region = 'IN' | 'INTL' | ''

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
  const domain = email.slice(at + 1).toLowerCase()
  const fix = DOMAIN_FIXES[domain]
  return fix ? `${email.slice(0, at)}@${fix}` : null
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
  const [region, setRegion] = useState<Region>(initialCountry === 'IN' ? 'IN' : initialCountry ? 'INTL' : '')
  const [intlCountry, setIntlCountry] = useState(initialCountry && initialCountry !== 'IN' ? initialCountry : '')
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [step, setStep] = useState<'details' | 'review'>('details')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  // Restore saved details and guess the region from the timezone if needed.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      if (saved.name) setName(saved.name)
      if (saved.email) setEmail(saved.email)
    } catch {}
    if (!initialCountry) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      setRegion(tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' ? 'IN' : '')
    }
    // Warm up the payment script so the popup opens instantly.
    loadRazorpay()
  }, [initialCountry])

  const country = region === 'IN' ? 'IN' : region === 'INTL' ? intlCountry : ''
  const isIndia = region === 'IN'
  const priceLabel = region === '' ? '' : isIndia ? `₹${priceInr}` : `$${priceUsd}`

  useEffect(() => {
    onPriceChange?.(priceLabel)
  }, [priceLabel, onPriceChange])

  const emailSuggestion = useMemo(() => suggestEmail(email.trim()), [email])
  const errors = {
    email: !email.trim() ? 'Enter your email so we can send your guide.' : !EMAIL_RE.test(email.trim()) ? 'That email doesn’t look right.' : '',
    name: name.trim().length < 2 ? 'Enter your name.' : '',
    region: region === '' ? 'Choose where you’re paying from.' : '',
    country: region === 'INTL' && !intlCountry ? 'Select your country.' : '',
  }
  const busy = status !== 'idle'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (busy) return
    setTouched({ email: true, name: true, region: true, country: true })
    setError('')
    setNotice('')

    if (Object.values(errors).some(Boolean)) {
      setStep('details')
      const first = errors.region ? 'region-in' : errors.country ? 'country' : errors.email ? 'email' : 'name'
      document.getElementById(first)?.focus()
      return
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: cleanName, email: cleanEmail }))
    } catch {}

    if (step === 'details') {
      setStep('review')
      return
    }

    setStatus('creating')

    try {
      const loaded = await loadRazorpay()
      if (!loaded) {
        throw new Error('We couldn’t load the secure payment window. Check your connection and try again.')
      }

      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name: cleanName, email: cleanEmail, country }),
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
        prefill: { name: cleanName, email: cleanEmail },
        readonly: { email: true, name: true },
        theme: { color: '#4A1FA8' },
        modal: {
          confirm_close: true,
          ondismiss: () => {
            setStatus('idle')
            if (failedAttempt) setError(failedAttempt)
            else setNotice('Payment window closed. You haven’t been charged. Try again whenever you’re ready.')
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
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {step === 'details' && (
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-grape">Step 1 of 2 · Country &amp; contact</p>
      {/* REGION */}
      <fieldset>
        <legend className="mb-2 block text-sm font-bold text-ink">Where are you paying from?</legend>
        <div className="grid grid-cols-2 gap-3" role="radiogroup">
          {[
            { id: 'IN' as const, flag: '🇮🇳', label: 'India', price: `₹${priceInr}`, methods: 'UPI, cards, net banking' },
            { id: 'INTL' as const, flag: '🌍', label: 'Outside India', price: `$${priceUsd}`, methods: 'International cards' },
          ].map((opt) => {
            const selected = region === opt.id
            return (
              <button
                key={opt.id}
                id={opt.id === 'IN' ? 'region-in' : 'region-intl'}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={busy}
                onClick={() => {
                  setRegion(opt.id)
                  setError('')
                }}
                className={`rounded-2xl border-2 p-4 text-left transition ${
                  selected
                    ? 'border-ink bg-sun/25 shadow-sticker'
                    : touched.region && errors.region
                      ? 'border-red-400 bg-white'
                      : 'border-ink/15 bg-white hover:border-ink/40'
                }`}
              >
                <span className="flex items-center justify-between">
                  <span className="text-2xl" aria-hidden>{opt.flag}</span>
                  <span
                    className={`h-5 w-5 rounded-full border-2 ${selected ? 'border-ink bg-grape ring-2 ring-inset ring-white' : 'border-ink/30'}`}
                    aria-hidden
                  />
                </span>
                <span className="mt-2 block text-sm font-bold text-ink">{opt.label}</span>
                <span className="block text-2xl font-extrabold text-ink">{opt.price}</span>
                <span className="mt-1 block text-xs text-ink/55">{opt.methods}</span>
              </button>
            )
          })}
        </div>
        {touched.region && errors.region && <p className="mt-2 text-sm text-red-600">{errors.region}</p>}
      </fieldset>

      {region === 'INTL' && (
        <div className="animate-fade-up">
          <label htmlFor="country" className="mb-2 block text-sm font-bold text-ink">
            Country
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl">
              {findCountry(intlCountry)?.flag ?? <Globe size={20} className="text-ink/40" />}
            </span>
            <select
              id="country"
              value={intlCountry}
              disabled={busy}
              onChange={(e) => setIntlCountry(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, country: true }))}
              className={`${fieldBase} ${fieldState('country')} appearance-none pr-10 ${intlCountry ? '' : 'text-ink/40'}`}
            >
              <option value="" disabled>
                Select your country
              </option>
              <optgroup label="Popular">
                {COUNTRIES.slice(1, POPULAR_COUNT).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="More countries">
                {COUNTRIES.slice(POPULAR_COUNT).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          {touched.country && errors.country && <p className="mt-2 text-sm text-red-600">{errors.country}</p>}
        </div>
      )}

      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-ink">
          Email address
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
            aria-describedby="email-help"
            className={`${fieldBase} ${fieldState('email')}`}
          />
        </div>
        <div id="email-help" className="mt-2 text-sm">
          {emailSuggestion ? (
            <button
              type="button"
              onClick={() => setEmail(emailSuggestion)}
              className="rounded-lg bg-sun/30 px-2 py-1 text-ink"
            >
              Did you mean <strong>{emailSuggestion}</strong>?
            </button>
          ) : touched.email && errors.email ? (
            <p className="text-red-600">{errors.email}</p>
          ) : (
            <p className="text-ink/55">Your PDF is sent here. Double-check the spelling.</p>
          )}
        </div>
      </div>

      {/* NAME */}
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-bold text-ink">
          Your name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" size={20} />
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="First and last name"
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

        </div>
      )}

      {step === 'review' && (
        <div className="animate-fade-up space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-grape">Step 2 of 2 · Review &amp; pay</p>
          <dl className="divide-y-2 divide-ink/10 overflow-hidden rounded-2xl border-2 border-ink bg-white">
            {[
              { k: 'Country', v: `${findCountry(country)?.flag ?? ''} ${findCountry(country)?.name ?? ''}` },
              { k: 'Name', v: name.trim() },
              { k: 'Guide sent to', v: email.trim().toLowerCase() },
              { k: 'You pay', v: `${priceLabel} ${isIndia ? '(INR)' : '(USD)'}` },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between gap-4 px-4 py-3">
                <dt className="text-sm text-ink/60">{row.k}</dt>
                <dd className={`truncate text-right font-bold text-ink ${row.k === 'You pay' ? 'text-xl' : 'text-sm'}`}>{row.v}</dd>
              </div>
            ))}
          </dl>
          <p className="text-sm text-ink/60">
            {isIndia ? 'Pay with UPI, cards, net banking or wallets.' : 'Pay with any international Visa, Mastercard or Amex card.'}
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setStep('details')
              setError('')
              setNotice('')
            }}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-grape hover:underline disabled:opacity-50"
          >
            <Pencil size={14} /> Edit details
          </button>
        </div>
      )}

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

      {/* PAY */}
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
            {step === 'details' ? (
              <>Continue{priceLabel ? ` · ${priceLabel}` : ''}</>
            ) : (
              <>
                <Lock size={18} /> Pay {priceLabel} securely
              </>
            )}
            <ArrowRight className="transition group-hover:translate-x-1" size={20} />
          </>
        )}
      </button>

      <p className="text-center text-xs leading-5 text-ink/55">
        Payments are processed by Razorpay. We never see or store your card or UPI details. By paying you agree to our{' '}
        <a href="/terms" className="underline">terms</a> and <a href="/refund-policy" className="underline">refund policy</a>.
      </p>

      {/* Verifying overlay: stop people closing the tab mid-confirmation */}
      {status === 'verifying' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-grape-deep/90 p-6 backdrop-blur" role="alertdialog" aria-live="assertive">
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
