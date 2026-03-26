import { PropertiesTableProps } from '../../shared/types'
import { skeletonProperty, spacingProperties } from './StatDocsUtils'

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
  ariaLive: {
    doc: 'Set the `aria-live` attribute on the content wrapper. Useful for announcing dynamic content updates to screen readers.',
    type: ['"polite"', '"assertive"', '"off"'],
    status: 'optional',
  },
  skeleton: skeletonProperty,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
