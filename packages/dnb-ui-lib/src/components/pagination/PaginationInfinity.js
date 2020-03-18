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

const propTypes = {}
const defaultProps = {}

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
    const { current_page, parallel_load_count } = this.context.pagination

    const originalCurrentPage = parseFloat(current_page) || 1
    const parallelLoadCount = parseFloat(parallel_load_count)

    for (let i = 0; i < parallelLoadCount; ++i) {
      this.getNewContent(originalCurrentPage + i, {
        position: 'after',
        skipObserver: i + 1 < parallelLoadCount
      })
    }
  }

  getNewContent = (newPageNo, props = {}) => {
    // if "page_count" is set do not load more than that value
    if (newPageNo > parseFloat(this.context.pagination.page_count)) {
      return
    }

    const exists =
      this.context.pagination.items.findIndex(obj => {
        return obj.pageNo === newPageNo
      }) > -1

    if (exists) {
      return // stop here!
    }

    const items = this.context.pagination.prefillItems(newPageNo, props)

    this.context.pagination.setState({
      items,
      _listenForPropChanges: false
    })

    dispatchCustomElementEvent(this.context.pagination, 'on_load', {
      page: newPageNo,
      pageNo: newPageNo,
      ...this.context.pagination
    })
  }

  render() {
    const {
      // our states
      items,
      currentPage,
      pageCount

      // our methodes
    } = this.context.pagination

    // our props
    const {
      current_page,
      page_count,
      parallel_load_count,
      page_element,
      fallback_element,
      marker_element,
      indicator_element
    } = this.context.pagination

    // make some props ready to use
    const originalCurrentPage = parseFloat(current_page)
    const originalPageCount = parseFloat(page_count)
    const parallelLoadCount = parseFloat(parallel_load_count)

    // invoke startup if needed
    if (items.length === 0) {
      setTimeout(this.startup, 1)
    }

    // make sure we handle Table markup correctly
    const Element = preparePageElement(page_element || Fragment)

    return items.map(
      (
        { pageNo, hasContent, content, ref, skipObserver, ItemElement },
        idx
      ) => {
        const isLastItem = idx === items.length - 1

        // decide to whether use the default Element, or use the scrollTo element
        const Elem = ItemElement || Element

        return (
          <Elem key={pageNo} ref={ref}>
            {hasContent &&
              originalCurrentPage > 1 &&
              pageNo > 1 &&
              pageNo <= originalCurrentPage && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_up"
                  onClick={event =>
                    this.getNewContent(pageNo - 1, {
                      position: 'before',
                      skipObserver: true,
                      event
                    })
                  }
                />
              )}

            {hasContent &&
              !this.useLoadButton &&
              !skipObserver &&
              pageNo < pageCount && (
                <InfinityMarker
                  pageNo={pageNo}
                  marker_element={marker_element || fallback_element}
                  callOnVisible={parallelLoadCount > 0 && pageNo === 1}
                  onVisible={pageNoVisible => {
                    // load several pages at once
                    for (let i = 0; i < parallelLoadCount; ++i) {
                      const currentLoadingPage = pageNoVisible + 1 + i
                      this.getNewContent(currentLoadingPage, {
                        position: 'after',
                        skipObserver: i + 1 < parallelLoadCount
                      })
                    }
                  }}
                />
              )}

            {content}

            {!hasContent && !this.hideIndicator && (
              <PaginationIndicator
                indicator_element={indicator_element || fallback_element}
              />
            )}

            {hasContent &&
              this.useLoadButton &&
              isLastItem &&
              pageNo >= currentPage &&
              (originalPageCount > 0 ? pageNo < pageCount : true) && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_down"
                  onClick={event =>
                    this.getNewContent(pageNo + 1, {
                      position: 'after',
                      skipObserver: true,
                      ItemElement: props => (
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

class InfinityMarker extends PureComponent {
  static propTypes = {
    pageNo: PropTypes.number.isRequired,
    onVisible: PropTypes.func.isRequired,
    marker_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ]),
    callOnVisible: PropTypes.bool
  }
  static defaultProps = {
    callOnVisible: false,
    marker_element: null
  }
  state = { isConnected: false }

  constructor(props) {
    super(props)

    if (typeof props.marker_element === 'function') {
      console.warn(
        'Pagination: Please use a string or React element e.g. marker_element="tr"'
      )
    }

    this._ref = React.createRef()

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(
        entries => {
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
    if (this.props.callOnVisible) {
      this.callReady()
    } else if (this._ref.current) {
      this._isMounted = true
      this.intersectionObserver?.observe(this._ref.current)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
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
    const { marker_element, callOnVisible } = this.props

    if (
      this.state.isConnected ||
      callOnVisible ||
      !this.intersectionObserver
    ) {
      return null
    }

    // NB: make sure we don't actually use the marker element,
    // because it looks like React as troubles regarding handling ref during a rerender?
    const Element =
      marker_element && isTrElement(marker_element) ? 'tr' : 'div'
    const ElementChild =
      marker_element && isTrElement(marker_element) ? 'td' : 'div'

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

class InfinityLoadButton extends PureComponent {
  static contextType = Context
  static propTypes = {
    element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ]).isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }
  static defaultProps = {
    element: 'div',
    icon: 'arrow_down'
  }
  state = { isPressed: false }
  onClickHandler = e => {
    this.setState({ isPressed: true })
    this.props.onClick(e)
  }
  render() {
    const { element, icon } = this.props
    const Element = element
    const ElementChild = isTrElement(Element) ? 'td' : 'div'

    return this.state.isPressed ? null : (
      <Element className="dnb-table--ignore">
        <ElementChild className="dnb-pagination__loadbar">
          <Button
            // className="dnb-pagination__load-button"
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
