/**
 * Web Pagination Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'

export default class PaginationBar extends PureComponent {
  static propTypes = {
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
  render() {
    const {
      pages,
      pageCount,
      currentPage,
      setPage,
      setPrevPage,
      setNextPage,
      buttonTitle,
      prevTitle,
      nextTitle
    } = this.props

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
                  variant={
                    pageNo === currentPage ? 'primary' : 'secondary'
                  }
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
}
