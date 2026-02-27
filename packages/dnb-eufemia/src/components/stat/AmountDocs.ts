import { PropertiesTableProps } from '../../shared/types'
import {
  auxiliarySizeProperty,
  auxWeightProperty,
  colorizeBySignProperty,
  mainSizeProperty,
  mainWeightProperty,
  pickNumberFormatProps,
  spacingProperties,
} from './StatDocsUtils'

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
