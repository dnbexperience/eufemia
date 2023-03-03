import * as React from 'react';
export type HeadingProviderLevel = number | string;
export type HeadingProviderReset = number | boolean;

export interface HeadingProviderProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  group?: string;
  level?: HeadingProviderLevel;

  /**
   * If set to true, the heading level will be incremented by 1.
   */
  increase?: boolean;

  /**
   * If set to true, the heading level will be decremented by 1.
   */
  decrease?: boolean;
  up?: boolean;
  down?: boolean;

  /**
   * If set to true, the heading last used level will be inherited. Also from inside a level context.
   */
  inherit?: boolean;
  counter?: any;

  /**
   * If set to true, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.
   */
  reset?: HeadingProviderReset;

  /**
   * <em>(required)</em> a heading, can be text or React.Node.
   */
  text?: any;

  /**
   * <em>(required)</em> a heading, can be text or React.Node.
   */
  children?: any;
}
export default class HeadingProvider extends React.Component<
  HeadingProviderProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
