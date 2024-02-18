import { PropertiesTableProps } from '../../shared/types'

export const DropdownProperties: PropertiesTableProps = {
  title: {
    doc: 'Give a title to let the users know what they have to do. Defaults to `Valgmeny`.',
    type: 'unknown',
    state: 'optional',
  },
  value: {
    doc: 'Define a preselected data entry (index). More info down below.',
    type: 'unknown',
    state: 'optional',
  },
  variant: {
    doc: 'Defines the kind of dropdown. Possible values are `primary`, `secondary`, `tertiary` and `signal`. Defaults to `secondary`.',
    type: 'unknown',
    state: 'optional',
  },
  icon: {
    doc: 'Icon to be included in the dropdown.',
    type: 'unknown',
    state: 'optional',
  },
  icon_size: {
    doc: 'Change the size of the icon pragmatically.',
    type: 'unknown',
    state: 'optional',
  },
  icon_position: {
    doc: 'Position of the icon inside the dropdown. Set to `left` or `right`. Defaults to `right`.',
    type: 'unknown',
    state: 'optional',
  },
  triangle_position: {
    doc: 'Position of arrow / triangle of the drawer. Set to `left` or `right`. Defaults to `right`.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'Define the height of the Dropdown. Can be set to `small`, `default`, `medium` and `large`. Defaults to `default`.',
    type: 'unknown',
    state: 'optional',
  },
  opened: {
    doc: 'If set to `true`, the Dropdown will be rendered initially with a visible and accessible data list / options.',
    type: 'unknown',
    state: 'optional',
  },
  open_on_focus: {
    doc: 'If set to `true`, the Dropdown will be opened when the users enter the trigger button with a focus action.',
    type: 'unknown',
    state: 'optional',
  },
  prevent_selection: {
    doc: 'If set to `true`, no permanent selection will be made. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  action_menu: {
    doc: 'Same as `prevent_selection`, but the DrawerList will be opened from the bottom of the page for mobile devices. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  more_menu: {
    doc: 'Same as `prevent_selection`, but the "selection area" (given title) will not be visible and the icon `more` (three dots) is used. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  align_dropdown: {
    doc: 'Use `right` to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu`. Defaults to `left`.',
    type: 'unknown',
    state: 'optional',
  },
  independent_width: {
    doc: 'If set to `true`, the Dropdown will handle it&#39;s width independent to the content width. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  skip_portal: {
    doc: 'Set to `true` to disable the React Portal behavior. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the dropdown will be 100% in available `width`.',
    type: 'unknown',
    state: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'unknown',
    state: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'unknown',
    state: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'unknown',
    state: 'optional',
  },
  globalStatus: {
    doc: 'The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.',
    type: 'unknown',
    state: 'optional',
  },
  label: {
    doc: 'Prepends the Form Label component. If no ID is provided, a random ID is created.',
    type: 'unknown',
    state: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'unknown',
    state: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'unknown',
    state: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Dropdown more than the label. You can also send in a React component, so it gets wrapped inside the Dropdown component.',
    type: 'unknown',
    state: 'optional',
  },
  trigger_element: {
    doc: 'Lets you provide a custom React element as the trigger HTML element.',
    type: 'unknown',
    state: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.ref you can get the internally used main element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'unknown',
    state: 'optional',
  },
  buttonRef: {
    doc: 'By providing a React.ref you can get the internally used button element (DOM). E.g. `buttonRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  '[DrawerList](/uilib/components/fragments/drawer-list/properties)': {
    doc: 'all DrawerList properties.',
    type: 'Various',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const DropdownEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns an object with the new selected `data` item `{ data, event, attributes, value }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_select: {
    doc: 'Will be called once the user selects an item by a click or keyboard navigation. Returns an object with the new selected `data` item `{ data, event, attributes, value, active_item }`. The "active_item" property is the currently selected item by keyboard navigation',
    type: 'unknown',
    state: 'optional',
  },
  on_show: {
    doc: 'Will be called once the user presses the dropdown. Returns the data item `{ data, attributes }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_hide: {
    doc: 'Will be called once the user presses the dropdown again, or clicks somewhere else. Returns the data item `{ data, attributes }`.',
    type: 'unknown',
    state: 'optional',
  },
}
