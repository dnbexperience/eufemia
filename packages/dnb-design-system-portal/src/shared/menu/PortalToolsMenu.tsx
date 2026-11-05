import { useCallback, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Button, Tooltip } from '@dnb/eufemia/src/components'
import { useTheme } from '@dnb/eufemia/src/shared'
import { cog } from '@dnb/eufemia/src/icons'
import { themeTitles } from './SidebarMenuData'
import {
  buttonStyle,
  loadingStyle,
  darkSchemeStyle,
  lightSchemeStyle,
} from './PortalToolsMenu.module.scss'
import type { TooltipPlacement } from '@dnb/eufemia/src/components/tooltip/types'
import type { ButtonProps } from '@dnb/eufemia/src/components/Button'
import type PortalToolsDrawer from './PortalToolsDrawer'

type Props = {
  compactOnSmall?: boolean
  className?: string
  tooltipPosition?: TooltipPlacement
  triggerProps?: ButtonProps
  hideWhenMediaLarge?: boolean
}

export default function PortalToolsMenu({
  compactOnSmall = true,
  className = null,
  tooltipPosition = 'bottom',
  triggerProps = null,
  hideWhenMediaLarge = false,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [drawerReady, setDrawerReady] = useState(false)
  const [Drawer, setDrawer] = useState<typeof PortalToolsDrawer>()
  const [loadFailed, setLoadFailed] = useState(false)
  const loadFailures = useRef(0)
  const handleDrawerReady = useCallback(() => setDrawerReady(true), [])
  const activeTheme = useTheme()
  const loading = isOpen && !drawerReady

  const handleOpen = useCallback(() => {
    setLoadFailed(false)
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    if (!isOpen || Drawer) {
      return
    }
    let active = true
    const onPreloadError = (event: Event & { payload?: Error }) => {
      const message = event.payload?.message || ''
      if (
        !message.includes('/assets/') ||
        message.includes('PortalToolsDrawer')
      ) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }
    window.addEventListener('vite:preloadError', onPreloadError, true)
    // Keep result handling outside Vite's preload wrapper, which may resolve without a module.
    const loadDrawer = import('./PortalToolsDrawer')
    void loadDrawer
      .then((module) => {
        if (!module?.default) {
          throw new Error('Could not load settings')
        }
        if (active) {
          loadFailures.current = 0
          setDrawer(() => module.default)
        }
      })
      .catch(() => {
        if (active) {
          handleClose()
          setLoadFailed(true)
          // A repeated failure while online may be an outdated chunk after a deploy.
          if (++loadFailures.current > 1 && navigator.onLine) {
            window.location.reload()
          }
        }
      })
      .finally(() =>
        window.removeEventListener(
          'vite:preloadError',
          onPreloadError,
          true
        )
      )
    return () => {
      active = false
    }
  }, [isOpen, Drawer, handleClose])

  return (
    <>
      <Button
        id="portal-tools"
        className={clsx(
          className,
          compactOnSmall && buttonStyle,
          loading && 'dnb-skeleton dnb-skeleton--shape',
          loading && loadingStyle,
          hideWhenMediaLarge && 'hideWhenMediaLarge'
        )}
        text={
          <>
            {themeTitles[activeTheme?.brand] || 'DNB'} -{' '}
            <span className={lightSchemeStyle}>Light</span>
            <span className={darkSchemeStyle}>Dark</span>
            <span className="dnb-sr-only"> Settings</span>
          </>
        }
        variant="secondary"
        icon={cog}
        iconPosition="right"
        iconSize="default"
        skeleton={false}
        left="x-small"
        aria-haspopup="dialog"
        aria-controls="dnb-modal-portal-tools-modal"
        aria-expanded={isOpen}
        aria-busy={loading || undefined}
        tooltip={
          <Tooltip
            placement={tooltipPosition}
            style={{ zIndex: 4001 }}
            fixedPosition
          >
            {loadFailed
              ? 'Could not load settings. Please try again.'
              : 'Open settings'}
          </Tooltip>
        }
        {...triggerProps}
        onClick={() => {
          if (isOpen) {
            handleClose()
          } else {
            handleOpen()
          }
        }}
      />
      <span className="dnb-sr-only" role="status">
        {loading ? 'Loading settings...' : ''}
      </span>
      {loadFailed && (
        <span className="dnb-sr-only" role="alert">
          Could not load settings. Please try again.
        </span>
      )}
      {Drawer && (
        <Drawer
          open={isOpen}
          onOpen={handleOpen}
          onClose={handleClose}
          onReady={handleDrawerReady}
          {...props}
        />
      )}
    </>
  )
}
