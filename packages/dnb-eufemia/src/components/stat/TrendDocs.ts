import { PropertiesTableProps } from '../../shared/types'
import { NumberFormatPropertiesCamelCase } from '../number-format/NumberFormatDocs'
import { spacingProperties } from './StatDocsUtils'

export const TrendProperties: PropertiesTableProps = {
  value: NumberFormatPropertiesCamelCase.value,
  tone: {
    doc: 'Tone override for state styling.',
    type: ['"positive"', '"negative"', '"neutral"'],
    status: 'optional',
  },
  srLabel: NumberFormatPropertiesCamelCase.srLabel,
  element: NumberFormatPropertiesCamelCase.element,
  '[Space](/uilib/layout/space/properties)': spacingProperties,
}
