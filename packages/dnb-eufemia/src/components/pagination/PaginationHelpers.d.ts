import * as React from 'react';
export type PaginationIndicatorIndicatorElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;

export interface PaginationIndicatorProps {
  /**
   * (infinity mode) is used by the <em>indicator</em>. Falls back to `fallback_element` if not defined.
   */
  indicator_element?: PaginationIndicatorIndicatorElement;
}
export class PaginationIndicator extends React.Component<
  PaginationIndicatorProps,
  any
> {
  render(): JSX.Element;
}
