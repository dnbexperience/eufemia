import * as React from 'react';
export type DatePickerDate = Date | string;
export type DatePickerStartDate = Date | string;
export type DatePickerEndDate = Date | string;
export type DatePickerMonth = Date | string;
export type DatePickerStartMonth = Date | string;
export type DatePickerEndMonth = Date | string;
export type DatePickerMinDate = Date | string;
export type DatePickerMaxDate = Date | string;
export type DatePickerCorrectInvalidDate = string | boolean;
export type DatePickerHideNavigation = string | boolean;
export type DatePickerHideNavigationButtons = string | boolean;
export type DatePickerHideDays = string | boolean;
export type DatePickerOnlyMonth = string | boolean;
export type DatePickerHideLastWeek = string | boolean;
export type DatePickerDisableAutofocus = string | boolean;
export type DatePickerEnableKeyboardNav = string | boolean;
export type DatePickerShowInput = string | boolean;
export type DatePickerShowSubmitButton = string | boolean;
export type DatePickerShowCancelButton = string | boolean;
export type DatePickerShowResetButton = string | boolean;
export type DatePickerResetDate = string | boolean;
export type DatePickerRange = string | boolean;
export type DatePickerLink = string | boolean;
export type DatePickerSync = string | boolean;
export type DatePickerLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DatePickerLabelDirection = 'horizontal' | 'vertical';
export type DatePickerLabelSrOnly = string | boolean;
export type DatePickerInputElement =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DatePickerAddonElement = string | React.ReactNode;
export type DatePickerShortcuts = any[] | ((...args: any[]) => any);
export type DatePickerDisabled = string | boolean;
export type DatePickerStretch = string | boolean;
export type DatePickerSkeleton = string | boolean;
export type DatePickerSize = 'default' | 'small' | 'medium' | 'large';
export type DatePickerStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DatePickerStatusNoAnimation = string | boolean;
export type DatePickerSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DatePickerOpened = string | boolean;
export type DatePickerPreventClose = string | boolean;
export type DatePickerNoAnimation = string | boolean;
export type DatePickerDirection = 'auto' | 'top' | 'bottom';
export type DatePickerAlignPicker = 'auto' | 'left' | 'right';
export type DatePickerSpace =
  | string
  | number
  | boolean
  | {
      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
       */
      top?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
       */
      right?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
       */
      bottom?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
       */
      left?: string | number | boolean;
    };
export type DatePickerTop = string | number | boolean;
export type DatePickerRight = string | number | boolean;
export type DatePickerBottom = string | number | boolean;
export type DatePickerLeft = string | number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DatePickerProps extends React.HTMLProps<HTMLElement> {
  id?: string;
  title?: string;

  /**
   * Defines the pre-filled date by either a JavaScript DateInstance or (ISO 8601) like `date="2019-05-05"`.
   */
  date?: DatePickerDate;

  /**
   * To set the pre-filled starting date. Is used if `range={true}` is set to true. Defaults to null, showing the `mask_placeholder`.
   */
  start_date?: DatePickerStartDate;

  /**
   * To set the pre-filled ending date. Is used if `range={true}` is set to true. Defaults to null, showing the `mask_placeholder`.
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
   * To limit a date range to a minimum `start_date`. Defaults to null.
   */
  min_date?: DatePickerMinDate;

  /**
   * To limit a date range to a maximum `end_date`. Defaults to null.
   */
  max_date?: DatePickerMaxDate;
  correct_invalid_date?: DatePickerCorrectInvalidDate;

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
  hide_navigation?: DatePickerHideNavigation;
  hide_navigation_buttons?: DatePickerHideNavigationButtons;

  /**
   * If set to `true`, the week days will be hidden. Defaults to `false`.
   */
  hide_days?: DatePickerHideDays;

  /**
   * Use `true` to only show the defined month. Disables the month navigation possibility. Defaults to `false`.
   */
  only_month?: DatePickerOnlyMonth;

  /**
   * Use `true` to only show the last week in the current month if it needs to be shown. The result is that there will mainly be shows five (5) weeks (rows) instead of six (6). Defaults to `false`.
   */
  hide_last_week?: DatePickerHideLastWeek;

  /**
   * Once the date picker gets opened, there is a focus handling to ensure good accessibility. This can be disabled with this property. Defaults to `false`.
   */
  disable_autofocus?: DatePickerDisableAutofocus;
  enable_keyboard_nav?: DatePickerEnableKeyboardNav;

  /**
   * If the input fields with the mask should be visible. Defaults to `false`.
   */
  show_input?: DatePickerShowInput;

  /**
   * If set to `true`, a submit button will be shown. You can change the default text by using `submit_button_text="Ok"`. Defaults to `false`. If the `range` prop is `true`, then the submit button is shown.
   */
  show_submit_button?: DatePickerShowSubmitButton;

  /**
   * If set to `true`, a cancel button will be shown. You can change the default text by using `cancel_button_text="Avbryt"` Defaults to `false`. If the `range` prop is `true`, then the cancel button is shown.
   */
  show_cancel_button?: DatePickerShowCancelButton;

  /**
   * If set to `true`, a reset button will be shown. You can change the default text by using `reset_button_text="Tilbakestill"` Defaults to `false`.
   */
  show_reset_button?: DatePickerShowResetButton;
  submit_button_text?: string;
  cancel_button_text?: string;
  reset_button_text?: string;
  reset_date?: DatePickerResetDate;

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
  range?: DatePickerRange;

  /**
   * Link both calendars, once to the user is navigating between months. Only meant to use if the range is set to true. Defaults to `false`.
   */
  link?: DatePickerLink;

  /**
   * Sync input values with the calendars views. Once the input values get changed, the calendar changes its views in sync. Defaults to `true`.
   */
  sync?: DatePickerSync;

  /**
   * A prepending label in sync with the date input field.
   */
  label?: DatePickerLabel;

  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  label_direction?: DatePickerLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: DatePickerLabelSrOnly;

  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
   */
  input_element?: DatePickerInputElement;

  /**
   * Gives you the possibility to inject a React element showing up over the footer. Use it to customize `shortcuts`.
   */
  addon_element?: DatePickerAddonElement;

  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: DatePickerShortcuts;
  disabled?: DatePickerDisabled;

  /**
   * If set to `true`, then the date-picker input field will be 100% in `width`.
   */
  stretch?: DatePickerStretch;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: DatePickerSkeleton;

  /**
   * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.
   */
  size?: DatePickerSize;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: DatePickerStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: DatePickerStatusNoAnimation;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

  /**
   * Text describing the content of the DatePicker more than the label. You can also send in a React component, so it gets wrapped inside the DatePicker component.
   */
  suffix?: DatePickerSuffix;

  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  opened?: DatePickerOpened;
  prevent_close?: DatePickerPreventClose;
  no_animation?: DatePickerNoAnimation;
  direction?: DatePickerDirection;

  /**
   * Use `right` to change the calendar alignment direction. Defaults to `left`.
   */
  align_picker?: DatePickerAlignPicker;
  class?: string;
  className?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: DatePickerSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: DatePickerTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: DatePickerRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: DatePickerBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: DatePickerLeft;

  /**
   * Will be called right before every new calendar view gets rendered. See the example above.
   */
  on_days_render?: (...args: any[]) => any;

  /**
   * Will be called on a date change event. Returns an `object`. See above.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Will be called on every input and date picker interaction. Returns an `object`. See above.
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
}
export default class DatePicker extends React.Component<
  DatePickerProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
