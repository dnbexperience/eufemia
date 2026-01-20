import { PropertiesTableProps } from '../../shared/types'

export const PopoverProperties: PropertiesTableProps = {
  children: {
    doc: 'Alternative content prop. Accepts nodes or a render function that receives the same helpers as `content`.',
    type: [
      'React.ReactNode',
      '({ close, open, toggle, id }) => React.ReactNode',
    ],
    status: 'optional',
  },
  content: {
    doc: 'Content rendered inside the popover. Can also be a render function that receives helpers such as `close`.',
    type: [
      'React.ReactNode',
      '({ close, open, toggle, id }) => React.ReactNode',
    ],
    status: 'required',
  },
  title: {
    doc: 'Optional heading shown above the body content. Matches the typography used in TermDefinition.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  trigger: {
    doc: 'Custom trigger element or render function. Required unless you point Popover at an existing element using `targetElement` / `targetSelector`.',
    type: [
      'React.ReactNode',
      '({ active, ref, toggle, open, close }) => React.ReactNode',
    ],
    status: 'optional',
  },
  triggerAttributes: {
    doc: 'Extra HTML attributes passed to the default trigger wrapper (e.g. aria-*).',
    type: 'React.HTMLAttributes<HTMLElement>',
    status: 'optional',
  },
  triggerClassName: {
    doc: 'Class name merged with the default trigger wrapper.',
    type: 'string',
    status: 'optional',
  },
  triggerOffset: {
    doc: 'Spacing in pixels between the trigger element and the popover surface.',
    type: 'number',
    status: 'optional',
  },
  targetRefreshKey: {
    doc: 'Forces the popover to recalculate its layout whenever this value changes. Useful when the trigger moves but the DOM tree stays mounted.',
    type: 'unknown',
    status: 'optional',
  },
  targetElement: {
    doc: 'Existing DOM element (or ref) used instead of a rendered trigger. Provide `{ horizontalRef, verticalRef }` when horizontal and vertical anchors differ.',
    type: [
      'HTMLElement',
      'React.RefObject<HTMLElement>',
      '{ horizontalRef?: HTMLElement | React.RefObject<HTMLElement>; verticalRef?: HTMLElement | React.RefObject<HTMLElement> }',
    ],
    status: 'optional',
  },
  targetSelector: {
    doc: 'CSS selector pointing to an element in the document to use as the trigger target.',
    type: 'string',
    status: 'optional',
  },
  horizontalOffset: {
    doc: 'Horizontal offset in pixels to adjust the popover placement. Positive values move the popover to the right, negative values move it to the left. Useful for fine-tuning alignment when the default placement needs adjustment.',
    type: 'number',
    defaultValue: '0',
    status: 'optional',
  },
  arrowEdgeOffset: {
    doc: 'Offset in pixels from the edge when the arrow is positioned at the edge. When set, this value replaces the default edge spacing (8px) and arrow boundary (8px). Useful for components like Tooltip that need the arrow closer to the edge.',
    type: 'number',
    status: 'optional',
  },
  openInitially: {
    doc: 'Whether the popover should be open by default when uncontrolled.',
    type: 'boolean',
    status: 'optional',
  },
  open: {
    doc: 'Controls the open state when provided. Use together with `onOpenChange`.',
    type: 'boolean',
    status: 'optional',
  },
  placement: {
    doc: 'Preferred placement of the popover relative to the trigger.',
    type: ['top', 'right', 'bottom', 'left'],
    defaultValue: 'bottom',
    status: 'optional',
  },
  alignOnTarget: {
    doc: 'Adjust horizontal alignment of the popover body when `placement` is `top`/`bottom`; ignored for other placements.',
    type: ['left', 'center', 'right', 'null'],
    defaultValue: 'center',
    status: 'optional',
  },
  arrowPosition: {
    doc: 'Align the arrow along the axis of the selected `placement` (e.g., left/right for `placement="right"`).',
    type: ['center', 'top', 'right', 'bottom', 'left'],
    defaultValue: 'center',
    status: 'optional',
  },
  arrowPositionSelector: {
    doc: 'CSS selector that points to the element the arrow should align with. When the popover points vertically it aligns horizontally, and vice versa for horizontal placements.',
    type: 'string',
    status: 'optional',
  },
  hideArrow: {
    doc: 'Hide the arrow element from the popover. When `true`, the arrow will not be rendered regardless of the `arrowPosition` prop.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  theme: {
    doc: 'Sets the surface style.',
    type: ['light', 'dark'],
    status: 'optional',
  },
  contentClassName: {
    doc: 'Additional class name(s) merged into the popover content wrapper.',
    type: 'string',
    status: 'optional',
  },
  baseClassName: {
    doc: 'Overrides the default BEM root block. Useful when mirroring Popover styles.',
    type: 'string',
    status: 'optional',
  },
  hideOutline: {
    doc: 'Removes the outline/border that normally surrounds the popover surface.',
    type: 'boolean',
    status: 'optional',
  },
  hideCloseButton: {
    doc: 'Removes the built-in close button.',
    type: 'boolean',
    status: 'optional',
  },
  disableFocusTrap: {
    doc: 'Stops rendering the focus-trap button used to return focus to the trigger.',
    type: 'boolean',
    status: 'optional',
  },
  focusOnOpen: {
    doc: 'If true, focus is moved into the popover content when it opens.',
    type: 'boolean',
    status: 'optional',
  },
  focusOnOpenElement: {
    doc: 'Provide a specific element (or function returning one) to receive focus when the popover opens.',
    type: 'HTMLElement | () => HTMLElement',
    status: 'optional',
  },
  restoreFocus: {
    doc: 'Moves focus back to the trigger element once the popover closes (defaults to true).',
    type: 'boolean',
    status: 'optional',
  },
  preventClose: {
    doc: 'Prevent closing the popover when interacting outside of it or pressing Escape. Useful when the popover needs to stay open while other parts of the page are interacted with.',
    type: 'boolean',
    status: 'optional',
  },
  showDelay: {
    doc: 'Delay (ms) before the popover becomes active. Useful for hover-triggered popovers.',
    type: 'number',
    status: 'optional',
  },
  hideDelay: {
    doc: 'Delay (ms) before the popover starts hiding. Defaults to 0.',
    type: 'number',
    status: 'optional',
  },
  noInnerSpace: {
    doc: 'Remove the default padding inside the popover by setting `--inner-space: 0` on the surface.',
    type: 'boolean',
    status: 'optional',
  },
  closeButtonProps: {
    doc: 'Customize the built-in close button (icon, title, variant, etc.).',
    type: 'Partial<ButtonProps>',
    status: 'optional',
  },
  skipPortal: {
    doc: 'Render inline instead of inside the shared Popover portal.',
    type: 'boolean',
    status: 'optional',
  },
  portalRootClass: {
    doc: 'Extra className applied to the portal wrapper (only when not using `skipPortal`).',
    type: 'string',
    status: 'optional',
  },
  keepInDOM: {
    doc: 'Keep the portal mounted in the DOM even when the popover is closed. Useful when the content should preserve its state.',
    type: 'boolean',
    defaultValue: 'false',
    status: 'optional',
  },
  noAnimation: {
    doc: 'Disable show/hide animations.',
    type: 'boolean',
    status: 'optional',
  },
  fixedPosition: {
    doc: 'Use fixed positioning so the popover follows the viewport instead of the page scroll.',
    type: 'boolean',
    status: 'optional',
  },
  autoAlignMode: {
    doc: "Control when the popover automatically flips its placement to fit within the viewport. `initial` (default): Flip placement only on initial open when there's limited space. `scroll`: Flip placement on initial open and during scroll events. `never`: Never automatically flip placement, always use the specified `placement` property.",
    type: ['initial', 'scroll', 'never'],
    defaultValue: 'initial',
    status: 'optional',
  },
  contentRef: {
    doc: 'Ref forwarded to the popover content element.',
    type: 'React.RefObject<HTMLSpanElement>',
    status: 'optional',
  },
  omitDescribedBy: {
    doc: 'Skips adding aria-describedBy on the trigger when you handle accessibility yourself.',
    type: 'boolean',
    status: 'optional',
  },
}

export const PopoverEventProps: PropertiesTableProps = {
  onOpenChange: {
    doc: 'Called whenever the open state changes (both controlled and uncontrolled).',
    type: '(open: boolean) => void',
    status: 'optional',
  },
}
