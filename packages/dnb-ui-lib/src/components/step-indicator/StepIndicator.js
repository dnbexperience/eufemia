/**
 * Web StepIndicator Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  // isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import StepItem from './StepIndicatorItem'

const renderProps = {
  on_change: null
}

export const propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string,
        is_active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
        is_current: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool
        ]),
        url_future: PropTypes.string,
        url_passed: PropTypes.string,
        on_click: PropTypes.func,
        on_render: PropTypes.func
      })
    )
  ]).isRequired,
  active_item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active_url: PropTypes.string,
  hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  use_navigation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  on_item_render: PropTypes.func,
  class: PropTypes.string,

  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  on_change: PropTypes.func
}

export const defaultProps = {
  data: [],
  active_item: 0,
  active_url: null,
  hide_numbers: false,
  use_navigation: false,
  on_item_render: null,
  class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class StepIndicator extends PureComponent {
  static tagName = 'dnb-step-indicator'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(StepIndicator.tagName, StepIndicator, defaultProps)
  }

  static getData(props) {
    let res = []
    if (props.data) res = props.data
    else res = processChildren(props)
    if (typeof res === 'string')
      return res[0] === '[' ? JSON.parse(res) : []
    return res || []
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.data) {
        if (state._data !== props.data) {
          state._data = props.data
          state.data = StepIndicator.getData(props)
        }
      }

      if (state.activeItem !== props.active_item) {
        state.activeItem = parseFloat(props.active_item)
      }

      if (props.active_url && state.activeUrl !== props.active_url) {
        state.activeUrl = props.active_url
      }

      if (
        (state.activeUrl || !(parseFloat(state.activeItem) > 0)) &&
        state.data.length > 0
      ) {
        state.activeItem = state.data.reduce(
          (acc, { url }, i) =>
            url && (url === state.activeItem || url === state.activeUrl)
              ? i
              : acc,
          0
        )
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    this.state = {
      hasReached: [],
      _listenForPropChanges: true
    }

    const sn = 'show_numbers'
    if (typeof props[sn] !== 'undefined') {
      console.warn(
        'StepIndicator: "show_numbers" is deprecated. Use "hide_numbers" instead.'
      )
    }
  }

  setActimeItem = activeItem => {
    this.setState({
      activeItem,
      _listenForPropChanges: false
    })
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      active_item, //eslint-disable-line
      active_url, //eslint-disable-line
      hide_numbers,
      use_navigation,
      on_item_render,
      on_change,
      className,
      class: _className,
      data: _data, //eslint-disable-line
      children, //eslint-disable-line
      ...attributes
    } = props

    const data = StepIndicator.getData(this.props)
    const { activeItem } = this.state

    const params = {
      className: classnames(
        'dnb-step-indicator',
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    if (!this.state.hasReached.includes(activeItem)) {
      this.state.hasReached.push(activeItem)
    }

    return (
      <div {...params}>
        {data.length > 0 && (
          <ul
            // role="tablist"
            className="dnb-step-indicator__list"
          >
            {data.map((props, i) => {
              const params = {
                currentItem: i,
                activeItem,
                hide_numbers,
                use_navigation,
                on_item_render,
                on_change,
                ...props
              }
              return (
                <StepItem
                  key={`bc${i}`}
                  {...params}
                  setActimeItem={this.setActimeItem}
                  hasReached={this.state.hasReached}
                />
              )
            })}
          </ul>
        )}
      </div>
    )
  }
}
