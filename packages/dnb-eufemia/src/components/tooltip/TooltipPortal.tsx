/**
 * Web Tooltip Component
 *
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { makeUniqueId, warn } from '../../shared/component-helper'
import TooltipContainer from './TooltipContainer'
import { TooltipProps } from './types'
import { useTheme } from '../../shared'
import { ThemeProps, getThemeClasses } from '../../shared/Theme'

type TooltipType = {
  node: HTMLElement
  count?: number
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
  targetElement: HTMLElement
  active: boolean
  keepInDOM?: boolean
  children?: React.ReactNode
}

function TooltipPortal(
  props: TooltipProps & TooltipPortalProps
): JSX.Element {
  const {
    active,
    targetElement,
    hideDelay,
    keepInDOM,
    noAnimation,
    children,
  } = props

  const [isMounted, setIsMounted] = React.useState(false)
  const [isActive, setIsActive] = React.useState(active)
  const [id] = React.useState(() => makeUniqueId())
  const isInDOM = React.useRef(false)

  const theme = useTheme()

  const makePortal = () => {
    if (!tooltipPortal[id]) {
      tooltipPortal[id] = {
        count: 0,
        node: createRootElement(theme),
      }
    }
  }

  const clearTimers = () => {
    clearTimeout(tooltipPortal[id]?.delayTimeout)
    clearTimeout(tooltipPortal[id]?.hiddenTimeout)
  }

  const removeFromDOM = (hide?: boolean) => {
    if (isActive && hide) {
      return // stop here
    }

    const ref = tooltipPortal[id]
    if (ref?.node) {
      ref.count--
      if (ref.count <= 0) {
        /**
         * Remove the referenced data
         */
        delete tooltipPortal[id]
      }
    }
  }

  React.useEffect(() => {
    setIsMounted(true)

    clearTimers()

    if (active) {
      makePortal()
      setIsActive(true)

      isInDOM.current = true

      if (!isMounted) {
        tooltipPortal[id].count++
      }
    } else if (!active && isMounted) {
      const delayRender = () => {
        setIsActive(false)
      }

      const delayHidden = () => {
        isInDOM.current = false
        removeFromDOM(true)
      }

      if (noAnimation || globalThis.IS_TEST) {
        delayRender()
        delayHidden()
      } else if (tooltipPortal[id]) {
        const delay = parseFloat(String(hideDelay))
        tooltipPortal[id].delayTimeout = setTimeout(delayRender, delay)
        tooltipPortal[id].hiddenTimeout = setTimeout(
          delayHidden,
          delay + 300
        )
      }
    }

    return clearTimers

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, active, id, hideDelay, noAnimation])

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

  const root = tooltipPortal[id]?.node

  if (root) {
    return ReactDOM.createPortal(
      isInDOM.current || keepInDOM ? (
        <TooltipContainer
          {...props}
          targetElement={targetElement}
          active={isActive}
        >
          {children}
        </TooltipContainer>
      ) : null,
      root
    )
  }

  return null
}

export default TooltipPortal

const createRootElement = (theme: ThemeProps, className = null) => {
  if (!className) {
    className = 'dnb-tooltip__portal'
  }
  try {
    const element: HTMLElement = document.querySelector(`.${className}`)

    if (element) {
      return element
    }

    const elem = document.createElement('div')
    elem.classList.add(className)
    elem.classList.add('dnb-core-style')

    if (theme) {
      elem.classList.add.call(
        elem.classList,
        ...getThemeClasses(theme).split(' ')
      )
    }

    document.body.appendChild(elem)

    return elem
  } catch (e) {
    warn(e)
  }
}
