import { PropertiesTableProps } from '../../shared/types'

export const RadioGroupProperties: PropertiesTableProps = {
  value: {
    doc: 'defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the "RadioGroup".',
    type: 'unknown',
    state: 'required',
  },
  checked: {
    doc: 'Determine whether the radio is checked or not. Default will be `false`.',
    type: 'unknown',
    state: 'optional',
  },
  group: {
    doc: 'Use a unique group identifier to define the Radio buttons that belongs together.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'The size of the Radio button. For now there is "medium" (default) and "large".',
    type: 'unknown',
    state: 'optional',
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
  innerRef: {
    doc: 'By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'unknown',
    state: 'optional',
  },
}

export const RadioGroupEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on state changes made by the user. Returns an object `{ checked, value, event }`.',
    type: 'unknown',
    state: 'optional',
  },
}
