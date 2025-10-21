import * as React from 'react';
export type PaginationIndicatorIndicatorElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export interface PaginationIndicatorProps {
  indicatorElement?: PaginationIndicatorIndicatorElement;
}
export class PaginationIndicator extends React.Component<
  PaginationIndicatorProps,
  any
> {
  render(): JSX.Element;
}
