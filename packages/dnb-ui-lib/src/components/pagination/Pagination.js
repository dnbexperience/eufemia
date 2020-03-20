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

import { PaginationIndicator } from './PaginationHelpers'
import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

const renderProps = {
  on_change: null,
  on_startup: null,
  on_load: null
}

const propTypes = {
  startup_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startup_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parallel_load_count: PropTypes.oneOfType([
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
  set_page_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  reset_content_handler: PropTypes.oneOfType([
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
  on_startup: PropTypes.func,
  on_load: PropTypes.func
}

const defaultProps = {
  startup_page: null,
  current_page: null,
  page_count: null,
  mode: 'pagination',
  use_load_button: false,
  items: null,
  hide_progress_indicator: false,
  set_content_handler: null,
  set_page_handler: null,
  reset_content_handler: null,
  page_element: undefined,
  fallback_element: undefined,
  marker_element: undefined,
  indicator_element: undefined,
  align: 'left',
  startup_count: 1,
  parallel_load_count: 1,
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
    return (
      <PaginationProvider tagName={Pagination.tagName} {...this.props}>
        <PaginationInstance {...this.props} />
      </PaginationProvider>
    )
  }
}

class PaginationInstance extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = PaginationContext

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
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

      tagName: _tagName, // eslint-disable-line
      page_count: _page_count, // eslint-disable-line
      current_page: _current_page, // eslint-disable-line
      startup_page: _startup_page, // eslint-disable-line
      mode: _mode, // eslint-disable-line
      hide_progress_indicator: _hide_progress_indicator, // eslint-disable-line
      use_load_button: _use_load_button, // eslint-disable-line

      ...attributes
    } = props

    // our props
    const {
      currentPage,
      items,
      fallback_element,
      indicator_element
    } = this.context.pagination

    // Pagination mode
    if (this.context.pagination.mode === 'pagination') {
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
            <PaginationBar contentRef={this._contentRef}>
              {children}
            </PaginationBar>
            {items.length > 0 && (
              <PaginationContent ref={this._contentRef}>
                {content || (
                  <PaginationIndicator
                    indicator_element={
                      indicator_element || fallback_element
                    }
                  />
                )}
              </PaginationContent>
            )}
          </div>
        </>
      )
    }

    // InfinityScroller mode
    return <InfinityScroller />
  }
}

const PaginationContent = React.forwardRef(
  ({ children, ...props }, ref) => {
    return (
      <div
        className="dnb-pagination__content dnb-no-focus"
        tabIndex="-1"
        {...props}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)
PaginationContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
    .isRequired
}

// NB: This is not ready yet
Pagination.Bar = PaginationBar
Pagination.Content = PaginationContent

const PaginationWrapper = Pagination

export const createPagination = (initProps = {}) => {
  const store = React.createRef({})
  const rerender = React.createRef(null)
  const _setContent = React.createRef(null)
  const _setPage = React.createRef(null)
  const _resetContent = React.createRef(null)
  const _endInfinity = React.createRef(null)

  const setContent = (pageNo, content) => {
    if (pageNo > 0) {
      store.current = { ...store.current, ...{ pageNo, content } }
      rerender.current && rerender.current(store)
    }
  }
  const resetContent = () =>
    _resetContent.current && _resetContent.current()
  const endInfinity = () => _endInfinity.current && _endInfinity.current()

  const Pagination = props => (
    <PaginationWrapper
      tagName={PaginationWrapper.tagName}
      {...{ ...initProps, ...props }}
      store={store}
      rerender={rerender}
      set_content_handler={fn => (_setContent.current = fn)}
      set_page_handler={fn => (_setPage.current = fn)}
      reset_content_handler={fn => (_resetContent.current = fn)}
      end_infinity_handler={fn => (_endInfinity.current = fn)}
    />
  )

  return {
    Pagination,
    setContent,
    setPage: setContent,
    resetContent,
    endInfinity,
    resetItems: resetContent // deprecated
  }
}
