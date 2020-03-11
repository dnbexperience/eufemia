/**
 * Web Pagination Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import PaginationContext from './PaginationContext'
import PaginationProvider from './PaginationProvider'
import {
  registerElement,
  validateDOMAttributes,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

const renderProps = {
  on_change: null,
  on_load: null
}

const propTypes = {
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  accumulate_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  mode: PropTypes.oneOf(['pagination', 'infinity']),
  use_load_button: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  hide_progress_indicator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  set_content_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  set_items_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  reset_items_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  page_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  fallback_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  marker_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  indicator_element: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string
  ]),
  align: PropTypes.string,
  class: PropTypes.string,

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    // PropTypes.array,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  on_change: PropTypes.func,
  on_load: PropTypes.func
}

const defaultProps = {
  current_page: null,
  page_count: null,
  mode: 'pagination',
  use_load_button: false,
  items: null,
  hide_progress_indicator: false,
  set_content_handler: null,
  set_items_handler: null,
  reset_items_handler: null,
  page_element: undefined,
  fallback_element: undefined,
  marker_element: undefined,
  indicator_element: undefined,
  align: 'left',
  accumulate_count: 0,
  class: null,

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
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(Pagination.tagName, Pagination, defaultProps)
  }

  render() {
    const { children, ...props } = this.props

    return (
      <PaginationProvider tagName={Pagination.tagName} {...props}>
        <PaginationInstance {...props}>{children}</PaginationInstance>
      </PaginationProvider>
    )
  }
}

class PaginationInstance extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = PaginationContext

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
      mode: _mode, // eslint-disable-line
      hide_progress_indicator: _hide_progress_indicator, // eslint-disable-line
      use_load_button: _use_load_button, // eslint-disable-line

      ...attributes
    } = props

    const { currentPage, pageCount, items } = this.context.pagination

    // Pagination mode
    if (this.context.pagination.mode !== 'infinity') {
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

      const content = items.find(({ pageNo }) => pageNo === currentPage)
        ?.content

      return (
        <>
          {typeof children !== 'function' && children}

          <div {...mainParams}>
            {content}
            <PaginationBar
              page_count={pageCount}
              current_page={currentPage}
            >
              {children}
            </PaginationBar>
          </div>
        </>
      )
    }

    // InfinityScroller mode
    return <InfinityScroller />
  }
}

// NB: This is not ready yet
Pagination.Bar = PaginationBar
Pagination.Content = function Content({ children, ...props }) {
  return (
    <div className="dnb-pagination__content" {...props}>
      {children}
    </div>
  )
}
Pagination.Content.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired
}
