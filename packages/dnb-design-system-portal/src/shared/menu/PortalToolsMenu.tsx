import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import { Button, Tooltip } from '@dnb/eufemia/src/components'
import { getTheme } from '../../../vite/client/shims/theme-handler'
import { useTheme } from '@dnb/eufemia/src/shared'
import useCanUseDOM from '@dnb/eufemia/src/shared/helpers/useCanUseDOM'
import { cog } from '@dnb/eufemia/src/icons'
import { themeTitles } from './SidebarMenuData'
import { buttonStyle } from './PortalToolsMenu.module.scss'
import type { TooltipPlacement } from '@dnb/eufemia/src/components/tooltip/types'
import type { ButtonProps } from '@dnb/eufemia/src/components/Button'

type Props = {
  className?: string
  tooltipPosition?: TooltipPlacement
  triggerProps?: ButtonProps
  hideWhenMediaLarge?: boolean
}

const portalToolsOpenStorageKey = 'portal-tools-open'
const portalToolsMobileOpenStorageKey = 'portal-tools-open-mobile'
const disableAnimationResetDelay = 400

function getPortalToolsOpenStorageKey(hideWhenMediaLarge: boolean) {
  return hideWhenMediaLarge
    ? portalToolsMobileOpenStorageKey
    : portalToolsOpenStorageKey
}

function getStoredPortalToolsOpen(storageKey: string) {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    return window.sessionStorage.getItem(storageKey) === 'true'
  } catch (error) {
    return false
  }
}

function setStoredPortalToolsOpen(isOpen: boolean, storageKey: string) {
  if (typeof window === 'undefined') {
    return
  }

  try {
    if (isOpen) {
      const otherStorageKey =
        storageKey === portalToolsOpenStorageKey
          ? portalToolsMobileOpenStorageKey
          : portalToolsOpenStorageKey

      window.sessionStorage.setItem(storageKey, 'true')
      window.sessionStorage.removeItem(otherStorageKey)
    } else {
      window.sessionStorage.removeItem(storageKey)
    }
  } catch (error) {
    // Ignore storage write failures.
  }
}

export default function PortalToolsMenu({
  className = null,
  tooltipPosition = 'bottom',
  triggerProps = null,
  hideWhenMediaLarge = false,
  ...props
}: Props) {
  const storageKey = getPortalToolsOpenStorageKey(hideWhenMediaLarge)
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [drawerReady, setDrawerReady] = useState(false)
  const [Drawer, setDrawer] =
    useState<typeof import('./PortalToolsDrawer').default>()
  const [loadFailed, setLoadFailed] = useState(false)
  const handleDrawerReady = useCallback(() => setDrawerReady(true), [])
  const { brand, colorScheme } = getTheme()
  const activeTheme = useTheme()
  const canUseDOM = useCanUseDOM()
  const triggerText = `${themeTitles[activeTheme?.brand] || 'DNB'} - ${
    canUseDOM && activeTheme?.colorScheme === 'dark' ? 'Dark' : 'Light'
  }`
  const themeKey = `${brand}:${colorScheme || 'auto'}`
  // Restore an open drawer immediately, once its module has loaded.
  const [disableAnimation, setDisableAnimation] = useState(true)
  const previousThemeKeyRef = useRef(themeKey)
  const themeChanged = previousThemeKeyRef.current !== themeKey
  const restoredRef = useRef(false)
  const noAnimation = disableAnimation || themeChanged

  // Restore open state from sessionStorage after hydration to avoid
  // a mismatch between server (always closed) and client.
  useEffect(() => {
    if (restoredRef.current) {
      return
    }
    const stored = getStoredPortalToolsOpen(storageKey)
    if (stored) {
      restoredRef.current = true
      setDisableAnimation(true)
      setHasOpened(true)
      setIsOpen(true)

      // When restoring with noAnimation, the Modal skips setting
      // data-dnb-modal-active, so the header stays on top. Set a
      // custom attribute so the header's z-index rule applies.
      document.documentElement.setAttribute(
        'data-portal-tools-open',
        'true'
      )
    } else {
      // Nothing to restore — enable animation so the first manual
      // open animates normally.
      setDisableAnimation(false)
    }
  }, [storageKey])

  useEffect(() => {
    if (!disableAnimation || !drawerReady) {
      return
    }

    // Only reset after the drawer has been opened at least once,
    // so the initial true value doesn't get cleared prematurely.
    if (!isOpen) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setDisableAnimation(false)
    }, disableAnimationResetDelay)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [disableAnimation, drawerReady, isOpen])

  useLayoutEffect(() => {
    if (themeChanged && isOpen) {
      setDisableAnimation(true)
    }

    previousThemeKeyRef.current = themeKey
  }, [isOpen, themeChanged, themeKey])

  const handleOpen = useCallback(() => {
    setLoadFailed(false)
    restoredRef.current = false
    setHasOpened(true)
    setIsOpen(true)
    setStoredPortalToolsOpen(true, storageKey)
  }, [storageKey])

  const handleClose = useCallback(() => {
    restoredRef.current = false
    setDisableAnimation(false)
    setIsOpen(false)
    setStoredPortalToolsOpen(false, storageKey)
    document.documentElement.removeAttribute('data-portal-tools-open')
  }, [storageKey])

  useEffect(() => {
    if (!isOpen || Drawer) {
      return
    }
    let active = true
    const onPreloadError = (event: Event & { payload?: Error }) => {
      if (event.payload?.message.includes('PortalToolsDrawer')) {
        event.preventDefault()
        event.stopImmediatePropagation()
      }
    }
    window.addEventListener('vite:preloadError', onPreloadError, true)
    void import('./PortalToolsDrawer')
      .then(({ default: LoadedDrawer }) => {
        if (active) {
          setDrawer(() => LoadedDrawer)
        }
      })
      .catch(() => {
        setStoredPortalToolsOpen(false, portalToolsOpenStorageKey)
        setStoredPortalToolsOpen(false, portalToolsMobileOpenStorageKey)
        if (active) {
          handleClose()
          setLoadFailed(true)
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
          buttonStyle,
          hideWhenMediaLarge && 'hideWhenMediaLarge'
        )}
        text={triggerText}
        variant="secondary"
        icon={cog}
        iconPosition="right"
        iconSize="default"
        skeleton={false}
        left="x-small"
        aria-label={`${triggerText}, Portal Tools`}
        aria-haspopup="dialog"
        aria-controls="dnb-modal-portal-tools-modal"
        aria-expanded={isOpen}
        aria-busy={(isOpen && !drawerReady) || undefined}
        tooltip={
          <Tooltip
            placement={tooltipPosition}
            style={{ zIndex: 4001 }}
            fixedPosition
          >
            Open the portal tools
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
      {loadFailed && (
        <span role="alert">
          Could not load settings. Please try again.
        </span>
      )}
      {isOpen && !Drawer && <span role="status">Loading settings...</span>}
      {(isOpen || hasOpened) && Drawer && (
        <Drawer
          open={isOpen}
          noAnimation={noAnimation}
          onOpen={handleOpen}
          onClose={handleClose}
          onReady={handleDrawerReady}
          {...props}
        />
      )}
    </>
  )
}
