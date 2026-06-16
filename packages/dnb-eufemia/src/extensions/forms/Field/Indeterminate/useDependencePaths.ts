import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import type { FieldIndeterminateProps } from './Indeterminate'

export default function useDependencePaths(
  dependencePaths: FieldIndeterminateProps['dependencePaths'],
  propagateIndeterminateState: FieldIndeterminateProps['propagateIndeterminateState']
) {
  const {
    internalDataRef,
    fieldInternalsRef,
    handlePathChange,
    subscribeDataValue,
  } = useContext(DataContext) || {}

  const snapshotVersionRef = useRef(0)
  const subscribe = useCallback(
    (callback: () => void) => {
      if (!dependencePaths?.length || !subscribeDataValue) {
        return () => undefined
      }

      const handleUpdate = () => {
        snapshotVersionRef.current += 1
        callback()
      }

      const unsubscribers = dependencePaths.map((path) =>
        subscribeDataValue(path, handleUpdate)
      )

      return () => {
        unsubscribers.forEach((unsubscribe) => unsubscribe())
      }
    },
    [dependencePaths, subscribeDataValue]
  )
  const getSnapshot = useCallback(() => snapshotVersionRef.current, [])
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const data = internalDataRef?.current
  const ariaControlsIds =
    dependencePaths
      ?.map((path) => fieldInternalsRef?.current?.[path]?.id)
      .filter(Boolean)
      .join(' ') || undefined

  const check = ({ key, whenUndefined = false }) => {
    if (!dependencePaths || !data) {
      return undefined
    }

    return dependencePaths.every((path) => {
      if (pointer.has(data, path)) {
        const value = pointer.get(data, path)
        if (
          // When value is undefined, we should also consider it as off
          (whenUndefined ? typeof value === 'undefined' : false) ||
          value === fieldInternalsRef?.current?.[path]?.props?.[key]
        ) {
          return true
        }
      }

      return undefined
    })
  }

  const allOn = check({ key: 'valueOn' })
  const allOff = check({ key: 'valueOff', whenUndefined: true })
  const indeterminate = data ? !allOn && !allOff : undefined

  const keepStateRef = useRef<boolean>(undefined)
  useMemo(() => {
    if (allOn && !keepStateRef.current) {
      keepStateRef.current = true
    } else if (allOff && keepStateRef.current) {
      keepStateRef.current = false
    } else {
      if (propagateIndeterminateState !== 'auto' && indeterminate) {
        keepStateRef.current = propagateIndeterminateState === 'unchecked'
      }
    }
  }, [allOn, allOff, propagateIndeterminateState, indeterminate])

  const setAllStates = useCallback(
    (checked: boolean) => {
      dependencePaths?.forEach((path) => {
        const fieldProp = checked ? 'valueOn' : 'valueOff'
        const value =
          fieldInternalsRef?.current?.[path]?.props?.[fieldProp]
        handlePathChange?.(path, value)
      })
    },
    [dependencePaths, fieldInternalsRef, handlePathChange]
  )

  return {
    setAllStates,
    indeterminate,
    internalValue: keepStateRef.current,
    ariaControlsIds,
  }
}
