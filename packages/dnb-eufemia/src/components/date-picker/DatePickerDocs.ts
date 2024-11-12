import { PropertiesTableProps } from '../../shared/types'

export const DatePickerProperties: PropertiesTableProps = {
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
    doc: 'To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.',
    type: 'string',
    status: 'optional',
  },
  startMonth: {
    doc: 'To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.',
    type: 'string',
    status: 'optional',
  },
  endMonth: {
    doc: 'To display what month should be shown in the second calendar by default. Defaults to the `date` respective `startDate`.',
    type: 'string',
    status: 'optional',
  },
  minDate: {
    doc: 'To limit a date range to a minimum `startDate`. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  maxDate: {
    doc: 'To limit a date range to a maximum `endDate`. Defaults to `null`.',
    type: 'string',
    status: 'optional',
  },
  dateFormat: {
    doc: 'Defines how the property dates (`date`, `startDate` and `endDate`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.',
    type: 'string',
    status: 'optional',
  },
  returnFormat: {
    doc: 'Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.',
    type: 'string',
    status: 'optional',
  },
  showInput: {
    doc: 'If the input fields with the mask should be visible. Defaults to `false`.',
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
    doc: 'If set to `true`, a submit button will be shown. You can change the default text by using `submitButtonText="Ok"`. Defaults to `false`. If the `range` property is `true`, then the submit button is shown.',
    type: 'boolean',
    status: 'optional',
  },
  showCancelButton: {
    doc: 'If set to `true`, a cancel button will be shown. You can change the default text by using `cancelButtonText="Avbryt"`. If the `range` property is `true`, then the cancel button is shown. Defaults to `false`',
    type: 'boolean',
    status: 'optional',
  },
  showResetButton: {
    doc: 'If set to `true`, a reset button will be shown. You can change the default text by using `resetButtonText="Tilbakestill"`. Defaults to `false`.',
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
    doc: 'Corrects the input date value to be the same as either `minDate` or `maxDate`, when the user types in a date that is either before or after one of these. Defaults to `false`.',
    type: 'boolean',
    status: 'optional',
  },

  // TODO: put in "correct" order
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'string | boolean',
    status: 'optional',
  },
  statusState: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'string',
    status: 'optional',
  },
  statusProps: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'object',
    status: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.',
    type: 'string | React.ReactNode',
    status: 'optional',
  },
  labelSrOnly: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'boolean',
    status: 'optional',
  },
  inputElement: {
    doc: 'Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `inputElement="input"`, a React element, or a render function `inputElement={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input.',
    type: 'string | React.ReactNode | (internalProps: any) => React.ReactNode',
    status: 'optional',
  },
  tooltip: {
    doc: 'Provide a short Tooltip content that shows up on the picker button.',
    type: 'string',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'boolean',
    status: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.',
    type: 'string',
    status: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    status: 'optional',
  },

  // TODO: remove this
  // | `status`                                | _(optional)_ text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.                                                                                                                                                                                                                                 |
  // | `status_state`                          | _(optional)_ defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.                                                                                                                                                                                                                                                                |
  // | `status_props`                          | _(optional)_ use an object to define additional FormStatus properties.                                                                                                                                                                                                                                                                                                               |
  // | `suffix`                                | _(optional)_ text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.                                                                                                                                                                                                          |
  // | `label_sr_only`                         | _(optional)_ use `true` to make the label only readable by screen readers.                                                                                                                                                                                                                                                                                                           |
  // | `input_element`                         | _(optional)_ gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input. |
  // | `tooltip`                               | _(optional)_ Provide a short Tooltip content that shows up on the picker button.                                                                                                                                                                                                                                                                                                     |
  // | `skeleton`                              | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                                                                                                                                                                                                                  |
  // | `size`                                  | _(optional)_ the sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.                                                                                                                                                                                                     |
  // | [Space](/uilib/layout/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                                                                                                                                                |
}

export const DatePickerEvents: PropertiesTableProps = {
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
