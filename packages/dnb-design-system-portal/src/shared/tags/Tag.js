/**
 * Custom Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Tag = ({ children, className, is: Component, ...rest }) => {
  if (children === null && !/hr/.test(Component)) return <></>
  if (rest.inline) {
    rest.inline = rest.inline.toString()
  }
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
