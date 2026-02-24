import * as React from 'react';
export type PaginationIndicatorIndicatorElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export interface PaginationIndicatorProps {
  indicatorElement?: PaginationIndicatorIndicatorElement;
}
export declare const PaginationIndicator: React.FC<PaginationIndicatorProps>;
