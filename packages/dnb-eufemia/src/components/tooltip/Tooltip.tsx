/**
 * Web Tooltip Component
 *
 */

import React, { useContext, useEffect, useReducer, useRef } from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { validateDOMAttributes } from '../../shared/component-helper'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import useId from '../../shared/helpers/useId'
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

function Tooltip(localProps: TooltipAllProps) {
  const context = useContext(Context)

  const inherited = getPropsFromTooltipProp(localProps)

  // use only the props from context, who are available here anyway
  const props = convertSnakeCaseProps({
    ...defaultProps,
    ...localProps,
    ...inherited,
    ...context.getTranslation(localProps)['Tooltip'],
    ...context.Tooltip,
  })

  const {
    targetElement,
    targetSelector,
    className,
    id,
    tooltip, // eslint-disable-line
    size,
    fixedPosition, // eslint-disable-line
    skipPortal, // eslint-disable-line
    noAnimation, // eslint-disable-line
    showDelay, // eslint-disable-line
    hideDelay, // eslint-disable-line
    active, // eslint-disable-line
    position, // eslint-disable-line
    arrow, // eslint-disable-line
    align, // eslint-disable-line
    portalRootClass, // eslint-disable-line
    omitDescribedBy, // eslint-disable-line
    ...params
  } = props

  const target = targetElement || targetSelector

  const [, forceUpdate] = useReducer(() => ({}), {})
  const elementRef = useRef<HTMLElement>()
  const internalId = useId(id)
  props.internalId = internalId

  useEffect(() => {
    const firstTimeRender = !elementRef.current
    elementRef.current = getTargetElement(getRefElement(target))
    if (firstTimeRender) {
      forceUpdate()
    }
  }, [target])

  if (target && !elementRef.current) {
    return null
  }

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

  return (
    <TooltipWithEvents
      target={elementRef.current}
      attributes={attributes}
      {...props}
    >
      {props.children}
    </TooltipWithEvents>
  )
}

export { injectTooltipSemantic }
export default Tooltip
