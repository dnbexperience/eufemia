import { useCallback, useContext } from 'react'
import SharedContext from '../../../../shared/Context'
import { getCountryData } from '../../Field/SelectCountry'
import useCountries from '../../Field/SelectCountry/useCountries'
import type { CountryLang, CountryType } from '../../constants/countries'

export default function useCountry() {
  const { locale } = useContext(SharedContext)
  const { countries } = useCountries()

  const getCountryNameByIso = useCallback(
    (iso: CountryType['iso']) => {
      if (!iso) {
        return null
      }

      const lang = locale?.split('-')[0] as CountryLang
      return getCountryData({
        countries,
        lang,
        filter: (country) => {
          return country.iso === iso
        },
      })?.at(0)?.content
    },
    [countries, locale]
  )

  return { getCountryNameByIso }
}
