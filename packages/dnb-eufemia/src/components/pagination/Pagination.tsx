/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import PaginationContext from './PaginationContext'
import PaginationProvider from './PaginationProvider'
import {
  validateDOMAttributes,
  extendPropsWithContextInClassComponent,
  removeUndefinedProps,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import { PaginationIndicator } from './PaginationHelpers'
import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceTypeAll } from '../space/types'
import type { ButtonIconPosition } from '../Button'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'

export type PaginationStartupPage = string | number
export type PaginationCurrentPage = string | number
export type PaginationPageCount = string | number
export type PaginationStartupCount = string | number
export type PaginationParallelLoadCount = string | number
export type PaginationMinWaitTime = string | number
export type PaginationMode = 'pagination' | 'infinity'
export type PaginationLayout = 'vertical' | 'horizontal'
export type PaginationItems = string | any[]
export type PaginationSetContentHandler =
  | string
  | ((fn: (pageNumber: number, content: React.ReactNode) => void) => void)
export type PaginationResetContentHandler =
  | string
  | ((fn: () => void) => void)
export type PaginationResetPaginationHandler =
  | string
  | ((fn: () => void) => void)
export type PaginationEndInfinityHandler =
  | string
  | ((fn: () => void) => void)
export type PaginationPageElement =
  | Record<string, unknown>
  | React.ReactNode
  | React.ComponentType
  | string
export type PaginationFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | React.ComponentType
  | string
export type PaginationMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | React.ComponentType
  | string
export type PaginationIndicatorElement =
  | React.ReactNode
  | React.ComponentType
  | string
export type PaginationChildrenArgs = {
  pageNumber: number
  setContent: (...args: unknown[]) => void
  endInfinity: () => void
  [key: string]: unknown
}
export type PaginationChildren =
  | React.ReactNode
  | ((props: PaginationChildrenArgs) => unknown)
export type PaginationLoadButtonProps =
  | (() => React.ReactNode)
  | {
      /**
       * Used during infinity mode. If `useLoadButton` is set to true, then a button is show on the bottom. If the `startupPage` is higher than 1. Defaults to `Vis mer innhold`.
       */
      text: string
      /**
       * Used during infinity mode. Sets the icon position on the `useLoadButton`. Default: `left`.
       */
      iconPosition: ButtonIconPosition
    }

export type PaginationEvent = {
  pageNumber: number
  setContent: (...args: unknown[]) => void
  endInfinity: () => void
  event?: React.SyntheticEvent
  [key: string]: unknown
}

export type PaginationProps = {
  /**
   * The page shown in the very beginning. If `currentPage` is set, then it may not make too much sense to set this as well.
   */
  startupPage?: PaginationStartupPage
  /**
   * The page shown at the moment the component renders. Defaults to `1`.
   */
  currentPage?: PaginationCurrentPage
  /**
   * The total pages count. Defaults to `1`.
   */
  pageCount?: PaginationPageCount
  /**
   * Defines how many `infinity` pages should be loaded / shown on the first render. Defaults to `1`.
   */
  startupCount?: PaginationStartupCount
  /**
   * Defines how many `infinity` pages should be loaded / shown once the user scrolls down. Defaults to `1`.
   */
  parallelLoadCount?: PaginationParallelLoadCount
  /**
   * if set to `true`, the infinity marker will be placed before the content (on top off). This could potentially have negative side effects. But it depends really on the content if this would make more sense to use instead. Defaults to `false`.
   */
  placeMarkerBeforeContent?: boolean
  /**
   * The minimum time to wait, if the infinity scroll was invoked under that time threshold. This prevents not intentional infinity scroll loop calls. Defaults to `400` milliseconds.
   */
  minWaitTime?: PaginationMinWaitTime
  /**
   * If set to `true`, all pagination bar buttons are disabled.
   */
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  /**
   * If set to `infinity`, then the pagination bar will be now shown and but infinity scrolling will do the content presentation. For more information, check out the [Infinity Scroller](/uilib/components/pagination/infinity-scroller). Defaults to `pagination`.
   */
  mode?: PaginationMode
  /**
   * The layout of the pagination bar. Defaults to `vertical`.
   */
  paginationBarLayout?: PaginationLayout
  /**
   * If set to `true` it will disable the automated infinity scrolling, but shows a load more button at the of the content instead.
   */
  useLoadButton?: boolean
  items?: PaginationItems
  /**
   * If set to `true` no indicator will be shown.
   */
  hideProgressIndicator?: boolean
  /**
   * Callback function to get the `setContent` handler from the current pagination instance. e.g. `setContentHandler={fn => (...)}`. Use this handler to insert content during infinity mode.
   */
  setContentHandler?: PaginationSetContentHandler
  /**
   * Callback function to get the `resetContent` handler from the current pagination instance. e.g. `resetContentHandler={fn => (...)}`. Use this handler to reset all the content. You can set it to `true`, to programmatically reset the content.
   */
  resetContentHandler?: PaginationResetContentHandler
  /**
   * Callback function to get the `resetInfinity` handler from the current pagination instance. e.g. `resetPaginationHandler={fn => (...)}`. Use this handler to reset all the internal states. You can set it to `true`, to programmatically reset the states.
   */
  resetPaginationHandler?: PaginationResetPaginationHandler
  /**
   * Callback function to get the `endInfinity` handler from the current pagination instance. e.g. `endInfinityHandler={fn => (...)}`. Use this handler to end the infinity scrolling procedure, in case the `pageCount` is unknown.
   */
  endInfinityHandler?: PaginationEndInfinityHandler
  /**
   * By default a `<div>` is used. Set it to any element you have to use. Adds also a class: `dnb-pagination__page` shown.
   */
  pageElement?: PaginationPageElement
  /**
   * (infinity mode) is used by the _indicator_, _load more_ bar as well as by the marker. Defaults to a `div`.
   */
  fallbackElement?: PaginationFallbackElement
  /**
   * (infinity mode) is used by the internal marker. Falls back to `fallbackElement` if not defined.
   */
  markerElement?: PaginationMarkerElement
  /**
   * (infinity mode) is used by the _indicator_. Falls back to `fallbackElement` if not defined.
   */
  indicatorElement?: PaginationIndicatorElement
  /**
   * Define the alignment of the pagination button bar. Can be `center`, `left` or `right`. Defaults to `left`.
   */
  align?: string
  /**
   * The title used in every button shown in the bar. Defaults to `Side %s`.
   */
  buttonTitle?: string
  /**
   * The title used in the previous page button. Defaults to `Forrige side`.
   */
  prevTitle?: string
  /**
   * The title used in the next page button. Defaults to `Neste side`.
   */
  nextTitle?: string
  /**
   * The title used in the dots. Relevant for screen readers. Defaults to `%s flere sider`.
   */
  morePages?: string
  /**
   * Shown until new content is inserted in to the page. Defaults to `Laster nytt innhold`.
   */
  isLoadingText?: string
  /**
   * Used to set load button text and icon alignment. Accepts a function returning a ReactNode too, so you can replace the button with your own component.
   */
  loadButton?: PaginationLoadButtonProps
  /**
   * Used to set spacing for the pagination bar. Has to be an object with either: `top`, `right`, `bottom` or `left`. Use spacing values like: `small`, `1rem`, `1` or , `16px`. See property [space](/uilib/layout/space/properties).
   */
  barSpace?: SpaceTypeAll
  className?: string
  /**
   * The given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children?: PaginationChildren
  onChange?: (event: PaginationEvent) => void
  onStartup?: (event: PaginationEvent) => void
  onLoad?: (event: PaginationEvent) => void
  onEnd?: (event: PaginationEvent) => void
} & Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'children' | 'onChange' | 'onLoad'
> &
  SpacingProps

export type PaginationCreateReturn = {
  Pagination: (props?: Record<string, unknown>) => React.JSX.Element
  InfinityMarker: (props?: Record<string, unknown>) => React.JSX.Element
  setContent: (pageNumber: number, content: React.ReactNode) => void
  resetContent: () => void
  resetInfinity: () => void
  endInfinity: () => void
}

const paginationDefaultProps: Partial<PaginationProps> = {
  startupPage: null,
  currentPage: null,
  pageCount: null,
  mode: 'pagination',
  paginationBarLayout: 'vertical',
  useLoadButton: false,
  items: null,
  hideProgressIndicator: false,
  setContentHandler: null,
  resetContentHandler: null,
  pageElement: undefined,
  fallbackElement: undefined,
  markerElement: undefined,
  indicatorElement: undefined,
  align: 'left',
  buttonTitle: null,
  prevTitle: null,
  nextTitle: null,
  morePages: null,
  isLoadingText: null,
  loadButton: null,
  barSpace: null,
  startupCount: 1,
  parallelLoadCount: 1,
  placeMarkerBeforeContent: false,
  minWaitTime: 400,
  disabled: null,
  skeleton: null,

  className: null,
  children: null,

  onChange: null,
  onStartup: null,
  onLoad: null,
  onEnd: null,
}

export type PaginationComponent = ((
  props: PaginationProps
) => React.JSX.Element) & {
  Bar: typeof PaginationBar
  Content: typeof PaginationContent
} & ComponentMarkers

function PaginationFunc(props: PaginationProps) {
  const mergedProps = {
    ...paginationDefaultProps,
    ...props,
  } as PaginationProps

  return (
    <PaginationProvider
      tagName="dnb-pagination"
      internalContent={mergedProps.children}
      {...mergedProps}
    >
      <PaginationInstance {...mergedProps} />
    </PaginationProvider>
  )
}

const Pagination = PaginationFunc as PaginationComponent

export default Pagination

class PaginationInstance extends React.PureComponent<PaginationProps> {
  static defaultProps = paginationDefaultProps
  static contextType = PaginationContext
  context!: React.ContextType<typeof PaginationContext>

  _contentRef: React.RefObject<HTMLDivElement | null>

  constructor(props: PaginationProps) {
    super(props)
    this._contentRef = React.createRef()
  }

  render() {
    // use only the props from context, who are available here anyway
    const ctx = this.context as Record<string, any>
    const props = extendPropsWithContextInClassComponent(
      this.props,
      paginationDefaultProps,
      ctx.getTranslation(this.props).Pagination,
      ctx.Pagination
    )

    const {
      align,
      children,
      className,
      barSpace,
      paginationBarLayout,

      disabled: _disabled,
      skeleton: _skeleton,
      tagName: _tagName,
      pageCount: _page_count,
      currentPage: _current_page,
      startupPage: _startupPage,
      mode: _mode,
      hideProgressIndicator: _hideProgressIndicator,
      useLoadButton: _useLoadButton,
      currentPageInternal: _currentPage,
      markerElement: _markerElement,
      fallbackElement: _fallbackElement,
      setContentHandler: _setContentHandler,
      resetContentHandler: _resetContentHandler,
      resetPaginationHandler: _resetPaginationHandler,
      endInfinityHandler: _endInfinityHandler,
      minWaitTime: _minWaitTime,
      pageElement: _pageElement,
      startupCount: _startupCount,
      parallelLoadCount: _parallelLoadCount,
      buttonTitle: _buttonTitle,
      prevTitle: _prevTitle,
      nextTitle: _nextTitle,
      morePages: _morePages,
      isLoadingText: _isLoadingText,
      loadButton: _loadButton,
      indicatorElement: _indicatorElement,
      placeMarkerBeforeContent: _placeMarkerBeforeContent,

      ...attributes
    } = props as Record<string, any>

    // our props
    const {
      currentPageInternal,
      items,
      fallbackElement,
      indicatorElement,
    } = this.context.pagination

    // Pagination mode
    if (this.context.pagination.mode === 'pagination') {
      const mainParams = {
        className: clsx(
          'dnb-pagination',
          align && `dnb-pagination--${align}`,
          paginationBarLayout &&
            `dnb-pagination--layout-${paginationBarLayout}`,
          createSpacingClasses(props),
          className
        ),
        ...attributes,
      }

      validateDOMAttributes(props, mainParams)

      const content = items.find(
        ({ pageNumber }: { pageNumber: number }) => pageNumber === currentPageInternal
      )?.content

      return (
        <div {...mainParams}>
          <PaginationBar contentRef={this._contentRef} space={barSpace}>
            {children}
          </PaginationBar>
          {items.length > 0 && (
            <PaginationContent ref={this._contentRef}>
              {content || (
                <PaginationIndicator
                  indicatorElement={indicatorElement || fallbackElement}
                />
              )}
            </PaginationContent>
          )}
        </div>
      )
    }

    // InfinityScroller mode
    return <InfinityScroller />
  }
}

export function InfinityMarker(props: PaginationProps) {
  const { children, ...rest } = {
    ...paginationDefaultProps,
    // Strip undefined values so they fall through to defaults,
    // preserving the legacy React defaultProps behavior.
    ...removeUndefinedProps({ ...props }),
  }

  return (
    <PaginationProvider
      useMarkerOnly
      tagName="dnb-infinity-marker"
      {...rest}
    >
      <InfinityScroller {...rest}>{children as React.ReactNode}</InfinityScroller>
    </PaginationProvider>
  )
}

function PaginationContent({
  children,
  ref,
  ...props
}: {
  children?: React.ReactNode
  ref?: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className="dnb-pagination__content dnb-no-focus"
      tabIndex={-1}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
}

// NB: This is not ready yet
Pagination.Bar = PaginationBar
Pagination.Content = PaginationContent

const PaginationWrapper = PaginationFunc
const InfinityMarkerWrapper = InfinityMarker

export const Bar = (props: PaginationProps) => (
  <Pagination fallbackElement={() => null} {...props} />
)

export const createPagination = (
  initProps: Record<string, unknown> = {}
): PaginationCreateReturn => {
  const store = React.createRef<any>()
  const rerender = React.createRef<any>()
  const _setContent = React.createRef<any>()
  const _resetContent = React.createRef<any>()
  const _resetInfinity = React.createRef<any>()
  const _endInfinity = React.createRef<any>()

  const setContent = (pageNumber: number, content: React.ReactNode) => {
    if (pageNumber > 0) {
      store.current = { ...store.current, ...{ pageNumber, content } }
      rerender.current && rerender.current(store)
    }
  }
  const resetContent = () => {
    _resetContent.current && _resetContent.current()
  }
  const resetInfinity = () => {
    _resetInfinity.current && _resetInfinity.current()
  }
  const endInfinity = () => {
    _endInfinity.current && _endInfinity.current()
  }

  const args = (props: Record<string, unknown>) => ({
    ...{ ...initProps, ...props },
    store,
    rerender,
    setContentHandler: (fn: typeof _setContent.current) =>
      (_setContent.current = fn),
    resetContentHandler: (fn: typeof _resetContent.current) =>
      (_resetContent.current = fn),
    resetPaginationHandler: (fn: typeof _resetInfinity.current) =>
      (_resetInfinity.current = fn),
    endInfinityHandler: (fn: typeof _endInfinity.current) =>
      (_endInfinity.current = fn),
  })

  const Pagination = (props: Record<string, unknown>) => (
    <PaginationWrapper
      tagName="dnb-pagination"
      {...(args(props) as any)}
    />
  )

  const InfinityMarker = (props: Record<string, unknown>) => (
    <InfinityMarkerWrapper
      tagName="dnb-infinity-marker"
      {...(args(props) as any)}
    />
  )

  return {
    Pagination,
    InfinityMarker,
    setContent,
    resetContent,
    resetInfinity,
    endInfinity,
  }
}
withComponentMarkers(Pagination, { _supportsSpacingProps: true })
