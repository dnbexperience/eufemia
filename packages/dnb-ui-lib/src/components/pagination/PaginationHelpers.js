/**
 * Web Pagination Helpers
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'

import Button from '../button/Button'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'

export class InfinityMarker extends PureComponent {
  static propTypes = {
    pageNo: PropTypes.number.isRequired,
    onVisible: PropTypes.func.isRequired
  }
  state = { isConnected: false }

  constructor(props) {
    super(props)
    this._ref = React.createRef()

    try {
      this.intersectionObserver = new IntersectionObserver(entries => {
        const [{ isIntersecting }] = entries
        if (isIntersecting) {
          this.callReady()
        }
      })
    } catch (e) {
      console.warn('IntersectionObserver is not supported!', e)
    }
  }

  componentDidMount() {
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

export class InfinityLoadButton extends PureComponent {
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

export const PaginationBar = ({
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
        key="left-arrow"
        className="dnb-pagination__button"
        disabled={prevIsDisabled}
        size="small"
        icon="chevron_left"
        on_click={setPrevPage}
        title={prevIsDisabled ? null : prevTitle}
      />
      <div className="dnb-pagination__bar__inner">
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
      </div>
      <Button
        key="right-arrow"
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

export class PaginationIndicator extends PureComponent {
  static contextType = Context
  render() {
    return (
      <div className="dnb-pagination__indicator">
        <ProgressIndicator />
        {this.context.translation.Pagination.is_loading_text}
      </div>
    )
  }
}

export class ContentObject {
  constructor({ pageNo, ...props }) {
    this.content = <PaginationIndicator />
    this.pageNo = pageNo
    for (let k in props) {
      this[k] = props[k]
    }
  }
  insert(content) {
    this.content = content
    if (typeof this.onInsert === 'function') {
      this.onInsert({ content, ref: this.ref })
    }
    return this
  }
}

export function detectScrollDirection(cb, direction = null) {
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
    console.warn('Error in detectScrollDirection', e)
  }
}
