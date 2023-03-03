import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
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
export type InputMaskedNumberFormat = string | Record<string, unknown>;
export type InputMaskedAsCurrency = string | boolean;
export type InputMaskedSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | number;
export type InputMaskedValue = string | number;
export type InputMaskedLabel =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedLabelDirection = 'horizontal' | 'vertical';
export type InputMaskedStatus =
  | string
  | boolean
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedAlign = 'left' | 'center' | 'right';
export type InputMaskedInputAttributes = string | Record<string, unknown>;
export type InputMaskedInputElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type InputMaskedIconSize = string | number;
export type InputMaskedIconPosition = 'left' | 'right';
export type InputMaskedSubmitElement =
  | ((...args: any[]) => any)
  | React.ReactNode;
export type InputMaskedSubmitButtonIcon =
  | string
  | React.ReactNode
  | ((...args: any[]) => any);
export type InputMaskedSpace =
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
export type InputMaskedTop = string | number | boolean;
export type InputMaskedRight = string | number | boolean;
export type InputMaskedBottom = string | number | boolean;
export type InputMaskedLeft = string | number | boolean;
export type InputMaskedChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface InputMaskedProps extends React.HTMLProps<HTMLElement> {
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
   * Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `curreny_mask`. All options are listed below.
   */
  mask_options?: InputMaskedMaskOptions;

  /**
   * Use an object with <a href="/uilib/components/number-format/properties">NumberFormat</a> e.g. `{ omit_rounding: false }`.
   */
  number_format?: InputMaskedNumberFormat;

  /**
   * Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the <a href="/uilib/usage/customisation/provider">Eufemia Provider</a> if not given. Defaults to `nb-NO`.
   */
  locale?: string;

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
  inner_ref?: Record<string, unknown>;

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
   * The sizes you can choose is `small` (1.5rem), `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if You define a number like `size="2"` then it will be forwarded as the input element attribute.
   */
  size?: InputMaskedSize;

  /**
   * The content value of the input.
   */
  value?: InputMaskedValue;
  id?: string;

  /**
   * Prepends the Form Label component. If no ID is provided, a random ID is created.
   */
  label?: InputMaskedLabel;

  /**
   * Use `label_direction="vertical"` to change the label layout direction. Defaults to `horizontal`
   */
  label_direction?: InputMaskedLabelDirection;

  /**
   * Use `true` to make the label only readable by screen readers.
   */
  label_sr_only?: boolean;

  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: InputMaskedStatus;

  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: string;

  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: Record<string, unknown>;
  status_no_animation?: boolean;

  /**
   * Defines a custom visual state of the input. Use it only if you have to simulate a custom state. Currently are three statuses `virgin` , `focus` and `dirty`. Defaults to `null`.
   */
  input_state?: string;

  /**
   * The `status_id` used for the target <a href="/uilib/components/global-status">GlobalStatus</a>.
   */
  global_status_id?: string;

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
   * Text describing the content of the input more than the label. You can also send in a React component, so it gets wrapped inside the Input component.
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
  input_attributes?: InputMaskedInputAttributes;

  /**
   * <em>(internal)</em> by providing a new component we can change the internally used element. Also supports a string only, like `input_element="input"`.
   */
  input_element?: InputMaskedInputElement;

  /**
   * Icon to show before or after the input / placeholder. Can be either a string defining a primary icon or a Component using an SVG icon of either 16px or 24px.
   */
  icon?: InputMaskedIcon;

  /**
   * The icon size of the icon shows. Defaults to `medium`.
   */
  icon_size?: InputMaskedIconSize;

  /**
   * Defines the position of icon inside the input. Set to `left` or `right`. Defaults to `left` if not set.
   */
  icon_position?: InputMaskedIconPosition;
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

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: InputMaskedSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: InputMaskedTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: InputMaskedRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: InputMaskedBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: InputMaskedLeft;
  className?: string;
  children?: InputMaskedChildren;
  on_state_update?: (...args: any[]) => any;
}
declare const InputMasked: React.FC<InputMaskedProps>;
export default InputMasked;
