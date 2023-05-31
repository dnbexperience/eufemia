import * as React from 'react';
export type HeadingText = React.ReactNode | ((...args: any[]) => any);
export type HeadingSize =
  | 'auto'
  | 'xx-large'
  | 'x-large'
  | 'large'
  | 'medium'
  | 'basis'
  | 'small'
  | 'x-small';
export type HeadingLevel = number | string;
export type HeadingIncrease = string | boolean;
export type HeadingDecrease = string | boolean;
export type HeadingUp = string | boolean;
export type HeadingDown = string | boolean;
export type HeadingDebug = boolean | ((...args: any[]) => any);
export type HeadingDebugCounter = boolean | ((...args: any[]) => any);
export type HeadingInherit = string | boolean;
export type HeadingReset = number | string | boolean;
export type HeadingSkeleton = string | boolean;
export type HeadingSpace =
  | string
  | number
  | boolean
  | {
      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
       */
      top?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
       */
      right?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
       */
      bottom?: string | number | boolean;

      /**
       * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
       */
      left?: string | number | boolean;
    };
export type HeadingTop = string | number | boolean;
export type HeadingRight = string | number | boolean;
export type HeadingBottom = string | number | boolean;
export type HeadingLeft = string | number | boolean;
export type HeadingChildren = React.ReactNode | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface HeadingProps extends React.HTMLProps<HTMLElement> {
  id?: string;
  group?: string;

  /**
   * <em>(required)</em> a heading, can be text or React.Node.
   */
  text?: HeadingText;

  /**
   * Define the typography <a href="/uilib/typography/font-size">font-size</a> by a size <em>type</em>, e.g. `x-large`. Defaults to the predefined heading sizes.
   */
  size?: HeadingSize;
  level?: HeadingLevel;

  /**
   * If set to true, the heading level will be incremented by 1.
   */
  increase?: HeadingIncrease;

  /**
   * If set to true, the heading level will be decremented by 1.
   */
  decrease?: HeadingDecrease;
  up?: HeadingUp;
  down?: HeadingDown;

  /**
   * If set to true, the heading will not be corrected and warnings will not be shown. Warnings do not show up in "production builds" else either.
   */
  skip_correction?: boolean;

  /**
   * If set to true, the content will have a prefix, showing the heading level.
   */
  debug?: HeadingDebug;

  /**
   * If set to true, the content will have both a prefix and a JSON log attached to both headings and level contexts.
   */
  debug_counter?: HeadingDebugCounter;
  counter?: any;

  /**
   * If set to true, the heading last used level will be inherited. Also from inside a level context.
   */
  inherit?: HeadingInherit;

  /**
   * If set to true, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.
   */
  reset?: HeadingReset;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: HeadingSkeleton;

  /**
   * Define what HTML element should be used. If you use, e.g. a `span`, then `role="heading"` and `aria-level` gets set. Defaults to semantic heading element.
   */
  element?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: HeadingSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: HeadingTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: HeadingRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: HeadingBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: HeadingLeft;
  class?: string;
  className?: string;

  /**
   * <em>(required)</em> a heading, can be text or React.Node.
   */
  children?: HeadingChildren;
}
export default class Heading extends React.Component<HeadingProps, any> {
  static defaultProps: object;
  static Level: (props: HeadingProps) => JSX.Element;
  static Increase: (props: HeadingProps) => JSX.Element;
  static Decrease: (props: HeadingProps) => JSX.Element;
  render(): JSX.Element;
}
