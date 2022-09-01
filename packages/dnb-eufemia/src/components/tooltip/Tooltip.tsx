/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  processChildren,
  isTrue,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import TooltipContainer from './TooltipContainer'
import TooltipWithEvents from './TooltipWithEvents'
import TooltipPortal from './TooltipPortal'
import { defaultProps, injectTooltipSemantic } from './TooltipHelpers'
import { ISpacingProps } from '../../shared/interfaces'
import { TooltipProps } from './types'
import { includeValidProps } from '../form-row/FormRowHelpers'

export { injectTooltipSemantic }

export default class Tooltip extends React.PureComponent<
  TooltipProps & ISpacingProps
> {
  _id: string

  static tagName = 'dnb-tooltip'
  static contextType = Context

  static enableWebComponent() {
    registerElement(Tooltip?.tagName, Tooltip, defaultProps)
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
    const props = {
      ...defaultProps,
      ...this.props,
      ...inherited,
      ...this.context.getTranslation(this.props).Tooltip,
      ...includeValidProps(this.context.FormRow),
      ...this.context.Tooltip,
    }

    const {
      target_element,
      target_selector,
      className,
      id, // eslint-disable-line
      tooltip, // eslint-disable-line
      group,
      size,
      animate_position, // eslint-disable-line
      fixed_position, // eslint-disable-line
      skip_portal,
      no_animation, // eslint-disable-line
      show_delay, // eslint-disable-line
      hide_delay, // eslint-disable-line
      active, // eslint-disable-line
      position, // eslint-disable-line
      arrow, // eslint-disable-line
      align, // eslint-disable-line
      ...params
    } = props

    props.internal_id = this._id
    props.group = this.props.id || group || 'main-' + this._id

    const content = Tooltip.getContent(props)

    const classes = classnames(
      'dnb-tooltip',
      size === 'large' && 'dnb-tooltip--large',
      createSpacingClasses(props),
      className
    )

    const attributes = {
      className: classes,
      ...params,
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, attributes)

    if (!isTrue(props.active)) {
      delete props.active
    }

    return (
      <>
        {skip_portal ? (
          <TooltipContainer
            target={target_element}
            attributes={attributes}
            {...props}
          >
            {content}
          </TooltipContainer>
        ) : target_element ? (
          <TooltipWithEvents
            target={target_element}
            attributes={attributes}
            {...props}
          >
            {content}
          </TooltipWithEvents>
        ) : (
          target_selector && (
            <TooltipPortal
              target={target_selector}
              attributes={attributes}
              {...props}
            >
              {content}
            </TooltipPortal>
          )
        )}
      </>
    )
  }
}
