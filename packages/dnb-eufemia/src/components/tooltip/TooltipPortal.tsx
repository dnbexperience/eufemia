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
    portalRootClass,
  } = props

  const modalContext = useContext(ModalContext)
  const [id] = useState(() => makeUniqueId())
  const theme = useTheme()

  const { isActive: portalActive, shouldRenderPortal } =
    useTooltipPortalLifecycle({
      id,
      active,
      hideDelay,
      keepInDOM,
      noAnimation,
    })

  if (shouldRenderPortal) {
    return (
      <PortalRoot>
        <div
          className={classnames(
            'dnb-tooltip__portal',
            portalRootClass,
            theme && getThemeClasses(theme),
            modalContext?.id && 'dnb-tooltip--inside-modal'
          )}
        >
          <TooltipContainer
            {...props}
            targetElement={targetElement}
            active={portalActive}
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

type TooltipPortalLifecycleProps = {
  id: string
  active: boolean
  hideDelay: number
  keepInDOM?: boolean
  noAnimation?: boolean
}

function useTooltipPortalLifecycle({
  id,
  active,
  hideDelay,
  keepInDOM,
  noAnimation,
}: TooltipPortalLifecycleProps) {
  const [isActive, setIsActive] = useState(active)
  const isMountedRef = useMounted()
  const isInDOM = useRef(false)

  const ensurePortalEntry = useCallback(() => {
    if (!tooltipPortal[id]) {
      tooltipPortal[id] = {
        count: 0,
      }
    }
    return tooltipPortal[id]
  }, [id])

  const clearTimers = useCallback(() => {
    const entry = tooltipPortal[id]
    if (entry) {
      clearTimeout(entry.delayTimeout)
      clearTimeout(entry.hiddenTimeout)
    }
  }, [id])

  useEffect(() => {
    const entry = ensurePortalEntry()

    if (active) {
      clearTimers()
      setIsActive(true)
      isInDOM.current = true

      if (!isMountedRef.current) {
        entry.count++
      }

      return () => {
        clearTimers()
      }
    }

    if (!isMountedRef.current) {
      return () => {
        clearTimers()
      }
    }

    const delayRender = () => setIsActive(false)
    const delayHidden = () => {
      isInDOM.current = false
    }

    if (noAnimation || globalThis.IS_TEST) {
      delayRender()
      delayHidden()
      return () => {
        clearTimers()
      }
    }

    const delay = parseFloat(String(hideDelay))
    entry.delayTimeout = setTimeout(delayRender, delay)
    entry.hiddenTimeout = setTimeout(delayHidden, delay + 300)

    return () => {
      clearTimers()
    }
  }, [
    active,
    clearTimers,
    ensurePortalEntry,
    hideDelay,
    isMountedRef,
    noAnimation,
  ])

  useMountEffect(() => {
    if (keepInDOM) {
      ensurePortalEntry()
    }
  })

  return { isActive, shouldRenderPortal: isInDOM.current || keepInDOM }
}
