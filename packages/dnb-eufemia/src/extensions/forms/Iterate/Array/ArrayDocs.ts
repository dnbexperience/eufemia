import { PropertiesTableProps } from '../../../../shared/types'

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
  withoutFlex: {
    doc: 'When `true` it will omit the Flex.Stack wrapper so it can be used for tables and lists.',
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
  children: {
    doc: 'React.Node or a function so you can get the current value and index.',
    type: 'boolean',
    status: 'optional',
  },
  '[Flex.Stack](/uilib/layout/flex/stack/)': {
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
