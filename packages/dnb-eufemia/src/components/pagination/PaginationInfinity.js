/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  warn,
  isTrue,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import Button from '../button/Button'
import {
  preparePageElement,
  isTrElement,
  PaginationIndicator,
} from './PaginationHelpers'
import PaginationContext from './PaginationContext'

export default class InfinityScroller extends React.PureComponent {
  static contextType = PaginationContext
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }
  static defaultProps = { children: null }

  constructor(props, context) {
    super(props)
    this.hideIndicator = isTrue(context.pagination.hideProgressIndicator)
    this.useLoadButton = isTrue(context.pagination.useLoadButton)
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
    newPageNo,
    props = {},
    { callStartupEvent = false, preventWaitForDelay = false } = {}
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

  waitForReachedTime(fn, params) {
    this.callbackBuffer = this.callbackBuffer || []
    this.callbackBuffer.push({ fn, params })
    this.callBuffer({
      minTime: params.preventWaitForDelay
        ? -1
        : this.context.pagination.minTime,
    })
  }

  callBuffer({ minTime = this.context.pagination.minTime } = {}) {
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
    pageNumber,
    {
      callStartupEvent = false,
      preventWaitForDelay = false,
      callOnEnd = false,
      onDispatch = null,
    } = {}
  ) {
    this.waitForReachedTime(
      ({ pageNumber, callStartupEvent }) => {
        const context = this.context.pagination
        const createEvent = (eventName) => {
          if (isNaN(pageNumber)) {
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
          <Elem key={pageNumber} ref={ref}>
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

const InteractionMarker = ({
  pageNumber,
  onVisible,
  markerElement = null,
}) => {
  const [isConnected, setIsConnected] = React.useState(false)
  const _ref = React.useRef(null)
  const intersectionObserverRef = React.useRef(null)
  const _readyTimeoutRef = React.useRef(null)
  const _isMountedRef = React.useRef(false)

  React.useEffect(() => {
    if (typeof markerElement === 'function') {
      warn(
        'Pagination: Please use a string or React element e.g. markerElement="tr"'
      )
    }

    if (typeof IntersectionObserver !== 'undefined') {
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          const [{ isIntersecting }] = entries
          if (isIntersecting) {
            callReady()
          }
        }
      )
    } else {
      warn('Pagination is missing IntersectionObserver supported!')
    }
  }, [])

  React.useEffect(() => {
    if (_ref.current) {
      _isMountedRef.current = true
      intersectionObserverRef.current?.observe(_ref.current)
    }

    return () => {
      _isMountedRef.current = false
      if (intersectionObserverRef.current) {
        clearTimeout(_readyTimeoutRef.current)
        intersectionObserverRef.current.disconnect()
      }
    }
  }, [])

  const callReady = () => {
    intersectionObserverRef.current?.disconnect()
    intersectionObserverRef.current = null
    clearTimeout(_readyTimeoutRef.current)
    _readyTimeoutRef.current = setTimeout(() => {
      if (_isMountedRef.current) {
        setIsConnected(true)
      }
      onVisible(pageNumber)
    }, 1) // because of re-render loop
  }

  if (isConnected || !intersectionObserverRef.current) {
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
      <ElementChild className="dnb-pagination__marker__inner" ref={_ref}>
        {/* {pageNumber} */}
      </ElementChild>
    </Element>
  )
}

InteractionMarker.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  onVisible: PropTypes.func.isRequired,
  markerElement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
}

export const InfinityLoadButton = ({
  element = 'div',
  pressedElement = null,
  icon = 'arrow_down',
  onClick,
  text = null,
  iconPosition = 'left',
}) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const context = React.useContext(Context)

  const onClickHandler = (e) => {
    setIsPressed(true)
    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  const Element = element
  const ElementChild = isTrElement(Element) ? 'td' : 'div'

  return isPressed ? (
    pressedElement
  ) : (
    <Element>
      <ElementChild className="dnb-pagination__loadbar">
        <Button
          size="medium"
          icon={icon}
          iconPosition={iconPosition}
          text={text || context.translation.Pagination.loadButtonText}
          variant="secondary"
          onClick={onClickHandler}
        />
      </ElementChild>
    </Element>
  )
}

InfinityLoadButton.propTypes = {
  element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  pressedElement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
  ]),
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  iconPosition: PropTypes.string,
}

const ScrollToElement = ({ pageElement = null, ...props }) => {
  const elementRef = React.useRef(null)

  React.useEffect(() => {
    // Use ref instead of findDOMNode for React v19 compatibility
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

ScrollToElement.propTypes = {
  pageElement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
}

InfinityScroller._supportsSpacingProps = true
