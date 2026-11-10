import { ChevronDown } from 'lucide-react'
import { SITE } from '@/lib/site'

export const DEFAULT_FAQ = [
  {
    q: 'How do I get the guide after paying?',
    a: 'Right after your payment is confirmed, the PDF is emailed to the address you enter at checkout. It usually arrives within a few minutes. Check your Promotions or Spam folder if you don’t see it.',
  },
  {
    q: 'How much does it cost?',
    a: 'Each guide is a one-time ₹299 in India, or $20 everywhere else. No subscription, no hidden fees.',
  },
  {
    q: 'How can I pay?',
    a: 'In India you can pay with UPI, debit or credit card, net banking or wallets. Outside India you can pay with an international card. Payments are processed securely by Razorpay; we never see your card details.',
  },
  {
    q: 'Can I read it on my phone?',
    a: 'Yes. The guides are PDFs designed to read comfortably on a phone, tablet or laptop, and they print well too.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. The guides are educational. They explain the psychology behind spending and give practical habits, backed by published research. For personal investment or tax decisions, talk to a qualified adviser.',
  },
  {
    q: 'I paid but didn’t get my email. What now?',
    a: 'Email ' + SITE.supportEmail + ' with your payment ID or the email you used, and we’ll send it over.',
  },
]

export default function Faq({ items = DEFAULT_FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y-2 divide-ink/10 overflow-hidden rounded-3xl border-2 border-ink bg-white">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-4 sm:px-7 sm:py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-ink marker:hidden">
            {item.q}
            <ChevronDown className="shrink-0 transition group-open:rotate-180" size={20} />
          </summary>
          <p className="mt-3 text-sm leading-6 text-ink/70">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
