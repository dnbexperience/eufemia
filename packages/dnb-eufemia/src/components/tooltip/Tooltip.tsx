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
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import TooltipWithEvents from './TooltipWithEvents'
import {
  defaultProps,
  getPropsFromTooltipProp,
  getRefElement,
  getTargetElement,
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
    group, // eslint-disable-line
    size,
    animatePosition, // eslint-disable-line
    fixedPosition, // eslint-disable-line
    skipPortal, // eslint-disable-line
    noAnimation, // eslint-disable-line
    showDelay, // eslint-disable-line
    hideDelay, // eslint-disable-line
    active, // eslint-disable-line
    position, // eslint-disable-line
    arrow, // eslint-disable-line
    align, // eslint-disable-line
    ...params
  } = props

  const target = targetElement || targetSelector

  const [element, setElement] = React.useState<
    HTMLElement | React.ReactElement
  >()
  const [internalId] = React.useState(() => props.id || makeUniqueId()) // cause we need an id anyway
  props.internalId = internalId

  React.useEffect(() => {
    const element = getTargetElement(getRefElement(target))
    setElement(element)
  }, [target])

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

  if (target && !element) {
    return null
  }

  return (
    <TooltipWithEvents target={element} attributes={attributes} {...props}>
      {props.children}
    </TooltipWithEvents>
  )
}

export { injectTooltipSemantic }
export default Tooltip
