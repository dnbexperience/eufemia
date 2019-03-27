/**
 * This is mainly a Wrapper, to bulid more easely HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default function E({
  className,
  class: _className,
  useClass,
  css,
  is: Tag,
  ...rest
}) {
  return (
    <Tag
      className={classnames(
        useClass ? useClass : `dnb-${Tag}`,
        className,
        _className,
        css
      )}
      {...rest}
    />
  )
}
E.propTypes = {
  is: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,
  useClass: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node
}
E.defaultProps = {
  className: null,
  class: null,
  useClass: null,
  css: null,
  children: null
}
