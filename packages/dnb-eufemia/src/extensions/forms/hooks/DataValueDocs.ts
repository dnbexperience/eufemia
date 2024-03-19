import { PropertiesTableProps } from '../../../shared/types'

export const dataValueProperties: PropertiesTableProps = {
  value: {
    doc: 'Source data value for the input.',
    type: '{valueType}',
    status: 'optional',
  },
  path: {
    doc: 'JSON Pointer for where the data for this input is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.',
    type: 'string',
    status: 'optional',
  },
  id: {
    doc: 'Unique id for connecting Form.Handler and helper tools such as Form.useData.',
    type: 'string',
    status: 'optional',
  },
  info: {
    doc: 'Info message shown below / after the input.',
    type: 'React.Node',
    status: 'optional',
  },
  warning: {
    doc: 'Warning message shown below / after the input.',
    type: 'React.Node',
    status: 'optional',
  },
  error: {
    doc: 'Error message shown below / after the input.',
    type: 'Error',
    status: 'optional',
  },
  disabled: {
    doc: 'Set `true` to show the field but without the possibility of changing the value.',
    type: 'boolean',
    status: 'optional',
  },
  emptyValue: {
    doc: 'The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.',
    type: 'any',
    status: 'optional',
  },
  required: {
    doc: 'When set `true`, the input will give an error if the value cannot be empty.',
    type: 'boolean',
    status: 'optional',
  },
  schema: {
    doc: 'Custom JSON Schema for validating the value.',
    type: 'object',
    status: 'optional',
  },
  validateInitially: {
    doc: 'Set `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.',
    type: 'boolean',
    status: 'optional',
  },
  validateUnchanged: {
    doc: 'Set `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.',
    type: 'boolean',
    status: 'optional',
  },
  continuousValidation: {
    doc: 'Set `true` to show validation based errors continuously while writing, not just when blurring the field.',
    type: 'boolean',
    status: 'optional',
  },
  errorMessages: {
    doc: 'Custom error messages for each type of error, overriding default messages.',
    type: 'object',
    status: 'optional',
  },
  validator: {
    doc: 'Custom validator function that will be called for every change done by the user. Can be asynchronous or synchronous.',
    type: 'function',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function that will be called when the user leaves the field (blurring a text input, closing a dropdown etc). Can be asynchronous or synchronous.',
    type: 'function',
    status: 'optional',
  },
  toInput: {
    doc: 'Derivate called when the received / active value is sent to the input. Can be used for casting, changing syntax etc.',
    type: 'function',
    status: 'optional',
  },
  fromInput: {
    doc: 'Derivate called when changes is made by the user, to cast or change syntax back to the original (opposite of `toInput`).',
    type: 'function',
    status: 'optional',
  },
}

export const dataValueEvents: PropertiesTableProps = {
  onChange: {
    doc: "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`.",
    type: 'function',
    status: 'optional',
  },
  onFocus: {
    doc: 'Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument.',
    type: 'function',
    status: 'optional',
  },
  onBlur: {
    doc: 'Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument.',
    type: 'function',
    status: 'optional',
  },
}
