import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { clsx } from 'clsx'
import { Drawer, Tooltip } from '@dnb/eufemia/src/components'
import { Anchor, Flex } from '@dnb/eufemia/src'
import { getTheme } from '@dnb/eufemia/src/shared/Theme'
import ToggleGrid from './ToggleGrid'
import { Context } from '@dnb/eufemia/src/shared'
import PortalSkeleton from '../../core/PortalSkeleton'
import ToggleDarkMode from '../../core/ToggleDarkMode'
import ChangeLocale from '../../core/ChangeLocale'
import ChangeStyleTheme from '../../core/ChangeStyleTheme'
import { buttonStyle } from './PortalToolsMenu.module.scss'
import type { TooltipPlacement } from '@dnb/eufemia/src/components/tooltip/types'
import type { ButtonProps } from '@dnb/eufemia/src/components/Button'

type Props = {
  className?: string
  tooltipPosition?: TooltipPlacement
  triggerAttributes?: ButtonProps
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
  tooltipPosition = 'left',
  triggerAttributes = null,
  hideWhenMediaLarge = false,
  ...props
}: Props) {
  const { skeleton } = useContext(Context)
  const storageKey = getPortalToolsOpenStorageKey(hideWhenMediaLarge)
  const [isOpen, setIsOpen] = useState(() =>
    getStoredPortalToolsOpen(storageKey)
  )
  const { name: themeName, colorScheme } = getTheme()
  const themeKey = `${themeName}:${colorScheme || 'auto'}`
  const [disableAnimation, setDisableAnimation] = useState(isOpen)
  const previousThemeKeyRef = useRef(themeKey)
  const themeChanged = previousThemeKeyRef.current !== themeKey
  const noAnimation = disableAnimation || themeChanged

  useEffect(() => {
    if (!disableAnimation) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setDisableAnimation(false)
    }, disableAnimationResetDelay)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [disableAnimation])

  useLayoutEffect(() => {
    if (themeChanged && isOpen) {
      setDisableAnimation(true)
    }

    previousThemeKeyRef.current = themeKey
  }, [isOpen, themeChanged, themeKey])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    setStoredPortalToolsOpen(true, storageKey)
  }, [storageKey])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setStoredPortalToolsOpen(false, storageKey)
  }, [storageKey])

  return (
    <Drawer
      id="portal-tools"
      title="Portal Tools"
      open={isOpen}
      noAnimation={noAnimation}
      onOpen={handleOpen}
      onClose={handleClose}
      triggerAttributes={{
        className: clsx(
          className,
          buttonStyle,
          hideWhenMediaLarge && 'hideWhenMediaLarge'
        ),
        size: 'default',
        icon: 'more',
        iconSize: 'medium',
        skeleton: false,
        left: 'x-small',
        tooltip: (
          <Tooltip
            placement={tooltipPosition}
            // Use 4001 to be over header of 4000
            style={{ zIndex: 4001 }}
            fixedPosition
          >
            Open the portal tools
          </Tooltip>
        ),
        ...triggerAttributes,
      }}
      {...props}
    >
      <Drawer.Body innerSpace={{ block: 'large' }}>
        <Flex.Stack gap="large">
          <ChangeStyleTheme
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/uilib/usage/customisation/theming/">
                  theming
                </Anchor>
              </>
            }
          />
          <ChangeLocale
            labelDescription={
              <>
                Read more about{' '}
                <Anchor href="/uilib/usage/customisation/localization/">
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
                <Anchor href="/uilib/usage/customisation/theming/">
                  theming
                </Anchor>
              </>
            }
          />

          <PortalSkeleton
            enabled={skeleton}
            label="Show everything behind skeletons"
            skeleton={false}
          />

          <ToggleGrid label="Show grid" />
        </Flex.Stack>
      </Drawer.Body>
    </Drawer>
  )
}
