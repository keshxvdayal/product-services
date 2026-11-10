'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { href: '/#guides', label: 'Guides' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Checkout and the receipt page have their own focused header.
  if (pathname?.startsWith('/checkout') || pathname?.startsWith('/payment-success')) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-grape-deep/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm font-medium text-white/75 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-sun">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#guides"
            className="hidden rounded-full bg-sun px-5 py-2 text-sm font-bold text-ink shadow-[0_3px_0_0_#F5A623] transition hover:-translate-y-0.5 sm:inline-block"
          >
            Get the guides
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 pb-4 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 text-base font-medium text-white/85"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#guides"
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-full bg-sun py-3 text-center font-bold text-ink"
          >
            Get the guides
          </Link>
        </nav>
      )}
    </header>
  )
}
