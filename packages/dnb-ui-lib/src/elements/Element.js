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
  extendPropsWithContext
} from '../shared/component-helper'
import { createSpacingClasses } from '../components/space/SpacingHelper'
import { AutoSize } from '../components/skeleton/SkeletonHelper'

class Element extends React.PureComponent {
  // static propTypes = propTypes
  // static defaultProps = defaultProps
  // static renderProps = renderProps
  static contextType = Context

  constructor(props) {
    super(props)
  }

  render() {
    const props =
      this.props.skeleton !== false &&
      typeof this.context?.skeleton !== 'undefined'
        ? extendPropsWithContext(this.props, Element.defaultProps, {
            skeleton: this.context?.skeleton
          })
        : this.props

    const {
      className,
      class: _className,
      css,
      is: Tag,
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
      return <AutoSize __element={Tag} {...rest} />
    }

    return <Tag {...rest} />
  }
}
Element.propTypes = {
  is: PropTypes.string.isRequired,
  hasTagClass: PropTypes.bool,
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  class: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}
Element.defaultProps = {
  hasTagClass: false,
  skeleton: null,
  className: null,
  class: null,
  css: null
}

export default Element
