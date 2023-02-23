import * as React from 'react';
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

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
