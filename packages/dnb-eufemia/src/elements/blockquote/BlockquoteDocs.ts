import { PropertiesTableProps } from '../../shared/types'

export const BlockquoteProperties: PropertiesTableProps = {
  noBackground: {
    doc: 'Hides the blockquote background by making it transparent.',
    type: 'boolean',
    status: 'optional',
  },
  direction: {
    doc: 'Determines the flow direction of the content inside of blockquote. Can be either `horizontal` or `vertical`. Defaults to `horizontal`.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
