/**
 * Web Progress Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export const propTypes = {
  size: PropTypes.string,
  progress: PropTypes.number,
  maxOffset: PropTypes.number
}
export const defaultProps = {
  size: null,
  progress: null,
  maxOffset: 88
}

export default class ProgressCircular extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  render() {
    const { size, maxOffset, progress } = this.props
    const strokeDashoffset = -((maxOffset / 100) * progress)
    const hasProgress = parseFloat(progress) > -1
    return (
      <div
        className={classnames(
          'dnb-progress__circular',
          size && `dnb-progress__circular--${size}`
        )}
      >
        <Circle
          className={classnames(
            'dnb-progress__circular__line',
            'dark',
            'paused'
          )}
        />
        <Circle
          className={classnames(
            'dnb-progress__circular__line',
            'light',
            hasProgress && 'paused'
          )}
          style={hasProgress ? { strokeDashoffset } : {}}
        />
        <Circle
          className={classnames(
            'dnb-progress__circular__line',
            'dark',
            hasProgress && 'paused'
          )}
          style={hasProgress ? { strokeDashoffset: -maxOffset } : {}}
        />
      </div>
    )
  }
}

const Circle = ({ className, ...rest }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    shapeRendering="optimizeSpeed"
    {...rest}
  >
    <circle
      className="dnb-progress__circular__circle"
      fill="none"
      strokeWidth="4"
      cx="16"
      cy="16"
      r="14"
    />
  </svg>
)
Circle.propTypes = {
  className: PropTypes.string.isRequired
}
