import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { spacingProperties } from './StatDocsUtils'

export const RatingProperties: PropertiesTableProps = {
  value: {
    doc: 'Rating value used to colorize stars.',
    type: ['number'],
    defaultValue: '0',
    status: 'optional',
  },
  max: {
    doc: 'Total number of items to render. Defaults to `5` for `stars` and `7` for `progressive`.',
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
  srLabel: NumberFormatPropertiesCamelCase.srLabel,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
