/**
 * Web Pagination Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  // processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Button from '../button/Button'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import { calculatePagination } from './paginationCalculation'
// import { Dots, StyledPagination } from './mockPagination.styles'

const renderProps = {
  on_change: null
}

const propTypes = {
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enable_infinity_scroll: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_progress_indicator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  align: PropTypes.string,
  button_title: PropTypes.string,
  is_loading: PropTypes.string,
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  on_change: PropTypes.func
}
const defaultProps = {
  enable_infinity_scroll: false,
  show_progress_indicator: false,
  align: 'center',
  current_page: null,
  page_count: null, // TODO: has to work if set to 0
  class: null,
  button_title: '%s',
  is_loading: 'Loading ...',
  prev_title: 'Previous',
  next_title: 'Next',

  // React props
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Pagination extends PureComponent {
  static tagName = 'dnb-pagination'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Pagination.tagName, Pagination, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.page_count !== null) {
        state.pageCount = parseFloat(props.page_count)
      }
      if (props.current_page !== null) {
        state.currentPage = parseFloat(props.current_page)
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      _listenForPropChanges: true
    }

    this.useInfinity = isTrue(props.enable_infinity_scroll)
    this.showIndicator = isTrue(props.show_progress_indicator)

    // if (!this.useInfinity) {
    // set some defaults
    // }
    if (!parseFloat(props.current_page) > -1) {
      this.state.currentPage = 1
    }
    if (!parseFloat(props.page_count) > -1) {
      this.state.pageCount = 1
    }
  }

  setPage = currentPage => {
    this.setState({
      currentPage,
      _listenForPropChanges: false
    })
    const { on_change } = this.props
    on_change(currentPage)
  }

  setPrevPage = () => {
    this.setPage(this.state.currentPage - 1)
  }
  setNextPage = () => {
    this.setPage(this.state.currentPage + 1)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.Pagination
    )

    const {
      align,
      children,
      className,
      class: _className,

      page_count: _page_count, // eslint-disable-line
      current_page: _current_page, // eslint-disable-line

      ...attributes
    } = props

    const { currentPage, pageCount, isLoading } = this.state
    const pages = calculatePagination(pageCount, currentPage)

    const mainParams = {
      className: classnames(
        'dnb-pagination',
        align && `dnb-pagination--${align}`,
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    validateDOMAttributes(props, mainParams)

    return (
      <div {...mainParams}>
        {this.useInfinity && <InfinityMarker />}
        {children}
        <PaginationBar
          pages={pages}
          pageCount={pageCount}
          currentPage={currentPage}
          setPage={this.setPage}
          setPrevPage={this.setPrevPage}
          setNextPage={this.setNextPage}
          buttonTitle={props.button_title}
          prevTitle={props.prev_title}
          nextTitle={props.next_title}
        />
        {isLoading && this.showIndicator && (
          <>
            <ProgressIndicator />
            {props.is_loading}
          </>
        )}
      </div>
    )
  }
}

const InfinityMarker = () => {
  return <span>hide me</span>
}

const PaginationBar = ({
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
    <>
      <Button
        // key="left-arrow"
        className="dnb-pagination__button"
        disabled={prevIsDisabled}
        size="small"
        icon="chevron_left"
        on_click={setPrevPage}
        title={prevIsDisabled ? null : prevTitle}
      />
      {pages[0].map(pageNo => (
        <Button
          key={pageNo}
          className="dnb-pagination__button"
          size="medium"
          text={pageNo}
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
              text={pageNo}
              title={buttonTitle.replace('%s', pageNo)}
              variant={pageNo === currentPage ? 'primary' : 'secondary'}
              on_click={() => {
                setPage(pageNo)
              }}
            />
          ))}
        </React.Fragment>
      ))}
      <Button
        // key="right-arrow"
        className="dnb-pagination__button"
        disabled={nextIsDisabled}
        size="small"
        icon="chevron_right"
        on_click={setNextPage}
        title={nextIsDisabled ? null : nextTitle}
      />
    </>
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
