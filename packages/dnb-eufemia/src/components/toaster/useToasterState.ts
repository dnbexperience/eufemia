import { useCallback, useEffect, useMemo } from 'react'
import {
  useSharedState,
  createSharedState,
} from '../../shared/helpers/useSharedState'
import { useToaster } from './ToasterContext'
import { getToasterRefs } from './toasterRefs'
import type { ToasterMessage } from './types'

export const DISMISS_ANIMATION_MS = 300

// -- Shared UI state (stored via useSharedState) --

export type ToasterUIData = {
  isOpen: boolean
  dismissing: Set<string>
  stackHiding: Set<string>
  stackExiting: Set<string>
  entered: Set<string>
  openedWithMessages: Set<string>
  pulseKey: number
}

const initialUIData: ToasterUIData = {
  isOpen: false,
  dismissing: new Set(),
  stackHiding: new Set(),
  stackExiting: new Set(),
  entered: new Set(),
  openedWithMessages: new Set(),
  pulseKey: 0,
}

function uiKey(id: string): string {
  return `toaster-ui-${id}`
}

function getUI(id: string): ToasterUIData {
  return createSharedState<ToasterUIData>(uiKey(id)).get() ?? initialUIData
}

function getFreshVisibleMessages(id: string): ToasterMessage[] {
  const ui = getUI(id)
  const msgs =
    createSharedState<{ messages: ToasterMessage[] }>(id).get()
      ?.messages ?? []

  return msgs.filter(
    (m) => m.status !== 'dismissed' || ui.dismissing.has(m.id)
  )
}

// -- Public result type --

export type ToasterStateResult = {
  messages: ToasterMessage[]
  visibleMessages: ToasterMessage[]
  latestAnnouncement: string | React.ReactNode
  latestAnnouncementPriority: 'low' | 'high'
  unreadCount: number
  isOpen: boolean
  dismissing: Set<string>
  entered: Set<string>
  stackHiding: Set<string>
  stackExiting: Set<string>
  openedWithMessages: Set<string>
  notificationButtonRef: React.RefObject<HTMLButtonElement | null>
  focusProxyRef: React.RefObject<HTMLButtonElement | null>
  programmaticFocusRef: React.MutableRefObject<boolean>
  handleNotificationButtonToggle: () => void
  handleClose: () => void
  handleFocus: () => void
  handlePointerDown: () => void
  handleDismiss: (messageId: string) => void
  handleStackHide: (messageId: string) => void
  handleVisible: (messageId: string) => void
  stackMessages: ToasterMessage[]
  cappedStackMessages: ToasterMessage[]
  showToastStack: boolean
  pulseKey: number
}

/**
 * Shared UI state + actions (no side effects).
 * Multiple sibling components can call this with the same ID
 * to share toaster UI state.
 */
export function useToasterUI(id: string): ToasterStateResult {
  const { data, extend } = useSharedState<ToasterUIData>(
    uiKey(id),
    initialUIData
  )
  const { messages, dismissMessage, markMessageAsRead } = useToaster(id)
  const refs = getToasterRefs(id)

  const ui = data ?? initialUIData

  const visibleMessages = useMemo(
    () =>
      messages.filter(
        (m) => m.status !== 'dismissed' || ui.dismissing.has(m.id)
      ),
    [messages, ui.dismissing]
  )

  const latestAnnouncement = useMemo(() => {
    const unread = messages.filter((m) => m.status === 'unread')

    if (unread.length === 0) {
      return ''
    }

    const latest = unread[unread.length - 1]
    return latest.title || latest.text || ''
  }, [messages])

  const latestAnnouncementPriority = useMemo(() => {
    const unread = messages.filter((m) => m.status === 'unread')
    const latest = unread[unread.length - 1]
    return latest?.priority ?? 'low'
  }, [messages])

  const unreadCount = useMemo(
    () => messages.filter((m) => m.status === 'unread').length,
    [messages]
  )

  const handleNotificationButtonToggle = useCallback(() => {
    const current = getUI(id)
    const vis = getFreshVisibleMessages(id)

    const stackHiding = new Set(current.stackHiding)
    for (const m of vis) {
      stackHiding.add(m.id)
    }

    if (current.isOpen) {
      extend({ isOpen: false, stackHiding })
    } else {
      extend({
        isOpen: true,
        stackHiding,
        openedWithMessages: new Set(vis.map((m) => m.id)),
      })
    }
  }, [id, extend])

  const handleClose = useCallback(() => {
    const current = getUI(id)
    if (!current.isOpen) {
      return // stop here
    }

    const vis = getFreshVisibleMessages(id)
    const stackHiding = new Set(current.stackHiding)
    for (const m of vis) {
      stackHiding.add(m.id)
    }

    extend({ isOpen: false, stackHiding })

    refs.programmaticFocusRef.current = true
    refs.focusProxyRef.current?.focus()
    requestAnimationFrame(() => {
      refs.programmaticFocusRef.current = false
    })
  }, [id, extend, refs])

  const handleFocus = useCallback(() => {
    if (refs.pointerDownRef.current || refs.programmaticFocusRef.current) {
      return // stop here
    }

    const vis = getFreshVisibleMessages(id)

    if (vis.length > 0) {
      const current = getUI(id)
      const stackHiding = new Set(current.stackHiding)
      for (const m of vis) {
        stackHiding.add(m.id)
      }

      extend({
        isOpen: true,
        stackHiding,
        openedWithMessages: new Set(vis.map((m) => m.id)),
      })
    }
  }, [id, extend, refs])

  const handlePointerDown = useCallback(() => {
    refs.pointerDownRef.current = true
    requestAnimationFrame(() => {
      refs.pointerDownRef.current = false
    })
  }, [refs])

  const handleDismiss = useCallback(
    (messageId: string) => {
      const current = getUI(id)
      extend({ dismissing: new Set(current.dismissing).add(messageId) })
      dismissMessage(messageId)
    },
    [id, extend, dismissMessage]
  )

  const handleStackHide = useCallback(
    (messageId: string) => {
      const current = getUI(id)
      extend({
        stackExiting: new Set(current.stackExiting).add(messageId),
        pulseKey: current.pulseKey + 1,
      })
    },
    [id, extend]
  )

  const handleVisible = useCallback(
    (messageId: string) => {
      markMessageAsRead(messageId)
    },
    [markMessageAsRead]
  )

  const stackMessages = useMemo(
    () =>
      visibleMessages.filter(
        (m) => !ui.stackHiding.has(m.id) || ui.stackExiting.has(m.id)
      ),
    [visibleMessages, ui.stackHiding, ui.stackExiting]
  )

  const cappedStackMessages = useMemo(() => {
    const active = stackMessages.filter((m) => !ui.stackExiting.has(m.id))
    const exiting = stackMessages.filter((m) => ui.stackExiting.has(m.id))

    return [...[...active].reverse(), ...exiting]
  }, [stackMessages, ui.stackExiting])

  return {
    messages,
    visibleMessages,
    latestAnnouncement,
    latestAnnouncementPriority,
    unreadCount,
    isOpen: ui.isOpen,
    dismissing: ui.dismissing,
    entered: ui.entered,
    openedWithMessages: ui.openedWithMessages,
    stackHiding: ui.stackHiding,
    stackExiting: ui.stackExiting,
    pulseKey: ui.pulseKey,
    notificationButtonRef: refs.notificationButtonRef,
    focusProxyRef: refs.focusProxyRef,
    programmaticFocusRef: refs.programmaticFocusRef,
    handleNotificationButtonToggle,
    handleClose,
    handleFocus,
    handlePointerDown,
    handleDismiss,
    handleStackHide,
    handleVisible,
    stackMessages,
    cappedStackMessages,
    showToastStack: !ui.isOpen,
  }
}

/**
 * Side effects for the toaster UI.
 * Must be called from exactly ONE component per toaster ID.
 */
export function useToasterEffects(
  id: string,
  ui: ToasterStateResult
): void {
  const { extend } = useSharedState<ToasterUIData>(
    uiKey(id),
    initialUIData
  )
  const { removeMessage } = useToaster(id)

  // Close on Escape
  useEffect(() => {
    if (!ui.isOpen) {
      return undefined // stop here
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const modalStack = window.__modalStack

        if (Array.isArray(modalStack) && modalStack.length > 0) {
          return // stop here – let the modal handle Escape
        }

        event.preventDefault()
        const vis = getFreshVisibleMessages(id)
        const current = getUI(id)
        const stackHiding = new Set(current.stackHiding)
        for (const m of vis) {
          stackHiding.add(m.id)
        }

        extend({ isOpen: false, stackHiding })
        const refs = getToasterRefs(id)
        refs.programmaticFocusRef.current = true
        refs.focusProxyRef.current?.focus()
        requestAnimationFrame(() => {
          refs.programmaticFocusRef.current = false
        })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [id, ui.isOpen, extend])

  // Remove dismissed messages after animation
  useEffect(() => {
    if (ui.dismissing.size === 0) {
      return undefined // stop here
    }

    const timer = setTimeout(() => {
      ui.dismissing.forEach((messageId) => {
        removeMessage(messageId)
      })
      extend({ dismissing: new Set() })
    }, DISMISS_ANIMATION_MS + 100)

    return () => clearTimeout(timer)
  }, [ui.dismissing, removeMessage, extend])

  // Move stack-exiting to stack-hidden after animation
  useEffect(() => {
    if (ui.stackExiting.size === 0) {
      return undefined // stop here
    }

    const timer = setTimeout(() => {
      const current = getUI(id)
      const stackHiding = new Set(current.stackHiding)
      current.stackExiting.forEach((xid) => stackHiding.add(xid))
      extend({ stackHiding, stackExiting: new Set() })
    }, DISMISS_ANIMATION_MS)

    return () => clearTimeout(timer)
  }, [id, ui.stackExiting, extend])

  // Mark new messages as entered
  useEffect(() => {
    const newIds = ui.visibleMessages
      .map((m) => m.id)
      .filter((mid) => !ui.entered.has(mid))

    if (newIds.length > 0) {
      const current = getUI(id)
      const entered = new Set(current.entered)
      for (const mid of newIds) {
        entered.add(mid)
      }
      extend({ entered })
    }
  }, [id, ui.visibleMessages, ui.entered, extend])
}

/**
 * Combined hook — shared state + actions + effects.
 * Used by the monolithic ToasterRenderer.
 */
export function useToasterState(id: string): ToasterStateResult {
  const ui = useToasterUI(id)
  useToasterEffects(id, ui)

  return ui
}
