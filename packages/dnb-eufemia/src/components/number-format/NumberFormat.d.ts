import * as React from 'react';
import type { InternalLocale } from '../../shared/Context';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type NumberFormatValue = number | string;
export type NumberFormatPrefix =
  | React.ReactNode
  | ((...args: any[]) => any);
export type NumberFormatSuffix =
  | React.ReactNode
  | ((...args: any[]) => any);
export type NumberFormatCurrency = string | boolean;
export type NumberFormatCurrencyPosition = 'auto' | 'before' | 'after';
export type NumberFormatCompact = 'short' | 'long' | boolean;
export type NumberFormatLink = 'tel' | 'sms';
export type NumberFormatOptions = Record<string, unknown> | string;
export type NumberFormatDecimals = number | string;
export type NumberFormatElement = string;
export type NumberFormatTooltip =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type NumberFormatChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export type NumberFormatProps = {
  id?: string;
  /**
   * A number.
   */
  value?: NumberFormatValue;
  /**
   * Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.
   */
  locale?: InternalLocale;
  /**
   * Add a string or React component before the number, including white space.
   */
  prefix?: NumberFormatPrefix;
  /**
   * Appends a string or React component after the number, including white space.
   */
  suffix?: NumberFormatSuffix;
  /**
   * Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.
   */
  currency?: NumberFormatCurrency;
  currency_display?:
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
    | ''
    | false;
  currency_position?: NumberFormatCurrencyPosition;
  /**
   * Shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.
   */
  compact?: NumberFormatCompact;
  /**
   * **Bank Account Number**: use `true` to use the default Norwegian style (2000 12 34567) formatting.
   */
  ban?: boolean;
  /**
   * **National Identification Number**: use `true` to use the default Norwegian style (180892 12345) formatting.
   */
  nin?: boolean;
  /**
   * Use `true` to use the default Norwegian style (22 22 22 22) of phone number formatting, regulated by the [Norwegian authority](https://lovdata.no/forskrift/2004-02-16-426/§16). More info by [Sprakradet](https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#tlf) as well.
   */
  phone?: boolean;
  /**
   * **Organization Number**: use `true` to use the default Norwegian style (123 456 789) formatting. Screen readers get digit by digit.
   */
  org?: boolean;
  /**
   * **Percentage**: use `true` to enable percent formatting.
   */
  percent?: boolean;
  /**
   * Use `tel` or `sms` to enable a clickable / touchable anchor link.
   */
  link?: NumberFormatLink;
  /**
   * Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).
   */
  monospace?: boolean;
  /**
   * Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.
   */
  options?: NumberFormatOptions;
  /**
   * Set a number to define the number of decimals. Like `decimals="0"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).
   */
  decimals?: NumberFormatDecimals;
  /**
   * Use `false` to disable the auto select all on the first click. Defaults to `true`.
   */
  selectall?: boolean;
  always_selectall?: boolean;
  copy_selection?: boolean;
  clean_copy_value?: boolean;
  omit_rounding?: boolean;
  /**
   * If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.
   */
  rounding?: 'omit' | 'half-even' | 'half-up';
  /**
   * If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).
   */
  clean?: boolean;
  /**
   * Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.
   */
  srLabel?: React.ReactNode;
  /**
   * Define what HTML element should be used. Defaults to `<span>`.
   */
  element?: NumberFormatElement;
  /**
   * Provide a string or a React Element to be shown as the tooltip content.
   */
  tooltip?: NumberFormatTooltip;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
};
export type NumberFormatAllProps = NumberFormatProps &
  Omit<React.HTMLProps<HTMLElement>, 'prefix' | 'label' | 'placeholder'> &
  SpacingProps;
export default class NumberFormat extends React.Component<
  NumberFormatAllProps,
  any
> {
  static defaultProps: NumberFormatAllProps;
  render(): JSX.Element;
}
