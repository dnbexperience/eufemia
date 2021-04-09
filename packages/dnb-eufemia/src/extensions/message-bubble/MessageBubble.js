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
import { skeletonDOMAttributes } from '../../components/skeleton/SkeletonHelper'
import P from '../../elements/P'
import { Icon } from '../../components'

export default class MessageBubble extends React.PureComponent {
  static tagName = 'dnb-message-bubble'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    author: PropTypes.string,

    color: PropTypes.string,
    primary: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    bubble_direction: PropTypes.oneOf(['left', 'right']),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    avatar: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func
    ]),
    avatar_position: PropTypes.oneOf(['left', 'right']),
    avatar_size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
    author: null,

    color: null,
    primary: null,
    bubble_direction: 'left',
    stretch: null,

    avatar: null,
    avatar_position: 'left',
    avatar_size: null,

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
      author,
      color,
      primary,
      bubble_direction,
      stretch,
      avatar,
      avatar_size,
      avatar_position,
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
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    if (author) {
      params['aria-label'] = author
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    return (
      <section id={id} {...params}>
        {avatar && (
          <div
            className={
              avatar_position &&
              `dnb-message-bubble__avatar--${avatar_position}`
            }
          >
            {React.isValidElement(avatar) ? (
              React.cloneElement(avatar, { skeleton })
            ) : (
              <Icon icon={avatar} size={avatar_size} skeleton={skeleton} />
            )}
          </div>
        )}
        <div
          style={color && { backgroundColor: color }}
          className={classnames(
            'dnb-message-bubble__bubble',
            `dnb-message-bubble__bubble--${bubble_direction}`,
            isTrue(stretch) && `dnb-message-bubble__bubble--stretch`,
            isTrue(primary) && 'dnb-message-bubble__bubble--primary'
          )}
        >
          {typeof children === 'string' ? (
            <P skeleton={skeleton}>{children}</P>
          ) : (
            React.cloneElement(children, { skeleton })
          )}
        </div>
      </section>
    )
  }
}
