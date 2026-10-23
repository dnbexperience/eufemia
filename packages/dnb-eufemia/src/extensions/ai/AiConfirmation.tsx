import { useEffect, useRef, useState } from 'react'
import type { FocusEvent } from 'react'
import { clsx } from 'clsx'
import Card from '../../components/Card'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import AriaLive from '../../components/AriaLive'
import H from '../../elements/H'
import { useSpacing } from '../../components/space/SpacingUtils'
import { check } from '../../icons'
import useId from '../../shared/helpers/useId'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from './hooks/useTranslation'
import type { AiConfirmationProps } from './types'

const statusKeys = {
  pending: 'confirmationPending',
  required: 'confirmationRequired',
  confirmed: 'confirmationConfirmed',
  declined: 'confirmationDeclined',
  expired: 'confirmationExpired',
} as const

export default function AiConfirmation(props: AiConfirmationProps) {
  const {
    title,
    children,
    status = 'pending',
    onConfirm,
    onDecline,
    confirmLabel,
    declineLabel,
    disabled,
    announce = true,
    level = 3,
    className,
    ...rest
  } = props
  const translation = useTranslation().Ai
  const id = useId()
  const bodyRef = useRef<HTMLDivElement>(null)
  const confirmRef = useRef<HTMLElement>(null)
  const declineRef = useRef<HTMLElement>(null)
  const hasButtonFocus = useRef(false)
  const previousStatus = useRef(status)
  const [announcement, setAnnouncement] = useState('')
  const complete =
    status === 'confirmed' || status === 'declined' || status === 'expired'
  const unavailable = disabled || complete
  const statusText = translation[statusKeys[status]]

  useEffect(() => {
    if (!announce) {
      setAnnouncement('')
    } else if (previousStatus.current !== status) {
      setAnnouncement(title + ' ' + statusText)
    }
    previousStatus.current = status
  }, [status, statusText, title, announce])

  useLayoutEffect(() => {
    const active = document.activeElement
    if (
      unavailable &&
      hasButtonFocus.current &&
      (active === confirmRef.current ||
        active === declineRef.current ||
        active === document.body ||
        !active)
    ) {
      bodyRef.current?.focus()
    }
    if (unavailable) {
      hasButtonFocus.current = false
    }
  }, [unavailable])

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-confirmation',
      `dnb-ai-confirmation--${status}`,
      className
    ),
  })
  const focusProps = {
    onFocus: () => {
      hasButtonFocus.current = true
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.hasAttribute('disabled')) {
        hasButtonFocus.current = false
      }
    },
  }

  return (
    <Card
      responsive={false}
      align="stretch"
      innerSpace="medium"
      dropShadow
      role="group"
      aria-labelledby={id + '-title'}
      aria-describedby={id + '-description ' + id + '-state'}
      {...rootProps}
    >
      <div
        className="dnb-ai-confirmation__body"
        ref={bodyRef}
        tabIndex={-1}
        aria-labelledby={id + '-title'}
        aria-describedby={id + '-state'}
      >
        <div className="dnb-ai-confirmation__header">
          <H
            element={`h${level}`}
            size="basis"
            space={0}
            id={id + '-title'}
            className="dnb-ai-confirmation__title"
          >
            {title}
          </H>
          {(status === 'required' ||
            status === 'expired' ||
            status === 'declined') && (
            <Badge
              status={status === 'required' ? 'warning' : 'neutral'}
              subtle
              content={statusText}
              role="presentation"
              className="dnb-ai-confirmation__badge"
            />
          )}
        </div>
        <div
          className="dnb-ai-confirmation__description"
          id={id + '-description'}
        >
          {children}
        </div>
        <span className="dnb-sr-only" id={id + '-state'}>
          {statusText}
        </span>
        <div className="dnb-ai-confirmation__actions">
          <Button
            ref={declineRef}
            variant="secondary"
            type="button"
            wrap
            disabled={unavailable || !onDecline}
            {...focusProps}
            onClick={(event) => {
              if (!unavailable) {
                onDecline?.(event)
              }
            }}
          >
            {declineLabel ?? translation.confirmationNo}
          </Button>
          <Button
            ref={confirmRef}
            variant="secondary"
            type="button"
            wrap
            icon={
              status === 'required' || status === 'confirmed'
                ? check
                : undefined
            }
            iconPosition="right"
            disabled={unavailable || !onConfirm}
            {...focusProps}
            onClick={(event) => {
              if (!unavailable) {
                onConfirm?.(event)
              }
            }}
          >
            {confirmLabel ?? translation.confirmationYes}
          </Button>
        </div>
        <AriaLive disabled={!announce}>{announcement}</AriaLive>
      </div>
    </Card>
  )
}
