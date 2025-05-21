import { useContext, useMemo } from 'react'
import listOfCountries, { CountryLang } from '../../constants/countries'
import useTranslation from '../../hooks/useTranslation'
import { LOCALE as defaultLocale } from '../../../../shared/defaults'
import SharedContext from '../../../../shared/Context'
import { warn } from '../../../../shared/helpers'

export default function useCountries() {
  const { countries: countriesInOtherLocale } = useTranslation() || {}
  const { locale } = useContext(SharedContext)
  const lang = locale?.split('-')[0] as CountryLang

  const countries = useMemo(() => {
    if (
      countriesInOtherLocale &&
      Object.keys(countriesInOtherLocale)?.length > 0
    ) {
      const missing = []
      const result = listOfCountries.map((country) => {
        let translatedCountry = countriesInOtherLocale[country.iso]

        if (!translatedCountry) {
          // Fall back to the default translation
          translatedCountry = country.i18n[defaultLocale.split('-')[0]]
          missing.push(country.iso)
        }

        return {
          // Ensure we don't mutate the original list
          ...country,
          i18n: { ...country.i18n, [lang]: translatedCountry },
        }
      }) as unknown as typeof listOfCountries

      if (missing.length > 0) {
        warn('Missing country translation:', missing)
      }

      return result
    }

    return listOfCountries
  }, [countriesInOtherLocale, lang])

  return { countries }
}
