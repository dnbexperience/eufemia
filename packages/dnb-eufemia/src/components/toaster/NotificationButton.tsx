import type { JSX, RefObject } from 'react'
import { useCallback } from 'react'
import { clsx } from 'clsx'
import Badge from '../badge/Badge'
import Button from '../button/Button'
import type { ButtonProps } from '../button/Button'
import Icon from '../icon/Icon'
import PortalRoot from '../portal-root/PortalRoot'
import { clock, close } from '../../icons'
import useTranslation from '../../shared/useTranslation'

const toggleIcon = Icon.transition({
  closed: clock,
  open: close,
})

export type NotificationButtonProps = {
  isOpen: boolean
  hasMessages: boolean
  allMessagesInStack: boolean
  messageCount: number
  floating: boolean
  autoHide: boolean
  showBadge: boolean
  pulseKey: number
  notificationButtonRef: RefObject<HTMLButtonElement>
  notificationButtonProps?: Partial<ButtonProps>
  onNotificationButtonToggle: () => void
  onPointerDown: () => void
  onFocus: () => void
  onReturnFocus: () => void
}

function NotificationButton({
  isOpen,
  hasMessages,
  allMessagesInStack,
  messageCount,
  floating,
  autoHide,
  showBadge,
  pulseKey,
  notificationButtonRef,
  notificationButtonProps,
  onNotificationButtonToggle,
  onPointerDown,
  onFocus,
  onReturnFocus,
}: NotificationButtonProps): JSX.Element {
  const tr = useTranslation().Toaster
  const hidden =
    autoHide && ((!hasMessages && !isOpen) || allMessagesInStack)

  const innerButton = (
    <Button
      ref={notificationButtonRef}
      className="dnb-toaster__notification-button"
      variant="tertiary"
      icon={toggleIcon}
      iconPosition="left"
      transitionState={isOpen ? 'open' : 'closed'}
      onClick={onNotificationButtonToggle}
      onPointerDown={onPointerDown}
      onFocus={onFocus}
      aria-expanded={isOpen}
      aria-haspopup="true"
      bounding
      {...notificationButtonProps}
    >
      {tr.systemMessages}
    </Button>
  )

  const button = showBadge ? (
    <Badge
      className="dnb-toaster__badge"
      variant="notification"
      vertical="top"
      horizontal="right"
      content={messageCount > 0 ? messageCount : undefined}
      label={tr.systemMessages}
      hideBadge={messageCount === 0}
    >
      {innerButton}
    </Badge>
  ) : (
    innerButton
  )

  const handlePostToggleSentinelFocus = useCallback(() => {
    const items = document.querySelectorAll<HTMLElement>(
      '.dnb-toaster__notification-center .dnb-toaster__item'
    )
    const firstItem = items[0]
    const focusable = firstItem?.querySelector<HTMLElement>(
      'button, a, [tabindex="0"]'
    )
    ;(focusable || firstItem)?.focus()
  }, [])

  if (floating) {
    return (
      <PortalRoot
        key={pulseKey}
        className={clsx(
          'dnb-toaster__notification-button-floating',
          pulseKey > 0 &&
            'dnb-toaster__notification-button-floating--pulse',
          hidden && 'dnb-toaster__notification-button-floating--hidden'
        )}
      >
        {!isOpen && (
          <button
            className="dnb-sr-only dnb-toaster__sentinel"
            tabIndex={0}
            onFocus={onReturnFocus}
          >
            {tr.systemMessages}
          </button>
        )}

        {button}

        <button
          className="dnb-sr-only dnb-toaster__sentinel"
          tabIndex={0}
          onFocus={isOpen ? handlePostToggleSentinelFocus : onReturnFocus}
        >
          {tr.systemMessages}
        </button>
      </PortalRoot>
    )
  }

  return (
    <span
      key={pulseKey}
      className={clsx(
        'dnb-toaster__notification-button-inline',
        pulseKey > 0 && 'dnb-toaster__notification-button-inline--pulse',
        hidden && 'dnb-toaster__notification-button-inline--hidden'
      )}
    >
      {button}

      {isOpen && (
        <button
          className="dnb-sr-only dnb-toaster__sentinel"
          tabIndex={0}
          onFocus={handlePostToggleSentinelFocus}
        >
          {tr.systemMessages}
        </button>
      )}
    </span>
  )
}

export default NotificationButton
