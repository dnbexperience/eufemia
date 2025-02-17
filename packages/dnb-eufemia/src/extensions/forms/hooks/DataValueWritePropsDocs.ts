import { PropertiesTableProps } from '../../../shared/types'

export const DataValueWritePropsProperties: PropertiesTableProps = {
  value: {
    doc: 'Source data value for the field. Will take precedence over the path value given in the data context.',
    type: '{valueType}',
    status: 'optional',
  },
  defaultValue: {
    doc: 'Default source data value for the field. Will not take precedence over the path value given in the data context.',
    type: '{valueType}',
    status: 'optional',
  },
  path: {
    doc: 'JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.',
    type: 'string',
    status: 'optional',
  },
  info: {
    doc: "Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
    type: ['React.Node', 'Array<React.Node>', 'function'],
    status: 'optional',
  },
  warning: {
    doc: "Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
    type: ['React.Node', 'Array<React.Node>', 'function'],
    status: 'optional',
  },
  error: {
    doc: "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
    type: ['Error', 'FormError', 'Array<Error | FormError>', 'function'],
    status: 'optional',
  },
  disabled: {
    doc: 'Set `true` to show the field but without the possibility of changing the value.',
    type: 'boolean',
    status: 'optional',
  },
  emptyValue: {
    doc: 'The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.',
    type: ['{valueType}', 'undefined'],
    status: 'optional',
  },
  required: {
    doc: 'When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a "(optional)" suffix to the label.',
    type: 'boolean',
    status: 'optional',
  },
  labelSuffix: {
    doc: 'Will append an additional text to the label, like "(optional)". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.',
    type: 'React.Node',
    status: 'optional',
  },
  schema: {
    doc: 'Custom JSON Schema for validating the value.',
    type: 'object',
    status: 'optional',
  },
  validateInitially: {
    doc: 'Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.',
    type: 'boolean',
    status: 'optional',
  },
  validateUnchanged: {
    doc: 'Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.',
    type: 'boolean',
    status: 'optional',
  },
  validateContinuously: {
    doc: 'Set to `true` to show validation based errors continuously while writing, not just when blurring the field.',
    type: 'boolean',
    status: 'optional',
  },
  errorMessages: {
    doc: 'Custom error messages for each type of error, overriding default messages.',
    type: 'object',
    status: 'optional',
  },
  onChangeValidator: {
    doc: 'Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.',
    type: 'function',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.',
    type: 'function',
    status: 'optional',
  },
  transformIn: {
    doc: 'Transforms the `value` before its displayed in the field (e.g. input).',
    type: 'function',
    status: 'optional',
  },
  transformOut: {
    doc: 'Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields to support a second parameter, like the SelectCountry, where the country object is given.',
    type: 'function',
    status: 'optional',
  },
}

export const DataValueWritePropsEvents: PropertiesTableProps = {
  onChange: {
    doc: "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
    type: '(value) => void',
    status: 'optional',
  },
  onFocus: {
    doc: 'Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).',
    type: '(value) => void',
    status: 'optional',
  },
  onBlur: {
    doc: 'Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).',
    type: '(value) => void',
    status: 'optional',
  },
}
