/**
 * Web Pagination Component
 */

import React, { useContext, useEffect, useRef, useState } from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import {
  warn,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context from '../../shared/Context'
import Button from '../button/Button'
import {
  preparePageElement,
  isTrElement,
  PaginationIndicator,
} from './PaginationHelpers'
import PaginationContext from './PaginationContext'

export type InfinityScrollerProps = {
  children?: React.ReactNode
}

type CallbackBufferEntry = {
  fn: (params: Record<string, unknown>) => void
  params: Record<string, unknown>
}

type EventHandlerOptions = {
  callStartupEvent?: boolean
  preventWaitForDelay?: boolean
  callOnEnd?: boolean
  onDispatch?: (() => void) | null
}

type GetNewContentProps = {
  position?: 'before' | 'after'
  skipObserver?: boolean
  event?: React.SyntheticEvent
  ScrollElement?: React.ComponentType<Record<string, unknown>>
  [key: string]: unknown
}

export default function InfinityScroller({
  children = null,
}: InfinityScrollerProps) {
  const { pagination } = useContext(PaginationContext)

  const hideIndicator = pagination.hideProgressIndicator
  const useLoadButton = pagination.useLoadButton

  const paginationRef = useRef(pagination)
  paginationRef.current = pagination

  const callOnUnmountRef = useRef<Array<() => void>>([])
  const startupTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const bufferTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)
  const callbackBufferRef = useRef<CallbackBufferEntry[]>([])
  const lastCallRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      clearTimeout(startupTimeoutRef.current)
      clearTimeout(bufferTimeoutRef.current)
      callOnUnmountRef.current.forEach(
        (f) => typeof f === 'function' && f()
      )
    }
  }, [])

  const callBuffer = (minTime: number = paginationRef.current.minTime) => {
    if (callbackBufferRef.current.length === 0) {
      return // stop here
    }

    const diff =
      lastCallRef.current > 0
        ? new Date().getTime() - lastCallRef.current
        : 0
    const waitTime = diff < minTime ? minTime : 0

    const nextTick = () => {
      if (callbackBufferRef.current.length > 0) {
        lastCallRef.current = new Date().getTime()
        const { fn, params } = callbackBufferRef.current.shift()
        fn(params)
        callBuffer(params.preventWaitForDelay ? -1 : minTime)
      }
    }

    if (minTime > 0) {
      clearTimeout(bufferTimeoutRef.current)
      bufferTimeoutRef.current = setTimeout(nextTick, waitTime)
    } else {
      nextTick()
    }
  }

  const waitForReachedTime = (
    fn: (params: Record<string, unknown>) => void,
    params: Record<string, unknown>
  ) => {
    callbackBufferRef.current.push({ fn, params })
    callBuffer(
      params.preventWaitForDelay ? -1 : paginationRef.current.minTime
    )
  }

  const callEventHandler = (
    pageNumber: number,
    {
      callStartupEvent = false,
      preventWaitForDelay = false,
      callOnEnd = false,
      onDispatch = null,
    }: EventHandlerOptions = {}
  ) => {
    waitForReachedTime(
      ({
        pageNumber: pn,
        callStartupEvent: isStartup,
      }: Record<string, unknown>) => {
        const ctx = paginationRef.current
        let resolvedPageNumber = pn as number

        const createEvent = (eventName: string) => {
          if (isNaN(resolvedPageNumber)) {
            resolvedPageNumber = 1
          }
          const ret = dispatchCustomElementEvent(ctx, eventName, {
            pageNumber: resolvedPageNumber,
            ...ctx,
          })

          if (typeof onDispatch === 'function') {
            onDispatch()
          }

          if (typeof ret === 'function') {
            callOnUnmountRef.current.push(ret)
          }
        }

        if (callOnEnd) {
          createEvent('onEnd')
        } else {
          if (isStartup) {
            createEvent('onStartup')
          } else {
            createEvent('onChange')
          }

          createEvent('onLoad')
        }
      },
      { pageNumber, callStartupEvent, preventWaitForDelay }
    )
  }

  const getNewContent = (
    newPageNo: number,
    props: GetNewContentProps = {},
    {
      callStartupEvent = false,
      preventWaitForDelay = false,
    }: Pick<
      EventHandlerOptions,
      'callStartupEvent' | 'preventWaitForDelay'
    > = {}
  ) => {
    const { pageCountInternal, endInfinity } = paginationRef.current

    // if "pageCount" is set do not load more than that value
    if (newPageNo > pageCountInternal) {
      return endInfinity()
    }

    const exists =
      paginationRef.current.items.findIndex(
        (obj: { pageNumber: number }) => obj.pageNumber === newPageNo
      ) > -1

    if (exists) {
      return // stop here
    }

    const items = paginationRef.current.prefillItems(newPageNo, props)

    paginationRef.current.setItems(items, () => {
      callEventHandler(newPageNo, {
        callStartupEvent,
        preventWaitForDelay,
      })
    })
  }

  const startup = () => {
    const { startupPage, startupCount } = paginationRef.current
    const usedStartupCount = parseFloat(startupCount)

    for (let i = 0; i < usedStartupCount; ++i) {
      const newPageNo = startupPage + i
      const skipObserver = newPageNo < usedStartupCount
      const callStartupEvent = i === 0
      const preventWaitForDelay = i <= usedStartupCount - 1

      // NB: Looks like we have to do more work here to use a waitBuffer
      getNewContent(
        newPageNo,
        {
          position: 'after',
          skipObserver,
        },
        { callStartupEvent, preventWaitForDelay }
      )
    }
  }

  const handleInfinityMarker = () => {
    const {
      // our states
      lowerPage,
      upperPage,
      pageCountInternal,
      hasEndedInfinity,
      parallelLoadCount,

      // our props
      currentPage,
      fallbackElement,
      markerElement,
      indicatorElement,
    } = paginationRef.current

    const Marker = () => (
      <InteractionMarker
        pageNumber={upperPage}
        markerElement={markerElement || fallbackElement}
        onVisible={(pageNumber: number) => {
          let newPageNo: number
          // load several pages at once
          for (let i = 0; i < parallelLoadCount; ++i) {
            newPageNo = pageNumber + 1 + i
            // wait on updating our own state, so we can show the indicator (pressedElement) until we get new children back
            paginationRef.current.onPageUpdate(() => {
              paginationRef.current.setState({
                upperPage: newPageNo,
                skipObserver: i + 1 < parallelLoadCount,
              })
            })
            callEventHandler(newPageNo)
          }
        }}
      />
    )

    const LoadButton = () => (
      <InfinityLoadButton
        icon="arrow_up"
        element={fallbackElement}
        pressedElement={
          <PaginationIndicator
            indicatorElement={indicatorElement || fallbackElement}
          />
        }
        onClick={() => {
          const newPageNo = lowerPage - 1
          // wait on updating our own state, so we can show the indicator (pressedElement) until we get new children back
          paginationRef.current.onPageUpdate(() => {
            paginationRef.current.setState({
              lowerPage: newPageNo,
            })
          })
          callEventHandler(newPageNo)
        }}
      />
    )

    return (
      <>
        {parseFloat(currentPage) > 0 && lowerPage > 1 && <LoadButton />}

        {children}

        {!hasEndedInfinity &&
          parseFloat(currentPage) > 0 &&
          (typeof pageCountInternal === 'undefined' ||
            upperPage < pageCountInternal) && <Marker />}

        {!hasEndedInfinity &&
          !hideIndicator &&
          (typeof pageCountInternal === 'undefined' ||
            upperPage < pageCountInternal) && (
            <PaginationIndicator
              indicatorElement={indicatorElement || fallbackElement}
            />
          )}
      </>
    )
  }

  const {
    // our states
    items,
    pageCountInternal,
    startupPage,
    hasEndedInfinity,
    parallelLoadCount,
    placeMakerBeforeContent,

    // our props
    pageElement,
    fallbackElement,
    markerElement,
    indicatorElement,
    loadButton,
  } = pagination

  // invoke startup if needed
  if (!(items && items.length > 0)) {
    clearTimeout(startupTimeoutRef.current)
    startupTimeoutRef.current = setTimeout(startup, 1) // call startup()
    return null // stop here
  }

  if (pagination.useMarkerOnly) {
    return handleInfinityMarker()
  }

  // make sure we handle Table markup correctly
  const Element = preparePageElement(pageElement || React.Fragment)

  return items.map(
    (
      {
        pageNumber,
        hasContent,
        content,
        ref,
        skipObserver,
        ScrollElement,
      }: {
        pageNumber: number
        hasContent: boolean
        content: React.ReactNode
        ref: React.Ref<HTMLElement>
        skipObserver: boolean
        ScrollElement: React.ComponentType<Record<string, unknown>>
      },
      idx: number
    ) => {
      const isLastItem = idx === items.length - 1

      // decide to whether use the default Element, or use the scrollTo element
      const Elem = (hasContent && ScrollElement) || Element
      const isFragment = Elem === React.Fragment

      // render the marker before
      const marker = hasContent &&
        !useLoadButton &&
        !skipObserver &&
        !hasEndedInfinity &&
        (typeof pageCountInternal === 'undefined' ||
          pageNumber <= pageCountInternal) && (
          <InteractionMarker
            pageNumber={pageNumber}
            markerElement={markerElement || fallbackElement}
            onVisible={(pageNumber: number) => {
              let newPageNo: number
              // load several pages at once
              for (let i = 0; i < parallelLoadCount; ++i) {
                newPageNo = pageNumber + 1 + i
                getNewContent(newPageNo, {
                  position: 'after',
                  skipObserver: i + 1 < parallelLoadCount,
                })
              }
            }}
          />
        )

      const showIndicator =
        (parallelLoadCount > 1 && idx > 0 ? isLastItem : true) &&
        !hasContent &&
        !hideIndicator

      return (
        <Elem key={pageNumber} {...(!isFragment && { ref })}>
          {hasContent &&
            startupPage > 1 &&
            pageNumber > 1 &&
            pageNumber <= startupPage && (
              <InfinityLoadButton
                element={
                  typeof loadButton === 'function'
                    ? loadButton
                    : fallbackElement
                }
                icon="arrow_up"
                text={loadButton?.text}
                iconPosition={loadButton?.iconPosition}
                onClick={(event) =>
                  getNewContent(pageNumber - 1, {
                    position: 'before',
                    skipObserver: true,
                    event,
                  })
                }
              />
            )}

          {placeMakerBeforeContent && marker}
          {content}
          {!placeMakerBeforeContent && marker}

          {showIndicator && (
            <PaginationIndicator
              indicatorElement={indicatorElement || fallbackElement}
            />
          )}

          {hasContent &&
            useLoadButton &&
            isLastItem &&
            (typeof pageCountInternal === 'undefined' ||
              pageNumber < pageCountInternal) && (
              <InfinityLoadButton
                element={
                  typeof loadButton === 'function'
                    ? loadButton
                    : fallbackElement
                }
                text={loadButton?.text}
                iconPosition={loadButton?.iconPosition}
                icon="arrow_down"
                onClick={(event) =>
                  getNewContent(pageNumber + 1, {
                    position: 'after',
                    skipObserver: true,
                    ScrollElement: (props) =>
                      hasContent && (
                        <ScrollToElement
                          pageElement={pageElement}
                          {...props}
                        />
                      ),
                    event,
                  })
                }
              />
            )}
        </Elem>
      )
    }
  )
}

type InteractionMarkerProps = {
  pageNumber: number
  markerElement?: React.ReactNode | string | null
  onVisible: (pageNumber: number) => void
}

function InteractionMarker({
  pageNumber,
  markerElement = null,
  onVisible,
}: InteractionMarkerProps) {
  const [isConnected, setIsConnected] = useState(false)
  const markerRef = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const hasObserverSupport = useRef(
    typeof IntersectionObserver !== 'undefined'
  )
  const isMountedRef = useRef(false)
  const readyTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (typeof markerElement === 'function') {
      warn(
        'Pagination: Please use a string or React element e.g. markerElement="tr"'
      )
    }

    if (hasObserverSupport.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        const [{ isIntersecting }] = entries
        if (isIntersecting) {
          callReady()
        }
      })
    } else {
      warn('Pagination is missing IntersectionObserver supported!')
    }

    isMountedRef.current = true

    if (markerRef.current) {
      observerRef.current?.observe(markerRef.current)
    }

    return () => {
      isMountedRef.current = false
      clearTimeout(readyTimeoutRef.current)
      observerRef.current?.disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const callReady = () => {
    observerRef.current?.disconnect()
    observerRef.current = null
    clearTimeout(readyTimeoutRef.current)
    readyTimeoutRef.current = setTimeout(() => {
      if (isMountedRef.current) {
        setIsConnected(true)
      }
      onVisible(pageNumber)
    }, 1) // because of re-render loop
  }

  if (isConnected || !hasObserverSupport.current) {
    return null
  }

  // NB: make sure we don't actually use the marker element,
  // because it looks like React as troubles regarding handling ref during a re-render?
  const Element =
    markerElement && isTrElement(markerElement) ? 'tr' : 'div'
  const ElementChild =
    markerElement && isTrElement(markerElement) ? 'td' : 'div'

  return (
    <Element className="dnb-pagination__marker dnb-table--ignore">
      <ElementChild
        className="dnb-pagination__marker__inner"
        ref={markerRef as React.RefObject<never>}
      />
    </Element>
  )
}

export function InfinityLoadButton({
  element = 'div',
  pressedElement = null,
  icon = 'arrow_down',
  text = null,
  iconPosition = 'left',
  onClick,
}: {
  element?: React.ElementType
  pressedElement?: React.ReactNode
  icon?: string
  text?: string | null
  iconPosition?: 'left' | 'right'
  onClick?: (e: React.MouseEvent) => void
}) {
  const context = React.useContext(Context)
  const [isPressed, setIsPressed] = React.useState(false)

  const handleClick = (e: React.MouseEvent) => {
    setIsPressed(true)
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  const Element = element
  const ElementChild = isTrElement(Element) ? 'td' : 'div'

  if (isPressed) {
    return <>{pressedElement}</>
  }

  return (
    <Element>
      <ElementChild className="dnb-pagination__loadbar">
        <Button
          size="medium"
          icon={icon}
          iconPosition={iconPosition}
          text={text || context.translation.Pagination.loadButtonText}
          variant="secondary"
          onClick={handleClick}
        />
      </ElementChild>
    </Element>
  )
}

function ScrollToElement({
  pageElement = null,
  ...props
}: {
  pageElement?: React.ElementType | null
  [key: string]: unknown
}) {
  const elementRef = React.useRef<HTMLDivElement>(null)

  useMountEffect(() => {
    const elem = elementRef.current
    if (elem && typeof elem.scrollIntoView === 'function') {
      elem.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  })

  const Element = preparePageElement(pageElement || React.Fragment)

  // If Element is React.Fragment, we need to wrap it in a div to attach the ref
  if (Element === React.Fragment) {
    return <div ref={elementRef} {...props} />
  }

  return <Element ref={elementRef} {...props} />
}

withComponentMarkers(InfinityScroller, { _supportsSpacingProps: true })
