import { PropertiesTableProps } from '../../shared/types'

export const ScrollViewProperties: PropertiesTableProps = {
  interactive: {
    doc: 'to make the content accessible to keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation. Defaults to `false`.',
    type: ['boolean', 'auto'],
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
