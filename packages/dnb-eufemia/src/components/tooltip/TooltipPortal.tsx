/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { makeUniqueId, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'
import { getTargetElement } from './TooltipHelpers'
import { TooltipProps } from './types'

type TooltipType = {
  node: HTMLElement
  inDOM?: boolean
  delayTimeout?: NodeJS.Timeout
  hiddenTimeout?: NodeJS.Timeout
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
  keepInDOM?: boolean
  group?: string
  children?: React.ReactNode
}

function TooltipPortal(props: TooltipProps & TooltipPortalProps) {
  const { active, target, hideDelay, keepInDOM, noAnimation, children } =
    props

  const [isMounted, setIsMounted] = React.useState(false)
  const [isActive, setIsActive] = React.useState(active)
  const [group] = React.useState(() => props.group || makeUniqueId())
  const isInDOM = React.useRef(false)
  const hasGroup = props.group

  if (tooltipPortal[group]) {
    tooltipPortal[group].inDOM = isInDOM.current
  }

  const makePortal = () => {
    if (!tooltipPortal[group]) {
      tooltipPortal[group] = {
        node: hasGroup
          ? createGroupElement(group)
          : createRootElement('dnb-tooltip__portal'),
      }
    }
  }

  const removeFromDOM = () => {
    if (
      !keepInDOM &&
      hasGroup &&
      tooltipPortal[group] &&
      !tooltipPortal[group].inDOM
    ) {
      ReactDOM.unmountComponentAtNode(tooltipPortal[group].node)
    }
  }

  React.useEffect(() => {
    setIsMounted(true)

    clearTimeout(tooltipPortal[group]?.delayTimeout)
    clearTimeout(tooltipPortal[group]?.hiddenTimeout)

    if (active) {
      makePortal()

      setIsActive(true)
      isInDOM.current = true

      if (hasGroup) {
        renderPortal(true) // re-render
      }
    } else if (!active && isMounted) {
      const delayRender = () => {
        setIsActive(false)

        if (hasGroup) {
          renderPortal(false) // re-render
        }
      }

      const delayHidden = () => {
        isInDOM.current = false
        removeFromDOM()
      }

      if (noAnimation || globalThis.IS_TEST) {
        delayRender()
        delayHidden()
      } else if (tooltipPortal[group]) {
        const delay = parseFloat(String(hideDelay))
        tooltipPortal[group].delayTimeout = setTimeout(delayRender, delay)
        tooltipPortal[group].hiddenTimeout = setTimeout(
          delayHidden,
          delay + 300
        )
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, active, group, hideDelay, noAnimation])

  React.useEffect(() => {
    /**
     * Because of "aria-describedby" on the target element,
     * the Tooltip should exist in the DOM
     */
    if (keepInDOM) {
      makePortal()
    }

    return removeFromDOM
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderPortal = (isActive: boolean) => {
    const root = tooltipPortal[group]?.node

    // Ensure we only render when it should (is in DOM)
    if (root && hasGroup && isInDOM.current) {
      ReactDOM.render(
        <TooltipContainer
          {...props}
          targetElement={getTargetElement(target)}
          active={isActive}
        />,
        root
      )
    }

    return null
  }

  if (!hasGroup) {
    const root = tooltipPortal[group]?.node

    if (root) {
      return ReactDOM.createPortal(
        isInDOM.current || keepInDOM ? (
          <TooltipContainer
            {...props}
            targetElement={getTargetElement(target)}
            active={isActive}
          >
            {children}
          </TooltipContainer>
        ) : null,
        root
      )
    }
  }

  return null
}

export default TooltipPortal

const createGroupElement = (id: string) => {
  try {
    const elem = document.createElement('div')
    elem.classList.add('dnb-tooltip__group')
    elem.setAttribute('id', id)
    createRootElement('dnb-tooltip__portal').appendChild(elem)

    return elem
  } catch (e) {
    warn(e)
  }
}

const createRootElement = (className: string) => {
  try {
    const element: HTMLElement = document.querySelector(`.${className}`)

    if (element) {
      return element
    }

    const elem = document.createElement('div')
    elem.classList.add(className)
    elem.classList.add('dnb-core-style')
    document.body.appendChild(elem)

    return elem
  } catch (e) {
    warn(e)
  }
}
