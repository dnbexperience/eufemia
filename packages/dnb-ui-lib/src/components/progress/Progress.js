/**
 * Web Progress Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement
  // validateDOMAttributes,
  // dispatchCustomElementEvent
} from '../../shared/component-helper'
import ProgressCircular from './ProgressCircular'

const renderProps = {}

export const propTypes = {
  // label: PropTypes.string,
  visible: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // type: PropTypes.oneOf(['circular']),
  // no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // min_time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // variant: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
  progress: PropTypes.number
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
}

export const defaultProps = {
  // label: null,
  visible: true,
  // type: 'circular',
  // no_animation: false,
  // min_time: null,
  // variant: 'primary',
  size: 'medium',
  progress: null,
  // id: null,
  // class: null,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class Progress extends PureComponent {
  static tagName = 'dnb-progress'
  static propTypes = propTypes
  static defaultProps = defaultProps

  static enableWebComponent() {
    registerElement(Progress.tagName, Progress, defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.visible) {
        state.visible = Boolean(props.visible)
      }
      if (parseFloat(props.progress) > -1) {
        state.visible = props.progress
      }
    }
    state._listenForPropChanges = true
    return state
  }

  constructor(props) {
    super(props)

    // this._id =
    //   props.id || `dnb-progress-${Math.round(Math.random() * 999)}` // cause we need an id anyway

    const visible = Boolean(props.visible)
    this.state = {
      _listenForPropChanges: true,
      visible,
      progress: props.progress
    }
  }

  render() {
    const {
      size,
      progress: _progress, //eslint-disable-line
      visible: _visible //eslint-disable-line
      // ...attributes
    } = this.props

    const { progress, visible } = this.state

    return (
      <div
        className={classnames(
          'dnb-progress',
          !visible && 'dnb-progress--hidden'
        )}
      >
        <ProgressCircular size={size} progress={progress} />
      </div>
    )
  }
}
