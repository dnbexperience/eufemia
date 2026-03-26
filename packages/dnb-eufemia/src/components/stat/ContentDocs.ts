import { PropertiesTableProps } from '../../shared/types'
import { skeletonProperty, spacingProperties } from './StatDocsUtils'

export const ContentProperties: PropertiesTableProps = {
  children: {
    doc: 'Content value area. Typically contains `Stat.Number`, `Stat.Currency`, `Stat.Percent`, `Stat.Text`, `Stat.Trend`, or `Stat.Info`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  direction: {
    doc: 'Layout direction for the content items.',
    type: ['"horizontal"', '"vertical"'],
    defaultValue: 'horizontal',
    status: 'optional',
  },
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
