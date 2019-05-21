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
  complete: PropTypes.bool,
  progress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxOffset: PropTypes.number
}
export const defaultProps = {
  size: null,
  complete: false,
  progress: null,
  maxOffset: 88
}

export default class ProgressIndicatorCircular extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  render() {
    const { size, complete, maxOffset, progress } = this.props
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
            hasProgressIndicator || complete ? 'paused' : null
          )}
          style={hasProgressIndicator ? { strokeDashoffset } : {}}
        />
        {!hasProgressIndicator && (
          <Circle
            className={classnames(
              'dnb-progress-indicator__circular__line',
              'light',
              hasProgressIndicator || complete ? 'paused' : null
            )}
          />
        )}
      </div>
    )
  }
}

const Circle = ({ className, ...rest }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      shapeRendering="geometricPrecision"
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
}
Circle.propTypes = {
  className: PropTypes.string.isRequired
}
// Circle.defaultProps = {
// }
