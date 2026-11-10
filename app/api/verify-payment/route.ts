import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { getRazorpay } from '@/lib/razorpay'

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status })
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb)
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const orderId = String(body.razorpay_order_id ?? '')
    const paymentId = String(body.razorpay_payment_id ?? '')
    const signature = String(body.razorpay_signature ?? '')

    if (!orderId || !paymentId || !signature) {
      return fail('Missing payment information.', 400)
    }

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) throw new Error('RAZORPAY_KEY_SECRET is not configured.')

    // 1. Verify the signature Razorpay gave the browser.
    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex')

    if (!safeEqual(expected, signature)) {
      console.error('Invalid Razorpay signature for order', orderId)
      return fail('We could not verify this payment. If money was taken, contact us with your payment ID.', 400)
    }

    // 2. Read product, customer and amount from the order we created,
    //    instead of trusting what the browser sends.
    const order = await getRazorpay().orders.fetch(orderId)
    const notes = (order.notes ?? {}) as Record<string, string>

    const webhookPayload = {
      event: 'payment.success',
      orderId,
      productId: notes.product_id,
      productSlug: notes.product_slug,
      productTitle: notes.product_title,
      firstName: notes.customer_name,
      email: notes.customer_email,
      country: notes.country,
      amount: Number(order.amount) / 100,
      currency: order.currency,
      paymentProvider: 'razorpay',
      paymentId,
      paymentStatus: 'paid',
    }

    // 3. Trigger delivery. The payment is already verified, so a delivery
    //    hiccup must not show the buyer a "payment failed" message.
    let deliveryQueued = false
    const makeWebhookUrl = process.env.MAKE_PAYMENT_WEBHOOK_URL

    if (makeWebhookUrl) {
      try {
        const res = await fetch(makeWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webhookPayload),
        })
        deliveryQueued = res.ok
        if (!res.ok) {
          console.error('Make webhook failed:', res.status, await res.text())
        }
      } catch (err) {
        console.error('Make webhook error:', err)
      }
    } else {
      console.error('MAKE_PAYMENT_WEBHOOK_URL is not configured. Order:', orderId)
    }

    return NextResponse.json({ success: true, orderId, deliveryQueued })
  } catch (error) {
    console.error('PAYMENT VERIFICATION ERROR:', error)
    return fail('Payment verification failed. If money was taken, contact us with your payment ID.', 500)
  }
}
