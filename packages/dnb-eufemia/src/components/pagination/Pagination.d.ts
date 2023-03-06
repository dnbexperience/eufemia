import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps } from '../space/types';
export type PaginationStartupPage = string | number;
export type PaginationCurrentPage = string | number;
export type PaginationPageCount = string | number;
export type PaginationStartupCount = string | number;
export type PaginationParallelLoadCount = string | number;
export type PaginationMinWaitTime = string | number;
export type PaginationMode = 'pagination' | 'infinity';
export type PaginationItems = string | any[];
export type PaginationSetContentHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationResetContentHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationResetPaginationHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationEndInfinityHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationPageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface PaginationProps
  extends React.HTMLProps<HTMLElement>,
    SpacingProps {
  /**
   * The page shown in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.
   */
  startup_page?: PaginationStartupPage;

  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  current_page?: PaginationCurrentPage;

  /**
   * The total pages count. Defaults to `1`.
   */
  page_count?: PaginationPageCount;

  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startup_count?: PaginationStartupCount;

  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallel_load_count?: PaginationParallelLoadCount;

  /**
   * If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  place_maker_before_content?: boolean;

  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  min_wait_time?: PaginationMinWaitTime;

  /**
   * If set to `true`, all pagination bar buttons are disabled.
   */
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the <a href="https://eufemia.dnb.no/uilib/components/pagination/infinity-scroller">Infinity Scroller</a>. Defaults to `pagination`.
   */
  mode?: PaginationMode;

  /**
   * If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.
   */
  use_load_button?: boolean;
  items?: PaginationItems;

  /**
   * If set to `true` no indicator will be shown.
   */
  hide_progress_indicator?: boolean;

  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  set_content_handler?: PaginationSetContentHandler;

  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  reset_content_handler?: PaginationResetContentHandler;

  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  reset_pagination_handler?: PaginationResetPaginationHandler;

  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.
   */
  end_infinity_handler?: PaginationEndInfinityHandler;

  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  page_element?: PaginationPageElement;

  /**
   * (infinity mode) is used by the <em>indicator</em>, <em>load more</em> bar as well as by the marker. Defaults to a `div`.
   */
  fallback_element?: PaginationFallbackElement;

  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallback_element` if not defined.
   */
  marker_element?: PaginationMarkerElement;

  /**
   * (infinity mode) is used by the <em>indicator</em>. Falls back to `fallback_element` if not defined.
   */
  indicator_element?: PaginationIndicatorElement;

  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string;

  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  button_title?: string;

  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prev_title?: string;

  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  next_title?: string;

  /**
   * The title used in the dots. Relevant for screen-readers. Defaults to `%s flere sider`.
   */
  more_pages?: string;

  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  is_loading_text?: string;

  /**
   * Used during infinity mode. If `use_load_button` is set to true, then a button is show on the bottom. If the `startup_page` is higher than 1. Defaults to `Vis mer innhold`.
   */
  load_button_text?: string;

  class?: string;
  className?: string;

  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: PaginationChildren;

  /**
   * Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. "NB:" Will be called again as soon as we reset the content by calling `resetContent()`.
   */
  on_startup?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.
   */
  on_load?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called once `page_count` is reached or `endInfinity` was called.
   */
  on_end?: (...args: any[]) => any;
}
export default class Pagination extends React.Component<
  PaginationProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
export type PaginationInstanceStartupPage = string | number;
export type PaginationInstanceCurrentPage = string | number;
export type PaginationInstancePageCount = string | number;
export type PaginationInstanceStartupCount = string | number;
export type PaginationInstanceParallelLoadCount = string | number;
export type PaginationInstanceMinWaitTime = string | number;
export type PaginationInstanceMode = 'pagination' | 'infinity';
export type PaginationInstanceItems = string | any[];
export type PaginationInstanceSetContentHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationInstanceResetContentHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationInstanceResetPaginationHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationInstanceEndInfinityHandler =
  | string
  | ((...args: any[]) => any);
export type PaginationInstancePageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationInstanceFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationInstanceMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationInstanceIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type PaginationInstanceChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface PaginationInstanceProps extends SpacingProps {
  /**
   * The page shown in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.
   */
  startup_page?: PaginationInstanceStartupPage;

  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  current_page?: PaginationInstanceCurrentPage;

  /**
   * The total pages count. Defaults to `1`.
   */
  page_count?: PaginationInstancePageCount;

  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startup_count?: PaginationInstanceStartupCount;

  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallel_load_count?: PaginationInstanceParallelLoadCount;

  /**
   * If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  place_maker_before_content?: boolean;

  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  min_wait_time?: PaginationInstanceMinWaitTime;

  /**
   * If set to `true`, all pagination bar buttons are disabled.
   */
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the <a href="https://eufemia.dnb.no/uilib/components/pagination/infinity-scroller">Infinity Scroller</a>. Defaults to `pagination`.
   */
  mode?: PaginationInstanceMode;

  /**
   * If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.
   */
  use_load_button?: boolean;
  items?: PaginationInstanceItems;

  /**
   * If set to `true` no indicator will be shown.
   */
  hide_progress_indicator?: boolean;

  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  set_content_handler?: PaginationInstanceSetContentHandler;

  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  reset_content_handler?: PaginationInstanceResetContentHandler;

  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  reset_pagination_handler?: PaginationInstanceResetPaginationHandler;

  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.
   */
  end_infinity_handler?: PaginationInstanceEndInfinityHandler;

  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  page_element?: PaginationInstancePageElement;

  /**
   * (infinity mode) is used by the <em>indicator</em>, <em>load more</em> bar as well as by the marker. Defaults to a `div`.
   */
  fallback_element?: PaginationInstanceFallbackElement;

  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallback_element` if not defined.
   */
  marker_element?: PaginationInstanceMarkerElement;

  /**
   * (infinity mode) is used by the <em>indicator</em>. Falls back to `fallback_element` if not defined.
   */
  indicator_element?: PaginationInstanceIndicatorElement;

  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string;

  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  button_title?: string;

  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prev_title?: string;

  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  next_title?: string;

  /**
   * The title used in the dots. Relevant for screen-readers. Defaults to `%s flere sider`.
   */
  more_pages?: string;

  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  is_loading_text?: string;

  /**
   * Used during infinity mode. If `use_load_button` is set to true, then a button is show on the bottom. If the `startup_page` is higher than 1. Defaults to `Vis mer innhold`.
   */
  load_button_text?: string;

  class?: string;
  className?: string;

  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: PaginationInstanceChildren;

  /**
   * Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. "NB:" Will be called again as soon as we reset the content by calling `resetContent()`.
   */
  on_startup?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.
   */
  on_load?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called once `page_count` is reached or `endInfinity` was called.
   */
  on_end?: (...args: any[]) => any;
}

declare class PaginationInstance extends React.Component<
  PaginationInstanceProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}

export type InfinityMarkerStartupPage = string | number;
export type InfinityMarkerCurrentPage = string | number;
export type InfinityMarkerPageCount = string | number;
export type InfinityMarkerStartupCount = string | number;
export type InfinityMarkerParallelLoadCount = string | number;
export type InfinityMarkerMinWaitTime = string | number;
export type InfinityMarkerMode = 'pagination' | 'infinity';
export type InfinityMarkerItems = string | any[];
export type InfinityMarkerSetContentHandler =
  | string
  | ((...args: any[]) => any);
export type InfinityMarkerResetContentHandler =
  | string
  | ((...args: any[]) => any);
export type InfinityMarkerResetPaginationHandler =
  | string
  | ((...args: any[]) => any);
export type InfinityMarkerEndInfinityHandler =
  | string
  | ((...args: any[]) => any);
export type InfinityMarkerPageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type InfinityMarkerFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type InfinityMarkerMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type InfinityMarkerIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
export type InfinityMarkerChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface InfinityMarkerProps extends SpacingProps {
  /**
   * The page shown in the very beginning. If `current_page` is set, then it may not make too much sense to set this as well.
   */
  startup_page?: InfinityMarkerStartupPage;

  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  current_page?: InfinityMarkerCurrentPage;

  /**
   * The total pages count. Defaults to `1`.
   */
  page_count?: InfinityMarkerPageCount;

  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startup_count?: InfinityMarkerStartupCount;

  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallel_load_count?: InfinityMarkerParallelLoadCount;

  /**
   * If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  place_maker_before_content?: boolean;

  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  min_wait_time?: InfinityMarkerMinWaitTime;

  /**
   * If set to `true`, all pagination bar buttons are disabled.
   */
  disabled?: boolean;

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;

  /**
   * If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the <a href="https://eufemia.dnb.no/uilib/components/pagination/infinity-scroller">Infinity Scroller</a>. Defaults to `pagination`.
   */
  mode?: InfinityMarkerMode;

  /**
   * If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.
   */
  use_load_button?: boolean;
  items?: InfinityMarkerItems;

  /**
   * If set to `true` no indicator will be shown.
   */
  hide_progress_indicator?: boolean;

  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `set_content_handler={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  set_content_handler?: InfinityMarkerSetContentHandler;

  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `reset_content_handler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  reset_content_handler?: InfinityMarkerResetContentHandler;

  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `reset_pagination_handler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  reset_pagination_handler?: InfinityMarkerResetPaginationHandler;

  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `end_infinity_handler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `page_count` is unknown.
   */
  end_infinity_handler?: InfinityMarkerEndInfinityHandler;

  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  page_element?: InfinityMarkerPageElement;

  /**
   * (infinity mode) is used by the <em>indicator</em>, <em>load more</em> bar as well as by the marker. Defaults to a `div`.
   */
  fallback_element?: InfinityMarkerFallbackElement;

  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallback_element` if not defined.
   */
  marker_element?: InfinityMarkerMarkerElement;

  /**
   * (infinity mode) is used by the <em>indicator</em>. Falls back to `fallback_element` if not defined.
   */
  indicator_element?: InfinityMarkerIndicatorElement;

  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string;

  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  button_title?: string;

  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prev_title?: string;

  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  next_title?: string;

  /**
   * The title used in the dots. Relevant for screen-readers. Defaults to `%s flere sider`.
   */
  more_pages?: string;

  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  is_loading_text?: string;

  /**
   * Used during infinity mode. If `use_load_button` is set to true, then a button is show on the bottom. If the `startup_page` is higher than 1. Defaults to `Vis mer innhold`.
   */
  load_button_text?: string;

  class?: string;
  className?: string;

  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: InfinityMarkerChildren;

  /**
   * Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.
   */
  on_change?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. "NB:" Will be called again as soon as we reset the content by calling `resetContent()`.
   */
  on_startup?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.
   */
  on_load?: (...args: any[]) => any;

  /**
   * Only on "infinity" mode. Will be called once `page_count` is reached or `endInfinity` was called.
   */
  on_end?: (...args: any[]) => any;
}
export class InfinityMarker extends React.Component<
  InfinityMarkerProps,
  any
> {
  static defaultProps: object;
  render(): JSX.Element;
}
export type PaginationContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any);

export interface PaginationContentProps {
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children: PaginationContentChildren;
}
declare const PaginationContent: React.FC<PaginationContentProps>;

export type CreatePaginationReturn = {
  Pagination: (props?: Record<string, unknown>) => JSX.Element;
  InfinityMarker: (props?: Record<string, unknown>) => void;
  setContent: (pageNumber: number, content: React.ReactDom) => void;
  resetContent: () => void;
  resetInfinity: () => void;
  endInfinity: () => void;
};

export const createPagination = (initProps?: Record<string, unknown>) =>
  CreatePaginationReturn;
