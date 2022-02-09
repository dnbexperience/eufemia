/**
 * Web Pagination Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'

import {
  calculatePagination,
  getDotsAriaLabel,
} from './PaginationCalculation'
import PaginationContext from './PaginationContext'

import Button from '../button/Button'

interface PaginationBarProps {
  /**
   * The title used in every button shown in the bar. Defaults to Side %s.
   */
  button_title: string
  /**
   *  The title used in the previous page button. Defaults to Forrige side.
   */
  prev_title: string
  /**
   *  The title used in the next page button. Defaults to Neste side.
   */
  next_title: string
  /**
   * The title used in the dots. Relevant for screen-readers. Defaults to %s flere sider.
   */
  more_pages: string
  /**
   * Reference to the parent component. Used to contain height between updates.
   */
  contentRef: React.RefObject<any>
  /**
   *  the given content can be either a function or a React node, depending on your needs. A function contains several helper functions. More details down below and have a look at the examples in the demos section.
   */
  children: React.ReactNode
}

const defaultProps = {
  button_title: null,
  prev_title: null,
  next_title: null,
  more_pages: null,
  contentRef: null,
  children: null,
}

export default class PaginationBar extends React.PureComponent<PaginationBarProps> {
  static contextType = PaginationContext
  static defaultProps = { ...defaultProps }

  componentDidMount() {
    const context = this.context.pagination
    const currentPage = context.startupPage || context.currentPage || 1
    const items = context.prefillItems(currentPage, {
      skipObserver: true,
    })

    context.setState({
      currentPage,
      items,
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
      currentPage,
    })
    this.context.pagination.updatePageContent(currentPage)

    dispatchCustomElementEvent(this.context.pagination, 'on_change', {
      page: currentPage, // deprecated
      pageNo: currentPage, // deprecated
      pageNumber: currentPage,
      ...this.context.pagination,
      event,
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
    const { pageCount, currentPage, disabled, skeleton } =
      this.context.pagination

    const prevIsDisabled = currentPage === 1
    const nextIsDisabled = currentPage === pageCount || pageCount === 0

    const pageNumberGroups = calculatePagination(pageCount, currentPage)

    return (
      <div
        className={classnames(
          'dnb-pagination__bar',
          pageCount >= 8 && 'dnb-pagination--many-pages'
        )}
      >
        <div className="dnb-pagination__bar__wrapper">
          <div className="dnb-pagination__bar__skip">
            <Button
              key="left-arrow"
              disabled={disabled || prevIsDisabled}
              skeleton={skeleton}
              variant="tertiary"
              icon="chevron_left"
              icon_position="left"
              text={prev_title}
              on_click={this.setPrevPage}
              title={prevIsDisabled ? null : prev_title}
            />

            <Button
              key="right-arrow"
              disabled={disabled || nextIsDisabled}
              skeleton={skeleton}
              variant="tertiary"
              size="small"
              icon="chevron_right"
              icon_position="right"
              text={next_title}
              on_click={this.setNextPage}
              title={nextIsDisabled ? null : next_title}
            />
          </div>

          <div className="dnb-pagination__bar__inner">
            {pageNumberGroups[0].map((pageNumber) => (
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

            {pageNumberGroups.slice(1).map((numbersList, idx) => (
              <React.Fragment key={idx}>
                <div
                  key={`dots-${idx}`}
                  className="dnb-pagination__dots"
                  aria-label={getDotsAriaLabel({
                    more_pages,
                    numbersList,
                    pageNumberGroups,
                  })}
                >
                  <div key="dot-1" />
                  <div key="dot-2" />
                  <div key="dot-3" />
                </div>
                {numbersList.map((pageNumber) => (
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
                    aria-current={
                      pageNumber === currentPage ? 'page' : null
                    }
                    on_click={(event) =>
                      this.clickHandler({ pageNumber, event })
                    }
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    )
  }
}
