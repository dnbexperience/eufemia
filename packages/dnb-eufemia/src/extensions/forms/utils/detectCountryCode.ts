import countries from '../constants/countries'

/**
 * Sorted list of unique numeric country dialing codes (longest first).
 *
 * Dashes in CDC values (e.g. "1-684") are stripped so every entry is
 * a pure digit string.  Sorting longest-first guarantees the most
 * specific code is matched first — this is safe because ITU E.164
 * country codes are prefix-free at each allocation length.
 */
const sortedCodes: Array<string> = Array.from(
  new Set(countries.map((c) => c.cdc.replace(/-/g, '')))
).sort((a, b) => b.length - a.length || a.localeCompare(b))

/**
 * Detect the country dialing code from a phone number string that has
 * no separator between code and subscriber number.
 *
 * Uses a longest-prefix-match against every known E.164 country code
 * in the Eufemia countries list.
 *
 * @param value  A phone number string beginning with "+" (e.g. "+4712345678").
 * @returns      An object with `countryCode` (e.g. "+47") and
 *               `phoneNumber` (e.g. "12345678"), or `undefined` when
 *               no known code could be detected.
 *
 * @example
 * detectCountryCode('+4712345678')
 * // => { countryCode: '+47', phoneNumber: '12345678' }
 *
 * detectCountryCode('+4612345678')
 * // => { countryCode: '+46', phoneNumber: '12345678' }
 *
 * detectCountryCode('+hello')
 * // => undefined
 */
export default function detectCountryCode(value: string):
  | {
      countryCode: string
      phoneNumber: string
    }
  | undefined {
  if (typeof value !== 'string' || !value.startsWith('+')) {
    return undefined
  }

  const digits = value.slice(1) // strip leading "+"

  for (const code of sortedCodes) {
    if (digits.startsWith(code) && digits.length > code.length) {
      return {
        countryCode: `+${code}`,
        phoneNumber: digits.slice(code.length),
      }
    }
  }

  return undefined
}
