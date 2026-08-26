import { createClient } from '@/lib/supabase/server'

export async function getProducts() {
  const supabase = await createClient()

  const {
    data,
    error,
  } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    console.error('Supabase products error:', error)
    throw new Error('Unable to load products.')
  }

  return data
}

export async function getProductBySlug(
  slug: string
) {
  const supabase = await createClient()

  const {
    data,
    error,
  } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  if (error) {
    console.error('Supabase product error:', error)
    return null
  }

  return data
}