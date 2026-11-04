import type { PropertiesTableProps } from '../../shared/types'

export const FlexStackProperties: PropertiesTableProps = {
  direction: {
    doc: 'Direction of sub components. Can be: `horizontal` or `vertical`. Defaults to `vertical`.',
    type: ['"horizontal"', '"vertical"'],
    status: 'optional',
  },
  align: {
    doc: 'Align sub components along the cross axis (CSS `align-items`). In horizontal direction, this controls vertical alignment. In vertical direction, this controls horizontal alignment. Defaults to `stretch`.',
    type: [
      '"flex-start"',
      '"flex-end"',
      '"center"',
      '"baseline"',
      '"stretch"',
    ],
    status: 'optional',
  },
  alignSelf: {
    doc: 'Align the Stack itself when it is a flex item in an outer container (CSS `align-self`). Defaults to `stretch`.',
    type: [
      '"flex-start"',
      '"flex-end"',
      '"center"',
      '"baseline"',
      '"stretch"',
    ],
    status: 'optional',
  },
  gap: {
    doc: 'How much space between child items. Use `false` for no spacing. In vertical direction, `rowGap` is used instead when both are set. Defaults to `medium`, or `small` when `divider` is `line` or `line-framed`.',
    type: [
      '"xx-small"',
      '"x-small"',
      '"small"',
      '"medium"',
      '"large"',
      '"x-large"',
      '"xx-large"',
      'false',
    ],
    status: 'optional',
  },
  element: {
    doc: 'Define the type of element. Defaults to `section`.',
    type: ['string', 'React.Element'],
    status: 'optional',
  },
  '[Flex.Container](/uilib/layout/flex/container/properties)': {
    doc: 'Flex.Container properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
