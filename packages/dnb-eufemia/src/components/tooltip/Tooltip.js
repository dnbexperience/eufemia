/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren
  // dispatchCustomElementEvent
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'
import TooltipWithEvents from './TooltipWithEvents'
import TooltipPortal from './TooltipPortal'

/**
 * The tooltip component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a tooltip should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
export default class Tooltip extends React.PureComponent {
  static tagName = 'dnb-tooltip'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    group: PropTypes.string,
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    arrow: PropTypes.oneOf([
      null,
      'center',
      'top',
      'right',
      'bottom',
      'left'
    ]),
    align: PropTypes.oneOf([null, 'center', 'right', 'left']),
    animate_position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    show_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hide_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    tooltip: PropTypes.node,

    // Events
    onClick: PropTypes.func,
    on_click: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
  }

  static defaultProps = {
    id: null,
    group: 'main',
    active: null,
    position: 'top',
    arrow: 'center',
    align: null,
    animate_position: false,
    show_delay: 300,
    hide_delay: 500,

    class: null,
    className: null,
    children: null,
    tooltip: null,

    // Events
    onClick: null,
    on_click: null
  }

  static enableWebComponent() {
    registerElement(Tooltip.tagName, Tooltip, Tooltip.defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  getPropsFromTooltipProp() {
    return this.props.tooltip
      ? React.isValidElement(this.props.tooltip) &&
        this.props.tooltip.props
        ? this.props.tooltip.props
        : { children: this.props.tooltip }
      : null
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
  }

  render() {
    const inherited = this.getPropsFromTooltipProp()

    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      Tooltip.defaultProps,
      inherited,
      this.context.getTranslation(this.props).Tooltip,
      this.context.FormRow,
      this.context.Tooltip
    )

    const {
      target_ref,
      target,
      class: class_name,
      className,
      tooltip, // eslint-disable-line
      group, // eslint-disable-line
      animate_position, // eslint-disable-line
      show_delay, // eslint-disable-line
      hide_delay, // eslint-disable-line
      active, // eslint-disable-line
      position, // eslint-disable-line
      arrow, // eslint-disable-line
      align, // eslint-disable-line
      ...params
    } = props

    const content = Tooltip.getContent(props)

    const classes = classnames(
      'dnb-tooltip',
      createSpacingClasses(props),
      class_name,
      className
    )

    const attributes = {
      className: classes,
      ...params
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, attributes)

    const newProps = {
      ...this.props,
      ...inherited,
      internal_id: this._id,
      group: this.props.id || group
    }
    if (newProps.active === null) {
      delete newProps.active
    }

    return (
      <>
        {target_ref ? (
          <TooltipWithEvents
            target={target_ref}
            attributes={attributes}
            {...newProps}
          >
            {content}
          </TooltipWithEvents>
        ) : (
          target && (
            <TooltipPortal
              target={target}
              attributes={attributes}
              {...newProps}
            >
              {content}
            </TooltipPortal>
          )
        )}
      </>
    )
  }
}
