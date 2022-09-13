/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { combineDescribedBy, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'
import { TooltipProps } from './types'

type TooltipType = {
  node: HTMLElement
  count: number
  timeout?: NodeJS.Timeout
}

let tooltipPortal: Record<string, TooltipType>
if (typeof globalThis !== 'undefined') {
  globalThis.tooltipPortal = globalThis.tooltipPortal || {}
  tooltipPortal = globalThis.tooltipPortal
} else {
  tooltipPortal = {}
}

type TooltipPortalProps = {
  target: HTMLElement
  active: boolean
  group?: string
  internalId?: string
  children?: React.ReactNode
}

function TooltipPortal(props: TooltipProps & TooltipPortalProps) {
  const {
    active,
    group,
    target,
    hideDelay,
    noAnimation,
    internalId,
    children,
  } = props

  const [isMounted, setIsMounted] = React.useState(false)

  React.useLayoutEffect(() => {
    const getRootElement = () => {
      if (typeof document !== 'undefined') {
        try {
          const elem = document.createElement('div')
          elem.classList.add('dnb-tooltip__portal')
          elem.classList.add('dnb-core-style')
          document.body.appendChild(elem)

          return elem
        } catch (e) {
          warn(e)
        }
      }
    }

    tooltipPortal[group] = tooltipPortal[group] || {
      node: getRootElement(),
      count: 0,
    }

    tooltipPortal[group].count++

    setIsMounted(true)

    if (!isMainGorup(group) && active) {
      renderPortal(true)
    }

    return () => {
      if (tooltipPortal[group]) {
        tooltipPortal[group].count--

        if (!isMainGorup(group)) {
          clearTimeout(tooltipPortal[group].timeout)
          ReactDOM.unmountComponentAtNode(tooltipPortal[group].node)
        }

        if (tooltipPortal[group].count === 0) {
          try {
            document.body.removeChild(tooltipPortal[group].node)
          } catch (e) {
            //
          }

          tooltipPortal[group] = null
        }
      }
    }
  }, [])

  React.useEffect(() => {
    if (tooltipPortal?.[group]) {
      clearTimeout(tooltipPortal[group].timeout)

      if (active) {
        if (!isMainGorup(group)) {
          renderPortal(true)
        }
      } else if (!active) {
        const run = () => {
          if (!isMainGorup(group)) {
            renderPortal(false)
          }
        }
        if (noAnimation || globalThis.IS_TEST) {
          run()
        } else {
          tooltipPortal[group].timeout = setTimeout(
            run,
            parseFloat(String(hideDelay))
          )
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, active, group, hideDelay, noAnimation])

  const renderPortal = (isActive: boolean) => {
    const targetElement = getTargetElement(target)

    if (!isMainGorup(group) && tooltipPortal[group]) {
      clearTimeout(tooltipPortal[group].timeout)
    }

    handleAria(targetElement, internalId)

    if (isMainGorup(group)) {
      return ReactDOM.createPortal(
        <TooltipContainer
          {...props}
          targetElement={targetElement}
          active={isActive}
        />,
        tooltipPortal[group].node
      )
    } else {
      ReactDOM.render(
        <TooltipContainer
          {...props}
          targetElement={targetElement}
          active={isActive}
        />,
        tooltipPortal[group].node
      )
    }
  }

  if (isMounted && isMainGorup(group)) {
    return renderPortal(active)
  }

  return <></>
}

export default TooltipPortal

const isMainGorup = (group) => {
  return group.includes('main')
}

const getTargetElement = (target) => {
  if (typeof document !== 'undefined') {
    return typeof target === 'string'
      ? typeof document !== 'undefined' && document.querySelector(target)
      : target
  }
}

const handleAria = (elem: HTMLElement, internalId: string) => {
  try {
    if (!elem.classList.contains('dnb-tooltip__wrapper')) {
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
}
