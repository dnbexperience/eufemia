/**
 * Web Space Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  extendPropsWithContextInClassComponent,
  registerElement,
  processChildren,
  validateDOMAttributes,
} from '../../shared/component-helper'
import Context from '../../shared/Context'
import { spacingPropTypes } from './SpacingHelper'
import {
  createSpacingClasses,
  isInline,
  spacingDefaultProps,
} from './SpacingUtils'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import type { DynamicElement, SpacingProps } from '../../shared/types'

export { spacingPropTypes }

function Element({
  element,
  no_collapse,
  children,
  innerRef,
  ...props
}: SpaceAllProps) {
  const E = element as DynamicElement<any>
  const component = (
    <E {...props} ref={innerRef}>
      {children}
    </E>
  )

  if (isTrue(no_collapse)) {
    const R = E === 'span' || isInline(Element) ? 'span' : 'div'
    return (
      <R
        className={classnames(
          'dnb-space--no-collapse',
          isInline(Element) && 'dnb-space--inline'
        )}
      >
        {component}
      </R>
    )
  }

  return component
}

export type SpaceProps = {
  /**
   * Defines the HTML element used.
   * Default: div
   */
  element?: DynamicElement

  /**
   * If set to `true`, then `display: inline-block;` is used, so the HTML elements get aligned horizontally. Defaults to `false`.
   * Default: false
   */
  inline?: boolean

  /**
   * If set to `true`, then a wrapper with `display: flow-root;` is used. This way you avoid **Margin Collapsing**. Defaults to `false`. _Note:_ You can't use `inline="true"` in combination.
   * Default: false
   */
  no_collapse?: boolean

  /**
   * If set to `true`, then the space element will be 100% in `width`.
   * Default: false
   */
  stretch?: boolean

  /**
   * If set to `true`, a loading skeleton will be shown.
   * Default: false
   */
  skeleton?: boolean

  /**
   * Send along a custom React Ref.
   * Default: null
   */
  innerRef?: React.RefObject<HTMLElement>
} & SpacingProps

export type SpaceAllProps = SpaceProps & React.HTMLProps<HTMLElement>

export default class Space extends React.PureComponent<
  SpaceAllProps | React.HTMLProps<HTMLElement>
> {
  static tagName = 'dnb-space'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    element: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    inline: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_collapse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    innerRef: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    id: null,
    element: 'div',
    inline: null,
    no_collapse: null, // avoid margin collapsing

    ...spacingDefaultProps,

    stretch: null,
    skeleton: null,

    innerRef: null,
    className: null,
    children: null,
  }

  static enableWebComponent() {
    registerElement(Space?.tagName, Space, Space.defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  render() {
    // consume the space context
    const props = this.context.space
      ? // use only the props from context, who are available here anyway
        extendPropsWithContextInClassComponent(
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
      space,
      stretch,
      skeleton,
      innerRef,
      id: _id, // eslint-disable-line
      className,

      ...attributes
    } = props as SpaceAllProps

    // in case we have a label already, we split this out and use this one instead
    const children = Space.getContent(this.props)

    const params = {
      className: classnames(
        'dnb-space',
        isTrue(stretch) && 'dnb-space--stretch',
        isTrue(inline) && 'dnb-space--inline',
        createSkeletonClass(null, skeleton), // do not send along this.context
        createSpacingClasses({ top, right, bottom, left, space }),
        className
      ),
      ...attributes,
    }

    skeletonDOMAttributes(params, skeleton) // do not send along this.context

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <Element
        element={element}
        no_collapse={no_collapse}
        innerRef={innerRef}
        {...params}
      >
        {children}
      </Element>
    )
  }
}
