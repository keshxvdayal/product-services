import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Brain,
  ClipboardCheck,
  Mail,
  MousePointerClick,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wrench,
  CalendarCheck,
  FlaskConical,
  MapPin,
} from 'lucide-react'
import BookCard from '@/components/BookCard'
import Faq from '@/components/Faq'
import { BOOKS } from '@/lib/catalog'
import { getVisitorCountry } from '@/lib/visitor'

const RESEARCH = [
  {
    stat: '2×',
    text: 'MIT students bid about twice as much for the same tickets when paying by card instead of cash.',
    source: 'Prelec & Simester, MIT, 2001',
    color: 'bg-sun',
  },
  {
    stat: '74%',
    text: 'of people surveyed in India said UPI and digital payments make them spend more.',
    source: 'IIIT Delhi survey, 2024',
    color: 'bg-bubble',
  },
  {
    stat: '13.6%',
    text: 'average savings rate, up from 3.5%, when people committed part of future raises in advance.',
    source: 'Thaler & Benartzi, 2004',
    color: 'bg-mint',
  },
]

const INSIDE = [
  { icon: FlaskConical, title: 'The science, simply', text: 'Real studies from MIT, Stanford and Nobel laureates, explained in plain words.' },
  { icon: ClipboardCheck, title: 'A self-audit', text: 'A quiz and worksheet that put a rupee number on your own leaks.' },
  { icon: Wrench, title: '10 practical fixes', text: 'Each with why it works and exact setup steps you can do tonight.' },
  { icon: CalendarCheck, title: 'A ready plan', text: 'A day-by-day reset or playbook, so you’re never wondering what’s next.' },
  { icon: Sparkles, title: 'Toolkit & scripts', text: 'Cheat sheets, checklists and words for awkward money moments.' },
  { icon: MapPin, title: 'India-first', text: 'UPI, EMIs, appraisals and salaries in rupees, with notes for readers abroad.' },
]

export default async function HomePage() {
  const country = await getVisitorCountry()
  const isIndia = country === 'IN' || country === ''
  const priceLine = isIndia ? '₹299 per guide' : '$20 per guide'

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-grape-deep text-white">
        <div className="bg-stars absolute inset-0 opacity-80" />
        <div className="absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-grape-light/40 blur-[120px]" />
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-bubble/25 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pb-28 lg:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 px-4 py-1.5 text-sm font-semibold text-sun">
              <Brain size={16} /> Little nudges. Big realizations.
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Your money problem isn’t willpower.{' '}
              <span className="relative whitespace-nowrap text-sun">
                It’s your brain.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden>
                  <path d="M2 9c60-6 160-8 296-3" stroke="#FFC93C" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80">
              Short, science-backed guides that show why your salary disappears, and the small nudges that fix it. Read one in an evening. Feel the difference by payday.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#guides"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-sun px-7 py-4 text-base font-bold text-ink shadow-[4px_4px_0_0_#FF6F9F] transition hover:-translate-y-0.5"
              >
                Pick your guide <ArrowRight size={18} />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border-2 border-white/30 px-7 py-4 text-base font-semibold text-white transition hover:border-white hover:bg-white/5"
              >
                How it works
              </Link>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/75">
              <li className="flex items-center gap-2"><Mail size={16} className="text-mint" /> Instant PDF by email</li>
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-mint" /> Secure Razorpay checkout</li>
              <li className="flex items-center gap-2"><Sparkles size={16} className="text-mint" /> {priceLine}, one-time</li>
            </ul>
          </div>

          {/* Visual: mascot + covers */}
          <div className="relative mx-auto h-[420px] w-full max-w-[460px] sm:h-[480px]">
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/30 blur-3xl" />
            <div className="absolute left-0 top-10 w-[46%] rotate-[-8deg] overflow-hidden rounded-xl border-2 border-ink shadow-2xl transition hover:rotate-[-4deg]">
              <Image src={BOOKS[0].cover} alt={BOOKS[0].title} width={460} height={657} priority className="h-auto w-full" />
            </div>
            <div className="absolute right-0 top-2 w-[46%] rotate-[7deg] overflow-hidden rounded-xl border-2 border-ink shadow-2xl transition hover:rotate-[3deg]">
              <Image src={BOOKS[1].cover} alt={BOOKS[1].title} width={460} height={657} priority className="h-auto w-full" />
            </div>
            <div className="absolute bottom-0 left-1/2 w-[52%] -translate-x-1/2 animate-float">
              <div className="relative aspect-square overflow-hidden rounded-full border-4 border-sun shadow-glow">
                <Image src="/brand/logo.png" alt="NudgePops mascot" fill sizes="240px" className="object-cover" priority />
              </div>
            </div>
          </div>
        </div>

        <svg className="absolute bottom-0 left-0 w-full text-cream" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
          <path d="M0 60V30c240-30 480-30 720 0s480 30 720 0v30z" fill="currentColor" />
        </svg>
      </section>

      {/* GUIDES */}
      <section id="guides" className="bg-dots scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-grape">The Money Brain series</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Four guides. Four money traps fixed.
            </h2>
            <p className="mt-4 text-lg text-ink/70">
              Stop tap-and-forget spending, make your next raise count, stay invested when everyone screams “bubble”, and beat the sale-season traps.
            </p>
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {BOOKS.map((book) => (
              <BookCard key={book.slug} book={book} country={isIndia ? 'IN' : 'US'} />
            ))}
          </div>


        </div>
      </section>

      {/* RESEARCH NUDGES */}
      <section className="border-y-2 border-ink bg-ink text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sun">A few nudges from the guides</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              You’re not bad with money. Your payments are designed to feel painless.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {RESEARCH.map((r) => (
              <figure key={r.stat} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
                <span className={`inline-block rounded-2xl ${r.color} px-4 py-2 text-3xl font-extrabold text-ink`}>
                  {r.stat}
                </span>
                <blockquote className="mt-5 text-base leading-7 text-white/85">{r.text}</blockquote>
                <figcaption className="mt-4 text-xs font-medium uppercase tracking-wider text-white/45">{r.source}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-grape">Inside every guide</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Not a lecture. A system you can set up tonight.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INSIDE.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-3xl border-2 border-ink bg-white p-6 transition hover:-translate-y-1 hover:shadow-sticker">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-grape text-sun">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-20 bg-cream-deep">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-grape">How it works</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              From checkout to reading in about two minutes.
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: MousePointerClick, title: 'Pick a guide', text: 'Choose the leak you want to fix first. Or grab both.' },
              { icon: ShieldCheck, title: 'Pay securely', text: 'UPI, cards, net banking or wallets in India. International cards everywhere else.' },
              { icon: Smartphone, title: 'Read anywhere', text: 'Your PDF lands in your inbox right away. Read on your phone tonight.' },
            ].map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="relative rounded-3xl border-2 border-ink bg-white p-7 shadow-sticker">
                <span className="absolute -top-4 left-6 rounded-full border-2 border-ink bg-sun px-3 py-0.5 text-sm font-extrabold text-ink">
                  Step {i + 1}
                </span>
                <Icon className="mt-2 text-grape" size={28} />
                <h3 className="mt-4 text-xl font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Questions, answered</h2>
        <div className="mt-10">
          <Faq />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border-2 border-ink bg-grape px-6 py-14 text-center text-white shadow-sticker-lg sm:px-12">
          <div className="bg-stars absolute inset-0 opacity-70" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Make your next salary <span className="text-sun">feel different.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
              One evening of reading. A few small changes. Money left in the last week before payday.
            </p>
            <Link
              href="#guides"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun px-8 py-4 text-base font-bold text-ink shadow-[4px_4px_0_0_#1A1238] transition hover:-translate-y-0.5"
            >
              Choose your guide <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
