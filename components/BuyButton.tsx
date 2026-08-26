'use client'

import { useRouter } from 'next/navigation'

interface BuyButtonProps {
  productId: string
}

export default function BuyButton({ productId }: BuyButtonProps) {
  const router = useRouter()

  function handleBuy() {
    router.push(`/checkout?product=${encodeURIComponent(productId)}`)
  }

  return (
    <button
      onClick={handleBuy}
      className="rounded-xl bg-black px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-800"
    >
      Buy Now
    </button>
  )
}