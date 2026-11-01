import type { PropertiesTableProps } from '../../../../shared/types'
import { NumberFormatCurrencyProperties } from '../../../../components/number-format/NumberFormatDocs'
import { CurrencyProperties } from '../../Field/Currency/CurrencyDocs'
import { NumberProperties } from '../Number/NumberDocs'

const props = { ...NumberProperties }
delete props.currency
delete props.currencyDisplay

export const CurrencyValueProperties: PropertiesTableProps = {
  value: NumberProperties.value,
  currency: {
    doc: 'Defines what format to show the currency value in, e.g. `NOK` or `USD`. Use `true` for the default currency. Defaults to `NOK`.',
    type: ['string', 'true'],
    status: 'optional',
  },
  currencyDisplay: CurrencyProperties.currencyDisplay,
  currencyPosition: NumberFormatCurrencyProperties.currencyPosition,
  ...props,
  ban: undefined,
  nin: undefined,
  org: undefined,
  percent: undefined,
  phone: undefined,
  link: undefined,
  omitRounding: undefined,
}
