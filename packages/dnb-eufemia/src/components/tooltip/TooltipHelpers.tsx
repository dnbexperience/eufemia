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
  group: null,
  size: 'basis',
  active: null,
  position: 'top',
  arrow: 'center',
  align: null,
  animatePosition: false,
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
}

export function getPropsFromTooltipProp(localProps) {
  return localProps.tooltip
    ? React.isValidElement(localProps.tooltip) && localProps.tooltip.props
      ? localProps.tooltip.props
      : { children: localProps.tooltip }
    : null
}
