import { useCallback, useEffect, useRef } from 'react'
import type { JSX } from 'react'
import { clsx } from 'clsx'
import Button from '../button/Button'
import IconPrimary from '../icon-primary/IconPrimary'
import Theme from '../../shared/Theme'
import {
  close as CloseIcon,
  check_medium as CheckIcon,
  exclamation_circled_medium as ErrorIcon,
  exclamation_triangle_medium as WarningIcon,
  information_circled_medium as InfoIcon,
} from '../../icons'
import useTranslation from '../../shared/useTranslation'
import type { ToasterItemProps, ToasterVariant } from './types'

const variantIcons: Partial<Record<ToasterVariant, typeof InfoIcon>> = {
  info: InfoIcon,
  success: CheckIcon,
  warning: WarningIcon,
  error: ErrorIcon,
}

function ToasterItem({
  message,
  onDismiss,
  onVisible,
  className,
}: ToasterItemProps): JSX.Element {
  const itemRef = useRef<HTMLDivElement>(null)
  const hasBeenVisible = useRef(false)

  const { id, variant = 'neutral', title, text, actions, status } = message

  const isDismissed = status === 'dismissed'
  const isExpired = status === 'expired'
  const hasActions = Boolean(actions) && !isDismissed && !isExpired

  const tr = useTranslation().Toaster

  useEffect(() => {
    if (!hasBeenVisible.current && onVisible) {
      hasBeenVisible.current = true
      onVisible(id)
    }
  }, [id, onVisible])

  const handleDismiss = useCallback(() => {
    onDismiss?.(id)
  }, [id, onDismiss])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Escape' && onDismiss) {
        event.stopPropagation()
        handleDismiss()
      }
    },
    [onDismiss, handleDismiss]
  )

  const icon = variantIcons[variant]

  return (
    <Theme.Context surface="dark">
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions -- onKeyDown handles Escape for dismiss */}
      <div
        ref={itemRef}
        className={clsx(
          'dnb-toaster__item',
          `dnb-toaster__item--${variant}`,
          variant === 'neutral' && 'dnb-toaster__neutral',
          isDismissed && 'dnb-toaster__item--dismissed',
          isExpired && 'dnb-toaster__item--expired',
          className
        )}
        role="group"
        aria-label={title || 'Message'}
        tabIndex={
          message.focus === 'message' || message.actions ? -1 : undefined
        }
        onKeyDown={handleKeyDown}
      >
        {icon && (
          <span className="dnb-toaster__item__icon">
            <IconPrimary icon={icon} />
          </span>
        )}

        <div className="dnb-toaster__item__content">
          {title && (
            <span className="dnb-toaster__item__title">{title}</span>
          )}

          {text && <span className="dnb-toaster__item__text">{text}</span>}

          {actions && !isDismissed && !isExpired && (
            <div className="dnb-toaster__item__actions">
              {actions}

              {onDismiss && (
                <Button
                  className="dnb-toaster__item__dismiss-action"
                  variant="tertiary"
                  icon={CloseIcon}
                  left="small"
                  aria-label={tr.dismissAriaLabel}
                  onClick={handleDismiss}
                >
                  {tr.dismissButton}
                </Button>
              )}
            </div>
          )}
        </div>

        {onDismiss && !isDismissed && !hasActions && (
          <Button
            className="dnb-toaster__item__dismiss"
            variant="tertiary"
            icon={CloseIcon}
            iconPosition="left"
            aria-label={tr.dismissAriaLabel}
            onClick={handleDismiss}
          />
        )}
      </div>
    </Theme.Context>
  )
}

export default ToasterItem
