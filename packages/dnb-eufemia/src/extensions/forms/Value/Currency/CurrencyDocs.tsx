import { PropertiesTableProps } from '../../../../shared/types'
import { CurrencyProperties } from '../../Field/Currency/CurrencyDocs'
import { NumberProperties } from '../Number/NumberDocs'

const props = { ...NumberProperties }
delete props.currency
delete props.currencyDisplay

export const CurrencyValueProperties: PropertiesTableProps = {
  value: NumberProperties.value,
  currency: CurrencyProperties.currency,
  currencyDisplay: CurrencyProperties.currencyDisplay,
  currencyPosition: NumberProperties.currencyPosition,
  ...props,
  ban: undefined,
  nin: undefined,
  org: undefined,
  percent: undefined,
  phone: undefined,
  link: undefined,
  omitRounding: undefined,
}
