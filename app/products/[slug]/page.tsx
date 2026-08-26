import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import BuyButton from '@/components/BuyButton'
import Image from 'next/image'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const supabase = await createClient()

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error || !product) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-2">

        {/* Product Cover */}
        <div>
          {product.cover_url ? (
            <Image
              src={product.cover_url}
              alt={product.title}
              width={800}
              height={1000}
              className="w-full rounded-2xl object-cover"
              priority
            />
          ) : (
            <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-gray-100">
              <span className="text-sm text-gray-400">
                No cover image
              </span>
            </div>
          )}
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-4xl font-bold">
            {product.title}
          </h1>

          {product.description && (
            <p className="mt-6 text-gray-600">
              {product.description}
            </p>
          )}

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              India
            </p>

            <p className="text-3xl font-bold">
              ₹{product.price_inr}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              International
            </p>

            <p className="text-3xl font-bold">
              ${product.price_usd}
            </p>
          </div>

          <div className="mt-8">
            <BuyButton productId={product.id} />
          </div>
        </div>

      </div>
    </main>
  )
}