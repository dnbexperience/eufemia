import type { PropertiesTableProps } from '../../../../shared/types'

export const AtProperties: PropertiesTableProps = {
  children: {
    doc: 'Features with given path as root for the DataContext.',
    type: 'React.ReactNode',
    status: 'optional',
  },
  path: {
    doc: 'JSON Pointer path to where in the outer DataContext source to point at.',
    type: 'string',
    status: 'optional',
  },
  iterate: {
    doc: 'True to iterate elements at given path based on the source data, including the index in the outer path, instead of just rendering children once.',
    type: 'boolean',
    status: 'optional',
  },
}
