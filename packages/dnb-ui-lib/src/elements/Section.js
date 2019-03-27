/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Section = ({ useSpacing, ...p }) => (
  <div
    className={classnames(
      'dnb-section',
      useSpacing && 'dnb-section--spacing'
    )}
    {...p}
  />
)

Section.propTypes = {
  useSpacing: PropTypes.bool
}
Section.defaultProps = {
  useSpacing: false
}

export default Section
