import { PropertiesTableProps } from '../../../../shared/types'

export const phoneNumberEvents: PropertiesTableProps = {
  onCountryCodeChange: {
    doc: ' Callback on country code change.',
    type: '(value: string | undefined) => void',
    status: 'optional',
  },
  onNumberChange: {
    doc: 'Callback on phone number change.',
    type: '(value: string | undefined) => void',
    status: 'optional',
  },
}
