import * as React from 'react';
import type { ButtonIconPosition, ButtonVariant } from '../Button';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { FormLabelLabelDirection } from '../FormLabel';
import type { IconIcon, IconSize } from '../Icon';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
export type InputSize = 'default' | 'small' | 'medium' | 'large' | number;
export type InputValue = string | number;
export type InputSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputAlign = 'left' | 'center' | 'right';
export type InputInputAttributes = string | Record<string, unknown>;
export type InputInputElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputSubmitElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputSubmitButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type InputChildren = React.ReactNode | ((...args: any[]) => any);
export interface InputProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'>,
    SpacingProps {
  /**
   * Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.
   */
  type?: string;
  /**
   * The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute.
   */
  size?: InputSize;
  /**
   * The content value of the input.
   */
  value?: InputValue;
  id?: string;
  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: React.ReactNode;
  /**
   * Use `labelDirection="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  labelDirection?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps;
  statusNoAnimation?: boolean;
  /**
   * Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.
   */
  inputState?: string;
  /**
   * Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.
   */
  autocomplete?: string;
  /**
   * Title attribute for the search/submit button. Only relevant when `type="search"`.
   */
  submitButtonTitle?: string;
  clearButtonTitle?: string;
  /**
   * The placeholder which shows up once the input value is empty.
   */
  placeholder?: React.ReactNode;
  /**
   * If set to `true`, then a clear button will be shown which lets the user clear any given input value.
   */
  clear?: boolean;
  /**
   * Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.
   */
  keepPlaceholder?: boolean;
  /**
   * Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.
   */
  suffix?: InputSuffix;
  /**
   * Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.
   */
  align?: InputAlign;
  /**
   * If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.
   */
  selectall?: boolean;
  /**
   * If set to `true`, then the input field will be 100% in `width`.
   */
  stretch?: boolean;
  disabled?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * In case we have to set a custom input class.
   */
  inputClass?: string;
  /**
   * Provide the Input element with any attributes by using an Object `inputAttributes={{size:'2'}}` or a JSON Object `inputAttributes='{"size":"2"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.
   */
  inputAttributes?: InputInputAttributes;
  /**
   * By providing a new component we can change the internally used element. Also supports a string only, like `inputElement="input"`.
   */
  inputElement?: InputInputElement;
  /**
   * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
   */
  icon?: IconIcon;
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize;
  /**
   * Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.
   */
  iconPosition?: ButtonIconPosition;
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `innerRef={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  innerRef?: React.Ref;
  readOnly?: boolean;
  /**
   * By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.
   */
  innerElement?: React.ReactNode;
  /**
   * Accepts a React element which will show up like the "submit button" would do on `type="search"`.
   */
  submitElement?: InputSubmitElement;
  submitButtonVariant?: ButtonVariant;
  submitButtonIcon?: InputSubmitButtonIcon;
  submitButtonStatus?: string;
  className?: string;
  children?: InputChildren;
  onChange?: (...args: any[]) => any;
  onKeyDown?: (...args: any[]) => any;
  onSubmit?: (...args: any[]) => any;
  onFocus?: (...args: any[]) => any;
  onBlur?: (...args: any[]) => any;
  onSubmitFocus?: (...args: any[]) => any;
  onSubmitBlur?: (...args: any[]) => any;
  onStateUpdate?: (...args: any[]) => any;
  onClear?: (...args: any[]) => any;
}
export default class Input extends React.Component<InputProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
export interface SubmitButtonProps
  extends React.HTMLProps<HTMLButtonElement> {
  id?: string;
  /**
   * The content value of the input.
   */
  value?: string;
  title?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
   */
  icon?: IconIcon;
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize;
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText;
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  statusProps?: FormStatusProps;
  className?: string;
  onSubmit?: (...args: any[]) => any;
  onSubmitFocus?: (...args: any[]) => any;
  onSubmitBlur?: (...args: any[]) => any;
}
export class SubmitButton extends React.Component<SubmitButtonProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
