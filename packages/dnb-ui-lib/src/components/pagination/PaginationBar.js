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
    contentRef: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }
  static defaultProps = {
    contentRef: null,
    children: null,
    button_title: null,
    prev_title: null,
    next_title: null,
    more_pages: null
  }

  componentDidMount() {
    const pgn = this.context.pagination
    const currentPage = pgn.startupPage || pgn.currentPage
    pgn.setState(
      {
        currentPage
      },
      () => this.preparePageContent(currentPage)
    )
  }

  hasChildrenCallabck() {
    return typeof this.props.children === 'function'
  }

  preparePageContent(pageNo) {
    const items = this.context.pagination.prefillItems(
      this.context.pagination.currentPage,
      {
        skipObserver: true
      }
    )
    this.context.pagination.setState({
      items
    })

    if (this.hasChildrenCallabck()) {
      const potentialElement = this.props.children({
        pageNo,
        page: pageNo,
        ...this.context.pagination
      })

      if (potentialElement && React.isValidElement(potentialElement)) {
        this.context.pagination.setContent([pageNo, potentialElement])
      }
    }
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
    this.preparePageContent(currentPage)

    dispatchCustomElementEvent(this.context.pagination, 'on_change', {
      page: currentPage,
      pageNo: currentPage,
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

  clickHandler = ({ pageNo, event }) => {
    this.setPage(pageNo, event)
  }

  render() {
    const props = extendPropsWithContext(
      this.props,
      PaginationBar.defaultProps,
      this.context.translation.Pagination
    )

    const { button_title, prev_title, next_title, more_pages } = props

    // our states
    const { pageCount, currentPage } = this.context.pagination

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
          disabled={prevIsDisabled}
          size="small"
          icon="chevron_left"
          on_click={this.setPrevPage}
          title={prevIsDisabled ? null : prev_title}
        />

        <div className="dnb-pagination__bar__inner">
          {pages[0].map((pageNo) => (
            <Button
              key={pageNo}
              className="dnb-pagination__button"
              size="medium"
              text={String(pageNo)}
              aria-label={button_title.replace('%s', pageNo)}
              variant={pageNo === currentPage ? 'primary' : 'secondary'}
              aria-current={pageNo === currentPage ? 'page' : null}
              on_click={(event) => this.clickHandler({ pageNo, event })}
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
              {list.map((pageNo) => (
                <Button
                  key={pageNo}
                  className="dnb-pagination__button"
                  size="medium"
                  text={String(pageNo)}
                  aria-label={button_title.replace('%s', pageNo)}
                  variant={
                    pageNo === currentPage ? 'primary' : 'secondary'
                  }
                  aria-current={pageNo === currentPage ? 'page' : null}
                  on_click={(event) =>
                    this.clickHandler({ pageNo, event })
                  }
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
          on_click={this.setNextPage}
          title={nextIsDisabled ? null : next_title}
        />
      </div>
    )
  }
}
