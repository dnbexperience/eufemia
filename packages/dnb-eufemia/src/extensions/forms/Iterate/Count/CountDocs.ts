import { PropertiesTableProps } from '../../../../shared/types'

export const CountProperties: PropertiesTableProps = {
  path: {
    doc: 'The path (JSON Pointer) to the array or object to count.',
    type: 'string',
    status: 'required',
  },
  id: {
    doc: 'A Form.Handler or DataContext `id` for when called outside of the context.',
    type: 'string',
    status: 'optional',
  },
  filter: {
    doc: 'A filter function to filter the data before counting.',
    type: 'string',
    status: 'optional',
  },
}

export const CountEvents: PropertiesTableProps = {}
