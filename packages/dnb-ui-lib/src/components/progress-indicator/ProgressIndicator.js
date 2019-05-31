/**
 * Web ProgressIndicator Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
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
      state.visible = Boolean(props.visible)
      if (state.visible) {
        // state.complete = false
        state.startTime = new Date().getTime()
      }
      if (parseFloat(props.progress) > -1) {
        state.progress = props.progress
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    // this._id =
    //   props.id || `dnb-progress-indicator-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    this.state = {
      _listenForPropChanges: true,
      visible: Boolean(props.visible),
      // complete: false,
      progress: props.progress
    }

    this.firstDelay = 300 // wait for the rest time  + 200 start delay
  }

  componentWillUnmount() {
    clearTimeout(this.completeTimeout)
    clearTimeout(this.fadeOutTimeout)
  }

  callOnCompleteHandler = () => {
    if (typeof this.props.on_complete === 'function') {
      this.fadeOutTimeout = setTimeout(() => {
        dispatchCustomElementEvent(this, 'on_complete')
      }, 600) // wait for CSS fade out, defined in "progress-indicator-fade-out"
    }
  }

  // delayCompletion() {
  //   if (this.state.complete) {
  //     return
  //   }
  //
  //   const duration = 1e3 // the duration, defined in CSS
  //   const difference = new Date().getTime() - this.state.startTime
  //   const ceil = Math.ceil(difference / duration) * duration
  //   const timeToWait = ceil - difference
  //
  //   this.fadeOutTimeout = setTimeout(() => {
  //     this.firstDelay = 0
  //     this.setState({
  //       complete: true
  //     })
  //     this.callOnCompleteHandler()
  //   }, timeToWait + this.firstDelay)
  // }

  render() {
    const {
      type,
      size,
      no_animation,
      on_complete, //eslint-disable-line
      progress: _progress, //eslint-disable-line
      visible: _visible, //eslint-disable-line
      ...props
    } = this.props

    const {
      progress,
      visible
      // , complete
    } = this.state

    const params = { ...props }
    const hasProgressIndicator = parseFloat(progress) > -1

    if (visible && !hasProgressIndicator) {
      params.role = 'alert'
      params['aria-busy'] = 'true'
    }

    validateDOMAttributes(this.props, params)

    // const isComplete =
    //   visible === false ||
    //   (hasProgressIndicator && parseFloat(progress) >= 100)
    // if (isComplete) {
    //   this.delayCompletion()
    // }

    return (
      <div
        className={classnames(
          'dnb-progress-indicator',
          visible && 'dnb-progress-indicator--visible',
          // complete && 'dnb-progress-indicator--complete',
          Boolean(no_animation) && 'dnb-progress-indicator--no-animation'
        )}
        {...params}
      >
        {type === 'circular' && (
          <ProgressIndicatorCircular
            size={size}
            progress={progress}
            // complete={complete}
            visible={visible}
            onComplete={this.callOnCompleteHandler}
          />
        )}
      </div>
    )
  }
}
