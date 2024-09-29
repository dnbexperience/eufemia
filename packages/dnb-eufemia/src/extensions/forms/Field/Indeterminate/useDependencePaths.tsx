import { useCallback, useContext, useMemo, useRef } from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import { Props } from './Indeterminate'

export default function useDependencePaths(
  dependencePaths: Props['dependencePaths'],
  propagateIndeterminateState: Props['propagateIndeterminateState']
) {
  const { data, fieldPropsRef, handlePathChange } =
    useContext(DataContext) || {}

  const { allOn, allOff, indeterminate } = useMemo(() => {
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
            value === fieldPropsRef?.current?.[path]?.[key]
          ) {
            return true
          }
        }
      })
    }

    const allOn = check({ key: 'valueOn' })
    const allOff = check({ key: 'valueOff', whenUndefined: true })
    const indeterminate = !allOn && !allOff

    return {
      allOn,
      allOff,
      indeterminate,
    }
  }, [data, dependencePaths, fieldPropsRef])

  const keepStateRef = useRef<boolean>()
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
        const value = fieldPropsRef?.current?.[path]?.[fieldProp]
        handlePathChange?.(path, value)
      })
    },
    [dependencePaths, fieldPropsRef, handlePathChange]
  )

  return {
    setAllStates,
    indeterminate,
    internalValue: keepStateRef.current,
  }
}
