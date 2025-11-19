/**
 * Web Tooltip Component
 *
 */

import React, { useContext, useEffect } from 'react'
import classnames from 'classnames'
import { combineDescribedBy } from '../../shared/component-helper'
import { TooltipContext } from './TooltipContext'

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
}

export function getTargetElement(target: HTMLElement) {
  if (typeof document !== 'undefined') {
    return typeof target === 'string'
      ? typeof document !== 'undefined' && document.querySelector(target)
      : target
  }
}

export function useHandleAria(targetElement?: HTMLElement | null) {
  const {
    internalId,
    props: { omitDescribedBy },
  } = useContext(TooltipContext)

  useEffect(() => {
    if (omitDescribedBy || !targetElement) {
      return // do nothing
    }
    try {
      const existing = {
        'aria-describedby': targetElement.getAttribute('aria-describedby'),
      }
      targetElement.setAttribute(
        'aria-describedby',
        combineDescribedBy(existing, internalId)
      )
    } catch (e) {
      //
    }
  }, [targetElement, internalId, omitDescribedBy])
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
