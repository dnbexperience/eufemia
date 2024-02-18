import { PropertiesTableProps } from '../../../../shared/types'

export const ButtonRowProperties: PropertiesTableProps = {
  children: {
    doc: 'Buttons.',
    type: 'React.Node',
    state: 'required',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
