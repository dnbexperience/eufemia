import type { PropertiesTableProps } from '../../shared/types'
import { NumberFormatProperties } from '../number-format/NumberFormatDocs'
import { skeletonProperty, spacingProperties } from './StatDocsUtils'

export const TrendProperties: PropertiesTableProps = {
  value: {
    doc: 'Numeric or string value used to resolve the trend sign and tone. When omitted, the value is extracted from `children`.',
    type: ['number', 'string'],
    status: 'optional',
  },
  children: {
    doc: 'Trend value content, e.g. `+12.4%` or `-2.1%`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  tone: {
    doc: 'Tone override for state styling.',
    type: ['"positive"', '"negative"', '"neutral"'],
    status: 'optional',
  },
  srLabel: NumberFormatProperties.srLabel,
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
