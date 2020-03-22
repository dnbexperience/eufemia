/**
 * Web Pagination Provider
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import { isTrue } from '../../shared/component-helper'
import {
  ContentObject
  // , detectScrollDirection // NB: We do currently not use scroll direction handling
} from './PaginationHelpers'

import PaginationContext from './PaginationContext'

const propTypes = {
  mode: PropTypes.string,
  startup_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // eslint-disable-line
  set_content_handler: PropTypes.oneOfType([PropTypes.func]),
  set_page_handler: PropTypes.oneOfType([PropTypes.func]),
  reset_content_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func
  ]),
  end_infinity_handler: PropTypes.oneOfType([PropTypes.func]),
  rerender: PropTypes.object,
  store: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ])
}
const defaultProps = {
  mode: 'pagination',
  startup_page: null,
  current_page: null,
  page_count: null,
  set_content_handler: null,
  set_page_handler: null,
  reset_content_handler: null,
  end_infinity_handler: null,
  rerender: null,
  store: null,
  children: null
}

export default class PaginationProvider extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.page_count !== null) {
        state.pageCount = parseFloat(props.page_count) || 1
      }
      if (props.current_page !== null) {
        state.currentPage = parseFloat(props.current_page) || 1
      }
      if (typeof state.startupPage === 'undefined') {
        // originalCurrentPage
        state.startupPage =
          parseFloat(props.startup_page) ||
          parseFloat(props.current_page) ||
          1
      }

      // reset items, like the resetContent method
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
          if (props.mode === 'infinity') {
            this.updateContent(store.pageNo, store.content)
          } else {
            // because we have a set state inside setContent and render at the same time
            setTimeout(
              () => this.setContent(store.pageNo, store.content),
              1
            )
          }
        }
      }
      props.rerender.current = this.rerender
    }
  }

  componentDidMount() {
    const {
      set_content_handler,
      set_page_handler,
      reset_content_handler,
      end_infinity_handler
    } = this.props

    // update the callback handlers
    if (typeof set_content_handler === 'function') {
      set_content_handler(this.updateContent)
    }
    if (typeof set_page_handler === 'function') {
      set_page_handler(this.setItems)
    }
    if (typeof reset_content_handler === 'function') {
      reset_content_handler(this.resetContent)
    }
    if (typeof end_infinity_handler === 'function') {
      end_infinity_handler(this.endInfinity)
    }

    if (this.props.store && this.props.store.current) {
      const store = this.props.store.current
      if (this.props.mode === 'infinity') {
        this.updateContent(store.pageNo, store.content)
      } else {
        this.setContent(store.pageNo, store.content)
      }
    }

    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  updateContent = (pageNo, content) => {
    this.state.items.forEach(item => {
      if (item.pageNo === pageNo) {
        if (item.content) {
          item.update(content)
        } else {
          item.insert(content)
        }
      }
    })
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

  endInfinity = (pageCount = this.state.items.length) => {
    const items = this.state.items.filter(({ pageNo }) => {
      return pageNo < pageCount
    })
    this.setState({
      items,
      pageCount,
      _listenForPropChanges: false
    })
  }

  // like reset_content_handler in DerivedState
  resetContent = () => {
    const currentPage =
      this.state.startupPage || this.state.currentPage || 1

    this.setState({
      items: [],
      currentPage,
      _listenForPropChanges: false
    })
  }

  setStateHandler = (state, cb) => {
    this.setState({ ...state, _listenForPropChanges: false }, cb)
  }

  prefillItems = (pageNo, props = {}, items = [...this.state.items]) => {
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

    return items
  }

  callOnPageUpdate = () => {
    if (Array.isArray(this._updateStack)) {
      this._updateStack.forEach(cb => {
        if (typeof cb === 'function') {
          cb()
        }
      })
      this._updateStack = []
    }
  }

  onPageUpdate = fn => {
    this._updateStack = this._updateStack || []
    this._updateStack.push(fn)
  }

  setContent = (newContent, content = null) => {
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
      let itemToInsert = this.state.items.find(
        ({ pageNo: p }) => p === pageNo
      )
      let items = null

      // just to make sure we have a page we can put content inside
      if (!itemToInsert) {
        items = this.prefillItems(pageNo, {
          skipObserver: true
        })
        itemToInsert = items.find(({ pageNo: p }) => p === pageNo)
      }

      itemToInsert.insert(content)

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

  render() {
    const { children } = this.props

    return (
      <PaginationContext.Provider
        value={{
          ...this.context,
          pagination: {
            updateContent: this.updateContent,
            setContent: this.setContent,
            resetContent: this.resetContent,
            endInfinity: this.endInfinity,
            setItems: this.setItems,
            prefillItems: this.prefillItems,
            setState: this.setStateHandler,
            onPageUpdate: this.onPageUpdate,
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
