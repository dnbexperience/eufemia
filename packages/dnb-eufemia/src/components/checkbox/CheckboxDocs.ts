import type { PropertiesTableProps } from '../../shared/types'

export const CheckboxProperties: PropertiesTableProps = {
  checked: {
    doc: 'Determine whether the checkbox is checked or not. The default is `false`.',
    type: 'boolean',
    status: 'optional',
  },
  title: {
    doc: 'The `title` of the input - describing it a bit further for accessibility reasons.',
    type: 'string',
    status: 'optional',
  },
  label: {
    doc: 'Use either the `label` property or provide a custom one.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  labelPosition: {
    doc: 'Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.',
    type: 'string',
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  size: {
    doc: 'The size of the checkbox. For now there is "medium" (default) and "large".',
    type: ['"default"', '"medium"', '"large"'],
    status: 'optional',
  },
  indeterminate: {
    doc: 'Controls the checkbox indeterminate (partial) state.',
    type: 'boolean',
    status: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: ['"error"', '"information"', 'boolean'],
    status: 'optional',
  },
  statusState: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: ['"error"', '"information"'],
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional FormStatus properties. See [FormStatus](/uilib/components/form-status/properties/)',
    type: 'FormStatusProps',
    status: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status)',
    type: 'object',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the Checkbox more than the label. You can also send in a React component, so it gets wrapped inside the Checkbox component.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  ref: {
    doc: 'By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.createRef()` or `React.useRef()`.',
    type: 'React.RefObject',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },
}

export const CheckboxEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called on state changes made by the user.',
    type: '({ checked: boolean; event: ChangeEvent }) => void',
    status: 'optional',
  },
  onClick: {
    doc: 'Will be called on click.',
    type: '({ checked: boolean; event: MouseEvent, preventDefault: () => void }) => void',
    status: 'optional',
  },
}
