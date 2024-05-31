import React, {
  useRef,
  useMemo,
  useCallback,
  useReducer,
  useEffect,
  useContext,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { ValidateFunction } from 'ajv/dist/2020'
import {
  Ajv,
  makeAjvInstance,
  ajvErrorsToFormErrors,
} from '../../utils/ajv'
import {
  FormError,
  CustomErrorMessagesWithPaths,
  AllJSONSchemaVersions,
  FieldProps,
  SubmitState,
  Path,
  EventStateObject,
  OnSubmit,
  OnChange,
  EventReturnWithStateObject,
  ValueProps,
} from '../../types'
import { debounce } from '../../../../shared/helpers'
import FieldProvider from '../../Form/FieldProps'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../../../shared/helpers/useUpdateEffect'
import { isAsync } from '../../../../shared/helpers/isAsync'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import { ContextProps } from '../../../../shared/Context'
import useTranslation from '../../hooks/useTranslation'
import Context, {
  ContextState,
  EventListenerCall,
  FilterData,
  TransformData,
} from '../Context'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export interface Props<Data extends JsonObject> {
  /**
   * Unique ID to communicate with the hook Form.useData
   */
  id?: string
  /**
   * Unique ID to connect with a GlobalStatus
   */
  globalStatusId?: string
  /**
   * Default source data, only used if no other source is available, and not leading to updates if changed after mount
   */
  defaultData?: Data
  /**
   * Source data, will be used instead of defaultData, and leading to updates if changed after mount
   */
  data?: Data
  /**
   * JSON Schema to validate the data against.
   */
  schema?: AllJSONSchemaVersions<Data>
  /**
   * Custom Ajv instance, if you want to use your own
   */
  ajvInstance?: Ajv
  /**
   * Custom error messages for the whole data set
   */
  errorMessages?: CustomErrorMessagesWithPaths
  /**
   * Filter the `onSubmit` output data, based on your criteria: `({ path, value, data, props, internal }) => !props?.disabled`. It will iterate on each data entry (/path). Return false to exclude the entry.
   */
  filterSubmitData?: FilterData
  /**
   * @deprecated Use `filterSubmitData` instead
   */
  filterData?: FilterData
  /**
   * Transform the data context (internally as well) based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).
   */
  transformIn?: TransformData
  /**
   * Mutate the data before it enters onSubmit or onChange based on your criteria: `({ path, value, data, props, internal }) => 'new value'`. It will iterate on each data entry (/path).
   */
  transformOut?: TransformData
  /**
   * Change handler for the whole data set.
   * You can provide an async function to show an indicator on the current label during a field change.
   */
  onChange?: OnChange<Data>
  /**
   * Change handler for each value
   */
  onPathChange?: (
    path: Path,
    value: any
  ) =>
    | EventReturnWithStateObject
    | void
    | Promise<EventReturnWithStateObject | void>
  /**
   * Will emit on a form submit – if validation has passed.
   * You can provide an async function to shows a submit indicator during submit. All form elements will be disabled during the submit.
   */
  onSubmit?: OnSubmit<Data>
  /**
   * Submit was requested, but data was invalid
   */
  onSubmitRequest?: () => void
  /**
   * Will be called when the onSubmit is finished and had not errors
   */
  onSubmitComplete?: (
    data: Data,
    /**
     * The result of the onSubmit function
     */
    result: unknown
  ) =>
    | EventReturnWithStateObject
    | void
    | Promise<EventReturnWithStateObject | void>
  /**
   * Minimum time to display the submit indicator.
   */
  minimumAsyncBehaviorTime?: number
  /**
   * The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission.
   */
  asyncSubmitTimeout?: number
  /**
   * Scroll to top on submit
   */
  scrollTopOnSubmit?: boolean
  /**
   * Key for caching the data in session storage
   */
  sessionStorageId?: string
  /**
   * Locale to use for all nested Eufemia components
   */
  locale?: ContextProps['locale']
  /**
   * Provide your own translations. Use the same format as defined in the translation files
   */
  translations?: ContextProps['translations']
  /**
   * Make all fields required
   */
  required?: boolean

  children: React.ReactNode
}

const isArrayJsonPointer = /^\/\d+(\/|$)/

export default function Provider<Data extends JsonObject>(
  props: Props<Data>
) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  const {
    id,
    globalStatusId = 'main',
    defaultData,
    data,
    schema,
    onChange,
    onPathChange,
    onSubmit,
    onSubmitRequest,
    onSubmitComplete,
    scrollTopOnSubmit,
    minimumAsyncBehaviorTime,
    asyncSubmitTimeout,
    sessionStorageId,
    ajvInstance,
    transformIn,
    transformOut,
    filterSubmitData,
    filterData,
    locale,
    translations,
    required,
    errorMessages: contextErrorMessages,
    children,
    ...rest
  } = props

  // Prop error handling
  if (data !== undefined && sessionStorageId !== undefined) {
    throw new Error(
      'Use "defaultData" instead of "data" when using sessionStorageId'
    )
  }

  const nestedContext = useContext(Context)
  if (nestedContext?.hasContext) {
    throw new Error('DataContext (Form.Handler) can not be nested')
  }

  // - Locale
  const translation = useTranslation().Form

  // - Ajv
  const ajvRef = useRef<Ajv>(makeAjvInstance(ajvInstance))

  // - Paths
  const mountedFieldPathsRef = useRef<Path[]>([])

  // - Errors from provider validation (the whole data set)
  const errorsRef = useRef<Record<Path, FormError> | undefined>()
  const showAllErrorsRef = useRef<boolean>(false)
  const setShowAllErrors = useCallback((showAllErrors: boolean) => {
    showAllErrorsRef.current = showAllErrors
    forceUpdate()
  }, [])
  const submitStateRef = useRef<Partial<EventStateObject>>({})
  const setSubmitState = useCallback((state: EventStateObject) => {
    Object.assign(submitStateRef.current, state)
    forceUpdate()
  }, [])

  // - Progress
  const formStateRef = useRef<SubmitState>()
  const setFormState = useCallback((formState: SubmitState) => {
    formStateRef.current = formState
    forceUpdate()
  }, [])

  // - States (e.g. error) reported by fields, based on their direct validation rules
  const fieldErrorRef = useRef<Record<Path, Error>>({})
  const fieldStateRef = useRef<Record<Path, SubmitState>>({})

  // - Data
  const initialData = useMemo<Data>(() => {
    if (sessionStorageId && typeof window !== 'undefined') {
      const sessionDataJSON =
        window.sessionStorage?.getItem(sessionStorageId)
      if (sessionDataJSON) {
        return JSON.parse(sessionDataJSON)
      }
    }
    return data ?? defaultData
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Avoid triggering code that should only run initially
  }, [])
  const internalDataRef = useRef<Data>(initialData)

  // - Validator
  const ajvValidatorRef = useRef<ValidateFunction>()
  const executeAjvValidator = useCallback(() => {
    if (!ajvValidatorRef.current) {
      // No schema-based validator. Assume data is valid.
      return
    }

    if (!ajvValidatorRef.current?.(internalDataRef.current)) {
      // Errors found
      errorsRef.current = ajvErrorsToFormErrors(
        ajvValidatorRef.current.errors,
        internalDataRef.current
      )
    } else {
      errorsRef.current = undefined
    }
  }, [])
  const validateData = useCallback(() => {
    if (!ajvValidatorRef.current) {
      // No schema-based validator. Assume data is valid.
      return
    }

    executeAjvValidator()
    forceUpdate()
  }, [executeAjvValidator])

  // - Error handling
  const checkFieldStateFor = useCallback(
    (path: Path, state: SubmitState) => {
      return Boolean(
        state === 'error'
          ? errorsRef.current?.[path] instanceof Error ||
              fieldErrorRef.current[path] instanceof Error
          : fieldStateRef.current[path] === state
      )
    },
    []
  )
  const hasFieldState = useCallback(
    (state: SubmitState) => {
      return mountedFieldPathsRef.current.some((path) => {
        return checkFieldStateFor(path, state)
      })
    },
    [checkFieldStateFor]
  )
  const hasFieldError = useCallback(
    (path: Path) => {
      return mountedFieldPathsRef.current.some((p) => {
        return p === path && checkFieldStateFor(p, 'error')
      })
    },
    [checkFieldStateFor]
  )
  const hasErrors = useCallback(() => {
    return hasFieldState('error')
  }, [hasFieldState])

  /**
   * Sets the error state for a specific path
   */
  const setFieldError = useCallback(
    (path: Path, error: Error | FormError) => {
      fieldErrorRef.current[path] = error
    },
    []
  )

  /**
   * Sets the field state for a specific path
   */
  const setFieldState = useCallback(
    (path: Path, fieldState: SubmitState) => {
      if (fieldState !== fieldStateRef.current[path]) {
        // The state for the target value was changed
        fieldStateRef.current[path] = fieldState
        forceUpdate()
      }
    },
    []
  )

  /**
   * Mutate the data set based on the filterData function
   */
  const mutateDataHandler = useCallback(
    (data: Data, filter: FilterData | TransformData, remove = false) => {
      const mutate = (path: Path, result: boolean | unknown) => {
        if (remove) {
          if (result === false) {
            data = structuredClone(data)
            pointer.remove(data, path)
          }
        } else {
          if (typeof result !== 'undefined') {
            data = structuredClone(data)
            pointer.set(data, path, result)
          }
        }
      }

      if (typeof filter === 'function') {
        Object.entries(fieldPropsRef.current).forEach(([path, props]) => {
          const exists = pointer.has(data, path)
          if (exists) {
            const value = pointer.get(data, path)
            const internal = {
              error: fieldErrorRef.current?.[path],
            }
            const result = filter({
              path,
              value,
              data: internalDataRef.current,
              props,
              internal,
            })
            mutate(path, result)
          }
        })

        return data
      } else if (filter) {
        Object.entries(filter).forEach(([path, condition]) => {
          const exists = pointer.has(data, path)
          if (exists) {
            const value = pointer.get(data, path)
            const props = fieldPropsRef.current?.[path]
            const internal = { error: fieldErrorRef.current?.[path] }
            const result =
              typeof condition === 'function'
                ? condition({
                    value,
                    data: internalDataRef.current,
                    props,
                    internal,
                  })
                : condition
            mutate(path, result)
          }
        })
        return data
      }

      return data
    },
    []
  )

  /**
   * Filter the data set based on the filterData function
   */
  const filterDataHandler = useCallback(
    (data: Data, filter = filterData || filterSubmitData) => {
      if (filter) {
        return mutateDataHandler(data, filter, true)
      }

      return data
    },
    [filterData, filterSubmitData, mutateDataHandler]
  )

  const fieldPropsRef = useRef<Record<Path, FieldProps>>({})
  const valuePropsRef = useRef<Record<Path, ValueProps<unknown>>>({})
  const setFieldProps = useCallback(
    (path: Path, props: Record<string, unknown>) => {
      fieldPropsRef.current[path] = props
    },
    []
  )
  const setValueProps = useCallback(
    (path: Path, props: Record<string, unknown>) => {
      valuePropsRef.current[path] = props
    },
    []
  )
  const hasFieldWithAsyncValidator = useCallback(() => {
    for (const path in fieldPropsRef.current) {
      if (mountedFieldPathsRef.current.includes(path)) {
        const props = fieldPropsRef.current[path]
        if (isAsync(props.validator) || isAsync(props.onBlurValidator)) {
          return true
        }
      }
    }

    return false
  }, [])

  // - Shared state
  const sharedData = useSharedState<Data>(id)
  const sharedAttachments = useSharedState<{
    filterDataHandler?: Props<Data>['filterSubmitData']
    hasErrors?: ContextState['hasErrors']
    hasFieldError?: ContextState['hasFieldError']
    setShowAllErrors?: ContextState['setShowAllErrors']
    setSubmitState?: ContextState['setSubmitState']
    rerenderUseDataHook?: () => void
  }>(id + '-attachments')

  const setSharedData = sharedData.set
  const extendSharedData = sharedData.extend
  const extendAttachment = sharedAttachments.extend
  const rerenderUseDataHook = sharedAttachments.data?.rerenderUseDataHook

  const cacheRef = useRef({
    data,
    schema,
    shared: sharedData.data,
    hasUsedInitialData: false,
  })

  internalDataRef.current = useMemo(() => {
    // NB: "sharedData.data" is only available on a rerender.
    // Update the shared state, if initialData is given and no shared state is available.
    // We do almost the same later in a useLayoutEffect, but we need to do it here as well, so we set the data as early as possible.
    if (id && initialData && !sharedData.data) {
      sharedData.update(initialData)
    }

    // Merge both internal data and the shared state, if it both where given
    if (
      id &&
      initialData &&
      sharedData.data &&
      cacheRef.current.shared === sharedData.data &&
      internalDataRef.current === initialData
    ) {
      return {
        ...internalDataRef.current,
        ...sharedData.data,
      }
    }

    // Use shared state if no initial and initial data, and the shared state exists
    if (
      id &&
      !initialData &&
      !internalDataRef.current &&
      sharedData.data &&
      cacheRef.current.shared === sharedData.data
    ) {
      return sharedData.data
    }

    // Merge the internal data with the shared state, if the shared was updated and not the same as internal data
    if (
      id &&
      sharedData.data &&
      cacheRef.current.shared !== sharedData.data &&
      sharedData.data !== internalDataRef.current
    ) {
      cacheRef.current.shared = sharedData.data
      return {
        ...internalDataRef.current,
        ...sharedData.data,
      }
    }

    // When external data has changed, update the internal data
    if (data !== cacheRef.current.data) {
      cacheRef.current.data = data
      return data
    }

    return internalDataRef.current
  }, [data, id, initialData, sharedData])

  useLayoutEffect(() => {
    // Set the shared state, if initialData was given
    if (id && initialData && !sharedData.data) {
      extendSharedData?.(initialData)
    }
  }, [id, initialData, extendSharedData, sharedData.data])

  useMemo(() => {
    executeAjvValidator()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalDataRef.current]) // run validation when internal data has changed

  useLayoutEffect(() => {
    if (id) {
      extendAttachment?.({
        filterDataHandler,
        hasErrors,
        hasFieldError,
        setShowAllErrors,
        setSubmitState,
      })
      if (filterData || filterSubmitData) {
        rerenderUseDataHook?.()
      }
    }
  }, [
    extendAttachment,
    filterData,
    filterDataHandler,
    filterSubmitData,
    hasErrors,
    hasFieldError,
    id,
    rerenderUseDataHook,
    setShowAllErrors,
    setSubmitState,
  ])

  const storeInSession = useMemo(() => {
    return debounce(
      () => {
        window.sessionStorage?.setItem(
          sessionStorageId,
          JSON.stringify(internalDataRef.current)
        )
      },
      process.env.NODE_ENV === 'test' ? 1 : 800
    )
  }, [sessionStorageId])

  /**
   * Update the data set
   */
  const updateDataValue: ContextState['updateDataValue'] = useCallback(
    (path, value) => {
      if (!path) {
        return
      }

      const givenData = (
        path === '/'
          ? // When setting the root of the data, the whole data set should be the new value
            value
          : // For sub paths, use the the existing data set (or empty array/object), but modify it below (since pointer.set is not immutable)
            internalDataRef.current ??
            (path.match(isArrayJsonPointer) ? [] : {})
      ) as Data

      let newData: Data = null
      try {
        // Update the data even if it contains errors. Submit/SubmitRequest will be called accordingly
        newData = structuredClone(givenData)
      } catch (e) {
        newData = givenData
      }

      if (path !== '/') {
        pointer.set(newData, path, value)
      }

      // - Mutate the data context
      if (transformIn) {
        newData = mutateDataHandler(newData, transformIn)
      }

      internalDataRef.current = newData

      if (id) {
        // Will ensure that Form.getData() gets the correct data
        extendSharedData?.(newData)
        if (filterData || filterSubmitData) {
          rerenderUseDataHook?.()
        }
      }

      if (sessionStorageId && typeof window !== 'undefined') {
        storeInSession()
      }

      forceUpdate()
    },
    [
      extendSharedData,
      filterData,
      filterSubmitData,
      id,
      mutateDataHandler,
      rerenderUseDataHook,
      sessionStorageId,
      storeInSession,
      transformIn,
    ]
  )

  const setData = useCallback((newData: Data) => {
    internalDataRef.current = newData
    forceUpdate()
  }, [])

  /**
   * Update the data set on user interaction (unvalidated)
   */
  const handlePathChangeUnvalidated: ContextState['handlePathChange'] =
    useCallback(
      async (path, value) => {
        if (!path) {
          return null
        }

        updateDataValue(path, value)

        if (isAsync(onPathChange)) {
          await onPathChange?.(path, value)
        } else {
          onPathChange?.(path, value)
        }
      },
      [onPathChange, updateDataValue]
    )

  /**
   * Update the data set on user interaction
   */
  const handlePathChange: ContextState['handlePathChange'] = useCallback(
    async (path, value = '_undefined_') => {
      if (!path) {
        return null
      }

      if (value !== '_undefined_') {
        handlePathChangeUnvalidated(path, value)
      }

      showAllErrorsRef.current = false

      validateData()

      const data = internalDataRef.current as Data
      const transformedData = transformOut
        ? mutateDataHandler(data, transformOut)
        : data

      for (const cb of changeHandlerStackRef.current) {
        if (isAsync(onChange)) {
          await cb(transformedData)
        } else {
          cb(transformedData)
        }
      }

      if (isAsync(onChange)) {
        return await onChange(transformedData)
      }

      return onChange?.(transformedData)
    },
    [
      handlePathChangeUnvalidated,
      mutateDataHandler,
      onChange,
      transformOut,
      validateData,
    ]
  )

  const changeHandlerStackRef = useRef<Array<OnChange<Data>>>([])
  const addOnChangeHandler = useCallback(
    (callback: (data: unknown) => void) => {
      const exists = changeHandlerStackRef.current.some((cb) => {
        return callback === cb
      })
      if (!exists) {
        changeHandlerStackRef.current.push(callback)
      }
    },
    []
  )

  // - Mounted fields
  const handleMountField = useCallback((path: Path) => {
    mountedFieldPathsRef.current = addListPath(
      mountedFieldPathsRef.current,
      path
    )
  }, [])

  const handleUnMountField = useCallback((path: Path) => {
    mountedFieldPathsRef.current = removeListPath(
      mountedFieldPathsRef.current,
      path
    )
  }, [])

  // - Features
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window?.scrollTo?.({ top: 0, behavior: 'smooth' })
    }
  }, [])

  /**
   * Shared logic dedicated to submit the whole form
   */
  const handleSubmitCall = useCallback<ContextState['handleSubmitCall']>(
    async (args) => {
      const {
        onSubmit,
        enableAsyncBehaviour,
        skipFieldValidation,
        skipErrorCheck,
      } = args

      setSubmitState({ error: undefined })

      const asyncBehaviorIsEnabled =
        (skipErrorCheck
          ? true
          : // Don't enable async behaviour if we have errors, but when we have a pending state
            !hasErrors() || hasFieldState('pending')) &&
        (enableAsyncBehaviour || hasFieldWithAsyncValidator())

      if (asyncBehaviorIsEnabled) {
        setFormState('pending')
      }

      // Just call the submit listeners "once", and not on the retry/recall
      if (!skipFieldValidation) {
        for (const {
          path,
          type,
          callback,
        } of fieldEventListenersRef.current) {
          if (
            type === 'onSubmit' &&
            mountedFieldPathsRef.current.includes(path)
          ) {
            // Call all submit listener callbacks (e.g. to validate fields)
            if (asyncBehaviorIsEnabled) {
              await callback()
            } else {
              callback()
            }
          }
        }
      }

      if (
        !(skipErrorCheck ? false : hasErrors()) &&
        !hasFieldState('pending') &&
        (skipFieldValidation ? true : !hasFieldState('error'))
      ) {
        let result: EventStateObject | unknown

        try {
          result = await onSubmit()

          if (result instanceof Error) {
            throw result
          }
        } catch (error) {
          result = { error }
        }

        const state = result as EventStateObject

        if (asyncBehaviorIsEnabled) {
          setFormState(state?.error ? 'abort' : 'complete')
        }

        // Force the state to be set by a custom status
        if (state?.['status']) {
          setFormState(state?.['status'])
        }

        if (state?.error || state?.warning || state?.info) {
          setSubmitState(state)
        }
      } else {
        if (asyncBehaviorIsEnabled) {
          window.requestAnimationFrame(() => {
            setFormState(undefined)
          })

          if (!skipFieldValidation) {
            // Add a event listener to continue the submit after the pending state is resolved
            onSubmitContinueRef.current = () => {
              window.requestAnimationFrame(() => {
                // Do not call the validators again,
                // because we already did it in the first call
                // If they are async, we wait for them to finish anyway
                handleSubmitCall({ ...args, skipFieldValidation: true })
              })
            }
          }
        }

        onSubmitRequest?.()

        setShowAllErrors(true)
      }

      return internalDataRef.current
    },
    [
      setSubmitState,
      hasErrors,
      hasFieldWithAsyncValidator,
      hasFieldState,
      setFormState,
      onSubmitRequest,
      setShowAllErrors,
    ]
  )

  /**
   * Request to submit the whole form
   */
  const handleSubmit = useCallback<ContextState['handleSubmit']>(
    async ({ formElement = null } = {}) => {
      handleSubmitCall({
        enableAsyncBehaviour: isAsync(onSubmit),
        onSubmit: async () => {
          // - Mutate the data context
          const data = internalDataRef.current
          const filteredData = filterDataHandler(
            transformOut ? mutateDataHandler(data, transformOut) : data
          )
          const opts = {
            resetForm: () => {
              formElement?.reset?.()

              if (typeof window !== 'undefined') {
                if (sessionStorageId) {
                  window.sessionStorage.removeItem(sessionStorageId)
                }
              }

              forceUpdate() // in order to fill "empty fields" again with their internal states
            },
            clearData: () => {
              internalDataRef.current = {} as Data
              if (id) {
                setSharedData?.({} as Data)
              } else {
                forceUpdate()
              }
            },
          }

          let result = undefined

          if (isAsync(onSubmit)) {
            result = await onSubmit(filteredData, opts)
          } else {
            result = onSubmit?.(filteredData, opts)
          }

          const completeResult = await onSubmitComplete?.(
            filteredData,
            result
          )
          if (completeResult) {
            result =
              Object.keys(result).length > 0
                ? { ...result, ...completeResult }
                : completeResult
          }

          if (scrollTopOnSubmit) {
            scrollToTop()
          }

          return result
        },
      })
    },
    [
      filterDataHandler,
      handleSubmitCall,
      id,
      mutateDataHandler,
      onSubmit,
      onSubmitComplete,
      scrollToTop,
      scrollTopOnSubmit,
      sessionStorageId,
      setSharedData,
      transformOut,
    ]
  )

  // Collect listeners to be called during form submit
  const fieldEventListenersRef = useRef<Array<EventListenerCall>>([])
  const setFieldEventListener = useCallback(
    (
      path: EventListenerCall['path'],
      type: EventListenerCall['type'],
      callback: EventListenerCall['callback']
    ) => {
      fieldEventListenersRef.current =
        fieldEventListenersRef.current.filter(({ path: p, type: t }) => {
          return !(p === path && t === type)
        })
      fieldEventListenersRef.current.push({ path, type, callback })
    },
    []
  )

  // Handle unresolved field states during async submit
  const onSubmitContinueRef = useRef<() => void>(null)
  if (!hasFieldState('pending')) {
    onSubmitContinueRef.current?.()
    onSubmitContinueRef.current = null
  }

  // - ajv validator routines
  useMountEffect(() => {
    if (schema) {
      ajvValidatorRef.current = ajvRef.current?.compile(schema)
    }

    // Validate the initial data
    validateData()
  })
  useUpdateEffect(() => {
    if (schema && schema !== cacheRef.current.schema) {
      cacheRef.current.schema = schema
      ajvValidatorRef.current = ajvRef.current?.compile(schema)

      validateData()
      forceUpdate()
    }
  }, [schema, validateData, forceUpdate])

  const onTimeout = useCallback(() => {
    setFormState(undefined)
    setSubmitState({
      info: undefined,
      warning: undefined,
      error: undefined,
    })
  }, [setFormState, setSubmitState])

  const { bufferedFormState: formState } = useFormStatusBuffer({
    formState: formStateRef.current,
    waitFor: hasFieldState('pending'),
    minimumAsyncBehaviorTime,
    asyncSubmitTimeout,
    onTimeout,
  })

  const submitState = submitStateRef.current
  const disabled =
    typeof rest?.['disabled'] === 'boolean'
      ? rest?.['disabled']
      : (formState === 'pending') === true
      ? true
      : undefined

  return (
    <Context.Provider
      value={{
        /** Method */
        handlePathChange,
        handlePathChangeUnvalidated,
        handleSubmit,
        handleMountField,
        handleUnMountField,
        handleSubmitCall,
        setFormState,
        setSubmitState,
        setShowAllErrors,
        setFieldEventListener,
        setFieldState,
        setFieldError,
        setFieldProps,
        setValueProps,
        hasErrors,
        hasFieldError,
        hasFieldState,
        validateData,
        updateDataValue,
        setData,
        filterDataHandler,
        addOnChangeHandler,
        scrollToTop,

        /** State handling */
        schema,
        disabled,
        required,
        formState,
        submitState,
        contextErrorMessages,
        hasContext: true,
        errors: errorsRef.current,
        showAllErrors: showAllErrorsRef.current,
        fieldPropsRef,
        valuePropsRef,
        ajvInstance: ajvRef.current,

        /** Additional */
        id,
        data: internalDataRef.current,
        props,
        ...rest,
      }}
    >
      <FieldProvider
        FormStatus={
          globalStatusId
            ? {
                globalStatus: {
                  id: globalStatusId,
                  title: translation.errorSummaryTitle,
                  show: showAllErrorsRef.current,
                },
              }
            : undefined
        }
        formElement={disabled ? { disabled: true } : undefined}
        locale={locale ? locale : undefined}
        translations={translations ? translations : undefined}
      >
        {children}
      </FieldProvider>
    </Context.Provider>
  )
}

type PathList = string[]

export function addListPath(paths: PathList, path: Path): PathList {
  return paths.includes(path) ? paths : paths.concat(path)
}

export function removeListPath(paths: PathList, path: Path): PathList {
  return paths.filter((thisPath) => thisPath !== path)
}

type FormStatusBufferProps = {
  minimumAsyncBehaviorTime?: Props<unknown>['minimumAsyncBehaviorTime']
  asyncSubmitTimeout?: Props<unknown>['asyncSubmitTimeout']
  formState: ContextState['formState']
  waitFor: boolean
  onTimeout: () => void
}

function useFormStatusBuffer(props: FormStatusBufferProps) {
  const {
    formState,
    waitFor,
    minimumAsyncBehaviorTime,
    asyncSubmitTimeout,
    onTimeout,
  } = props || {}

  const [, forceUpdate] = useReducer(() => ({}), {})
  const stateRef = useRef<SubmitState>()
  const nowRef = useRef<number | null>(null)
  const timeoutRef = useRef<{
    complete?: NodeJS.Timeout | null
    reset?: NodeJS.Timeout | null
    timeout?: NodeJS.Timeout | null
  }>({})

  const setState = useCallback(
    (state: SubmitState) => {
      stateRef.current = state
      forceUpdate()
    },
    [forceUpdate]
  )

  const clear = useCallback(() => {
    for (const key in timeoutRef.current) {
      clearTimeout(timeoutRef.current[key])
    }
  }, [])

  const hadCompleteRef = useRef(false)
  const activeElementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // This offset is used to calculate the delay,
    // which ensures that the form state is displayed for at least minimumAsyncBehaviorTime duration.
    // If the form was 'pending' for less than minimumAsyncBehaviorTime,
    // the delay will be the remaining time to reach minimumAsyncBehaviorTime.
    const isTest = process.env.NODE_ENV === 'test'
    const minimum =
      minimumAsyncBehaviorTime ??
      // make it testable
      (isTest ? 1 : 1000)

    if (stateRef.current && formState === 'error') {
      clear()
      setState(undefined)
      return
    }

    if (formState === 'abort') {
      clear()
      setState('abort')

      timeoutRef.current.reset = setTimeout(() => {
        nowRef.current = 0
        setState(undefined)
      }, minimum)
      return
    }

    if (formState === 'complete') {
      hadCompleteRef.current = true
    }

    if (formState === 'pending' && stateRef.current !== 'pending') {
      activeElementRef.current = document.activeElement as HTMLElement
      clear()
      nowRef.current = Date.now()
      hadCompleteRef.current = false
      setState('pending')
    } else if (stateRef.current === 'pending') {
      const offset = Math.max(Date.now() - nowRef.current)
      const delay = isTest ? minimum : Math.max(minimum - offset, 0)

      if (!waitFor) {
        timeoutRef.current.complete = setTimeout(() => {
          if (hadCompleteRef.current) {
            setState('complete')
          }
          window.requestAnimationFrame(() => {
            activeElementRef.current?.focus?.()
          })
        }, delay)

        timeoutRef.current.reset = setTimeout(() => {
          nowRef.current = 0
          setState(undefined)
          clear()
        }, delay + minimum)
      }
    }

    if (stateRef.current === 'pending') {
      timeoutRef.current.timeout = setTimeout(() => {
        clear()
        setState(undefined)
        onTimeout?.()
      }, asyncSubmitTimeout ?? 30000)
    }

    return clear
  }, [
    clear,
    minimumAsyncBehaviorTime,
    formState,
    setState,
    waitFor,
    asyncSubmitTimeout,
    onTimeout,
  ])

  return { bufferedFormState: stateRef.current }
}
