import type { PropertiesTableProps } from '../../../../shared/types'
import { StringProperties } from '../String/StringDocs'

export const NameProperties: PropertiesTableProps = {
  ...StringProperties,
  minLength: {
    ...StringProperties.minLength,
    doc: 'Validation for minimum length of the text (number of characters). Defaults to `1`.',
  },
}

export const NameEvents: PropertiesTableProps = {
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to name validation, using `nameValidator`. For `Field.Name.Company` it uses `companyValidator`. Can be disabled using `false`.',
    type: 'function',
    status: 'optional',
  },
}
