import { PropertiesTableProps } from '../../shared/types'

export const ToggleButtonGroupProperties: PropertiesTableProps = {
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

export const ToggleButtonGroupEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns a boolean and string `{ checked, value, event }`.',
    type: 'unknown',
    state: 'optional',
  },
}
