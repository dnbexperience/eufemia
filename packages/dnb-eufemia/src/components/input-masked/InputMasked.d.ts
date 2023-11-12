import * as React from 'react';
import type { Locale } from '../../shared/Context';
import type { ButtonIconPosition } from '../Button';
import type { FormLabelLabelDirection, FormLabelText } from '../FormLabel';
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText
} from '../FormStatus';
import type { GlobalStatusConfigObject } from '../GlobalStatus';
import type { IconIcon, IconSize } from '../Icon';
import type {
  InputInputAttributes,
  InputInputElement,
  InputSize
} from '../Input';
import type { NumberFormatProps } from '../NumberFormat';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type InputMaskedMask =
  | Record<string, unknown>
  | any[]
  | ((...args: any[]) => any);
export type InputMaskedNumberMask =
  | string
  | boolean
  | Record<string, unknown>;
export type InputMaskedCurrencyMask =
  | string
  | boolean
  | Record<string, unknown>;
export type InputMaskedMaskOptions = string | Record<string, unknown>;
export type InputMaskedAsCurrency = string | boolean;
export type InputMaskedValue = string | number;
export type InputMaskedSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedAlign = 'left' | 'center' | 'right';
export type InputMaskedSubmitElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedSubmitButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type InputMaskedChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface InputMaskedProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * A mask can be defined both as a <a href="https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme">RegExp style of characters</a> or a callback function. Example below.
   */
  mask?: InputMaskedMask;
  /**
   * Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.
   */
  number_mask?: InputMaskedNumberMask;
  /**
   * Set to `true` or set the <em>valuta</em> (currency_mask="kr") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.
   */
  currency_mask?: InputMaskedCurrencyMask;
  /**
   * Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `currency_mask`. All options are listed below.
   */
  mask_options?: InputMaskedMaskOptions;
  /**
   * Use an object with <a href="/uilib/components/number-format/properties">NumberFormat</a> e.g. `{ omit_rounding: false }`.
   */
  number_format?: NumberFormatProps;
  /**
   * Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the <a href="/uilib/usage/customisation/provider">Eufemia Provider</a> if not given. Defaults to `nb-NO`.
   */
  locale?: Locale;
  /**
   * Set to `true` to use `NOK` or give it a currency code e.g. `USD` to automatically set a currency mask based on the given or inherited locale.
   */
  as_currency?: InputMaskedAsCurrency;
  /**
   * Set to `true` to automatically set a number mask based on the given or inherited locale.
   */
  as_number?: boolean;
  /**
   * Set to `true` to automatically set a number mask with a percentage sign based on the given or inherited locale.
   */
  as_percent?: boolean;
  /**
   * Show mask when input is empty and has no focus. Defaults to `false`.
   */
  show_mask?: boolean;
  /**
   * When `false` is given, it doesn&#39;t print out placeholder characters and only adds mask characters when the user reaches them as they&#39;re typing. Defaults to `true`.
   */
  show_guide?: boolean;
  pipe?: (...args: any[]) => any;
  /**
   * When `true`, adding or deleting characters will not affect the positions of existing characters. Defaults to `false`.
   */
  keep_char_positions?: boolean;
  /**
   * The placeholder character represents the fillable spot in the mask (e.g. `_`). Defaults to invisible space.
   */
  placeholder_char?: string;
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `inner_ref={myRef}` by using `React.createRef()` or `React.useRef()`.
   */
  inner_ref?: React.Ref;
  /**
   * Will be called on value changes made by the user. Returns an object with the value as a string and the native event: `{ value, event }`.
   */
  on_change?: (...args: any[]) => any;
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
  /**
   * Choose between `text`, `number`, `email`, `password`, `url`, `tel` and `search`.
   */
  type?: string;
  /**
   * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size="2"` then it will be forwarded as the input element attribute.
   */
  size?: InputSize;
  /**
   * The content value of the input.
   */
  value?: InputMaskedValue;
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
   * The <a href="/uilib/components/global-status/properties/#configuration-object">configuration</a> used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  globalStatus?: GlobalStatusConfigObject;
  /**
   * Defaults to `off`. Set to `on` or any of <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-autocomplete">allowed `attributes`</a>. Keep in mind, 1. you may have to define a `name`, 2. have the input as a descendant of a `<form>` element, 3. and have a submit button inside the form.
   */
  autocomplete?: string;
  /**
   * Title attribute for the search icon. Only relevant if search input.
   */
  submit_button_title?: string;
  clear_button_title?: string;
  /**
   * The placeholder which shows up once the input value is empty
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
  suffix?: InputMaskedSuffix;
  /**
   * Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.
   */
  align?: InputMaskedAlign;
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
   * Provide the Input element with any attributes by using an Object `input_attributes={{size:&#39;2&#39;}}` or a JSON Object `input_attributes=&#39;{"size":"2"}&#39;`. "NB:" Keep in mind, that also every not listed component property will be sent along and set as an Input element attribute.
   */
  input_attributes?: InputInputAttributes;
  /**
   * <em>(internal)</em> by providing a new component we can change the internally used element. Also supports a string only, like `input_element="input"`.
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
  readOnly?: boolean;
  /**
   * <em>(internal)</em> by providing a new component to be rendered inside the "shell" – we can add a freely customizable internal element. Used by the Autocomplete component.
   */
  inner_element?: React.ReactNode;
  /**
   * Accepts a React element which will show up like the "submit button" would do on `type="search"`.
   */
  submit_element?: InputMaskedSubmitElement;
  submit_button_variant?: any;
  submit_button_icon?: InputMaskedSubmitButtonIcon;
  submit_button_status?: string;
  className?: string;
  children?: InputMaskedChildren;
  on_state_update?: (...args: any[]) => any;
}
export default InputMasked;
