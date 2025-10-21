/**
 * Web Pagination Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
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
  startupPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  page_count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startupCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parallelLoadCount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeMarkerBeforeContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  minWaitTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  mode: PropTypes.oneOf(['pagination', 'infinity']),
  paginationBarLayout: PropTypes.oneOf(['vertical', 'horizontal']),
  useLoadButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  hideProgressIndicator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  setContentHandler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  resetContentHandler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  resetPaginationHandler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  endInfinityHandler: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  pageElement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  fallbackElement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  markerElement: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  indicatorElement: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.string,
  ]),
  align: PropTypes.string,
  buttonTitle: PropTypes.string,
  prevTitle: PropTypes.string,
  nextTitle: PropTypes.string,
  morePages: PropTypes.string,
  isLoadingText: PropTypes.string,
  loadButtonText: PropTypes.string,
  loadButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  barSpace: spacingPropTypes.space,

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  on_change: PropTypes.func,
  on_startup: PropTypes.func,
  on_load: PropTypes.func,
  on_end: PropTypes.func,
}

const paginationDefaultProps = {
  startupPage: null,
  currentPage: null,
  page_count: null,
  mode: 'pagination',
  paginationBarLayout: 'vertical',
  useLoadButton: false,
  items: null,
  hideProgressIndicator: false,
  setContentHandler: null,
  resetContentHandler: null,
  pageElement: undefined,
  fallbackElement: undefined,
  markerElement: undefined,
  indicatorElement: undefined,
  align: 'left',
  buttonTitle: null,
  prevTitle: null,
  nextTitle: null,
  morePages: null,
  isLoadingText: null,
  loadButtonText: null,
  loadButton: null,
  barSpace: null,
  startupCount: 1,
  parallelLoadCount: 1,
  placeMarkerBeforeContent: false,
  minWaitTime: 400,
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
      barSpace,
      paginationBarLayout, // eslint-disable-line

      disabled: _disabled, // eslint-disable-line
      skeleton: _skeleton, // eslint-disable-line
      tagName: _tagName, // eslint-disable-line
      page_count: _page_count, // eslint-disable-line
      currentPage: _current_page, // eslint-disable-line
      startupPage: _startupPage, // eslint-disable-line
      mode: _mode, // eslint-disable-line
      hideProgressIndicator: _hideProgressIndicator, // eslint-disable-line
      useLoadButton: _useLoadButton, // eslint-disable-line
      currentPageInternal: _currentPage, // eslint-disable-line
      markerElement: _markerElement, // eslint-disable-line
      fallbackElement: _fallbackElement, // eslint-disable-line
      setContentHandler: _setContentHandler, // eslint-disable-line
      resetContentHandler: _resetContentHandler, // eslint-disable-line
      resetPaginationHandler: _resetPaginationHandler, // eslint-disable-line
      endInfinityHandler: _endInfinityHandler, // eslint-disable-line
      minWaitTime: _minWaitTime, // eslint-disable-line
      pageElement: _pageElement, // eslint-disable-line
      startupCount: _startupCount, // eslint-disable-line
      parallelLoadCount: _parallelLoadCount, // eslint-disable-line
      buttonTitle: _buttonTitle, // eslint-disable-line
      prevTitle: _prevTitle, // eslint-disable-line
      nextTitle: _nextTitle, // eslint-disable-line
      morePages: _morePages, // eslint-disable-line
      isLoadingText: _isLoadingText, // eslint-disable-line
      loadButtonText: _loadButtonText, // eslint-disable-line
      loadButton: _loadButton, // eslint-disable-line
      indicatorElement: _indicatorElement, // eslint-disable-line
      placeMarkerBeforeContent: _placeMarkerBeforeContent, // eslint-disable-line

      ...attributes
    } = props

    // our props
    const {
      currentPageInternal,
      items,
      fallbackElement,
      indicatorElement,
    } = this.context.pagination

    // Pagination mode
    if (this.context.pagination.mode === 'pagination') {
      const mainParams = {
        className: classnames(
          'dnb-pagination',
          align && `dnb-pagination--${align}`,
          paginationBarLayout &&
            `dnb-pagination--layout-${paginationBarLayout}`,
          createSpacingClasses(props),
          className
        ),
        ...attributes,
      }

      validateDOMAttributes(props, mainParams)

      const content = items.find(
        ({ pageNumber }) => pageNumber === currentPageInternal
      )?.content

      return (
        <div {...mainParams}>
          <PaginationBar contentRef={this._contentRef} space={barSpace}>
            {children}
          </PaginationBar>
          {items.length > 0 && (
            <PaginationContent ref={this._contentRef}>
              {content || (
                <PaginationIndicator
                  indicatorElement={indicatorElement || fallbackElement}
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
  <Pagination fallbackElement={() => null} {...props} />
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
    setContentHandler: (fn) => (_setContent.current = fn),
    resetContentHandler: (fn) => (_resetContent.current = fn),
    resetPaginationHandler: (fn) => (_resetInfinity.current = fn),
    endInfinityHandler: (fn) => (_endInfinity.current = fn),
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
