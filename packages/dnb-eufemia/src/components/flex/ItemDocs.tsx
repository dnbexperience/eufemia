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
  size: {
    doc: 'To set the size (parts) in percentage with numbers from 1 to 12 (`sizeCount`). You can also provide [Media Query](/uilib/usage/layout/media-queries/) types in an object. You can also use the value `auto` to disable it on a specific screen size. Wrap your Flex.Items inside a [Flex.Container](/uilib/layout/flex/container).',
    type: ['number', 'object'],
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `div`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  innerRef: {
    doc: 'Provide a React.Ref to accessing the inner HTML element.',
    type: 'React.Ref',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
