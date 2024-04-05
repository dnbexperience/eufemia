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
   * <em>(required)</em> a number.
   */
  value?: NumberFormatValue;
  /**
   * Use a <a href="https://www.sitepoint.com/iso-2-letter-language-codes/">2 Letter Language Codes</a> or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.
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
  /**
   * Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner) , `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.
   */
  currency_display?:
    | 'code'
    | 'name'
    | 'symbol'
    | 'narrowSymbol'
    | ''
    | false;
  /**
   * Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).
   */
  currency_position?: NumberFormatCurrencyPosition;
  /**
   * Shortens any number or currency including an abbreviation. You can combine `compact` with `currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.
   */
  compact?: NumberFormatCompact;
  /**
   * "Bank Account Number": use `true` to use the default Norwegian style (2000 12 34567) formatting.
   */
  ban?: boolean;
  /**
   * "National Identification Number": use `true` to use the default Norwegian style (180892 12345) formatting.
   */
  nin?: boolean;
  /**
   * Use `true` to use the default Norwegian style (22 22 22 22) of phone number formatting, regulated by the <a href="https://lovdata.no/forskrift/2004-02-16-426/§16">Norwegian authority</a>. More info by <a href="https://www.sprakradet.no/sprakhjelp/Skriveregler/Dato/#tlf">Sprakradet</a> as well.
   */
  phone?: boolean;
  /**
   * "Organization Number": use `true` to use the default Norwegian style (123 456 789) formatting. Screen readers get digit by digit.
   */
  org?: boolean;
  /**
   * "Percentage": use `true` to enable percent formatting.
   */
  percent?: boolean;
  /**
   * Use `tel` or `sms` to enable a clickable / touchable anchor link.
   */
  link?: NumberFormatLink;
  /**
   * Accepts all <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString">number.toLocaleString</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat">Intl.NumberFormat</a> options as an object - can also be a JSON given as the parameter e.g. `options={{ &#39;minimumFractionDigits&#39;: 2 }}`.
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
  /**
   * Use `true` to always auto select all on the first click. Defaults to `false`.
   */
  always_selectall?: boolean;
  /**
   * Use `false` to disable the auto copy feature. Defaults to `true`.
   */
  copy_selection?: boolean;
  /**
   * If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.
   */
  clean_copy_value?: boolean;
  /**
   * If set to `true`, the decimal will NOT be rounded. Normally, by using `toFixed` or by using `maximumFractionDigits`, decimals get rounded.
   */
  omit_rounding?: boolean;
  /**
   * If set to `true` a dirty string will be parsed to to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).
   */
  clean?: boolean;
  /**
   * Will add a visually hidden label to give screen reader users the missing context to understand easier what the number represents.
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
  Omit<React.HTMLProps<HTMLElement>, 'prefix'> &
  SpacingProps;
export default class NumberFormat extends React.Component<
  NumberFormatAllProps,
  any
> {
  static defaultProps: NumberFormatAllProps;
  render(): JSX.Element;
}
