import { PropertiesTableProps } from '../../shared/types'

export const ToggleButtonProperties: PropertiesTableProps = {
  value: {
    doc: 'defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "ToggleButtonGroup".',
    type: 'unknown',
    state: 'required',
  },
  text: {
    doc: 'the text shown in the ToggleButton.',
    type: 'unknown',
    state: 'required',
  },
  checked: {
    doc: 'Determine whether the ToggleButton is checked or not. The default will be `false`.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'The `title` of the input - describing it a bit further for accessibility reasons.',
    type: 'unknown',
    state: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'unknown',
    state: 'optional',
  },
  icon: {
    doc: 'Icon to be included in the toggle button.',
    type: 'unknown',
    state: 'optional',
  },
  icon_position: {
    doc: 'Position of the icon inside the toggle button. Set to `left` or `right`. Defaults to `right` if not set.',
    type: 'unknown',
    state: 'optional',
  },
  icon_size: {
    doc: 'Define icon width and height. Defaults to 16px.',
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
  suffix: {
    doc: 'Text describing the content of the ToggleButton more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButton component.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const ToggleButtonGroupProperties: PropertiesTableProps = {
  value: {
    doc: 'Defines the pre-selected ToggleButton button. The value has to match the one provided in the ToggleButton button. Use a string value.',
    type: 'unknown',
    state: 'optional',
  },
  values: {
    doc: 'Defines the pre-selected ToggleButton buttons in `multiselect` mode. The values have to match the one provided in the ToggleButton buttons. Use array, either as JS or JSON string.',
    type: 'unknown',
    state: 'optional',
  },
  multiselect: {
    doc: "Defines if the ToggleButton's should act as a multi-selectable list of toggle buttons. Defaults to `false`.",
    type: 'unknown',
    state: 'optional',
  },
  layout_direction: {
    doc: 'Define the layout direction of the ToggleButton buttons. Can be either `column` or `row`. Defaults to `column`.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'The `title` of group, describing it a bit further for accessibility reasons.',
    type: 'unknown',
    state: 'optional',
  },
  status: {
    doc: 'Uses the `form-status` component to show failure messages.',
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
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'unknown',
    state: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'unknown',
    state: 'optional',
  },
  label_direction: {
    doc: 'To define the `label` layout direction on how the next element should be placed on. Can be either `vertical` or `horizontal`. Defaults to `horizontal`.',
    type: 'unknown',
    state: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'unknown',
    state: 'optional',
  },
  vertical: {
    doc: 'Will force both `direction` and `label_direction` to be **vertical** if set to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const ToggleButtonEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.',
    type: 'unknown',
    state: 'optional',
  },
}

export const ToggleButtonGroupEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called once a ToggleButton button changes the state. Returns an object `{ value, values, event }`. <br /><br /> **NB**: `values` is only available if `multiselect` is used / true.',
    type: 'unknown',
    state: 'optional',
  },
}
