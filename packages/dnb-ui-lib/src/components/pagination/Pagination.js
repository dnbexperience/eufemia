/**
 * Web Pagination Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import { calculatePagination } from './PaginationCalculation'
import {
  ContentObject
  // , detectScrollDirection // NB: We do currently not use scroll direction handling
} from './PaginationHelpers'
import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

const renderProps = {
  on_change: null,
  on_load: null
}

const propTypes = {
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accumulate_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mode: PropTypes.oneOf(['pagination', 'infinity']),
  use_load_button: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  hide_progress_indicator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  reset_items_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  page_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  marker_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  indicator_element: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  align: PropTypes.string,
  button_title: PropTypes.string,
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  on_change: PropTypes.func,
  on_load: PropTypes.func
}
const defaultProps = {
  mode: 'pagination',
  use_load_button: false,
  items: null,
  hide_progress_indicator: false,
  reset_items_handler: null,
  page_element: null,
  marker_element: 'div',
  indicator_element: 'div',
  align: 'left',
  current_page: null,
  page_count: null,
  accumulate_count: 0,
  class: null,
  button_title: '%s',
  prev_title: 'Previous',
  next_title: 'Next',

  // React props
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Pagination extends PureComponent {
  static tagName = 'dnb-pagination'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Pagination.tagName, Pagination, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.page_count !== null) {
        state.pageCount = parseFloat(props.page_count) || 1
      }
      if (props.current_page !== null) {
        state.currentPage = parseFloat(props.current_page) || 1
      }

      // reset items, like the resetItems method
      if (
        props.reset_items_handler !== null &&
        isTrue(props.reset_items_handler)
      ) {
        state.items = []
        state.pageCount = parseFloat(props.page_count) || 1
      }

      if (props.items !== null) {
        if (typeof props.items === 'string' && props.items[0] === '[') {
          state.items = JSON.parse(props.items)
        } else {
          state.items = props.items
        }
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      // scrollDirection: 'down',// NB: We do currently not use scroll direction handling
      isLoading: false,
      _listenForPropChanges: true
    }

    this.useInfinity = props.mode === 'infinity'
    this.hideIndicator = isTrue(props.hide_progress_indicator)
    this.useLoadButton = isTrue(props.use_load_button)

    if (!parseFloat(props.current_page) > -1) {
      this.state.currentPage = 1
    }
    if (!parseFloat(props.page_count) > -1) {
      this.state.pageCount = 1
    }
  }

  // NB: We do currently not use scroll direction handling
  // componentDidMount() {
  //   if (this.useInfinity) {
  //     this._scrollDirection = detectScrollDirection(scrollDirection => {
  //       this.setState({
  //         scrollDirection,
  //         _listenForPropChanges: false
  //       })
  //     })
  //   }
  // }
  // componentWillUnmount() {
  //   if (this._scrollDirection) {
  //     this._scrollDirection.remove()
  //   }
  // }

  getNewContent = (newPageNo, { position = 'after', ...props } = {}) => {
    // if "page_count" is set do not load more than that value
    if (newPageNo > parseFloat(this.props.page_count)) {
      return
    }

    const exists =
      this.state.items.findIndex(cObj => {
        return cObj.pageNo === newPageNo
      }) > -1

    if (exists) {
      return // stop here!
    }

    const items = [...this.state.items]

    // handle indicator element
    const { page_element, indicator_element } = this.props
    const indicatorElement =
      page_element === 'tr' && indicator_element === 'div'
        ? 'td'
        : indicator_element

    const obj = {
      pageNo: newPageNo,
      position,
      hideIndicator: this.hideIndicator,
      indicatorElement,
      skipObserver: false,
      ...props
    }

    switch (position) {
      case 'before':
        items.unshift(new ContentObject(obj))
        break
      case 'after':
        items.push(new ContentObject(obj))
        break
    }

    // NB: we may considder to sort it in future to ensure correct order
    // items
    //   .sort(({ pageNo: a }, { pageNo: b }) => {
    //     return a > b ? 1 : -1
    //   })

    this.setState({
      items,
      // currentPage: newPageNo,// update the currentPage
      _listenForPropChanges: false
    })

    dispatchCustomElementEvent(this, 'on_load', {
      page: newPageNo,
      insertContent: this.handleNewContent
    })
  }

  // like reset_items_handler in DerivedState
  setItems = items => {
    this.setState({
      items,
      _listenForPropChanges: false
    })
  }
  resetItems = () => {
    this.setState({
      items: [],
      currentPage: parseFloat(this.props.current_page) || 1,
      _listenForPropChanges: false
    })
  }

  handleNewContent = newContent => {
    if (!Array.isArray(newContent)) {
      return console.warn(
        'The returned pagination content updater has to be an array!'
      )
    }

    const pageNo = newContent[0]
    newContent = newContent[1]

    const itemToInsert = this.state.items.find(
      ({ pageNo: p }) => p === pageNo
    )

    if (itemToInsert) {
      let content = null
      if (typeof newContent === 'function') {
        content = newContent()
      } else if (React.isValidElement(newContent)) {
        content = newContent
      }

      if (content) {
        const contentObject = itemToInsert.insert(content)

        this.setState(
          {
            items: [...this.state.items], // we make a copy, only to rerender
            currentPage: pageNo, // update the currentPage
            _listenForPropChanges: false
          },
          () =>
            typeof contentObject.onAfterInsert === 'function' &&
            contentObject.onAfterInsert(contentObject)
        )
      }
    }
  }

  setPage = currentPage => {
    this.setState({
      currentPage,
      _listenForPropChanges: false
    })

    dispatchCustomElementEvent(this, 'on_change', {
      page: currentPage,
      insertContent: this.handleNewContent // TODO: extend this functinallity, this is not implemented yet
    })
  }

  setPrevPage = () => {
    this.setPage(this.state.currentPage - 1)
  }
  setNextPage = () => {
    this.setPage(this.state.currentPage + 1)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.Pagination
    )

    const {
      align,
      children,
      accumulate_count,
      set_items_handler,
      reset_items_handler,
      page_element,
      marker_element,
      className,
      class: _className,

      page_count: _page_count, // eslint-disable-line
      current_page: _current_page, // eslint-disable-line
      indicator_element: _indicator_element, // eslint-disable-line
      mode: _mode, // eslint-disable-line
      button_title: _button_title, // eslint-disable-line
      prev_title: _prev_title, // eslint-disable-line
      next_title: _next_title, // eslint-disable-line
      hide_progress_indicator: _hide_progress_indicator, // eslint-disable-line
      use_load_button: _use_load_button, // eslint-disable-line

      ...attributes
    } = props

    // update the callback handlers
    if (!this.hasSetItems && typeof set_items_handler === 'function') {
      this.hasSetItems = true
      set_items_handler(this.setItems)
    }
    if (!this.hasResetItems && typeof reset_items_handler === 'function') {
      this.hasResetItems = true
      reset_items_handler(this.resetItems)
    }

    const { currentPage, pageCount, items } = this.state

    let paginationBar = null

    if (!this.useInfinity) {
      const pages = calculatePagination(pageCount, currentPage)

      const mainParams = {
        className: classnames(
          'dnb-pagination',
          align && `dnb-pagination--${align}`,
          createSpacingClasses(props),
          className,
          _className
        ),
        ...attributes
      }

      validateDOMAttributes(props, mainParams)

      paginationBar = (
        <div {...mainParams}>
          <PaginationBar
            pages={pages}
            pageCount={pageCount}
            currentPage={currentPage}
            setPage={this.setPage}
            setPrevPage={this.setPrevPage}
            setNextPage={this.setNextPage}
            buttonTitle={props.button_title}
            prevTitle={props.prev_title}
            nextTitle={props.next_title}
          />
        </div>
      )
    }

    return (
      <>
        {children}

        {this.useInfinity && (
          <InfinityScroller
            items={items}
            currentPage={currentPage}
            pageCount={pageCount}
            accumulateCount={parseFloat(accumulate_count)}
            originalPageCount={this.props.page_count}
            getNewContent={this.getNewContent}
            useLoadButton={this.useLoadButton}
            hideIndicator={this.hideIndicator}
            pageElement={page_element}
            markerElement={marker_element}
            // scrollDirection={this.state.scrollDirection}// NB: We do currently not use scroll direction handling
          />
        )}

        {paginationBar}
      </>
    )
  }
}
