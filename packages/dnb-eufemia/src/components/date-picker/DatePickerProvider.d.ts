import * as React from 'react';
import type { DatePickerProps } from './DatePicker';
interface DatePickerProviderProps
  extends React.HTMLProps<HTMLElement>,
    DatePickerProps {
  setReturnObject: (...args: any[]) => any;
  enhanceWithMethods?: Record<string, unknown>;
  attributes?: Record<string, unknown>;
  children: React.ReactNode;
}
export default class DatePickerProvider extends React.Component<
  DatePickerProviderProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
