import { PropertiesTableProps } from '../../../../shared/types'
import { StringProperties } from '../String/StringDocs'

export const EmailProperties: PropertiesTableProps = {
  ...StringProperties,
  maxLength: {
    doc: 'Validation for maximum length of the text (number of characters). Defaults to `254` based on the RFC 5321 email address length limit.',
    type: 'number',
    status: 'optional',
  },
}
