import * as React from 'react';
export interface StepIndicatorProviderProps {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id: string;
  children: React.ReactNode;
  isSidebar?: boolean;
}
export class StepIndicatorProvider extends React.Component<
  StepIndicatorProviderProps,
  any
> {
  render(): JSX.Element;
}
