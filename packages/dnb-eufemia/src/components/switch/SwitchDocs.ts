import { PropertiesTableProps } from '../../shared/types'

export const SwitchProperties: PropertiesTableProps = {
  checked: {
    doc: 'Determine whether the switch is checked or not. The default will be `false`.',
    type: 'boolean',
    status: 'optional',
  },
  title: {
    doc: 'The `title` of the input - describing it a bit further for accessibility reasons.',
    type: 'string',
    status: 'required',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'ReactNode',
    status: 'optional',
  },
  labelPosition: {
    doc: 'Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.',
    type: ['left', 'right'],
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'string',
    status: 'optional',
  },
  size: {
    doc: 'The size of the switch. For now there is **medium** (default) and **large**.',
    type: ['default', 'medium', 'large'],
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'ReactNode',
    status: 'optional',
  },
  statusState: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: ['error', 'warn', 'info', 'success', 'marketing'],
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional [FormStatus](/uilib/components/form-status/properties/) properties.',
    type: 'FormStatus',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'GlobalStatus',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Switch more than the label. You can also send in a React component, so it gets wrapped inside the Switch component.',
    type: 'ReactNode',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  innerRef: {
    doc: 'By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const SwitchEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on state changes made by the user.',
    type: '() => {checked: boolean; event: ChangeEvent}',
    status: 'optional',
  },
  onChangeEnd: {
    doc: 'Will be called on state changes made by the user, but with a delay. This way the user sees the animation before e.g. an error will be removed. Returns a boolean { checked, event }.',
    type: '() => {checked: boolean; event: ChangeEvent}',
    status: 'optional',
  },
}
