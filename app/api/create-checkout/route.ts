import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { createClient } from '@/lib/supabase/server'

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      productId,
      name,
      email,
      country,
    } = body

    console.log('Create checkout request:', {
      productId,
      name,
      email,
      country,
    })

    // Basic validation
    if (!productId || !name || !email || !country) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields.',
        },
        { status: 400 }
      )
    }

    // Get product from Supabase
    const supabase = await createClient()

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .eq('active', true)
      .single()

    if (productError || !product) {
      console.error('Product lookup error:', productError)

      return NextResponse.json(
        {
          success: false,
          error: 'Product not found.',
        },
        { status: 404 }
      )
    }

    // Decide price based on country
    const isIndia = country === 'IN'

    const amount = isIndia
      ? product.price_inr
      : Number(product.price_usd)

    const currency = isIndia ? 'INR' : 'USD'

    // Razorpay expects the smallest currency unit.
    // ₹299 => 29900 paise
    // $19 => 1900 cents
    const razorpayAmount = Math.round(amount * 100)

    console.log('Payment calculation:', {
      productId: product.id,
      amount,
      razorpayAmount,
      currency,
      country,
    })

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: razorpayAmount,
      currency,
      receipt: `zavio_${Date.now()}`,
      notes: {
        product_id: product.id,
        customer_name: name,
        customer_email: email,
        country,
      },
    })

    console.log('Razorpay order created:', razorpayOrder.id)

    // Return order information to browser
    return NextResponse.json({
      success: true,

      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },

      product: {
        id: product.id,
        title: product.title,
      },

      customer: {
        name,
        email,
        country,
      },

      keyId: process.env.RAZORPAY_KEY_ID,
    })

  } catch (error) {
    console.error('CREATE CHECKOUT ERROR:', error)

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'Unable to create payment checkout.',
      },
      { status: 500 }
    )
  }
}