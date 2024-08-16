import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { extendDeep } from '../../../../shared/component-helper'
import { Context, Provider } from '../../DataContext'
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
  const outerContext = useContext(Context)
  const { path: pathSection } = useContext(SectionContext) || {}
  const { handlePathChange: handlePathChangeOuter, data: dataOuter } =
    outerContext || {}

  const onPathChangeHandler = useCallback(
    async (path: Path, value: unknown) => {
      if (localDataRef.current === clearedData) {
        localDataRef.current = {}
      }
      pointer.set(localDataRef.current, path, value)

      return await onPathChange?.(path, value)
    },
    [onPathChange]
  )

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
      const obj = {} as Data
      pointer.set(obj, pathSection, localData)
      localData = obj
    }

    internalDataRef.current = extendDeep(
      {},
      dataOuter,
      localData || {},
      localDataRef.current
    ) as Data
  }, [data, defaultData, dataOuter, pathSection])

  const onCommit: IsolationProps<Data>['onCommit'] = useCallback(
    async (data: Data, additionalArgs) => {
      const path = props.path ?? '/'
      const outerData =
        props.path && pointer.has(dataOuter, path)
          ? pointer.get(dataOuter, path)
          : dataOuter
      let isolatedData = structuredClone(localDataRef.current) as Data

      if (typeof transformOnCommitProp === 'function') {
        isolatedData = transformOnCommitProp(isolatedData, outerData)
      }

      // Commit the internal data to the nested context data
      handlePathChangeOuter?.(
        path,
        extendDeep({}, outerData, isolatedData)
      )

      return await onCommitProp?.(isolatedData, additionalArgs)
    },
    [
      handlePathChangeOuter,
      onCommitProp,
      dataOuter,
      props.path,
      transformOnCommitProp,
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
