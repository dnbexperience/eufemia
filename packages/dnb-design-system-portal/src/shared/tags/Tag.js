/**
 * Custom Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Tag = ({ children, className, is: Component, ...rest }) => {
  if (!children) return <></>
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
  children: PropTypes.node,
  className: PropTypes.string
}
Tag.defaultProps = {
  children: null,
  className: null
}

export default Tag
