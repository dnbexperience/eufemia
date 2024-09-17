import { useCallback, useContext } from 'react'
import SharedContext from '../../../../shared/Context'
import { getCountryData } from '../../Field/SelectCountry'
import { CountryLang, CountryType } from '../../constants/countries'

export default function useCountry() {
  const { locale } = useContext(SharedContext)

  const getCountryNameByIso = useCallback(
    (iso: CountryType['iso']) => {
      if (!iso) {
        return null
      }

      const lang = locale?.split('-')[0] as CountryLang
      return getCountryData({
        lang,
        filter: (country) => {
          return country.iso === iso
        },
      }).at(0)?.content
    },
    [locale]
  )

  return { getCountryNameByIso }
}
