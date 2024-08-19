import { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'

export const phoneNumberSpecificEvents: PropertiesTableProps = {
  onCountryCodeChange: {
    doc: ' Callback on country code change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
  onNumberChange: {
    doc: 'Callback on phone number change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
}

export const phoneNumberGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object' }
)
