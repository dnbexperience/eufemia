/**
 * Web Pagination Component
 */

import { memo, useContext, useRef } from 'react'
import type { HTMLAttributes, JSX, ReactNode, Ref, RefObject } from 'react'
import { clsx } from 'clsx'
import PaginationContext from './PaginationContext'
import PaginationProvider from './PaginationProvider'
import {
  validateDOMAttributes,
  extendExistingPropsWithContext,
  removeUndefinedProps,
} from '../../shared/component-helper'
import { useSpacing } from '../space/SpacingUtils'

import { PaginationIndicator } from './PaginationHelpers'
import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'
import type { PaginationCreateReturn, PaginationProps } from './types'

export * from './types'

const paginationDefaultProps: Partial<PaginationProps> = {
  mode: 'pagination',
  paginationBarLayout: 'vertical',
  useLoadButton: false,
  hideProgressIndicator: false,
  pageElement: undefined,
  fallbackElement: undefined,
  markerElement: undefined,
  indicatorElement: undefined,
  align: 'left',
  startupCount: 1,
  parallelLoadCount: 1,
  placeMarkerBeforeContent: false,
  minWaitTime: 400,
}

export type PaginationComponent = ((
  props: PaginationProps
) => JSX.Element) & {
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

const PaginationInstance = memo(function PaginationInstance(
  ownProps: PaginationProps
) {
  const ctx = useContext(PaginationContext)
  const contentRef = useRef<HTMLDivElement | null>(null)

  const props = extendExistingPropsWithContext(
    ownProps,
    paginationDefaultProps,
    ctx.getTranslation(ownProps).Pagination,
    ctx.Pagination
  )

  const {
    align: _align,
    children: _children,
    className: _className,
    barSpace: _barSpace,
    paginationBarLayout: _paginationBarLayout,

    disabled: _disabled,
    skeleton: _skeleton,
    tagName: _tagName,
    pageCount: _pageCount,
    currentPage: _currentPageProp,
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
    transformNavigationItem: _transformNavigationItem,

    ...attributes
  } = props as Record<string, unknown>

  const { align, children, className, barSpace, paginationBarLayout } =
    props

  // our props
  const { currentPageInternal, items, fallbackElement, indicatorElement } =
    ctx.pagination

  const mainParams = useSpacing(props, {
    className: clsx(
      'dnb-pagination',
      align && `dnb-pagination--${align}`,
      paginationBarLayout &&
        `dnb-pagination--layout-${paginationBarLayout}`,
      className
    ),
    ...attributes,
  })

  // Pagination mode
  if (ctx.pagination.mode === 'pagination') {
    validateDOMAttributes(props, mainParams)

    const content = items.find(
      ({ pageNumber }) => pageNumber === currentPageInternal
    )?.content

    return (
      <div {...mainParams}>
        <PaginationBar contentRef={contentRef} space={barSpace}>
          {children as ReactNode}
        </PaginationBar>
        {items.length > 0 && (
          <PaginationContent ref={contentRef}>
            {content || (
              <PaginationIndicator
                indicatorElement={indicatorElement || fallbackElement}
                isLoadingText={props.isLoadingText}
              />
            )}
          </PaginationContent>
        )}
      </div>
    )
  }

  // InfinityScroller mode
  return <InfinityScroller />
})

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
      <InfinityScroller {...rest}>{children}</InfinityScroller>
    </PaginationProvider>
  )
}

function PaginationContent({
  children,
  ref,
  ...props
}: {
  children?: ReactNode
  ref?: Ref<HTMLDivElement>
} & HTMLAttributes<HTMLDivElement>) {
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
  const store: RefObject<Record<string, unknown> | null> = {
    current: null,
  }
  const rerender: RefObject<
    ((store: RefObject<Record<string, unknown> | null>) => void) | null
  > = { current: null }
  const _setContent: RefObject<
    ((pageNumber: number, content: ReactNode) => void) | null
  > = { current: null }
  const _resetContent: RefObject<(() => void) | null> = {
    current: null,
  }
  const _resetInfinity: RefObject<(() => void) | null> = {
    current: null,
  }
  const _endInfinity: RefObject<(() => void) | null> = {
    current: null,
  }

  const setContent = (pageNumber: number, content: ReactNode) => {
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
    <PaginationWrapper {...(args(props) as PaginationProps)} />
  )

  const InfinityMarker = (props: Record<string, unknown>) => (
    <InfinityMarkerWrapper {...(args(props) as PaginationProps)} />
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
