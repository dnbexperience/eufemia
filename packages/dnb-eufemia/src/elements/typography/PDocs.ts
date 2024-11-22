import { PropertiesTableProps } from '../../shared/types'
import { TypographyProperties } from './TypographyDocs'

export const ParagraphProperties: PropertiesTableProps = {
  ...TypographyProperties,
  medium: {
    doc: 'Tells the component to use the medium font-weight styling `dnb-t__weight--medium`. More details [here](/uilib/typography/font-weight).',
    type: 'boolean',
    status: 'deprecated',
  },
  bold: {
    doc: 'Tells the component to use the bold font-weight styling class `dnb-t__weight--bold`. More details [here](/uilib/typography/font-weight).',
    type: 'boolean',
    status: 'deprecated',
  },
  modifier: {
    doc: 'String containing a combination of modifiers, used to set both font-size and weight in one property. e.g. `x-small medium` would make the paragraph extra small and medium.',
    type: 'string',
    status: 'deprecated',
  },
}
