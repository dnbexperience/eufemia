import { PropertiesTableProps } from '../../shared/types'
import { spacingProperties } from './StatDocsUtils'

export const RootProperties: PropertiesTableProps = {
  children: {
    doc: 'Use `Stat.Label` (`dt`) and `Stat.Content` (`dd`) inside root.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  innerRef: {
    doc: 'A ref object to access the underlying `dl` DOM element.',
    type: ['React.RefObject<HTMLElement>'],
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
