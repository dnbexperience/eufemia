import * as React from 'react';
import { SpacingProps } from '../../shared/types';
import StepIndicatorSidebar from './StepIndicatorSidebar';
export type StepIndicatorMode = 'static' | 'strict' | 'loose';
export type StepIndicatorData =
  | string
  | string[]
  | {
      title: string | React.ReactNode;
      is_current?: boolean;
      inactive?: boolean;
      disabled?: boolean;
      status?: string | React.ReactNode;
      status_state?: 'warn' | 'info' | 'error';

      /**
       * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`.
       */
      on_click?: (...args: any[]) => any;
      on_render?: (...args: any[]) => any;
    }[];
export type StepIndicatorTitle = string | React.ReactNode;
export type StepIndicatorStatus = string | React.ReactNode;
export type StepIndicatorStatusState = 'warn' | 'info' | 'error';
export type StepIndicatorCurrentStep = string | number;
export type StepIndicatorHideNumbers = string | boolean;
export type StepIndicatorNoAnimation = string | boolean;
export type StepIndicatorSkeleton = string | boolean;
export type StepIndicatorChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface StepIndicatorProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id?: string;

  /**
   * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
   */
  mode?: StepIndicatorMode;

  /**
   * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.
   */
  data?: StepIndicatorData;
  title?: StepIndicatorTitle;
  is_current?: boolean;
  inactive?: boolean;
  disabled?: boolean;
  status?: StepIndicatorStatus;
  status_state?: StepIndicatorStatusState;

  /**
   * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`.
   */
  on_click?: (...args: any[]) => any;
  on_render?: (...args: any[]) => any;
  overview_title?: string;
  step_title_extended?: string;
  step_title?: string;

  /**
   * Defines the active number marked step starting by 0. Defaults to `0`.
   */
  current_step?: StepIndicatorCurrentStep;

  /**
   * Define whether to show automatically counted numbers or not. Defaults to `false`.
   */
  hide_numbers?: StepIndicatorHideNumbers;

  /**
   * Callback function to manipulate or wrap every item. Has to return a React Node. You receive an object you can use in your custom HOC `{ StepItem, element, attributes, props, context }`.
   */
  on_item_render?: (...args: any[]) => any;

  /**
   * If set to `true`, the height animation on the step items and the drawer button will be omitted. Defaults to false.
   */
  no_animation?: StepIndicatorNoAnimation;
  skeleton?: StepIndicatorSkeleton;

  class?: string;
  className?: string;
  children?: StepIndicatorChildren;

  /**
   * Will be called once the user visits actively a new step. Will be emitted only once. Returns an object `{ event, item, current_step }`.
   */
  on_change?: (...args: any[]) => any;
}
export default class StepIndicator extends React.Component<
  StepIndicatorProps,
  any
> {
  static defaultProps: object;
  static Sidebar = StepIndicatorSidebar;
  render(): JSX.Element;
}
