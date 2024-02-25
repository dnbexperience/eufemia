import React, {
  useRef,
  useMemo,
  useCallback,
  useReducer,
  useEffect,
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
  OnSubmitReturn,
} from '../../types'
import SharedProvider from '../../../../shared/Provider'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../../../shared/helpers/useUpdateEffect'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import { isAsync } from '../../../../shared/helpers/isAsync'
import Context, { ContextState, EventListenerCall } from '../Context'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type UpdateDataValue = (path: Path, data: unknown) => void

export type FilterDataHandler<Data> = (
  data: Data,
  filter: FilterData
) => Partial<Data>
export type FilterData = (
  path: Path,
  value: any,
  props: FieldProps
) => boolean | undefined

export type OnSubmitParams = {
  /** Will remove browser-side stored autocomplete data  */
  resetForm: () => void
  /** Will empty the whole internal data set of the form  */
  clearData: () => void
}

export type OnSubmit<Data = JsonObject> = (
  data: Partial<Data>,
  { resetForm, clearData }: OnSubmitParams
) => OnSubmitReturn

export interface Props<Data extends JsonObject> {
  /**
   * Unique ID to communicate with the hook Form.useData
   */
  id?: string
  /**
   * Default source data, only used if no other source is available, and not leading to updates if changed after mount
   */
  defaultData?: Partial<Data>
  /**
   * Source data, will be used instead of defaultData, and leading to updates if changed after mount
   */
  data?: Partial<Data>
  /**
   * JSON Schema to validate the data against.
   */
  schema?: AllJSONSchemaVersions
  /**
   * Custom Ajv instance, if you want to use your own
   */
  ajvInstance?: Ajv
  /**
   * Custom error messages for the whole data set
   */
  errorMessages?: CustomErrorMessagesWithPaths
  /**
   * Filter the internal data context based on your criteria: `(path, value, props) => !props?.disabled`. It will iterate on each data entry.
   */
  filterData?: FilterData
  /**
   * Change handler for the whole data set
   */
  onChange?: (data: Data) => void
  /**
   * Change handler for each value
   */
  onPathChange?: (path: Path, value: any) => void
  /**
   * Submit called, data was valid (if validation available)
   */
  onSubmit?: OnSubmit
  /**
   * Submit was requested, but data was invalid
   */
  onSubmitRequest?: () => void
  /**
   * Will be called when the onSubmit is finished and had not errors
   */
  onSubmitComplete?: (data: Data, result: Error | unknown) => void
  /**
   * Show submit indicator during submit. All form elements will be disabled during the submit.
   */
  enableAsyncBehavior?: boolean
  /**
   * Minimum time to display the submit indicator.
   */
  minimumAsyncBehaviorTime?: number
  /**
   * The maximum time to display the submit indicator before it changes back to normal. In case something went wrong during submission.
   */
  asyncBehaviorTimeout?: number
  /**
   * Scroll to top on submit
   */
  scrollTopOnSubmit?: boolean
  /**
   * Key for caching the data in session storage
   */
  sessionStorageId?: string
  children: React.ReactNode
}

const isArrayJsonPointer = /^\/\d+(\/|$)/

export default function Provider<Data extends JsonObject>({
  id,
  defaultData,
  data,
  schema,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  onSubmitComplete,
  scrollTopOnSubmit,
  enableAsyncBehavior,
  minimumAsyncBehaviorTime,
  asyncBehaviorTimeout,
  sessionStorageId,
  ajvInstance,
  filterData,
  errorMessages: contextErrorMessages,
  children,
  ...rest
}: Props<Data>) {
  const [, forceUpdate] = useReducer(() => ({}), {})

  // Prop error handling
  if (data !== undefined && sessionStorageId !== undefined) {
    console.error(
      'Providing both data and sessionStorageId could lead to competing data sources. To provide default data to use only before anything is changed in the interface, use defaultData.'
    )
  }

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
  const submitErrorRef = useRef<FormError | undefined>()
  const setSubmitError = useCallback((error: FormError) => {
    submitErrorRef.current = error
    forceUpdate()
  }, [])

  // - Progress
  const formStateRef = useRef<SubmitState>()
  const setFormState = useCallback((formState: SubmitState) => {
    formStateRef.current = formState
    forceUpdate()
  }, [])

  // - States (e.g. error) reported by fields, based on their direct validation rules
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
  const internalDataRef = useRef<Partial<Data>>(initialData)

  // - Validator
  const ajvValidatorRef = useRef<ValidateFunction>()
  const validateDataNow = useCallback(() => {
    if (!ajvValidatorRef.current) {
      // No schema-based validator. Assume data is valid.
      return
    }

    if (!ajvValidatorRef.current?.(internalDataRef.current)) {
      // Errors found
      errorsRef.current = ajvErrorsToFormErrors(
        ajvValidatorRef.current.errors
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

    validateDataNow()
    forceUpdate()
  }, [validateDataNow])

  // - Error handling
  const checkFieldStateFor = useCallback(
    (path: Path, state: SubmitState = 'error') => {
      return Boolean(
        (state === 'error' &&
          errorsRef.current?.[path] instanceof Error) ||
          fieldStateRef.current[path] === state
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
  const hasErrors = useCallback(() => {
    return hasFieldState('error')
  }, [hasFieldState])

  /**
   * Sets the error state for a specific path
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
   * Filter the data set based on the filterData function
   */
  const filterDataHandler = useCallback(
    (data: Data, filter = filterData) => {
      if (filter) {
        const filtered = { ...data }
        Object.entries(fieldPropsRef.current).forEach(([path, props]) => {
          const exists = pointer.has(data, path)
          const result = filter(
            path,
            exists ? pointer.get(data, path) : undefined,
            props
          )
          if (result === false && exists) {
            pointer.remove(filtered, path)
          }
        })

        return filtered
      }

      return data
    },
    [filterData]
  )
  const fieldPropsRef = useRef<Record<Path, FieldProps>>({})
  const setProps = useCallback(
    (path: Path, props: Record<string, unknown>) => {
      fieldPropsRef.current[path] = props
    },
    []
  )

  // - Shared state
  const sharedData = useSharedState<Data>(id)
  const sharedAttachments = useSharedState<{
    filterDataHandler?: Props<Data>['filterData']
    hasErrors?: ContextState['hasErrors']
    setShowAllErrors?: ContextState['setShowAllErrors']
    rerenderUseDataHook?: () => void
  }>(id + '-attachments')

  const updateSharedData = sharedData.update
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
    validateDataNow()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalDataRef.current]) // run validation when internal data has changed

  useLayoutEffect(() => {
    if (id) {
      extendAttachment?.({
        filterDataHandler,
        hasErrors,
        setShowAllErrors,
      })
      if (filterData) {
        rerenderUseDataHook?.()
      }
    }
  }, [
    extendAttachment,
    filterData,
    filterDataHandler,
    hasErrors,
    id,
    rerenderUseDataHook,
    setShowAllErrors,
  ])

  /**
   * Update the data set
   */
  const updateDataValue: UpdateDataValue = useCallback(
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

      if (id) {
        updateSharedData?.(newData)
        if (filterData) {
          rerenderUseDataHook?.()
        }
      }

      internalDataRef.current = newData

      if (sessionStorageId && typeof window !== 'undefined') {
        window.sessionStorage?.setItem(
          sessionStorageId,
          JSON.stringify(newData)
        )
      }

      forceUpdate()

      return newData
    },
    [
      filterData,
      id,
      sessionStorageId,
      rerenderUseDataHook,
      updateSharedData,
    ]
  )

  /**
   * Update the data set on user interaction
   */
  const handlePathChange: UpdateDataValue = useCallback(
    (path, value) => {
      if (!path) {
        return
      }

      onPathChange?.(path, value)

      const newData = updateDataValue(path, value)

      onChange?.(newData as Data)

      showAllErrorsRef.current = false

      validateData()
    },
    [onPathChange, updateDataValue, onChange, validateData]
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
    if (fieldPropsRef.current?.[path]) {
      delete fieldPropsRef.current[path]
    }
  }, [])

  // - Features
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window?.scrollTo?.({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const onSubmitContinueRef = useRef<() => void>(null)

  /**
   * Shared logic dedicated to submit the whole form
   */
  const handleSubmitCall = useCallback<ContextState['handleSubmitCall']>(
    async ({
      originalHandler,
      onSubmit,
      omitSubmitCall,
      omitCheckErrors,
    }) => {
      setSubmitError(undefined)

      const hasError = omitCheckErrors ? false : hasErrors()

      // Just call the submit listeners "once", and not on the retry/recall
      if (!omitSubmitCall) {
        // Call all submit listeners callbacks (e.g. to validate fields)
        eventListenersRef.current.forEach(({ path, type, callback }) => {
          if (
            type === 'onSubmit' &&
            mountedFieldPathsRef.current.includes(path)
          ) {
            callback({ hasError })
          }
        })
      }

      const asyncBehaviorIsEnabled =
        enableAsyncBehavior ??
        (isAsync(originalHandler) || hasFieldState('pending'))

      if (asyncBehaviorIsEnabled) {
        setFormState('pending')
      }

      if (!hasError && !hasFieldState('pending')) {
        let result: OnSubmitReturn

        try {
          result = await onSubmit({ asyncBehaviorIsEnabled })

          if (result instanceof Error) {
            throw result
          }
        } catch (error) {
          setSubmitError(error)
          setFormState('error')
        }

        if (asyncBehaviorIsEnabled && !submitErrorRef.current) {
          setFormState('complete')
        }
      } else {
        if (asyncBehaviorIsEnabled) {
          window.requestAnimationFrame(() => {
            setFormState(undefined)
          })
        }

        if (!omitSubmitCall) {
          // Add a event listener to continue the submit after the pending state is resolved
          onSubmitContinueRef.current = () => {
            window.requestAnimationFrame(() => {
              handleSubmitCall({
                originalHandler,
                onSubmit,
                omitSubmitCall: true,
              })
            })
          }
        }

        onSubmitRequest?.()

        setShowAllErrors(true)
      }

      return internalDataRef.current
    },
    [
      setSubmitError,
      hasErrors,
      hasFieldState,
      enableAsyncBehavior,
      setFormState,
      setShowAllErrors,
      onSubmitRequest,
    ]
  )

  /**
   * Request to submit the whole form
   */
  const handleSubmit = useCallback<ContextState['handleSubmit']>(
    async ({ formElement = null } = {}) => {
      handleSubmitCall({
        originalHandler: onSubmit,
        onSubmit: async () => {
          const args = filterDataHandler(internalDataRef.current as Data)
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
              internalDataRef.current = {}
              forceUpdate()
            },
          }

          const result = await onSubmit(args, opts)

          onSubmitComplete?.(args, result)

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
      onSubmit,
      onSubmitComplete,
      scrollToTop,
      scrollTopOnSubmit,
      sessionStorageId,
    ]
  )

  // Collect listeners to be called during form submit
  const eventListenersRef = useRef<Array<EventListenerCall>>([])
  const setEventListener = useCallback(
    (
      path: EventListenerCall['path'],
      type: EventListenerCall['type'],
      callback: EventListenerCall['callback']
    ) => {
      if (
        !eventListenersRef.current.some(
          ({ path: p, callback: c }) => p === path && c === callback
        )
      ) {
        eventListenersRef.current.push({ path, type, callback })
      }
    },
    []
  )

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

  if (onSubmitContinueRef.current && !hasFieldState('pending')) {
    onSubmitContinueRef.current?.()
    onSubmitContinueRef.current = null
  }

  const { bufferedFormState: formState } = useFormStatusBuffer({
    formState: formStateRef.current,
    waitFor: hasFieldState('pending'),
    minimumAsyncBehaviorTime,
    asyncBehaviorTimeout,
  })

  const submitError = submitErrorRef.current
  const disabled = rest?.['disabled'] ?? formState === 'pending'

  return (
    <Context.Provider
      value={{
        /** Method */
        handlePathChange,
        handleSubmit,
        handleMountField,
        handleUnMountField,
        handleSubmitCall,
        setFormState,
        setShowAllErrors,
        setEventListener,
        setFieldState,
        setProps,
        hasErrors,
        hasFieldState,
        checkFieldStateFor,
        validateData,
        updateDataValue,
        scrollToTop,

        /** State handling */
        schema,
        disabled,
        formState,
        submitError,
        contextErrorMessages,
        hasContext: true,
        errors: errorsRef.current,
        showAllErrors: showAllErrorsRef.current,
        mountedFieldPaths: mountedFieldPathsRef.current,
        ajvInstance: ajvRef.current,

        data: internalDataRef.current,
        ...rest,
      }}
    >
      <SharedProvider formElement={{ disabled }}>
        {children}
      </SharedProvider>
    </Context.Provider>
  )
}

type PathList = string[]

function addListPath(paths: PathList, path: Path): PathList {
  return paths.includes(path) ? paths : paths.concat(path)
}

function removeListPath(paths: PathList, path: Path): PathList {
  return paths.filter((thisPath) => thisPath !== path)
}

type FormStatusBufferProps = {
  minimumAsyncBehaviorTime?: Props<unknown>['minimumAsyncBehaviorTime']
  asyncBehaviorTimeout?: Props<unknown>['asyncBehaviorTimeout']
  formState: ContextState['formState']
  waitFor: boolean
}

function useFormStatusBuffer(props: FormStatusBufferProps) {
  const {
    formState,
    waitFor,
    minimumAsyncBehaviorTime,
    asyncBehaviorTimeout,
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

    if (formState === 'pending') {
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
        }, delay)

        timeoutRef.current.reset = setTimeout(() => {
          nowRef.current = 0
          setState(undefined)
          clear()
        }, delay + minimum)
      }

      timeoutRef.current.timeout = setTimeout(() => {
        nowRef.current = 0
        setState(undefined)
      }, asyncBehaviorTimeout ?? 30000)
    }

    return clear
  }, [
    clear,
    minimumAsyncBehaviorTime,
    formState,
    setState,
    waitFor,
    asyncBehaviorTimeout,
  ])

  return { bufferedFormState: stateRef.current }
}
