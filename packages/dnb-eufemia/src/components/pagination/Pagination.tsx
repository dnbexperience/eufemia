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
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import { PaginationIndicator } from './PaginationHelpers'
import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceTypeAll } from '../space/types'
import type { ButtonIconPosition } from '../Button'

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
  | ((...args: any[]) => any)
export type PaginationResetContentHandler =
  | string
  | ((...args: any[]) => any)
export type PaginationResetPaginationHandler =
  | string
  | ((...args: any[]) => any)
export type PaginationEndInfinityHandler =
  | string
  | ((...args: any[]) => any)
export type PaginationPageElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string
export type PaginationFallbackElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string
export type PaginationMarkerElement =
  | Record<string, unknown>
  | React.ReactNode
  | ((...args: any[]) => any)
  | string
export type PaginationIndicatorElement =
  | React.ReactNode
  | ((...args: any[]) => any)
  | string
export type PaginationChildren =
  | React.ReactNode
  | ((...args: any[]) => any)
export type LoadButtonProps =
  | (() => React.ReactNode)
  | {
      text: string
      iconPosition: ButtonIconPosition
    }

export interface PaginationProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'ref' | 'children' | 'onChange' | 'onLoad'
    >,
    SpacingProps {
  startupPage?: PaginationStartupPage
  currentPage?: PaginationCurrentPage
  pageCount?: PaginationPageCount
  startupCount?: PaginationStartupCount
  parallelLoadCount?: PaginationParallelLoadCount
  placeMarkerBeforeContent?: boolean
  minWaitTime?: PaginationMinWaitTime
  disabled?: boolean
  skeleton?: SkeletonShow
  mode?: PaginationMode
  paginationBarLayout?: PaginationLayout
  useLoadButton?: boolean
  items?: PaginationItems
  hideProgressIndicator?: boolean
  setContentHandler?: PaginationSetContentHandler
  resetContentHandler?: PaginationResetContentHandler
  resetPaginationHandler?: PaginationResetPaginationHandler
  endInfinityHandler?: PaginationEndInfinityHandler
  pageElement?: PaginationPageElement
  fallbackElement?: PaginationFallbackElement
  markerElement?: PaginationMarkerElement
  indicatorElement?: PaginationIndicatorElement
  align?: string
  buttonTitle?: string
  prevTitle?: string
  nextTitle?: string
  morePages?: string
  isLoadingText?: string
  loadButton?: LoadButtonProps
  barSpace?: SpaceTypeAll
  className?: string
  children?: PaginationChildren
  onChange?: (...args: any[]) => any
  onStartup?: (...args: any[]) => any
  onLoad?: (...args: any[]) => any
  onEnd?: (...args: any[]) => any
}

export type CreatePaginationReturn = {
  Pagination: (props?: Record<string, unknown>) => React.JSX.Element
  InfinityMarker: (props?: Record<string, unknown>) => React.JSX.Element
  setContent: (pageNumber: number, content: React.ReactNode) => void
  resetContent: () => void
  resetInfinity: () => void
  endInfinity: () => void
}

const paginationDefaultProps = {
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
}

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
    const ctx = this.context as any
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
    } = props as any

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
        ({ pageNumber }) => pageNumber === currentPageInternal
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
  const { children, ...rest } = { ...paginationDefaultProps, ...props }

  return (
    <PaginationProvider
      useMarkerOnly
      tagName="dnb-infinity-marker"
      {...rest}
    >
      <InfinityScroller {...rest}>{children}</InfinityScroller>
    </PaginationProvider>
  )
}

function PaginationContent({ children, ref, ...props }: any) {
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

export const Bar = (props: any) => (
  <Pagination fallbackElement={() => null} {...props} />
)

export const createPagination = (
  initProps: Record<string, unknown> = {}
): CreatePaginationReturn => {
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

  const args = (props: any) => ({
    ...{ ...initProps, ...props },
    store,
    rerender,
    setContentHandler: (fn) => (_setContent.current = fn),
    resetContentHandler: (fn) => (_resetContent.current = fn),
    resetPaginationHandler: (fn) => (_resetInfinity.current = fn),
    endInfinityHandler: (fn) => (_endInfinity.current = fn),
  })

  const Pagination = (props: any) => (
    <PaginationWrapper tagName="dnb-pagination" {...args(props)} />
  )

  const InfinityMarker = (props: any) => (
    <InfinityMarkerWrapper
      tagName={(InfinityMarkerWrapper as any)?.tagName}
      {...args(props)}
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
;(Pagination as any)._supportsSpacingProps = true
