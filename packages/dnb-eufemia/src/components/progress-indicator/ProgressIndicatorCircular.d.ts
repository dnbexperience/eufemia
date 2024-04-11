import * as React from 'react';
export type ProgressIndicatorCircularProgress = string | number;
export interface ProgressIndicatorCircularProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * Defines the size, like `small`, `default`, `medium` or `large`. Defaults to `default`.
   */
  size?: string;
  /**
   * Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean;
  /**
   * To visualize a static "percentage" (0-100) as a progress state. Defaults to `null`.
   */
  progress?: ProgressIndicatorCircularProgress;
  maxOffset?: number;
  onComplete?: (...args: any[]) => any;
  callOnCompleteHandler?: (...args: any[]) => any;
  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string;
}
export default class ProgressIndicatorCircular extends React.Component<
  ProgressIndicatorCircularProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
