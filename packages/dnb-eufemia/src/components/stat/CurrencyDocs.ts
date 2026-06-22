import type { PropertiesTableProps } from '../../shared/types'
import { NumberFormatCurrencyProperties } from '../number-format/NumberFormatDocs'
import { SharedValueProperties } from './StatDocsUtils'

export const CurrencyProperties: PropertiesTableProps = {
  currency: NumberFormatCurrencyProperties.currency,
  currencyDisplay: NumberFormatCurrencyProperties.currencyDisplay,
  currencyPosition: NumberFormatCurrencyProperties.currencyPosition,
  ...SharedValueProperties,
}
