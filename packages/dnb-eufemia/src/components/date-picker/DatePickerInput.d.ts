import * as React from 'react';
export type DatePickerInputSize = 'default' | 'small' | 'medium' | 'large';
export type DatePickerInputStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type DatePickerInputInputElement =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DatePickerInputProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  title?: string;
  selectedDateTitle?: string;
  maskOrder?: string;
  maskPlaceholder?: string;
  separatorRexExp?: RegExp;
  submitAttributes?: Record<string, unknown>;
  isRange?: boolean;

  /**
   * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`.
   */
  size?: DatePickerInputSize;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: DatePickerInputStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;

  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` not should be used, e.g. in testing environments. Defaults to custom masked input.
   */
  input_element?: DatePickerInputInputElement;

  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: Record<string, unknown>;
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: boolean;

  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  opened?: boolean;
  showInput?: boolean;
  onChange?: (...args: any[]) => any;
  onSubmit?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
}
export default class DatePickerInput extends React.Component<
  DatePickerInputProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
