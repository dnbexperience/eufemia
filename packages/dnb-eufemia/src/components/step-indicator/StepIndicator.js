/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  makeUniqueId,
  warn,
  registerElement,
} from '../../shared/component-helper'
import StepIndicatorSidebar from './StepIndicatorSidebar'

import StepIndicatorModal from './StepIndicatorModal'
import StepIndicatorList from './StepIndicatorList'
import { StepIndicatorProvider } from './StepIndicatorContext'
import {
  stepIndicatorPropTypes,
  stepIndicatorDefaultProps,
} from './StepIndicatorProps'

export default class StepIndicator extends React.PureComponent {
  static tagName = 'dnb-step-indicator'

  static Sidebar = StepIndicatorSidebar

  static propTypes = {
    sidebar_id: PropTypes.string,
    ...stepIndicatorPropTypes,
  }

  static defaultProps = {
    sidebar_id: null,
    ...stepIndicatorDefaultProps,
  }

  static enableWebComponent() {
    registerElement(
      StepIndicator?.tagName,
      StepIndicator,
      StepIndicator.defaultProps
    )
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
  }

  render() {
    // deprecated
    if (this.state.isV1) {
      return (
        <StepIndicatorProvider
          {...this.props}
          sidebar_id={this.state.sidebar_id}
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
        {...this.props}
        sidebar_id={this.state.sidebar_id}
        isV1={this.state.isV1} // deprecated
      >
        <div className="dnb-step-indicator-v2">
          <StepIndicatorModal />
        </div>
      </StepIndicatorProvider>
    )
  }
}
