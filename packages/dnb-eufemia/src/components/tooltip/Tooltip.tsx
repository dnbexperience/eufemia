/**
 * Web Tooltip Component
 *
 */

import React, { useContext, useEffect, useState } from 'react'
import classnames from 'classnames'
import Context from '../../shared/Context'
import { validateDOMAttributes } from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import { createSpacingClasses } from '../space/SpacingHelper'
import TooltipWithEvents from './TooltipWithEvents'
import {
  defaultProps,
  getPropsFromTooltipProp,
  getTargetElement,
  injectTooltipSemantic,
} from './TooltipHelpers'
import { TooltipContext } from './TooltipContext'
import { getRefElement } from '../popover/Popover'
import { TooltipAllProps } from './types'

function Tooltip(localProps: TooltipAllProps) {
  const context = React.useContext(Context)

  const inherited = getPropsFromTooltipProp(localProps)

  // use only the props from context, who are available here anyway
  const props = {
    ...defaultProps,
    ...localProps,
    ...inherited,
    ...context.getTranslation(localProps)['Tooltip'],
    ...context.Tooltip,
  }
  const {
    targetElement,
    targetSelector,
    className,
    id,
    size,
    children,
    tooltip, // eslint-disable-line
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
    contentRef, // eslint-disable-line
    triggerOffset, // eslint-disable-line
    forceActive, // eslint-disable-line
    ...attributeProps
  } = props

  const targetSource = targetElement || targetSelector
  const target = useTooltipTarget(targetElement, targetSelector)
  const internalId = useId(id)
  const [isControlled] = useState(() => typeof active === 'boolean')

  if (targetSource && !target) {
    return null
  }

  const classes = buildClassNames(size, className, props)
  const attributes = createAttributes(classes, attributeProps)

  // also used for code markup simulation
  validateDOMAttributes(localProps, attributes)

  return (
    <TooltipContext.Provider value={{ isControlled, internalId, props }}>
      <TooltipWithEvents
        target={target}
        attributes={attributes}
        forceActive={forceActive}
        {...props}
      >
        {tooltip || children}
      </TooltipWithEvents>
    </TooltipContext.Provider>
  )
}

function useTooltipTarget(
  targetElement: TooltipAllProps['targetElement'],
  targetSelector: TooltipAllProps['targetSelector']
) {
  const [target, setTarget] = useState<
    TooltipAllProps['targetElement'] | HTMLElement | null
  >(null)
  const source = targetElement || targetSelector

  useEffect(() => {
    if (!source) {
      setTarget(null)
      return
    }

    const resolved =
      getTargetElement(getRefElement(source)) ||
      (typeof source === 'string' ? null : source)

    setTarget(resolved as HTMLElement | React.ReactElement | null)
  }, [source])

  return target
}

function buildClassNames(
  size: TooltipAllProps['size'],
  className: TooltipAllProps['className'],
  props: TooltipAllProps
) {
  return classnames(
    'dnb-tooltip',
    size === 'large' && 'dnb-tooltip--large',
    createSpacingClasses(props),
    className
  )
}

function createAttributes(
  className: string,
  attributeProps: Record<string, unknown>
): React.HTMLAttributes<HTMLElement> {
  return {
    className,
    ...attributeProps,
  }
}

export { injectTooltipSemantic }
export default Tooltip
