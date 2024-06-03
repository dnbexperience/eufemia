import { PropertiesTableProps } from '../../shared/types'

export const GridContainerProperties: PropertiesTableProps = {
  columns: {
    doc: 'Define how many columns your layout should be divided in. Can be just a number `columns={12}` or an object with media query sizes like `columns={{ small: 4, medium: 6, large: 12 }}` (default values). You can also disabled CSS Grid by providing `false` for one size, like so `columns={{ small: 4, medium: false, large: 12 }}`.',
    type: ['number', 'object'],
    status: 'optional',
  },
  rowGap: {
    doc: 'Defines how much the gap between rows should be. Can be `large`, `medium`, `small`, `x-small` or `false` for no gap. Defaults to `false`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  columnGap: {
    doc: 'Defines how much the gap between columns should be. Can be `large`, `medium`, `small`, `x-small` or `false` for no gap. Defaults to `false`.',
    type: ['string', 'false'],
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `div`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
}
