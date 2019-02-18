/**
 * Custom Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Tag = ({ children, className, is: Component, ...rest }) => {
  return (
    <Component
      className={classnames(`dnb-${Component}`, className)}
      {...rest}
    >
      {children}
    </Component>
  )
}
Tag.propTypes = {
  is: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}
Tag.defaultProps = {
  className: null
}

export default Tag
