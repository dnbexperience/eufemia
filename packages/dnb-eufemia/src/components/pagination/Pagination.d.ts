import * as React from 'react';
import type { SkeletonShow } from '../Skeleton';
import type { SpacingProps, SpaceTypeAll } from '../space/types';
import PaginationBar from './PaginationBar';
import { ButtonIconPosition } from '../Button';
type PaginationStartupPage = string | number;
type PaginationCurrentPage = string | number;
type PaginationPageCount = string | number;
type PaginationStartupCount = string | number;
type PaginationParallelLoadCount = string | number;
type PaginationMinWaitTime = string | number;
type PaginationMode = 'pagination' | 'infinity';
type PaginationLayout = 'vertical' | 'horizontal';
type PaginationItems = string | any[];
type PaginationOnSetContent = string | ((...args: any[]) => any);
type PaginationOnResetContent = string | ((...args: any[]) => any);
type PaginationOnResetPagination = string | ((...args: any[]) => any);
type PaginationOnEndInfinity = string | ((...args: any[]) => any);
type PaginationPageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationChildren = React.ReactNode | ((...args: any[]) => any);
type LoadButtonProps =
  | (() => React.ReactNode)
  | {
      /**
       * Used during infinity mode. If `useLoadButton` is set to true, then a button is show on the bottom. If the `startupPage` is higher than 1. Defaults to `Vis mer innhold`.
       */
      text: string;
      /**
       * Used during infinity mode. Sets the icon position on the `useLoadButton`. Default: `left`.
       */
      iconPosition: ButtonIconPosition;
    };
export interface PaginationProps
  extends Omit<React.HTMLProps<HTMLElement>, 'ref'>,
    SpacingProps {
  /**
   * The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.
   */
  startupPage?: PaginationStartupPage;
  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  currentPage?: PaginationCurrentPage;
  /**
   * The total pages count. Defaults to `1`.
   */
  pageCount?: PaginationPageCount;
  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startupCount?: PaginationStartupCount;
  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallelLoadCount?: PaginationParallelLoadCount;
  /**
   * if set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  placeMarkerBeforeContent?: boolean;
  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  minWaitTime?: PaginationMinWaitTime;
  /**
   * If set to `true`, all pagination bar buttons are disabled.
   */
  disabled?: boolean;
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow;
  /**
   * If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the [Infinity Scroller](/uilib/components/pagination/infinity-scroller). Defaults to `pagination`.
   */
  mode?: PaginationMode;
  /**
   * The layout of the pagination bar. Defaults to `vertical`.
   */
  paginationBarLayout?: PaginationLayout;
  /**
   * If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.
   */
  useLoadButton?: boolean;
  items?: PaginationItems;
  /**
   * If set to `true` no indicator will be shown.
   */
  hideProgressIndicator?: boolean;
  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `onSetContent={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  onSetContent?: PaginationOnSetContent;
  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `onResetContent={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  onResetContent?: PaginationOnResetContent;
  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `onResetPagination={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  onResetPagination?: PaginationOnResetPagination;
  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `onEndInfinity={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.
   */
  onEndInfinity?: PaginationOnEndInfinity;
  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  pageElement?: PaginationPageElement;
  /**
   * (infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.
   */
  fallbackElement?: PaginationFallbackElement;
  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.
   */
  markerElement?: PaginationMarkerElement;
  /**
   * (infinity mode) is used by the _indicator_. Falls back to `fallbackElement` if not defined.
   */
  indicatorElement?: PaginationIndicatorElement;
  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string;
  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  buttonTitle?: string;
  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prevTitle?: string;
  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  nextTitle?: string;
  /**
   * The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.
   */
  morePages?: string;
  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  isLoadingText?: string;
  /**
   * Used to set load button text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.
   */
  loadButton?: LoadButtonProps;
  /**
   * Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).
   */
  barSpace?: SpaceTypeAll;
  className?: string;
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: PaginationChildren;
  onChange?: (...args: any[]) => any;
  onStartup?: (...args: any[]) => any;
  onLoad?: (...args: any[]) => any;
  onEnd?: (...args: any[]) => any;
}
declare const Pagination: React.ComponentClass<PaginationProps> & {
  defaultProps: object;
};
export default Pagination;
type PaginationInstanceStartupPage = string | number;
type PaginationInstanceCurrentPage = string | number;
type PaginationInstancePageCount = string | number;
type PaginationInstanceStartupCount = string | number;
type PaginationInstanceParallelLoadCount = string | number;
type PaginationInstanceMinWaitTime = string | number;
type PaginationInstanceMode = 'pagination' | 'infinity';
type PaginationInstanceItems = string | any[];
type PaginationInstanceOnSetContent = string | ((...args: any[]) => any);
type PaginationInstanceOnResetContent = string | ((...args: any[]) => any);
type PaginationInstanceOnResetPagination =
  | string
  | ((...args: any[]) => any);
type PaginationInstanceOnEndInfinity = string | ((...args: any[]) => any);
type PaginationInstancePageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationInstanceFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationInstanceMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationInstanceIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type PaginationInstanceChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
interface PaginationInstanceProps extends SpacingProps {
  /**
   * The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.
   */
  startupPage?: PaginationInstanceStartupPage;
  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  currentPage?: PaginationInstanceCurrentPage;
  /**
   * The total pages count. Defaults to `1`.
   */
  pageCount?: PaginationInstancePageCount;
  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startupCount?: PaginationInstanceStartupCount;
  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallelLoadCount?: PaginationInstanceParallelLoadCount;
  /**
   * If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  placeMarkerBeforeContent?: boolean;
  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  minWaitTime?: PaginationInstanceMinWaitTime;
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
  useLoadButton?: boolean;
  items?: PaginationInstanceItems;
  /**
   * If set to `true` no indicator will be shown.
   */
  hideProgressIndicator?: boolean;
  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `onSetContent={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  onSetContent?: PaginationInstanceOnSetContent;
  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `onResetContent={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  onResetContent?: PaginationInstanceOnResetContent;
  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `onResetPagination={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  onResetPagination?: PaginationInstanceOnResetPagination;
  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `onEndInfinity={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.
   */
  onEndInfinity?: PaginationInstanceOnEndInfinity;
  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  pageElement?: PaginationInstancePageElement;
  /**
   * (infinity mode) is used by the <em>indicator</em>, <em>load more</em> bar as well as by the marker. Defaults to a `div`.
   */
  fallbackElement?: PaginationInstanceFallbackElement;
  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.
   */
  markerElement?: PaginationInstanceMarkerElement;
  /**
   * (infinity mode) is used by the <em>indicator</em>. Falls back to `fallbackElement` if not defined.
   */
  indicatorElement?: PaginationInstanceIndicatorElement;
  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string;
  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  buttonTitle?: string;
  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prevTitle?: string;
  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  nextTitle?: string;
  /**
   * The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.
   */
  morePages?: string;
  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  isLoadingText?: string;
  /**
   * Used to set loadButton text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.
   */
  loadButton?: LoadButtonProps;
  /**
   * Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).
   */
  barSpace?: SpaceTypeAll;
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: PaginationInstanceChildren;
  /**
   * Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.
   */
  onChange?: (...args: any[]) => any;
  /**
   * Only on "infinity" mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. "NB:" Will be called again as soon as we reset the content by calling `resetContent()`.
   */
  onStartup?: (...args: any[]) => any;
  /**
   * Only on "infinity" mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.
   */
  onLoad?: (...args: any[]) => any;
  /**
   * Only on "infinity" mode. Will be called once `pageCount` is reached or `endInfinity` was called.
   */
  onEnd?: (...args: any[]) => any;
}
declare const PaginationInstance: React.ComponentClass<PaginationInstanceProps> & {
  defaultProps: object;
};
type InfinityMarkerStartupPage = string | number;
type InfinityMarkerCurrentPage = string | number;
type InfinityMarkerPageCount = string | number;
type InfinityMarkerStartupCount = string | number;
type InfinityMarkerParallelLoadCount = string | number;
type InfinityMarkerMinWaitTime = string | number;
type InfinityMarkerMode = 'pagination' | 'infinity';
type InfinityMarkerItems = string | any[];
type InfinityMarkerOnSetContent = string | ((...args: any[]) => any);
type InfinityMarkerOnResetContent = string | ((...args: any[]) => any);
type InfinityMarkerOnResetPagination = string | ((...args: any[]) => any);
type InfinityMarkerOnEndInfinity = string | ((...args: any[]) => any);
type InfinityMarkerPageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type InfinityMarkerFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type InfinityMarkerMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type InfinityMarkerIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string;
type InfinityMarkerChildren = React.ReactNode | ((...args: any[]) => any);
interface InfinityMarkerProps extends SpacingProps {
  /**
   * The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.
   */
  startupPage?: InfinityMarkerStartupPage;
  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  currentPage?: InfinityMarkerCurrentPage;
  /**
   * The total pages count. Defaults to `1`.
   */
  pageCount?: InfinityMarkerPageCount;
  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startupCount?: InfinityMarkerStartupCount;
  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallelLoadCount?: InfinityMarkerParallelLoadCount;
  /**
   * If set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  placeMarkerBeforeContent?: boolean;
  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  minWaitTime?: InfinityMarkerMinWaitTime;
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
  useLoadButton?: boolean;
  items?: InfinityMarkerItems;
  /**
   * If set to `true` no indicator will be shown.
   */
  hideProgressIndicator?: boolean;
  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `onSetContent={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  onSetContent?: InfinityMarkerOnSetContent;
  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `onResetContent={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  onResetContent?: InfinityMarkerOnResetContent;
  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `onResetPagination={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  onResetPagination?: InfinityMarkerOnResetPagination;
  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `onEndInfinity={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.
   */
  onEndInfinity?: InfinityMarkerOnEndInfinity;
  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  pageElement?: InfinityMarkerPageElement;
  /**
   * (infinity mode) is used by the <em>indicator</em>, <em>load more</em> bar as well as by the marker. Defaults to a `div`.
   */
  fallbackElement?: InfinityMarkerFallbackElement;
  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.
   */
  markerElement?: InfinityMarkerMarkerElement;
  /**
   * (infinity mode) is used by the <em>indicator</em>. Falls back to `fallbackElement` if not defined.
   */
  indicatorElement?: InfinityMarkerIndicatorElement;
  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string;
  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  buttonTitle?: string;
  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prevTitle?: string;
  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  nextTitle?: string;
  /**
   * The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.
   */
  morePages?: string;
  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  isLoadingText?: string;
  /**
   * Used to set loadButton text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.
   */
  loadButton?: LoadButtonProps;
  /**
   * Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).
   */
  barSpace?: SpaceTypeAll;
  className?: string;
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: InfinityMarkerChildren;
  /**
   * Will be called for every page change, regardless if the mode is `mode="infinity"` or not. Returns an object with number of useful properties and methods. See below for more details.
   */
  onChange?: (...args: any[]) => any;
  /**
   * Only on "infinity" mode. Will be called once the component is ready for interaction. Returns an object with number of useful properties and methods. See below for more details. "NB:" Will be called again as soon as we reset the content by calling `resetContent()`.
   */
  onStartup?: (...args: any[]) => any;
  /**
   * Only on "infinity" mode. Will be called on every page interaction, also on the very first interaction. Returns an object with number of useful properties and methods. See below for more details.
   */
  onLoad?: (...args: any[]) => any;
  /**
   * Only on "infinity" mode. Will be called once `pageCount` is reached or `endInfinity` was called.
   */
  onEnd?: (...args: any[]) => any;
}
export declare const InfinityMarker: React.ComponentClass<InfinityMarkerProps> & {
  defaultProps: object;
};
type PaginationContentChildren =
  | React.ReactNode
  | ((...args: any[]) => any);
interface PaginationContentProps {
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children: PaginationContentChildren;
}
declare const PaginationContent: (
  props: PaginationContentProps
) => React.JSX.Element;
export type CreatePaginationReturn = {
  Pagination: (props?: Record<string, unknown>) => React.JSX.Element;
  InfinityMarker: (props?: Record<string, unknown>) => JReact.SX.Element;
  setContent: (pageNumber: number, content: React.ReactNode) => void;
  resetContent: () => void;
  resetInfinity: () => void;
  endInfinity: () => void;
};
export declare const createPagination: (
  initProps?: Record<string, unknown>
) => CreatePaginationReturn;
export { PaginationBar as Bar };
