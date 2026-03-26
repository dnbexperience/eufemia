import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { skeletonProperty, spacingProperties } from './StatDocsUtils'

export const RatingProperties: PropertiesTableProps = {
  value: {
    doc: 'Rating value used to colorize stars.',
    type: ['number'],
    defaultValue: '0',
    status: 'optional',
  },
  max: {
    doc: 'Total number of items to render. Defaults to `5` for `stars` and `7` for `progressive`. Values above `20` are clamped and a warning is emitted.',
    type: ['number'],
    defaultValue: '5 (stars), 7 (progressive)',
    status: 'optional',
  },
  variant: {
    doc: 'Visual variant.',
    type: ['"stars"', '"progressive"'],
    defaultValue: 'stars',
    status: 'optional',
  },
  size: {
    doc: 'Size of the rating items. Aligns with the standard icon size scale.',
    type: ['"small"', '"default"', '"medium"', '"large"'],
    defaultValue: 'small',
    status: 'optional',
  },
  srLabel: NumberFormatPropertiesCamelCase.srLabel,
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
