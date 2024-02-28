import * as React from 'react';
import type { ButtonIconPosition, ButtonVariant } from '../Button';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { FormLabelLabelDirection, FormLabelText } from '../FormLabel';
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
  label?: FormLabelText;
  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`.
   */
  label_direction?: FormLabelLabelDirection;
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;
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
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  /**
   * Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.
   */
  input_state?: string;
  /**
   * Defaults to `off`. Set to `on` or any of [allowed `attributes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete). Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.
   */
  autocomplete?: string;
  /**
   * Title attribute for the search icon. Only relevant if search input.
   */
  submit_button_title?: string;
  clear_button_title?: string;
  /**
   * The placeholder which shows up once the input value is empty.
   */
  placeholder?: string;
  /**
   * If set to `true`, then a clear button will be shown which lets the user clear any given input value.
   */
  clear?: boolean;
  /**
   * Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.
   */
  keep_placeholder?: boolean;
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
  class?: string;
  /**
   * In case we have to set a custom input class.
   */
  input_class?: string;
  /**
   * Provide the Input element with any attributes by using an Object `input_attributes={{size:'2'}}` or a JSON Object `input_attributes='{"size":"2"}'`. **NB:** Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.
   */
  input_attributes?: InputInputAttributes;
  /**
   * By providing a new component we can change the internally used element. Also supports a string only, like `input_element="input"`.
   */
  input_element?: InputInputElement;
  /**
   * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
   */
  icon?: IconIcon;
  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  icon_size?: IconSize;
  /**
   * Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.
   */
  icon_position?: ButtonIconPosition;
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  inner_ref?: React.Ref;
  readOnly?: boolean;
  /**
   * By providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.
   */
  inner_element?: React.ReactNode;
  /**
   * Accepts a React element which will show up like the "submit button" would do on `type="search"`.
   */
  submit_element?: InputSubmitElement;
  submit_button_variant?: ButtonVariant;
  submit_button_icon?: InputSubmitButtonIcon;
  submit_button_status?: string;
  className?: string;
  children?: InputChildren;
  /**
   * Will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, event }`.
   */
  on_change?: (...args: any[]) => any;
  /**
   * Will be called on key down by the user. Returns `{ value, event }`.
   */
  on_key_down?: (...args: any[]) => any;
  /**
   * Will be called on submit button click. Returns `{ value, event }`.
   */
  on_submit?: (...args: any[]) => any;
  /**
   * Will be called on focus set by the user. Returns `{ value, event }`.
   */
  on_focus?: (...args: any[]) => any;
  /**
   * Will be called on blur set by the user. Returns `{ value, event }`.
   */
  on_blur?: (...args: any[]) => any;
  on_submit_focus?: (...args: any[]) => any;
  on_submit_blur?: (...args: any[]) => any;
  on_state_update?: (...args: any[]) => any;
  /**
   * Will be called on a clear button click. Returns `{ value, previousValue, event }`.
   */
  on_clear?: (...args: any[]) => any;
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
  icon_size?: IconSize;
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
  status_state?: FormStatusState;
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps;
  className?: string;
  /**
   * Will be called on submit button click. Returns `{ value, event }`.
   */
  on_submit?: (...args: any[]) => any;
  on_submit_focus?: (...args: any[]) => any;
  on_submit_blur?: (...args: any[]) => any;
}
export class SubmitButton extends React.Component<SubmitButtonProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
