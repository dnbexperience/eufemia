import {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
} from 'react'
import type { ReactNode } from 'react'
import pointer from '../../utils/json-pointer'
import type { ComponentProps, Path } from '../../types'
import type { ContextState } from '../Context'
import Context from '../Context'
import DataContextRefContext from '../DataContextRefContext'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type DataContextAtProps = ComponentProps & {
  /** JSON Pointer for where in the source dataset to point at in sub components */
  path?: string
  iterate?: boolean
  children?: ReactNode
}

function At(props: DataContextAtProps) {
  const { path = '/', iterate, children } = props
  const dataContext = useContext(Context)
  const {
    data: contextData,
    handlePathChange: handlePathChangeDataContext,
    handlePathChangeUnvalidated: handlePathChangeUnvalidatedDataContext,
    updateDataValue: updateDataValueDataContext,
    subscribeDataValue,
    getDataValue,
  } = dataContext

  const subscribe = useCallback(
    (callback: () => void) => {
      return subscribeDataValue?.(path as Path, callback) ?? noop
    },
    [path, subscribeDataValue]
  )

  const getSnapshot = useCallback(() => {
    if (getDataValue) {
      return getDataValue(path as Path)
    }

    return getValueByPath(contextData, path as Path)
  }, [contextData, getDataValue, path])

  const data = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const internalDataRef = useRef(data)
  internalDataRef.current = data

  const makeScopedPath = useCallback(
    (changePath: Path) => joinPath(path as Path, changePath),
    [path]
  )

  const handlePathChange: ContextState['handlePathChange'] = useCallback(
    (changePath, value) => {
      return handlePathChangeDataContext(makeScopedPath(changePath), value)
    },
    [handlePathChangeDataContext, makeScopedPath]
  )

  const handlePathChangeUnvalidated: ContextState['handlePathChangeUnvalidated'] =
    useCallback(
      (changePath, value, options) => {
        return handlePathChangeUnvalidatedDataContext(
          makeScopedPath(changePath),
          value,
          options
        )
      },
      [handlePathChangeUnvalidatedDataContext, makeScopedPath]
    )

  const updateDataValue: ContextState['updateDataValue'] = useCallback(
    (changePath, value, options) => {
      return updateDataValueDataContext(
        makeScopedPath(changePath),
        value,
        options
      )
    },
    [makeScopedPath, updateDataValueDataContext]
  )

  const scopedSubscribeDataValue: ContextState['subscribeDataValue'] =
    useCallback(
      (changePath, callback) => {
        return (
          subscribeDataValue?.(makeScopedPath(changePath), callback) ??
          noop
        )
      },
      [makeScopedPath, subscribeDataValue]
    )

  const scopedGetDataValue: ContextState['getDataValue'] = useCallback(
    (changePath) => {
      if (getDataValue) {
        return getDataValue(makeScopedPath(changePath))
      }

      return getValueByPath(data, changePath)
    },
    [data, getDataValue, makeScopedPath]
  )

  const scopedDataContext = useMemo<ContextState>(
    () => ({
      ...dataContext,
      data,
      internalDataRef,
      handlePathChange,
      handlePathChangeUnvalidated,
      updateDataValue,
      subscribeDataValue: scopedSubscribeDataValue,
      getDataValue: scopedGetDataValue,
    }),
    [
      data,
      dataContext,
      handlePathChange,
      handlePathChangeUnvalidated,
      internalDataRef,
      scopedGetDataValue,
      scopedSubscribeDataValue,
      updateDataValue,
    ]
  )

  if (iterate) {
    if (!Array.isArray(data)) {
      return null
    }
    return (
      <>
        {data.map((element, index) => {
          const itemPath = joinPath(path as Path, `/${index}` as Path)
          const makeScopedItemPath = (changePath: Path) => {
            return joinPath(itemPath, changePath)
          }

          return (
            <ScopedContextProvider
              key={`element${index}`}
              value={{
                ...scopedDataContext,
                data: element,
                internalDataRef: { current: element },
                handlePathChange: (changePath, value) => {
                  return handlePathChangeDataContext(
                    makeScopedItemPath(changePath),
                    value
                  )
                },
                handlePathChangeUnvalidated: (
                  changePath,
                  value,
                  options
                ) => {
                  return handlePathChangeUnvalidatedDataContext(
                    makeScopedItemPath(changePath),
                    value,
                    options
                  )
                },
                updateDataValue: (changePath, value, options) => {
                  return updateDataValueDataContext(
                    makeScopedItemPath(changePath),
                    value,
                    options
                  )
                },
                subscribeDataValue: (changePath, callback) => {
                  return (
                    subscribeDataValue?.(
                      makeScopedItemPath(changePath),
                      callback
                    ) ?? noop
                  )
                },
                getDataValue: (changePath) => {
                  if (getDataValue) {
                    return getDataValue(makeScopedItemPath(changePath))
                  }

                  return getValueByPath(element, changePath)
                },
              }}
            >
              {children}
            </ScopedContextProvider>
          )
        })}
      </>
    )
  }

  return (
    <ScopedContextProvider value={scopedDataContext}>
      {children}
    </ScopedContextProvider>
  )
}

function ScopedContextProvider({
  value,
  children,
}: {
  value: ContextState
  children?: ReactNode
}) {
  const dataContextRef = useRef<ContextState>(undefined)
  dataContextRef.current = value

  return (
    <Context value={value}>
      {/* Keep ref-based data hooks scoped to DataContext.At. */}
      <DataContextRefContext value={dataContextRef}>
        {children}
      </DataContextRefContext>
    </Context>
  )
}

function getValueByPath(data: unknown, path: Path) {
  if (path === '/') {
    return data
  }

  return data && pointer.has(data, path)
    ? pointer.get(data, path)
    : undefined
}

function joinPath(path: Path, changePath: Path): Path {
  if (!changePath || changePath === '/') {
    return path
  }

  if (!path || path === '/') {
    return changePath
  }

  return `${path}${changePath}` as Path
}

function noop() {
  return undefined
}

withComponentMarkers(At, { _supportsSpacingProps: true })

export default At
