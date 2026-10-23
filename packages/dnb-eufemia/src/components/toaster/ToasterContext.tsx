import { useCallback, useMemo } from 'react'
import {
  useSharedState,
  createSharedState,
} from '../../shared/helpers/useSharedState'
import type {
  AddMessageInput,
  ToasterContextValue,
  ToasterMessage,
} from './types'

const DEFAULT_TOASTER_ID = 'default'

type ToasterStoreData = {
  messages: ToasterMessage[]
}

const emptyStore: ToasterStoreData = { messages: [] }

let autoIdCounter = 0

function applyDefaults(input: AddMessageInput): ToasterMessage {
  return {
    ...input,
    id: input.id ?? `toaster-msg-${++autoIdCounter}`,
    variant: input.variant ?? 'neutral',
    priority: input.priority ?? 'low',
    focus: input.focus ?? 'none',
    privacy: input.privacy ?? 'normal',
    status: 'unread',
    createdAt: Date.now(),
  }
}

function addMessage(
  messages: ToasterMessage[],
  input: AddMessageInput
): ToasterMessage[] {
  const message = applyDefaults(input)
  const exists = messages.some((m) => m.id === message.id)

  if (exists) {
    return messages.map((m) => (m.id === message.id ? message : m))
  }

  return [...messages, message]
}

function dismissMessage(
  messages: ToasterMessage[],
  id: string
): ToasterMessage[] {
  return messages.map((m) => {
    if (m.id !== id) {
      return m
    }

    return { ...m, status: 'dismissed' as const }
  })
}

function dismissAllMessages(messages: ToasterMessage[]): ToasterMessage[] {
  return messages.map((m) => {
    if (m.status === 'dismissed' || m.status === 'expired') {
      return m
    }

    return { ...m, status: 'dismissed' as const }
  })
}

/**
 * React hook for reading and managing Toaster messages by ID.
 *
 * The component does not need to be wrapped in a provider.
 * Multiple components can subscribe to the same Toaster by using the same ID.
 *
 * ```tsx
 * const { messages, addMessage, dismissMessage } = useToaster('my-toaster')
 * ```
 */
export function useToaster(
  id: string = DEFAULT_TOASTER_ID
): ToasterContextValue {
  const { data, set } = useSharedState<ToasterStoreData>(id, emptyStore)

  const messages = data?.messages ?? []

  const handleAddMessage = useCallback(
    (input: AddMessageInput) => {
      set({
        messages: addMessage(
          createSharedState<ToasterStoreData>(id).get()?.messages ?? [],
          input
        ),
      })
    },
    [id, set]
  )

  const handleRemoveMessage = useCallback(
    (messageId: string) => {
      set({
        messages: (
          createSharedState<ToasterStoreData>(id).get()?.messages ?? []
        ).filter((m) => m.id !== messageId),
      })
    },
    [id, set]
  )

  const handleUpdateMessage = useCallback(
    (messageId: string, updates: Partial<ToasterMessage>) => {
      set({
        messages: (
          createSharedState<ToasterStoreData>(id).get()?.messages ?? []
        ).map((m) => (m.id === messageId ? { ...m, ...updates } : m)),
      })
    },
    [id, set]
  )

  const handleDismissMessage = useCallback(
    (messageId: string) => {
      set({
        messages: dismissMessage(
          createSharedState<ToasterStoreData>(id).get()?.messages ?? [],
          messageId
        ),
      })
    },
    [id, set]
  )

  const handleDismissAllMessages = useCallback(() => {
    set({
      messages: dismissAllMessages(
        createSharedState<ToasterStoreData>(id).get()?.messages ?? []
      ),
    })
  }, [id, set])

  const handleMarkMessageAsRead = useCallback(
    (messageId: string) => {
      set({
        messages: (
          createSharedState<ToasterStoreData>(id).get()?.messages ?? []
        ).map((m) =>
          m.id === messageId && m.status === 'unread'
            ? { ...m, status: 'read' as const }
            : m
        ),
      })
    },
    [id, set]
  )

  return useMemo(
    () => ({
      messages,
      addMessage: handleAddMessage,
      removeMessage: handleRemoveMessage,
      updateMessage: handleUpdateMessage,
      dismissMessage: handleDismissMessage,
      dismissAllMessages: handleDismissAllMessages,
      markMessageAsRead: handleMarkMessageAsRead,
    }),
    [
      messages,
      handleAddMessage,
      handleRemoveMessage,
      handleUpdateMessage,
      handleDismissMessage,
      handleDismissAllMessages,
      handleMarkMessageAsRead,
    ]
  )
}

export type ToasterManagerHandle = Omit<ToasterContextValue, 'messages'>

/**
 * Imperative API for managing Toaster messages from anywhere — inside
 * or outside React, before or after the `<Toaster>` mounts.
 *
 * ```ts
 * import { toasterManager } from '@dnb/eufemia'
 *
 * const toaster = toasterManager('my-toaster')
 * toaster.addMessage({ id: 'saved', variant: 'success', title: 'Saved' })
 * toaster.dismissMessage('saved')
 * ```
 */
export function toasterManager(
  id: string = DEFAULT_TOASTER_ID
): ToasterManagerHandle {
  const store = createSharedState<ToasterStoreData>(id, emptyStore)

  return {
    addMessage(input: AddMessageInput) {
      store.set({
        messages: addMessage(store.get()?.messages ?? [], input),
      })
    },

    removeMessage(messageId: string) {
      store.set({
        messages: (store.get()?.messages ?? []).filter(
          (m) => m.id !== messageId
        ),
      })
    },

    updateMessage(messageId: string, updates: Partial<ToasterMessage>) {
      store.set({
        messages: (store.get()?.messages ?? []).map((m) =>
          m.id === messageId ? { ...m, ...updates } : m
        ),
      })
    },

    dismissMessage(messageId: string) {
      store.set({
        messages: dismissMessage(store.get()?.messages ?? [], messageId),
      })
    },

    dismissAllMessages() {
      store.set({
        messages: dismissAllMessages(store.get()?.messages ?? []),
      })
    },

    markMessageAsRead(messageId: string) {
      store.set({
        messages: (store.get()?.messages ?? []).map((m) =>
          m.id === messageId && m.status === 'unread'
            ? { ...m, status: 'read' as const }
            : m
        ),
      })
    },
  }
}
