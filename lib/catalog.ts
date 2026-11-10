/**
 * The NudgePops catalog.
 *
 * Prices live here (not in the browser) and are what the server charges.
 * To add a book: add an entry, put its cover/preview images in /public/books,
 * and add a matching row (same slug) to the Supabase `products` table.
 */

export const PRICE_INR = 299
export const PRICE_USD = 20

export type Book = {
  slug: string
  number: number
  series: string
  title: string
  subtitle: string
  hook: string
  description: string
  cover: string
  previews: { src: string; caption: string }[]
  pages: number
  format: string
  accent: string
  accentSoft: string
  highlights: string[]
  includes: { title: string; text: string }[]
  forYouIf: string[]
  chapters: { n: string; title: string; blurb: string }[]
  research: { stat: string; label: string; source: string }[]
  priceInr: number
  priceUsd: number
}

export const BOOKS: Book[] = [
  {
    slug: 'your-brain-doesnt-feel-card-money',
    number: 1,
    series: 'The Money Brain series',
    title: "Your Brain Doesn't Feel Card Money",
    subtitle: 'The Pain-of-Paying Playbook',
    hook: '10 science-backed tricks to stop overspending with cards & UPI.',
    description:
      'In a real MIT auction, people paying by card bid about twice as much as people paying cash for the same tickets. This guide explains why tap, UPI and one-click payments switch off your brain’s spending brake, shows you exactly where it is draining your salary, and gives you a 21-day plan to make money feel real again. No spreadsheets you’ll abandon in a week.',
    cover: '/books/card-money-p1.jpg',
    previews: [
      { src: '/books/card-money-p6.jpg', caption: 'The MIT experiment, in numbers' },
      { src: '/books/card-money-p13.jpg', caption: 'The pain-of-paying ladder' },
      { src: '/books/card-money-p24.jpg', caption: 'Trick 2: price it in hours and years' },
    ],
    pages: 42,
    format: 'PDF, phone & laptop friendly',
    accent: '#FFC93C',
    accentSoft: '#FFF1C7',
    highlights: [
      'Why UPI, tap and saved cards make you spend more',
      'A 45-minute spending x-ray to find your leak number',
      'The Cash Test and 9 more tricks, with exact setup steps',
      'A 21-day reset you can start tomorrow',
    ],
    includes: [
      { title: '30-day spending x-ray', text: 'Find how much left you without a real decision.' },
      { title: 'The 10 tricks', text: 'Each with why it works and step-by-step setup.' },
      { title: '21-day reset plan', text: 'See it, brake it, automate it. Ten minutes a day.' },
      { title: 'Ready-to-use toolkit', text: 'Phone settings checklist, scripts and planners.' },
    ],
    forYouIf: [
      'Your salary disappears by the 20th or 25th',
      'You pay for almost everything with UPI, cards or Pay Later',
      'You look at your statement and think, “When did I spend this?”',
      'You earn more than before but don’t feel richer',
    ],
    chapters: [
      { n: '01', title: 'The experiment that should change how you pay', blurb: 'MIT students bid twice as much by card.' },
      { n: '02', title: 'The pain of paying, and why cards switch it off', blurb: 'Your brain’s brake and accelerator.' },
      { n: '03', title: 'Why tap, UPI and one-click hurt the least', blurb: 'The less you see a payment, the more you spend.' },
      { n: '04', title: 'Six traps built into modern payments', blurb: 'Minimum due, no-cost EMI, BNPL, rewards and more.' },
      { n: '05', title: 'Your spending x-ray', blurb: 'Find exactly where your money leaks.' },
      { n: '06', title: 'The 10 tricks', blurb: 'The Cash Test, plus nine more ways to make money feel real.' },
      { n: '07', title: 'The 21-day reset', blurb: 'Three weeks to see it, brake it and automate it.' },
      { n: '08', title: 'Your situation', blurb: 'First job, couples, freelancers, students, festivals, abroad.' },
    ],
    research: [
      { stat: '+110%', label: 'more bid by card than cash for the same tickets', source: 'Prelec & Simester, MIT (2001)' },
      { stat: '74%', label: 'of surveyed Indians say UPI makes them spend more', source: 'IIIT Delhi survey (2024)' },
      { stat: '₹2.3L', label: 'paid to clear ₹50,000 on minimum dues alone', source: 'Worked example in chapter 4' },
    ],
    priceInr: PRICE_INR,
    priceUsd: PRICE_USD,
  },
  {
    slug: 'why-youre-still-broke-after-a-raise',
    number: 2,
    series: 'The Money Brain series',
    title: "Why You're Still Broke After a Raise",
    subtitle: 'The Lifestyle Inflation Escape Plan',
    hook: '10 science-backed fixes to make every raise actually count.',
    description:
      'You got the raise. By the 25th, the account looks the same as last year. This guide shows how lifestyle inflation quietly eats every increment, the psychology that makes it almost automatic, and a step-by-step system so your next raise improves both your life today and your future.',
    cover: '/books/still-broke-p1.jpg',
    previews: [
      { src: '/books/still-broke-p6.jpg', caption: 'How a 9% raise disappears' },
      { src: '/books/still-broke-p9.jpg', caption: 'The joy fades, the EMI stays' },
      { src: '/books/still-broke-p20.jpg', caption: 'Fix 1: save half of every raise' },
    ],
    pages: 38,
    format: 'PDF, phone & laptop friendly',
    accent: '#FFB547',
    accentSoft: '#FFEBCB',
    highlights: [
      'Where your raise leaks: the 7 creep zones',
      'A creep audit that measures your lifestyle inflation in rupees',
      '10 fixes, starting with “save half of every raise”',
      'A raise-day playbook for the first 7 and 90 days',
    ],
    includes: [
      { title: 'Creep audit', text: 'Your creep score, then-vs-now table and creep ratio.' },
      { title: 'The 10 fixes', text: 'Each with the reason it works and exact setup steps.' },
      { title: 'Raise-day playbook', text: 'What to do before, and in the 90 days after, a raise.' },
      { title: 'Ready-to-use toolkit', text: 'Raise allocator, upgrade ticket, scripts, cheat sheet.' },
    ],
    forYouIf: [
      'Your income has grown, but your savings haven’t',
      'You upgraded your phone, flat or bike and the thrill wore off fast',
      'You feel you “need” more money every year just to feel okay',
      'A raise, bonus or job switch is coming and you want it to count',
    ],
    chapters: [
      { n: '01', title: 'The raise that vanishes', blurb: 'Why a 9% hike can leave you feeling 0% richer.' },
      { n: '02', title: 'Why upgrades stop feeling good', blurb: 'Hedonic adaptation: the trap, and the key.' },
      { n: '03', title: 'The comparison trap', blurb: 'Why other people’s spending raises yours.' },
      { n: '04', title: 'Where your raise leaks: the 7 creep zones', blurb: 'And a guardrail for each.' },
      { n: '05', title: 'Your creep audit', blurb: 'Measure how much your lifestyle has grown.' },
      { n: '06', title: 'The 10 fixes', blurb: 'Let your life and your bank balance both get better.' },
      { n: '07', title: 'The raise-day playbook', blurb: 'The first 7 days and the first 90 days.' },
      { n: '08', title: 'Your situation', blurb: 'First job, job switch, couples, freelancers, abroad.' },
    ],
    research: [
      { stat: '3.5% → 13.6%', label: 'savings rate when people pre-committed future raises', source: 'Thaler & Benartzi, Save More Tomorrow (2004)' },
      { stat: '5.1%', label: 'of GDP: Indian household net financial savings, FY23', source: 'RBI data via Business Standard' },
      { stat: '₹23.9L', label: 'from saving half of every raise for 10 years (illustration)', source: 'Worked example in fix 1' },
    ],
    priceInr: PRICE_INR,
    priceUsd: PRICE_USD,
  },
]

export function getBook(slug: string | null | undefined) {
  if (!slug) return undefined
  return BOOKS.find((b) => b.slug === slug)
}

export function priceFor(book: Book, country: string) {
  const isIndia = country === 'IN'
  return {
    amount: isIndia ? book.priceInr : book.priceUsd,
    currency: (isIndia ? 'INR' : 'USD') as 'INR' | 'USD',
    label: isIndia ? `₹${book.priceInr}` : `$${book.priceUsd}`,
  }
}
