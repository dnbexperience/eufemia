import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { SharedValueProperties } from './StatDocsUtils'

export const CurrencyProperties: PropertiesTableProps = {
  ...SharedValueProperties,
  currencyDisplay: NumberFormatPropertiesCamelCase.currencyDisplay,
  currencyPosition: NumberFormatPropertiesCamelCase.currencyPosition,
}
