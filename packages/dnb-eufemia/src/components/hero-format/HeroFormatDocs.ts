import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'

const pickNumberFormatProps = (keys: string[]): PropertiesTableProps => {
  return Object.fromEntries(
    keys.map((key) => [key, NumberFormatPropertiesCamelCase[key]])
  )
}

export const AmountProperties: PropertiesTableProps = {
  ...pickNumberFormatProps([
    'value',
    'currency',
    'currencyDisplay',
    'currencyPosition',
    'decimals',
    'rounding',
    'signDisplay',
    'compact',
    'prefix',
    'suffix',
    'locale',
    'srLabel',
    'element',
    'skeleton',
    'options',
    'clean',
  ]),
  numberSize: {
    doc: 'Typography size for the main number and the currency sign.',
    type: [
      '"x-small"',
      '"small"',
      '"basis"',
      '"medium"',
      '"large"',
      '"x-large"',
      '"xx-large"',
    ],
    defaultValue: 'x-large',
    status: 'optional',
  },
  currencySize: {
    doc: 'Typography size for currency sign and affixes (`prefix` and `suffix`).',
    type: [
      '"x-small"',
      '"small"',
      '"basis"',
      '"medium"',
      '"large"',
      '"x-large"',
      '"xx-large"',
    ],
    defaultValue: 'x-small',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
