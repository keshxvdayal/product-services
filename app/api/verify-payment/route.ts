import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productId,
      name,
      email,
      country,
    } = body

    // ----------------------------------------
    // 1. Validate request
    // ----------------------------------------

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !productId ||
      !name ||
      !email ||
      !country
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing payment information.',
        },
        { status: 400 }
      )
    }

    // ----------------------------------------
    // 2. Verify Razorpay signature
    // ----------------------------------------

    const razorpaySecret =
      process.env.RAZORPAY_KEY_SECRET

    if (!razorpaySecret) {
      throw new Error(
        'RAZORPAY_KEY_SECRET is not configured.'
      )
    }

    const generatedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest('hex')

    const isValid =
      generatedSignature === razorpay_signature

    if (!isValid) {
      console.error('Invalid Razorpay signature')

      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification failed.',
        },
        { status: 400 }
      )
    }

    console.log(
      'Razorpay payment verified:',
      {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        productId,
        name,
        email,
        country,
      }
    )

    // ----------------------------------------
    // 3. Get product from Supabase
    // ----------------------------------------

    const supabase = await createClient()

    const {
      data: product,
      error: productError,
    } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('active', true)
      .single()

    if (productError || !product) {
      console.error(
        'Product lookup failed:',
        productError
      )

      return NextResponse.json(
        {
          success: false,
          error: 'Product not found.',
        },
        { status: 404 }
      )
    }

    // ----------------------------------------
    // 4. Determine amount and currency
    // ----------------------------------------

    const isIndia = country === 'IN'

    const amount = isIndia
      ? Number(product.price_inr)
      : Number(product.price_usd)

    const currency = isIndia
      ? 'INR'
      : 'USD'

    // ----------------------------------------
    // 5. Send payment to Make.com
    // ----------------------------------------

    const makeWebhookUrl =
      process.env.MAKE_PAYMENT_WEBHOOK_URL

    if (!makeWebhookUrl) {
      throw new Error(
        'MAKE_PAYMENT_WEBHOOK_URL is not configured.'
      )
    }

    /*
     * IMPORTANT:
     *
     * These field names MUST match the fields
     * your Make webhook is expecting.
     */

    const webhookPayload = {
      event: 'payment.success',

      orderId: razorpay_order_id,

      productId: product.id,

      firstName: name,

      email,

      country,

      amount,

      currency,

      paymentProvider: 'razorpay',

      paymentId: razorpay_payment_id,

      paymentStatus: 'paid',
    }

    console.log(
      'Sending payment to Make:',
      webhookPayload
    )

    const makeResponse = await fetch(
      makeWebhookUrl,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(webhookPayload),
      }
    )

    const makeResponseText =
      await makeResponse.text()

    console.log(
      'Make response:',
      makeResponse.status,
      makeResponseText
    )

    if (!makeResponse.ok) {
      console.error(
        'Make webhook failed:',
        makeResponseText
      )

      throw new Error(
        'Payment verified, but automation could not be triggered.'
      )
    }

    // ----------------------------------------
    // 6. Success
    // ----------------------------------------

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      orderId: razorpay_order_id,
    })
  } catch (error) {
    console.error(
      'PAYMENT VERIFICATION ERROR:',
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Payment verification failed.',
      },
      { status: 500 }
    )
  }
}