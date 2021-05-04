/**
 * Web Tooltip Component
 *
 */

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
