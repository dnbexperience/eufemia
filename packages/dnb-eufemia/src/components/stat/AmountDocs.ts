import { PropertiesTableProps } from '../../shared/types'
import {
  auxiliarySizeProperty,
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
