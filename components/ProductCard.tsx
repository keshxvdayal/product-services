import Image from 'next/image'
import Link from 'next/link'

type Product = {
  id: string
  slug: string
  title: string
  description: string | null
  cover_url: string | null
}

export default function ProductCard({
  product,
}: {
  product: Product
}) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white">

      {/* Product Cover */}
      {product.cover_url ? (
        <Image
          src={product.cover_url}
          alt={product.title}
          width={800}
          height={1000}
          className="aspect-[4/5] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-gray-100">
          <span className="text-sm text-gray-400">
            No cover image
          </span>
        </div>
      )}

      {/* Product Information */}
      <div className="p-6">

        <h2 className="text-xl font-semibold">
          {product.title}
        </h2>

        {product.description && (
          <p className="mt-2 text-sm text-gray-600">
            {product.description}
          </p>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="mt-6 inline-block rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
        >
          View Product
        </Link>

      </div>
    </article>
  )
}