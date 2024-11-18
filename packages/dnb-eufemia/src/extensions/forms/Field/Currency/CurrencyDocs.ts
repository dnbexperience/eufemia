import { PropertiesTableProps } from '../../../../shared/types'
import { numberProperties } from '../Number/NumberDocs'

export const currencyProperties: PropertiesTableProps = {
  currency: {
    doc: 'Defines what format to show the currency value in I.e `NOK` or `USD`.',
    type: 'string',
    status: 'optional',
  },
  currencyDisplay: {
    doc: 'Defined the currency display style. Defaults to `code`.',
    type: ['code', 'symbol', 'narrowSymbol', 'name'],
    status: 'optional',
  },
  ...numberProperties,
}
