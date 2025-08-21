import type { ContinentType, RegionType } from './countries'
import { selectedCurrencies } from './allCurrencies'

export type CurrencyType = {
  iso: string
  decimals: number
  i18n: {
    en: string
    nb: string
  }
  continent: ContinentType
  regions?: RegionType
  name?: string
  search?: {
    en: readonly string[]
    nb: readonly string[]
  }
}

export type CurrencyLang = keyof CurrencyType['i18n']
export type CurrencyISO = (typeof currencies)[number]['iso']

export const prioritizedCurrencies = ['NOK', 'SEK', 'DKK', 'EUR', 'USD']

const currencies = [...selectedCurrencies]

export default currencies satisfies Readonly<Array<CurrencyType>>
