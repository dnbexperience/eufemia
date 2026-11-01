import type { PropertiesTableProps } from '../../../../shared/types'
import { ListFormatProperties } from '../../../../components/list-format/ListFormatDocs'

// `value` is in the general properties; the other omitted keys are not supported
const {
  value,
  children,
  inside,
  outside,
  nested,
  ref,
  ...listProperties
} = ListFormatProperties

export const MultiSelectionProperties: PropertiesTableProps = {
  ...listProperties,
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
