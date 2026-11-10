import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Inbox, MailSearch, MessageCircle } from 'lucide-react'
import Logo from '@/components/Logo'
import { BOOKS, getBook } from '@/lib/catalog'
import { getRazorpay } from '@/lib/razorpay'
import { SITE } from '@/lib/site'

export const metadata = {
  title: 'Thank you',
  robots: { index: false },
}

function maskEmail(email?: string) {
  if (!email || !email.includes('@')) return null
  const [user, domain] = email.split('@')
  const visible = user.slice(0, 2)
  return `${visible}${'•'.repeat(Math.max(1, Math.min(6, user.length - 2)))}@${domain}`
}

async function getOrder(orderId?: string) {
  if (!orderId || !/^order_[A-Za-z0-9]+$/.test(orderId)) return null
  try {
    const order = await getRazorpay().orders.fetch(orderId)
    const notes = (order.notes ?? {}) as Record<string, string>
    return {
      paid: order.status === 'paid',
      slug: notes.product_slug,
      name: notes.customer_name,
      email: notes.customer_email,
      amount: Number(order.amount) / 100,
      currency: order.currency,
    }
  } catch (error) {
    console.error('Order lookup failed:', error)
    return null
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const { order_id } = await searchParams
  const order = await getOrder(order_id)
  const book = getBook(order?.slug)
  const other = BOOKS.find((b) => b.slug !== book?.slug)
  const firstName = order?.name?.split(' ')[0]
  const masked = maskEmail(order?.email)
  const amount =
    order && (order.currency === 'INR' ? `₹${order.amount}` : `$${order.amount}`)

  return (
    <div className="min-h-screen bg-dots">
      <header className="border-b-2 border-ink bg-grape-deep">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-center px-4">
          <Logo />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="rounded-[32px] border-2 border-ink bg-white p-6 text-center shadow-sticker-lg sm:p-10">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-mint">
            <CheckCircle2 size={34} className="text-ink" />
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {firstName ? `You’re all set, ${firstName}!` : 'Payment successful!'}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-ink/70">
            {book ? (
              <>
                <strong className="text-ink">{book.title}</strong> is on its way to{' '}
                <strong className="text-ink">{masked ?? 'your inbox'}</strong>.
              </>
            ) : (
              'Your guide is on its way to your inbox.'
            )}
          </p>

          {book && (
            <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-2xl bg-cream p-4 text-left">
              <div className="relative aspect-[921/1316] w-16 shrink-0 overflow-hidden rounded-md border border-ink/15">
                <Image src={book.cover} alt="" fill sizes="64px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1 text-sm">
                <p className="font-bold text-ink">{book.title}</p>
                <p className="text-ink/60">PDF · {book.pages} pages</p>
              </div>
              {amount && <p className="text-lg font-extrabold text-ink">{amount}</p>}
            </div>
          )}

          {order_id && (
            <p className="mt-4 text-xs text-ink/45">
              Order reference: <span className="font-mono">{order_id}</span>
            </p>
          )}
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-3">
          <li className="rounded-3xl border-2 border-ink/10 bg-white p-5">
            <Inbox className="text-grape" />
            <p className="mt-3 font-bold text-ink">Check your inbox</p>
            <p className="mt-1 text-sm text-ink/65">It usually arrives within a few minutes.</p>
          </li>
          <li className="rounded-3xl border-2 border-ink/10 bg-white p-5">
            <MailSearch className="text-grape" />
            <p className="mt-3 font-bold text-ink">Not there?</p>
            <p className="mt-1 text-sm text-ink/65">Look in Promotions or Spam, and search for “NudgePops”.</p>
          </li>
          <li className="rounded-3xl border-2 border-ink/10 bg-white p-5">
            <MessageCircle className="text-grape" />
            <p className="mt-3 font-bold text-ink">Still nothing after 30 min?</p>
            <p className="mt-1 text-sm text-ink/65">
              Email{' '}
              <a
                className="font-semibold text-grape underline"
                href={`mailto:${SITE.supportEmail}?subject=${encodeURIComponent(`Guide not received (${order_id ?? 'no order id'})`)}`}
              >
                {SITE.supportEmail}
              </a>{' '}
              with your order reference.
            </p>
          </li>
        </ol>

        <div className="mt-8 rounded-3xl border-2 border-sun bg-sun/15 p-5 text-sm text-ink/80">
          <strong className="text-ink">Your first nudge:</strong> open the guide tonight, read chapters 1 to 4 (about 30 minutes), and do the self-audit in chapter 5. That’s where the “aha” happens.
        </div>

        {other && (
          <Link
            href={`/products/${other.slug}`}
            className="group mt-8 flex items-center gap-5 rounded-3xl border-2 border-ink bg-white p-5 transition hover:-translate-y-1 hover:shadow-sticker"
          >
            <div className="relative aspect-[921/1316] w-20 shrink-0 overflow-hidden rounded-lg border border-ink/15">
              <Image src={other.cover} alt={other.title} fill sizes="80px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-grape">Next in the series</p>
              <p className="mt-1 font-bold text-ink">{other.title}</p>
              <p className="mt-1 text-sm text-ink/65">{other.hook}</p>
            </div>
            <ArrowRight className="shrink-0 text-ink transition group-hover:translate-x-1" />
          </Link>
        )}

        <p className="mt-10 text-center">
          <Link href="/" className="text-sm font-semibold text-grape hover:underline">
            Back to NudgePops
          </Link>
        </p>
      </main>
    </div>
  )
}
