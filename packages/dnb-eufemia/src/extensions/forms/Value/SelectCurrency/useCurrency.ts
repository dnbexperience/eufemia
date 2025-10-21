import { useCallback, useContext } from 'react'
import SharedContext from '../../../../shared/Context'
import { getCurrencyData } from '../../Field/SelectCurrency'
import { CurrencyLang, CurrencyType } from '../../constants/currencies'

export default function useCurrency() {
  const { locale } = useContext(SharedContext)

  const getCurrencyDisplayNameByIso = useCallback(
    (iso: CurrencyType['iso']) => {
      if (!iso) {
        return null
      }

      const lang = locale?.split('-')[0] as CurrencyLang
      return getCurrencyData({
        lang,
        filter: (currency) => {
          return currency.iso === iso
        },
      })?.at(0)?.selectedValue
    },
    [locale]
  )

  return { getCurrencyDisplayNameByIso }
}
