/**
 * Web ProgressIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'

const isFn = (func) => {
  return typeof func === 'function'
}

export default class ProgressIndicatorLinear extends React.PureComponent {
  static propTypes = {
    size: PropTypes.string,
    visible: PropTypes.bool,
    complete: PropTypes.bool,
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onComplete: PropTypes.func,
    callOnCompleteHandler: PropTypes.func
  }
  static defaultProps = {
    size: null,
    visible: true,
    complete: false,
    progress: null,
    onComplete: null,
    callOnCompleteHandler: null
  }
  static getDerivedStateFromProps(props, state) {
    state.progress = parseFloat(props.progress)
    state.visible = props.visible
    state.complete = props.complete
    return state
  }
  constructor(props) {
    super(props)
    this.onCompleteIsFn =
      isFn(this.props.onComplete) && isFn(this.props.callOnCompleteHandler)
    this.state = {}
  }

  componentDidUpdate(prevProps) {
    if (
      this.onCompleteIsFn &&
      !this.props.visible &&
      this.props.visible !== prevProps.visible
    ) {
      this.props.callOnCompleteHandler()
    }
  }

  render() {
    const {
      size,
      progress: _progress, // eslint-disable-line
      visible, // eslint-disable-line
      complete, // eslint-disable-line
      onComplete, // eslint-disable-line
      callOnCompleteHandler, // eslint-disable-line

      ...rest
    } = this.props

    const { progress } = this.state

    const hasProgressIndicator = parseFloat(progress) > -1

    const transform = `translateX(${(progress || 0) - 100}%)`

    const params = { ...rest }
    if (hasProgressIndicator) {
      params['title'] = `${progress}%`
      params['aria-label'] = `${progress}%`
    } else {
      params['aria-hidden'] = true
    }

    validateDOMAttributes(this.props, params)

    return (
      <div
        className={classnames(
          'dnb-progress-indicator__linear',
          size && `dnb-progress-indicator__linear--${size}`
        )}
        {...params}
      >
        <div
          className={classnames(
            'dnb-progress-indicator__linear__bar',
            hasProgressIndicator &&
              'dnb-progress-indicator__linear__bar-transition',
            !hasProgressIndicator &&
              'dnb-progress-indicator__linear__bar1-animation'
          )}
          style={hasProgressIndicator ? { transform } : {}}
        />
        {!hasProgressIndicator && (
          <div
            className={classnames(
              'dnb-progress-indicator__linear__bar',
              'dnb-progress-indicator__linear__bar2-animation'
            )}
          />
        )}
      </div>
    )
  }
}
