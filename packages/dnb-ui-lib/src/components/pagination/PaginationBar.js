/**
 * Web Pagination Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  dispatchCustomElementEvent,
  extendPropsWithContext
} from '../../shared/component-helper'

import { calculatePagination } from './PaginationCalculation'
import PaginationContext from './PaginationContext'

import Button from '../button/Button'

const propTypes = {
  contentRef: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
}
const defaultProps = {
  contentRef: null,
  children: null,
  button_title: null,
  prev_title: null,
  next_title: null
}

export default class PaginationBar extends PureComponent {
  static contextType = PaginationContext
  static propTypes = propTypes
  static defaultProps = defaultProps

  componentDidMount() {
    this.callChildrenCallabck(this.context.pagination.currentPage)
  }

  hasChildrenCallabck() {
    return typeof this.props.children === 'function'
  }

  callChildrenCallabck(pageNo) {
    if (this.hasChildrenCallabck()) {
      const items = this.context.pagination.prefillItems(
        this.context.pagination.currentPage,
        {
          skipObserver: true
        }
      )
      this.context.pagination.setState({
        items
      })

      this.props.children({
        pageNo,
        page: pageNo,
        ...this.context.pagination
      })
    }
  }

  keepPageHeight() {
    const elem = this.props.contentRef.current
    if (elem) {
      try {
        const pageHeight = elem.offsetHeight
        elem.style.height = `${pageHeight / 16}rem`
        elem.style.minHeight = elem.style.height // because of the "min-height: inherit;" in &__indicator
      } catch (e) {
        //
      }
      this.context.pagination.onPageUpdate(() => {
        try {
          elem.style.height = 'auto'
          elem.style.minHeight = elem.style.height
        } catch (e) {
          //
        }
      })
    }
  }

  setPage = (currentPage, event = null) => {
    this.keepPageHeight()

    let items = this.context.pagination.items

    if (this.hasChildrenCallabck()) {
      items = this.context.pagination.prefillItems(currentPage, {
        skipObserver: true
      })
    }

    dispatchCustomElementEvent(this.context.pagination, 'on_change', {
      page: currentPage,
      pageNo: currentPage,
      ...this.context.pagination,
      event
    })

    this.callChildrenCallabck(currentPage)

    this.context.pagination.setState({
      items,
      currentPage
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
      defaultProps,
      this.context.translation.Pagination
    )

    const { button_title, prev_title, next_title } = props

    // our states
    const { pageCount, currentPage } = this.context.pagination

    const prevIsDisabled = currentPage === 1
    const nextIsDisabled = currentPage === pageCount || pageCount === 0

    const pages = calculatePagination(pageCount, currentPage)

    return (
      <div className="dnb-pagination__bar">
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
          {pages[0].map(pageNo => (
            <Button
              key={pageNo}
              className="dnb-pagination__button"
              size="medium"
              text={String(pageNo)}
              title={button_title.replace('%s', pageNo)}
              variant={pageNo === currentPage ? 'primary' : 'secondary'}
              aria-current={pageNo === currentPage ? 'page' : null}
              on_click={event => this.clickHandler({ pageNo, event })}
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
                  title={button_title.replace('%s', pageNo)}
                  variant={
                    pageNo === currentPage ? 'primary' : 'secondary'
                  }
                  aria-current={pageNo === currentPage ? 'page' : null}
                  on_click={event => this.clickHandler({ pageNo, event })}
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
