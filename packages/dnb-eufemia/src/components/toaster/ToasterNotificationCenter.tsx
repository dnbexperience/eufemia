import { useCallback, useEffect } from 'react'
import type { JSX } from 'react'
import type { ButtonProps } from '../button/Button'
import NotificationButton from './NotificationButton'
import NotificationCenterPanel from './NotificationCenter'
import { useToasterUI } from './useToasterState'
import { getToasterRefs } from './toasterRefs'
import useTranslation from '../../shared/useTranslation'

// -- NotificationCenter (the panel) --

export type ToasterNotificationCenterProps = {
  /** The ID of the Toaster.Host this component belongs to. */
  hostId: string
}

function ToasterNotificationCenter({
  hostId,
}: ToasterNotificationCenterProps): JSX.Element {
  const state = useToasterUI(hostId)
  const refs = getToasterRefs(hostId)

  useEffect(() => {
    refs.hasNotificationUI.current = true
    return () => {
      refs.hasNotificationUI.current = false
    }
  }, [refs])

  return (
    <NotificationCenterPanel
      isOpen={state.isOpen}
      messages={state.visibleMessages}
      openedWithMessages={state.openedWithMessages}
      dismissing={state.dismissing}
      notificationButtonRef={state.notificationButtonRef}
      onClose={state.handleClose}
      onDismiss={state.handleDismiss}
      onVisible={state.handleVisible}
    />
  )
}

// -- Button --

export type NotificationCenterButtonProps = {
  /** The ID of the Toaster.Host this component belongs to. */
  hostId: string

  /** Use floating (fixed-position) button. Default: `true` */
  floating?: boolean

  /** Hide the button when there are no messages. Default: `false` */
  autoHide?: boolean

  /** Show a badge with the unread message count. Default: `false` */
  showBadge?: boolean
} & Partial<ButtonProps>

function NotificationCenterButton({
  hostId,
  floating = true,
  autoHide = false,
  showBadge = false,
  ...buttonProps
}: NotificationCenterButtonProps): JSX.Element {
  const state = useToasterUI(hostId)
  const refs = getToasterRefs(hostId)
  const tr = useTranslation().Toaster

  const handleReturnFocus = useCallback(() => {
    refs.returningRef.current = true
    refs.focusProxyRef.current?.focus()
  }, [refs])

  const handleFocusProxy = useCallback(
    (e: React.FocusEvent) => {
      if (!floating) {
        return // stop here — inline proxy is only a programmatic focus target
      }

      if (refs.returningRef.current || refs.programmaticFocusRef.current) {
        refs.returningRef.current = false
        return // stop here — arrived via sentinel, Escape, or dismiss-all
      }

      if (e.relatedTarget === refs.notificationButtonRef.current) {
        return // stop here — Shift+Tab from notification button
      }

      refs.programmaticFocusRef.current = true
      refs.notificationButtonRef.current?.focus()
      requestAnimationFrame(() => {
        refs.programmaticFocusRef.current = false
      })
    },
    [floating, refs]
  )

  return (
    <>
      <button
        ref={state.focusProxyRef}
        className="dnb-sr-only dnb-toaster__focus-proxy"
        tabIndex={floating ? 0 : -1}
        onFocus={handleFocusProxy}
      >
        {tr.systemMessages}
      </button>

      <NotificationButton
        isOpen={state.isOpen}
        hasMessages={state.visibleMessages.length > 0}
        allMessagesInStack={
          state.visibleMessages.length > 0 &&
          state.visibleMessages.every(
            (m) =>
              state.stackMessages.some((s) => s.id === m.id) &&
              !state.stackExiting.has(m.id)
          )
        }
        messageCount={state.visibleMessages.length}
        floating={floating}
        autoHide={autoHide}
        showBadge={showBadge}
        pulseKey={state.pulseKey}
        notificationButtonRef={state.notificationButtonRef}
        notificationButtonProps={buttonProps}
        onNotificationButtonToggle={state.handleNotificationButtonToggle}
        onPointerDown={state.handlePointerDown}
        onFocus={floating ? state.handleFocus : undefined}
        onReturnFocus={handleReturnFocus}
      />
    </>
  )
}

ToasterNotificationCenter.Button = NotificationCenterButton

export default ToasterNotificationCenter
