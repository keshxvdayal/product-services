'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'

type Item = { src: string; caption: string }

export default function PreviewGallery({ cover, title, previews }: { cover: string; title: string; previews: Item[] }) {
  const items: Item[] = [{ src: cover, caption: 'Cover' }, ...previews]
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % items.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom, items.length])

  const current = items[active]

  return (
    <div>
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="group relative block w-full overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-sticker-lg"
        aria-label={`Enlarge: ${current.caption}`}
      >
        <div className="relative aspect-[921/1316] w-full">
          <Image
            src={current.src}
            alt={`${title}: ${current.caption}`}
            fill
            sizes="(min-width: 1024px) 440px, 90vw"
            className="object-cover"
            priority
          />
        </div>
        <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-xs font-semibold text-white opacity-90 transition group-hover:opacity-100">
          <ZoomIn size={14} /> {active === 0 ? 'Zoom' : current.caption}
        </span>
      </button>

      <div className="mt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/60">Peek inside</p>
        <div className="grid grid-cols-4 gap-3">
          {items.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[921/1316] overflow-hidden rounded-lg border-2 transition ${
                i === active ? 'border-ink ring-2 ring-sun' : 'border-ink/20 opacity-75 hover:opacity-100'
              }`}
              aria-label={`Show ${item.caption}`}
              aria-pressed={i === active}
            >
              <Image src={item.src} alt="" fill sizes="110px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setZoom(false)}
            aria-label="Close preview"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            className="absolute left-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:left-6"
            onClick={(e) => {
              e.stopPropagation()
              setActive((i) => (i - 1 + items.length) % items.length)
            }}
            aria-label="Previous page"
          >
            <ChevronLeft size={26} />
          </button>
          <figure className="relative max-h-[90vh] w-full max-w-[min(620px,calc(90vh*0.7))]" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[921/1316] w-full overflow-hidden rounded-xl">
              <Image src={current.src} alt={current.caption} fill sizes="620px" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm font-medium text-white/80">
              {current.caption} · {active + 1} of {items.length}
            </figcaption>
          </figure>
          <button
            type="button"
            className="absolute right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 sm:right-6"
            onClick={(e) => {
              e.stopPropagation()
              setActive((i) => (i + 1) % items.length)
            }}
            aria-label="Next page"
          >
            <ChevronRight size={26} />
          </button>
        </div>
      )}
    </div>
  )
}
