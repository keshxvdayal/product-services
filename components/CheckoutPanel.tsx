'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Check, FileText, Mail, RefreshCw, ShieldCheck } from 'lucide-react'
import CheckoutForm from './CheckoutForm'

type Props = {
  slug: string
  title: string
  subtitle: string
  cover: string
  pages: number
  includes: string[]
  priceInr: number
  priceUsd: number
  initialCountry: string
}

export default function CheckoutPanel(props: Props) {
  const [price, setPrice] = useState('')

  const trust = (
      <ul className="space-y-3 rounded-3xl border-2 border-ink/10 bg-white/60 p-5 text-sm text-ink/75">
          <li className="flex gap-3">
            <Mail size={18} className="shrink-0 text-grape" /> Delivered to your inbox within minutes of payment.
          </li>
          <li className="flex gap-3">
            <ShieldCheck size={18} className="shrink-0 text-grape" /> Encrypted checkout powered by Razorpay.
          </li>
          <li className="flex gap-3">
            <RefreshCw size={18} className="shrink-0 text-grape" /> Didn’t receive it? Email us and we’ll resend it.
          </li>
        </ul>
  )

  const summary = (
    <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-sticker-lg sm:p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink/55">Your order</p>
      <div className="mt-4 flex gap-4">
        <div className="relative aspect-[921/1316] w-20 shrink-0 overflow-hidden rounded-lg border border-ink/15 shadow-md sm:w-24">
          <Image src={props.cover} alt={`${props.title} cover`} fill sizes="96px" className="object-cover" priority />
        </div>
        <div className="min-w-0">
          <p className="text-lg font-extrabold leading-snug text-ink">{props.title}</p>
          <p className="mt-1 text-sm text-grape">{props.subtitle}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-cream-deep px-2.5 py-1 text-xs font-semibold text-ink/70">
            <FileText size={13} /> {props.pages}-page PDF
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-2 border-t-2 border-dashed border-ink/10 pt-5">
        {props.includes.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-ink/75">
            <Check size={16} className="mt-0.5 shrink-0 text-grape" strokeWidth={3} /> {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t-2 border-ink/10 pt-5">
        <span className="font-bold text-ink">Total</span>
        <span className="text-2xl font-extrabold text-ink">
          {price || (
            <span className="text-base font-semibold text-ink/50">
              ₹{props.priceInr} / ${props.priceUsd}
            </span>
          )}
        </span>
      </div>
      <p className="mt-1 text-right text-xs text-ink/50">One-time payment. No subscription.</p>
    </div>
  )

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_400px] lg:gap-12">
      <div className="order-2 lg:order-1">
        <div className="rounded-3xl border-2 border-ink/10 bg-white/70 p-5 sm:p-8">
          <h2 className="text-xl font-extrabold text-ink">Your details</h2>
          <p className="mt-1 text-sm text-ink/60">Takes about 30 seconds. No account needed.</p>
          <div className="mt-6">
            <CheckoutForm
              slug={props.slug}
              title={props.title}
              priceInr={props.priceInr}
              priceUsd={props.priceUsd}
              initialCountry={props.initialCountry}
              onPriceChange={setPrice}
            />
          </div>
        </div>
        <div className="mt-6 lg:hidden">{trust}</div>
      </div>

      <aside className="order-1 space-y-4 lg:sticky lg:top-6 lg:order-2">
        {summary}
        <div className="hidden lg:block">{trust}</div>
      </aside>
    </div>
  )
}
