/**
 * Web Pagination Component
 *
 */

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  dispatchCustomElementEvent
  // extendPropsWithContext
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

export default class InfinityScroller extends PureComponent {
  static contextType = PaginationContext
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props, context) {
    super(props)
    this.hideIndicator = isTrue(context.pagination.hide_progress_indicator)
    this.useLoadButton = isTrue(context.pagination.use_load_button)
  }

  startup = () => {
    const { currentPage, current_page } = this.context.pagination
    this.getNewContent(parseFloat(current_page) || 1, {
      position: currentPage > 1 ? 'before' : 'after'
    })
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

    if (items.length === 0) {
      setTimeout(this.startup, 1)
    }

    // our props
    const {
      current_page,
      page_count,
      accumulate_count,
      page_element,
      fallback_element,
      marker_element,
      indicator_element
    } = this.context.pagination

    // make sure we handle Table markup correctly
    const Element = preparePageElement(page_element || Fragment)

    const originalCurrentPage = parseFloat(current_page)
    const originalPageCount = parseFloat(page_count)
    const accumulateCount = parseFloat(accumulate_count)

    return items.map(
      ({ pageNo, hasContent, content, ref, position, skipObserver }) => {
        return (
          <Element key={pageNo} ref={ref}>
            {hasContent &&
              position === 'before' &&
              originalCurrentPage > 1 &&
              pageNo > 1 &&
              pageNo <= currentPage && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_up"
                  onClick={event => {
                    this.getNewContent(pageNo - 1, {
                      position: 'before',
                      skipObserver: true,
                      event
                    })
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
              !this.useLoadButton &&
              !skipObserver &&
              pageNo < pageCount && (
                <InfinityMarker
                  pageNo={pageNo}
                  marker_element={marker_element || fallback_element}
                  callOnVisible={accumulateCount > 0 && pageNo === 1}
                  onVisible={pageNoVisible => {
                    if (accumulateCount > 0) {
                      for (let i = 0; i <= accumulateCount; ++i) {
                        this.getNewContent(items.length + i, {
                          position: 'after',
                          skipObserver:
                            i !== Math.round(accumulateCount / 2)
                        })
                      }
                    } else {
                      this.getNewContent(pageNoVisible + 1, {
                        position: 'after'
                      })
                    }
                  }}
                />
              )}

            {hasContent &&
              this.useLoadButton &&
              pageNo >= currentPage &&
              (originalPageCount > 0 ? pageNo < pageCount : true) && (
                <InfinityLoadButton
                  element={fallback_element}
                  icon="arrow_down"
                  onClick={event => {
                    this.getNewContent(pageNo + 1, {
                      position: 'after',
                      skipObserver: true,
                      event
                    })
                  }}
                />
              )}
          </Element>
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
    marker_element: 'div'
  }
  state = { isConnected: false }

  constructor(props) {
    super(props)
    this._ref = React.createRef()

    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(entries => {
        const [{ isIntersecting }] = entries
        if (isIntersecting) {
          this.callReady()
        }
      })
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
    if (
      this.state.isConnected ||
      callOnVisible ||
      !this.intersectionObserver
    ) {
      return null
    }

    const { marker_element, callOnVisible } = this.props
    const Element = marker_element
    const ElementChild = isTrElement(Element) ? 'td' : 'div'

    return (
      <Element className="dnb-pagination__marker">
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
      <Element className="dnb-pagination__loadbar">
        <ElementChild>
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
