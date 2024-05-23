import { PropertiesTableProps } from '../../../../shared/types'

export const BlockProperties: PropertiesTableProps = {
  path: {
    doc: 'A path (JSON Pointer) to the array to iterate over.',
    type: 'string',
    status: 'optional',
  },
  overwriteProps: {
    doc: 'Overwrite field props for the block.',
    type: 'object',
    status: 'optional',
  },
  required: {
    doc: 'Makes all fields inside it required.',
    type: 'boolean',
    status: 'optional',
  },
  children: {
    doc: 'All the fields and values inside the block.',
    type: 'React.Node',
    status: 'optional',
  },
}

export const BlockEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.',
    type: 'function',
    status: 'optional',
  },
}
