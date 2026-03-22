import { PropertiesTableProps } from '../../shared/types'
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
  fontSize: fontSizeProperty,
  mainSize: mainSizeProperty,
  mainWeight: mainWeightProperty,
  auxiliaryWeight: auxiliaryWeightProperty,
  auxiliarySize: auxiliarySizeProperty,
  colorizeBySign: colorizeBySignProperty,
  className: {
    doc: 'Custom CSS class for the component.',
    type: ['string'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
