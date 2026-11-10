import { redirect } from 'next/navigation'

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id?: string }>
}) {
  const { order_id } = await searchParams
  redirect(order_id ? `/payment-success?order_id=${encodeURIComponent(order_id)}` : '/payment-success')
}
