import { useCallback, useContext, useRef } from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import usePath from '../../hooks/usePath'
import { Path } from '../../types'
import { Props } from './Visibility'

export type { Props }

export default function useVisibility(props?: Partial<Props>) {
  const {
    hasFieldError,
    filterDataHandler,
    mountedFieldsRef,
    data: originalData,
  } = useContext(DataContext)

  const { makePath, makeIteratePath } = usePath()

  // Forward props to the "check" method with ref to avoid infinite loop
  const propsRef = useRef(props)
  propsRef.current = props

  const { withinIterate } = props || {}
  const makeLocalPath = useCallback(
    (path: Path) => {
      if (withinIterate) {
        return makeIteratePath(path)
      }

      return makePath(path)
    },
    [makeIteratePath, makePath, withinIterate]
  )

  const check = useCallback(
    (
      {
        visible,
        visibleWhen,
        visibleWhenNot,
        pathDefined,
        pathUndefined,
        pathTruthy,
        pathFalsy,
        pathTrue,
        pathFalse,
        pathValue,
        whenValue,
        inferData,
        filterData,
      }: Partial<Props> = propsRef.current
    ) => {
      if (typeof visible === 'boolean') {
        return visible
      }

      const data =
        (filterData && filterDataHandler?.(originalData, filterData)) ||
        originalData

      if (visibleWhen || visibleWhenNot) {
        if (visibleWhenNot) {
          visibleWhen = visibleWhenNot
        }

        const path =
          'itemPath' in visibleWhen
            ? makeIteratePath(visibleWhen.itemPath)
            : makePath(visibleWhen.path)

        if ('isValid' in visibleWhen) {
          const item = mountedFieldsRef.current.get(path)
          if (!item || item.isMounted !== true) {
            return visibleWhenNot ? true : false
          }
          const result =
            (visibleWhen.continuousValidation ||
            visibleWhen.validateContinuously
              ? true
              : item.isFocused !== true) && hasFieldError(path) === false
          return visibleWhenNot ? !result : result
        }

        if ('hasValue' in visibleWhen || 'withValue' in visibleWhen) {
          const hasPath = pointer.has(data, path)
          const value = hasPath ? pointer.get(data, path) : undefined

          if (visibleWhen?.['withValue']) {
            console.warn(
              'VisibleWhen: "withValue" is deprecated, use "hasValue" instead'
            )
          }

          const hasValue =
            visibleWhen?.['hasValue'] ?? visibleWhen?.['withValue']
          const result =
            typeof hasValue === 'function'
              ? hasValue(value) === false
              : hasValue !== value

          if (visibleWhenNot) {
            if (!result) {
              return false
            }
          } else if (result) {
            return false
          }
        }
      }

      const getValue = (path: Path) => {
        if (pointer.has(data, path)) {
          return pointer.get(data, path)
        }
      }

      if (pathDefined) {
        return getValue(makeLocalPath(pathDefined)) !== undefined
      }
      if (pathUndefined) {
        return getValue(makeLocalPath(pathUndefined)) === undefined
      }

      if (pathTrue && getValue(makeLocalPath(pathTrue)) !== true) {
        return false
      }
      if (pathFalse && getValue(makeLocalPath(pathFalse)) !== false) {
        return false
      }

      if (
        pathTruthy &&
        Boolean(getValue(makeLocalPath(pathTruthy))) === false
      ) {
        return false
      }
      if (
        pathFalsy &&
        Boolean(getValue(makeLocalPath(pathFalsy))) === true
      ) {
        return false
      }

      if (inferData && !inferData(data)) {
        return false
      }

      return true
    },
    [
      filterDataHandler,
      originalData,
      makeLocalPath,
      makeIteratePath,
      makePath,
      mountedFieldsRef,
      hasFieldError,
    ]
  )

  return { check }
}
