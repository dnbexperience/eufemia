import { PropertiesTableProps } from '../../shared/types'

export const InlineProperties: PropertiesTableProps = {
  children: {
    doc: 'Inline layout container for content elements, typically `Stat.Trend` and `Stat.Info`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  '[Flex.Horizontal](/uilib/layout/flex/horizontal/properties)': {
    doc: 'Supports all additional `Flex.Horizontal` properties.',
    type: 'Various',
    status: 'optional',
  },
}
