/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  warn,
  registerElement,
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import EventEmitter from '../../shared/EventEmitter'
import StepIndicatorSidebar from './StepIndicatorSidebar'

import StepIndicatorModal from './StepIndicatorModal'
import StepIndicatorList from './StepIndicatorList'
import { StepIndicatorProvider } from './StepIndicatorContext'
import {
  stepIndicatorPropsTypes,
  stepIndicatorDefaultProps,
} from './StepIndicatorProps'

export default class StepIndicator extends React.PureComponent {
  static tagName = 'dnb-step-indicator'
  static contextType = Context

  static Sidebar = StepIndicatorSidebar

  static propTypes = {
    sidebar_id: PropTypes.string,
    ...stepIndicatorPropsTypes,
  }

  static defaultProps = {
    sidebar_id: null,
    ...stepIndicatorDefaultProps,
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
    state.data = StepIndicator.getData(props)
    state.countSteps = state.data.length

    if (
      props.current_step !== null &&
      props.current_step !== state._current_step
    ) {
      state.activeStep = parseFloat(props.current_step) || 0
    }

    /** Deprecated */
    if (
      props.active_item !== null &&
      props.active_item !== state._active_item
    ) {
      state.activeStep = parseFloat(props.active_item) || 0
    }

    /** Deprecated */
    if (props.active_url && state.data.length > 0) {
      state.activeStep = state.data.reduce((acc, { url }, i) => {
        return url &&
          (url === state.current_step || url === props.active_url)
          ? i
          : acc
      }, parseFloat(state.current_step) || 0)
    }

    if (!state.listOfReachedSteps.includes(state.activeStep)) {
      state.listOfReachedSteps.push(state.activeStep)
    }

    state._current_step = props.current_step
    state._active_item = props.active_item /** Deprecated */
    state._active_url = props.active_url /** Deprecated */

    return state
  }

  // Deprecated warning
  canWarn = () =>
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'

  constructor(props) {
    super(props)

    this.state = {
      // deprecated
      isV1: !props.mode,
      sidebar_id: props.internalId || props.sidebar_id || makeUniqueId(),
    }

    if (this.canWarn()) {
      // deprecated warning
      if (props.active_item !== null) {
        warn(
          'StepIndicator: `active_item` is deprecated. Use `current_step` instead.'
        )
      }
      // deprecated warning
      if (props.use_navigation !== null) {
        warn(
          'StepIndicator: `use_navigation` is deprecated. Use `mode="strict"` or `mode="loose"` instead.'
        )
      }
      // deprecated warning
      if (props.active_url !== null) {
        warn(
          'StepIndicator: The usage of `active_url` is deprecated. You will have to handle your URLs by yourself in the next major version.'
        )
      }
    }

    const sn = 'show_numbers'
    if (typeof props[sn] !== 'undefined') {
      warn(
        'StepIndicator: `show_numbers` is deprecated. Use `hide_numbers` instead.'
      )
    }

    this._eventEmitter = EventEmitter.createInstance(this.state.sidebar_id)

    if (!this.state.listOfReachedSteps) {
      this.state.listOfReachedSteps = []
    }
  }

  setActiveStep = (activeStep) => {
    this.setState({ activeStep })
  }

  componentWillUnmount() {
    if (this._eventEmitter) {
      this._eventEmitter.remove()
      this._eventEmitter = null
    }
  }

  getContextData(context = this.context) {
    // use only the props from context, who are available here anyway
    const data = extendPropsWithContext(
      this.props,
      StepIndicator.defaultProps,
      { skeleton: context?.skeleton },
      context.getTranslation(this.props).StepIndicator,
      context.FormRow,
      context.StepIndicator
    )

    data.stepsLabel = data.step_title
      ?.replace('%step', this.state.activeStep + 1)
      .replace('%count', this.state.countSteps)
    data.stepsLabelExtended = data.step_title_extended
      ?.replace('%step', this.state.activeStep + 1)
      .replace('%count', this.state.countSteps)

    return data
  }

  render() {
    const contextData = this.getContextData(this.context)

    // deprecated
    if (this.state.isV1) {
      return (
        <StepIndicatorProvider
          {...this.state}
          {...contextData}
          sidebar_id={this.state.sidebar_id}
          setActiveStep={this.setActiveStep}
          listAttributes={this.props}
          isV1={this.state.isV1} // deprecated
        >
          <div className="dnb-step-indicator-v1">
            <StepIndicatorList />
          </div>
        </StepIndicatorProvider>
      )
    }

    if (!this.props.sidebar_id && this.props.mode) {
      warn(
        'StepIndicator needs an unique "sidebar_id" property, also on the <StepIndicator.Sidebar... />'
      )
    }

    return (
      <StepIndicatorProvider
        {...this.state}
        {...contextData}
        sidebar_id={this.state.sidebar_id}
        setActiveStep={this.setActiveStep}
        isV1={this.state.isV1} // deprecated
      >
        <div className="dnb-step-indicator-v2">
          <StepIndicatorModal />
        </div>
      </StepIndicatorProvider>
    )
  }
}
