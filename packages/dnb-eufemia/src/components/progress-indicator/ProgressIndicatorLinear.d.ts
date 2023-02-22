import * as React from 'react';
export type ProgressIndicatorLinearProgress = string | number;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface ProgressIndicatorLinearProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * Defines the size, like `large` or `medium`. Defaults to `medium`.
   */
  size?: string;

  /**
   * Defines the visibility of the progress. Toggling the `visible` property to false will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean;
  complete?: boolean;

  /**
   * To visualize a static "percentage" (0-100) as a progress state. Defaults to `null`.
   */
  progress?: ProgressIndicatorLinearProgress;
  onComplete?: (...args: any[]) => any;
  callOnCompleteHandler?: (...args: any[]) => any;

  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string;
}
export default class ProgressIndicatorLinear extends React.Component<
  ProgressIndicatorLinearProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
