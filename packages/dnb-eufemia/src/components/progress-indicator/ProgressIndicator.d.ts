import * as React from 'react';
import type { SectionSpacing, SectionStyleTypes } from '../Section';
import type { SpacingProps } from '../space/types';
export type ProgressIndicatorType = 'circular' | 'linear';
export type ProgressIndicatorSize =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'
  | 'huge';
export type ProgressIndicatorProgress = string | number;
export type ProgressIndicatorChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
export interface ProgressIndicatorProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * Defines the visibility of the progress. Toggling the `visible` property to `false` will force a fade-out animation. Defaults to `true`.
   */
  visible?: boolean;

  /**
   * Defines the "type" of progress, like `circular` or `linear`. Defaults to `circular`.
   */
  type?: ProgressIndicatorType;

  /**
   * Disables the fade-in and fade-out animation. Defaults to `false`.
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
   * To enable the visual helper `.dnb-section` class. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  section_style?: SectionStyleTypes;

  /**
   * To modify the `spacing`. Use a supported modifier from the <a href="/uilib/components/section/properties">Section component</a>. Defaults to `null`.
   */
  section_spacing?: SectionSpacing;

  /**
   * Used to set title and aria-label. Defaults to the value of progress property, formatted as a percent.
   */
  title?: string;
  class?: string;
  className?: string;
  children?: ProgressIndicatorChildren;

  /**
   * Will be called once it&#39;s no longer `visible`.
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
