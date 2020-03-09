/**
 * Web Pagination Component
 *
 */

import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
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
    ])
  }

  static defaultProps = {
    accumulateCount: 0,
    originalPageCount: null
  }

  render() {
    const {
      items,
      currentPage,
      pageCount,
      accumulateCount,
      originalPageCount,
      getNewContent,
      useLoadButton
    } = this.props

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
            return (
              <Fragment key={pageNo}>
                <div ref={ref} className="dnb-pagination__page">
                  {hasContent &&
                    position === 'before' &&
                    pageNo > 1 &&
                    pageNo <= currentPage && (
                      <InfinityLoadButton
                        icon="arrow_up"
                        pageNo={pageNo - 1}
                        onClick={pageNoVisible => {
                          for (let i = 0; i <= accumulateCount; ++i) {
                            getNewContent(pageNoVisible + i, {
                              position: 'before',
                              skipObserver: true
                            })
                          }
                        }}
                      />
                    )}

                  {content}

                  {hasContent && !useLoadButton && !skipObserver && (
                    <InfinityMarker
                      pageNo={pageNo}
                      callOnVisible={accumulateCount > pageNo}
                      onVisible={pageNoVisible => {
                        for (let i = 0; i <= accumulateCount; ++i) {
                          getNewContent(pageNoVisible + i, {
                            position: 'after',
                            skipObserver: i < accumulateCount
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
                </div>
              </Fragment>
            )
          }
        )}

        {items.length === 0 && (
          <InfinityMarker
            pageNo={currentPage}
            onVisible={pageNoVisible => {
              getNewContent(pageNoVisible, {
                position: currentPage > 1 ? 'before' : 'after'
              })
            }}
          />
        )}
      </>
    )
  }
}

class InfinityMarker extends PureComponent {
  static propTypes = {
    pageNo: PropTypes.number.isRequired,
    onVisible: PropTypes.func.isRequired,
    callOnVisible: PropTypes.bool
  }
  static defaultProps = {
    callOnVisible: false
  }
  // state = { isConnected: false }

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
    this.intersectionObserver?.observe(this._ref.current)
  }

  componentWillUnmount() {
    this.intersectionObserver?.disconnect()
  }

  callReady() {
    // this.setState({ isConnected: true })
    this.props.onVisible(this.props.pageNo)
    this.intersectionObserver?.disconnect()
  }

  render() {
    return (
      <div
        className={classnames(
          'dnb-pagination__marker'
          // this.state.isConnected && 'dnb-pagination__marker--done'
        )}
        ref={this._ref}
      >
        {/* page: {this.props.pageNo} */}
      </div>
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
