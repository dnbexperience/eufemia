import { useContext, useMemo } from 'react'
import listOfCountries, { CountryLang } from '../../constants/countries'
import { useTranslation } from '../../hooks'
import SharedContext from '../../../../shared/Context'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export default function useCountries() {
  const { countries: countriesInOtherLocale } = useTranslation() || {}
  const { locale } = useContext(SharedContext)
  const lang = locale?.split('-')[0] as CountryLang

  const countries = useMemo(() => {
    if (
      countriesInOtherLocale &&
      Object.keys(countriesInOtherLocale)?.length > 0
    ) {
      return listOfCountries.map((country) => {
        // Ensure we don't mutate the original list
        country = structuredClone(country)

        Object.assign(country.i18n, {
          [lang]: countriesInOtherLocale[country.iso],
        })

        return country
      }) as unknown as typeof listOfCountries
    }

    return listOfCountries
  }, [countriesInOtherLocale, lang])

  return { countries }
}
