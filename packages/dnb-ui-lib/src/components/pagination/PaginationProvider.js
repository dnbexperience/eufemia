/**
 * Web Pagination Provider
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import {
  isTrue,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import {
  ContentObject
  // , detectScrollDirection // NB: We do currently not use scroll direction handling
} from './PaginationHelpers'

import PaginationContext from './PaginationContext'

export default class PaginationProvider extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    startup_page: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]), // eslint-disable-line
    current_page: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]), // eslint-disable-line
    page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
    set_content_handler: PropTypes.func,
    reset_content_handler: PropTypes.func,
    reset_pagination_handler: PropTypes.func,
    end_infinity_handler: PropTypes.func,
    rerender: PropTypes.object,
    store: PropTypes.object,
    useMarkerOnly: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.object,
      PropTypes.array
    ])
  }
  static defaultProps = {
    startup_page: null,
    current_page: null,
    page_count: null,
    set_content_handler: null,
    reset_content_handler: null,
    reset_pagination_handler: null,
    end_infinity_handler: null,
    rerender: null,
    store: null,
    useMarkerOnly: null,
    children: null
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.page_count !== null) {
        state.pageCount = parseFloat(props.page_count) || 1
      }
      if (props.current_page !== null) {
        state.currentPage = parseFloat(props.current_page) || 1
      }
      if (typeof state.startupPage === 'undefined') {
        state.startupPage =
          parseFloat(props.startup_page) ||
          parseFloat(props.current_page) ||
          1
      }

      state.parallelLoadCount = parseFloat(props.parallel_load_count) || 1
      state.minTime = parseFloat(props.min_wait_time) || 0
      state.placeMakerBeforeContent = isTrue(
        props.place_maker_before_content
      )

      // only used by handleInfinityMarker
      if (props.useMarkerOnly) {
        if (!state.lowerPage) {
          state.lowerPage = state.upperPage = state.startupPage
        }
      }

      // reset pagination, like the resetInfinity method
      if (
        props.reset_pagination_handler !== null &&
        isTrue(props.reset_pagination_handler)
      ) {
        if (props.useMarkerOnly) {
          state.lowerPage = state.upperPage = state.startupPage
        }
      }

      // reset content, like the resetContent method
      if (
        props.reset_content_handler !== null &&
        isTrue(props.reset_content_handler)
      ) {
        state.items = []
        state.pageCount = parseFloat(props.page_count) || 1
      }

      if (typeof props.items === 'string' && props.items[0] === '[') {
        state.items = JSON.parse(props.items)
      } else if (Array.isArray(props.items)) {
        state.items = props.items
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

    if (props.rerender) {
      this.rerender = ({ current: store }) => {
        if (store && store.pageNo > 0) {
          clearTimeout(this.rerenderTimeout)
          // because we have a set state inside setContent and render at the same time
          this.rerenderTimeout = setTimeout(
            () => this.setContent(store.pageNo, store.content),
            1
          )
        }
      }
      props.rerender.current = this.rerender
    }
  }

  componentDidMount() {
    const {
      set_content_handler,
      reset_content_handler,
      reset_pagination_handler,
      end_infinity_handler
    } = this.props

    // update the callback handlers
    if (typeof set_content_handler === 'function') {
      set_content_handler(this.setContent)
    }
    if (typeof reset_content_handler === 'function') {
      reset_content_handler(this.resetContent)
    }
    if (typeof reset_pagination_handler === 'function') {
      reset_pagination_handler(this.resetInfinity)
    }
    if (typeof end_infinity_handler === 'function') {
      end_infinity_handler(this.endInfinity)
    }

    if (this.props.store && this.props.store.current) {
      const store = this.props.store.current
      this.setContent(store.pageNo, store.content)
    }

    this._isMounted = true
  }

  componentWillUnmount() {
    clearTimeout(this.rerenderTimeout)
    clearTimeout(this.resetContentTimeout)
    clearTimeout(this.resetInfinityTimeout)
    clearTimeout(this.callOnPageUpdateTimeout)
    this._isMounted = false
  }

  setContent = (newContent, content = null, position = null) => {
    if (!Array.isArray(newContent) && content) {
      newContent = [newContent, content]
    }

    const pageNo = parseFloat(newContent[0]) // parse, since we get it from a return
    newContent = newContent[1]

    if (typeof newContent === 'function') {
      content = newContent()
    } else if (React.isValidElement(newContent)) {
      content = newContent
    }

    if (content) {
      let itemToPrepare = this.state.items.find(
        ({ pageNo: p }) => p === pageNo
      )
      let items = null

      // just to make sure we have a page we can put content inside
      if (!itemToPrepare) {
        items = this.prefillItems(pageNo, {
          position,
          skipObserver: true
        })
        itemToPrepare = items.find(({ pageNo: p }) => p === pageNo)
      }

      if (itemToPrepare.content) {
        itemToPrepare.update(content)
      } else {
        itemToPrepare.insert(content)
      }

      this.setState(
        {
          items: [...(items || this.state.items)], // we make a copy, only to rerender
          currentPage: pageNo, // update the currentPage
          _listenForPropChanges: false
        },
        this.callOnPageUpdate
      )
    }
  }

  // like reset_content_handler in DerivedState
  resetContent = () => {
    clearTimeout(this.resetContentTimeout)
    this.resetContentTimeout = setTimeout(() => {
      this.setState({
        items: [],
        _listenForPropChanges: false
      })
    }, 10) // we have to be two tick after "rerender"
  }

  // like reset_content_handler in DerivedState
  resetInfinity = (pageNo = this.state.startupPage) => {
    const lowerPage = pageNo
    const upperPage = pageNo
    const currentPage = pageNo
    this._hasEndedInfinity = true
    this.setState({
      hasEndedInfinity: true,
      lowerPage,
      upperPage,
      currentPage,
      _listenForPropChanges: false
    })

    clearTimeout(this.resetInfinityTimeout)
    this.resetInfinityTimeout = setTimeout(() => {
      this.startInfinity()
    }, this.state.minTime) // give it custom defined time to start again
  }

  // not implemented yet
  startInfinity = () => {
    this._hasEndedInfinity = false
    this.setState({
      hasEndedInfinity: false,
      _listenForPropChanges: false
    })
  }

  endInfinity = () => {
    this._hasEndedInfinity = true
    this.setState(
      {
        hasEndedInfinity: true,
        _listenForPropChanges: false
      },
      () => {
        const pageNo = this.state.currentPage + 1
        dispatchCustomElementEvent(this, 'on_end', {
          page: pageNo,
          pageNo,
          ...this
        })
      }
    )
  }

  setItems = (items, cb) => {
    this.setState(
      {
        items,
        _listenForPropChanges: false
      },
      cb
    )
  }

  prefillItems = (pageNo, props = {}, items = this.state.items) => {
    const position =
      props.position ||
      (pageNo < this.state.currentPage ? 'before' : 'after')

    const obj = {
      pageNo,
      position,
      skipObserver: false,
      ...props
    }

    switch (position) {
      case 'before':
        return [new ContentObject(obj), ...items]
      case 'after':
        return [...items, new ContentObject(obj)]
    }
  }

  setStateHandler = (state, cb) => {
    this.setState({ ...state, _listenForPropChanges: false }, cb)
  }

  callOnPageUpdate = () => {
    if (Array.isArray(this._updateStack)) {
      this._updateStack.forEach((cb) => {
        if (typeof cb === 'function') {
          cb()
        }
      })
      this._updateStack = []
    }
  }

  onPageUpdate = (fn) => {
    this._updateStack = this._updateStack || []
    this._updateStack.push(fn)
  }

  render() {
    const { children } = this.props

    if (this.props.useMarkerOnly) {
      clearTimeout(this.callOnPageUpdateTimeout)
      this.callOnPageUpdateTimeout = setTimeout(this.callOnPageUpdate, 1) // because of rerender pssibility
    }

    return (
      <PaginationContext.Provider
        value={{
          ...this.context,
          pagination: {
            setContent: this.setContent,
            resetContent: this.resetContent,
            resetInfinity: this.resetInfinity,
            resetPagination: this.resetInfinity, // deprecated
            endInfinity: this.endInfinity,
            setItems: this.setItems,
            prefillItems: this.prefillItems,
            setState: this.setStateHandler,
            onPageUpdate: this.onPageUpdate,
            _hasEndedInfinity: this._hasEndedInfinity,
            ...this.props,
            ...this.state
          }
        }}
      >
        {children}
      </PaginationContext.Provider>
    )
  }
}
