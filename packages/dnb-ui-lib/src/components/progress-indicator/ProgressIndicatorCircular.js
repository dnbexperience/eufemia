/**
 * Web ProgressIndicator Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'

export const propTypes = {
  size: PropTypes.string,
  // complete: PropTypes.bool,
  visible: PropTypes.bool,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxOffset: PropTypes.number,
  onComplete: PropTypes.func
}
export const defaultProps = {
  size: null,
  // complete: false,
  visible: true,
  progress: null,
  maxOffset: 88,
  onComplete: null
}

export default class ProgressIndicatorCircular extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  state = { animate: false }
  constructor(props) {
    super(props)
    this.useAnimationFrame = props.onComplete
    this._refDark = React.createRef()
    this._refLight = React.createRef()
  }
  componentDidMount() {
    if (this.useAnimationFrame) {
      this.startAnimation()
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
    this.startupTimeout = setTimeout(() => this.startAnimation, 300)
  }
  startAnimation() {
    this.setState({ animate: true }, () => {
      if (this._refDark.current) {
        this.animate(this._refDark.current, true, this.props.onComplete)
      }
      if (this._refLight.current) {
        this.animate(this._refLight.current, false)
      }
    })
  }
  animate(element, animateOnStart = true, onComplete = null) {
    const min = 1
    const max = 88
    let start = 0,
      ms = 0,
      prog = max,
      setProg = animateOnStart,
      animate = true,
      completeCalled = false,
      stopNextRound = false

    const step = timestamp => {
      if (!start) {
        start = timestamp
      }

      // milliseconds
      ms = timestamp - start

      if (animate) {
        if (!this.props.visible && prog < 5) {
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
          if (animateOnStart && typeof onComplete === 'function') {
            console.log('onComplete')
            onComplete()
          }
          // } else if (this.props.visible && prog === min) {
        } else if (this.props.visible && ms % 1e3 > 970) {
          animate = true
          stopNextRound = false
        }
      } else {
        // make sure we stop next round
        stopNextRound = !this.props.visible && prog === min
        animate = true
        completeCalled = false
      }

      // sice we have 1sec as duration, and we want always a max of 1000ms
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
      progress,
      visible, // eslint-disable-line
      onComplete // eslint-disable-line
    } = this.props
    // console.log('visible', visible)
    const strokeDashoffset = maxOffset - (maxOffset / 100) * progress
    const hasProgressIndicator = parseFloat(progress) > -1

    const params = {}
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
          'dnb-progress-indicator__circular',
          size && `dnb-progress-indicator__circular--${size}`,
          hasProgressIndicator &&
            'dnb-progress-indicator__circular--has-progress-indicator'
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
            hasProgressIndicator || this.useAnimationFrame
              ? 'paused'
              : null
          )}
          style={hasProgressIndicator ? { strokeDashoffset } : {}}
          ref={this._refDark}
        />
        {!hasProgressIndicator && (
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
  className: PropTypes.string.isRequired
}
// Circle.defaultProps = {
// }
