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
  defaultValue: 'large',
  status: 'optional',
}

export const mainWeightProperty: PropertiesTableProps[string] = {
  doc: 'Typography weight for the main content.',
  type: ['"regular"', '"medium"'],
  defaultValue: 'medium',
  status: 'optional',
}

export const auxWeightProperty: PropertiesTableProps[string] = {
  doc: 'Typography weight for secondary content like currency sign and affixes. If omitted, and `mainSize` equals `auxiliarySize` while `mainWeight` is omitted, `medium` is used.',
  type: ['"regular"', '"medium"'],
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
  defaultValue: 'large',
  status: 'optional',
}

export const colorizeBySignProperty: PropertiesTableProps[string] = {
  doc: 'If `true`, text color follows sign tone (`+` green, `-` red).',
  type: ['boolean'],
  defaultValue: 'false',
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
    'skeleton',
    'options',
  ]),
  mainSize: mainSizeProperty,
  mainWeight: mainWeightProperty,
  auxWeight: auxWeightProperty,
  auxiliarySize: auxiliarySizeProperty,
  colorizeBySign: colorizeBySignProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
