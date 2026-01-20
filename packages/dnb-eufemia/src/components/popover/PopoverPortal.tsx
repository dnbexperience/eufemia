/**
 * Web Popover Component
 */

import React, { useCallback, useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import { makeUniqueId } from '../../shared/component-helper'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useMounted from '../../shared/helpers/useMounted'
import { useTheme } from '../../shared'
import { getThemeClasses } from '../../shared/Theme'
import PortalRoot from '../PortalRoot'
import ModalContext from '../modal/ModalContext'
import PopoverContainer from './PopoverContainer'
import type {
  PopoverAutoAlignMode,
  PopoverResolvedTargetElement,
} from './types'

type PopoverPortalProps = {
  baseClassNames?: string[]
  targetElement?: PopoverResolvedTargetElement
  active: boolean
  showDelay: number
  hideDelay: number
  keepInDOM?: boolean
  noAnimation?: boolean
  portalRootClass?: string
  children?: React.ReactNode
  attributes?: React.HTMLAttributes<HTMLElement>
  arrowPosition?: React.ComponentProps<
    typeof PopoverContainer
  >['arrowPosition']
  placement?: React.ComponentProps<typeof PopoverContainer>['placement']
  alignOnTarget?: React.ComponentProps<
    typeof PopoverContainer
  >['alignOnTarget']
  horizontalOffset?: React.ComponentProps<
    typeof PopoverContainer
  >['horizontalOffset']
  arrowPositionSelector?: React.ComponentProps<
    typeof PopoverContainer
  >['arrowPositionSelector']
  fixedPosition?: boolean
  contentRef?: React.MutableRefObject<HTMLSpanElement>
  triggerOffset?: number
  autoAlignMode?: PopoverAutoAlignMode
  hideArrow?: boolean
  arrowEdgeOffset?: React.ComponentProps<
    typeof PopoverContainer
  >['arrowEdgeOffset']
  targetRefreshKey?: unknown
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
    baseClassNames = ['dnb-popover'],
    active,
    targetElement,
    showDelay,
    hideDelay,
    keepInDOM,
    noAnimation,
    portalRootClass,
    children,
    attributes,
    arrowPosition,
    placement,
    alignOnTarget,
    horizontalOffset,
    arrowPositionSelector,
    fixedPosition,
    contentRef,
    triggerOffset,
    autoAlignMode,
    hideArrow,
    arrowEdgeOffset,
    targetRefreshKey,
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
        className={clsx(
          baseClassNames.map((base) => `${base}__portal`),
          portalRootClass,
          theme && getThemeClasses(theme),
          modalContext?.id &&
            baseClassNames.map((base) => `${base}--inside-modal`)
        )}
      >
        <PopoverContainer
          baseClassNames={baseClassNames}
          active={portalActive}
          targetElement={targetElement || null}
          showDelay={showDelay}
          hideDelay={hideDelay}
          keepInDOM={keepInDOM}
          noAnimation={noAnimation}
          arrowPosition={arrowPosition}
          placement={placement}
          alignOnTarget={alignOnTarget}
          horizontalOffset={horizontalOffset}
          arrowPositionSelector={arrowPositionSelector}
          fixedPosition={fixedPosition}
          attributes={attributes}
          contentRef={contentRef}
          triggerOffset={triggerOffset}
          autoAlignMode={autoAlignMode}
          hideArrow={hideArrow}
          arrowEdgeOffset={arrowEdgeOffset}
          targetRefreshKey={targetRefreshKey}
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
  const [isInDOM, setIsInDOM] = useState(() => keepInDOM || active)
  const isMountedRef = useMounted()

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
      setIsInDOM(true)

      if (!isMountedRef.current) {
        entry.count++
      }

      return () => {
        clearTimers()
      }
    }

    if (keepInDOM) {
      clearTimers()
      setIsActive(false)
      setIsInDOM(true)
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
      setIsInDOM(false)
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
    keepInDOM,
    noAnimation,
  ])

  useMountEffect(() => {
    if (keepInDOM) {
      ensurePortalEntry()
    }
  })

  return { isActive, shouldRenderPortal: isInDOM || keepInDOM }
}
