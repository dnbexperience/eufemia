/**
 * Web MessageBubble Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  extendPropsWithContext
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../../components/space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../../components/skeleton/SkeletonHelper'
import { Icon } from '../../components'

export default class MessageBubble extends React.PureComponent {
  static tagName = 'dnb-message-bubble'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,

    color: PropTypes.string,
    bubble_direction: PropTypes.oneOf(['left', 'right']),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    icon_position: PropTypes.oneOf(['left', 'right']),
    icon_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ])
  }

  static defaultProps = {
    id: null,

    color: null,
    bubble_direction: 'left',
    stretch: null,

    icon: null,
    icon_position: 'left',
    icon_size: null,

    skeleton: false,
    class: null,
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(
      MessageBubble.tagName,
      MessageBubble,
      MessageBubble.defaultProps
    )
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      MessageBubble.defaultProps,
      { skeleton: this.context?.skeleton }
    )

    const {
      id,
      color,
      bubble_direction,
      stretch,
      icon,
      icon_size,
      icon_position,
      skeleton,
      className,
      class: _className,
      children, //eslint-disable-line
      ...attributes
    } = props

    const params = {
      className: classnames(
        'dnb-message-bubble',
        'dnb-message-bubble__wrapper',
        createSkeletonClass(null, skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <div id={id} {...params}>
        {icon && (
          <div
            className={
              icon_position && `dnb-message-bubble__icon--${icon_position}`
            }
          >
            <Icon icon={icon} size={icon_size} />
          </div>
        )}
        <div
          style={color && { backgroundColor: color }}
          className={classnames(
            'dnb-message-bubble__bubble',
            `dnb-message-bubble__bubble--${bubble_direction}`,
            isTrue(stretch) && `dnb-message-bubble__bubble--stretch`
          )}
        >
          {children}
        </div>
      </div>
    )
  }
}
