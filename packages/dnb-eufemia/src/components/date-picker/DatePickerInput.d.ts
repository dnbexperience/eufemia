import * as React from 'react';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { InputInputElement, InputSize } from '../Input';
import type { SkeletonShow } from '../Skeleton';
export interface DatePickerInputProps
  extends Omit<React.HTMLProps<HTMLElement> | 'children'> {
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
  /**
   * Gives you the possibility to use a plain/vanilla `<input />` HTML element by defining it as a string `input_element="input"`, a React element, or a render function `input_element={(internalProps) => (<Return />)}`. Can also be used in circumstances where the `react-text-mask` should not be used, e.g. in testing environments. Defaults to custom masked input.
   */
  input_element?: InputInputElement;
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: Record<string, unknown>;
  disabled?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * To open the date-picker by default. Defaults to `false`.
   */
  opened?: boolean;
  showInput?: boolean;
  onChange?: (...args: any[]) => any;
  onSubmit?: (...args: any[]) => any;
  /**
   * Will be called once the input gets focus.
   */
  onFocus?: (...args: any[]) => any;
}
export default class DatePickerInput extends React.Component<
  DatePickerInputProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
