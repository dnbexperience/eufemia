import countries from '../constants/countries'

/**
 * Sorted list of unique numeric country dialing codes (longest first).
 *
 * Dashes in CDC values (e.g. "1-684") are stripped so every entry is
 * a pure digit string.  Sorting longest-first guarantees the most
 * specific code is matched first — this is safe because ITU E.164
 * country codes are prefix-free at each allocation length.
 */
const strippedCodes: Array<string> = Array.from(
  new Set(countries.map((c) => c.cdc.replace(/-/g, '')))
).sort((a, b) => b.length - a.length || a.localeCompare(b))

/**
 * Maps stripped digit strings back to the original dashed CDC format
 * used in `countries.ts` (e.g. "1684" → "1-684", "441481" → "44-1481").
 * Codes without dashes map to themselves (e.g. "47" → "47").
 */
const cdcFormatMap: Record<string, string> = Object.fromEntries(
  countries.map((c) => [c.cdc.replace(/-/g, ''), c.cdc])
)

/**
 * Detect the country dialing code from a phone number string that has
 * no separator between code and subscriber number.
 *
 * Uses a longest-prefix-match against every known E.164 country code
 * in the Eufemia countries list.
 *
 * @param value  A phone number string beginning with "+" or "00" (e.g. "+4712345678" or "004712345678").
 * @returns      An object with `countryCode` (e.g. "+47" or "+1-684" for
 *               dashed codes) and `phoneNumber` (e.g. "12345678"), or
 *               `undefined` when no known code could be detected.
 *
 * @example
 * detectCountryCode('+4712345678')
 * // => { countryCode: '+47', phoneNumber: '12345678' }
 *
 * detectCountryCode('004712345678')
 * // => { countryCode: '+47', phoneNumber: '12345678' }
 *
 * detectCountryCode('+16841234567')
 * // => { countryCode: '+1-684', phoneNumber: '1234567' }
 *
 * detectCountryCode('+hello')
 * // => undefined
 */
export type DetectedCountryCode = {
  countryCode: string
  phoneNumber: string
}

export default function detectCountryCode(
  value: string
): DetectedCountryCode | undefined {
  if (typeof value !== 'string') {
    return undefined
  }

  // Normalize "00" international dialing prefix to "+".
  //
  // The "00" prefix is the ITU-T recommended international call prefix
  // and is used across Europe (including Scandinavia), most of Asia,
  // Africa, and Oceania. This covers the vast majority of DNB's user base.
  //
  // Other countries use different prefixes (e.g. "011" in the US/Canada,
  // "0011" in Australia, "001" in Thailand/Singapore, "010" in Japan).
  // We intentionally do NOT support these because they create ambiguous
  // interpretations — for example, "0014712345678" could be either:
  //   - "00" + "1" (US country code) + "4712345678" (a US number)
  //   - "001" (Thai IDD prefix) + "47" (Norway) + "12345678" (a Norwegian number)
  // Resolving this ambiguity requires knowing the caller's country, which
  // is not available. The "00" prefix is safe because no E.164 country
  // code starts with "0", so "00" followed by digits is always
  // unambiguously an international dialing prefix.
  if (value.startsWith('00')) {
    value = `+${value.slice(2)}`
  }

  if (!value.startsWith('+')) {
    return undefined
  }

  const digits = value.slice(1) // strip leading "+"

  for (const code of strippedCodes) {
    if (digits.startsWith(code) && digits.length > code.length) {
      return {
        countryCode: `+${cdcFormatMap[code] || code}`,
        phoneNumber: digits.slice(code.length),
      }
    }
  }

  return undefined
}
