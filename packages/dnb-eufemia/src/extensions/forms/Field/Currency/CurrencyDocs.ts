import { PropertiesTableProps } from '../../../../shared/types'
import { numberProperties } from '../Number/NumberDocs'

export const currencyProperties: PropertiesTableProps = {
  currency: {
    doc: 'Currency to show the value in. I.e `NOK` or `USD`.',
    type: 'string',
    status: 'optional',
  },
  currencyDisplay: {
    doc: 'Defined the currency display style. Defaults to `code`.',
    type: ['code', 'symbol', 'narrowSymbol', 'name'],
    status: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    status: 'optional',
  },
  ...numberProperties,
}
