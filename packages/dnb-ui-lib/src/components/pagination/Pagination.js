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
  // processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import { calculatePagination } from './paginationCalculation'
import {
  InfinityMarker,
  InfinityLoadButton,
  PaginationBar,
  ContentObject,
  detectScrollDirection
} from './PaginationHelpers'

const renderProps = {
  on_change: null
}

const propTypes = {
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enable_infinity_scroll: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_progress_indicator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  use_load_button: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  on_change: PropTypes.func
}
const defaultProps = {
  enable_infinity_scroll: false,
  show_progress_indicator: false,
  use_load_button: false,
  align: 'left',
  current_page: null,
  page_count: null, // TODO: has to work if set to 0
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
        state.pageCount = parseFloat(props.page_count)
      }
      if (props.current_page !== null) {
        state.currentPage = parseFloat(props.current_page)
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this.state = {
      items: [],
      scrollDirection: 'down',
      isLoading: false,
      _listenForPropChanges: true
    }

    this.useInfinity = isTrue(props.enable_infinity_scroll)
    this.showIndicator = isTrue(props.show_progress_indicator)
    this.useLoadButton = isTrue(props.use_load_button)

    if (!parseFloat(props.current_page) > -1) {
      this.state.currentPage = 1
    }
    if (!parseFloat(props.page_count) > -1) {
      this.state.pageCount = 1
    }
  }

  componentDidMount() {
    if (this.useInfinity) {
      detectScrollDirection(scrollDirection => {
        this.setState({
          scrollDirection,
          _listenForPropChanges: false
        })
      })
    }
  }

  getNewContent = (newPageNo, { position = 'after', ...props } = {}) => {
    const exists =
      this.state.items.findIndex(cObj => {
        return cObj.pageNo === newPageNo
      }) > -1
    if (exists) {
      return // stop here!
    }

    const items = [...this.state.items]

    const obj = {
      pageNo: newPageNo,
      position,
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
      currentPage: newPageNo,
      _listenForPropChanges: false
    })

    const { on_change } = this.props
    on_change(newPageNo, this.handleNewContent)
  }

  handleNewContent = newContent => {
    if (!Array.isArray(newContent)) {
      return console.warn(
        'The returned pagination content updater has to be an array!'
      )
    }

    const pageNo = newContent[0]
    newContent = newContent[1]

    const currentPage = this.state.items.find(
      ({ pageNo: p }) => p === pageNo
    )

    if (currentPage) {
      let content = null
      if (typeof newContent === 'function') {
        content = newContent()
      } else if (React.isValidElement(newContent)) {
        content = newContent
      }

      if (content) {
        const contentObject = currentPage.insert(content)

        this.setState(
          {
            updatedPageNo: pageNo, // only to rerender
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
    const { on_change } = this.props
    on_change(currentPage, this.handleNewContent)
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
      className,
      class: _className,

      page_count: _page_count, // eslint-disable-line
      current_page: _current_page, // eslint-disable-line

      ...attributes
    } = props

    const { currentPage, pageCount, items } = this.state
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

    return (
      <div {...mainParams}>
        <div className="dnb-pagination__content">
          {children}
          {items.length > 0 && (
            <ul>
              {items.map(
                ({ pageNo, content, ref, position, skipObserver }) => {
                  return (
                    <li key={pageNo} ref={ref}>
                      {this.useInfinity &&
                        position === 'before' &&
                        pageNo > 1 && (
                          <InfinityLoadButton
                            icon="arrow_up"
                            pageNo={pageNo - 1}
                            onClick={pageNoVisible => {
                              this.getNewContent(pageNoVisible, {
                                position: 'before',
                                skipObserver: true
                              })
                            }}
                          />
                        )}

                      {content}

                      {this.useLoadButton &&
                        pageNo >= currentPage &&
                        (parseFloat(this.props.page_count) > 0
                          ? pageNo < pageCount
                          : true) && (
                          <InfinityLoadButton
                            icon="arrow_down"
                            pageNo={pageNo + 1}
                            onClick={pageNoVisible => {
                              this.getNewContent(pageNoVisible, {
                                position: 'after',
                                skipObserver: true
                              })
                            }}
                          />
                        )}

                      {this.useInfinity &&
                        !this.useLoadButton &&
                        !skipObserver && (
                          <InfinityMarker
                            pageNo={pageNo}
                            onVisible={pageNoVisible => {
                              switch (this.state.scrollDirection) {
                                case 'up':
                                  if (pageNoVisible > 0) {
                                    this.getNewContent(pageNoVisible - 1, {
                                      position: 'before'
                                    })
                                  }
                                  break
                                case 'down':
                                  this.getNewContent(pageNoVisible + 1, {
                                    position: 'after'
                                  })
                                  break
                              }
                            }}
                          />
                        )}
                    </li>
                  )
                }
              )}
            </ul>
          )}

          {this.useInfinity && items.length === 0 && (
            <InfinityMarker
              pageNo={currentPage}
              onVisible={pageNoVisible => {
                this.getNewContent(pageNoVisible, {
                  position: currentPage > 1 ? 'before' : 'after'
                })
              }}
            />
          )}
        </div>
        {!this.useInfinity && (
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
        )}
      </div>
    )
  }
}
