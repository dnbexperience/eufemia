import { PropertiesTableProps } from '../../../../shared/types'
import { inputProperties } from '../../../../components/input/InputDocs'

export const ExpiryProperties: PropertiesTableProps = {
  size: {
    ...inputProperties.size,
    doc: `${inputProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validating invalid month and year, using `expiryValidator`.',
    type: 'function',
    status: 'optional',
  },
}
