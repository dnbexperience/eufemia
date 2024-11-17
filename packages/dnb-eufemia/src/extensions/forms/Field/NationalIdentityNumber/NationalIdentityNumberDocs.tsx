import { PropertiesTableProps } from '../../../../shared/types'

export const NationalIdentityNumberProperties: PropertiesTableProps = {
  validate: {
    doc: 'Using this prop you can disable the default validation.',
    type: 'boolean',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validation of the identification number(national identity numbers and D numbers), using `dnrAndFnrValidator`. Can be disabled using `false`.',
    type: 'function',
    status: 'optional',
  },
}
