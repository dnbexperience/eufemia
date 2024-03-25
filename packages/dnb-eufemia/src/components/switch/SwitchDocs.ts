import { PropertiesTableProps } from '../../shared/types'

export const SwitchProperties: PropertiesTableProps = {
  checked: {
    doc: 'Determine whether the switch is checked or not. The default will be `false`.',
    type: 'unknown',
    state: 'optional',
  },
  title: {
    doc: 'the `title` of the input - describing it a bit further for accessibility reasons.',
    type: 'unknown',
    state: 'required',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'unknown',
    state: 'optional',
  },
  label_position: {
    doc: 'Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.',
    type: 'unknown',
    state: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'The size of the switch. For now there is "medium" (default) and "large".',
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
    doc: 'Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.',
    type: 'unknown',
    state: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const SwitchEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns a boolean `{ checked, event }`.',
    type: 'unknown',
    state: 'optional',
  },
  on_change_end: {
    doc: 'Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean `{ checked, event }`.',
    type: 'unknown',
    state: 'optional',
  },
}
