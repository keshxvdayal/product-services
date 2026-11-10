import Image from 'next/image'
import Link from 'next/link'

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="NudgePops home">
      <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-sun/70 transition group-hover:rotate-[-6deg] group-hover:scale-105">
        <Image src="/brand/logo.png" alt="" fill sizes="40px" className="object-cover" priority />
      </span>
      <span className={`text-xl font-extrabold tracking-tight ${dark ? 'text-ink' : 'text-white'}`}>
        Nudge<span className={dark ? 'text-grape' : 'text-sun'}>Pops</span>
      </span>
    </Link>
  )
}
