import { useCallback, useContext, useMemo, useRef } from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import { Props } from './Indeterminate'

export default function useDependencePaths(
  dependencePaths: Props['dependencePaths'],
  propagateIndeterminateState: Props['propagateIndeterminateState']
) {
  const { data, fieldInternalsRef, handlePathChange } =
    useContext(DataContext) || {}

  const { allOn, allOff, indeterminate, ariaControlsIds } = useMemo(() => {
    if (!dependencePaths || !data) {
      return {}
    }

    const check = ({ key, whenUndefined = false }) => {
      return dependencePaths?.every((path) => {
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
      })
    }

    const ariaControlsIds =
      dependencePaths
        .map((path) => fieldInternalsRef.current?.[path]?.id)
        .filter(Boolean)
        .join(' ') || undefined

    const allOn = check({ key: 'valueOn' })
    const allOff = check({ key: 'valueOff', whenUndefined: true })
    const indeterminate = !allOn && !allOff

    return {
      allOn,
      allOff,
      indeterminate,
      ariaControlsIds,
    }
  }, [data, dependencePaths, fieldInternalsRef])

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
