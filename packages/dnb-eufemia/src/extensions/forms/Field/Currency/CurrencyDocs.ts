import { PropertiesTableProps } from '../../../../shared/types'

export const CurrencyProperties: PropertiesTableProps = {
  currency: {
    doc: 'Currency to show the value in. I.e `NOK` or `USD`.',
    type: 'string',
    state: 'optional',
  },
  currencyDisplay: {
    doc: 'Can be `code`, `symbol`, `narrowSymbol` or `name` (kroner).',
    type: 'string',
    state: 'optional',
  },
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    state: 'optional',
  },
}

export const CurrencyEvents: PropertiesTableProps = {}
