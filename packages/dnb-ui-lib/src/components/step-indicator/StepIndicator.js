/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  warn,
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../skeleton/SkeletonHelper'

import StepItem from './StepIndicatorItem'

export default class StepIndicator extends React.PureComponent {
  static tagName = 'dnb-step-indicator'
  static contextType = Context

  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string,
          is_active: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
          ]),
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
    step_title: PropTypes.string,
    active_item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    active_url: PropTypes.string,
    hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    use_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    on_item_render: PropTypes.func,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    on_change: PropTypes.func
  }

  static defaultProps = {
    data: [],
    step_title: '%step',
    active_item: null,
    active_url: null,
    hide_numbers: false,
    use_navigation: false,
    on_item_render: null,
    skeleton: false,
    class: null,

    /** React props */
    className: null,
    children: null,

    on_change: null
  }

  static enableWebComponent() {
    registerElement(
      StepIndicator.tagName,
      StepIndicator,
      StepIndicator.defaultProps
    )
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
          parseFloat(props.active_item)
        )
        if (!(state.activeItem > -1)) {
          state.activeItem = null
        }
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
      warn(
        'StepIndicator: "show_numbers" is deprecated. Use "hide_numbers" instead.'
      )
    }
  }

  setActimeItem = (activeItem) => {
    this.setState({
      activeItem,
      _listenForPropChanges: false
    })
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      StepIndicator.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.formRow,
      this.context.getTranslation(this.props).StepIndicator
    )

    const {
      active_item, //eslint-disable-line
      active_url, //eslint-disable-line
      hide_numbers,
      use_navigation,
      on_item_render,
      step_title,
      on_change,
      skeleton,
      className,
      class: _className,
      data: _data, //eslint-disable-line
      children, //eslint-disable-line
      ...attributes
    } = props

    const data = StepIndicator.getData(this.props)
    const { activeItem } = this.state

    const params = {
      'aria-label': 'progress',
      className: classnames(
        'dnb-step-indicator',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    if (!this.state.hasReached.includes(activeItem)) {
      this.state.hasReached.push(activeItem)
    }

    const countSteps = data.length
    return (
      <nav {...params}>
        {countSteps > 0 && (
          <ol className="dnb-step-indicator__list">
            {data.map((props, i) => {
              if (typeof props === 'string') {
                props = { title: props }
              }
              const params = {
                countSteps,
                currentItem: i,
                activeItem,
                hide_numbers,
                use_navigation,
                on_item_render,
                step_title,
                on_change,
                ...props
              }
              return (
                <StepItem
                  key={i}
                  {...params}
                  setActimeItem={this.setActimeItem}
                  hasReached={this.state.hasReached}
                />
              )
            })}
          </ol>
        )}
      </nav>
    )
  }
}
