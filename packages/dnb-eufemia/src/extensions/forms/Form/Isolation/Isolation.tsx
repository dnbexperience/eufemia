import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import pointer, { JsonObject } from '../../utils/json-pointer'
import { extendDeep } from '../../../../shared/component-helper'
import { isAsync } from '../../../../shared/helpers/isAsync'
import useId from '../../../../shared/helpers/useId'
import useDataValue from '../../hooks/useDataValue'
import {
  Context as DataContext,
  ContextState,
  Provider,
} from '../../DataContext'
import SectionContext from '../Section/SectionContext'
import IsolationCommitButton from './IsolationCommitButton'
import {
  clearedData,
  type Props as ProviderProps,
} from '../../DataContext/Provider'
import type { OnCommit, Path } from '../../types'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So it's a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export type IsolationProviderProps<Data extends JsonObject> = {
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
  transformOnCommit?: (isolatedData: Data, handlerData: Data) => JsonObject
  /**
   * Prevent the form from being submitted when there are fields with errors inside the Form.Isolation.
   */
  bubbleValidation?: boolean
  /**
   * Used internally by the Form.Isolation component
   */
  path?: Path
  /**
   * Used internally by the Form.Isolation component
   */
  isolate?: boolean
}

export type IsolationProps<Data extends JsonObject> = Omit<
  ProviderProps<Data>,
  | 'onSubmit'
  | 'onSubmitRequest'
  | 'onSubmitComplete'
  | 'minimumAsyncBehaviorTime'
  | 'asyncSubmitTimeout'
  | 'scrollTopOnSubmit'
  | 'sessionStorageId'
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
    bubbleValidation,
    data,
    defaultData,
  } = props

  const [, forceUpdate] = useReducer(() => ({}), {})
  const internalDataRef = useRef<Data>()
  const localDataRef = useRef<Partial<Data>>({})
  const dataContextRef = useRef<ContextState>(null)
  const outerContext = useContext(DataContext)
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
    for (const path in dataContextRef.current?.mountedFieldsRef.current) {
      const field = dataContextRef.current.mountedFieldsRef.current[path]
      if (field.isMounted && pointer.has(data, path)) {
        pointer.set(mounterData, path, pointer.get(data, path))
      }
    }
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
      let isolatedData = structuredClone(mountedData)

      if (typeof transformOnCommitProp === 'function') {
        isolatedData = transformOnCommitProp(isolatedData, outerData)
      }

      let stop = false
      additionalArgs.preventCommit = () => (stop = true)

      const commitData = removeSectionPath(isolatedData)
      const result = isAsync(onCommitProp)
        ? await onCommitProp?.(commitData, additionalArgs)
        : onCommitProp?.(commitData, additionalArgs)

      if (stop) {
        return // stop here
      }

      // Commit the internal data to the nested context data
      await handlePathChangeOuter?.(
        path,
        Array.isArray(isolatedData)
          ? isolatedData
          : extendDeep({}, outerData, isolatedData)
      )

      return result
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
    [defaultData ? 'defaultData' : 'data']: internalDataRef.current,
    onPathChange: onPathChangeHandler,
    onCommit,
    onClear,
    isolate: true,
  }

  return (
    <Provider {...providerProps}>
      <DataContext.Consumer>
        {(dataContext) => {
          dataContextRef.current = dataContext

          if (commitHandleRef) {
            commitHandleRef.current = dataContext?.handleSubmit
          }

          return children
        }}
      </DataContext.Consumer>

      {bubbleValidation && (
        <BubbleValidation outerContext={outerContext} />
      )}
    </Provider>
  )
}

function BubbleValidation({ outerContext }) {
  const { setMountedFieldState, setFieldError } = outerContext || {}
  const dataContext = useContext(DataContext)

  const id = useId()
  useEffect(() => {
    const path = `/${id}`
    const errors = dataContext.hasErrors()
    if (errors) {
      setMountedFieldState?.(path, {
        isMounted: true,
      })
    }
    setFieldError?.(path, errors ? new Error('Form.Isolation') : undefined)
  }, [dataContext, id, setFieldError, setMountedFieldState])

  return null
}

IsolationProvider.CommitButton = IsolationCommitButton
IsolationProvider._supportsSpacingProps = undefined

export default IsolationProvider
