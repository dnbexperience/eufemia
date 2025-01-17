import { useCallback, useContext, useEffect, useRef } from 'react'
import { ContainerMode } from '../Array'
import FieldBoundaryContext, {
  FieldBoundaryContextState,
} from '../../DataContext/FieldBoundary/FieldBoundaryContext'
import IterateItemContext, {
  IterateItemContextState,
} from '../IterateItemContext'
import { Path } from '../../types'

type GlobalCacheHash = string
type GlobalCacheId = string
type GlobalCache = {
  index: IterateItemContextState['index']
  hasError: FieldBoundaryContextState['hasError']
  count: number
  switchContainerMode: IterateItemContextState['switchContainerMode']
}
type GlobalCacheItem = {
  [string: GlobalCacheHash]: GlobalCache
}

const globalContainerModeRef = { current: undefined }
const globalCache: Record<
  GlobalCacheHash,
  Record<GlobalCacheId, GlobalCache>
> = {}

/**
 * This is a helper for the Iterate component.
 * It is used to switch the container mode of the items inside the Iterate component.
 * You can use the hook outside of the Iterate component, and it will communicate with the items inside the Iterate component.
 * Therefore, it is imported and used in both e.g. the EditContainer and e.g. the PushButton.
 */
export default function useSwitchContainerMode(path?: Path) {
  const nextContainerModeRef = useRef()
  const { hasError } = useContext(FieldBoundaryContext) || {}
  const iterateItemContext = useContext(IterateItemContext)

  const id = iterateItemContext?.id
  const hash = (path || '') + 'useSwitchContainerMode'

  useEffect(() => {
    nextContainerModeRef.current = globalContainerModeRef.current
    requestAnimationFrame(() => {
      if (nextContainerModeRef.current) {
        globalContainerModeRef.current = undefined
      }
    })
  })

  useEffect(() => {
    if (hash && iterateItemContext) {
      globalCache[hash] = globalCache[hash] || ({} as GlobalCacheItem)
      const { index, arrayValue, switchContainerMode } = iterateItemContext
      globalCache[hash][id] = {
        index,
        hasError,
        count: arrayValue?.length,
        switchContainerMode,
      }
    }

    return () => {
      if (id) {
        globalCache[hash][id] = undefined
      }
    }
  }, [hasError, hash, id, iterateItemContext])

  const setNextContainerMode = useCallback((mode: ContainerMode) => {
    globalContainerModeRef.current = mode
  }, [])

  const setContainerMode = useCallback(
    (fn: ({ hasError, index, count }) => ContainerMode) => {
      const data = globalCache[hash]
      for (const id in data) {
        const item = data[id]
        const mode = item && fn?.(item)
        if (mode) {
          item.switchContainerMode(mode, { omitFocusManagement: true })
        }
      }
    },
    [hash]
  )

  const setLastItemContainerMode = useCallback(
    (mode: ContainerMode) => {
      setContainerMode(({ hasError, index, count }) => {
        if (!hasError && index === count - 2) {
          return mode
        }
      })
    },
    [setContainerMode]
  )

  const getNextContainerMode = useCallback(():
    | ContainerMode
    | undefined => {
    return nextContainerModeRef.current
  }, [])

  return {
    getNextContainerMode,
    nextContainerModeRef,
    setNextContainerMode,
    setLastItemContainerMode,
  }
}
