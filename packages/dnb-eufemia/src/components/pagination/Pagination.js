/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For refferencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import PaginationContext from './PaginationContext'
import PaginationProvider from './PaginationProvider'
import {
  validateDOMAttributes,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'

import { PaginationIndicator } from './PaginationHelpers'
import InfinityScroller from './PaginationInfinity'
import PaginationBar from './PaginationBar'

const paginationPropTypes = {
  startup_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  current_page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startup_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parallel_load_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  place_maker_before_content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  min_wait_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  mode: PropTypes.oneOf(['pagination', 'infinity']),
  use_load_button: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  hide_progress_indicator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  set_content_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  reset_content_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  reset_pagination_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  end_infinity_handler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  page_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  fallback_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  marker_element: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  indicator_element: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  align: PropTypes.string,
  button_title: PropTypes.string,
  prev_title: PropTypes.string,
  next_title: PropTypes.string,
  more_pages: PropTypes.string,
  is_loading_text: PropTypes.string,
  load_button_text: PropTypes.string,

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  on_change: PropTypes.func,
  on_startup: PropTypes.func,
  on_load: PropTypes.func,
  on_end: PropTypes.func,
}

const paginationDefaultProps = {
  startup_page: null,
  current_page: null,
  page_count: null,
  mode: 'pagination',
  use_load_button: false,
  items: null,
  hide_progress_indicator: false,
  set_content_handler: null,
  reset_content_handler: null,
  page_element: undefined,
  fallback_element: undefined,
  marker_element: undefined,
  indicator_element: undefined,
  align: 'left',
  button_title: null,
  prev_title: null,
  next_title: null,
  more_pages: null,
  is_loading_text: null,
  load_button_text: null,
  startup_count: 1,
  parallel_load_count: 1,
  place_maker_before_content: false,
  min_wait_time: 400,
  disabled: null,
  skeleton: null,

  className: null,
  children: null,

  on_change: null,
  on_startup: null,
  on_load: null,
  on_end: null,
}

export default class Pagination extends React.PureComponent {
  static propTypes = { ...paginationPropTypes }
  static defaultProps = paginationDefaultProps

  render() {
    return (
      <PaginationProvider
        tagName="dnb-pagination"
        internalContent={this.props.children}
        {...this.props}
      >
        <PaginationInstance {...this.props} />
      </PaginationProvider>
    )
  }
}

class PaginationInstance extends React.PureComponent {
  static propTypes = { ...paginationPropTypes }
  static defaultProps = paginationDefaultProps
  static contextType = PaginationContext

  constructor(props) {
    super(props)
    this._contentRef = React.createRef()
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      paginationDefaultProps,
      this.context.getTranslation(this.props).Pagination,
      this.context.Pagination
    )

    const {
      align,
      children,
      className,

      disabled: _disabled, // eslint-disable-line
      skeleton: _skeleton, // eslint-disable-line
      tagName: _tagName, // eslint-disable-line
      page_count: _page_count, // eslint-disable-line
      current_page: _current_page, // eslint-disable-line
      startup_page: _startup_page, // eslint-disable-line
      mode: _mode, // eslint-disable-line
      hide_progress_indicator: _hide_progress_indicator, // eslint-disable-line
      use_load_button: _use_load_button, // eslint-disable-line
      currentPage: _currentPage, // eslint-disable-line

      ...attributes
    } = props

    // our props
    const { currentPage, items, fallback_element, indicator_element } =
      this.context.pagination

    // Pagination mode
    if (this.context.pagination.mode === 'pagination') {
      const mainParams = {
        className: classnames(
          'dnb-pagination',
          align && `dnb-pagination--${align}`,
          createSpacingClasses(props),
          className
        ),
        ...attributes,
      }

      validateDOMAttributes(props, mainParams)

      const content = items.find(
        ({ pageNumber }) => pageNumber === currentPage
      )?.content

      return (
        <div {...mainParams}>
          <PaginationBar contentRef={this._contentRef}>
            {children}
          </PaginationBar>
          {items.length > 0 && (
            <PaginationContent ref={this._contentRef}>
              {content || (
                <PaginationIndicator
                  indicator_element={indicator_element || fallback_element}
                />
              )}
            </PaginationContent>
          )}
        </div>
      )
    }

    // InfinityScroller mode
    return <InfinityScroller />
  }
}

export class InfinityMarker extends React.PureComponent {
  static propTypes = { ...paginationPropTypes }
  static defaultProps = paginationDefaultProps

  render() {
    const { children, ...props } = this.props
    return (
      <PaginationProvider
        useMarkerOnly
        tagName="dnb-infinity-marker"
        {...props}
      >
        <InfinityScroller {...props}>{children}</InfinityScroller>
      </PaginationProvider>
    )
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
    .isRequired,
}

// NB: This is not ready yet
Pagination.Bar = PaginationBar
Pagination.Content = PaginationContent

const PaginationWrapper = Pagination
const InfinityMarkerWrapper = InfinityMarker

export const Bar = (props) => (
  <Pagination fallback_element={() => null} {...props} />
)

export const createPagination = (initProps = {}) => {
  const store = React.createRef({})
  const rerender = React.createRef(null)
  const _setContent = React.createRef(null)
  const _resetContent = React.createRef(null)
  const _resetInfinity = React.createRef(null)
  const _endInfinity = React.createRef(null)

  const setContent = (pageNumber, content) => {
    if (pageNumber > 0) {
      store.current = { ...store.current, ...{ pageNumber, content } }
      rerender.current && rerender.current(store)
    }
  }
  const resetContent = () => {
    _resetContent.current && _resetContent.current()
  }
  const resetInfinity = () => {
    _resetInfinity.current && _resetInfinity.current()
  }
  const endInfinity = () => {
    _endInfinity.current && _endInfinity.current()
  }

  const args = (props) => ({
    ...{ ...initProps, ...props },
    store,
    rerender,
    set_content_handler: (fn) => (_setContent.current = fn),
    reset_content_handler: (fn) => (_resetContent.current = fn),
    reset_pagination_handler: (fn) => (_resetInfinity.current = fn),
    end_infinity_handler: (fn) => (_endInfinity.current = fn),
  })

  const Pagination = (props) => (
    <PaginationWrapper tagName="dnb-pagination" {...args(props)} />
  )

  const InfinityMarker = (props) => (
    <InfinityMarkerWrapper
      tagName={InfinityMarkerWrapper?.tagName}
      {...args(props)}
    />
  )

  return {
    Pagination,
    InfinityMarker,
    setContent,
    resetContent,
    resetInfinity,
    endInfinity,
  }
}

Pagination._supportsSpacingProps = true
