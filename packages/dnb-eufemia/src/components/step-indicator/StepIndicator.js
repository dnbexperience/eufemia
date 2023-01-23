/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { makeUniqueId, warn } from '../../shared/component-helper'
import StepIndicatorSidebar from './StepIndicatorSidebar'

import StepIndicatorModal from './StepIndicatorModal'
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

  constructor(props) {
    super(props)

    this.state = {
      sidebar_id: props.internalId || props.sidebar_id || makeUniqueId(),
    }
  }

  render() {
    if (!this.props.sidebar_id && this.props.mode) {
      warn(
        'StepIndicator needs an unique "sidebar_id" property, also on the <StepIndicator.Sidebar... />'
      )
    }

    return (
      <StepIndicatorProvider
        {...this.props}
        sidebar_id={this.state.sidebar_id}
      >
        <div className="dnb-step-indicator-wrapper">
          <StepIndicatorModal />
        </div>
      </StepIndicatorProvider>
    )
  }
}
