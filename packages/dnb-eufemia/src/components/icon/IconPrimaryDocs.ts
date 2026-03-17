import type { PropertiesTableProps } from '../../shared/types'

export const IconPrimaryProperties: PropertiesTableProps = {
  icon: {
    doc: 'Defines the [primary icon](/icons/primary) to be used, as a string.',
    type: 'string',
    status: 'required',
  },
  '[Icon](/uilib/components/icon/properties)': {
    doc: 'Accepts all default icon properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
