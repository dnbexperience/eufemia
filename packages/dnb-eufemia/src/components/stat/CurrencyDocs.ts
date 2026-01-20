import type { PropertiesTableProps } from '../../shared/types'
import { NumberFormatProperties } from '../number-format/NumberFormatDocs'
import { SharedValueProperties } from './StatDocsUtils'

export const CurrencyProperties: PropertiesTableProps = {
  currencyDisplay: NumberFormatProperties.currencyDisplay,
  currencyPosition: NumberFormatProperties.currencyPosition,
  ...SharedValueProperties,
}
