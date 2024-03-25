import { PropertiesTableProps } from '../../../../shared/types'

export const SubHeadingProperties: PropertiesTableProps = {
  level: {
    doc: 'Define a specific level value to ensure correct level hierarchy. Defaults to 3.',
    type: 'number',
    state: 'optional',
  },
  children: {
    doc: 'Heading text / contents.',
    type: 'React.Node',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
