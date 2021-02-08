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
  // AutoSize,
  createSkeletonClass,
  skeletonDOMAttributes
} from '../components/skeleton/SkeletonHelper'

class Elem extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    is: PropTypes.string.isRequired,
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
    _ref: PropTypes.object,
    children: PropTypes.node
  }
  static defaultProps = {
    skeleton: null,
    skeleton_method: 'font',
    className: null,
    class: null,
    internalClass: null,
    css: null,
    _ref: null,
    children: null
  }

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
      internalClass,
      css,
      is: Tag,
      _ref,
      skeleton,
      skeleton_method,
      ...rest
    } = props

    const tagClass = internalClass || `dnb-${Tag}`
    rest.className = classnames(
      !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) &&
        tagClass,
      className,
      _className,
      css,
      createSkeletonClass(skeleton_method, skeleton, this.context),
      createSpacingClasses(rest, Tag)
    )

    validateDOMAttributes(null, rest)

    skeletonDOMAttributes(rest, skeleton, this.context)

    // Use the font-swap feature dnb-skeleton--font
    // if (isTrue(skeleton)) {
    //   return <AutoSize __element={Tag} ref={_ref} {...rest} />
    // }

    return <Tag ref={_ref} {...rest} />
  }
}

const Element = React.forwardRef((props, ref) => {
  return <Elem _ref={ref} {...props} />
})
Element.propTypes = Elem.propTypes
Element.defaultProps = Elem.defaultProps

export default Element
