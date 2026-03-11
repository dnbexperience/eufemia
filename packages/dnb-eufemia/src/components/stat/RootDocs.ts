import { PropertiesTableProps } from '../../shared/types'
import { spacingProperties } from './StatDocsUtils'

export const RootProperties: PropertiesTableProps = {
  children: {
    doc: 'Use `Stat.Label` (`dt`) and `Stat.Content` (`dd`) inside root.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  visualOrder: {
    doc: 'Visual order of label and content while keeping semantic `dt`/`dd` markup in DOM.',
    type: ['"label-content"', '"content-label"'],
    defaultValue: 'label-content',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
