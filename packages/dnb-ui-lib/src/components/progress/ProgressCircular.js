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
  <svg className={className} viewBox="0 0 50 50">
    <circle
      className="dnb-progress__circular__circle"
      fill="none"
      strokeWidth="4"
      cx="25"
      cy="25"
      r="20"
    />
  </svg>
)
Circle.propTypes = {
  className: PropTypes.string.isRequired
}
