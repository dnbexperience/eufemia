import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type ListOfCountries from '../../constants/countries'
import prioritizedCountriesData from '../../constants/countries-prioritized'
import { warn } from '../../../../shared/helpers'
import { LOCALE } from '../../../../shared/defaults'
import type { InternalLocale } from '../../../../shared/Context'
import SharedContext from '../../../../shared/Context'

type CountriesList = typeof ListOfCountries

// The full country list is large, so it is lazy-loaded on demand instead of
// being bundled eagerly. The result is cached at module level so it is fetched
// only once and shared across all instances — later mounts read it
// synchronously through the useState initializer below.
let fullCountriesCache: CountriesList | null = null
let fullCountriesPromise: Promise<CountriesList> | null = null

function loadFullCountries(): Promise<CountriesList> {
  if (fullCountriesCache) {
    return Promise.resolve(fullCountriesCache)
  }
  if (!fullCountriesPromise) {
    fullCountriesPromise = import('../../constants/countries').then(
      (module) => {
        fullCountriesCache = module.default as CountriesList
        return fullCountriesCache
      }
    )
  }
  return fullCountriesPromise
}

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

  const [fullCountries, setFullCountries] = useState<CountriesList | null>(
    fullCountriesCache
  )

  useEffect(() => {
    if (fullCountries) {
      return // stop here
    }

    let isActive = true
    loadFullCountries().then((list) => {
      if (isActive) {
        setFullCountries(list)
      }
    })

    return () => {
      isActive = false
    }
  }, [fullCountries])

  // Use the full list once it has loaded; until then fall back to the small
  // synchronous subset so the most common countries are available immediately.
  const listOfCountries = (fullCountries ??
    prioritizedCountriesData) as CountriesList

  const translateCountries = useCallback(
    (locales: Array<InternalLocale>) => {
      const hasTranslations = locales.some((locale) => {
        return Boolean(translations?.[locale]?.countries)
      })

      if (hasTranslations) {
        const missing = []
        const defaultLocale = LOCALE.split('-')[0]

        const result = listOfCountries.map((country) => {
          const translated = {}

          locales.forEach((locale) => {
            const { countries } = translations?.[locale] || {}
            if (countries) {
              const key = locale.split('-')[0]
              translated[key] = countries[country.iso]

              if (!translated[key]) {
                // Fall back to the default translation for this locale
                translated[key] = country.i18n[defaultLocale]
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
    [translations, listOfCountries]
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
