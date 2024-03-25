import { PropertiesTableProps } from '../../shared/types'

export const DatePickerProperties: PropertiesTableProps = {
  date: {
    doc: 'Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.',
    type: 'unknown',
    state: 'optional',
  },
  start_date: {
    doc: 'To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.',
    type: 'unknown',
    state: 'optional',
  },
  end_date: {
    doc: 'To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.',
    type: 'unknown',
    state: 'optional',
  },
  month: {
    doc: 'To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.',
    type: 'unknown',
    state: 'optional',
  },
  start_month: {
    doc: 'To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.',
    type: 'unknown',
    state: 'optional',
  },
  end_month: {
    doc: 'To display what month should be shown in the second calendar by default. Defaults to the `date` respective `start_date`.',
    type: 'unknown',
    state: 'optional',
  },
  min_date: {
    doc: 'To limit a date range to a minimum `start_date`. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  max_date: {
    doc: 'To limit a date range to a maximum `end_date`. Defaults to `null`.',
    type: 'unknown',
    state: 'optional',
  },
  date_format: {
    doc: 'Defines how the prop dates (`date`, `start_date` and `end_date`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.',
    type: 'unknown',
    state: 'optional',
  },
  return_format: {
    doc: 'Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.',
    type: 'unknown',
    state: 'optional',
  },
  range: {
    doc: 'If the date picker should support a range of two dates (starting and ending date). Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  show_input: {
    doc: 'If the input fields with the mask should be visible. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  mask_order: {
    doc: 'To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`',
    type: 'unknown',
    state: 'optional',
  },
  opened: {
    doc: 'To open the date-picker by default. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  mask_placeholder: {
    doc: 'To display the placeholder on input. Defaults to `dd/mm/åååå`.',
    type: 'unknown',
    state: 'optional',
  },
  hide_navigation: {
    doc: 'If set to `true`, the navigation will be hidden. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  hide_days: {
    doc: 'If set to `true`, the week days will be hidden. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  show_submit_button: {
    doc: 'If set to `true`, a submit button will be shown. You can change the default text by using `submit_button_text="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.',
    type: 'unknown',
    state: 'optional',
  },
  show_cancel_button: {
    doc: 'If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.',
    type: 'unknown',
    state: 'optional',
  },
  show_reset_button: {
    doc: 'If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  link: {
    doc: 'Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  sync: {
    doc: 'Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.',
    type: 'unknown',
    state: 'optional',
  },
  first_day: {
    doc: 'To define the first day of the week. Defaults to `monday`.',
    type: 'unknown',
    state: 'optional',
  },
  locale: {
    doc: 'To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.',
    type: 'unknown',
    state: 'optional',
  },
  align_picker: {
    doc: 'Use `right` to change the calendar alignment direction. Defaults to `left`.',
    type: 'unknown',
    state: 'optional',
  },
  only_month: {
    doc: 'Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  hide_last_week: {
    doc: 'Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  stretch: {
    doc: 'If set to `true`, then the date-picker input field will be 100% in `width`.',
    type: 'unknown',
    state: 'optional',
  },
  label: {
    doc: 'A prepending label in sync with the date input field.',
    type: 'unknown',
    state: 'optional',
  },
  label_direction: {
    doc: 'Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.',
    type: 'unknown',
    state: 'optional',
  },
  suffix: {
    doc: 'Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.',
    type: 'unknown',
    state: 'optional',
  },
  label_sr_only: {
    doc: 'Use `true` to make the label only readable by screen readers.',
    type: 'unknown',
    state: 'optional',
  },
  shortcuts: {
    doc: 'Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.',
    type: 'unknown',
    state: 'optional',
  },
  addon_element: {
    doc: 'Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.',
    type: 'unknown',
    state: 'optional',
  },
  input_element: {
    doc: 'Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input.',
    type: 'unknown',
    state: 'optional',
  },
  status: {
    doc: 'Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.',
    type: 'unknown',
    state: 'optional',
  },
  status_state: {
    doc: 'Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.',
    type: 'unknown',
    state: 'optional',
  },
  status_props: {
    doc: 'Use an object to define additional FormStatus properties.',
    type: 'unknown',
    state: 'optional',
  },
  disable_autofocus: {
    doc: 'Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  correct_invalid_date: {
    doc: 'Corrects the input date value to be the same as either `min_date` or `max_date`, when the user types in a date that is either before or after one of these. Defaults to `false`.',
    type: 'unknown',
    state: 'optional',
  },
  globalStatus: {
    doc: 'The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).',
    type: 'unknown',
    state: 'optional',
  },
  tooltip: {
    doc: 'Provide a short Tooltip content that shows up on the picker button.',
    type: 'React.Node',
    status: 'optional',
  },
  skeleton: {
    doc: 'If set to `true`, an overlaying skeleton with animation will be shown.',
    type: 'unknown',
    state: 'optional',
  },
  size: {
    doc: 'The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.',
    type: 'unknown',
    state: 'optional',
  },
  '[Space](/uilib/layout/space/properties)': {
    doc: 'Spacing properties like `top` or `bottom` are supported.',
    type: ['string', 'object'],
    state: 'optional',
  },
}

export const DatePickerEvents: PropertiesTableProps = {
  on_change: {
    doc: 'Will be called on a date change event. Returns an `object`. See Returned Object below.',
    type: 'unknown',
    state: 'optional',
  },
  on_type: {
    doc: 'Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.',
    type: 'unknown',
    state: 'optional',
  },
  on_submit: {
    doc: 'Will be called once a user presses the submit button.',
    type: 'unknown',
    state: 'optional',
  },
  on_cancel: {
    doc: 'Will be called once a user presses the cancel button.',
    type: 'unknown',
    state: 'optional',
  },
  on_reset: {
    doc: 'Will be called once a user presses the reset button.',
    type: 'unknown',
    state: 'optional',
  },
  on_show: {
    doc: 'Will be called once date-picker is visible.',
    type: 'unknown',
    state: 'optional',
  },
  on_hide: {
    doc: 'Will be called once date-picker is hidden.',
    type: 'unknown',
    state: 'optional',
  },
  on_days_render: {
    doc: 'Will be called right before every new calendar view gets rendered. See the example above.',
    type: 'unknown',
    state: 'optional',
  },
  onFocus: {
    doc: 'Will be called once the input gets focus.',
    type: 'unknown',
    state: 'optional',
  },
  onBlur: {
    doc: 'Will be called once the input lose focus.',
    type: 'unknown',
    state: 'optional',
  },
}
