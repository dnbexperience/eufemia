import { PropertiesTableProps } from '../../../../shared/types'
import { stringProperties } from '../String/StringDocs'

export const BankAccountNumberProperties: PropertiesTableProps = {
  ...stringProperties,
  validate: {
    doc: 'Using this prop you can disable the default validation.',
    type: 'boolean',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to bank account number validation, using `bankAccountNumberValidator`. Can be disabled using `false`.',
    type: 'function',
    status: 'optional',
  },
}
