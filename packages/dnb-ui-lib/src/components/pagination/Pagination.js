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

import Button from '../button/Button'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import { calculatePagination } from './paginationCalculation'

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
  align: PropTypes.string,
  button_title: PropTypes.string,
  is_loading: PropTypes.string,
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
  align: 'center',
  current_page: null,
  page_count: null, // TODO: has to work if set to 0
  class: null,
  button_title: '%s',
  is_loading: 'Loading ...',
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

    // if (!this.useInfinity) {
    // set some defaults
    // }
    if (!parseFloat(props.current_page) > -1) {
      this.state.currentPage = 1
    }
    if (!parseFloat(props.page_count) > -1) {
      this.state.pageCount = 1
    }

    // this._refContent = React.createRef()
  }

  componentDidMount() {
    // if (this.useInfinity) {
    // this.setPage(2)
    // setTimeout(() => {
    //   this.setPage(1)
    // }, 1e3)
    // }
    // this.intersectionObserver.observe(this.props.contentElement)
    // this.intersectionObserver.observe(this._ref.current)
    if (this.useInfinity) {
      detectScrollDirection(scrollDirection => {
        // console.log('onVisible direction', scrollDirection)
        this.setState({
          scrollDirection,
          _listenForPropChanges: false
        })
      })
    }
  }

  getNewContent = (newPageNo, position = 'after', onInsert = null) => {
    console.log('onVisible setPage', newPageNo)

    const exists =
      this.state.items.findIndex(cObj => {
        return cObj.pageNo === newPageNo
      }) > -1
    if (exists) {
      return // stop here!
    }

    const items = [...this.state.items]

    // const x =
    // if (reoder) {
    //   items = items.sort((A, B) => {
    //     console.log('onVisible A', A.pageNo)
    //     return A.pageNo > B.pageNo ? 1 : -1
    //   })
    // }

    switch (position) {
      case 'before':
        items.unshift(new ContentObject({ pageNo: newPageNo, onInsert }))
        break
      case 'after':
        items.push(new ContentObject({ pageNo: newPageNo, onInsert }))
        break
    }

    this.setState({
      items,
      currentPage: newPageNo,
      // isLoading: true,
      _listenForPropChanges: false
    })

    const { on_change } = this.props
    on_change(newPageNo, this.handleNewContent)
  }

  handleNewContent = newContent => {
    if (!Array.isArray(newContent)) {
      return console.log(
        'The returned pagination content updater has to be an array!'
      )
    }

    const pageNo = newContent[0]
    newContent = newContent[1]

    // console.log('handleNewContent pageNo', pageNo)

    // const items = [...this.state.items] // make a copy so react is handling the DOM update
    // if (pageNo < this.state.currentPage) {
    //   items.unshift({ pageNo, content })
    // } else {
    // }

    const currentPage = this.state.items.find(
      ({ pageNo: p }) => p === pageNo
    )

    // setTimeout(() => {
    if (currentPage) {
      let content = null
      if (typeof newContent === 'function') {
        content = newContent()
      } else if (React.isValidElement(newContent)) {
        content = newContent
      }

      if (content) {
        currentPage.insert(content)

        this.setState({
          updatedPageNo: pageNo, // only to rerender
          // items,
          // isLoading: false,
          _listenForPropChanges: false
        })
      }

      // items
      //   .push({ pageNo, content })
      //   .sort(({ pageNo: a }, { pageNo: b }) => {
      //     return a > b ? 1 : -1
      //   })
    }
    // }, 2e3)
  }

  setPage = currentPage => {
    this.setState({
      currentPage,
      // isLoading: true,
      _listenForPropChanges: false
    })
    const { on_change } = this.props
    on_change(currentPage)
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

    const {
      currentPage,
      pageCount,
      items,
      prerender
      // isLoading,
      // updatedPageNo
    } = this.state
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
    // console.log('items', items)

    return (
      <div {...mainParams}>
        <div
          className="dnb-pagination__content"
          // ref={this._refContent}
        >
          {children}
          {/* only for rerendering */}
          {/* {updatedPageNo} */}
          {items && (
            <ul>
              {items.map(({ pageNo, content }) => {
                // console.log('onVisible pageNo', pageNo)
                return (
                  <li key={pageNo}>
                    {content}
                    {this.useInfinity && (
                      <InfinityMarker
                        pageNo={pageNo}
                        onVisible={pageNoVisible => {
                          // console.log(
                          //   'onVisible',
                          //   this.state.scrollDirection,
                          //   pageNoVisible
                          // )
                          switch (this.state.scrollDirection) {
                            case 'up':
                              this.getNewContent(
                                pageNoVisible - 1,
                                'before'
                              )
                              break
                            case 'down':
                              this.getNewContent(
                                pageNoVisible + 1,
                                'after'
                              )
                              break
                          }
                        }}
                        // contentElement={this._refContent.current}
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          )}

          {this.useInfinity && items.length === 0 && (
            <InfinityMarker
              pageNo={currentPage}
              onVisible={pageNoVisible => {
                console.log(
                  'onVisible startup ',
                  this.state.scrollDirection,
                  pageNoVisible
                )

                // TODO: set scroll position!
                // this.lastScrollPosition =
                //   typeof window !== 'undefined' ? window.pageYOffset : 0

                // const top = this.lastScrollPosition
                // window.scrollTop = top

                this.getNewContent(pageNoVisible, 'after')

                if (currentPage > 1) {
                  setTimeout(() => {
                    this.getNewContent(pageNoVisible - 1, 'before', () => {
                      // console.log('onVisible content ->', content)
                      // const Prerender = content
                      // const ref = React.createRef()
                      // this.setState({
                      //   prerender: () => <Prerender ref={ref} />,
                      //   _listenForPropChanges: false
                      // })
                      // console.log('onVisible content -> ref', ref)
                      // const top = this.lastScrollPosition
                      if (typeof window !== 'undefined') {
                        window.scrollTop = top
                      }
                    })
                  }, 2e3)
                }
              }}
              // contentElement={this._refContent.current}
            />
            // <InfinityMarker contentElement={this._refContent.current} />
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

class InfinityMarker extends PureComponent {
  state = { isConnected: false }
  constructor(props) {
    super(props)
    this._ref = React.createRef()

    // console.log('this._ref.current', this._ref.current)

    try {
      this.intersectionObserver = new IntersectionObserver(
        entries => {
          const [{ isIntersecting }] = entries
          if (isIntersecting) {
            // console.log('intersectionObserver: is visible')
            this.callReady()
          } else {
            // console.log('intersectionObserver: not visible')
          }

          // if (entries[0].intersectionRatio <= 0) {
          //   console.log('intersectionObserver: not visible')
          //   return
          // }
          // console.log('intersectionObserver: is visible')
        }
        // {
        //   // root: document.querySelector('.dnb-pagination')
        //   // root: document.querySelector('body'),
        //   // root: document.documentElement,
        //   // root: document.documentElement,
        //   // rootMargin: '0px 0px 20% 0px'
        //   // threshold: [0.0, 0.5, 1]
        //   // rootMargin: '0px 0px 50% 0px'
        //   // rootMargin: '90% 0px 0px 0px'
        //   // rootMargin: '-50% 0px 0px 0px'
        //   // threshold: 0.5 // half of item height
        // }
      )
      // console.log('intersectionObserver', intersectionObserver)
    } catch (e) {
      console.warn('IntersectionObserver is not supported!', e)
    }
  }

  componentDidMount() {
    // this.intersectionObserver.observe(this.props.contentElement)
    this.intersectionObserver.observe(this._ref.current)
  }

  componentWillUnmount() {
    this.intersectionObserver.disconnect()
  }

  callReady() {
    this.setState({ isConnected: true })
    this.props.onVisible(this.props.pageNo)
    this.intersectionObserver.disconnect()
  }

  render() {
    return (
      <div
        className={classnames(
          'dnb-pagination__marker',
          this.state.isConnected && 'dnb-pagination__marker--done'
        )}
        ref={this._ref}
      >
        page: {this.props.pageNo}
      </div>
    )
  }
}

const PaginationBar = ({
  pages,
  pageCount,
  currentPage,
  setPage,
  setPrevPage,
  setNextPage,
  buttonTitle,
  prevTitle,
  nextTitle
}) => {
  const prevIsDisabled = currentPage === 1
  const nextIsDisabled = currentPage === pageCount || pageCount === 0
  return (
    <div className="dnb-pagination__bar">
      <Button
        // key="left-arrow"
        className="dnb-pagination__button"
        disabled={prevIsDisabled}
        size="small"
        icon="chevron_left"
        on_click={setPrevPage}
        title={prevIsDisabled ? null : prevTitle}
      />
      {pages[0].map(pageNo => (
        <Button
          key={pageNo}
          className="dnb-pagination__button"
          size="medium"
          text={String(pageNo)}
          title={buttonTitle.replace('%s', pageNo)}
          variant={pageNo === currentPage ? 'primary' : 'secondary'}
          on_click={() => {
            setPage(pageNo)
          }}
        />
      ))}
      {pages.slice(1).map((list, idx) => (
        <React.Fragment key={idx}>
          <div key={`dots-${idx}`} className="dnb-pagination__dots">
            <div key="dot-1" />
            <div key="dot-2" />
            <div key="dot-3" />
          </div>
          {list.map(pageNo => (
            <Button
              key={pageNo}
              className="dnb-pagination__button"
              size="medium"
              text={String(pageNo)}
              title={buttonTitle.replace('%s', pageNo)}
              variant={pageNo === currentPage ? 'primary' : 'secondary'}
              on_click={() => {
                setPage(pageNo)
              }}
            />
          ))}
        </React.Fragment>
      ))}
      <Button
        // key="right-arrow"
        className="dnb-pagination__button"
        disabled={nextIsDisabled}
        size="small"
        icon="chevron_right"
        on_click={setNextPage}
        title={nextIsDisabled ? null : nextTitle}
      />
    </div>
  )
}
PaginationBar.propTypes = {
  pages: PropTypes.array.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  setPrevPage: PropTypes.func.isRequired,
  setNextPage: PropTypes.func.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  prevTitle: PropTypes.string.isRequired,
  nextTitle: PropTypes.string.isRequired
}

class PaginationIndicator extends PureComponent {
  static contextType = Context
  render() {
    return (
      <div className="dnb-pagination__indicator">
        <ProgressIndicator />
        {this.context.translation.Pagination.is_loading}
      </div>
    )
  }
}

class ContentObject {
  constructor({ pageNo, onInsert }) {
    this.content = <PaginationIndicator />
    this.pageNo = pageNo
    this.onInsert = onInsert
  }
  insert(content) {
    this.content = content
    if (typeof this.onInsert === 'function') {
      this.onInsert({ content })
    }
  }
}

function detectScrollDirection(cb, direction = null) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return cb('down')
  }
  let last = 0,
    current,
    position
  try {
    window.addEventListener(
      'scroll',
      () => {
        position = window.pageYOffset || document.documentElement.scrollTop
        current = position > last ? 'down' : 'up'
        if (current && current !== direction) {
          direction = current
          cb(current)
        }
        last = position <= 0 ? 0 : position // secure negative scrolling on mobile
      },
      false
    )
  } catch (e) {
    console.log('Error in detectScrollDirection', e)
  }
}
