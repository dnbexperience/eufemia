/**
 * Web Tooltip Component
 *
 */

import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import type { ContextProps } from '../../shared/Context'
import { validateDOMAttributes } from '../../shared/component-helper'
import { convertSnakeCaseProps } from '../../shared/helpers/withSnakeCaseProps'
import useId from '../../shared/helpers/useId'
import { createSpacingClasses } from '../space/SpacingHelper'
import TooltipWithEvents from './TooltipWithEvents'
import {
  defaultProps,
  getPropsFromTooltipProp,
  getTargetElement,
  injectTooltipSemantic,
} from './TooltipHelpers'
import { TooltipAllProps } from './types'
import { TooltipContext } from './TooltipContext'
import { getRefElement } from '../Popover'

function Tooltip(localProps: TooltipAllProps) {
  const context = useContext(Context)
  const props = resolveProps(localProps, context)
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
        {children}
      </TooltipWithEvents>
    </TooltipContext.Provider>
  )
}

function resolveProps(
  localProps: TooltipAllProps,
  context: ContextProps
): TooltipAllProps {
  const inherited = getPropsFromTooltipProp(localProps)
  const translation = (context.getTranslation?.(
    localProps as Record<string, unknown>
  ) || {}) as Record<string, unknown>
  const tooltipTranslation = (translation['Tooltip'] || {}) as Record<
    string,
    unknown
  >

  // Use only the props from context that are relevant for Tooltip
  return convertSnakeCaseProps({
    ...defaultProps,
    ...localProps,
    ...inherited,
    ...tooltipTranslation,
    ...context.Tooltip,
  })
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
  return clsx(
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

Tooltip.isTooltipComponent = true

export { injectTooltipSemantic }
export default Tooltip
