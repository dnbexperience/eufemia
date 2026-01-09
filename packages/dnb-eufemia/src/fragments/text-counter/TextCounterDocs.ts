import type { PropertiesTableProps } from '../../shared/types'

export const TextCounterProperties: PropertiesTableProps = {
  text: {
    doc: 'The text to count characters from.',
    type: 'string',
    status: 'required',
  },
  max: {
    doc: 'The maximum number of characters allowed.',
    type: 'number',
    status: 'required',
  },
  variant: {
    doc: 'The counting variant. Can be either `up` (counts up from zero) or `down` (counts down from max). Default is `down`.',
    type: ['down', 'up'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
