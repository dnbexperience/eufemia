/**
 * Web Space Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  extendPropsWithContext,
  registerElement,
  processChildren,
  validateDOMAttributes
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { createSpacingClasses, isInline } from './SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../skeleton/SkeletonHelper'

export default class Space extends React.PureComponent {
  static tagName = 'dnb-space'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    element: PropTypes.string,
    inline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_collapse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    top: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    right: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    bottom: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    left: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    id: null,
    element: 'div',
    inline: null,
    no_collapse: null, // avoid margin collapsing
    top: null,
    right: null,
    bottom: null,
    left: null,
    skeleton: null,
    class: null,

    /** React props */
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(Space.tagName, Space, Space.defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  render() {
    // consume the space context
    const props = this.context.space
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(
          this.props,
          Space.defaultProps,
          { skeleton: this.context?.skeleton },
          this.context.space
        )
      : this.props

    const {
      element,
      inline,
      no_collapse,
      top,
      right,
      bottom,
      left,
      skeleton,
      id: _id, // eslint-disable-line
      className,
      class: _className,

      ...attributes
    } = props

    // in case we have a label already, we split this out and use this one instead
    const children = Space.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-space',
        isTrue(inline) && 'dnb-space--inline',
        createSkeletonClass(null, skeleton), // do not send along this.context
        createSpacingClasses({ top, right, bottom, left }),
        className,
        _className
      ),
      ...attributes
    }

    skeletonDOMAttributes(params, skeleton) // do not send along this.context

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <Element element={element} no_collapse={no_collapse} {...params}>
        {children}
      </Element>
    )
  }
}

const Element = ({ element: E, no_collapse, children, ...props }) => {
  if (isTrue(no_collapse)) {
    const R = E === 'span' || isInline(Element) ? 'span' : 'div'
    return (
      <R
        className={classnames(
          'dnb-space--no-collapse',
          isInline(Element) && 'dnb-space--inline'
        )}
      >
        <E {...props}>{children}</E>
      </R>
    )
  }

  return <E {...props}>{children}</E>
}
Element.propTypes = {
  children: PropTypes.node,
  element: PropTypes.string,
  no_collapse: PropTypes.bool
}
Element.defaultProps = {
  children: null,
  element: 'div',
  no_collapse: true
}
