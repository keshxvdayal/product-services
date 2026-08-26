'use client'

import { useEffect, useMemo, useState } from 'react'

type BuyerActivityProps = {
  productId: string
  demo?: boolean
}

function seededNumber(
  seed: string,
  min: number,
  max: number
) {
  let hash = 0

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }

  const normalized = Math.abs(Math.sin(hash))

  return Math.floor(
    normalized * (max - min + 1)
  ) + min
}

export default function BuyerActivity({
  productId,
  demo = false,
}: BuyerActivityProps) {
  const initialValue = useMemo(
    () => seededNumber(productId, 89, 115),
    [productId]
  )

  const [buyers, setBuyers] = useState(initialValue)

  useEffect(() => {
    if (!demo) return

    const interval = setInterval(() => {
      setBuyers((current) => {
        // Only increase — never decrease.
        // Randomly increase by 1–2 every 15 seconds.
        const increase = Math.random() > 0.75 ? 2 : 1

        return current + increase
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [demo])

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-400/15 bg-gradient-to-r from-emerald-400/[0.07] via-emerald-400/[0.035] to-transparent shadow-[0_0_30px_rgba(52,211,153,0.04)]">

      <div className="flex items-center gap-4 px-5 py-4 sm:px-6 sm:py-5">

        {/* =====================================================
            LIVE INDICATOR
        ====================================================== */}
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/[0.09]">

          <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-emerald-400/40" />

          <span className="relative h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />

        </div>

        {/* =====================================================
            TEXT
        ====================================================== */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">

            <p className="text-sm font-extrabold tracking-tight text-white sm:text-[15px]">
              {buyers} people have purchased this guide
            </p>

            <span className="inline-flex items-center rounded-full border border-emerald-400/15 bg-emerald-400/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-400">
              Live
            </span>

          </div>

          <p className="mt-1 text-[11px] leading-5 text-slate-400 sm:text-xs">
            Join other creators and builders already using this resource.
          </p>

        </div>

        {/* =====================================================
            ACTIVITY VISUAL
        ====================================================== */}
        <div className="hidden items-end gap-[3px] sm:flex">

          <span className="h-2.5 w-1 rounded-full bg-emerald-400/30" />

          <span className="h-4 w-1 rounded-full bg-emerald-400/40" />

          <span className="h-5 w-1 rounded-full bg-emerald-400/55" />

          <span className="h-7 w-1 rounded-full bg-emerald-400/75" />

          <span className="h-4 w-1 rounded-full bg-emerald-400/50" />

        </div>

      </div>
    </div>
  )
}