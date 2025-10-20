import { PropertiesTableProps } from '../../shared/types'

export const DropdownEvents = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }`.',
    type: 'function',
    status: 'optional',
  },
  on_select: {
    doc: 'Will be called once the user focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }`. The **active_item** property is the currently selected item by keyboard navigation.',
    type: 'function',
    status: 'optional',
  },
  on_show: {
    doc: 'Will be called once the user presses the dropdown. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
  on_hide: {
    doc: 'Will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
} satisfies PropertiesTableProps

export const DropdownProperties = {
  title: {
    doc: 'Give a title to let the users know what they have to do. Defaults to `Valgmeny`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  value: {
    doc: 'Define a preselected data entry (index). More info down below.',
    type: 'number',
    status: 'optional',
  },
  variant: {
    doc: 'Defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.',
    type: ['primary', 'secondary', 'tertiary', 'signal'],
    status: 'optional',
  },
  icon: {
    doc: 'Icon to be included in the dropdown.',
    type: 'React.Node',
    status: 'optional',
  },
  icon_size: {
    doc: 'Change the size of the icon pragmatically.',
    type: 'string',
    status: 'optional',
  },
  icon_position: {
    doc: 'Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  triangle_position: {
    doc: 'Position of arrow / triangle of the drawer. Set to `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  size: {
    doc: 'Define the height of the Dropdown. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.',
    type: ['small', 'default', 'medium', 'large'],
    status: 'optional',
  },
  opened: {
    doc: 'If set to `true`, the Dropdown will be rendered initially with a visible and accessible data list / options.',
    type: 'boolean',
    status: 'optional',
  },
  open_on_focus: {
    doc: 'If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.',
    type: 'boolean',
    status: 'optional',
  },
  preventSelection: {
    doc: 'If set to `true`, no permanent selection will be made. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  actionMenu: {
    doc: 'Same as `prevent_selection`, but the DrawerList will be opened from the bottom of the page for mobile devices. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  moreMenu: {
    doc: 'Same as `prevent_selection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  alignDropdown: {
    doc: 'Use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu`. Defaults to `left`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  independentWidth: {
    doc: 'If set to `true`, the Dropdown will handle its width independent to the content width. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skipPortal: {
    doc: 'set to `true` to disable the React Portal behavior. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the dropdown will be 100% in available `width`.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
    status: 'optional',
  },
  status_state: {
    doc: "Defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'object',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'object',
    status: 'optional',
  },
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: ['horizontal', 'vertical'],
    status: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  trigger_element: {
    doc: 'Lets you provide a custom React element as the trigger HTML element.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.ref you can get the internally used main element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  buttonRef: {
    doc: 'By providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[DrawerList](/uilib/components/fragments/drawer-list/properties)': {
    doc: 'All DrawerList properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
} satisfies PropertiesTableProps
