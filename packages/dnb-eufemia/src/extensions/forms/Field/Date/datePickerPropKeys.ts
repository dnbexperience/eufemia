import type { DatePickerProps } from '../../../../components/DatePicker'

// Includes DatePickerProps that are not destructured in useFieldProps.
// Single source of truth for both the type and the runtime key list.
// Lives in its own lightweight module (no component imports) so that
// documentation tooling (DateDocs.ts) can import it without evaluating
// the full Field.Date component.
export const datePickerPropKeys = [
  'month',
  'startMonth',
  'endMonth',
  'minDate',
  'maxDate',
  'maskOrder',
  'maskPlaceholder',
  'dateFormat',
  'returnFormat',
  'hideNavigation',
  'hideDays',
  'onlyMonth',
  'hideLastWeek',
  'disableAutofocus',
  'showSubmitButton',
  'submitButtonText',
  'cancelButtonText',
  'resetButtonText',
  'firstDay',
  'link',
  'size',
  'sync',
  'addonElement',
  'shortcuts',
  'open',
  'direction',
  'alignPicker',
  'onDaysRender',
  'onType',
  'onOpen',
  'onClose',
  'onSubmit',
  'onCancel',
  'onReset',
  'skipPortal',
  'yearNavigation',
  'tooltip',
  'triggerProps',
] as const satisfies ReadonlyArray<keyof DatePickerProps>
