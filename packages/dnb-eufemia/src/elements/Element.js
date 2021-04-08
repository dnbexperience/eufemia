/**
 * This is mainly a Wrapper, to build more easily HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../shared/Context'
import {
  validateDOMAttributes,
  extendPropsWithContext
} from '../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../components/space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes
} from '../components/skeleton/SkeletonHelper'

const Element = React.forwardRef((props, ref) => {
  return <ElementInstance inner_ref={ref} {...props} />
})
Element.propTypes = {
  is: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]),
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  skeleton_method: PropTypes.string,

  ...spacingPropTypes,

  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  class: PropTypes.string,
  internalClass: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node
}
Element.defaultProps = {
  is: null,
  skeleton: null,
  skeleton_method: 'font',
  className: null,
  class: null,
  internalClass: null,
  css: null,
  children: null

  // NB: Do not set "inner_ref: null"
}

class ElementInstance extends React.PureComponent {
  static contextType = Context
  static propTypes = Element.propTypes
  static defaultProps = Element.defaultProps

  render() {
    const props =
      this.props.skeleton !== false &&
      this.context &&
      typeof this.context.skeleton !== 'undefined'
        ? extendPropsWithContext(this.props, Element.defaultProps, {
            skeleton: this.context && this.context.skeleton
          })
        : this.props

    const {
      className,
      class: _className,
      internalClass,
      css,
      is: Tag,
      inner_ref,
      skeleton,
      skeleton_method,
      ...rest
    } = props

    const tagClass =
      internalClass || (typeof Tag === 'string' ? `dnb-${Tag}` : '')
    rest.className = classnames(
      !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) &&
        tagClass,
      className,
      _className,
      css,
      createSkeletonClass(skeleton_method, skeleton, this.context),
      createSpacingClasses(
        rest,
        typeof Tag === 'string' ? `dnb-${Tag}` : null
      )
    )

    validateDOMAttributes(null, rest)

    skeletonDOMAttributes(rest, skeleton, this.context)

    if (typeof Tag !== 'function' && inner_ref) {
      rest.ref = inner_ref
    }

    return <Tag {...rest} />
  }
}

export default Element
