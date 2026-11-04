import { useEffect, useMemo, useRef, useState } from 'react'
import type { JSX } from 'react'
import ToasterInline from './ToasterInline'
import { useToasterUI } from './useToasterState'
import { getToasterRefs } from './toasterRefs'

export type ToasterNotificationCenterListProps = {
  /** The ID of the Toaster.Host this component belongs to. */
  hostId: string

  /** Display order of messages. `'asc'` shows oldest first, `'desc'` shows newest first. Default: `'asc'`. */
  order?: 'asc' | 'desc'
}

/**
 * Renders notification messages inline in the document flow.
 * Use this to build a custom notification center.
 */
function ToasterNotificationCenterList({
  hostId,
  order = 'asc',
}: ToasterNotificationCenterListProps): JSX.Element {
  const state = useToasterUI(hostId)
  const refs = getToasterRefs(hostId)

  useEffect(() => {
    refs.hasNotificationUI.current = true
    return () => {
      refs.hasNotificationUI.current = false
    }
  }, [refs])

  const orderedMessages = useMemo(() => {
    if (order === 'desc') {
      return [...state.visibleMessages].reverse()
    }
    return state.visibleMessages
  }, [order, state.visibleMessages])

  // When order is "desc", new items insert at the top. Delay adding them
  // to the entered set so HeightAnimation can measure from height 0 first.
  const delayedEntered = useDelayedEntered(state.entered, order === 'desc')

  return (
    <ToasterInline
      messages={orderedMessages}
      entered={delayedEntered}
      dismissing={state.dismissing}
      onDismiss={state.handleDismiss}
      onVisible={state.handleVisible}
    />
  )
}

function useDelayedEntered(
  entered: Set<string>,
  shouldDelay: boolean
): Set<string> {
  const [delayed, setDelayed] = useState(entered)
  const prevRef = useRef(entered)

  useEffect(() => {
    if (!shouldDelay) {
      setDelayed(entered)
      prevRef.current = entered
      return undefined
    }

    const prev = prevRef.current
    const hasNew = Array.from(entered).some((id) => !prev.has(id))
    prevRef.current = entered

    if (!hasNew) {
      setDelayed(entered)
      return undefined
    }

    const timer = setTimeout(() => {
      setDelayed(entered)
    }, 100)

    return () => clearTimeout(timer)
  }, [entered, shouldDelay])

  return delayed
}

export default ToasterNotificationCenterList
