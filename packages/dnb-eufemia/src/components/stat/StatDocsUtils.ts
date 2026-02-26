import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'

export const pickNumberFormatProps = (
  keys: string[]
): PropertiesTableProps => {
  return Object.fromEntries(
    keys.map((key) => [key, NumberFormatPropertiesCamelCase[key]])
  )
}

export const mainSizeProperty: PropertiesTableProps[string] = {
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
}

export const mainWeightProperty: PropertiesTableProps[string] = {
  doc: 'Typography weight for the main content.',
  type: ['"regular"', '"medium"', '"bold"'],
  defaultValue: 'medium',
  status: 'optional',
}

export const auxiliarySizeProperty: PropertiesTableProps[string] = {
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
}

export const spacingProperties: PropertiesTableProps[string] = {
  doc: 'Spacing properties like `top` or `bottom` are supported.',
  type: ['string', 'object'],
  status: 'optional',
}

export const SharedValueProperties: PropertiesTableProps = {
  ...pickNumberFormatProps([
    'value',
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
  mainSize: mainSizeProperty,
  mainWeight: mainWeightProperty,
  auxiliarySize: auxiliarySizeProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
