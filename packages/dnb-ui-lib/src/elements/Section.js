/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Section = ({ useSpacing, className, ...p }) => (
  <div
    className={classnames(
      className,
      'dnb-section',
      useSpacing && 'dnb-section--spacing'
    )}
    {...p}
  />
)

Section.propTypes = {
  useSpacing: PropTypes.bool,
  className: PropTypes.string
}
Section.defaultProps = {
  useSpacing: false,
  className: null
}

export default Section
