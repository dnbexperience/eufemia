import { PropertiesTableProps } from '../../shared/types'

export const HrProperties: PropertiesTableProps = {
  breakout: {
    doc: 'To make the hr full width.',
    type: 'boolean',
    status: 'optional',
  },
  dashed: {
    doc: 'To make the hr dashed.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
