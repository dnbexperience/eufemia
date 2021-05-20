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
  extendPropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import StepIndicatorItem from './StepIndicatorItem'

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
            PropTypes.bool,
          ]),
          is_current: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
          ]),

          /* Deprecated */
          url_future: PropTypes.string, // Deprecated
          /* Deprecated */
          url_passed: PropTypes.string, // Deprecated

          on_click: PropTypes.func,
          on_render: PropTypes.func,
        })
      ),
    ]).isRequired,
    step_title: PropTypes.string,
    current_step: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    /* Deprecated */
    active_item: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Deprecated
    /* Deprecated */
    active_url: PropTypes.string, // Deprecated

    hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    use_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]), // Deprecated
    enable_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    on_item_render: PropTypes.func,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

    on_change: PropTypes.func,
  }

  static defaultProps = {
    data: [],
    step_title: '%step',
    current_step: null,
    active_item: null, // Deprecated
    active_url: null, // Deprecated
    hide_numbers: false,
    use_navigation: null, // Deprecated
    enable_navigation: null, // Deprecated
    on_item_render: null,
    skeleton: false,
    class: null,

    className: null,
    children: null,

    on_change: null,
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

      if (state.activeItem !== props.current_step) {
        state.activeItem = parseFloat(props.current_step)
      } else if (state.activeItem !== props.active_item) {
        /** Deprecated */
        state.activeItem = parseFloat(props.active_item)
      }

      /** Deprecated */
      if (props.active_url && state.activeUrl !== props.active_url) {
        state.activeUrl = props.active_url
      }

      /** Deprecated */
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

  // Deprecated warning
  canWarn = () =>
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'

  constructor(props) {
    super(props)

    this.state = {
      hasReached: [],
      _listenForPropChanges: true,
    }

    if (this.canWarn()) {
      // deprecated warning
      if (props.active_item !== null) {
        warn(
          'StepIndicator: "active_item" is deprecated. Use "current_step" instead.'
        )
      }
      // deprecated warning
      if (props.use_navigation !== null) {
        warn(
          'StepIndicator: "use_navigation" is deprecated. Use "enable_navigation" instead.'
        )
      }
      // deprecated warning
      if (props.active_url !== null) {
        warn(
          'StepIndicator: The usage of "active_url" is deprecated. You will have to handle your URLs by yourself in the next major version.'
        )
      }
    }

    const sn = 'show_numbers'
    if (typeof props[sn] !== 'undefined') {
      warn(
        'StepIndicator: "show_numbers" is deprecated. Use "hide_numbers" instead.'
      )
    }
  }

  setActiveItem = (activeItem) => {
    this.setState({
      activeItem,
      _listenForPropChanges: false,
    })
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      StepIndicator.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).StepIndicator,
      this.context.FormRow,
      this.context.StepIndicator
    )

    const {
      active_item, //eslint-disable-line
      active_url, //eslint-disable-line
      hide_numbers,
      use_navigation, // Deprecated
      enable_navigation,
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
      ...attributes,
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
                use_navigation, // Deprecated
                enable_navigation,
                on_item_render,
                step_title,
                on_change,
                ...props,
              }
              return (
                <StepIndicatorItem
                  key={i}
                  {...params}
                  setActiveItem={this.setActiveItem}
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
