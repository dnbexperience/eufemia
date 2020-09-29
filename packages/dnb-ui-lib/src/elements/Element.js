/**
 * This is mainly a Wrapper, to build more easily HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../shared/Context'
import {
  isTrue,
  validateDOMAttributes,
  skeletonElement,
  extendPropsWithContext
} from '../shared/component-helper'
import { createSpacingClasses } from '../components/space/SpacingHelper'
import { AutoSize } from '../components/skeleton/SkeletonHelper'

class Elem extends React.PureComponent {
  static contextType = Context

  constructor(props) {
    super(props)
  }

  render() {
    const props =
      this.props.skeleton !== false &&
      typeof this.context?.skeleton !== 'undefined'
        ? extendPropsWithContext(this.props, Elem.defaultProps, {
            skeleton: this.context?.skeleton
          })
        : this.props

    const {
      className,
      class: _className,
      css,
      is: Tag,
      _ref,
      hasTagClass,
      skeleton,
      ...rest
    } = props

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

    if (isTrue(skeleton)) {
      skeletonElement(rest, this.context)
      return <AutoSize __element={Tag} ref={_ref} {...rest} />
    }

    return <Tag ref={_ref} {...rest} />
  }
}
Elem.propTypes = {
  is: PropTypes.string.isRequired,
  hasTagClass: PropTypes.bool,
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  _ref: PropTypes.object,
  class: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
Elem.defaultProps = {
  hasTagClass: false,
  skeleton: null,
  className: null,
  _ref: null,
  class: null,
  css: null
}

const Element = React.forwardRef((props, ref) => {
  return <Elem _ref={ref} {...props} />
})

export default Element
