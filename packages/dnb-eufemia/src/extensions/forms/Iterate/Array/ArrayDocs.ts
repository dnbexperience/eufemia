import { PropertiesTableProps } from '../../../../shared/types'
import { DataValueWritePropsProperties } from '../../hooks/DataValueWritePropsDocs'

export const ArrayProperties: PropertiesTableProps = {
  value: {
    doc: 'The data to iterate over. Alternative you can use the `path` prop.',
    type: 'array',
    status: 'optional',
  },
  path: {
    doc: 'A path (JSON Pointer) to the array to iterate over.',
    type: 'string',
    status: 'optional',
  },
  required: {
    doc: "If the array is required. It does not automatically inherit the `required` property in the same way that `Field.*` components do. You may provide a custom error message to give the user a more useful message than the default one: `errorMessages={{ 'Field.errorRequired': 'Custom message' }}`",
    type: 'boolean',
    status: 'optional',
  },
  limit: {
    doc: 'Limit the number of rendered items to iterate over. Defaults to `undefined`.',
    type: 'number',
    status: 'optional',
  },
  countPath: {
    doc: 'A path (JSON Pointer) to the array length.',
    type: 'string',
    status: 'optional',
  },
  countPathTransform: {
    doc: 'Will transform the current value before it is displayed.',
    type: 'function',
    status: 'optional',
  },
  countPathLimit: {
    doc: 'Will limit the iterate amount by given "countPathLimit" value.',
    type: 'number',
    status: 'optional',
  },
  withoutFlex: {
    doc: 'When `true` it will omit the Flex.Stack wrapper so it can be used for tables and lists.',
    type: 'boolean',
    status: 'optional',
  },
  animate: {
    doc: 'When `true` it will animate the height of the items.',
    type: 'boolean',
    status: 'optional',
  },
  placeholder: {
    doc: 'Will be shown if the value or data context value is empty.',
    type: 'React.Node',
    status: 'optional',
  },
  emptyValue: {
    doc: 'Will be used to compare the value in order to show the placeholder.',
    type: 'unknown',
    status: 'optional',
  },
  containerMode: {
    doc: 'Defines the container mode for all nested containers. Can be `view`, `edit` or `auto`. When using `auto`, it will automatically open if there is an error in the container. When a new item is added, the item before it will change to `view` mode, if it had no validation errors. Defaults to `auto`.',
    type: 'string',
    status: 'optional',
  },
  onChangeValidator: DataValueWritePropsProperties.onChangeValidator,
  validateInitially: DataValueWritePropsProperties.validateInitially,
  validateContinuously: DataValueWritePropsProperties.validateContinuously,
  children: {
    doc: 'React.Node or a function so you can get the current value as the first function parameter, and the index as the second parameter as well as the array of internal items as the third parameter.',
    type: ['React.ReactNode', 'function'],
    status: 'optional',
  },
  '[Flex.Stack](/uilib/layout/flex/stack/properties)': {
    doc: 'All Flex.Stack properties.',
    type: 'Various',
    status: 'optional',
  },
}

export const ArrayEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.',
    type: 'function',
    status: 'optional',
  },
}
