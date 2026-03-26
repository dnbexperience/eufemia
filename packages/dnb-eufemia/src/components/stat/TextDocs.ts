import { PropertiesTableProps } from '../../shared/types'
import {
  fontSizeProperty,
  pickNumberFormatProps,
  skeletonProperty,
  spacingProperties,
} from './StatDocsUtils'

export const TextProperties: PropertiesTableProps = {
  children: {
    doc: 'Custom visible content rendered using Stat value typography.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  fontSize: fontSizeProperty,
  fontWeight: {
    doc: 'Typography weight for the text content.',
    type: ['"regular"', '"medium"'],
    status: 'optional',
  },
  colorizeBySign: {
    doc: 'If `true`, text color follows a signed child value when possible. You can also pass a number directly to control the tone for custom content.',
    type: ['boolean', 'number'],
    defaultValue: 'false',
    status: 'optional',
  },
  ...pickNumberFormatProps(['srLabel']),
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
