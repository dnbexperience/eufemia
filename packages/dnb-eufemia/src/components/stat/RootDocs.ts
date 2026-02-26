import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { spacingProperties } from './StatDocsUtils'

export const RootProperties: PropertiesTableProps = {
  children: {
    doc: 'Use `Stat.Label` (`dt`) and `Stat.Content` (`dd`) inside root.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  element: NumberFormatPropertiesCamelCase.element,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
