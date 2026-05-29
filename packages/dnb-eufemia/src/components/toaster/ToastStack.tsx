import type { JSX } from 'react'
import { memo, useCallback, useMemo, useRef } from 'react'
import { clsx } from 'clsx'
import HeightAnimation from '../height-animation/HeightAnimation'
import PortalRoot from '../portal-root/PortalRoot'
import useTranslation from '../../shared/useTranslation'
import ToasterItem from './ToasterItem'
import { DISMISS_ANIMATION_MS } from './useToasterState'
import type { ToasterMessage, ToasterPlacement } from './types'

export type ToastStackProps = {
  placement: ToasterPlacement
  messages: ToasterMessage[]
  entered: Set<string>
  dismissing: Set<string>
  stackExiting: Set<string>
  onDismiss: (messageId: string) => void
  onVisible: (messageId: string) => void
}

function ToastStack({
  placement,
  messages,
  entered,
  dismissing,
  stackExiting,
  onDismiss,
  onVisible,
}: ToastStackProps): JSX.Element {
  const tr = useTranslation().Toaster

  // Messages present at mount time should not replay the enter animation.
  // Kept as a ref so it never triggers a re-render.
  const initialIds = useRef(new Set(messages.map((m) => m.id)))

  const MAX_VISIBLE_STACK_ITEMS = 3

  const activeCount = messages.filter(
    (m) =>
      entered.has(m.id) && !dismissing.has(m.id) && !stackExiting.has(m.id)
  ).length

  const listStyle = useMemo(
    () =>
      ({
        '--stack-count': Math.min(activeCount, MAX_VISIBLE_STACK_ITEMS),
      }) as React.CSSProperties,
    [activeCount]
  )

  return (
    <PortalRoot
      className={clsx(
        'dnb-toaster__toast-stack',
        `dnb-toaster__toast-stack--${placement}`
      )}
    >
      <div
        className="dnb-toaster__toast-stack__list"
        role="log"
        aria-label={tr.systemMessages}
        style={listStyle}
      >
        {messages.map((message, index) => (
          <StackItem
            key={message.id}
            message={message}
            index={index}
            open={
              entered.has(message.id) &&
              !dismissing.has(message.id) &&
              !stackExiting.has(message.id)
            }
            exiting={
              dismissing.has(message.id) || stackExiting.has(message.id)
            }
            skipEnterAnimation={initialIds.current.has(message.id)}
            onDismiss={onDismiss}
            onVisible={onVisible}
          />
        ))}
      </div>
    </PortalRoot>
  )
}

const StackItem = memo(function StackItem({
  message,
  index,
  open,
  exiting,
  skipEnterAnimation,
  onDismiss,
  onVisible,
}: {
  message: ToasterMessage
  index: number
  open: boolean
  exiting: boolean
  skipEnterAnimation: boolean
  onDismiss: (messageId: string) => void
  onVisible: (messageId: string) => void
}): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  const shouldFocus =
    message.focus === 'message' || message.focus === 'first-action'
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const handleOpen = useCallback(
    (isOpen: boolean) => {
      if (isOpen && shouldFocus) {
        previousFocusRef.current =
          document.activeElement as HTMLElement | null
        requestAnimationFrame(() => {
          const container = containerRef.current
          const item = container?.querySelector<HTMLElement>(
            '.dnb-toaster__item'
          )

          if (message.focus === 'first-action') {
            const focusable = item?.querySelector<HTMLElement>(
              'button, a, [tabindex="0"]'
            )
            ;(focusable || item)?.focus()
          } else {
            item?.focus()
          }
        })
      }
    },
    [shouldFocus, message.focus]
  )

  const handleDismiss = useCallback(
    (messageId: string) => {
      const prev = previousFocusRef.current
      if (prev && document.body.contains(prev)) {
        requestAnimationFrame(() => {
          prev.focus()
        })
      }
      previousFocusRef.current = null
      onDismiss(messageId)
    },
    [onDismiss]
  )

  const handleReturnFocus = useCallback(() => {
    const prev = previousFocusRef.current
    if (prev && document.body.contains(prev)) {
      prev.focus()
    }
  }, [])

  const stackStyle = useMemo(
    () =>
      ({
        '--stack-index': Math.min(index, 2),
      }) as React.CSSProperties,
    [index]
  )

  const content = useMemo(
    () => (
      <>
        {shouldFocus && (
          <button
            className="dnb-sr-only"
            tabIndex={0}
            onFocus={handleReturnFocus}
          />
        )}

        <ToasterItem
          message={message}
          className={
            exiting
              ? 'dnb-toaster__item--exit'
              : skipEnterAnimation
                ? undefined
                : 'dnb-toaster__item--enter'
          }
          onDismiss={handleDismiss}
          onVisible={onVisible}
        />

        {shouldFocus && (
          <button
            className="dnb-sr-only"
            tabIndex={0}
            onFocus={handleReturnFocus}
          />
        )}
      </>
    ),
    [
      message,
      exiting,
      skipEnterAnimation,
      shouldFocus,
      handleDismiss,
      onVisible,
      handleReturnFocus,
    ]
  )

  return (
    <HeightAnimation
      ref={containerRef}
      open={open}
      duration={DISMISS_ANIMATION_MS}
      onOpen={handleOpen}
      style={stackStyle}
    >
      {content}
    </HeightAnimation>
  )
})

export default ToastStack
