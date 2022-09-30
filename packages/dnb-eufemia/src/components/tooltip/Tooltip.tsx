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
import { TooltipAllProps } from './types'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'

function Tooltip(localProps: TooltipAllProps) {
  const context = React.useContext(Context)

  const inherited = getPropsFromTooltipProp(localProps)

  // use only the props from context, who are available here anyway
  const props = convertSnakeCaseProps({
    ...defaultProps,
    ...localProps,
    ...inherited,
    ...context.getTranslation(localProps).Tooltip,
    ...context.Tooltip,
  })

  const {
    targetElement,
    targetSelector,
    className,
    id, // eslint-disable-line
    tooltip, // eslint-disable-line
    group,
    size,
    animatePosition, // eslint-disable-line
    fixedPosition, // eslint-disable-line
    skipPortal,
    noAnimation, // eslint-disable-line
    showDelay, // eslint-disable-line
    hideDelay, // eslint-disable-line
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
      {skipPortal ? (
        <TooltipContainer
          target={targetElement}
          attributes={attributes}
          {...props}
        >
          {props.children}
        </TooltipContainer>
      ) : targetElement ? (
        <TooltipWithEvents
          target={targetElement}
          attributes={attributes}
          {...props}
        >
          {props.children}
        </TooltipWithEvents>
      ) : (
        targetSelector && (
          <TooltipPortal
            target={targetSelector}
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
