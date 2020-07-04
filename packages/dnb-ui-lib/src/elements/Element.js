/**
 * This is mainly a Wrapper, to bulid more easely HTML Elements
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

class ElemComponent extends React.PureComponent {
  // static propTypes = propTypes
  // static defaultProps = defaultProps
  // static renderProps = renderProps
  static contextType = Context

  constructor(props) {
    super(props)
  }

  render() {
    const props =
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
      skeleton, //eslint-disable-line
      innerRef,
      ...rest
    } = props

    this.innerRef = innerRef || this.innerRef || React.createRef()

    const tagClass = `dnb-${Tag}`
    rest.className = classnames(
      !hasTagClass &&
        !new RegExp(`${tagClass}(\\s|$)`).test(String(className)) &&
        tagClass,
      // skeleton && 'dnb-skeleton__wrapper',
      isTrue(skeleton) && 'dnb-skeleton',
      className,
      _className,
      css,
      createSpacingClasses(rest, Tag)
    )

    if (isTrue(skeleton)) {
      rest['aria-busy'] = true
    }

    validateDOMAttributes(null, rest)

    return (
      <AutoSize skeleton={skeleton} elementRef={this.innerRef}>
        <Tag ref={this.innerRef} {...rest} />
      </AutoSize>
    )
  }
}

const Element = React.forwardRef((props, ref) => (
  <ElemComponent innerRef={ref} {...props} />
))
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
  skeleton: false,
  className: null,
  class: null,
  css: null
}

export default Element
