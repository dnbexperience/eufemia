import { PropertiesTableProps } from '../../shared/types'

export const DropdownEvents = {
  on_change: {
    doc: 'will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }`.',
    type: 'function',
    status: 'optional',
  },
  on_select: {
    doc: 'will be called once the user focuses or selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }`. The **active_item** property is the currently selected item by keyboard navigation.',
    type: 'function',
    status: 'optional',
  },
  on_show: {
    doc: 'will be called once the user presses the dropdown. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
  on_hide: {
    doc: 'will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data, attributes }`.',
    type: 'function',
    status: 'optional',
  },
} satisfies PropertiesTableProps

export const DropdownProperties = {
  title: {
    doc: 'give a title to let the users know what they have to do. Defaults to `Valgmeny`.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  value: {
    doc: 'define a preselected data entry (index). More info down below.',
    type: 'number',
    status: 'optional',
  },
  variant: {
    doc: 'defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.',
    type: ['primary', 'secondary', 'tertiary', 'signal'],
    status: 'optional',
  },
  icon: {
    doc: 'icon to be included in the dropdown.',
    type: 'React.Node',
    status: 'optional',
  },
  icon_size: {
    doc: 'change the size of the icon pragmatically.',
    type: 'string',
    status: 'optional',
  },
  icon_position: {
    doc: 'position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  triangle_position: {
    doc: 'position of arrow / triangle of the drawer. Set to `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  size: {
    doc: 'define the height of the Dropdown. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.',
    type: ['small', 'default', 'medium', 'large'],
    status: 'optional',
  },
  opened: {
    doc: 'if set to `true`, the Dropdown will be rendered initially with a visible and accessible data list / options.',
    type: 'boolean',
    status: 'optional',
  },
  open_on_focus: {
    doc: 'if set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.',
    type: 'boolean',
    status: 'optional',
  },
  preventSelection: {
    doc: 'if set to `true`, no permanent selection will be made. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  action_menu: {
    doc: 'same as `preventSelection`, but the DrawerList will be opened from the bottom of the page for mobile devices. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  more_menu: {
    doc: 'same as `preventSelection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  align_dropdown: {
    doc: 'use `right` to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `more_menu`. Defaults to `left`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  independent_width: {
    doc: 'If set to `true`, the Dropdown will handle its width independent to the content width. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  skip_portal: {
    doc: 'set to `true` to disable the React Portal behavior. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  stretch: {
    doc: 'if set to `true`, then the dropdown will be 100% in available `width`.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['error', 'info', 'boolean'],
    status: 'optional',
  },
  status_state: {
    doc: "defines the state of the status. It's two statuses `[error, info]`. Defaults to `error`.",
    type: ['error', 'info'],
    status: 'optional',
  },
  status_props: {
    doc: 'use an object to define additional FormStatus properties.',
    type: 'object',
    status: 'optional',
  },
  globalStatus: {
    doc: 'the [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'object',
    status: 'optional',
  },
  label: {
    doc: 'prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  label_direction: {
    doc: 'use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: ['horizontal', 'vertical'],
    status: 'optional',
  },
  label_sr_only: {
    doc: 'use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  trigger_element: {
    doc: 'lets you provide a custom React element as the trigger HTML element.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  innerRef: {
    doc: 'by providing a React.ref you can get the internally used main element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  buttonRef: {
    doc: 'by providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  '[DrawerList](/uilib/components/fragments/drawer-list/properties)': {
    doc: 'all DrawerList properties.',
    type: 'Various',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
} satisfies PropertiesTableProps
