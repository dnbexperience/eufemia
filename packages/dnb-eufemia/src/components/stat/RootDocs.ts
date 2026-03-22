import { PropertiesTableProps } from '../../shared/types'
import { spacingProperties } from './StatDocsUtils'

export const RootProperties: PropertiesTableProps = {
  children: {
    doc: 'Use `Stat.Label` (`dt`) and `Stat.Content` (`dd`) inside root.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  id: {
    doc: 'A unique identifier for the root element.',
    type: ['string'],
    status: 'optional',
  },
  style: {
    doc: 'Inline styles for the root element.',
    type: ['React.CSSProperties'],
    status: 'optional',
  },
  visualOrder: {
    doc: 'Visual order of label and content while keeping semantic `dt`/`dd` markup in DOM.',
    type: ['"label-content"', '"content-label"'],
    defaultValue: 'label-content',
    status: 'optional',
  },
  skeleton: {
    doc: 'Applies skeleton loading state to all Stat sub-components.',
    type: ['boolean'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
