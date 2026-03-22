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
  srLabel: NumberFormatPropertiesCamelCase.srLabel,
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}

export const RatingCSSProperties: PropertiesTableProps = {
  '--dnb-stat-rating-fill': {
    doc: 'Fill percentage for each star in the `stars` variant. Set automatically based on `value`.',
    type: 'CSS Custom Property',
    status: 'optional',
  },
  '--dnb-stat-rating-step-height': {
    doc: 'Height of each step in the `progressive` variant. Scales from `0.25rem` to `1rem` based on position.',
    type: 'CSS Custom Property',
    status: 'optional',
  },
  '--dnb-stat-rating-step-fill': {
    doc: 'Fill percentage for each step in the `progressive` variant. Set automatically based on `value`.',
    type: 'CSS Custom Property',
    status: 'optional',
  },
}
