/**
 * Web Tooltip Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  processChildren
  // pickRenderProps,
  // dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import TooltipWithEvents from './TooltipWithEvents'
import TooltipPortal from './TooltipPortal'

// const renderProps = {  }

const propTypes = {
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
  class: PropTypes.string,
  animate_position: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  show_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hide_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Events
  onClick: PropTypes.func,
  on_click: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
}

const defaultProps = {
  id: null,
  group: 'main',
  active: undefined,
  position: 'top',
  arrow: 'center',
  align: null,
  animate_position: false,
  show_delay: 300,
  hide_delay: 500,

  // React props
  class: null,
  className: null,
  children: null,

  // Events
  onClick: null,
  on_click: null
}

/**
 * The tooltip component should be used as the call-to-action in a form, or as a user interaction mechanism. Generally speaking, a tooltip should not be used when a link would do the trick. Exceptions are made at times when it is used as a navigation element in the action-nav element.
 */
export default class Tooltip extends PureComponent {
  static tagName = 'dnb-tooltip'
  static propTypes = propTypes
  static defaultProps = defaultProps
  // static renderProps = renderProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(Tooltip.tagName, Tooltip, defaultProps)
  }

  static getContent(props) {
    return processChildren(props)
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
  }

  // constructor(props) {
  //   super(props)
  //   // pass along all props we wish to have as params
  //   // this.renderProps = pickRenderProps(props, renderProps)
  // }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow
    )

    const {
      component,
      target,
      class: class_name,
      className,
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

    const content = Tooltip.getContent(this.props)

    const classes = classnames(
      'dnb-tooltip',
      'dnb-core-style',
      createSpacingClasses(props),
      class_name,
      className
    )

    const attributes = {
      // ...this.renderProps,
      className: classes,
      ...params
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, attributes)

    const newProps = {
      ...this.props,
      internal_id: this._id,
      group: this.props.id || group
    }
    if (typeof newProps.active === 'undefined') {
      delete newProps.active
    }

    return (
      <>
        {component ? (
          <TooltipWithEvents
            target={component}
            attributes={attributes}
            {...newProps}
          >
            {content}
          </TooltipWithEvents>
        ) : (
          <TooltipPortal
            target={target}
            attributes={attributes}
            {...newProps}
          >
            {content}
          </TooltipPortal>
        )}
      </>
    )
  }
}
