import * as React from 'react';
export type PaginationIndicatorIndicatorElement =
  | Object
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
/**
 * NB: Do not change the docs (comments) in here. The docs are updated during build time by "generateTypes.js" and "fetchPropertiesFromDocs.js".
 */

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
