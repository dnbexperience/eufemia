import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { spacingProperties } from './StatDocsUtils'

export const LabelProperties: PropertiesTableProps = {
  children: {
    doc: 'Label content.',
    type: ['React.ReactNode'],
    status: 'optional',
  },
  element: NumberFormatPropertiesCamelCase.element,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
