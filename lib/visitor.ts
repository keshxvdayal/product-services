import { headers } from 'next/headers'
import { findCountry } from './countries'

/**
 * Best-effort country detection from hosting/CDN headers
 * (Vercel, Cloudflare, Netlify). Returns '' when unknown.
 */
export async function getVisitorCountry(): Promise<string> {
  const h = await headers()
  const raw =
    h.get('x-vercel-ip-country') ||
    h.get('cf-ipcountry') ||
    h.get('x-country') ||
    h.get('x-nf-country') ||
    ''
  const match = findCountry(raw)
  if (match) return match.code
  return raw && raw !== 'XX' ? 'OTHER' : ''
}
