import { use, useCallback, useId } from 'react'
import type { Ref } from 'react'
import HeadingContext from './HeadingContext'

export function createHeadingOrder(recalculate: () => void) {
  const entries = new Map<string, Element>()
  let observer: MutationObserver
  let targets: Node[] = []
  let ancestors = new WeakSet<Node>()
  let previous: string[] = []
  let scheduled = false

  const check = () => {
    scheduled = false
    const ordered = Array.from(entries).sort(([, first], [, second]) => {
      const position = first.compareDocumentPosition(second)
      if (position & Node.DOCUMENT_POSITION_DISCONNECTED) {
        return 0
      }
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    })
    const containers = new Map<Node, Node>()
    for (const [, element] of ordered) {
      const root = element.getRootNode()
      let container = containers.get(root) || element.parentNode
      while (container && !container.contains(element)) {
        container = container.parentNode
      }
      if (container) {
        containers.set(root, container)
      }
    }

    ancestors = new WeakSet()
    for (const [, element] of ordered) {
      const container = containers.get(element.getRootNode())
      for (let node: Node = element; node; node = node.parentNode) {
        ancestors.add(node)
        if (node === container) {
          break
        }
      }
    }
    const nextTargets = Array.from(containers.values())
    if (
      targets.length !== nextTargets.length ||
      targets.some((target, index) => target !== nextTargets[index])
    ) {
      observer?.disconnect()
      observer ||= new MutationObserver((records) => {
        // Moving a memoized subtree does not rerender its headings.
        if (
          records.some(({ addedNodes, removedNodes }) =>
            [...addedNodes, ...removedNodes].some((node) =>
              ancestors.has(node)
            )
          )
        ) {
          schedule()
        }
      })
      nextTargets.forEach((target) =>
        observer.observe(target, { childList: true, subtree: true })
      )
      targets = nextTargets
    }

    const next = ordered.map(([id]) => id)
    const changed =
      previous.length > 0 &&
      (previous.length !== next.length ||
        previous.some((id, index) => id !== next[index]))
    previous = next

    if (changed && next.length > 0) {
      recalculate()
    }
  }

  const schedule = () => {
    if (!scheduled) {
      scheduled = true
      void Promise.resolve().then(check)
    }
  }

  return {
    check,
    register(id: string, element: Element) {
      entries.set(id, element)
      schedule()

      return () => {
        if (entries.get(id) === element) {
          entries.delete(id)
        }
        if (entries.size === 0) {
          observer?.disconnect()
          targets = []
        }
        schedule()
      }
    },
  }
}

export default function useHeadingOrder<T>(
  forwardedRef?: Ref<T>,
  enabled = true
) {
  const order = enabled ? use(HeadingContext).heading?.order : undefined
  const id = useId()
  const ref = useCallback(
    (element: T | null) => {
      const unregister =
        element instanceof Element && order
          ? order.register(id, element)
          : undefined
      const cleanup =
        typeof forwardedRef === 'function'
          ? forwardedRef(element)
          : undefined
      if (forwardedRef && typeof forwardedRef !== 'function') {
        forwardedRef.current = element
      }

      return () => {
        unregister?.()
        if (typeof cleanup === 'function') {
          cleanup()
        } else if (typeof forwardedRef === 'function') {
          forwardedRef(null)
        } else if (forwardedRef) {
          forwardedRef.current = null
        }
      }
    },
    [forwardedRef, id, order]
  )

  return order ? ref : forwardedRef
}
