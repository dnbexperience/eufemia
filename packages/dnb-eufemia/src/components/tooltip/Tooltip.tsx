/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  makeUniqueId,
  validateDOMAttributes,
  isTrue,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import TooltipContainer from './TooltipContainer'
import TooltipWithEvents from './TooltipWithEvents'
import TooltipPortal from './TooltipPortal'
import {
  defaultProps,
  getPropsFromTooltipProp,
  injectTooltipSemantic,
} from './TooltipHelpers'
import { ISpacingProps } from '../../shared/interfaces'
import { TooltipProps } from './types'
import { includeValidProps } from '../form-row/FormRowHelpers'

function Tooltip(localProps: TooltipProps & ISpacingProps) {
  const context = React.useContext(Context)

  const inherited = getPropsFromTooltipProp(localProps)

  // use only the props from context, who are available here anyway
  const props = {
    ...defaultProps,
    ...localProps,
    ...inherited,
    ...context.getTranslation(localProps).Tooltip,
    ...includeValidProps(context.FormRow),
    ...context.Tooltip,
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

  const [internalId] = React.useState(() => props.id || makeUniqueId()) // cause we need an id anyway
  props.internalId = internalId
  props.group = group || localProps.id || 'main-' + props.internalId

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
  validateDOMAttributes(localProps, attributes)

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
          {props.children}
        </TooltipContainer>
      ) : target_element ? (
        <TooltipWithEvents
          target={target_element}
          attributes={attributes}
          {...props}
        >
          {props.children}
        </TooltipWithEvents>
      ) : (
        target_selector && (
          <TooltipPortal
            target={target_selector}
            attributes={attributes}
            {...props}
          >
            {props.children}
          </TooltipPortal>
        )
      )}
    </>
  )
}

export { injectTooltipSemantic }
export default Tooltip
