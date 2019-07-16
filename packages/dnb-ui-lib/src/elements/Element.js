/**
 * This is mainly a Wrapper, to bulid more easely HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../shared/component-helper'
import { createSpacingClasses } from '../components/space/SpacingHelper'

export default function E({
  className,
  class: _className,
  useClass,
  css,
  is: Tag,
  ...rest
}) {
  rest.className = classnames(
    useClass ? useClass : `dnb-${Tag}`,
    createSpacingClasses(rest),
    className,
    _className,
    css
  )
  validateDOMAttributes(null, rest)
  return <Tag {...rest} />
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
