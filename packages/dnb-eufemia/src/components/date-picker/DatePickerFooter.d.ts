import * as React from 'react';

export interface DatePickerFooterProps
  extends React.HTMLProps<HTMLElement> {
  isRange: boolean;
  onSubmit?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  onReset?: (...args: any[]) => any;
  resetButtonText?: string;
}
export default class DatePickerFooter extends React.Component<
  DatePickerFooterProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
