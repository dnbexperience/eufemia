import * as React from 'react';
import type { SpacingProps } from '../../shared/types';
import type { StepIndicatorProps } from './StepIndicator';
export interface StepIndicatorSidebarProps
  extends SpacingProps,
    Pick<
      StepIndicatorProps,
      'sidebar_id' | 'mode' | 'current_step' | 'data'
    >,
    React.HTMLProps<HTMLElement> {
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
