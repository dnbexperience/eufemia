import * as React from 'react';
export type SkeletonShow = string | boolean;
export type SkeletonNoAnimation = string | boolean;
export type SkeletonStyleType = 'lines' | string;
export type SkeletonFigure =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;
export type SkeletonSpace =
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
export type SkeletonTop = string | number | boolean;
export type SkeletonRight = string | number | boolean;
export type SkeletonBottom = string | number | boolean;
export type SkeletonLeft = string | number | boolean;
export type SkeletonChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode;

/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */
export interface SkeletonProps extends React.HTMLProps<HTMLElement> {
  /**
   * Use `true` to enable/show the skeleton for the component used inside. Defaults to `false`.
   */
  show?: SkeletonShow;

  /**
   * Use `true` to disable the animation.
   */
  no_animation?: SkeletonNoAnimation;

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

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: SkeletonSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: SkeletonTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: SkeletonRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: SkeletonBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: SkeletonLeft;
  class?: string;
  className?: string;
  children?: SkeletonChildren;
}
export default class Skeleton extends React.Component<SkeletonProps, any> {
  static defaultProps: object;
  render(): JSX.Element;
}
