import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import type { JsonObject } from '../../utils/json-pointer'
import pointer from '../../utils/json-pointer'
import { isZodSchema } from '../../utils/zod'
import { extractZodSubSchema } from './extractZodSubSchema'
import { extendDeep } from '../../../../shared/component-helper'
import { isAsync } from '../../../../shared/helpers/isAsync'
import useDataValue from '../../hooks/useDataValue'
import type { ContextState } from '../../DataContext'
import { Context as DataContext, Provider } from '../../DataContext'
import SectionContext from '../Section/SectionContext'
import useReportError from './useReportError'
import IsolationCommitButton from './IsolationCommitButton'
import IsolationResetButton from './IsolationResetButton'
import {
  clearedData,
  type Props as ProviderProps,
} from '../../DataContext/Provider'
import type { IsolationDataReference } from './IsolationDataReference'
import { createDataReference } from './IsolationDataReference'
import IsolatedContainer, { isolationError } from './IsolatedContainer'
import IsolationContext from './IsolationContext'
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
   * Prevents uncommitted changes before the form is submitted. Will display an error message if user tries to submit without committing their changes.
   */
  preventUncommittedChanges?: boolean
  /**
   * If set to `true`, the Form.Isolation will reset its data context after committing the data to the outer context.
   */
  resetDataAfterCommit?: boolean
  /**
   * Provide a reference by using Form.Isolation.createDataReference.
   */
  dataReference?: IsolationDataReference
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
  const [dataReferenceFallback] = useState<IsolationDataReference>(() => {
    if (!props?.dataReference) {
      return createDataReference()
    }
  })

  const {
    children,
    onPathChange,
    onCommit: onCommitProp,
    onClear: onClearProp,
    transformOnCommit: transformOnCommitProp,
    commitHandleRef,
    bubbleValidation,
    preventUncommittedChanges,
    data,
    defaultData,
    dataReference = dataReferenceFallback,
    resetDataAfterCommit,
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

      // Depending on the usage, we can get a path like so: "/pushContainerItems/0/somePath"
      // where "somePath" is a frozen object. In order to still be able to modify it,
      // pointer.set will unfreeze the object and then modify it. (Object.isFrozen(obj[tok]))

      pointer.set(localDataRef.current, path, value)

      if (pathSection) {
        path = path.replace(pathSection, '')
      }

      return await onPathChange?.(path, value)
    },
    [onPathChange, pathSection]
  )

  const onUpdateDataValueHandler = useCallback(
    async (
      path: Path,
      value: unknown,
      { preventUpdate = undefined } = {}
    ) => {
      if (internalDataRef.current === clearedData) {
        internalDataRef.current = {} as Data
      }

      pointer.set(internalDataRef.current, path, value)

      if (!preventUpdate) {
        forceUpdate()
      }
    },
    []
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
    dataContextRef.current?.mountedFieldsRef.current.forEach(
      (field, path) => {
        if (field.isMounted && pointer.has(data, path)) {
          pointer.set(mounterData, path, pointer.get(data, path))
        }
      }
    )
    return mounterData
  }, [])

  useMountEffect(() => {
    localDataRef.current = getMountedData(internalDataRef.current)
  })

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
      localData || structuredClone(dataOuter) || {},
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

  const setIsolatedData = useCallback((data: Data) => {
    localDataRef.current = data
    internalDataRef.current = data
  }, [])

  const onClear = useCallback(() => {
    setIsolatedData(clearedData as Data)
    forceUpdate()
    onClearProp?.()
  }, [onClearProp, setIsolatedData])

  const providerProps: IsolationProps<Data> = {
    ...props,
    [defaultData ? 'defaultData' : 'data']: internalDataRef.current,
    onUpdateDataValue: onUpdateDataValueHandler,
    onPathChange: onPathChangeHandler,
    onCommit,
    onClear,
    isolate: true,

    // Inherit schema and ajvInstance from parent context
    schema: props?.schema || outerContext?.props?.schema,
    ajvInstance: props?.ajvInstance || outerContext?.props?.ajvInstance,
  }

  if (
    props?.path &&
    props?.path !== '/' &&
    !props?.schema &&
    outerContext?.props?.schema
  ) {
    if (isZodSchema(outerContext.props.schema)) {
      providerProps.schema = extractZodSubSchema(
        outerContext.props.schema,
        props.path
      )
    } else {
      providerProps.schema = {
        $defs: { root: outerContext.props.schema },
        $ref: `#/$defs/root${props.path.split('/').join('/properties/')}`,
      }
    }
  }

  return (
    <Provider {...providerProps}>
      <IsolationContext.Provider
        value={{
          preventUncommittedChanges,
          dataReference,
          resetDataAfterCommit,
          outerContext,
          setIsolatedData,
        }}
      >
        <DataContext.Consumer>
          {(dataContext) => {
            dataContextRef.current = dataContext

            if (commitHandleRef) {
              commitHandleRef.current = dataContext?.handleSubmit
            }

            return <IsolatedContainer>{children} </IsolatedContainer>
          }}
        </DataContext.Consumer>

        {bubbleValidation && <BubbleValidation />}
      </IsolationContext.Provider>
    </Provider>
  )
}

function BubbleValidation() {
  const innerContext = useContext(DataContext)
  const { outerContext } = useContext(IsolationContext)
  const { setShowAllErrors } = innerContext

  const setShowAllErrorsNested = useCallback(
    (showAllErrors: boolean) => {
      setShowAllErrors?.(showAllErrors)
    },
    [setShowAllErrors]
  )

  const { addSetShowAllErrorsRef } = outerContext || {}
  if (!addSetShowAllErrorsRef?.current?.includes(setShowAllErrorsNested)) {
    addSetShowAllErrorsRef?.current.push(setShowAllErrorsNested)
  }

  useReportError(
    innerContext.hasErrors() ? isolationError : undefined,
    outerContext,
    'isolation'
  )

  return null
}

IsolationProvider.CommitButton = IsolationCommitButton
IsolationProvider.ResetButton = IsolationResetButton
IsolationProvider.createDataReference = createDataReference
IsolationProvider._supportsSpacingProps = undefined

export default IsolationProvider
