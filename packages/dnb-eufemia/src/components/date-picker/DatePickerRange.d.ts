import * as React from 'react';
export type DatePickerRangeViews = number | Object[];
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface DatePickerRangeProps
  extends React.HTMLProps<HTMLElement> {
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
  DatePickerRangeProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
