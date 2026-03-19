import { useCallback, useContext, useMemo } from 'react'
import listOfCountries from '../../constants/countries'
import { warn } from '../../../../shared/helpers'
import { LOCALE } from '../../../../shared/defaults'
import type { InternalLocale } from '../../../../shared/Context'
import SharedContext from '../../../../shared/Context'

export default function useCountries({
  translateAllLocales = false,
}: {
  /**
   * If set to `true`, all locales will be translated.
   * This is useful when you want to show the translated country name (e.g. sv or da) in the current locale (e.g. nb).
   */
  translateAllLocales?: boolean
} = {}) {
  const { locale, translations } = useContext(SharedContext)

  const translateCountries = useCallback(
    (locales: Array<InternalLocale>) => {
      const hasTranslations = locales.some((locale) => {
        return Boolean((translations as Record<string, Record<string, unknown>>)?.[locale]?.countries)
      })

      if (hasTranslations) {
        const missing: string[] = []
        const defaultLocale = LOCALE.split('-')[0]

        const result = listOfCountries.map((country) => {
          const translated: Record<string, string> = {}

          locales.forEach((locale) => {
            const { countries } = (translations as Record<string, Record<string, unknown>>)?.[locale] || {} as Record<string, unknown>
            if (countries) {
              const key = locale.split('-')[0]
              translated[key] = (countries as Record<string, string>)[country.iso]

              if (!translated[key]) {
                // Fall back to the default translation for this locale
                translated[key] = (country.i18n as Record<string, string>)[defaultLocale]
                missing.push(country.iso)
              }
            }
          })

          return {
            // Ensure we don't mutate the original list
            ...country,
            i18n: { ...country.i18n, ...translated },
          }
        }) as unknown as typeof listOfCountries

        if (missing.length > 0) {
          warn('Missing country translation:', missing)
        }

        return result
      }

      return listOfCountries
    },
    [translations]
  )

  const countries = useMemo(() => {
    if (translateAllLocales) {
      const allLocales = Object.keys(translations)
      return translateCountries(allLocales)
    }

    return translateCountries([locale])
  }, [locale, translateAllLocales, translateCountries, translations])

  return { countries }
}
