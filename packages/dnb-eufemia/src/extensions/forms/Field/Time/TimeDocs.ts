import type { PropertiesTableProps } from '../../../../shared/types'
import { InputProperties } from '../../../../components/input/InputDocs'
import { getFieldEventsWithTypes } from '../FieldDocs'

export const TimeProperties: PropertiesTableProps = {
  size: {
    ...InputProperties.size,
    doc: `${InputProperties.size.doc} Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).`,
  },
  showSeconds: {
    doc: 'If set to `true`, a seconds input is shown in addition to hours and minutes.',
    type: 'boolean',
    status: 'optional',
  },
  onBlurValidator: {
    doc: 'Custom validator function that is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }. Defaults to validating invalid hours and minutes, using `timeValidator`.',
    type: 'function',
    status: 'optional',
  },
}

export const TimeSpecificEvents: PropertiesTableProps = {
  onChange: {
    doc: 'Callback on hours, minutes, and seconds change.',
    type: '(value?: string, additionalArgs?: { hours?: string, minutes?: string, seconds?: string }) => void',
    status: 'optional',
  },
}

const { onChange: _, ...generalEvents } = getFieldEventsWithTypes(
  { type: 'string', optional: true },
  { type: 'object' }
)

export const TimeGeneralEvents = generalEvents
