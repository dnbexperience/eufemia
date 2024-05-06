import { PropertiesTableProps } from '../../../../shared/types'

export const NameProperties: PropertiesTableProps = {
  capitalize: {
    doc: 'Will capitalize the first letter of every word, transforming the rest to lowercase. Is enabled by default for first name and last name.',
    type: 'boolean',
    status: 'optional',
  },
}
