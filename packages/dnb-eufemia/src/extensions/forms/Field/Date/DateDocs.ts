/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DatePickerProperties,
  DatePickerEvents,
} from '../../../../components/date-picker/DatePickerDocs'
import { PropertiesTableProps } from '../../../../shared/types'

// Filter out properties that are handled by `useFieldProps` or has a different default value
const {
  showCancelButton,
  showResetButton,
  showInput,
  range,
  skeleton,
  tooltip,
  globalStatus,
  statusProps,
  statusState,
  status,
  inputElement,
  label,
  labelDirection,
  labelSrOnly,
  suffix,
  stretch,
  '[Space](/uilib/layout/space/properties)': space,
  ...datePickerProperties
} = DatePickerProperties

// `range`, `showInput`, `showCancelButton` and `showResetButton` inherit from `DatePickerProperties`
// Since they require `Field.Date` specific documentation, due to them having different default values
export const DateProperties: PropertiesTableProps = {
  range: {
    ...range,
    doc:
      'Defines if the Date field should support a value of two dates (starting and ending date). ' +
      'The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. ' +
      'Defaults to `false`.',
  },
  showInput: {
    ...showInput,
    doc: 'If the input fields with the mask should be visible. Defaults to `true`.',
  },
  showCancelButton: {
    ...showCancelButton,
    doc: 'If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"` Defaults to `true`. If the `range` property is `true`, then the cancel button is shown.',
  },
  showResetButton: {
    ...showResetButton,
    doc: 'If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"` Defaults to `true`.',
  },
  ...datePickerProperties,
}
// Filter out the events that are handled by `useFieldProps`
const { onChange, onBlur, onFocus, ...datePickerEvents } = DatePickerEvents

export const DateEvents = datePickerEvents
