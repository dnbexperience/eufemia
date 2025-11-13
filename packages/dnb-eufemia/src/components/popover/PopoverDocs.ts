import { PropertiesTableProps } from '../../shared/types'

export const PopoverProperties: PropertiesTableProps = {
  content: {
    doc: 'Content rendered inside the popover. Can also be a render function that receives helpers such as `close`.',
    type: [
      'React.ReactNode',
      '({ close, open, toggle, id }) => React.ReactNode',
    ],
    status: 'required',
  },
  trigger: {
    doc: 'Custom trigger element or render function. Required unless you point Popover at an existing element using `targetElement` / `targetSelector`.',
    type: [
      'React.ReactNode',
      '({ active, ref, toggle, open, close }) => React.ReactNode',
    ],
    status: 'optional',
  },
  title: {
    doc: 'Optional heading shown above the body content. Matches the typography used in WordDefinition.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  showCloseButton: {
    doc: 'Toggle rendering of the built-in close button that appears inside the popover.',
    type: 'boolean',
    status: 'optional',
  },
  hideCloseButton: {
    doc: 'Convenience prop to remove the built-in close button (takes precedence over `showCloseButton`).',
    type: 'boolean',
    status: 'optional',
  },
  defaultOpen: {
    doc: 'Whether the popover should be open by default when uncontrolled.',
    type: 'boolean',
    status: 'optional',
  },
  open: {
    doc: 'Controls the open state when provided. Use together with `onOpenChange`.',
    type: 'boolean',
    status: 'optional',
  },
  onOpenChange: {
    doc: 'Called whenever the open state changes (both controlled and uncontrolled).',
    type: '(open: boolean) => void',
    status: 'optional',
  },
  focusOnOpen: {
    doc: 'If true, focus is moved into the popover content when it opens.',
    type: 'boolean',
    status: 'optional',
  },
  closeOnOutsideClick: {
    doc: 'Close the popover when clicking or tabbing outside of it.',
    type: 'boolean',
    status: 'optional',
  },
  '[Tooltip props](/uilib/components/tooltip/properties)': {
    doc: 'Supports every property from Tooltip (e.g. `position`, `arrow`, `align`, `portalRootClass`).',
    type: 'TooltipProps',
    status: 'optional',
  },
}
