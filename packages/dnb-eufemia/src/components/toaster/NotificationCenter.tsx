import { useCallback, useEffect, useRef, useState } from 'react'
import type { JSX, RefObject } from 'react'
import { clsx } from 'clsx'
import HeightAnimation from '../height-animation/HeightAnimation'
import PortalRoot from '../portal-root/PortalRoot'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import useTranslation from '../../shared/useTranslation'
import ToasterItem from './ToasterItem'
import { DISMISS_ANIMATION_MS } from './useToasterState'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import type { ToasterMessage } from './types'

export const NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS = 100
const PANEL_EXIT_MS = 300

export type NotificationCenterProps = {
  isOpen: boolean
  messages: ToasterMessage[]
  openedWithMessages: Set<string>
  dismissing: Set<string>
  notificationButtonRef: RefObject<HTMLButtonElement>
  onClose: () => void
  onDismiss: (messageId: string) => void
  onVisible: (messageId: string) => void
}

function NotificationCenter({
  isOpen,
  messages,
  openedWithMessages,
  dismissing,
  notificationButtonRef,
  onClose,
  onDismiss,
  onVisible,
}: NotificationCenterProps): JSX.Element {
  const tr = useTranslation().Toaster
  const [visible, setVisible] = useState(false)
  const [closing, setClosing] = useState(false)

  // Synchronously detect close to avoid a one-frame gap where
  // isOpen is false but closing hasn't been set yet.
  const wasOpenRef = useRef(false)
  if (isOpen && !wasOpenRef.current) {
    wasOpenRef.current = true
    setVisible(true)
    setClosing(false)
  } else if (!isOpen && wasOpenRef.current) {
    wasOpenRef.current = false
    setClosing(true)
  }

  // Clear the closing state after the exit animation finishes
  useEffect(() => {
    if (!closing) {
      return undefined // stop here
    }

    const timer = setTimeout(() => {
      setClosing(false)
      setVisible(false)
    }, PANEL_EXIT_MS)

    return () => clearTimeout(timer)
  }, [closing])

  // Auto-close when all messages are dismissed
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      onClose()
    }
  }, [isOpen, messages.length, onClose])

  const panelRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSentinelFocus = useCallback(() => {
    notificationButtonRef.current?.focus()
  }, [notificationButtonRef])

  // Scroll to bottom when new messages are added
  const messageCountRef = useRef(messages.length)
  useEffect(() => {
    if (messages.length > messageCountRef.current && scrollRef.current) {
      const el = scrollRef.current
      // Wait for HeightAnimation to finish before scrolling
      // (NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS + DISMISS_ANIMATION_MS)
      const timer = setTimeout(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight
      }, NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS + DISMISS_ANIMATION_MS)
      messageCountRef.current = messages.length
      return () => clearTimeout(timer)
    }
    messageCountRef.current = messages.length
    return undefined
  }, [messages.length])

  const showPanel = (isOpen || closing) && visible

  // Start at the bottom when the panel first mounts
  useLayoutEffect(() => {
    if (showPanel && scrollRef.current) {
      const el = scrollRef.current
      el.scrollTop = el.scrollHeight - el.clientHeight
    }
  }, [showPanel])

  return (
    <PortalRoot
      ref={panelRef}
      className={clsx('dnb-toaster__notification-center')}
    >
      {showPanel && (
        <>
          <button
            className="dnb-sr-only"
            tabIndex={0}
            onFocus={handleSentinelFocus}
          >
            {tr.systemMessages}
          </button>

          <ScrollView
            ref={scrollRef}
            className={clsx(
              'dnb-toaster__panel',
              'dnb-toaster__panel--notification-center',
              !closing && 'dnb-toaster__panel--enter',
              closing && 'dnb-toaster__panel--exit'
            )}
            interactive="auto"
            role="log"
            aria-label={tr.systemMessages}
          >
            {messages.map((message) => {
              const sanitized =
                message.privacy === 'sensitive'
                  ? {
                      ...message,
                      text: message.privacyFallbackText ?? undefined,
                      actions: undefined,
                    }
                  : message

              return (
                <NotificationCenterItem
                  key={message.id}
                  message={sanitized}
                  animateIn={!openedWithMessages.has(message.id)}
                  dismissing={dismissing.has(message.id)}
                  onDismiss={onDismiss}
                  onVisible={onVisible}
                />
              )
            })}
          </ScrollView>

          <button
            className="dnb-sr-only"
            tabIndex={0}
            onFocus={handleSentinelFocus}
          >
            {tr.systemMessages}
          </button>
        </>
      )}
    </PortalRoot>
  )
}

/**
 * Wraps a single notification center item with HeightAnimation.
 * Items present when the panel opened (`animateIn=false`) appear instantly.
 * Items added while the panel is open (`animateIn=true`) mount with
 * `open=false` + `keepInDOM`, then flip to `open=true` on the next
 * effect cycle — HeightAnimation sees state='closed' (not 'init')
 * and runs the opening animation.
 */
function NotificationCenterItem({
  message,
  animateIn,
  dismissing,
  onDismiss,
  onVisible,
}: {
  message: ToasterMessage
  animateIn: boolean
  dismissing: boolean
  onDismiss: (messageId: string) => void
  onVisible: (messageId: string) => void
}): JSX.Element {
  const [ready, setReady] = useState(!animateIn)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ready) {
      return undefined // stop here
    }

    const timer = setTimeout(() => {
      setReady(true)
    }, NOTIFICATION_CENTER_ANIMATE_IN_DELAY_MS)

    return () => clearTimeout(timer)
  }, [ready])

  const shouldFocus =
    message.focus === 'message' || message.focus === 'first-action'

  const handleOpen = useCallback(
    (isOpen: boolean) => {
      if (isOpen && shouldFocus) {
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

  return (
    <HeightAnimation
      ref={containerRef}
      open={ready && !dismissing}
      keepInDOM={animateIn}
      duration={DISMISS_ANIMATION_MS}
      onOpen={animateIn ? handleOpen : undefined}
    >
      <ToasterItem
        message={message}
        className={
          dismissing
            ? 'dnb-toaster__item--exit'
            : 'dnb-toaster__item--enter'
        }
        onDismiss={onDismiss}
        onVisible={onVisible}
      />
    </HeightAnimation>
  )
}

export default NotificationCenter
