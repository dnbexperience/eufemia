import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import { Button, Drawer, Tooltip } from '@dnb/eufemia/src/components'
import { Anchor, Flex } from '@dnb/eufemia/src'
import { getTheme } from '../../../vite/client/shims/theme-handler'
import ToggleGrid from './ToggleGrid'
import { Context, useTheme } from '@dnb/eufemia/src/shared'
import useCanUseDOM from '@dnb/eufemia/src/shared/helpers/useCanUseDOM'
import { cog } from '@dnb/eufemia/src/icons'
import { themeTitles } from './SidebarMenuData'
import PortalSkeleton from '../../core/PortalSkeleton'
import ToggleDarkMode from '../../core/ToggleDarkMode'
import ToggleNativeTypography from '../../core/ToggleNativeTypography'
import ChangeLocale from '../../core/ChangeLocale'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'
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
  const { skeleton } = useContext(Context)
  const storageKey = getPortalToolsOpenStorageKey(hideWhenMediaLarge)
  const [isOpen, setIsOpen] = useState(false)
  const { brand, colorScheme } = getTheme()
  const activeTheme = useTheme()
  const canUseDOM = useCanUseDOM()
  const triggerText = `${themeTitles[activeTheme?.brand] || 'DNB'} - ${
    canUseDOM && activeTheme?.colorScheme === 'dark' ? 'Dark' : 'Light'
  }`
  const themeKey = `${brand}:${colorScheme || 'auto'}`
  // Start with animation disabled so the initial open=false render
  // uses the immediate close path in Modal, avoiding a 300ms timer
  // that would race with the restore effect and close the drawer.
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
      setIsOpen(true)

      // When restoring with noAnimation, the Modal skips setting
      // data-dnb-modal-active, so the header stays on top. Set a
      // custom attribute so the header's z-index rule applies.
      document.documentElement.setAttribute(
        'data-portal-tools-open',
        'true'
      )

      // Re-enable animation after the drawer has opened without
      // animation, so subsequent interactions animate normally.
      const timeoutId = window.setTimeout(() => {
        setDisableAnimation(false)
      }, disableAnimationResetDelay)

      return () => window.clearTimeout(timeoutId)
    } else {
      // Nothing to restore — enable animation so the first manual
      // open animates normally.
      setDisableAnimation(false)
    }
  }, [storageKey])

  useEffect(() => {
    if (!disableAnimation || restoredRef.current) {
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
  }, [disableAnimation, isOpen])

  useLayoutEffect(() => {
    if (themeChanged && isOpen) {
      setDisableAnimation(true)
    }

    previousThemeKeyRef.current = themeKey
  }, [isOpen, themeChanged, themeKey])

  const handleOpen = useCallback(() => {
    restoredRef.current = false
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
        title="Portal Tools"
        aria-label={`${triggerText}, Portal Tools`}
        aria-haspopup="dialog"
        aria-controls="dnb-modal-portal-tools-modal"
        aria-expanded={isOpen}
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
      <Drawer
        id="portal-tools-modal"
        omitTriggerButton
        focusSelector="#change-theme"
        restoreFocusTo={() => document.getElementById('portal-tools')}
        title="Portal Tools"
        open={isOpen}
        noAnimation={noAnimation}
        onOpen={handleOpen}
        onClose={handleClose}
        {...props}
      >
        <Drawer.Body innerSpace={{ block: 'large' }}>
          <Flex.Stack gap="large">
            <ChangeStyleTheme
              labelDescription={
                <>
                  Read more about{' '}
                  <Anchor href="/web/usage/customisation/theming/">
                    theming
                  </Anchor>
                </>
              }
            />
            <ChangeLocale
              labelDescription={
                <>
                  Read more about{' '}
                  <Anchor href="/web/usage/customisation/localization/">
                    localization
                  </Anchor>
                </>
              }
            />

            <ToggleDarkMode
              label="Dark mode"
              labelDescription={
                <>
                  Read more about{' '}
                  <Anchor href="/web/usage/customisation/theming/">
                    theming
                  </Anchor>
                </>
              }
            />

            <Flex.Stack gap="small">
              <ToggleNativeTypography />
              <PortalSkeleton
                enabled={skeleton}
                label="Show everything behind skeletons"
                skeleton={false}
              />
              <ToggleGrid label="Show grid" />
            </Flex.Stack>
          </Flex.Stack>
        </Drawer.Body>
      </Drawer>
    </>
  )
}
