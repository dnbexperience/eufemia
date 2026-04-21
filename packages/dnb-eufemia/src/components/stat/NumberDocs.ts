import type { PropertiesTableProps } from '../../shared/types'
import {
  auxiliarySizeProperty,
  auxiliaryWeightProperty,
  colorizeBySignProperty,
  fontSizeProperty,
  mainSizeProperty,
  mainWeightProperty,
  pickNumberFormatProps,
  spacingProperties,
} from './StatDocsUtils'

export const NumberProperties: PropertiesTableProps = {
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
    'skeleton',
    'options',
  ]),
  percent: {
    doc: 'Formats the value as a percentage.',
    type: 'boolean',
    status: 'optional',
  },
  fontSize: fontSizeProperty,
  mainSize: mainSizeProperty,
  mainWeight: mainWeightProperty,
  auxiliaryWeight: auxiliaryWeightProperty,
  auxiliarySize: auxiliarySizeProperty,
  colorizeBySign: colorizeBySignProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
