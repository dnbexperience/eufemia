/**
 * This is mainly a Wrapper, to bulid more easely HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { validateDOMAttributes } from '../shared/component-helper'
import { createSpacingClasses } from '../components/space/SpacingHelper'

const Element = React.forwardRef(
  (
    { className, class: _className, css, is: Tag, hasTagClass, ...rest },
    ref
  ) => {
    const tagClass = `dnb-${Tag}`
    rest.className = classnames(
      !hasTagClass &&
        !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) &&
        tagClass,
      className,
      _className,
      css,
      createSpacingClasses(rest, Tag)
    )
    validateDOMAttributes(null, rest)
    return <Tag ref={ref} {...rest} />
  }
)
Element.propTypes = {
  is: PropTypes.string.isRequired,
  hasTagClass: PropTypes.bool,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  class: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
Element.defaultProps = {
  className: null,
  hasTagClass: false,
  class: null,
  css: null
}

export default Element
