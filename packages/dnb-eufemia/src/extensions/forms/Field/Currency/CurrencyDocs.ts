import type { PropertiesTableProps } from '../../../../shared/types'
import { NumberProperties } from '../Number/NumberDocs'

const props = { ...NumberProperties }
delete props.currency
delete props.currencyDisplay

export const CurrencyProperties: PropertiesTableProps = {
  currency: {
    doc: 'Defines what format to show the currency value in I.e `NOK` or `USD`. You can also set a path as the value, e.g. `/myCurrencyPath`.',
    type: 'string',
    status: 'optional',
  },
  currencyDisplay: {
    doc: 'Defines the currency display style. When set to `code`, the currency code is rendered before the amount. Defaults to `narrowSymbol`.',
    type: ['code', 'symbol', 'narrowSymbol', 'name', 'false'],
    status: 'optional',
  },
  ...props,
}
