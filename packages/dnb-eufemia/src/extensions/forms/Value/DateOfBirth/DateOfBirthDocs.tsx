import type { PropertiesTableProps } from '../../../../shared/types'

export const DateOfBirthValueProperties: PropertiesTableProps = {
  dateFormat: {
    doc: 'Defines the date format for handling the internal date value. The default value is `yyyy-MM-dd`.',
    type: 'string',
    status: 'optional',
  },
}
