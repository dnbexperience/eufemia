import * as React from 'react';
export type DatePickerProviderMinDate = Date | string;
export type DatePickerProviderMaxDate = Date | string;
export type DatePickerProviderRange = boolean | string;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DatePickerProviderProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * To limit a date range to a minimum `start_date`. Defaults to null.
   */
  min_date?: DatePickerProviderMinDate;

  /**
   * To limit a date range to a maximum `end_date`. Defaults to null.
   */
  max_date?: DatePickerProviderMaxDate;

  /**
   * Defines how the returned date, as a string, should be formatted as. Defaults to `yyyy-MM-dd`.
   */
  return_format?: string;

  /**
   * If the date picker should support a range of two dates (starting and ending date). Defaults to `false`.
   */
  range: DatePickerProviderRange;
  setReturnObject: (...args: any[]) => any;
  enhanceWithMethods?: Record<string, string>;
  attributes?: Record<string, string>;
  children: React.ReactNode;
}
export default class DatePickerProvider extends React.Component<
  DatePickerProviderProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
