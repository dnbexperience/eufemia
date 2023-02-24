import * as React from 'react';
import { SpacingProps } from '../../shared/types';
export type StepIndicatorSidebarMode = 'static' | 'strict' | 'loose';
export type StepIndicatorSidebarCurrentStep = string | number;
export type StepIndicatorSidebarData =
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
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

export interface StepIndicatorSidebarProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id: string;

  /**
   * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
   */
  mode?: StepIndicatorSidebarMode;

  /**
   * Defines the active number marked step starting by 0. Defaults to `0`.
   */
  current_step?: StepIndicatorSidebarCurrentStep;

  /**
   * <em>(required)</em> defines the data/steps showing up in a JavaScript Array or JSON format like `[{title,is_current}]`. See parameters and the example above.
   */
  data?: StepIndicatorSidebarData;
  internalId?: string;
  showInitialData?: boolean;
}
export default class StepIndicatorSidebar extends React.Component<
  StepIndicatorSidebarProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
