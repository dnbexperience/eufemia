/**
 * Web Pagination Component
 *
 */

import React, { PureComponent } from 'react'
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
    scrollDirection: PropTypes.string.isRequired,
    getNewContent: PropTypes.func.isRequired,
    originalPageCount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  static defaultProps = {
    originalPageCount: null
  }

  render() {
    // console.log('props', JSON.stringify(this.props, null, 2))
    const {
      items,
      currentPage,
      pageCount,
      originalPageCount,
      getNewContent,
      useLoadButton,
      scrollDirection
    } = this.props

    return (
      <>
        {/* items are used by the infinity scroller */}
        {items.map(({ pageNo, content, ref, position, skipObserver }) => {
          return (
            <div key={pageNo} ref={ref} className="dnb-pagination__page">
              {position === 'before' && pageNo > 1 && (
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

              {useLoadButton &&
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

              {!useLoadButton && !skipObserver && (
                <InfinityMarker
                  pageNo={pageNo}
                  onVisible={pageNoVisible => {
                    switch (scrollDirection) {
                      case 'up':
                        if (pageNoVisible > 0) {
                          getNewContent(pageNoVisible - 1, {
                            position: 'before'
                          })
                        }
                        break
                      case 'down':
                        getNewContent(pageNoVisible + 1, {
                          position: 'after'
                        })
                        break
                    }
                  }}
                />
              )}
            </div>
          )
        })}

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
    onVisible: PropTypes.func.isRequired
  }
  // state = { isConnected: false }

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
