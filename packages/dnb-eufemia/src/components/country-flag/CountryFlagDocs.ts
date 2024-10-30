import { PropertiesTableProps } from '../../shared/types'

export const CountryFlagProperties: PropertiesTableProps = {
  size: {
    doc: 'The size of the component. Can be `auto`, `small`, `medium`, `large` or `x-large`. Defaults to `auto` (1em).',
    type: 'string',
    status: 'optional',
  },
  shape: {
    doc: 'The shape of the component. Can be `round` or `square`. Defaults to `round`.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
