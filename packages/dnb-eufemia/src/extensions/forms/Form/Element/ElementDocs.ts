import { PropertiesTableProps } from '../../../../shared/types'

export const ElementProperties: PropertiesTableProps = {
  children: {
    doc: 'The content of the form.',
    type: 'React.Node',
    state: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
