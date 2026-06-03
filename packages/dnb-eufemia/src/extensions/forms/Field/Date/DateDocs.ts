import {
  DatePickerProperties,
  DatePickerEvents,
} from '../../../../components/date-picker/DatePickerDocs'
import type { PropertiesTableProps } from '../../../../shared/types'
import { datePickerPropKeys } from './Date'

// Build the subset of DatePickerProperties that Field.Date forwards,
// using datePickerPropKeys as the source of truth.
// Event props (on*) are documented in DateEvents, not here.
const datePickerProperties = datePickerPropKeys.reduce((acc, key) => {
  if (DatePickerProperties[key]) {
    acc[key] = DatePickerProperties[key]
  }

  return acc
}, {} as PropertiesTableProps)

// `range`, `showInput`, `showCancelButton` and `showResetButton` inherit from `DatePickerProperties`
// Since they require `Field.Date` specific documentation, due to them having different default values
export const DateProperties: PropertiesTableProps = {
  range: {
    ...DatePickerProperties.range,
    doc:
      'Defines if the Date field should support a value of two dates (starting and ending date). ' +
      'The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. ' +
      'Defaults to `false`.',
  },
  rangeSingleCalendar: {
    ...DatePickerProperties.rangeSingleCalendar,
  },
  showInput: {
    ...DatePickerProperties.showInput,
    doc: 'If the input fields with the mask should be visible. Defaults to `true`.',
  },
  showCancelButton: {
    ...DatePickerProperties.showCancelButton,
    doc: 'If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"`. Defaults to `true`. If the `range` property is `true`, then the cancel button is shown.',
  },
  showResetButton: {
    ...DatePickerProperties.showResetButton,
    doc: 'If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"`. When clicked, the field resets to the initial `value` or `defaultValue`. If no initial value was provided, the field is cleared. Defaults to `true`.',
  },
  size: {
    ...DatePickerProperties.size,
    doc: `${DatePickerProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
  ...datePickerProperties,
  onType: {
    doc: 'Event handler that is called when the user types in the input field. The first parameter is a string, the second parameter is an object containing { date, startDate, endDate, isValid, event }.',
    type: 'function',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validating invalid dates, and dates against `minDate` and `maxDate`, using `dateValidator`. Can be disabled using `false`.',
    type: 'function',
    status: 'optional',
  },
}
// Filter out the events that are handled by `useFieldProps`
const { onChange, onBlur, onFocus, ...datePickerEvents } = DatePickerEvents

export const DateEvents = datePickerEvents
