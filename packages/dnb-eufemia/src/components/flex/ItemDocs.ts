import type { PropertiesTableProps } from '../../shared/types'

export const FlexItemProperties: PropertiesTableProps = {
  grow: {
    doc: 'True to expand in width/height when there is more space available. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  shrink: {
    doc: 'True to shrink in width/height when there is not enough space available for all components within the container. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  span: {
    doc: 'To set the span (parts) in percentage with numbers from 1 to 12 (`sizeCount`). You can also provide [Media Query](/uilib/layout/media-queries/) types in an object. You can also use the value `auto` to disable it on a specific screen size. Wrap your Flex.Items inside a [Flex.Container](/uilib/layout/flex/container).',
    type: ['number', 'object'],
    status: 'optional',
  },
  gapBefore: {
    doc: 'With `layoutEngine="css"`, replace the [Flex.Container](/uilib/layout/flex/container) gap before this item on the main axis: left in horizontal layouts and top in vertical layouts. Use `false` for no gap. Ordinary spacing props remain additive. When adjacent items set both sides of the same gap, this value takes precedence over the previous item’s `gapAfter`.',
    type: [
      `'xx-small'`,
      `'x-small'`,
      `'small'`,
      `'medium'`,
      `'large'`,
      `'x-large'`,
      `'xx-large'`,
      'false',
    ],
    status: 'optional',
  },
  gapAfter: {
    doc: 'With `layoutEngine="css"`, replace the [Flex.Container](/uilib/layout/flex/container) gap after this item on the main axis: right in horizontal layouts and bottom in vertical layouts. Use `false` for no gap. Ordinary spacing props remain additive. A following item’s `gapBefore` takes precedence when both sides set the same gap.',
    type: [
      `'xx-small'`,
      `'x-small'`,
      `'small'`,
      `'medium'`,
      `'large'`,
      `'x-large'`,
      `'xx-large'`,
      'false',
    ],
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `div`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  ref: {
    doc: 'Provide a React.Ref to access the inner HTML element.',
    type: 'React.Ref',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
