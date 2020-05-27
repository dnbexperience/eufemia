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
  ({ className, class: _className, css, is: Tag, ...rest }, ref) => {
    const params = {
      className: classnames(
        createSpacingClasses(rest, Tag),
        className,
        _className,
        css
      )
    }

    validateDOMAttributes(null, rest)
    return <Tag ref={ref} {...rest} {...params} />
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
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
Element.defaultProps = {
  className: null,
  class: null,
  css: null
}

export default Element
