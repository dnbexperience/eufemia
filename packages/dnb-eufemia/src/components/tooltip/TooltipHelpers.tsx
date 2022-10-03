/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { combineDescribedBy } from '../../shared/component-helper'

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

export function getTargetElement(target: HTMLElement) {
  if (typeof document !== 'undefined') {
    return typeof target === 'string'
      ? typeof document !== 'undefined' && document.querySelector(target)
      : target
  }
}

export function useHandleAria(
  targetElement: React.RefObject<HTMLElement>,
  internalId: string
) {
  React.useEffect(() => {
    try {
      const elem = getTargetElement(getRefElement(targetElement))
      if (!elem?.classList.contains('dnb-tooltip__wrapper')) {
        const existing = {
          'aria-describedby': elem.getAttribute('aria-describedby'),
        }
        elem.setAttribute(
          'aria-describedby',
          combineDescribedBy(existing, internalId)
        )
      }
    } catch (e) {
      //
    }
  }, [targetElement, internalId])
}

export function getPropsFromTooltipProp(localProps) {
  return localProps.tooltip
    ? React.isValidElement(localProps.tooltip) && localProps.tooltip.props
      ? localProps.tooltip.props
      : { children: localProps.tooltip }
    : null
}

export function getRefElement(target: React.RefObject<HTMLElement>) {
  const unknownTarget = target as unknown as React.RefObject<{
    _ref: React.RefObject<HTMLElement>
  }>
  let element = target as HTMLElement | React.RefObject<HTMLElement>

  // "_ref" is set inside e.g. the Button component (among many others)
  if (unknownTarget?.current?._ref) {
    element = getRefElement(unknownTarget.current._ref)
  }

  if (Object.prototype.hasOwnProperty.call(element, 'current')) {
    element = (element as React.RefObject<HTMLElement>).current
  }

  return element as HTMLElement
}

export const isTouch = (type: string) => {
  return /touch/i.test(type)
}
