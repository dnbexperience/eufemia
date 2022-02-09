/**
 * Web Pagination Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {
  warn,
  isTrue,
  dispatchCustomElementEvent,
  getPreviousSibling,
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
    this.hideIndicator = isTrue(context.pagination.hide_progress_indicator)
    this.useLoadButton = isTrue(context.pagination.use_load_button)
    this.lastElement = React.createRef()
    this.callOnUnmount = []
  }

  componentWillUnmount() {
    clearTimeout(this._startupTimeout)
    clearTimeout(this._bufferTimeout)
    this.callOnUnmount.forEach((f) => typeof f === 'function' && f())
  }

  startup = () => {
    const { startupPage, startup_count } = this.context.pagination
    const startupCount = parseFloat(startup_count)

    let newPageNo, skipObserver, callStartupEvent, preventWaitForDelay
    for (let i = 0; i < startupCount; ++i) {
      newPageNo = startupPage + i
      skipObserver = newPageNo < startupCount
      callStartupEvent = i === 0
      preventWaitForDelay = i <= startupCount - 1

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
    const { pageCount, endInfinity } = this.context.pagination

    // if "page_count" is set do not load more than that value
    if (newPageNo > pageCount) {
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
            page: pageNumber, // deprecated
            pageNo: pageNumber, // deprecated
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
          createEvent('on_end')
        } else {
          if (callStartupEvent) {
            createEvent('on_startup')
          } else {
            createEvent('on_change')
          }

          createEvent('on_load')
        }
      },
      { pageNumber, callStartupEvent, preventWaitForDelay }
    )
  }

  handleInfinityMarker() {
    // TODO take this into own component
    const { children } = this.props

    const {
      // our states
      lowerPage,
      upperPage,
      currentPage,
      pageCount,
      hasEndedInfinity,
      parallelLoadCount,

      // our props
      debug,
      current_page,
      fallback_element,
      marker_element,
      indicator_element,
    } = this.context.pagination

    if (debug) {
      console.info('PaginationInfinity.render', {
        current_page,
        lowerPage,
        upperPage,
        currentPage,
        pageCount,
      })
    }

    const Marker = () => (
      <InteractionMarker
        debug={debug}
        pageNumber={upperPage}
        markerElement={marker_element || fallback_element}
        onVisible={(pageNumber) => {
          if (debug) {
            console.info('PaginationInfinity.onVisible', {
              pageNumber,
            })
          }

          let newPageNo
          // load several pages at once
          for (let i = 0; i < parallelLoadCount; ++i) {
            newPageNo = pageNumber + 1 + i
            // wait on updating our own state, so we can show the indicator (pressed_element) until we get new children back
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
        element={fallback_element}
        pressed_element={
          <PaginationIndicator
            indicator_element={indicator_element || fallback_element}
          />
        }
        on_click={() => {
          const newPageNo = lowerPage - 1
          // wait on updating our own state, so we can show the indicator (pressed_element) until we get new children back
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
        {parseFloat(current_page) > 0 && lowerPage > 1 && <LoadButton />}

        {children}

        {!hasEndedInfinity &&
          parseFloat(current_page) > 0 &&
          (typeof pageCount === 'undefined' || upperPage < pageCount) && (
            <Marker />
          )}

        {!hasEndedInfinity &&
          !this.hideIndicator &&
          (typeof pageCount === 'undefined' || upperPage < pageCount) && (
            <PaginationIndicator
              indicator_element={indicator_element || fallback_element}
            />
          )}
      </>
    )
  }

  render() {
    const {
      // our states
      items,
      pageCount,
      startupPage,
      hasEndedInfinity,
      parallelLoadCount,
      placeMakerBeforeContent,

      // our props
      page_element,
      fallback_element,
      marker_element,
      indicator_element,
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
    const Element = preparePageElement(page_element || React.Fragment)

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
          (typeof pageCount === 'undefined' ||
            pageNumber <= pageCount) && (
            <InteractionMarker
              pageNumber={pageNumber}
              markerElement={marker_element || fallback_element}
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
                  element={fallback_element}
                  icon="arrow_up"
                  on_click={(event) =>
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
                indicator_element={indicator_element || fallback_element}
              />
            )}

            {hasContent &&
              this.useLoadButton &&
              isLastItem &&
              (typeof pageCount === 'undefined' ||
                pageNumber < pageCount) && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_down"
                  on_click={(event) =>
                    this.getNewContent(pageNumber + 1, {
                      position: 'after',
                      skipObserver: true,
                      ScrollElement: (props) =>
                        hasContent && (
                          <ScrollToElement
                            page_element={page_element}
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

class InteractionMarker extends React.PureComponent {
  static propTypes = {
    debug: PropTypes.bool,
    pageNumber: PropTypes.number.isRequired,
    onVisible: PropTypes.func.isRequired,
    markerElement: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string,
    ]),
  }
  static defaultProps = {
    debug: null,
    markerElement: null,
  }
  state = { isConnected: false }

  constructor(props) {
    super(props)

    if (typeof props.markerElement === 'function') {
      warn(
        'Pagination: Please use a string or React element e.g. marker_element="tr"'
      )
    }

    this._ref = React.createRef()

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          const [{ isIntersecting }] = entries
          if (isIntersecting) {
            this.callReady()
          }
        }
        // {
        //   threshold: 1,
        //   rootMargin: '0px 0px -80% 0px'
        // }
      )
    } else {
      warn('Pagination is missing IntersectionObserver supported!')
    }
  }

  componentDidMount() {
    if (this._ref.current) {
      this._isMounted = true
      this.intersectionObserver?.observe(this._ref.current)
    }

    if (this.props.debug) {
      const height = this.getContentHeight()
      console.info('PaginationInfinity.getContentHeight', height)
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
      const sibling = getPreviousSibling('dnb-table', this._ref.current)
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

export class InfinityLoadButton extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string,
    ]),
    pressed_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
    ]),
    icon: PropTypes.string.isRequired,
    on_click: PropTypes.func.isRequired,
  }
  static defaultProps = {
    element: 'div',
    pressed_element: null,
    icon: 'arrow_down',
  }
  state = { isPressed: false }
  onClickHandler = (e) => {
    this.setState({ isPressed: true })
    if (typeof this.props.on_click === 'function') {
      this.props.on_click(e)
    }
  }
  render() {
    const { element, icon } = this.props
    const Element = element
    const ElementChild = isTrElement(Element) ? 'td' : 'div'

    return this.state.isPressed ? (
      this.props.pressed_element
    ) : (
      <Element>
        <ElementChild className="dnb-pagination__loadbar">
          <Button
            size="medium"
            icon={icon}
            icon_position="left"
            text={this.context.translation.Pagination.load_button_text}
            variant="secondary"
            on_click={this.onClickHandler}
          />
        </ElementChild>
      </Element>
    )
  }
}

class ScrollToElement extends React.PureComponent {
  static propTypes = {
    page_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string,
    ]),
  }
  static defaultProps = {
    page_element: null,
  }
  componentDidMount() {
    // we use "findDOMNode" here, because we have situations, where we don't knwo about what the input element is,
    // we also don't want to wrap them because of markup collitions
    // therefor we use "findDOMNode" here
    // so we can scroll to that page
    // eslint-disable-next-line
    const elem = ReactDOM.findDOMNode(this)
    this.scrollToPage(elem)
  }
  scrollToPage(element) {
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }
  render() {
    const { page_element, ...props } = this.props
    const Element = preparePageElement(page_element || React.Fragment)
    return <Element {...props} />
  }
}
