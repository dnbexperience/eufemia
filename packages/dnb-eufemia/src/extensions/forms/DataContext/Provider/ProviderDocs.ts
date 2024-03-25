import { PropertiesTableProps } from '../../../../shared/types'

export const ProviderProperties: PropertiesTableProps = {
  defaultData: {
    doc: 'Default source data, only used if no other source is available, and not leading to updates if changed after mount.',
    type: 'object',
    state: 'required',
  },
  data: {
    doc: 'Dynamic source data used as both initial data, and updates internal data if changed after mount.',
    type: 'object',
    state: 'required',
  },
  schema: {
    doc: 'JSON Schema for validation of the data set.',
    type: 'object',
    state: 'optional',
  },
  errorMessages: {
    doc: 'Object containing error messages by either type of JSON Pointer path and type.',
    type: 'object',
    state: 'optional',
  },
  minimumAsyncBehaviorTime: {
    doc: 'Minimum time to display the submit indicator. Default is 1s.',
    type: 'boolean',
    state: 'optional',
  },
  asyncBehaviorTimeout: {
    doc: 'The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission. Default is 30s.',
    type: 'boolean',
    state: 'optional',
  },
  scrollTopOnSubmit: {
    doc: 'True for the UI to scroll to the top of the page when data is submitted.',
    type: 'boolean',
    state: 'optional',
  },
  sessionStorageId: {
    doc: 'Key for saving active data to session storage and loading it on mount.',
    type: 'string',
    state: 'optional',
  },
  ajvInstance: {
    doc: 'Provide your own custom Ajv instance. More info in the <a href="/uilib/extensions/forms/extended-features/Form/schema-validation/#custom-ajv-instance-and-keywords">Schema validation</a> section.',
    type: 'ajv',
    state: 'optional',
  },
  filterData: {
    doc: 'Filter the internal data context based on your criteria: `(path, value, props) => !props?.disabled`. It will iterate on each data entry.',
    type: 'function',
    state: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    state: 'required',
  },
}

export const ProviderEvents: PropertiesTableProps = {
  onChange: {
    doc: "Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument. When an async function is provided, it will show an indicator on the current label during a field change. Related props: `minimumAsyncBehaviorTime` and `asyncBehaviorTimeout`. You can return an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` in addition to { success: 'saved' } indicate the field was saved. Will emit unvalidated by default and validated when an async function is provided.",
    type: 'function',
    state: 'optional',
  },
  onPathChange: {
    doc: 'Will be called when a value of a field was changed by the user, with the `path` (JSON Pointer) and new `value` as arguments. Can be an async function. Will emit unvalidated by default and validated when `onChange` is an async function.',
    type: 'function',
    state: 'optional',
  },
  onSubmit: {
    doc: "Will be called (on validation success) when the user submit the form (i.e by clicking a [SubmitButton](/uilib/extensions/forms/extended-features/Form/SubmitButton) component inside), with the data set as argument. When an async function is provided, it will show an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. Related props: `minimumAsyncBehaviorTime` and `asyncBehaviorTimeout`. You can return an error or an object with these keys `{ state: 'pending', info: 'Info message', warning: 'Warning message', error: Error('My error') } as const` to be shown in a [FormStatus](/uilib/components/form-state). Will only emit when every validation has passed.",
    type: 'function',
    state: 'optional',
  },
  onSubmitRequest: {
    doc: 'Will be called when the user tries to submit, but errors stop the data from being submitted.',
    type: 'function',
    state: 'optional',
  },
  onSubmitComplete: {
    doc: 'Will be called after onSubmit has finished and had not errors. It supports the same return values as `onSubmit` and will be merged together.',
    type: 'function',
    state: 'optional',
  },
}
