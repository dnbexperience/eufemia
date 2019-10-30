/**
 * Web ProgressIndicator Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import ProgressIndicatorCircular from './ProgressIndicatorCircular'

const renderProps = { on_complete: null }

const propTypes = {
  visible: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.oneOf(['circular']),
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // Web Component props
  on_complete: PropTypes.func
}

const defaultProps = {
  visible: true,
  type: 'circular',
  no_animation: false,
  size: 'medium',
  progress: null,

  // Web Component props
  ...renderProps
}

export default class ProgressIndicator extends PureComponent {
  static tagName = 'dnb-progress-indicator'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(
      ProgressIndicator.tagName,
      ProgressIndicator,
      defaultProps
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      state.visible = isTrue(props.visible)
      if (state.visible) {
        state.complete = false
      }
      if (parseFloat(props.progress) > -1) {
        state.progress = props.progress
      }
    }
    state._listenForPropChanges = true
    return state
  }

  state = {
    _listenForPropChanges: true
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout)
    clearTimeout(this.fadeOutTimeout)
  }

  callOnCompleteHandler = () => {
    this.completeTimeout = setTimeout(() => {
      this.setState({
        complete: true
      })
      if (typeof this.props.on_complete === 'function') {
        this.fadeOutTimeout = setTimeout(() => {
          dispatchCustomElementEvent(this, 'on_complete')
        }, 600) // wait for CSS fade out, defined in "progress-indicator-fade-out"
      }
    }, 200)
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      type,
      size,
      no_animation,
      on_complete,
      progress: _progress, //eslint-disable-line
      visible: _visible, //eslint-disable-line
      complete: _complete, //eslint-disable-line
      ...attributes
    } = props

    const { progress, visible, complete } = this.state

    const params = { ...attributes }
    const hasProgressIndicator = parseFloat(progress) > -1

    if (visible && !hasProgressIndicator) {
      params.role = 'alert'
      params['aria-busy'] = 'true'
    }

    validateDOMAttributes(this.props, params)

    return (
      <div
        className={classnames(
          'dnb-progress-indicator',
          visible && 'dnb-progress-indicator--visible',
          complete && 'dnb-progress-indicator--complete',
          isTrue(no_animation) && 'dnb-progress-indicator--no-animation',
          createSpacingClasses(props)
        )}
        {...params}
      >
        {type === 'circular' && (
          <ProgressIndicatorCircular
            size={size}
            progress={progress}
            visible={visible}
            complete={complete}
            onComplete={on_complete}
            callOnCompleteHandler={this.callOnCompleteHandler}
          />
        )}
      </div>
    )
  }
}
