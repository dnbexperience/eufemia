/**
 * Web Pagination Component
 *
 */

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import {
  isTrue,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import Button from '../button/Button'
import {
  preparePageElement,
  isTrElement,
  PaginationIndicator
} from './PaginationHelpers'
import PaginationContext from './PaginationContext'

const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}
const defaultProps = { children: null }

export default class InfinityScroller extends PureComponent {
  static contextType = PaginationContext
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props, context) {
    super(props)
    this.hideIndicator = isTrue(context.pagination.hide_progress_indicator)
    this.useLoadButton = isTrue(context.pagination.use_load_button)
    this.lastElement = React.createRef()
  }

  startup = () => {
    const { startupPage, startup_count } = this.context.pagination
    const startupCount = parseFloat(startup_count)

    for (let i = 0; i < startupCount; ++i) {
      this.getNewContent(
        startupPage + i,
        {
          position: 'after',
          skipObserver: i + 1 < startupCount
        },
        { isStartup: i === 0 }
      )
    }
  }

  getNewContent = (newPageNo, props = {}, { isStartup = false } = {}) => {
    const { pageCount } = this.context.pagination

    // if "page_count" is set do not load more than that value
    if (newPageNo > pageCount) {
      return
    }

    const exists =
      this.context.pagination.items.findIndex((obj) => {
        return obj.pageNo === newPageNo
      }) > -1

    if (exists) {
      return // stop here!
    }

    const items = this.context.pagination.prefillItems(newPageNo, props)

    this.context.pagination.setItems(items, () =>
      this.callEventHandler(newPageNo, isStartup)
    )
  }

  callEventHandler(pageNo, isStartup = false) {
    const createEvent = (eventName) => {
      dispatchCustomElementEvent(this.context.pagination, eventName, {
        page: pageNo,
        pageNo,
        ...this.context.pagination
      })
    }

    if (isStartup) {
      createEvent('on_startup')
    } else {
      createEvent('on_change')
    }

    createEvent('on_load')
  }

  handleInfinityMarker() {
    const { children } = this.props

    const {
      // our states
      lowerPage,
      upperPage,
      pageCount,
      // currentPage,

      // our props
      fallback_element,
      marker_element,
      indicator_element
    } = this.context.pagination

    const Marker = () => (
      <InteractionMarker
        pageNo={upperPage + 1}
        markerElement={marker_element || fallback_element}
        onVisible={(pageNo) => {
          // wait on updating our own state, so we can show the indicator (pressed_element) untill we get new children back
          this.context.pagination.onPageUpdate(() => {
            this.context.pagination.setState({
              upperPage: pageNo
            })

            // only update, so endInfinity can use it
            // if (!currentPage) {
            // this.context.pagination.setItems(
            //   [].fill.call({ length: upperPage - lowerPage }, null)
            // )
            // }
          })
          this.callEventHandler(pageNo)
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
          const pageNo = lowerPage - 1
          // wait on updating our own state, so we can show the indicator (pressed_element) untill we get new children back
          this.context.pagination.onPageUpdate(() => {
            this.context.pagination.setState({
              lowerPage: pageNo
            })
          })
          this.callEventHandler(pageNo)
        }}
      />
    )

    return (
      <>
        {lowerPage > 1 && <LoadButton />}

        {children}

        {(upperPage < pageCount || typeof pageCount === 'undefined') && (
          <Marker />
        )}

        {(upperPage < pageCount || typeof pageCount === 'undefined') &&
          !this.hideIndicator && (
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

      // our props
      startupPage,
      parallel_load_count,
      page_element,
      fallback_element,
      marker_element,
      indicator_element
    } = this.context.pagination

    if (this.context.pagination.useMarkerOnly) {
      return this.handleInfinityMarker()
    }

    // invoke startup if needed
    if (!(items && items.length > 0)) {
      clearTimeout(this.startupTimeout)
      this.startupTimeout = setTimeout(this.startup, 1)
      return null // stop here
    }

    // make some props ready to use
    const parallelLoadCount = parseFloat(parallel_load_count)

    // make sure we handle Table markup correctly
    const Element = preparePageElement(page_element || Fragment)

    return items.map(
      (
        { pageNo, hasContent, content, ref, skipObserver, ScrollElement },
        idx
      ) => {
        const isLastItem = idx === items.length - 1

        // decide to whether use the default Element, or use the scrollTo element
        const Elem = (hasContent && ScrollElement) || Element

        // render the marker before
        const marker = hasContent &&
          !this.useLoadButton &&
          !skipObserver &&
          (pageNo <= pageCount || typeof pageCount === 'undefined') && (
            <InteractionMarker
              pageNo={pageNo}
              markerElement={marker_element || fallback_element}
              onVisible={(pageNoVisible) => {
                // load several pages at once
                for (let i = 0; i < parallelLoadCount; ++i) {
                  const currentLoadingPage = pageNoVisible + 1 + i
                  if (
                    currentLoadingPage <= pageCount ||
                    typeof pageCount === 'undefined'
                  ) {
                    this.getNewContent(currentLoadingPage, {
                      position: 'after',
                      skipObserver: i + 1 < parallelLoadCount
                    })
                  }
                }
              }}
            />
          )

        return (
          <Elem key={pageNo} ref={ref}>
            {hasContent &&
              startupPage > 1 &&
              pageNo > 1 &&
              pageNo <= startupPage && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_up"
                  on_click={(event) =>
                    this.getNewContent(pageNo - 1, {
                      position: 'before',
                      skipObserver: true,
                      event
                    })
                  }
                />
              )}

            {idx > 0 && marker}
            {content}
            {idx === 0 && marker}

            {!hasContent && !this.hideIndicator && (
              <PaginationIndicator
                indicator_element={indicator_element || fallback_element}
              />
            )}

            {hasContent &&
              this.useLoadButton &&
              isLastItem &&
              (pageNo < pageCount || typeof pageCount === 'undefined') && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_down"
                  on_click={(event) =>
                    this.getNewContent(pageNo + 1, {
                      position: 'after',
                      skipObserver: true,
                      ScrollElement: (props) =>
                        hasContent && (
                          <ScrollToElement
                            page_element={page_element}
                            {...props}
                          />
                        ),
                      event
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

class InteractionMarker extends PureComponent {
  static propTypes = {
    pageNo: PropTypes.number.isRequired,
    onVisible: PropTypes.func.isRequired,
    markerElement: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ])
  }
  static defaultProps = {
    markerElement: null
  }
  state = { isConnected: false }

  constructor(props) {
    super(props)

    if (typeof props.markerElement === 'function') {
      console.warn(
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
      console.warn('Pagination is missing IntersectionObserver supported!')
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
    clearTimeout(this.startupTimeout)
    clearTimeout(this.readyTimeout)
    this.intersectionObserver?.disconnect()
  }

  callReady = () => {
    this.intersectionObserver?.disconnect()
    this.intersectionObserver = null
    this.readyTimeout = setTimeout(() => {
      if (this._isMounted) {
        this.setState({ isConnected: true })
      }
      this.props.onVisible(this.props.pageNo)
    }, 1) // because of rerender loop
  }

  render() {
    const { markerElement } = this.props

    if (this.state.isConnected || !this.intersectionObserver) {
      return null
    }

    // NB: make sure we don't actually use the marker element,
    // because it looks like React as troubles regarding handling ref during a rerender?
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
          {/* {this.props.pageNo} */}
        </ElementChild>
      </Element>
    )
  }
}

export class InfinityLoadButton extends PureComponent {
  static contextType = Context
  static propTypes = {
    element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ]),
    pressed_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func
    ]),
    icon: PropTypes.string.isRequired,
    on_click: PropTypes.func.isRequired
  }
  static defaultProps = {
    element: 'div',
    pressed_element: null,
    icon: 'arrow_down'
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

class ScrollToElement extends PureComponent {
  static propTypes = {
    page_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ])
  }
  static defaultProps = {
    page_element: null
  }
  componentDidMount() {
    // we use "findDOMNode" here, because we have situations, where we dont knwo about what the input element is,
    // we also don't want to wrap them because of markup collitions
    // therefor we use "findDOMNode" here
    // so we can scroll to that page
    // eslint-disable-next-line
    const elem = findDOMNode(this)
    this.scrollToPage(elem)
  }
  scrollToPage(element) {
    if (element && typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      })
    }
  }
  render() {
    const { page_element, ...props } = this.props
    const Element = preparePageElement(page_element || Fragment)
    return <Element {...props} />
  }
}
