import type { PropertiesTableProps } from '../../shared/types'

export const CardProperties: PropertiesTableProps = {
  outset: {
    doc: 'Whether or not to break out (using negative margins) on larger screens. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  stack: {
    doc: 'True to stack the sub components with space between. The `spacing` will default to `medium`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  direction: {
    doc: 'Defaults to `vertical`.',
    type: 'string',
    status: 'optional',
  },
  alignSelf: {
    doc: 'Defaults to `stretch`.',
    type: 'string',
    status: 'optional',
  },
  title: {
    doc: 'Define a title that appears on top of the Card.',
    type: 'React.Node',
    status: 'optional',
  },
  responsive: {
    doc: 'Define if the card should behave responsive. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  filled: {
    doc: 'Define if the Card should get the same background color as the outline border.',
    type: 'boolean',
    status: 'optional',
  },
  outline: {
    doc: 'Define the outline color. Defaults to `var(--card-outline-color)`.',
    type: 'string',
    status: 'optional',
  },
  backgroundColor: {
    doc: 'Define the background color. Defaults to `var(--card-background-color)`.',
    type: 'string',
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `section`.',
    type: 'React.Element',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Flex.Item](/uilib/layout/flex/item/properties)': {
    doc: 'Flex.Item properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
