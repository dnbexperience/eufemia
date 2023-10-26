import * as React from 'react';
export interface DatePickerCalendarProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  nr?: number;
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
   */
  month?: Date;
  prevBtn?: boolean;
  nextBtn?: boolean;
  titleFormat?: string;
  dayOfWeekFormat?: string;
  firstDayOfWeek?: string;
  hideNav?: boolean;
  hideDays?: boolean;
  onlyMonth?: boolean;
  hideNextMonthWeek?: boolean;
  noAutofocus?: boolean;
  onHover?: (...args: any[]) => any;
  onSelect?: (...args: any[]) => any;
  onPrev?: (...args: any[]) => any;
  onNext?: (...args: any[]) => any;
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
   */
  locale?: Locale;
  rtl?: boolean;
  isRange?: boolean;
  resetDate?: boolean;
  onKeyDown?: (...args: any[]) => any;
}
export default class DatePickerCalendar extends React.Component<
  DatePickerCalendarProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
