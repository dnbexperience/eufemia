/**
 * Web Pagination Component
 *
 */

import React, { useContext, useEffect } from 'react'
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
import Context from '../../shared/Context'
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

const PaginationBar = (innerProps: PaginationBarProps) => {
  const context = useContext(PaginationContext)
  const { currentPage, pageCount, disabled, skeleton } = context.pagination

  // because of accessibility
  const focusPage = () => {
    const { onPageUpdate } = context.pagination
    const { contentRef } = innerProps

    onPageUpdate(() => {
      try {
        const elem = contentRef.current
        elem.focus()
      } catch (e) {
        //
      }
    })
  }

  const keepPageHeight = () => {
    try {
      const elem = innerProps.contentRef.current
      const pageHeight = elem.offsetHeight
      elem.style.height = `${pageHeight / 16}rem`
      elem.style.minHeight = elem.style.height // because of the "min-height: inherit;" in &__indicator
    } catch (e) {
      //
    }

    const { onPageUpdate } = context.pagination

    onPageUpdate(() => {
      try {
        const elem = innerProps.contentRef.current
        elem.style.height = 'auto'
        elem.style.minHeight = elem.style.height
      } catch (e) {
        //
      }
    })
  }

  const setPage = (currentPage, event = null) => {
    keepPageHeight()
    focusPage()

    const { setState: setContextState, updatePageContent } =
      context.pagination
    setContextState({
      currentPage,
    })
    updatePageContent(currentPage)

    dispatchCustomElementEvent(context.pagination, 'on_change', {
      page: currentPage, // deprecated
      pageNo: currentPage, // deprecated
      pageNumber: currentPage,
      ...context.pagination,
      event,
    })
  }

  const setPrevPage = () => {
    setPage(context.pagination.currentPage - 1)
  }
  const setNextPage = () => {
    setPage(context.pagination.currentPage + 1)
  }

  const clickHandler = ({ pageNumber, event }) => {
    setPage(pageNumber, event)
  }

  const { getTranslation } = useContext(Context)
  const { button_title, prev_title, next_title, more_pages } =
    extendPropsWithContext(
      { ...defaultProps, ...innerProps },
      defaultProps,
      getTranslation(innerProps).Pagination
    )

  // our states

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
            on_click={setPrevPage}
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
            on_click={setNextPage}
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
              on_click={(event) => clickHandler({ pageNumber, event })}
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
                  aria-current={pageNumber === currentPage ? 'page' : null}
                  on_click={(event) => clickHandler({ pageNumber, event })}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PaginationBar
