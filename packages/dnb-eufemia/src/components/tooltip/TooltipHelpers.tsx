/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import classnames from 'classnames'

export function injectTooltipSemantic(params) {
  params.tabIndex = '0'
  params.className = classnames(
    'dnb-tooltip__wrapper',
    'dnb-tab-focus',
    params.className
  )
  return params
}

export const defaultProps = {
  id: null,
  size: 'basis',
  active: null,
  position: 'top',
  arrow: 'center',
  align: null,
  fixedPosition: false,
  skipPortal: null,
  noAnimation: false,
  showDelay: 300,
  hideDelay: 500,
  targetSelector: null,
  targetElement: null,
  className: null,
  children: null,
  tooltip: null,
  triggerOffset: 16,
}

export function getTargetElement(target: HTMLElement) {
  if (typeof document !== 'undefined') {
    return typeof target === 'string'
      ? typeof document !== 'undefined' && document.querySelector(target)
      : target
  }
}

export function getPropsFromTooltipProp(localProps) {
  return localProps.tooltip
    ? React.isValidElement(localProps.tooltip) && localProps.tooltip.props
      ? localProps.tooltip.props
      : { children: localProps.tooltip }
    : null
}

export const isTouch = (type: string) => {
  return /touch/i.test(type)
}
