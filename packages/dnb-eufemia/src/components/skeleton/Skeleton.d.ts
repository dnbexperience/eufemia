import * as React from 'react';
import type { SpacingProps } from '../space/types';
type SkeletonShow = boolean;
type SkeletonStyleType = 'lines' | string;
type SkeletonFigure = string | ((...args: any[]) => any) | React.ReactNode;
type SkeletonChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

export interface SkeletonProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * Use `true` to enable/show the skeleton for the component used inside. Defaults to `false`.
   */
  show?: boolean;

  /**
   * Use `true` to disable the animation.
   */
  no_animation?: boolean;

  /**
   * Defines the style type to use (`shine`). Defaults to `lines`.
   */
  style_type?: SkeletonStyleType;

  /**
   * Define a figure to use, like `article`. The wrapped content will be hidden while the skeleton figure is shown.
   */
  figure?: SkeletonFigure;

  /**
   * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
   */
  aria_busy?: string;

  /**
   * Is used for screen reader text translation, defined in the translation files. You can set a custom text if needed.
   */
  aria_ready?: string;

  /**
   * Set any HTML element type you have to use. A couple of aria attributes will be set on this element while active. Defaults to `div`
   */
  element?: React.ReactNode;

  class?: string;
  className?: string;
  children?: SkeletonChildren;
}
export default class Skeleton extends React.Component<SkeletonProps, any> {
  static defaultProps: object;
  static Exclude: ({
    children
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  render(): JSX.Element;
}
