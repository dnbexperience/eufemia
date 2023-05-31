import * as React from 'react';
export type DatePickerAddonShortcuts = any[] | ((...args: any[]) => any);
export type DatePickerAddonRenderElement =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface DatePickerAddonProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: DatePickerAddonShortcuts;
  renderElement?: DatePickerAddonRenderElement;
}
export default class DatePickerAddon extends React.Component<
  DatePickerAddonProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
