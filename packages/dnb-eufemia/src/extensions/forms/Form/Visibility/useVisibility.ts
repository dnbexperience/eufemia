import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import pointer from '../../utils/json-pointer'
import DataContext from '../../DataContext/Context'
import type { EventListenerCall } from '../../DataContext/Context'
import usePath from '../../hooks/usePath'
import type { Path } from '../../types'
import type { FormVisibilityProps } from './Visibility'

export type { FormVisibilityProps }

export default function useVisibility(
  props?: Partial<FormVisibilityProps>
) {
  const dataContext = useContext(DataContext)
  const {
    hasFieldError,
    filterDataHandler,
    mountedFieldsRef,
    data: originalData,
    getDataValue,
    subscribeDataValue,
    setFieldEventListener,
  } = dataContext

  const { makePath, makeIteratePath } = usePath()

  // Forward props to the "check" method with ref to avoid infinite loop
  const propsRef = useRef(props)
  propsRef.current = props

  const { withinIterate } = props || {}
  const {
    pathDefined,
    pathUndefined,
    pathTruthy,
    pathFalsy,
    pathTrue,
    pathFalse,
    visibleWhen,
    visibleWhenNot,
    inferData,
    filterData,
  } = props || {}
  const makeLocalPath = useCallback(
    (path: Path) => {
      if (withinIterate) {
        return makeIteratePath(path)
      }

      return makePath(path)
    },
    [makeIteratePath, makePath, withinIterate]
  )

  const dependencyPaths = useMemo(() => {
    const paths = new Set<Path>()

    const addPath = (path?: Path) => {
      if (path) {
        paths.add(makeLocalPath(path))
      }
    }

    const addVisibleWhenPath = (
      visibleWhen?: FormVisibilityProps['visibleWhen']
    ) => {
      if (visibleWhen && 'hasValue' in visibleWhen) {
        const path =
          'itemPath' in visibleWhen
            ? makeIteratePath(visibleWhen.itemPath)
            : makePath(visibleWhen.path)
        paths.add(path)
      }
    }

    addPath(pathDefined)
    addPath(pathUndefined)
    addPath(pathTruthy)
    addPath(pathFalsy)
    addPath(pathTrue)
    addPath(pathFalse)
    addVisibleWhenPath(visibleWhen)
    addVisibleWhenPath(visibleWhenNot)

    if (inferData || filterData) {
      paths.add('/')
    }

    return Array.from(paths)
  }, [
    filterData,
    inferData,
    makeLocalPath,
    makeIteratePath,
    makePath,
    pathDefined,
    pathFalse,
    pathFalsy,
    pathTrue,
    pathTruthy,
    pathUndefined,
    visibleWhen,
    visibleWhenNot,
  ])

  const fieldStateDependencyPaths = useMemo(() => {
    const paths = new Set<Path>()

    const addVisibleWhenPath = (
      visibleWhen?: FormVisibilityProps['visibleWhen']
    ) => {
      if (visibleWhen && 'isValid' in visibleWhen) {
        const path =
          'itemPath' in visibleWhen
            ? makeIteratePath(visibleWhen.itemPath)
            : makePath(visibleWhen.path)
        paths.add(path)
      }
    }

    addVisibleWhenPath(visibleWhen)
    addVisibleWhenPath(visibleWhenNot)

    return Array.from(paths)
  }, [makeIteratePath, makePath, visibleWhen, visibleWhenNot])

  const snapshotVersionRef = useRef(0)
  const usesDynamicCheck = !props
  const subscribe = useCallback(
    (callback: () => void) => {
      const unsubscribers: Array<() => void> = []
      const handleUpdate = () => {
        snapshotVersionRef.current += 1
        callback()
      }
      const handleFieldStateUpdate: EventListenerCall['callback'] = (
        params
      ) => {
        if (
          params &&
          'state' in params &&
          params.state.isFocused === true
        ) {
          return undefined // stop here
        }

        handleUpdate()
      }

      if (dependencyPaths.length > 0 && subscribeDataValue) {
        unsubscribers.push(
          ...dependencyPaths.map((path) =>
            subscribeDataValue(path, handleUpdate)
          )
        )
      }

      if (fieldStateDependencyPaths.length > 0 && setFieldEventListener) {
        fieldStateDependencyPaths.forEach((path) => {
          setFieldEventListener(
            path,
            'onSetMountedFieldState',
            handleFieldStateUpdate
          )
          setFieldEventListener(
            path,
            'onSetFieldError',
            handleFieldStateUpdate
          )

          unsubscribers.push(() => {
            setFieldEventListener(
              path,
              'onSetMountedFieldState',
              handleFieldStateUpdate,
              { remove: true }
            )
            setFieldEventListener(
              path,
              'onSetFieldError',
              handleFieldStateUpdate,
              {
                remove: true,
              }
            )
          })
        })
      } else if (usesDynamicCheck && setFieldEventListener) {
        setFieldEventListener(
          undefined,
          'onSetMountedFieldState',
          handleFieldStateUpdate
        )
        setFieldEventListener(
          undefined,
          'onSetFieldError',
          handleFieldStateUpdate
        )

        unsubscribers.push(() => {
          setFieldEventListener(
            undefined,
            'onSetMountedFieldState',
            handleFieldStateUpdate,
            { remove: true }
          )
          setFieldEventListener(
            undefined,
            'onSetFieldError',
            handleFieldStateUpdate,
            { remove: true }
          )
        })
      }

      return () => {
        unsubscribers.forEach((unsubscribe) => unsubscribe())
      }
    },
    [
      dependencyPaths,
      fieldStateDependencyPaths,
      setFieldEventListener,
      subscribeDataValue,
      usesDynamicCheck,
    ]
  )
  const getSnapshot = useCallback(() => snapshotVersionRef.current, [])
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

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
        inferData,
        filterData,
      }: Partial<FormVisibilityProps> = propsRef.current
    ) => {
      if (typeof visible === 'boolean') {
        return visible
      }

      const dataFromContext = getDataValue?.('/') ?? originalData
      const data =
        (filterData && filterDataHandler?.(dataFromContext, filterData)) ||
        dataFromContext

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
            return Boolean(visibleWhenNot)
          }
          const result =
            (visibleWhen.validateContinuously
              ? true
              : item.isFocused !== true) && !hasFieldError(path)
          return visibleWhenNot ? !result : result
        }

        if ('hasValue' in visibleWhen) {
          const hasPath = pointer.has(data, path)
          const value = hasPath ? pointer.get(data, path) : undefined

          const hasValue = visibleWhen?.['hasValue']
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

      if (pathTruthy && !getValue(makeLocalPath(pathTruthy))) {
        return false
      }
      if (pathFalsy && getValue(makeLocalPath(pathFalsy))) {
        return false
      }

      if (inferData && !inferData(data)) {
        return false
      }

      return true
    },
    [
      filterDataHandler,
      getDataValue,
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
