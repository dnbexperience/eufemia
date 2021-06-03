/**
 * Web ProgressIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'
import { IS_IE11, IS_EDGE } from '../../shared/helpers'

export default class ProgressIndicatorCircular extends React.PureComponent {
  static propTypes = {
    size: PropTypes.string,
    visible: PropTypes.bool,
    complete: PropTypes.bool,
    progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxOffset: PropTypes.number,
    onComplete: PropTypes.func,
    callOnCompleteHandler: PropTypes.func,
  }
  static defaultProps = {
    size: null,
    visible: true,
    complete: false,
    progress: null,
    maxOffset: 88,
    onComplete: null,
    callOnCompleteHandler: null,
  }
  static getDerivedStateFromProps(props, state) {
    state.progress = parseFloat(props.progress)
    state.visible = props.visible
    state.complete = props.complete
    return state
  }
  constructor(props) {
    super(props)
    this.useAnimationFrame =
      typeof props.onComplete === 'function' || IS_IE11 || IS_EDGE
    this._refDark = React.createRef()
    this._refLight = React.createRef()
    this.state = { animate: false }
  }
  componentDidMount() {
    if (this.useAnimationFrame) {
      this.startAnimationFirstTime()
    }
  }
  componentWillUnmount() {
    this.stopAnimation()
  }
  stopAnimation() {
    this.setState({ animate: false })
    if (this.startupTimeout) {
      clearTimeout(this.startupTimeout)
    }
  }
  startAnimationFirstTime() {
    this.setState({ animate: false })
    this.startupTimeout = setTimeout(() => this.startAnimation(), 300)
  }
  startAnimation() {
    this.setState({ animate: true }, () => {
      if (this._refDark.current) {
        this.animate(
          this._refDark.current,
          true,
          this.props.callOnCompleteHandler
        )
      }
      if (this._refLight.current) {
        this.animate(this._refLight.current, false)
      }
    })
  }
  animate(element, animateOnStart = true, callback = null) {
    const min = 1
    const max = 88
    let start = 0,
      ms = 0,
      prog = max,
      setProg = animateOnStart,
      animate = true,
      completeCalled = false,
      stopNextRound = false

    const step = (timestamp) => {
      if (!start) {
        start = timestamp
      }

      // milliseconds
      ms = timestamp - start

      if (animate) {
        if (!this.state.visible && prog < 5) {
          prog = min
        }
        if (setProg) {
          element.style['stroke-dashoffset'] = prog
        } else if (!animateOnStart) {
          element.style['stroke-dashoffset'] = max
        }
      }

      // if complete
      if (stopNextRound) {
        animate = false
        if (!completeCalled) {
          completeCalled = true
          if (animateOnStart && typeof callback === 'function') {
            callback()
          }
        } else if (this.state.visible && ms % 1e3 > 950) {
          // this.startAnimationFirstTime() // will not start completely from scratch
          stopNextRound = false
        }
      } else {
        // make sure we stop next round
        stopNextRound = !this.state.visible && prog === min
        animate = true
        completeCalled = false
      }

      // since we have 1sec as duration, and we want always a max of 1000ms
      prog = Math.round(max - (max / 1e3) * (ms % 1e3))

      // calc if we want to animate
      setProg = animateOnStart
        ? Math.ceil(ms / 1e3) % 2 === 1 || ms === 0
        : Math.ceil(ms / 1e3) % 2 === 0 && ms !== 0

      if (this.state.animate) {
        window.requestAnimationFrame(step)
      }
    }
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.requestAnimationFrame(step)
    }
  }
  render() {
    const {
      size,
      maxOffset,
      progress: _progress, // eslint-disable-line
      visible, // eslint-disable-line
      complete, // eslint-disable-line
      onComplete, // eslint-disable-line
      callOnCompleteHandler, // eslint-disable-line

      ...rest
    } = this.props

    const { progress } = this.state

    const strokeDashoffset = maxOffset - (maxOffset / 100) * progress
    const hasProgressValue = parseFloat(progress) > -1

    const params = { ...rest }

    if (hasProgressValue) {
      params.role = 'progressbar'
      params['aria-label'] = `${progress}%`
      params['title'] = `${progress}%`
    } else {
      params.role = 'alert'
      params['aria-busy'] = true
    }

    validateDOMAttributes(this.props, params)

    return (
      <div
        className={classnames(
          'dnb-progress-indicator__circular',
          size && `dnb-progress-indicator__circular--${size}`,
          hasProgressValue &&
            'dnb-progress-indicator__circular--has-progress-value'
        )}
        {...params}
      >
        {/* The first one is the background line */}
        <Circle
          className={classnames(
            'dnb-progress-indicator__circular__line',
            'light',
            'paused'
          )}
        />
        <Circle
          className={classnames(
            'dnb-progress-indicator__circular__line',
            'dark',
            'dark',
            hasProgressValue || this.useAnimationFrame ? 'paused' : null
          )}
          style={hasProgressValue ? { strokeDashoffset } : {}}
          ref={this._refDark}
        />
        {!hasProgressValue && (
          <Circle
            className={classnames(
              'dnb-progress-indicator__circular__line',
              'light',
              this.useAnimationFrame ? 'paused' : null
            )}
            ref={this._refLight}
          />
        )}
      </div>
    )
  }
}

const Circle = React.forwardRef(({ className, ...rest }, ref) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      shapeRendering="geometricPrecision"
      ref={ref}
      {...rest}
    >
      <circle
        className="dnb-progress-indicator__circular__circle"
        fill="none"
        strokeWidth="4"
        cx="16"
        cy="16"
        r="14"
      />
    </svg>
  )
})
Circle.propTypes = {
  className: PropTypes.string.isRequired,
}
// Circle.defaultProps = {
// }
