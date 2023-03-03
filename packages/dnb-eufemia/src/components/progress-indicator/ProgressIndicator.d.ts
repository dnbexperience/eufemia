import * as React from 'react';
import type { SectionSpacing, SectionStyleTypes } from '../Section';
export type ProgressIndicatorType = 'circular' | 'linear';
export type ProgressIndicatorSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge';
export type ProgressIndicatorProgress = string | number;
export type ProgressIndicatorSpace =
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
export type ProgressIndicatorTop = string | number | boolean;
export type ProgressIndicatorRight = string | number | boolean;
export type ProgressIndicatorBottom = string | number | boolean;
export type ProgressIndicatorLeft = string | number | boolean;
export type ProgressIndicatorChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface ProgressIndicatorProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * Defines the visibility of the progress. Toggling the `visible` property to false will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean;

  /**
   * Defines the "type" of progress, like `circular` or `linear`. Defaults to `circular`.
   */
  type?: ProgressIndicatorType;

  /**
   * Disables the fade-in and fade-out animation. Defaults to false.
   */
  no_animation?: boolean;

  /**
   * Defines the size, like `large` or `medium`. Defaults to `medium`.
   */
  size?: ProgressIndicatorSize;

  /**
   * To visualize a static "percentage" (0-100) as a progress state. Defaults to `null`.
   */
  progress?: ProgressIndicatorProgress;

  /**
   * Show a custom label to the right or under the indicator.
   */
  label?: React.ReactNode;

  /**
   * Set it to `vertical` if you want the label to be placed under the indicator. Defaults to `horizontal`.
   */
  label_direction?: string;

  /**
   * If set to `true` a default label will be shown.
   */
  show_label?: boolean;
  indicator_label?: string;

  /**
   * To enable the visual helper `.dnb-section` class. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to null.
   */
  section_style?: SectionStyleTypes;

  /**
   * To modify the `spacing`. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to null.
   */
  section_spacing?: SectionSpacing;

  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string;

  /**
   * Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`.
   */
  space?: ProgressIndicatorSpace;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. Will use `margin-top`.
   */
  top?: ProgressIndicatorTop;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-right`.
   */
  right?: ProgressIndicatorRight;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-bottom`.
   */
  bottom?: ProgressIndicatorBottom;

  /**
   * Use spacing values like: `small`, `1rem`, `1` or , `16px`. will use `margin-left`.
   */
  left?: ProgressIndicatorLeft;
  class?: string;
  className?: string;
  children?: ProgressIndicatorChildren;

  /**
   * Will be called once the `min_time` has timed out.
   */
  on_complete?: (...args: any[]) => any;
}
export default class ProgressIndicator extends React.Component<
  ProgressIndicatorProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
