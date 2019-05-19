/**
 * Web Progress Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../../shared/component-helper'

export const propTypes = {
  size: PropTypes.string,
  quality: PropTypes.string,
  progress: PropTypes.number,
  maxOffset: PropTypes.number
}
export const defaultProps = {
  size: null,
  quality: null,
  progress: null,
  maxOffset: 88
}

export default class ProgressCircular extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  render() {
    const { size, maxOffset, progress, quality } = this.props
    const strokeDashoffset = -((maxOffset / 100) * progress)
    const hasProgress = parseFloat(progress) > -1
    const renerQuality = !quality && hasProgress ? 'hight' : quality

    const params = {}
    if (hasProgress) {
      params['title'] = `${progress}%`
      params['aria-label'] = `${progress}%`
    } else {
      params['aria-hidden'] = true
    }

    validateDOMAttributes(this.props, params)

    return (
      <div
        className={classnames(
          'dnb-progress__circular',
          size && `dnb-progress__circular--${size}`
        )}
        {...params}
      >
        <Circle
          className={classnames(
            'dnb-progress__circular__line',
            'dark',
            'paused'
          )}
          quality={renerQuality}
        />
        <Circle
          className={classnames(
            'dnb-progress__circular__line',
            'light',
            hasProgress && 'paused'
          )}
          style={hasProgress ? { strokeDashoffset } : {}}
          quality={renerQuality}
        />
        <Circle
          className={classnames(
            'dnb-progress__circular__line',
            'dark',
            hasProgress && 'paused'
          )}
          style={hasProgress ? { strokeDashoffset: -maxOffset } : {}}
          quality={renerQuality}
        />
      </div>
    )
  }
}

const Circle = ({ className, quality, ...rest }) => {
  if (quality === 'hight') {
    rest.shapeRendering = 'geometricPrecision'
  }
  return (
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
}
Circle.propTypes = {
  quality: PropTypes.string,
  className: PropTypes.string.isRequired
}
Circle.defaultProps = {
  quality: null
}
