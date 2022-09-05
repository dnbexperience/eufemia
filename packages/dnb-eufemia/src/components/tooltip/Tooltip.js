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
  processChildren,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import TooltipContainer from './TooltipContainer'
import TooltipWithEvents from './TooltipWithEvents'
import TooltipPortal from './TooltipPortal'
import { injectTooltipSemantic } from './TooltipHelpers'

export { injectTooltipSemantic }

export default class Tooltip extends React.PureComponent {
  static tagName = 'dnb-tooltip'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    group: PropTypes.string,
    size: PropTypes.oneOf(['basis', 'large']),
    active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    position: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    arrow: PropTypes.oneOf([
      null,
      'center',
      'top',
      'right',
      'bottom',
      'left',
    ]),
    align: PropTypes.oneOf([null, 'center', 'right', 'left']),
    animate_position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    fixed_position: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    skip_portal: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    show_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    hide_delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    target_selector: PropTypes.string,
    target_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
    ]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    tooltip: PropTypes.node,
  }

  static defaultProps = {
    id: null,
    group: null,
    size: 'basis',
    active: null,
    position: 'top',
    arrow: 'center',
    align: null,
    animate_position: false,
    fixed_position: false,
    skip_portal: null,
    no_animation: false,
    show_delay: 300,
    hide_delay: 500,
    target_selector: null,
    target_element: null,

    class: null,
    className: null,
    children: null,
    tooltip: null,
  }

  static enableWebComponent() {
    registerElement(Tooltip?.tagName, Tooltip, Tooltip.defaultProps)
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
      target_element,
      target_selector,
      class: class_name,
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

    const content = Tooltip.getContent(props)

    const classes = classnames(
      'dnb-tooltip',
      size === 'large' && 'dnb-tooltip--large',
      createSpacingClasses(props),
      class_name,
      className
    )

    const attributes = {
      className: classes,
      ...params,
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, attributes)

    const newProps = {
      ...this.props,
      ...inherited,
      internal_id: this._id,
      group: this.props.id || group || 'main-' + this._id,
    }
    if (newProps.active === null) {
      delete newProps.active
    }

    return (
      <>
        {skip_portal ? (
          <TooltipContainer
            target={target_element}
            attributes={attributes}
            {...newProps}
          >
            {content}
          </TooltipContainer>
        ) : target_element ? (
          <TooltipWithEvents
            target={target_element}
            attributes={attributes}
            {...newProps}
          >
            {content}
          </TooltipWithEvents>
        ) : (
          target_selector && (
            <TooltipPortal
              target={target_selector}
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
