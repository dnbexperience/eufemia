import * as React from 'react';
import { FormStatusText } from '../FormStatus';
import { StepIndicatorStatusState } from './StepIndicator';
export type StepIndicatorItemTitle = string | React.ReactNode;

export interface StepIndicatorItemProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
   */
  mode?: string;
  title: StepIndicatorItemTitle;
  step_title?: string;

  /**
   * Define whether to show automatically counted numbers or not. Defaults to `false`.
   */
  hide_numbers?: boolean;

  /**
   * Callback function to manipulate or wrap every item. Has to return a React Node. You receive an object you can use in your custom HOC `{ StepItem, element, attributes, props, context }`.
   */
  on_item_render?: (...args: any[]) => any;

  /**
   * Will be called once the user visits actively a new step. Will be emitted only once. Returns an object `{ event, item, current_step }`.
   */
  on_change?: (...args: any[]) => any;
  on_render?: (...args: any[]) => any;

  /**
   * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`.
   */
  on_click?: (...args: any[]) => any;
  is_current?: boolean;
  inactive?: boolean;
  disabled?: boolean;
  status?: FormStatusText;
  status_state?: StepIndicatorStatusState;
  currentItemNum: number;
}
export default class StepIndicatorItem extends React.Component<
  StepIndicatorItemProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}

export interface StepItemButtonProps {
  children?: React.ReactNode;
  inner_ref?: Record<string, unknown>;
  className?: string;
  status?: FormStatusText;
  status_state?: StepIndicatorStatusState;
}
export const StepItemButton: React.FC<StepItemButtonProps>;

export interface StepItemWrapperProps {
  children?: React.ReactNode;
  number?: number;

  /**
   * Define whether to show automatically counted numbers or not. Defaults to `false`.
   */
  hide_numbers?: boolean;
  status?: string;
}
export const StepItemWrapper: React.FC<StepItemWrapperProps>;
