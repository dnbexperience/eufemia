import { PropertiesTableProps } from '../../shared/types'
import { skeletonProperty, spacingProperties } from './StatDocsUtils'

export const InfoProperties: PropertiesTableProps = {
  children: {
    doc: 'Additional descriptive information.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  variant: {
    doc: 'Info color style variant. `"default"` is deprecated — use `"plain"` instead.',
    type: ['"plain"', '"subtle"', '"prominent"'],
    defaultValue: 'subtle',
    status: 'optional',
  },
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
