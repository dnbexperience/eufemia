/**
 * Web Pagination Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  dispatchCustomElementEvent,
  extendPropsWithContext
} from '../../shared/component-helper'

import {
  calculatePagination,
  getDotsAriaLabel
} from './PaginationCalculation'
import PaginationContext from './PaginationContext'

import Button from '../button/Button'

export default class PaginationBar extends React.PureComponent {
  static contextType = PaginationContext

  static propTypes = {
    button_title: PropTypes.string, // eslint-disable-line
    prev_title: PropTypes.string, // eslint-disable-line
    next_title: PropTypes.string, // eslint-disable-line
    more_pages: PropTypes.string, // eslint-disable-line
    contentRef: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]) // eslint-disable-line
  }
  static defaultProps = {
    button_title: null,
    prev_title: null,
    next_title: null,
    more_pages: null,
    contentRef: null,
    children: null
  }

  componentDidMount() {
    const context = this.context.pagination
    const currentPage = context.startupPage || context.currentPage
    const items = context.prefillItems(currentPage, {
      skipObserver: true
    })

    context.setState({
      currentPage,
      items
    })

    context.updatePageContent(currentPage)
  }

  // because of accessibility
  focusPage() {
    this.context.pagination.onPageUpdate(() => {
      try {
        const elem = this.props.contentRef.current
        elem.focus()
      } catch (e) {
        //
      }
    })
  }

  keepPageHeight() {
    try {
      const elem = this.props.contentRef.current
      const pageHeight = elem.offsetHeight
      elem.style.height = `${pageHeight / 16}rem`
      elem.style.minHeight = elem.style.height // because of the "min-height: inherit;" in &__indicator
    } catch (e) {
      //
    }

    this.context.pagination.onPageUpdate(() => {
      try {
        const elem = this.props.contentRef.current
        elem.style.height = 'auto'
        elem.style.minHeight = elem.style.height
      } catch (e) {
        //
      }
    })
  }

  setPage = (currentPage, event = null) => {
    this.keepPageHeight()
    this.focusPage()

    this.context.pagination.setState({
      currentPage
    })
    this.context.pagination.updatePageContent(currentPage)

    dispatchCustomElementEvent(this.context.pagination, 'on_change', {
      page: currentPage, // deprecated
      pageNo: currentPage, // deprecated
      pageNumber: currentPage,
      ...this.context.pagination,
      event
    })
  }

  setPrevPage = () => {
    this.setPage(this.context.pagination.currentPage - 1)
  }
  setNextPage = () => {
    this.setPage(this.context.pagination.currentPage + 1)
  }

  clickHandler = ({ pageNumber, event }) => {
    this.setPage(pageNumber, event)
  }

  render() {
    const props = extendPropsWithContext(
      this.props,
      PaginationBar.defaultProps,
      this.context.getTranslation(this.props).Pagination
    )

    const { button_title, prev_title, next_title, more_pages } = props

    // our states
    const {
      pageCount,
      currentPage,
      disabled,
      skeleton
    } = this.context.pagination

    const prevIsDisabled = currentPage === 1
    const nextIsDisabled = currentPage === pageCount || pageCount === 0

    const pages = calculatePagination(pageCount, currentPage)

    return (
      <div
        className={classnames(
          'dnb-pagination__bar',
          pageCount >= 8 && 'dnb-pagination--many-pages'
        )}
      >
        <Button
          key="left-arrow"
          className="dnb-pagination__button"
          disabled={disabled || prevIsDisabled}
          skeleton={skeleton}
          size="small"
          icon="chevron_left"
          on_click={this.setPrevPage}
          title={prevIsDisabled ? null : prev_title}
        />

        <div className="dnb-pagination__bar__inner">
          {pages[0].map((pageNumber) => (
            <Button
              key={pageNumber}
              className="dnb-pagination__button"
              size="medium"
              text={String(pageNumber)}
              aria-label={button_title.replace('%s', pageNumber)}
              variant={
                pageNumber === currentPage ? 'primary' : 'secondary'
              }
              disabled={disabled}
              skeleton={skeleton}
              aria-current={pageNumber === currentPage ? 'page' : null}
              on_click={(event) =>
                this.clickHandler({ pageNumber, event })
              }
            />
          ))}

          {pages.slice(1).map((list, idx) => (
            <React.Fragment key={idx}>
              <div
                key={`dots-${idx}`}
                className="dnb-pagination__dots"
                aria-label={getDotsAriaLabel({
                  more_pages,
                  list,
                  pages
                })}
              >
                <div key="dot-1" />
                <div key="dot-2" />
                <div key="dot-3" />
              </div>
              {list.map((pageNumber) => (
                <Button
                  key={pageNumber}
                  className="dnb-pagination__button"
                  size="medium"
                  text={String(pageNumber)}
                  aria-label={button_title.replace('%s', pageNumber)}
                  variant={
                    pageNumber === currentPage ? 'primary' : 'secondary'
                  }
                  disabled={disabled}
                  skeleton={skeleton}
                  aria-current={pageNumber === currentPage ? 'page' : null}
                  on_click={(event) =>
                    this.clickHandler({ pageNumber, event })
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </div>

        <Button
          key="right-arrow"
          className="dnb-pagination__button"
          disabled={disabled || nextIsDisabled}
          skeleton={skeleton}
          size="small"
          icon="chevron_right"
          on_click={this.setNextPage}
          title={nextIsDisabled ? null : next_title}
        />
      </div>
    )
  }
}
