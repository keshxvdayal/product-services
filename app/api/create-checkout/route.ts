import { NextResponse } from 'next/server'
import { getBook, priceFor } from '@/lib/catalog'
import { findCountry, normalizePhone } from '@/lib/countries'
import { resolveProductId } from '@/lib/products'
import { getRazorpay } from '@/lib/razorpay'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status })
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))

    const slug = String(body.slug ?? '').trim()
    const name = String(body.name ?? '').trim().slice(0, 120)
    const email = String(body.email ?? '').trim().toLowerCase().slice(0, 200)
    const country = String(body.country ?? '').trim().toUpperCase()
    const phone = normalizePhone(String(body.phone ?? '').slice(0, 30), country)

    const book = getBook(slug)
    if (!book) return fail('That guide could not be found.', 404)
    if (name.length < 2) return fail('Please enter your name.', 400)
    if (!EMAIL_RE.test(email)) return fail('Please enter a valid email address.', 400)
    if (!findCountry(country)) return fail('Please select your country.', 400)
    if (!phone) return fail('Please enter a valid phone number.', 400)

    // Price is decided on the server from the catalog, never from the browser.
    const price = priceFor(book, country)
    const productId = await resolveProductId(book.slug)

    const order = await getRazorpay().orders.create({
      amount: Math.round(price.amount * 100),
      currency: price.currency,
      receipt: `np_${Date.now()}`,
      notes: {
        product_id: productId,
        product_slug: book.slug,
        product_title: book.title,
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        country,
      },
    })

    return NextResponse.json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      order: { id: order.id, amount: order.amount, currency: order.currency },
      product: { slug: book.slug, title: book.title },
      phone,
    })
  } catch (error) {
    console.error('CREATE CHECKOUT ERROR:', error)
    return fail('We could not start your checkout. Please try again in a moment.', 500)
  }
}
