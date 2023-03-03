import * as React from 'react';
export type PaginationProviderStartupPage = string | number;
export type PaginationProviderCurrentPage = string | number;
export type PaginationProviderPageCount = string | number;

export interface PaginationProviderRerender {
  current?: (...args: any[]) => any;
}

export interface PaginationProviderStore {
  current?: Record<string, unknown> | ((...args: any[]) => any);
}
export type PaginationProviderInternalContent =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | any[];
export type PaginationProviderChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
  | Record<string, unknown>
  | any[];

export interface PaginationProviderProps
  extends React.HTMLProps<HTMLElement> {
  /**
   * The page shown in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.
   */
  startup_page?: PaginationProviderStartupPage;

  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  current_page?: PaginationProviderCurrentPage;

  /**
   * The total pages count. Defaults to `1`.
   */
  page_count?: PaginationProviderPageCount;

  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  set_content_handler?: (...args: any[]) => any;

  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  reset_content_handler?: (...args: any[]) => any;

  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  reset_pagination_handler?: (...args: any[]) => any;

  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.
   */
  end_infinity_handler?: (...args: any[]) => any;
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
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
