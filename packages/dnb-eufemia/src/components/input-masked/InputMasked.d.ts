import * as React from 'react';
import type { InternalLocale } from '../../shared/Context';
import type { ButtonIconPosition } from '../Button';
import type { FormLabelLabelDirection } from '../FormLabel';
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
   * A mask can be defined both as a [RegExp style of characters](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#readme) or a callback function. Example below.
   */
  mask?: InputMaskedMask;
  /**
   * Set to `true` to enable the default numbers formatting – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default.
   */
  number_mask?: InputMaskedNumberMask;
  /**
   * Set to `true` or set the _valuta_ (currency_mask="kr") to enable a custom currency mask – or give an `object` containing the number mask properties. More details below. Can be a JSON string as well, containing the number mask properties. Is disabled by default. Defaults to `kr`.
   */
  currency_mask?: InputMaskedCurrencyMask;
  /**
   * Use it to manipulate internal masks. You can use it instead of e.g. `number_mask` or `currency_mask`. All options are listed below.
   */
  mask_options?: InputMaskedMaskOptions;
  /**
   * Use an object with [NumberFormat](/uilib/components/number-format/properties).
   */
  number_format?: NumberFormatProps;
  /**
   * Define the locale to be used in the `as_number` or `as_currency` masked. It will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given. Defaults to `nb-NO`.
   */
  locale?: InternalLocale;
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
   * When `false` is given, it doesn't print out placeholder characters and only adds mask characters when the user reaches them as they're typing. Defaults to `true`.
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
  type?: string;
  size?: InputSize;
  value?: InputMaskedValue;
  id?: string;
  label?: React.ReactNode;
  label_direction?: FormLabelLabelDirection;
  label_sr_only?: boolean;
  status?: FormStatusText;
  status_state?: FormStatusState;
  status_props?: FormStatusProps;
  status_no_animation?: boolean;
  input_state?: string;
  globalStatus?: GlobalStatusConfigObject;
  autocomplete?: string;
  submit_button_title?: string;
  clear_button_title?: string;
  placeholder?: string;
  clear?: boolean;
  keep_placeholder?: boolean;
  /**
   * (string): What to display after the amount. Defaults to an empty string.
   */
  suffix?: InputMaskedSuffix;
  align?: InputMaskedAlign;
  selectall?: boolean;
  stretch?: boolean;
  disabled?: boolean;
  skeleton?: SkeletonShow;
  input_class?: string;
  input_attributes?: InputInputAttributes;
  input_element?: InputInputElement;
  icon?: IconIcon;
  icon_size?: IconSize;
  icon_position?: ButtonIconPosition;
  readOnly?: boolean;
  inner_element?: React.ReactNode;
  submit_element?: InputMaskedSubmitElement;
  submit_button_variant?: any;
  submit_button_icon?: InputMaskedSubmitButtonIcon;
  submit_button_status?: string;
  className?: string;
  children?: InputMaskedChildren;
  on_state_update?: (...args: any[]) => any;
}
export default InputMasked;
