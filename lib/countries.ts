export type Country = { code: string; flag: string; name: string }

export const COUNTRIES: Country[] = [
  { code: 'IN', flag: '🇮🇳', name: 'India' },
  { code: 'US', flag: '🇺🇸', name: 'United States' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore' },
  { code: 'NZ', flag: '🇳🇿', name: 'New Zealand' },
  { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: 'QA', flag: '🇶🇦', name: 'Qatar' },
  { code: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', name: 'France' },
  { code: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: 'ES', flag: '🇪🇸', name: 'Spain' },
  { code: 'NL', flag: '🇳🇱', name: 'Netherlands' },
  { code: 'CH', flag: '🇨🇭', name: 'Switzerland' },
  { code: 'SE', flag: '🇸🇪', name: 'Sweden' },
  { code: 'NO', flag: '🇳🇴', name: 'Norway' },
  { code: 'DK', flag: '🇩🇰', name: 'Denmark' },
  { code: 'IE', flag: '🇮🇪', name: 'Ireland' },
  { code: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: 'MY', flag: '🇲🇾', name: 'Malaysia' },
  { code: 'ID', flag: '🇮🇩', name: 'Indonesia' },
  { code: 'PH', flag: '🇵🇭', name: 'Philippines' },
  { code: 'TH', flag: '🇹🇭', name: 'Thailand' },
  { code: 'VN', flag: '🇻🇳', name: 'Vietnam' },
  { code: 'NP', flag: '🇳🇵', name: 'Nepal' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'LK', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: 'PK', flag: '🇵🇰', name: 'Pakistan' },
  { code: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: 'ZA', flag: '🇿🇦', name: 'South Africa' },
  { code: 'NG', flag: '🇳🇬', name: 'Nigeria' },
  { code: 'KE', flag: '🇰🇪', name: 'Kenya' },
  { code: 'OTHER', flag: '🌍', name: 'Other country' },
]

export const POPULAR_COUNT = 9

export function findCountry(code: string | null | undefined) {
  if (!code) return undefined
  const upper = code.toUpperCase()
  return COUNTRIES.find((c) => c.code === upper)
}

export const DIAL_CODES: Record<string, string> = {
  IN: '91', US: '1', GB: '44', CA: '1', AU: '61', AE: '971', SG: '65', NZ: '64',
  SA: '966', QA: '974', DE: '49', FR: '33', IT: '39', ES: '34', NL: '31', CH: '41',
  SE: '46', NO: '47', DK: '45', IE: '353', JP: '81', KR: '82', MY: '60', ID: '62',
  PH: '63', TH: '66', VN: '84', NP: '977', BD: '880', LK: '94', PK: '92', BR: '55',
  MX: '52', ZA: '27', NG: '234', KE: '254',
}

/**
 * Normalises a phone number to +<countrycode><number>.
 * Returns '' if it doesn't look valid.
 */
export function normalizePhone(raw: string, country: string): string {
  const trimmed = raw.trim()
  const digits = trimmed.replace(/\D/g, '')
  if (!digits) return ''
  const dial = DIAL_CODES[country]

  let full: string
  if (trimmed.startsWith('+')) full = digits
  else if (digits.startsWith('00')) full = digits.slice(2)
  else if (dial) full = dial + digits.replace(/^0+/, '')
  else return ''

  if (country === 'IN' && full.startsWith('91')) {
    return /^91[6-9]\d{9}$/.test(full) ? `+${full}` : ''
  }
  return full.length >= 8 && full.length <= 15 ? `+${full}` : ''
}
