import { useRef, useState } from 'react'
import useLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import useCanUseDOM from '../../shared/helpers/useCanUseDOM'
import {
  getWebStorage,
  readWebStorageJSON,
  type WebStorageType,
} from '../../shared/helpers/webStorage'
import type { TableOfContentRootProps } from './types'

export default function useDisclosureState({
  expanded,
  defaultExpanded = false,
  expandedStorageKey,
  expandedStorage = 'session',
  onExpandedChange,
}: TableOfContentRootProps) {
  const canUseDOM = useCanUseDOM()
  const storageKey =
    expanded === undefined ? expandedStorageKey : undefined
  const storageId = storageKey
    ? expandedStorage + ':' + storageKey
    : undefined
  const [internal, setInternal] = useState(() =>
    canUseDOM
      ? readExpanded(expandedStorage, storageKey, defaultExpanded)
      : defaultExpanded
  )
  const loaded = useRef(canUseDOM ? storageId : undefined)

  useLayoutEffect(() => {
    if (storageId !== loaded.current) {
      loaded.current = storageId
      setInternal(
        readExpanded(expandedStorage, storageKey, defaultExpanded)
      )
    }
    document
      .querySelectorAll('[data-table-of-content-pre-hydration]')
      .forEach((element) => {
        if (
          element.getAttribute('data-table-of-content-pre-hydration') ===
          storageKey
        ) {
          element.remove()
        }
      })
  }, [storageId, storageKey, expandedStorage, defaultExpanded])

  const setExpanded = (value: boolean) => {
    if (expanded === undefined) {
      setInternal(value)
      if (storageKey) {
        try {
          getWebStorage(expandedStorage)?.setItem(
            storageKey,
            JSON.stringify(value)
          )
        } catch {
          // Storage can become unavailable after it was read.
        }
      }
    }
    onExpandedChange?.(value)
  }
  return { isExpanded: expanded ?? internal, setExpanded, storageKey }
}

function readExpanded(
  storage: WebStorageType,
  key: string | undefined,
  fallback: boolean
) {
  try {
    const stored = key ? readWebStorageJSON(storage, key) : undefined
    return typeof stored === 'boolean' ? stored : fallback
  } catch {
    // Storage may reject cleanup of malformed values.
    return fallback
  }
}
