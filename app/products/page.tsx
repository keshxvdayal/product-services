import { getProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold">
        Digital Products
      </h1>

      {products.length === 0 ? (
        <p className="mt-10 text-gray-500">
          No products available.
        </p>
      ) : (
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </main>
  )
}