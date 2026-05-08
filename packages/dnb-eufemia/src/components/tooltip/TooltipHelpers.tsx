import { isValidElement } from 'react'
/**
 * Web Tooltip Component
 *
 */

import clsx from 'clsx'
import type { TooltipAllProps } from './types'

export function injectTooltipSemantic(params) {
  params.tabIndex = '0'
  params.className = clsx(
    'dnb-tooltip__wrapper',
    'dnb-tab-focus',
    params.className
  )
  return params
}

export const defaultProps: Partial<TooltipAllProps> = {
  size: 'default',
  placement: 'top',
  arrow: 'center',
  fixedPosition: false,
  noAnimation: false,
  showDelay: 300,
  hideDelay: 500,
  triggerOffset: 16,
} as const

export function getTargetElement(target: HTMLElement | string | null) {
  if (typeof document !== 'undefined') {
    return typeof target === 'string'
      ? typeof document !== 'undefined' && document.querySelector(target)
      : target
  }
  return undefined
}

export function getPropsFromTooltipProp(localProps: {
  tooltip?: TooltipAllProps['tooltip']
}): Partial<TooltipAllProps> | null {
  const { tooltip } = localProps

  if (!tooltip) {
    return null
  }

  if (isValidElement(tooltip)) {
    const type = tooltip.type as typeof tooltip.type & {
      isTooltipComponent?: boolean
    }

    // If the tooltip prop is itself a <Tooltip> component,
    // inherit its props (including its children).
    if (type?.isTooltipComponent) {
      return tooltip.props as Partial<TooltipAllProps>
    }

    // For all other React elements (e.g. <Translation />),
    // treat the element itself as the tooltip content.
  }

  // Primitive values (string, number, etc.) and all other nodes
  // become tooltip children
  return { children: tooltip } as Partial<TooltipAllProps>
}

export const isTouch = (type: string) => {
  return /touch/i.test(type)
}
