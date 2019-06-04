/**
 * Web ProgressIndicator Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import ProgressIndicatorCircular from './ProgressIndicatorCircular'

const renderProps = { on_complete: null }

export const propTypes = {
  // label: PropTypes.string,
  visible: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.oneOf(['circular']),
  no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // min_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // id: PropTypes.string,
  // class: PropTypes.string,
  /** React props */
  // className: PropTypes.string,
  // children: PropTypes.oneOfType([
  //   PropTypes.object,
  //   PropTypes.node,
  //   PropTypes.func
  // ]),

  // Web Component props
  on_complete: PropTypes.func
}

export const defaultProps = {
  // label: null,
  visible: true,
  type: 'circular',
  no_animation: false,
  // min_time: null,
  // variant: 'primary',
  size: 'medium',
  progress: null,
  // id: null,
  // class: null,

  /** React props */
  // className: null,
  // children: null,

  // Web Component props

  ...renderProps
}

export default class ProgressIndicator extends PureComponent {
  static tagName = 'dnb-progress-indicator'
  static propTypes = propTypes
  static defaultProps = defaultProps

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
    const {
      type,
      size,
      no_animation,
      on_complete,
      progress: _progress, //eslint-disable-line
      visible: _visible, //eslint-disable-line
      complete: _complete, //eslint-disable-line
      ...props
    } = this.props

    const { progress, visible, complete } = this.state

    const params = { ...props }
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
          isTrue(no_animation) && 'dnb-progress-indicator--no-animation'
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
