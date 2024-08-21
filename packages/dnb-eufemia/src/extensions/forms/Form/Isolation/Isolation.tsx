import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { extendDeep } from '../../../../shared/component-helper'
import useDataValue from '../../hooks/useDataValue'
import { Context, ContextState, Provider } from '../../DataContext'
import SectionContext from '../Section/SectionContext'
import IsolationCommitButton from './IsolationCommitButton'
import {
  clearedData,
  type Props as ProviderProps,
} from '../../DataContext/Provider'
import type { OnCommit, Path } from '../../types'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export type IsolationProviderProps<Data> = {
  /**
   * Form.Isolation: Will be called when the isolated context is committed.
   */
  onCommit?: OnCommit<Data>
  /**
   * Form.Isolation: Will be called when the form is cleared via Form.clearData
   */
  onClear?: () => void
  /**
   * Form.Isolation: A function that will be called when the isolated context is committed.
   * It will receive the data from the isolated context and the data from the outer context.
   * You can use this to transform the data before it is committed.
   */
  transformOnCommit?: (isolatedData: Data, handlerData: Data) => Data
  /**
   * Used internally by the Form.Isolation component
   */
  path?: Path
  /**
   * Used internally by the Form.Isolation component
   */
  isolate?: boolean
}

export type IsolationProps<Data> = Omit<
  ProviderProps<Data>,
  | 'onSubmit'
  | 'onSubmitRequest'
  | 'onSubmitComplete'
  | 'minimumAsyncBehaviorTime'
  | 'asyncSubmitTimeout'
  | 'scrollTopOnSubmit'
  | 'sessionStorageId'
  | 'filterSubmitData'
  | 'globalStatusId'
> & {
  /**
   * A ref (function) that you can call in order to commit the data programmatically to the outer context.
   */
  commitHandleRef?: React.MutableRefObject<() => void>
}

function IsolationProvider<Data extends JsonObject>(
  props: IsolationProps<Data>
) {
  const {
    children,
    onPathChange,
    onCommit: onCommitProp,
    onClear: onClearProp,
    transformOnCommit: transformOnCommitProp,
    commitHandleRef,
    data,
    defaultData,
  } = props

  const [, forceUpdate] = useReducer(() => ({}), {})
  const internalDataRef = useRef<Data>()
  const localDataRef = useRef<Partial<Data>>({})
  const dataContextRef = useRef<ContextState>(null)
  const outerContext = useContext(Context)
  const { path: pathSection } = useContext(SectionContext) || {}
  const { handlePathChange: handlePathChangeOuter, data: dataOuter } =
    outerContext || {}
  const { moveValueToPath } = useDataValue()

  const onPathChangeHandler = useCallback(
    async (path: Path, value: unknown) => {
      if (localDataRef.current === clearedData) {
        localDataRef.current = {}
      }

      pointer.set(localDataRef.current, path, value)

      if (pathSection) {
        path = path.replace(pathSection, '')
      }

      return await onPathChange?.(path, value)
    },
    [onPathChange, pathSection]
  )

  const removeSectionPath = useCallback(
    (data: Data) => {
      return pathSection && pointer.has(data, pathSection)
        ? pointer.get(data, pathSection)
        : data
    },
    [pathSection]
  )

  const getMountedData = useCallback((data: Data) => {
    const mounterData = {} as Data
    dataContextRef.current?.mountedFieldPathsRef.current.forEach(
      (path) => {
        if (pointer.has(data, path)) {
          pointer.set(mounterData, path, pointer.get(data, path))
        }
      }
    )
    return mounterData
  }, [])

  useEffect(() => {
    localDataRef.current = getMountedData(internalDataRef.current)
  }, [getMountedData])

  // Update the isolated data with the outside context data
  useMemo(() => {
    if (localDataRef.current === clearedData) {
      return // stop here
    }

    let localData = data ?? defaultData

    if (
      localData &&
      pathSection &&
      !pointer.has(localDataRef.current, pathSection)
    ) {
      localData = moveValueToPath<Data>(pathSection, localData)
    }

    internalDataRef.current = Object.assign(
      {},
      localData || dataOuter || {},
      localDataRef.current
    )
  }, [data, defaultData, pathSection, dataOuter, moveValueToPath])

  const onCommit: IsolationProps<Data>['onCommit'] = useCallback(
    async (data: Data, additionalArgs) => {
      const mountedData = getMountedData(data)
      const path = props.path ?? '/'
      const outerData =
        props.path && pointer.has(dataOuter, path)
          ? pointer.get(dataOuter, path)
          : dataOuter

      localDataRef.current = mountedData
      let isolatedData = structuredClone(mountedData) as Data

      if (typeof transformOnCommitProp === 'function') {
        isolatedData = transformOnCommitProp(isolatedData, outerData)
      }

      // Commit the internal data to the nested context data
      handlePathChangeOuter?.(
        path,
        extendDeep({}, outerData, isolatedData)
      )

      return await onCommitProp?.(
        removeSectionPath(isolatedData),
        additionalArgs
      )
    },
    [
      getMountedData,
      props.path,
      dataOuter,
      transformOnCommitProp,
      handlePathChangeOuter,
      onCommitProp,
      removeSectionPath,
    ]
  )

  const onClear = useCallback(() => {
    localDataRef.current = clearedData
    internalDataRef.current = clearedData as Data
    forceUpdate()
    onClearProp?.()
  }, [onClearProp])

  const providerProps: IsolationProps<Data> = {
    ...props,
    data: internalDataRef.current,
    defaultData: undefined,
    onPathChange: onPathChangeHandler,
    onCommit,
    onClear,
    isolate: true,
  }

  return (
    <Provider {...providerProps}>
      <Context.Consumer>
        {(dataContext) => {
          dataContextRef.current = dataContext

          if (commitHandleRef) {
            commitHandleRef.current = dataContext?.handleSubmit
          }

          return children
        }}
      </Context.Consumer>
    </Provider>
  )
}

IsolationProvider.CommitButton = IsolationCommitButton
IsolationProvider._supportsSpacingProps = undefined

export default IsolationProvider
