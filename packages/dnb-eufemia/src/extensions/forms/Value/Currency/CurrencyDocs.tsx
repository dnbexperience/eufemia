import { PropertiesTableProps } from '../../../../shared/types'
import { NumberProperties } from '../Number/NumberDocs'

export const CurrencyValueProperties: PropertiesTableProps = {
  ...NumberProperties,
  currency: {
    doc: 'Currency code (ISO 4217) or `true` to use the default `NOK`, which use two decimals by default. Defaults to value `NOK`.',
    type: ['string', 'boolean'],
    status: 'optional',
  },
}
