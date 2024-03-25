import { PropertiesTableProps } from '../../shared/types'

export const TextCounterProperties: PropertiesTableProps = {
  text: {
    doc: 'The text to count characters from.',
    type: 'string',
    state: 'required',
  },
  max: {
    doc: 'The maximum number of characters allowed.',
    type: 'number',
    state: 'required',
  },
  variant: {
    doc: 'The counting variant. Can be either `up` (counts up from zero) or `down` (counts down from max). Default is `down`.',
    type: 'string',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}
