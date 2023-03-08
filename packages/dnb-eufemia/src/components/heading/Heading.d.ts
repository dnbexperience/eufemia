import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
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
export type HeadingDebug = boolean | ((...args: any[]) => any);
export type HeadingDebugCounter = boolean | ((...args: any[]) => any);
export type HeadingReset = number | boolean;
export type HeadingChildren = React.ReactNode | ((...args: any[]) => any);

export interface HeadingProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
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
  increase?: boolean;

  /**
   * If set to true, the heading level will be decremented by 1.
   */
  decrease?: boolean;
  up?: boolean;
  down?: boolean;

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
  inherit?: boolean;

  /**
   * If set to true, the heading level will be reset to 2. You can give it a custom level if you need to, e.g. `reset(1)`.
   */
  reset?: HeadingReset;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * Define what HTML element should be used. If you use, e.g. a `span`, then `role="heading"` and `aria-level` gets set. Defaults to semantic heading element.
   */
  element?: string;

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

export const setNextLevel = (
  level: any,
  { overwriteContext: boolean } = {}
) => any;
export const resetLevels = (
  level: any,
  { overwriteContext: boolean } = {}
) => any;
