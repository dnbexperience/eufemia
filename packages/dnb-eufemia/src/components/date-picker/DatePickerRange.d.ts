import * as React from 'react';
export type DatePickerRangeViews = number | Record<string, unknown>[];
export interface DatePickerRangeProps
  extends React.HTMLProps<HTMLElement>,
    DatePickerCalendarProps {
  id?: string;
  isRange?: boolean;
  isLink?: boolean;
  isSync?: boolean;
  onlyMonth?: boolean;
  hideNav?: boolean;
  views?: DatePickerRangeViews;
  onChange?: (...args: any[]) => any;
  onNav?: (...args: any[]) => any;
}
export default class DatePickerRange extends React.Component<
  DatePickerRangeProps & DatePickerCalendarProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
