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
    { className, class: _className, useClass, css, is: Tag, ...rest },
    ref
  ) => {
    rest.className = classnames(
      useClass ? useClass : `dnb-${Tag}`,
      createSpacingClasses(rest),
      className,
      _className,
      css
    )
    validateDOMAttributes(null, rest)
    return <Tag ref={ref} {...rest} />
  }
)
Element.propTypes = {
  is: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  class: PropTypes.string,
  useClass: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
Element.defaultProps = {
  className: null,
  class: null,
  useClass: null,
  css: null
}

export default Element
