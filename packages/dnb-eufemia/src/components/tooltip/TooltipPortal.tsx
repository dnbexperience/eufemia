/**
 * Web Tooltip Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import classnames from 'classnames'
import { makeUniqueId } from '../../shared/component-helper'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useMounted from '../../shared/helpers/useMounted'
import TooltipContainer from './TooltipContainer'
import { TooltipProps } from './types'
import { useTheme } from '../../shared'
import { getThemeClasses } from '../../shared/Theme'
import PortalRoot from '../PortalRoot'
import ModalContext from '../modal/ModalContext'

type TooltipType = {
  count?: number
  delayTimeout?: NodeJS.Timeout
  hiddenTimeout?: NodeJS.Timeout
}

let tooltipPortal: Record<string, TooltipType>
if (typeof globalThis !== 'undefined') {
  globalThis.tooltipPortal = globalThis.tooltipPortal || {}
  tooltipPortal = globalThis.tooltipPortal as Record<string, TooltipType>
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

  const modalContext = useContext(ModalContext)
  const [isActive, setIsActive] = useState(active)
  const [id] = useState(() => makeUniqueId())
  const isInDOM = useRef(false)

  const theme = useTheme()

  const makeTooltip = useCallback(() => {
    if (!tooltipPortal[id]) {
      tooltipPortal[id] = {
        count: 0,
      }
    }
  }, [id])

  const clearTimers = useCallback(() => {
    clearTimeout(tooltipPortal[id]?.delayTimeout)
    clearTimeout(tooltipPortal[id]?.hiddenTimeout)
  }, [id])

  const isMountedRef = useMounted()

  useEffect(() => {
    if (active) {
      clearTimers()
      makeTooltip()
      setIsActive(true)

      isInDOM.current = true

      if (!isMountedRef.current) {
        tooltipPortal[id].count++
      }
    } else if (!active && isMountedRef.current) {
      const delayRender = () => {
        setIsActive(false)
      }

      const delayHidden = () => {
        isInDOM.current = false
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
  }, [
    active,
    clearTimers,
    hideDelay,
    id,
    isMountedRef,
    makeTooltip,
    noAnimation,
  ])

  useMountEffect(() => {
    /**
     * Because of "aria-describedby" on the target element,
     * the Tooltip should exist in the DOM
     */
    if (keepInDOM) {
      makeTooltip()
    }
  })

  if (isInDOM.current || keepInDOM) {
    return (
      <PortalRoot>
        <div
          className={classnames(
            'dnb-tooltip__portal',
            theme && getThemeClasses(theme),
            modalContext?.id && 'dnb-tooltip--inside-modal'
          )}
        >
          <TooltipContainer
            {...props}
            targetElement={targetElement}
            active={isActive}
          >
            {children}
          </TooltipContainer>
        </div>
      </PortalRoot>
    )
  }

  return null
}

export default TooltipPortal
