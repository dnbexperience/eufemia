import { useCallback, useSyncExternalStore } from 'react'
import type { SidebarMenuResponsiveContextValue } from './SidebarMenuResponsiveContext'

const contexts = new Map<string, SidebarMenuResponsiveContextValue>()
const listeners = new Map<string, Set<() => void>>()
const getServerSnapshot = () => undefined

export function setSidebarMenuResponsiveTarget(
  scopeId: string,
  value: SidebarMenuResponsiveContextValue | undefined
) {
  if (value) {
    contexts.set(scopeId, value)
  } else {
    contexts.delete(scopeId)
  }
  listeners.get(scopeId)?.forEach((listener) => listener())
}

export default function useSidebarMenuResponsiveTarget(scopeId?: string) {
  const subscribe = useCallback(
    (listener: () => void) => {
      if (!scopeId) {
        return () => {}
      }
      const subscribers = listeners.get(scopeId) ?? new Set<() => void>()
      listeners.set(scopeId, subscribers)
      subscribers.add(listener)
      return () => {
        subscribers.delete(listener)
        if (subscribers.size === 0) {
          listeners.delete(scopeId)
        }
      }
    },
    [scopeId]
  )
  const getSnapshot = useCallback(
    () => (scopeId ? contexts.get(scopeId) : undefined),
    [scopeId]
  )

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
