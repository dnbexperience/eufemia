import { PropertiesTableProps } from '../../shared/types'
import { spacingProperties } from './StatDocsUtils'

export const InfoProperties: PropertiesTableProps = {
  children: {
    doc: 'Additional descriptive information.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  variant: {
    doc: 'Info color style variant.',
    type: ['"plain"', '"subtle"', '"prominent"'],
    defaultValue: 'subtle',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
