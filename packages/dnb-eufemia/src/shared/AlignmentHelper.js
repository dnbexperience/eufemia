/**
 * Alignment helper
 *
 * This helper element provides needed help when it comes to HTML inline alignment (vertically)
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default function AlignmentHelper({
  className,
  children,
  ...props
}) {
  return (
    <span
      className={classnames('dnb-alignment-helper', className)}
      aria-hidden
      {...props}
    >
      {children}
    </span>
  )
}

AlignmentHelper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}
AlignmentHelper.defaultProps = {
  children: null,
  className: null,
}
