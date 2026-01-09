import type { PropertiesTableProps } from '../../../../shared/types'
import { getFieldEventsWithTypes } from '../FieldDocs'

export const DateOfBirthProperties: PropertiesTableProps = {
  dateFormat: {
    doc: 'Defines the date format. The default value is `yyyy-MM-dd`.',
    type: 'string',
    status: 'optional',
  },
  validate: {
    doc: 'Using this prop you can disable the default validation.',
    type: 'boolean',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to date of birth validation, using `dateOfBirthValidator`. Can be disabled using `false`.',
    type: 'function',
    status: 'optional',
  },
}

export const DateOfBirthSpecificEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Callback on day, month, and year change.',
    type: '(value?: string, additionalArgs?: { day?: string, month?: string, year?: string }) => void',
    status: 'optional',
  },
  onDayChange: {
    doc: 'Callback on day change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
  onMonthChange: {
    doc: 'Callback on month change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
  onYearChange: {
    doc: 'Callback on year change.',
    type: '(value?: string) => void',
    status: 'optional',
  },
}

export const DateOfBirthGeneralEvents = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object' }
)
