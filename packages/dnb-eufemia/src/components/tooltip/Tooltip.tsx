/**
 * Web Tooltip Component
 *
 */

import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import Context from '../../shared/Context'
import type { ContextProps } from '../../shared/Context'
import { validateDOMAttributes } from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import { applySpacing } from '../space/SpacingUtils'
import TooltipWithEvents from './TooltipWithEvents'
import {
  defaultProps,
  getPropsFromTooltipProp,
  getTargetElement,
  injectTooltipSemantic,
} from './TooltipHelpers'
import type { TooltipAllProps } from './types'
import { TooltipContext } from './TooltipContext'
import getRefElement from '../../shared/internal/getRefElement'

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
    tooltip,
    fixedPosition,
    skipPortal,
    noAnimation,
    showDelay,
    hideDelay,
    open,
    placement,
    arrow,
    align,
    portalRootClass,
    omitDescribedBy,
    contentRef,
    triggerOffset,
    ...attributeProps
  } = props

  const targetSource = targetElement || targetSelector
  const target = useTooltipTarget(targetElement, targetSelector)
  const internalId = useId(id)
  const isControlled = typeof open === 'boolean'

  if (targetSource && !target) {
    return null
  }

  const attributes = applySpacing(props, {
    ...attributeProps,
    className: clsx(
      'dnb-tooltip',
      size === 'large' && 'dnb-tooltip--large',
      className
    ),
  }) as React.HTMLAttributes<HTMLElement>

  // also used for code markup simulation
  validateDOMAttributes(localProps, attributes)
  return (
    <TooltipContext value={{ isControlled, internalId, props }}>
      <TooltipWithEvents
        target={target}
        attributes={attributes}
        {...props}
      >
        {children}
      </TooltipWithEvents>
    </TooltipContext>
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

  return {
    ...defaultProps,
    ...localProps,
    ...inherited,
    ...tooltipTranslation,
    ...context.Tooltip,
  }
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
      getTargetElement(
        typeof source === 'string'
          ? source
          : getRefElement(source as React.RefObject<unknown>)
      ) || (typeof source === 'string' ? null : source)

    setTarget(resolved as HTMLElement | React.ReactElement | null)
  }, [source])

  return target
}

Tooltip.isTooltipComponent = true

export { injectTooltipSemantic }
export default Tooltip
