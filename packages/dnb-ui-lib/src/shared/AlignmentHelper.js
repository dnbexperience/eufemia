/**
 * Spacing helper
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

// We use the w tag so NVDA not our after with content: '\00A0' as blank
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
  className: PropTypes.string
}
AlignmentHelper.defaultProps = {
  children: null,
  className: null
}
