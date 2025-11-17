/**
 * Web Popover Component
 */

import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { makeUniqueId } from '../../shared/component-helper'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useMounted from '../../shared/helpers/useMounted'
import { useTheme } from '../../shared'
import { getThemeClasses } from '../../shared/Theme'
import PortalRoot from '../PortalRoot'
import ModalContext from '../modal/ModalContext'
import PopoverContainer from './PopoverContainer'

type PopoverPortalProps = {
  targetElement?: HTMLElement | null
  active: boolean
  hideDelay: number
  keepInDOM?: boolean
  noAnimation?: boolean
  portalRootClass?: string
  children?: React.ReactNode
  attributes?: React.HTMLAttributes<HTMLElement>
  arrow?: React.ComponentProps<typeof PopoverContainer>['arrow']
  position?: React.ComponentProps<typeof PopoverContainer>['position']
  align?: React.ComponentProps<typeof PopoverContainer>['align']
  fixedPosition?: boolean
  omitDescribedBy?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
}

type PopoverPortalEntry = {
  count?: number
  delayTimeout?: NodeJS.Timeout
  hiddenTimeout?: NodeJS.Timeout
}

let popoverPortal: Record<string, PopoverPortalEntry>
if (typeof globalThis !== 'undefined') {
  globalThis.popoverPortal = globalThis.popoverPortal || {}
  popoverPortal = globalThis.popoverPortal as Record<
    string,
    PopoverPortalEntry
  >
} else {
  popoverPortal = {}
}

function PopoverPortal(props: PopoverPortalProps) {
  const {
    active,
    targetElement,
    hideDelay,
    keepInDOM,
    noAnimation,
    portalRootClass,
    children,
    attributes,
    arrow,
    position,
    align,
    fixedPosition,
    omitDescribedBy,
    contentRef,
  } = props

  const [id] = useState(() => makeUniqueId())
  const modalContext = useContext(ModalContext)
  const theme = useTheme()

  const { isActive: portalActive, shouldRenderPortal } =
    usePopoverPortalLifecycle({
      id,
      active,
      hideDelay,
      keepInDOM,
      noAnimation,
    })

  if (!shouldRenderPortal) {
    return null
  }

  return (
    <PortalRoot>
      <div
        className={classnames(
          'dnb-popover__portal',
          portalRootClass,
          theme && getThemeClasses(theme),
          modalContext?.id && 'dnb-popover--inside-modal'
        )}
      >
        <PopoverContainer
          active={portalActive}
          targetElement={targetElement || null}
          hideDelay={hideDelay}
          noAnimation={noAnimation}
          arrow={arrow}
          position={position}
          align={align}
          fixedPosition={fixedPosition}
          omitDescribedBy={omitDescribedBy}
          attributes={attributes}
          contentRef={contentRef}
        >
          {children}
        </PopoverContainer>
      </div>
    </PortalRoot>
  )
}

export default PopoverPortal

type PopoverPortalLifecycleProps = {
  id: string
  active: boolean
  hideDelay: number
  keepInDOM?: boolean
  noAnimation?: boolean
}

function usePopoverPortalLifecycle({
  id,
  active,
  hideDelay,
  keepInDOM,
  noAnimation,
}: PopoverPortalLifecycleProps) {
  const [isActive, setIsActive] = useState(active)
  const isMountedRef = useMounted()
  const isInDOM = useRef(false)

  const ensurePortalEntry = useCallback(() => {
    if (!popoverPortal[id]) {
      popoverPortal[id] = {
        count: 0,
      }
    }
    return popoverPortal[id]
  }, [id])

  const clearTimers = useCallback(() => {
    const entry = popoverPortal[id]
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
