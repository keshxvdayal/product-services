import { createClient } from '@/lib/supabase/server'

/**
 * Looks up the Supabase product id for a catalog slug, so the
 * Make.com delivery scenario keeps receiving the same productId
 * it already knows. Falls back to the slug if no row exists.
 */
export async function resolveProductId(slug: string): Promise<string> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('id')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle()
    return data?.id ? String(data.id) : slug
  } catch (error) {
    console.error('Product id lookup failed:', error)
    return slug
  }
}

/** Legacy links used ?product=<supabase id>; map them back to a slug. */
export async function slugForProductId(id: string): Promise<string | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('products')
      .select('slug')
      .eq('id', id)
      .maybeSingle()
    return data?.slug ?? null
  } catch {
    return null
  }
}
