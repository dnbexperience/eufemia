import { PropertiesTableProps } from '../../../../shared/types'
import { NumberProperties } from '../Number/NumberDocs'

export const CurrencyValueProperties: PropertiesTableProps = {
  value: NumberProperties.value,
  currency: NumberProperties.currency,
  currencyDisplay: NumberProperties.currencyDisplay,
  currencyPosition: NumberProperties.currencyPosition,
  ...NumberProperties,
  ban: undefined,
  nin: undefined,
  org: undefined,
  percent: undefined,
  phone: undefined,
  link: undefined,
  omitRounding: undefined,
}
