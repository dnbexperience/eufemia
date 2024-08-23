import { PropertiesTableProps } from '../../../../shared/types'

export const SelectionProperties: PropertiesTableProps = {
  dataPath: {
    doc: 'The path to the context data (Form.Handler). The object needs to have a `value` and a `title` property. The generated options will be placed above given JSX based children.',
    type: 'string',
    status: 'optional',
  },
}
