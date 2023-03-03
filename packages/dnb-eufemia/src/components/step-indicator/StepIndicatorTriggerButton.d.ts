import * as React from 'react';

export interface StepIndicatorTriggerButtonProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id?: string;
  className?: string;
  inner_ref?: Record<string, unknown>;
}
export default class StepIndicatorTriggerButton extends React.Component<
  StepIndicatorTriggerButtonProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
