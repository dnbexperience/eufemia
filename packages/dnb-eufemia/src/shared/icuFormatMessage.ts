import IntlMessageFormat from 'intl-messageformat'

const ICU_PATTERN =
  /\{[^}]+,\s*(?:plural|select|selectordinal|number|date|time)\b/

const MAX_CACHE_SIZE = 1000
const cache = new Map<string, IntlMessageFormat>()

export type ICUFormatMessage = {
  isICU: (message: string) => boolean
  format: (
    message: string,
    values: Record<string, unknown>,
    locale: string
  ) => string | Array<unknown>
}

/**
 * ICU MessageFormat support for Eufemia translations.
 *
 * Pass this to the `messageFormatter` prop on `Provider` to enable
 * pluralization, select, selectordinal, and inline number/date/time
 * formatting in your translation strings.
 *
 * @example
 * import Provider from '\@dnb/eufemia/shared/Provider'
 * import { icu } from '\@dnb/eufemia/shared'
 *
 * <Provider messageFormatter={icu}>
 *   <App />
 * </Provider>
 */
export const icu: ICUFormatMessage = {
  isICU(message: string): boolean {
    return ICU_PATTERN.test(message)
  },

  format(
    message: string,
    values: Record<string, unknown>,
    locale: string
  ): string | Array<unknown> {
    const cacheKey = `${locale}::${message}`

    let formatter = cache.get(cacheKey)
    if (!formatter) {
      formatter = new IntlMessageFormat(message, locale)

      if (cache.size >= MAX_CACHE_SIZE) {
        // Delete the oldest entry (Map preserves insertion order)
        cache.delete(cache.keys().next().value)
      }

      cache.set(cacheKey, formatter)
    }

    const result = formatter.format(values)

    if (typeof result === 'string') {
      return result
    }

    // IntlMessageFormat returns an array when rich text tags are used.
    // If all parts are strings, join them. Otherwise return as-is
    // so the caller can wrap them in React elements.
    if (Array.isArray(result)) {
      if (result.every((part) => typeof part === 'string')) {
        return result.join('')
      }

      return result
    }

    return String(result)
  },
}

export default icu
