/**
 * Web Pagination Component
 *
 */

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import Button from '../button/Button'

export default class InfinityScroller extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    useLoadButton: PropTypes.bool.isRequired,
    getNewContent: PropTypes.func.isRequired,
    accumulateCount: PropTypes.number,
    originalPageCount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    pageElement: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ]),
    markerElement: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ])
  }

  static defaultProps = {
    accumulateCount: 0,
    originalPageCount: null,
    pageElement: 'div',
    markerElement: 'div'
  }

  render() {
    const {
      items,
      currentPage,
      pageCount,
      accumulateCount,
      originalPageCount,
      getNewContent,
      useLoadButton,
      pageElement
    } = this.props

    let { markerElement } = this.props

    let Element = pageElement || Fragment
    let elementParams = null

    if (
      typeof Element === 'string' ||
      typeof Element === 'object' ||
      React.isValidElement(Element)
    ) {
      elementParams = {
        className: 'dnb-pagination__page'
      }
    }
    if (Element === 'tr') {
      markerElement = 'td'
    }

    return (
      <>
        {items.map(
          ({
            pageNo,
            hasContent,
            content,
            ref,
            position,
            skipObserver
          }) => {
            if (elementParams) {
              elementParams.ref = ref
            }

            return (
              <Element key={pageNo} {...elementParams}>
                {hasContent &&
                  position === 'before' &&
                  pageNo > 1 &&
                  pageNo <= currentPage && (
                    <InfinityLoadButton
                      icon="arrow_up"
                      pageNo={pageNo - 1}
                      onClick={pageNoVisible => {
                        getNewContent(pageNoVisible, {
                          position: 'before',
                          skipObserver: true
                        })
                      }}
                    />
                  )}

                {content}

                {hasContent && !useLoadButton && !skipObserver && (
                  <InfinityMarker
                    pageNo={pageNo}
                    markerElement={markerElement}
                    callOnVisible={accumulateCount > 0 && pageNo === 1}
                    onVisible={pageNoVisible => {
                      if (accumulateCount > 0) {
                        for (let i = 0; i <= accumulateCount; ++i) {
                          getNewContent(items.length + i, {
                            position: 'after',
                            skipObserver:
                              i !== Math.round(accumulateCount / 2)
                          })
                        }
                      } else {
                        getNewContent(pageNoVisible + 1, {
                          position: 'after'
                        })
                      }
                    }}
                  />
                )}

                {hasContent &&
                  useLoadButton &&
                  pageNo >= currentPage &&
                  (parseFloat(originalPageCount) > 0
                    ? pageNo < pageCount
                    : true) && (
                    <InfinityLoadButton
                      icon="arrow_down"
                      pageNo={pageNo + 1}
                      onClick={pageNoVisible => {
                        getNewContent(pageNoVisible, {
                          position: 'after',
                          skipObserver: true
                        })
                      }}
                    />
                  )}
              </Element>
            )
          }
        )}

        {items.length === 0 && (
          <Element {...elementParams}>
            <InfinityMarker
              pageNo={currentPage}
              markerElement={markerElement}
              onVisible={pageNoVisible => {
                getNewContent(pageNoVisible, {
                  position: currentPage > 1 ? 'before' : 'after'
                })
              }}
            />
          </Element>
        )}
      </>
    )
  }
}

class InfinityMarker extends PureComponent {
  static propTypes = {
    pageNo: PropTypes.number.isRequired,
    onVisible: PropTypes.func.isRequired,
    markerElement: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ]),
    callOnVisible: PropTypes.bool
  }
  static defaultProps = {
    callOnVisible: false,
    markerElement: 'div'
  }
  state = { isConnected: false }

  constructor(props) {
    super(props)
    this._ref = React.createRef()

    if (props.callOnVisible) {
      this.callReady()
    } else if (typeof IntersectionObserver !== 'undefined') {
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
    this._isMounted = true
    if (this._ref.current) {
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
    const { markerElement: Element, callOnVisible } = this.props
    return this.state.isConnected || callOnVisible ? null : (
      <Element className="dnb-pagination__marker" ref={this._ref} />
    )
  }
}

class InfinityLoadButton extends PureComponent {
  static contextType = Context
  static propTypes = {
    icon: PropTypes.string.isRequired,
    pageNo: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  }
  static defaultProps = {
    icon: 'arrow_down'
  }
  onClickHandler = () => {
    const { pageNo } = this.props
    this.props.onClick(pageNo)
  }
  render() {
    const { icon } = this.props
    return (
      <div className="dnb-pagination__loadbar">
        <Button
          // className="dnb-pagination__load-button"
          size="medium"
          icon={icon}
          icon_position="left"
          text={this.context.translation.Pagination.load_button_text}
          variant="secondary"
          on_click={this.onClickHandler}
        />
      </div>
    )
  }
}
