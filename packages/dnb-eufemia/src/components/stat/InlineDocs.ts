import type { PropertiesTableProps } from '../../shared/types'

export const InlineProperties: PropertiesTableProps = {
  layoutEngine: {
    doc: 'Select the internal Flex layout engine. Defaults to `css`. Use `legacy` as a temporary compatibility fallback for custom integrations that depend on the previous wrapper-based layout.',
    type: [`'css'`, `'legacy'`],
    defaultValue: `'css'`,
    status: 'optional',
  },
  children: {
    doc: 'Inline layout container for content elements, typically `Stat.Trend` and `Stat.Info`.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  skeleton: {
    doc: 'Applies skeleton state to the inline container.',
    type: 'boolean',
    status: 'optional',
  },
  '[Flex.Horizontal](/uilib/layout/flex/container/properties)': {
    doc: 'Supports all additional `Flex.Horizontal` properties.',
    type: 'Various',
    status: 'optional',
  },
}
