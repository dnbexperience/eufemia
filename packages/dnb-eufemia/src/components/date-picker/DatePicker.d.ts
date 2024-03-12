import * as React from 'react';
import type { FormLabelLabelDirection } from '../FormLabel';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { InputInputElement, InputSize } from '../Input';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
type DatePickerDate = Date | string;
type DatePickerStartDate = Date | string;
type DatePickerEndDate = Date | string;
type DatePickerMonth = Date | string;
type DatePickerStartMonth = Date | string;
type DatePickerEndMonth = Date | string;
type DatePickerMinDate = Date | string;
type DatePickerMaxDate = Date | string;
type DatePickerAddonElement = string | React.ReactNode;
type DatePickerShortcuts = any[] | ((...args: any[]) => any);
type DatePickerSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
type DatePickerDirection = 'auto' | 'top' | 'bottom';
type DatePickerAlignPicker = 'auto' | 'left' | 'right';

// Make it possible to join React.Event interfaces with DatePickerEvent type.
type DatePickerEvent<T> = T & {
  date?: string;
  start_date?: string;
  end_date?: string;
  partialStartDate?: string;
  partialEndDate?: string;
};

export interface DatePickerProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'ref' | 'label' | 'size' | 'onBlur'
    >,
    SpacingProps {
  id?: string;
  title?: string;
  /**
   * Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.
   */
  date?: DatePickerDate;
  /**
   * To set the pre-filled starting date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.
   */
  start_date?: DatePickerStartDate;
  /**
   * To set the pre-filled ending date. Is used if `range={true}` is set to `true`. Defaults to `null`, showing the `mask_placeholder`.
   */
  end_date?: DatePickerEndDate;
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
   */
  month?: DatePickerMonth;
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
   */
  start_month?: DatePickerStartMonth;
  /**
   * To display what month should be shown in the second calendar by default. Defaults to the `date` respective `start_date`.
   */
  end_month?: DatePickerEndMonth;
  /**
   * To limit a date range to a minimum `start_date`. Defaults to `null`.
   */
  min_date?: DatePickerMinDate;
  /**
   * To limit a date range to a maximum `end_date`. Defaults to `null`.
   */
  max_date?: DatePickerMaxDate;
  /**
   * Corrects the input date value to be the same as either `min_date` or `max_date`, when the user types in a date that is either before or after one of these. Defaults to `false`.
   */
  correct_invalid_date?: boolean;
  /**
   * To define the order of the masked placeholder input fields. Defaults to `dd/mm/yyyy`
   */
  mask_order?: string;
  /**
   * To display the placeholder on input. Defaults to `dd/mm/åååå`.
   */
  mask_placeholder?: string;
  /**
   * Defines how the prop dates (`date`, `start_date` and `end_date`) should be parsed, e.g. `yyyy/MM/dd`. Defaults to `yyyy-MM-dd`.
   */
  date_format?: string;
  /**
   * Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.
   */
  return_format?: string;
  /**
   * If set to `true`, the navigation will be hidden. Defaults to `false`.
   */
  hide_navigation?: boolean;
  hide_navigation_buttons?: boolean;
  /**
   * If set to `true`, the week days will be hidden. Defaults to `false`.
   */
  hide_days?: boolean;
  /**
   * Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.
   */
  only_month?: boolean;
  /**
   * Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.
   */
  hide_last_week?: boolean;
  /**
   * Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.
   */
  disable_autofocus?: boolean;
  enable_keyboard_nav?: boolean;
  /**
   * If the input fields with the mask should be visible. Defaults to `false`.
   */
  show_input?: boolean;
  /**
   * If set to `true`, a submit button will be shown. You can change the default text by using `submit_button_text="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.
   */
  show_submit_button?: boolean;
  /**
   * If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.
   */
  show_cancel_button?: boolean;
  /**
   * If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `false`.
   */
  show_reset_button?: boolean;
  submit_button_text?: string;
  cancel_button_text?: string;
  reset_button_text?: string;
  reset_date?: boolean;
  /**
   * To define the first day of the week. Defaults to `monday`.
   */
  first_day?: string;
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: Record<string, unknown>;
  /**
   * If the date picker should support a range of two dates (starting and ending date). Defaults to `false`.
   */
  range?: boolean;
  /**
   * Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to `true`. Defaults to `false`.
   */
  link?: boolean;
  /**
   * Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.
   */
  sync?: boolean;
  /**
   * A prepending label in sync with the date input field.
   */
  label?: React.ReactNode;
  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input.
   */
  input_element?: InputInputElement;
  /**
   * Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.
   */
  addon_element?: DatePickerAddonElement;
  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: DatePickerShortcuts;
  disabled?: boolean;
  /**
   * If set to `true`, then the date-picker input field will be 100% in `width`.
   */
  stretch?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.
   */
  size?: InputSize;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  /**
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.
   */
  suffix?: DatePickerSuffix;
  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  opened?: boolean;
  /**
   * Provide a short Tooltip content that shows up on the picker button.
   */
  tooltip?: React.ReactNode;
  tabIndex?: number;
  prevent_close?: boolean;
  no_animation?: boolean;
  direction?: DatePickerDirection;
  /**
   * Use `right` to change the calendar alignment direction. Defaults to `left`.
   */
  align_picker?: DatePickerAlignPicker;
  className?: string;
  /**
   * Will be called right before every new calendar view gets rendered. See the example above.
   */
  on_days_render?: (...args: any[]) => any;
  /**
   * Will be called on a date change event. Returns an `object`. See Returned Object below.
   */
  on_change?: (...args: any[]) => any;
  /**
   * Will be called on every input and date picker interaction. Returns an `object`. See Returned Object below.
   */
  on_type?: (...args: any[]) => any;
  /**
   * Will be called once date-picker is visible.
   */
  on_show?: (...args: any[]) => any;
  /**
   * Will be called once date-picker is hidden.
   */
  on_hide?: (...args: any[]) => any;
  /**
   * Will be called once a user presses the submit button.
   */
  on_submit?: (...args: any[]) => any;
  /**
   * Will be called once a user presses the cancel button.
   */
  on_cancel?: (...args: any[]) => any;
  /**
   * Will be called once a user presses the reset button.
   */
  on_reset?: (...args: any[]) => any;
  /**
   * Will be called once the input gets focus.
   */
  onFocus?: (event: React.FocusEventHandler<HTMLInputElement>) => void;
  /**
   * Will be called once the input lose focus.
   */
  onBlur?: (
    event: DatePickerEvent<React.FocusEvent<HTMLInputElement>>
  ) => void;
}
export default class DatePicker extends React.Component<
  DatePickerProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
