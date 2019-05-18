/**
 * Web Progress Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class ProgressCircular extends PureComponent {
  render() {
    return (
      <div className="dnb-progress__circular">
        <Circle className="dnb-progress__circular__bg" />
        <Circle className="dnb-progress__circular__line" />
      </div>
    )
  }
}

const Circle = ({ className }) => (
  <svg className={className} viewBox="0 0 32 32">
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
