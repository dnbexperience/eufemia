import { PropertiesTableProps } from '../../shared/types'
import { spacingProperties } from './StatDocsUtils'

export const ContentProperties: PropertiesTableProps = {
  children: {
    doc: 'Content value area. Typically contains `Stat.Currency`, `Stat.Percent`, or `Stat.Trend`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  direction: {
    doc: 'Layout direction for the content items.',
    type: ['"horizontal"', '"vertical"'],
    defaultValue: 'horizontal',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
