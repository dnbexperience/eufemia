import type { PropertiesTableProps } from '../../../../shared/types'
import { ListFormatProperties } from '../../../../components/list-format/ListFormatDocs'

export const MultiSelectionProperties: PropertiesTableProps = {
  ...ListFormatProperties,
  data: {
    doc: 'Data to resolve values to their display titles. Array of objects with `value` and `title` properties.',
    type: 'Array<{ value, title }>',
    status: 'optional',
  },
  dataPath: {
    doc: 'The path to the context data (Form.Handler). The context data object needs to have a `value` and a `title` property.',
    type: 'string',
    status: 'optional',
  },
}
