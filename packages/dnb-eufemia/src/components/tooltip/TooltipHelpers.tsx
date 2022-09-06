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
  animate_position: false,
  fixed_position: false,
  skip_portal: null,
  no_animation: false,
  show_delay: 300,
  hide_delay: 500,
  target_selector: null,
  target_element: null,

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
