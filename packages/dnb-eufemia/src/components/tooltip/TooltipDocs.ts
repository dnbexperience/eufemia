import { PropertiesTableProps } from '../../shared/types'

export const TooltipProperties: PropertiesTableProps = {
  children: {
    doc: 'Provide a string or a React Element to be shown as the tooltip content.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  active: {
    doc: 'Controls visibility. When provided, Tooltip is controlled and ignores DOM events (hover/focus/touch). `true` keeps it visible; `false` keeps it hidden.',
    type: 'boolean',
    status: 'optional',
  },
  position: {
    doc: 'defines the offset position to the target element the arrow appears. Can be `top`, `right`, `left` and `bottom`. Defaults to `top`.',
    type: ['top', 'right', 'left', 'bottom'],
    status: 'optional',
  },
  align: {
    doc: 'defines the offset alignment to the target element the arrow appears. Can be `center`, `right` and `left`. Defaults to `center`.',
    type: ['center', 'right', 'left'],
    status: 'optional',
  },
  arrow: {
    doc: 'defines the direction where the arrow appears. Can be `center`, `top`, `right`, `bottom` and `left`. Defaults to `center`.',
    type: ['center', 'top', 'right', 'bottom', 'left'],
    status: 'optional',
  },
  skipPortal: {
    doc: 'set to `true` to disable the React Portal behavior. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  showDelay: {
    doc: 'define the delay until the tooltip should show up after the initial hover / active state.',
    type: 'boolean',
    status: 'optional',
  },
  hideDelay: {
    doc: 'define the delay until the tooltip should disappear up after initial visibility.',
    type: 'boolean',
    status: 'optional',
  },
  size: {
    doc: 'defines the spacing size of the tooltip. Can be `large` or `basis`. Defaults to `basis`.',
    type: ['large', 'basis'],
    status: 'optional',
  },
  targetElement: {
    doc: 'provide an element directly as a React Node or a React Ref that will be wrapped and rendered.',
    type: ['React.ReactNode', 'React.RefObject'],
    status: 'optional',
  },
  targetSelector: {
    doc: 'specify a vanilla HTML selector by a string as the target element.',
    type: 'string',
    status: 'optional',
  },
  noAnimation: {
    doc: 'set to `true` if no fade-in animation should be used.',
    type: 'boolean',
    status: 'optional',
  },
  fixedPosition: {
    doc: 'If set to `true`, the Tooltip will be fixed in its scroll position by using CSS `position: fixed;`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}
