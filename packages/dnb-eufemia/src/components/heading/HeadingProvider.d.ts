import * as React from 'react';
export type HeadingProviderLevel = number | string;
export type HeadingProviderIncrease = boolean;
export type HeadingProviderDecrease = boolean;
export type HeadingProviderUp = boolean;
export type HeadingProviderDown = boolean;
export type HeadingProviderInherit = boolean;
export type HeadingProviderReset = number | boolean;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface HeadingProviderProps
  extends React.HTMLProps<HTMLElement> {
  id?: string;
  group?: string;
  level?: HeadingProviderLevel;

  /**
   * If set to true, the heading level will be incremented by 1.
   */
  increase?: HeadingProviderIncrease;

  /**
   * If set to true, the heading level will be decremented by 1.
   */
  decrease?: HeadingProviderDecrease;
  up?: HeadingProviderUp;
  down?: HeadingProviderDown;

  /**
   * If set to true, the heading last used level will be inherited. Also from inside a level context.
   */
  inherit?: HeadingProviderInherit;
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
