/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { extendPropsWithContextInClassComponent } from '../../shared/component-helper'
import Context from '../../shared/Context'
import StepIndicatorList from './StepIndicatorList'
import {
  stepIndicatorPropTypes,
  stepIndicatorDefaultProps,
} from './StepIndicatorProps'
import { StepIndicatorProvider } from './StepIndicatorContext'
import { createSpacingClasses } from '../space/SpacingHelper'

export default class StepIndicatorSidebar extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    sidebar_id: PropTypes.string.isRequired,
    mode: stepIndicatorPropTypes.mode,
    current_step: stepIndicatorPropTypes.current_step,
    data: stepIndicatorPropTypes.data,

    /** Used for testing */
    internalId: PropTypes.string,
    showInitialData: PropTypes.bool,
  }

  static defaultProps = {
    mode: stepIndicatorDefaultProps.mode,
    current_step: stepIndicatorDefaultProps.current_step,
    data: stepIndicatorDefaultProps.data,
  }

  state = { showInitialData: true }

  componentDidMount() {
    if (!this.props.showInitialData) {
      this.setState({ showInitialData: false })
    }

    if (this._hasSkeletonData) {
      this.setState({
        skeleton: false,
      })
    }
  }

  getContextAndProps() {
    const providerProps = extendPropsWithContextInClassComponent(
      this.props,
      stepIndicatorDefaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.context).StepIndicator,
      this.context?.StepIndicator
    )

    if (!(providerProps.data?.length > 0)) {
      const text = 'Skeleton text'
      providerProps.data = [text.slice(10), text, text, text.slice(4)]
      providerProps.skeleton = true
      this._hasSkeletonData = true
    }

    return providerProps
  }

  render() {
    const providerProps = this.state.showInitialData
      ? this.getContextAndProps()
      : null

    return (
      <div
        id={'sidebar__' + this.props.sidebar_id}
        className={classnames(
          'dnb-step-indicator-v2',
          'dnb-step-indicator__sidebar',
          this._hasSkeletonData &&
            providerProps?.skeleton &&
            'dnb-step-indicator__sidebar--ssr-skeleton',
          createSpacingClasses(this.props)
        )}
      >
        {providerProps && (
          <StepIndicatorProvider
            isSidebar
            sidebar_id={this.props.internalId || this.props.sidebar_id}
            {...providerProps}
          >
            <StepIndicatorList />
          </StepIndicatorProvider>
        )}
      </div>
    )
  }
}
