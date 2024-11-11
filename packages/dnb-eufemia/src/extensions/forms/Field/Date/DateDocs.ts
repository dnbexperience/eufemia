import { PropertiesTableProps } from '../../../../shared/types'

// TODO: Merge with DatePickerProps after it's been camelCased
export const DateProperties: PropertiesTableProps = {
  help: {
    doc: 'Provide a help button. Object consisting of `title` and `content`.',
    type: 'object',
    status: 'optional',
  },
  range: {
    doc:
      'Defines if the Date field should support a value of two dates (starting and ending date). ' +
      'The `value` needs to be a string containing two dates, separated by a pipe character (`|`) (`01-09-2024|30-09-2024`) when this is set to `true`. ' +
      'Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  month: {
    doc: 'To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.',
    type: 'string',
    status: 'optional',
  },
  startMonth: {
    doc: 'To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.',
    type: 'string',
    status: 'optional',
  },
  endMonth: {
    doc: 'To display what month should be shown in the second calendar by default. Defaults to the `date` respective `start_date`.',
    type: 'string',
    status: 'optional',
  },
  minDate: {
    doc: 'To limit a date range to a minimum `start_date`. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  maxDate: {
    doc: 'To limit a date range to a maximum `end_date`. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  dateFormat: {
    doc: 'Defines how the property dates (`date`, `start_date` and `end_date`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.',
    type: 'string',
    status: 'optional',
  },
  returnFormat: {
    doc: 'Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.',
    type: 'string',
    status: 'optional',
  },
  showInput: {
    doc: 'If the input fields with the mask should be visible. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  maskOrder: {
    doc: 'To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`.',
    type: 'string',
    status: 'optional',
  },
  opened: {
    doc: 'To open the date-picker by default. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  maskPlaceholder: {
    doc: 'To display the placeholder on input. Defaults to `dd/mm/åååå`.',
    type: 'string',
    status: 'optional',
  },
  hideNavigation: {
    doc: 'If set to `true`, the navigation will be hidden. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  hideDays: {
    doc: 'If set to `true`, the week days will be hidden. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  showSubmitButton: {
    doc: 'If set to `true`, a submit button will be shown. You can change the default text by using `submit_button_text="Ok"`. Defaults to `false`. If the `range` property is `true`, then the submit button is shown.',
    type: 'boolean',
    status: 'optional',
  },
  showCancelButton: {
    doc: 'If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `true`. If the `range` property is `true`, then the cancel button is shown.',
    type: 'boolean',
    status: 'optional',
  },
  showResetButton: {
    doc: 'If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  link: {
    doc: 'Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  sync: {
    doc: 'Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.',
    type: 'boolean',
    status: 'optional',
  },
  firstDay: {
    doc: 'To define the first day of the week. Defaults to `monday`.',
    type: 'string',
    status: 'optional',
  },
  alignPicker: {
    doc: 'Use `right` to change the calendar alignment direction. Defaults to `left`.',
    type: 'string',
    status: 'optional',
  },
  onlyMonth: {
    doc: 'Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  hideLastWeek: {
    doc: 'Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  shortcuts: {
    doc: 'Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.',
    type: 'object',
    status: 'optional',
  },
  addonElement: {
    doc: 'Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.',
    type: 'object',
    status: 'optional',
  },
  disableAutofocus: {
    doc: 'Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
  correctInvalidDate: {
    doc: 'Corrects the input date value to be the same as either `min_date` or `max_date`, when the user types in a date that is either before or after one of these. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },
}

// TODO: Merge with DatePickerEvents after it's been camelCased
export const DateEvents: PropertiesTableProps = {
  onType: {
    doc: 'Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.',
    type: 'function',
    status: 'optional',
  },
  onSubmit: {
    doc: 'Will be called once a user presses the submit button.',
    type: 'function',
    status: 'optional',
  },
  onCancel: {
    doc: 'Will be called once a user presses the cancel button.',
    type: 'function',
    status: 'optional',
  },
  onReset: {
    doc: 'Will be called once a user presses the reset button.',
    type: 'function',
    status: 'optional',
  },
  onShow: {
    doc: 'Will be called once date-picker is visible.',
    type: 'function',
    status: 'optional',
  },
  onHide: {
    doc: 'Will be called once date-picker is hidden.',
    type: 'function',
    status: 'optional',
  },
  onDaysRender: {
    doc: 'Will be called right before every new calendar view gets rendered. See the example above.',
    type: 'function',
    status: 'optional',
  },
}
