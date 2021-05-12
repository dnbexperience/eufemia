/**
 * Web Modal Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Section from '../section/Section'

export default function Inner({ className, ...props }) {
  return (
    <Section
      style_type="black-3"
      className={classnames('dnb-modal__wrapper__inner', className)}
      {...props}
    />
  )
}
Inner.propTypes = {
  className: PropTypes.string,
}
Inner.defaultProps = {
  className: null,
}
