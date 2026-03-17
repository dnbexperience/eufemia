import type { PropertiesTableProps } from '../../shared/types'

export const GridItemProperties: PropertiesTableProps = {
  span: {
    doc: 'To place the item on the grid with numbers from 1 to 12 (`columns`). Needs always two values, a so called span (from - to) `span={[1, 6]}`. Accepts also `end` like so `span={[1, "end"]}` or `full` like so `span={"full"}`. You can also provide [Media Query](/uilib/usage/layout/media-queries/) types in an object like so like so `span={{ small: [1, 4], medium: [1, 6], large: [1, 12]}}`.',
    type: ['object', 'array'],
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `div`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
}
