import { PropertiesTableProps } from '../../../../shared/types'
import { FieldProperties } from '../../Field/FieldDocs'

export const MainHeadingProperties: PropertiesTableProps = {
  level: {
    doc: 'Define a specific level value to ensure correct level hierarchy. Defaults to `2`.',
    type: 'number',
    status: 'optional',
  },
  help: FieldProperties.help,
  children: {
    doc: 'Heading text / contents.',
    type: 'React.Node',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
