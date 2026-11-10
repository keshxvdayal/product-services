import Link from 'next/link'
import Logo from './Logo'
import { SITE } from '@/lib/site'
import { BOOKS } from '@/lib/catalog'

export default function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6">
            {SITE.tagline} Short, science-backed money guides for people who are done wondering where their salary went.
          </p>
          <a href={`mailto:${SITE.supportEmail}`} className="mt-4 inline-block text-sm font-medium text-sun hover:underline">
            {SITE.supportEmail}
          </a>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Guides</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {BOOKS.map((b) => (
              <li key={b.slug}>
                <Link href={`/products/${b.slug}`} className="hover:text-sun">
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-white">Help & policies</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
            <li><Link href="/about" className="hover:text-sun">About</Link></li>
            <li><Link href="/contact" className="hover:text-sun">Contact</Link></li>
            <li><Link href="/terms" className="hover:text-sun">Terms</Link></li>
            <li><Link href="/privacy" className="hover:text-sun">Privacy</Link></li>
            <li><Link href="/refund-policy" className="hover:text-sun">Refunds</Link></li>
            <li><Link href="/shipping" className="hover:text-sun">Delivery</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 {SITE.name}. All rights reserved.</p>
          <p>Educational content, not financial advice.</p>
        </div>
      </div>
    </footer>
  )
}
