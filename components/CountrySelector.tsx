'use client'

interface CountrySelectorProps {
  value: string
  onChange: (value: string) => void
}

export default function CountrySelector({
  value,
  onChange,
}: CountrySelectorProps) {
  return (
    <div>
      <label
        htmlFor="country"
        className="mb-2 block text-sm font-medium"
      >
        Country
      </label>

      <select
        id="country"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
        required
      >
        <option value="">Select your country</option>

        <option value="IN">India</option>

        <option value="US">United States</option>
        <option value="GB">United Kingdom</option>
        <option value="CA">Canada</option>
        <option value="AU">Australia</option>
        <option value="AE">United Arab Emirates</option>
        <option value="SG">Singapore</option>

        <option value="OTHER">Other</option>
      </select>
    </div>
  )
}