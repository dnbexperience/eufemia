import { PropertiesTableProps } from '../../../../shared/types'
import { StringProperties } from '../String/StringDocs'

export const AddressProperties: PropertiesTableProps = {
  element: {
    doc: 'Define the type of element. Defaults to `Field.String`.',
    type: 'React.Element',
    status: 'optional',
  },
  ...StringProperties,
}
