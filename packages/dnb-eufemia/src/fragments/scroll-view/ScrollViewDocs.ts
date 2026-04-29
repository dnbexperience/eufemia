import type { PropertiesTableProps } from '../../shared/types'

export const ScrollViewProperties: PropertiesTableProps = {
  interactive: {
    doc: 'To make the content accessible to keyboard navigation. Use `true` or `auto`. Auto will detect if a scrollbar is visible and make the ScrollView accessible for keyboard navigation. Defaults to `false`.',
    type: ['boolean', '"auto"'],
    status: 'optional',
  },
  scrollbarGutter: {
    doc: 'Reserves space for the scrollbar gutter, preventing layout shifts when content overflows. Maps to the CSS `scrollbar-gutter` property. Defaults to `undefined`.',
    type: '"stable"',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
