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
  mainSize: {
    doc: 'Typography size for the main content.',
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
  auxiliarySize: {
    doc: 'Typography size for secondary content like currency sign and affixes (`prefix` and `suffix`).',
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

export const CurrencyProperties: PropertiesTableProps = AmountProperties

export const PercentProperties: PropertiesTableProps = {
  ...pickNumberFormatProps([
    'value',
    'percent',
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
  mainSize: AmountProperties.mainSize,
  auxiliarySize: AmountProperties.auxiliarySize,
  '[Space](/uilib/layout/space/properties)':
    AmountProperties['[Space](/uilib/layout/space/properties)'],
}
