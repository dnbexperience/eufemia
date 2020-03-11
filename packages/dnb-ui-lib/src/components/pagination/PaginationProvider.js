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
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  set_content_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  set_items_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  reset_items_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
    PropTypes.object,
    PropTypes.array
  ])
}
const defaultProps = {
  current_page: null,
  page_count: null,
  set_content_handler: null,
  set_items_handler: null,
  reset_items_handler: null,
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

  componentDidMount() {
    const {
      set_content_handler,
      set_items_handler,
      reset_items_handler
    } = this.props

    // update the callback handlers
    if (typeof set_content_handler === 'function') {
      set_content_handler(this.setContent)
    }
    if (typeof set_items_handler === 'function') {
      set_items_handler(this.setItems)
    }
    if (typeof reset_items_handler === 'function') {
      reset_items_handler(this.resetItems)
    }
  }

  setContent = (pageNo, content) => {
    const items = this.state.items.map(item => {
      if (item.pageNo === pageNo) {
        if (item.content) {
          item.update(content)
        } else {
          item.insert(content)
        }
      }
      return item
    })
    this.setState({
      items,
      _listenForPropChanges: false
    })
  }
  setItems = items => {
    this.setState({
      items,
      _listenForPropChanges: false
    })
  }
  // like reset_items_handler in DerivedState
  resetItems = () => {
    this.setState({
      items: [],
      currentPage: parseFloat(this.props.current_page) || 1,
      _listenForPropChanges: false
    })
  }
  setStateHandler = state => {
    this.setState({ ...state, _listenForPropChanges: false })
  }
  prefillItems = (pageNo, props = {}) => {
    const items = [...this.state.items]

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

  // used by insertContent
  insertContent = newContent => {
    if (!Array.isArray(newContent)) {
      return console.warn(
        'The returned pagination content updater has to be an array!'
      )
    }

    const pageNo = parseFloat(newContent[0]) // parse, since we get it from a return
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

  render() {
    const { children } = this.props

    // console.log('currentPage', this.state.currentPage)

    return (
      <PaginationContext.Provider
        value={{
          ...this.context,
          pagination: {
            setPage: this.setPage,
            setContent: this.setContent,
            setItems: this.setItems,
            resetItems: this.resetItems,
            insertContent: this.insertContent,
            prefillItems: this.prefillItems,
            setState: this.setStateHandler,
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
