import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { spacingProperties } from './StatDocsUtils'

export const InfoProperties: PropertiesTableProps = {
  children: {
    doc: 'Additional descriptive information.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  element: NumberFormatPropertiesCamelCase.element,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
