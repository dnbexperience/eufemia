import * as React from 'react';
import type { PaginationProps } from './Pagination';
type PaginationProviderStartupPage = string | number;
type PaginationProviderCurrentPage = string | number;
type PaginationProviderPageCount = string | number;
interface PaginationProviderRerender {
  current?: (...args: any[]) => any;
}
interface PaginationProviderStore {
  current?: Record<string, unknown> | ((...args: any[]) => any);
}
type PaginationProviderInternalContent =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | any[];
type PaginationProviderChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | any[];
interface PaginationProviderProps
  extends PaginationProps,
    React.HTMLProps<HTMLElement> {
  rerender?: PaginationProviderRerender;
  store?: PaginationProviderStore;
  useMarkerOnly?: boolean;
  internalContent?: PaginationProviderInternalContent;
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: PaginationProviderChildren;
}
export default class PaginationProvider extends React.Component<
  PaginationProviderProps,
  unknown
> {
  static defaultProps: Partial<PaginationProviderProps>;
  render(): JSX.Element;
}
