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
