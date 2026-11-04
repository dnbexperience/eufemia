import { useCallback } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import AriaLive from '../aria-live/AriaLive'
import type { ToasterAllProps } from './Toaster'
import { useToasterState } from './useToasterState'
import { getToasterRefs } from './toasterRefs'
import NotificationButton from './NotificationButton'
import NotificationCenter from './NotificationCenter'
import ToastStack from './ToastStack'
import ToasterInline from './ToasterInline'
import useTranslation from '../../shared/useTranslation'

export type ToasterRendererProps = Omit<ToasterAllProps, 'children'>

function ToasterRenderer({
  id = 'default',
  inline,
  placement = 'bottom-center',
  notificationButtonPlacement = 'floating',
  autoHideNotificationButton = false,
  showBadge = false,
  className,
  ...rest
}: ToasterRendererProps): JSX.Element {
  const state = useToasterState(id)
  const tr = useTranslation().Toaster
  const isFloating = notificationButtonPlacement === 'floating'
  const refs = getToasterRefs(id)

  const handleFocusProxy = useCallback(
    (e: React.FocusEvent) => {
      if (!isFloating) {
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
    [isFloating, refs]
  )

  const handleReturnFocus = useCallback(() => {
    refs.returningRef.current = true
    refs.focusProxyRef.current?.focus()
  }, [refs])

  const rootProps = useSpacing({ ...rest } as ToasterAllProps, {
    className: clsx(
      'dnb-toaster',
      inline && 'dnb-toaster--inline',
      className
    ),
  })

  if (inline) {
    return (
      <div id={id} {...rootProps}>
        <AriaLive
          variant="text"
          priority={state.latestAnnouncementPriority}
        >
          {state.latestAnnouncement}
        </AriaLive>

        <ToasterInline
          messages={state.visibleMessages}
          entered={state.entered}
          dismissing={state.dismissing}
          onDismiss={state.handleDismiss}
          onVisible={state.handleVisible}
        />
      </div>
    )
  }

  return (
    <div id={id} {...rootProps}>
      <AriaLive variant="text" priority={state.latestAnnouncementPriority}>
        {state.latestAnnouncement}
      </AriaLive>

      <button
        ref={state.focusProxyRef}
        className="dnb-sr-only dnb-toaster__focus-proxy"
        tabIndex={isFloating ? 0 : -1}
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
        floating={isFloating}
        autoHide={autoHideNotificationButton}
        showBadge={showBadge}
        pulseKey={state.pulseKey}
        notificationButtonRef={state.notificationButtonRef}
        onNotificationButtonToggle={state.handleNotificationButtonToggle}
        onPointerDown={state.handlePointerDown}
        onFocus={isFloating ? state.handleFocus : undefined}
        onReturnFocus={handleReturnFocus}
      />

      <NotificationCenter
        isOpen={state.isOpen}
        messages={state.visibleMessages}
        openedWithMessages={state.openedWithMessages}
        dismissing={state.dismissing}
        notificationButtonRef={state.notificationButtonRef}
        onClose={state.handleClose}
        onDismiss={state.handleDismiss}
        onVisible={state.handleVisible}
      />

      {state.showToastStack && (
        <ToastStack
          placement={placement}
          messages={state.cappedStackMessages}
          entered={state.entered}
          dismissing={state.dismissing}
          stackExiting={state.stackExiting}
          onDismiss={state.handleStackHide}
          onVisible={state.handleVisible}
        />
      )}
    </div>
  )
}

export default ToasterRenderer
