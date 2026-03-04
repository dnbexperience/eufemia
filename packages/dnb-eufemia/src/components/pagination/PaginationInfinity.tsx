/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import {
  warn,
  dispatchCustomElementEvent,
  getClosestParent,
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

export default class InfinityScroller extends React.PureComponent<InfinityScrollerProps> {
  static _supportsSpacingProps = true
  static contextType = PaginationContext
  context!: React.ContextType<typeof PaginationContext>

  static defaultProps = { children: null }

  hideIndicator: boolean
  useLoadButton: boolean
  lastElement: React.RefObject<any>
  callOnUnmount: Array<any>
  _startupTimeout: ReturnType<typeof setTimeout>
  _bufferTimeout: ReturnType<typeof setTimeout>
  callbackBuffer: Array<{
    fn: (params: Record<string, unknown>) => void
    params: Record<string, unknown>
  }>
  _lastCall: number

  constructor(props: any, context: any) {
    super(props)
    this.hideIndicator = context.pagination.hideProgressIndicator
    this.useLoadButton = context.pagination.useLoadButton
    this.lastElement = React.createRef()
    this.callOnUnmount = []
  }

  componentWillUnmount() {
    clearTimeout(this._startupTimeout)
    clearTimeout(this._bufferTimeout)
    this.callOnUnmount.forEach((f) => typeof f === 'function' && f())
  }

  startup = () => {
    const { startupPage, startupCount } = this.context.pagination
    const usedStartupCount = parseFloat(startupCount)

    let newPageNo, skipObserver, callStartupEvent, preventWaitForDelay
    for (let i = 0; i < usedStartupCount; ++i) {
      newPageNo = startupPage + i
      skipObserver = newPageNo < usedStartupCount
      callStartupEvent = i === 0
      preventWaitForDelay = i <= usedStartupCount - 1

      // NB: Looks like we have to do more work here to use a waitBuffer
      this.getNewContent(
        newPageNo,
        {
          position: 'after',
          skipObserver,
        },
        { callStartupEvent, preventWaitForDelay }
      )
    }
  }

  getNewContent = (
    newPageNo: number,
    props: any = {},
    { callStartupEvent = false, preventWaitForDelay = false }: any = {}
  ) => {
    const { pageCountInternal, endInfinity } = this.context.pagination

    // if "pageCount" is set do not load more than that value
    if (newPageNo > pageCountInternal) {
      return endInfinity()
    }

    const exists =
      this.context.pagination.items.findIndex((obj) => {
        return obj.pageNumber === newPageNo
      }) > -1

    if (exists) {
      return // stop here!
    }

    const items = this.context.pagination.prefillItems(newPageNo, props)

    this.context.pagination.setItems(items, () => {
      this.callEventHandler(newPageNo, {
        callStartupEvent,
        preventWaitForDelay,
      })
    })
  }

  waitForReachedTime(
    fn: (params: Record<string, unknown>) => void,
    params: Record<string, unknown>
  ) {
    this.callbackBuffer = this.callbackBuffer || []
    this.callbackBuffer.push({ fn, params })
    this.callBuffer({
      minTime: params.preventWaitForDelay
        ? -1
        : this.context.pagination.minTime,
    })
  }

  callBuffer({ minTime = this.context.pagination.minTime }: any = {}) {
    if (this.callbackBuffer.length === 0) {
      return // stop here
    }

    const diff =
      this._lastCall > 0 ? new Date().getTime() - this._lastCall : 0
    const waitTime = diff < minTime ? minTime : 0

    const nextTick = () => {
      if (this.callbackBuffer.length > 0) {
        this._lastCall = new Date().getTime()
        const { fn, params } = this.callbackBuffer.shift()
        fn(params)
        this.callBuffer({
          minTime: params.preventWaitForDelay ? -1 : minTime,
        })
      }
    }

    if (minTime > 0) {
      clearTimeout(this._bufferTimeout)
      this._bufferTimeout = setTimeout(nextTick, waitTime)
    } else {
      nextTick()
    }
  }

  callEventHandler(
    pageNumber: number,
    {
      callStartupEvent = false,
      preventWaitForDelay = false,
      callOnEnd = false,
      onDispatch = null,
    }: any = {}
  ) {
    this.waitForReachedTime(
      ({ pageNumber, callStartupEvent }: Record<string, unknown>) => {
        const context = this.context.pagination
        const createEvent = (eventName) => {
          if (isNaN(pageNumber as number)) {
            pageNumber = 1
          }
          const ret = dispatchCustomElementEvent(context, eventName, {
            pageNumber,
            ...context,
          })

          if (typeof onDispatch === 'function') {
            onDispatch()
          }

          if (typeof ret === 'function') {
            this.callOnUnmount.push(ret)
          }
        }

        if (callOnEnd) {
          createEvent('onEnd')
        } else {
          if (callStartupEvent) {
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

  handleInfinityMarker() {
    const { children } = this.props

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
    } = this.context.pagination

    const Marker = () => (
      <InteractionMarker
        pageNumber={upperPage}
        markerElement={markerElement || fallbackElement}
        onVisible={(pageNumber) => {
          let newPageNo
          // load several pages at once
          for (let i = 0; i < parallelLoadCount; ++i) {
            newPageNo = pageNumber + 1 + i
            // wait on updating our own state, so we can show the indicator (pressedElement) until we get new children back
            this.context.pagination.onPageUpdate(() => {
              this.context.pagination.setState({
                upperPage: newPageNo,
                skipObserver: i + 1 < parallelLoadCount,
              })
            })
            this.callEventHandler(newPageNo)
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
          this.context.pagination.onPageUpdate(() => {
            this.context.pagination.setState({
              lowerPage: newPageNo,
            })
          })
          this.callEventHandler(newPageNo)
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
          !this.hideIndicator &&
          (typeof pageCountInternal === 'undefined' ||
            upperPage < pageCountInternal) && (
            <PaginationIndicator
              indicatorElement={indicatorElement || fallbackElement}
            />
          )}
      </>
    )
  }

  render() {
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
    } = this.context.pagination

    // invoke startup if needed
    if (!(items && items.length > 0)) {
      clearTimeout(this._startupTimeout)
      this._startupTimeout = setTimeout(this.startup, 1) // call startup()
      return null // stop here
    }

    if (this.context.pagination.useMarkerOnly) {
      return this.handleInfinityMarker()
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
        },
        idx
      ) => {
        const isLastItem = idx === items.length - 1

        // decide to whether use the default Element, or use the scrollTo element
        const Elem = (hasContent && ScrollElement) || Element
        const isFragment = Elem === React.Fragment

        // render the marker before
        const marker = hasContent &&
          !this.useLoadButton &&
          !skipObserver &&
          !hasEndedInfinity &&
          (typeof pageCountInternal === 'undefined' ||
            pageNumber <= pageCountInternal) && (
            <InteractionMarker
              pageNumber={pageNumber}
              markerElement={markerElement || fallbackElement}
              onVisible={(pageNumber) => {
                let newPageNo
                // load several pages at once
                for (let i = 0; i < parallelLoadCount; ++i) {
                  newPageNo = pageNumber + 1 + i
                  this.getNewContent(newPageNo, {
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
          !this.hideIndicator

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
                    this.getNewContent(pageNumber - 1, {
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
              this.useLoadButton &&
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
                    this.getNewContent(pageNumber + 1, {
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
}

class InteractionMarker extends React.PureComponent<any, any> {
  static defaultProps = {
    markerElement: null,
  }
  state = { isConnected: false }

  _ref: React.RefObject<any>
  intersectionObserver: IntersectionObserver | null
  _isMounted: boolean
  _readyTimeout: ReturnType<typeof setTimeout>

  constructor(props: any) {
    super(props)

    if (typeof props.markerElement === 'function') {
      warn(
        'Pagination: Please use a string or React element e.g. markerElement="tr"'
      )
    }

    this._ref = React.createRef<HTMLElement>()

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        const [{ isIntersecting }] = entries
        if (isIntersecting) {
          this.callReady()
        }
      })
    } else {
      warn('Pagination is missing IntersectionObserver supported!')
    }
  }

  componentDidMount() {
    if (this._ref.current) {
      this._isMounted = true
      this.intersectionObserver?.observe(this._ref.current)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    if (this.intersectionObserver) {
      clearTimeout(this._readyTimeout)
      this.intersectionObserver.disconnect()
    }
  }

  callReady = () => {
    this.intersectionObserver?.disconnect()
    this.intersectionObserver = null
    clearTimeout(this._readyTimeout)
    this._readyTimeout = setTimeout(() => {
      if (this._isMounted) {
        this.setState({ isConnected: true })
      }
      this.props.onVisible(this.props.pageNumber)
    }, 1) // because of re-render loop
  }

  getContentHeight() {
    let height = 0

    try {
      const sibling = getClosestParent('dnb-table', this._ref.current)
      height = parseFloat(
        window.getComputedStyle(sibling.querySelector('tbody')).height
      )
    } catch (e) {
      //
    }

    return height
  }

  render() {
    const { markerElement } = this.props

    if (this.state.isConnected || !this.intersectionObserver) {
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
          ref={this._ref}
        >
          {/* {this.props.pageNumber} */}
        </ElementChild>
      </Element>
    )
  }
}

export function InfinityLoadButton({
  element = 'div',
  pressedElement = null,
  icon = 'arrow_down',
  text = null,
  iconPosition = 'left',
  onClick,
}: {
  element?: any
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
  pageElement?: any
  [key: string]: any
}) {
  const elementRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const elem = elementRef.current
    if (elem && typeof elem.scrollIntoView === 'function') {
      elem.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [])

  const Element = preparePageElement(pageElement || React.Fragment)

  // If Element is React.Fragment, we need to wrap it in a div to attach the ref
  if (Element === React.Fragment) {
    return <div ref={elementRef} {...props} />
  }

  return <Element ref={elementRef} {...props} />
}

withComponentMarkers(InfinityScroller, { _supportsSpacingProps: true })
