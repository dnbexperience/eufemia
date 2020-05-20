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
    let style = Tag
    switch (Tag) {
      case 'h1':
        style = 'h--xx-large'
        break
      case 'h2':
        style = 'h--large'
        break
      case 'h3':
        style = 'h--medium'
        break
      case 'h4':
        style = 'h--basis'
        break
      case 'h5':
        style = 'h--small'
        break
      case 'h6':
        style = 'h--x-small'
        break
    }

    const params = {
      className: classnames(
        useClass ? useClass : `dnb-${style}`,
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
