import type { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { SharedValueProperties } from './StatDocsUtils'

export const CurrencyProperties: PropertiesTableProps = {
  currencyDisplay: NumberFormatPropertiesCamelCase.currencyDisplay,
  currencyPosition: NumberFormatPropertiesCamelCase.currencyPosition,
  ...SharedValueProperties,
}
