import { PropertiesTableProps } from '../../../../shared/types'

export const ProviderProperties: PropertiesTableProps = {
  defaultData: {
    doc: 'Default source data, only used if no other source is available, and not leading to updates if changed after mount.',
    type: 'object',
    status: 'required',
  },
  data: {
    doc: 'Dynamic source data used as both initial data, and updates internal data if changed after mount.',
    type: 'object',
    status: 'required',
  },
  schema: {
    doc: 'JSON Schema for validation of the data set.',
    type: 'object',
    status: 'optional',
  },
  errorMessages: {
    doc: 'Object containing error messages by either type of JSON Pointer path and type.',
    type: 'object',
    status: 'optional',
  },
  minimumAsyncBehaviorTime: {
    doc: 'Minimum time to display the submit indicator. Default is 1s.',
    type: 'boolean',
    status: 'optional',
  },
  asyncBehaviorTimeout: {
    doc: 'The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission. Default is 30s.',
    type: 'boolean',
    status: 'optional',
  },
  enableAsyncBehavior: {
    doc: 'True for showing an indicator on the submit button during the form submission. All form elements will be disabled during the submit. The indicator will be shown for minimum 1 second. When `onSubmit`, field `validator` or `onBlurValidator` is an asynchronous function, this will be enabled automatically.',
    type: 'boolean',
    status: 'optional',
  },
  scrollTopOnSubmit: {
    doc: 'True for the UI to scroll to the top of the page when data is submitted.',
    type: 'boolean',
    status: 'optional',
  },
  sessionStorageId: {
    doc: 'Key for saving active data to session storage and loading it on mount.',
    type: 'string',
    status: 'optional',
  },
  ajvInstance: {
    doc: 'Provide your own custom Ajv instance. More info in the <a href="/uilib/extensions/forms/extended-features/Form/schema-validation/#custom-ajv-instance-and-keywords">Schema validation</a> section.',
    type: 'ajv',
    status: 'optional',
  },
  filterData: {
    doc: 'Filter the internal data context based on your criteria: `(path, value, props) => !props?.disabled`. It will iterate on each data entry.',
    type: 'function',
    status: 'optional',
  },
  children: {
    doc: 'Contents.',
    type: 'React.Node',
    status: 'required',
  },
}

export const ProviderEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called when a value of any input component inside was changed by the user, with the data set (including the changed value) as argument.',
    type: 'function',
    status: 'optional',
  },
  onPathChange: {
    doc: 'Will be called when a value of any input component inside was changed by the user, with the `path` (JSON Pointer) and new `value` as arguments.',
    type: 'function',
    status: 'optional',
  },
  onSubmit: {
    doc: 'Will be called when the user submit the form (i.e by clicking a [SubmitButton](/uilib/extensions/forms/extended-features/Form/SubmitButton) component inside), with the data set as argument. Asynchronous functions are supported and will enable `enableAsyncBehavior` automatically.',
    type: 'function',
    status: 'optional',
  },
  onSubmitRequest: {
    doc: 'Will be called when the user tries to submit, but errors stop the data from being submitted.',
    type: 'function',
    status: 'optional',
  },
  onSubmitComplete: {
    doc: 'Will be called when the onSubmit is finished and had not errors.',
    type: 'function',
    status: 'optional',
  },
}
