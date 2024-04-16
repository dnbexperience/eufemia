import {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useReducer,
  AriaAttributes,
} from 'react'
import pointer from 'json-pointer'
import { ValidateFunction } from 'ajv/dist/2020'
import { errorChanged } from '../utils'
import { ajvErrorsToOneFormError } from '../utils/ajv'
import {
  FormError,
  FieldProps,
  AdditionalEventArgs,
  SubmitState,
  EventReturnWithStateObjectAndSuccess,
  EventStateObjectWithSuccess,
} from '../types'
import { Context as DataContext, ContextState } from '../DataContext'
import { combineDescribedBy } from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import useUpdateEffect from '../../../shared/helpers/useUpdateEffect'
import useMountEffect from '../../../shared/helpers/useMountEffect'
import useUnmountEffect from '../../../shared/helpers/useUnmountEffect'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateElementContext'
import useProcessManager from './useProcessManager'
import {
  createSharedState,
  useSharedState,
} from '../../../shared/helpers/useSharedState'
import { isAsync } from '../../../shared/helpers/isAsync'
import useTranslation from './useTranslation'

type SubmitStateWithValidating = SubmitState | 'validating'
type AsyncProcesses =
  | 'validator'
  | 'onBlurValidator'
  | 'onChangeLocal'
  | 'onChangeContext'
type PersistErrorStateMethod =
  /**
   * Add or remove the error regardless
   */
  | 'weak'
  /**
   * Check if there is an existing error, and if so, keep it
   */
  | 'gracefully'
  /**
   * Remove the error, if any
   */
  | 'wipe'
type AsyncProcessesBuffer = {
  resolve: () => void
  validateProcesses: () => boolean
}

export type DataAttributes = {
  [property: `data-${string}`]: string
}

export default function useFieldProps<
  Value = unknown,
  Props extends FieldProps<Value> = FieldProps<Value>,
>(props: Props): Props & FieldProps<Value> & ReturnAdditional<Value> {
  const {
    path,
    itemPath,
    emptyValue,
    required,
    info,
    warning,
    error: errorProp,
    errorMessages,
    onFocus,
    onBlur,
    onChange,
    onBlurValidator,
    validator,
    schema,
    validateInitially,
    validateUnchanged,
    continuousValidation,
    transformIn = (value: Value) => value,
    transformOut = (value: Value) => value,
    toInput = (value: Value) => value,
    fromInput = (value: Value) => value,
    toEvent = (value: Value) => value,
    transformValue = (value: Value) => value,
    fromExternal = (value: Value) => value,
    validateRequired = (value: Value, { emptyValue, required, error }) => {
      const res =
        required &&
        (value === emptyValue ||
          (typeof emptyValue === 'undefined' && value === ''))
          ? error
          : undefined

      return res
    },
  } = props

  const disabled = props.disabled ?? props.readOnly

  const [, forceUpdate] = useReducer(() => ({}), {})
  const { startProcess } = useProcessManager()
  const id = useId(props.id)
  const dataContext = useContext(DataContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateElementContext = useContext(IterateElementContext)
  const translation = useTranslation()

  const transformers = useRef({
    transformIn,
    transformOut,
    toInput,
    fromInput,
    toEvent,
    fromExternal,
    transformValue,
    validateRequired,
  })

  const {
    handlePathChangeUnvalidated: handlePathChangeUnvalidatedDataContext,
    handlePathChange: handlePathChangeDataContext,
    updateDataValue: updateDataValueDataContext,
    validateData: validateDataDataContext,
    setFieldState: setFieldStateDataContext,
    setFieldError: setFieldErrorDataContext,
    setProps: setPropsDataContext,
    errors: dataContextErrors,
    contextErrorMessages,
  } = dataContext ?? {}
  const onChangeContext = dataContext?.props?.onChange

  const dataContextError = path ? dataContextErrors?.[path] : undefined
  const inFieldBlock = Boolean(fieldBlockContext)
  const {
    setFieldState: setFieldStateFieldBlock,
    showFieldError: showFieldErrorFieldBlock,
  } = fieldBlockContext ?? {}
  const inIterate = Boolean(iterateElementContext)
  const {
    index: iterateElementIndex,
    value: iterateElementValue,
    path: iteratePath,
    handleChange: handleIterateElementChange,
  } = iterateElementContext ?? {}

  if (path && path.substring(0, 1) !== '/') {
    throw new Error(
      'Invalid path. Data value path JSON Pointers must be from root (starting with a /).'
    )
  }
  if (itemPath && itemPath.substring(0, 1) !== '/') {
    throw new Error(
      'Invalid itemPath. Item pathJSON Pointers must be from root of iterate element (starting with a /).'
    )
  }
  if (itemPath && !inIterate) {
    throw new Error(
      'itemPath cannot be used when not inside an iterate context. Wrap the component in an Iterate.Array.'
    )
  }

  const identifier = useMemo(() => {
    if (itemPath) {
      const iterateValuePath = `${iteratePath}/${iterateElementIndex}${
        itemPath && itemPath !== '/' ? itemPath : ''
      }`
      return iterateValuePath
    }

    // Identifier is used is registries of multiple fields, like in the DataContext keeping track of errors
    return path ?? id
  }, [itemPath, path, id, iteratePath, iterateElementIndex])

  const externalValue = useMemo(() => {
    if (props.value !== emptyValue) {
      // Value-prop sent directly to the field has highest priority, overriding any surrounding source
      return transformers.current.fromExternal(props.value)
    }

    if (inIterate && itemPath) {
      // This field is inside an iterate, and has a pointer from the base of the element being iterated
      if (itemPath === '/') {
        return iterateElementValue
      }

      return pointer.has(iterateElementValue, itemPath)
        ? pointer.get(iterateElementValue, itemPath)
        : emptyValue
    }

    if (dataContext.data && path) {
      // There is a surrounding data context and a path for where in the source to find the data
      if (path === '/') {
        return dataContext.data
      }

      return pointer.has(dataContext.data, path)
        ? pointer.get(dataContext.data, path)
        : emptyValue
    }

    return emptyValue
  }, [
    props.value,
    emptyValue,
    inIterate,
    itemPath,
    dataContext.data,
    path,
    iterateElementValue,
  ])

  // Many variables are kept in refs to avoid triggering unnecessary update loops because updates using
  // useEffect depend on them (like the external `value`)

  // Hold an internal copy of the input value in case the input component is used uncontrolled,
  // and to handle errors in Eufemia on components that does not take updated callback functions into account.
  const valueRef = useRef<Value>(externalValue)
  const changedRef = useRef<boolean>(false)
  const hasFocusRef = useRef<boolean>(false)

  // Error handling
  // - Should errors received through validation be shown initially. Assume that providing a direct prop to
  // the component means it is supposed to be shown initially.
  const showErrorRef = useRef<boolean>(
    Boolean(validateInitially || errorProp)
  )
  // - Local errors are errors based on validation instructions received by
  const errorMethodRef = useRef<
    Partial<Record<PersistErrorStateMethod, Error | FormError>>
  >({})
  const localErrorRef = useRef<Error | FormError | undefined>()
  // - Context errors are from outer contexts, like validation for this field as part of the whole data set
  const contextErrorRef = useRef<Error | FormError | undefined>(
    dataContextError
  )

  const validatorRef = useRef(validator)
  useUpdateEffect(() => {
    validatorRef.current = validator
  }, [validator])
  const onBlurValidatorRef = useRef(onBlurValidator)
  useUpdateEffect(() => {
    onBlurValidatorRef.current = onBlurValidator
  }, [onBlurValidator])

  const schemaValidatorRef = useRef<ValidateFunction>(
    schema ? dataContext.ajvInstance?.compile(schema) : undefined
  )

  // - Async behavior
  const asyncBehaviorIsEnabled = useMemo(() => {
    return isAsync(onChange) || isAsync(onChangeContext)
  }, [onChangeContext, onChange])
  const validatedValue = useRef<Value>()
  const changeEventResultRef = useRef<EventStateObjectWithSuccess>(null)
  const asyncProcessRef = useRef<AsyncProcesses>(null)
  const defineAsyncProcess = useCallback((name: AsyncProcesses) => {
    asyncProcessRef.current = name
  }, [])

  // When both an async onChange and async validators are used,
  // we buffer the onChange calls to avoid race conditions.
  const asyncBufferRef = useRef<
    Record<AsyncProcesses, AsyncProcessesBuffer> | Record<string, unknown>
  >({})

  for (const key in asyncBufferRef.current) {
    const { resolve, validateProcesses } = (asyncBufferRef.current[key] ||
      {}) as AsyncProcessesBuffer
    if (validateProcesses?.() === false) {
      delete asyncBufferRef.current[key]
      if (typeof resolve === 'function') {
        window.requestAnimationFrame(resolve)
      }
    }
  }

  const eventPool = useRef({
    validator: null,
    onBlurValidator: null,
    onChangeContext: null,
    onChangeLocal: null,
  })

  const addToPool = useCallback(
    (name: keyof typeof eventPool.current, fn, runAsync) => {
      if (!eventPool.current[name]) {
        eventPool.current[name] = { fn, runAsync }
      }
    },
    []
  )

  const runPool = useCallback(async (cb = null) => {
    for (const key in eventPool.current) {
      if (!eventPool.current[key] || eventPool.current[key].pending) {
        continue
      }

      const { fn, runAsync } = eventPool.current[key] || {}
      if (fn) {
        eventPool.current[key].pending = true
        eventPool.current[key] = null

        if (runAsync) {
          await fn()
        } else {
          fn()
        }
      }
    }

    // use a callback in order to avoid any async/await,
    // because it will delay the execution of the following code
    cb?.()
  }, [])

  // Put props into the surrounding data context
  setPropsDataContext?.(identifier, props)

  const fieldStateRef = useRef<SubmitStateWithValidating>()
  const setFieldState = useCallback(
    (state: SubmitStateWithValidating) => {
      fieldStateRef.current = state
      setFieldStateDataContext(identifier, resolveValidatingState(state))
      if (!validateInitially) {
        forceUpdate()
      }
    },
    [setFieldStateDataContext, identifier, validateInitially]
  )

  const showError = useCallback(() => {
    showErrorRef.current = true
    showFieldErrorFieldBlock?.(identifier, true)
  }, [showFieldErrorFieldBlock, identifier])

  const hideError = useCallback(() => {
    showErrorRef.current = false
    showFieldErrorFieldBlock?.(identifier, false)
  }, [showFieldErrorFieldBlock, identifier])

  const error =
    showErrorRef.current ||
    // If the error is a type error, we want to show it even if the field as not been used
    localErrorRef.current?.['validationRule'] === 'type'
      ? errorProp ?? localErrorRef.current ?? contextErrorRef.current
      : undefined

  const hasVisibleError =
    Boolean(error) || (inFieldBlock && fieldBlockContext.hasErrorProp)
  const hasError = useCallback(() => {
    return Boolean(
      errorProp ?? localErrorRef.current ?? contextErrorRef.current
    )
  }, [errorProp])

  const errorMessagesRef = useRef(null)
  errorMessagesRef.current = useMemo(() => {
    return {
      required: translation.Field.errorRequired,
      ...errorMessages,
    }
  }, [errorMessages, translation.Field.errorRequired])

  /**
   * Prepare error from validation logic with correct error messages based on props
   */
  const prepareError = useCallback(
    (error: Error | FormError | undefined): FormError | undefined => {
      if (error instanceof FormError) {
        let message = error.message

        const { validationRule } = error
        if (typeof validationRule === 'string') {
          const fieldMessage = errorMessagesRef.current?.[validationRule]
          if (fieldMessage) {
            message = fieldMessage
          }
        }

        const messageWithValues = Object.entries(
          error.messageValues ?? {}
        ).reduce((message, [key, value]) => {
          return message.replace(`{${key}}`, value)
        }, message)

        error.message = messageWithValues

        return error
      }

      return error
    },
    []
  )

  /**
   * Based on validation, update error state, locally and relevant surrounding contexts
   */
  const stateId = useId()
  const persistErrorState = useCallback(
    (
      method: PersistErrorStateMethod,
      errorArg: Error | FormError | undefined = undefined
    ) => {
      const error = prepareError(errorArg)

      if (!errorChanged(error, localErrorRef.current)) {
        // In case different triggers lead to validation with no changes in the result (like still no error, or the same error),
        // avoid unnecessary re-renders by letting the old error object stay in the state and skip re-rendering.
        return
      }

      if (method === 'wipe') {
        errorMethodRef.current = {}
      } else {
        errorMethodRef.current[method] = error
      }

      if (
        !error &&
        method === 'gracefully' &&
        Object.keys(errorMethodRef.current).filter(Boolean).length > 0
      ) {
        // If the error is removed, we need to check if there are other errors that still should be shown
        return
      }

      localErrorRef.current = error

      // Tell the data context about the error, so it can stop the user from submitting the form until the error has been fixed
      setFieldErrorDataContext?.(identifier, error)

      // Set the visual states
      setFieldStateDataContext?.(identifier, error ? 'error' : undefined)
      setFieldStateFieldBlock?.({
        stateId,
        identifier,
        type: 'error',
        content: error,
        showInitially: Boolean(inFieldBlock && validateInitially),
      })

      forceUpdate()
    },
    [
      prepareError,
      setFieldErrorDataContext,
      identifier,
      setFieldStateDataContext,
      setFieldStateFieldBlock,
      stateId,
      inFieldBlock,
      validateInitially,
    ]
  )

  const clearErrorState = useCallback(() => {
    persistErrorState('wipe')
  }, [persistErrorState])

  const callValidator = useCallback(async () => {
    if (typeof validatorRef.current !== 'function') {
      return
    }

    const runAsync = isAsync(validatorRef.current)

    if (runAsync) {
      defineAsyncProcess('validator')
      setFieldState('validating')
      hideError()
    }

    const opts = {
      ...contextErrorMessages,
      ...errorMessagesRef.current,
    }

    const tmpValue = valueRef.current

    // Run async regardless to support Promise based validators
    const result = await validatorRef.current(valueRef.current, opts)

    const unchangedValue = tmpValue === valueRef.current

    // Don't show the error if the value has changed in the meantime
    if (unchangedValue) {
      persistErrorState('gracefully', result as Error)

      // Because its a better UX to show the error when the validation is async/delayed
      if (continuousValidation || runAsync) {
        // Because we first need to throw the error to be able to display it, we delay the showError call
        window.requestAnimationFrame(() => {
          showError()
          forceUpdate()
        })
      }
    }

    if (runAsync) {
      defineAsyncProcess(undefined)

      if (unchangedValue) {
        setFieldState(result instanceof Error ? 'error' : 'complete')
      } else {
        setFieldState('pending')
      }
    }

    return result
  }, [
    contextErrorMessages,
    continuousValidation,
    hideError,
    persistErrorState,
    defineAsyncProcess,
    setFieldState,
    showError,
  ])

  const callOnBlurValidator = useCallback(
    async ({ valueOverride = null } = {}) => {
      if (typeof onBlurValidatorRef.current !== 'function') {
        return
      }
      // External blur validators makes it possible to validate values but not on every character change in case of
      // expensive validation calling external services etc.

      // Since the validator can return either a synchronous result or an asynchronous
      const value = transformers.current.toEvent(
        valueOverride ?? valueRef.current,
        'onBlurValidator'
      )

      const runAsync = isAsync(onBlurValidatorRef.current)

      if (runAsync) {
        defineAsyncProcess('onBlurValidator')
        setFieldState('validating')
      }

      // Run async regardless to support Promise based validators
      const result = await onBlurValidatorRef.current(value)

      persistErrorState('gracefully', result as Error)

      if (runAsync) {
        defineAsyncProcess(undefined)
        setFieldState(result instanceof Error ? 'error' : 'complete')
      }

      showError()
      forceUpdate()
    },
    [persistErrorState, defineAsyncProcess, setFieldState, showError]
  )

  /**
   * Validate the current state value by provided validator instructions
   */
  const validateValue = useCallback(async () => {
    const isProcessActive = startProcess()

    if (disabled) {
      if (isProcessActive()) {
        clearErrorState()
      }
      hideError()
      setFieldState(undefined)
      return // stop here
    }

    const value = valueRef.current
    changeEventResultRef.current = null
    validatedValue.current = null

    try {
      // Validate required
      const requiredError = transformers.current.validateRequired(value, {
        emptyValue,
        required,
        isChanged: changedRef.current,
        error: new FormError('The value is required', {
          validationRule: 'required',
        }),
      })
      if (requiredError instanceof Error) {
        throw requiredError
      }

      // Validate by provided JSON Schema for this value
      if (
        schemaValidatorRef.current &&
        value !== undefined &&
        !schemaValidatorRef.current(value)
      ) {
        const error = ajvErrorsToOneFormError(
          schemaValidatorRef.current.errors,
          valueRef.current
        )
        throw error
      }

      // Validate by provided derivative validator
      if (
        validatorRef.current &&
        (changedRef.current || validateInitially)
      ) {
        const result = await callValidator()

        if (result instanceof Error) {
          throw result
        }
      }

      if (isProcessActive()) {
        clearErrorState()
      }

      validatedValue.current = value
    } catch (error: unknown) {
      if (isProcessActive()) {
        persistErrorState('weak', error as Error)
      }
    }
  }, [
    startProcess,
    disabled,
    hideError,
    setFieldState,
    clearErrorState,
    emptyValue,
    required,
    validateInitially,
    callValidator,
    persistErrorState,
  ])

  const handleError = useCallback(() => {
    if (
      continuousValidation ||
      (continuousValidation !== false && !hasFocusRef.current)
    ) {
      // When there is a change to the value without there having been any focus callback beforehand, it is likely
      // to believe that the blur callback will not be called either, which would trigger the display of the error.
      // The error is therefore displayed immediately (unless instructed not to with continuousValidation set to false).
      showError()
    } else {
      // When changing the value, hide errors to avoid annoying the user before they are finished filling in that value
      hideError()
    }
  }, [continuousValidation, hideError, showError])

  const setHasFocus = useCallback(
    async (hasFocus: boolean, valueOverride?: Value) => {
      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        const value = transformers.current.toEvent(
          valueOverride ?? valueRef.current,
          'onFocus'
        )
        onFocus?.(value)
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        const value = transformers.current.toEvent(
          valueOverride ?? valueRef.current,
          'onBlur'
        )
        onBlur?.(value)

        if (!changedRef.current && !validateUnchanged) {
          // Avoid showing errors when blurring without having changed the value, so tabbing through several
          // fields does not make errors pop up all over the place
          return
        }

        addToPool(
          'onBlurValidator',
          async () => await callOnBlurValidator({ valueOverride }),
          isAsync(onBlurValidatorRef.current)
        )

        await runPool(() => {
          // Since the user left the field, show error (if any)
          showError()
          forceUpdate()
        })
      }
    },
    [
      addToPool,
      callOnBlurValidator,
      onBlur,
      onFocus,
      runPool,
      showError,
      validateUnchanged,
    ]
  )

  // Await an async operation to run after criteria are fulfilled
  const yieldAsyncProcess = useCallback(
    async ({
      name,
      waitFor,
    }: {
      name: 'onChangeLocal' | 'onChangeContext' | 'onSubmitContext'
      waitFor: Array<{
        processName?: AsyncProcesses
        withStates: Array<SubmitStateWithValidating>
        withValue?: Value
      }>
    }) => {
      return new Promise<void>((resolve) => {
        const validateProcesses = () => {
          const result = waitFor.some(
            ({ processName, withStates, withValue }) => {
              const hasMatchingValue =
                // If the value has changed during the async process, we don't want to resolve anymore
                withValue === validatedValue.current

              const result =
                (typeof withValue === 'undefined'
                  ? false
                  : !hasMatchingValue) ||
                ((processName
                  ? processName === asyncProcessRef.current
                  : true) &&
                  withStates?.some((state) => {
                    return state === fieldStateRef.current
                  }))

              return result
            }
          )

          return result
        }

        if (validateProcesses() === true) {
          asyncBufferRef.current[name] = { resolve, validateProcesses }
        } else {
          resolve()
          setFieldState('pending')
        }
      })
    },
    [setFieldState]
  )

  const handleChangeEventResult = useCallback(async () => {
    const result: EventStateObjectWithSuccess =
      changeEventResultRef.current

    if (typeof result?.error !== 'undefined') {
      persistErrorState('gracefully', result.error)
      showError()
    }
    if (typeof result?.warning !== 'undefined') {
      warningRef.current = result.warning
    }
    if (typeof result?.info !== 'undefined') {
      infoRef.current = result.info
    }

    if (asyncBehaviorIsEnabled) {
      await yieldAsyncProcess({
        name: 'onSubmitContext',
        waitFor: [{ withStates: ['validating'] }],
      })
    }

    defineAsyncProcess(undefined)

    if (result?.success === 'saved') {
      setFieldState('success')
    } else if (result?.error) {
      setFieldState('error')
    } else if (asyncBehaviorIsEnabled) {
      setFieldState('complete')
    }
  }, [
    asyncBehaviorIsEnabled,
    defineAsyncProcess,
    persistErrorState,
    setFieldState,
    showError,
    yieldAsyncProcess,
  ])

  const setEventResult = useCallback(
    (result: EventReturnWithStateObjectAndSuccess) => {
      if (result instanceof Error) {
        result = { error: result }
      }
      changeEventResultRef.current = {
        ...changeEventResultRef.current,
        ...result,
      } as EventStateObjectWithSuccess

      handleChangeEventResult()
    },
    [handleChangeEventResult]
  )

  const callOnChangeContext = useCallback(async () => {
    if (asyncBehaviorIsEnabled) {
      await yieldAsyncProcess({
        name: 'onChangeContext',
        waitFor: [
          {
            processName: 'validator',
            withStates: ['validating', 'error'],
            withValue: valueRef.current,
          },
          {
            processName: 'onBlurValidator',
            withStates: ['validating', 'error'],
            withValue: valueRef.current,
          },
        ],
      })
    }

    if (path) {
      if (isAsync(onChangeContext)) {
        defineAsyncProcess('onChangeContext')

        // Skip sync errors, such as required
        if (!hasError()) {
          setEventResult(
            (await handlePathChangeDataContext?.(
              path
            )) as EventReturnWithStateObjectAndSuccess
          )
        } else {
          setEventResult(null)
        }
      } else {
        setEventResult(
          handlePathChangeDataContext?.(
            path
          ) as EventReturnWithStateObjectAndSuccess
        )
      }
    }

    forceUpdate()
  }, [
    asyncBehaviorIsEnabled,
    path,
    hasError,
    yieldAsyncProcess,
    onChangeContext,
    defineAsyncProcess,
    setEventResult,
    handlePathChangeDataContext,
  ])

  const updateValue = useCallback(
    async (newValue: Value) => {
      if (newValue === valueRef.current) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      valueRef.current = newValue

      handlePathChangeUnvalidatedDataContext(path, newValue)

      addToPool('validator', validateValue, isAsync(validatorRef.current))

      addToPool(
        'onChangeContext',
        callOnChangeContext,
        isAsync(onChangeContext)
      )

      await runPool(() => {
        handleError()
      })
    },
    [
      handlePathChangeUnvalidatedDataContext,
      path,
      addToPool,
      validateValue,
      callOnChangeContext,
      onChangeContext,
      runPool,
      handleError,
    ]
  )

  const handleChange = useCallback(
    async (
      argFromInput: Value,
      additionalArgs: AdditionalEventArgs = undefined
    ) => {
      const currentValue = valueRef.current
      const fromInput = transformers.current.fromInput(argFromInput)

      if (fromInput === currentValue) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      const transformedValue = transformers.current.transformOut(
        transformers.current.transformValue(fromInput, currentValue)
      )

      // Must be set before validation
      changedRef.current = true

      // Run in sync, before any async operations to avoid lag in UX
      if (itemPath) {
        const iterateValuePath = `/${iterateElementIndex}${
          itemPath && itemPath !== '/' ? itemPath : ''
        }`
        handleIterateElementChange?.(iterateValuePath, transformedValue)
      }

      if (asyncBehaviorIsEnabled) {
        hideError()
        await updateValue(transformedValue)
      } else {
        updateValue(transformedValue)
      }

      const getArgs = (): [Value] | [Value, AdditionalEventArgs] => {
        const value = transformers.current.toEvent(
          valueRef.current,
          'onChange'
        )

        return typeof additionalArgs !== 'undefined'
          ? [value, additionalArgs]
          : [value]
      }

      if (isAsync(onChange)) {
        addToPool(
          'onChangeLocal',
          async () => {
            const args = getArgs()

            await yieldAsyncProcess({
              name: 'onChangeLocal',
              waitFor: [
                {
                  processName: 'validator',
                  withStates: ['validating', 'error'],
                  withValue: args[0],
                },
                {
                  processName: 'onBlurValidator',
                  withStates: ['validating', 'error'],
                  withValue: args[0],
                },
                {
                  processName: 'onChangeContext',
                  withStates: ['pending', 'error'],
                  withValue: args[0],
                },
              ],
            })

            defineAsyncProcess('onChangeLocal')

            // Skip sync errors, such as required
            if (!hasError()) {
              // If the value has changed during the async process, we don't want to call the onChange anymore
              setEventResult(await onChange?.apply(this, args))
            } else {
              setEventResult(null)
            }
          },
          true
        )
      } else {
        setEventResult(onChange?.apply(this, getArgs()))
      }

      await runPool()
    },
    [
      addToPool,
      asyncBehaviorIsEnabled,
      handleIterateElementChange,
      hasError,
      hideError,
      itemPath,
      iterateElementIndex,
      onChange,
      runPool,
      defineAsyncProcess,
      setEventResult,
      updateValue,
      yieldAsyncProcess,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

  useMountEffect(() => {
    dataContext?.handleMountField(identifier)

    validateValue()
  })
  useUnmountEffect(() => {
    dataContext?.handleUnMountField(identifier)
  })

  useUpdateEffect(() => {
    schemaValidatorRef.current = schema
      ? dataContext.ajvInstance?.compile(schema)
      : undefined
    validateValue()
  }, [schema, validateValue])

  useUpdateEffect(() => {
    // Error or removed error for this field from the surrounding data context (by path)
    if (valueRef.current !== externalValue) {
      valueRef.current = externalValue
      validateValue()
    }
    forceUpdate()
  }, [externalValue, validateValue])

  useEffect(() => {
    const error = prepareError(dataContextError)
    if (errorChanged(error, contextErrorRef.current)) {
      contextErrorRef.current = error
      forceUpdate()
    }
  }, [dataContextError, prepareError])

  useEffect(() => {
    if (path) {
      let value = props.value

      // First, look for existing data in the context
      const hasValue = pointer.has(dataContext.data, path)
      const existingValue = hasValue
        ? pointer.get(dataContext.data, path)
        : undefined

      // If no data where found in the dataContext, look for shared data
      if (
        dataContext.id &&
        !hasValue &&
        typeof existingValue === 'undefined' &&
        typeof value === 'undefined'
      ) {
        const sharedState = createSharedState(dataContext.id)
        const hasValue = pointer.has(sharedState.data, path)
        if (hasValue) {
          const sharedValue = pointer.get(sharedState.data, path)
          if (sharedValue) {
            value = sharedValue
          }
        }
      }

      if (
        !hasValue ||
        (value !== existingValue &&
          // Prevents an infinite loop by skipping the update if the value hasn't changed
          valueRef.current !== existingValue)
      ) {
        // Update the data context when a pointer not exists,
        // but was given initially.
        updateDataValueDataContext?.(path, value)
        validateDataDataContext?.()
      }
    }
  }, [
    dataContext.data,
    dataContext.id,
    path,
    props.value,
    updateDataValueDataContext,
    validateDataDataContext,
  ])

  useEffect(() => {
    if (dataContext.showAllErrors) {
      // In case of async validation, we don't want to show existing errors before the validation has been completed
      if (fieldStateRef.current !== 'validating') {
        // If showError on a surrounding data context was changed and set to true, it is because the user clicked next, submit or
        // something else that should lead to showing the user all errors.
        showError()
        forceUpdate()
      }
    }
  }, [dataContext.showAllErrors, showError])

  useEffect(() => {
    if (
      dataContext.formState === 'pending' &&
      (validatorRef.current || onBlurValidatorRef.current)
    ) {
      hideError()
      forceUpdate()
    }
  }, [dataContext.formState, hideError])

  const onSubmitHandler = useCallback(async () => {
    if (hasError()) {
      return // stop here
    }

    addToPool('validator', callValidator, isAsync(validatorRef.current))
    addToPool(
      'onBlurValidator',
      callOnBlurValidator,
      isAsync(onBlurValidatorRef.current)
    )

    await runPool()
  }, [addToPool, callOnBlurValidator, callValidator, hasError, runPool])

  // Validate/call validator functions during submit of the form
  useMountEffect(() => {
    dataContext?.setFieldEventListener?.(
      identifier,
      'onSubmit',
      onSubmitHandler
    )
  })

  // Set the error in the field block context if this field is inside a field block
  useMountEffect(() => {
    if (inFieldBlock) {
      if (errorProp) {
        setFieldStateFieldBlock?.({
          identifier,
          type: 'error',
          content: errorProp,
          showInitially: true,
          show: true,
        })
      }
      if (warning) {
        setFieldStateFieldBlock?.({
          identifier,
          type: 'warning',
          content: warning,
          showInitially: true,
          show: true,
        })
      }
      if (info) {
        setFieldStateFieldBlock?.({
          identifier,
          type: 'info',
          content: info,
          showInitially: true,
          show: true,
        })
      }

      return () => {
        // Unmount procedure
        if (fieldBlockContext.mountedFieldsRef) {
          fieldBlockContext.mountedFieldsRef.current[identifier] = true
        }
      }
    }
  })

  const infoRef = useRef<React.ReactNode>(info)
  const warningRef = useRef<React.ReactNode>(warning)
  useUpdateEffect(() => {
    infoRef.current = info
    warningRef.current = warning
    forceUpdate()
  }, [info, warning])

  // - Handle htmlAttributes
  const htmlAttributes = useMemo(() => {
    return Object.keys(props).reduce<AriaAttributes>((acc, cur) => {
      if (cur.startsWith('aria-') || cur.startsWith('data-')) {
        acc[cur] = props[cur]
      }
      return acc
    }, {})
  }, [props])

  if (error) {
    htmlAttributes['aria-invalid'] = error ? 'true' : 'false'
  }
  if (required) {
    htmlAttributes['aria-required'] = required ? 'true' : 'false'
  }
  if (inFieldBlock) {
    // Mount the field in the field block context
    if (fieldBlockContext.mountedFieldsRef) {
      fieldBlockContext.mountedFieldsRef.current[identifier] = true
    }

    // Check if there are any state IDs to be added to the aria-describedby attribute
    const stateIds = fieldBlockContext.fieldStateIdsRef?.current

    if (stateIds) {
      htmlAttributes['aria-describedby'] = combineDescribedBy(
        htmlAttributes,
        [
          error && stateIds.error,
          warning && stateIds.warning,
          info && stateIds.info,
        ].filter(Boolean)
      )
    }
  } else {
    const ids = [
      (error || errorProp) && `${id}-form-status--error`,
      warning && `${id}-form-status--warning`,
      info && `${id}-form-status--info`,
    ].filter(Boolean)

    if (ids.length) {
      htmlAttributes['aria-describedby'] = combineDescribedBy(
        htmlAttributes,
        ids
      )
    }
  }

  const fieldBlockProps = {
    /** Documented APIs */
    info: !inFieldBlock ? infoRef.current : undefined,
    warning: !inFieldBlock ? warningRef.current : undefined,
    error: !inFieldBlock ? error : undefined,

    /** HTML Attributes */
    disabled:
      onBlurValidator &&
      asyncProcessRef.current === 'onBlurValidator' &&
      fieldStateRef.current === 'validating'
        ? true
        : disabled,

    /** Internal */
    fieldState: resolveValidatingState(fieldStateRef.current),
  }

  const sharedData = useSharedState(id)
  sharedData.set(fieldBlockProps)

  return {
    ...props,
    ...fieldBlockProps,

    /** HTML Attributes */
    name: props.name || props.path?.replace('/', '') || id,
    autoComplete:
      props.autoComplete ??
      (dataContext.autoComplete === true ? 'on' : undefined),

    /** Documented APIs */
    id,
    value: transformers.current.transformIn(
      transformers.current.toInput(valueRef.current)
    ),
    hasError: hasVisibleError,
    isChanged: changedRef.current,
    htmlAttributes,
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    forceUpdate,

    /** Internal */
    dataContext,
  }
}

export interface ReturnAdditional<Value> {
  /** Documented APIs */
  value: Value
  isChanged: boolean
  htmlAttributes: AriaAttributes | DataAttributes
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: (
    value: Value,
    additionalArgs?: AdditionalEventArgs
  ) => void
  updateValue: (value: Value) => void
  forceUpdate: () => void

  /** Internal */
  dataContext: ContextState
  fieldState: SubmitState
}

export function omitFieldProps<
  Props extends FieldProps<unknown> & ReturnAdditional<unknown>,
>(props: Props) {
  // Do not include typical HTML attributes
  const {
    /** Documented APIs */
    name, // eslint-disable-line
    error, // eslint-disable-line
    warning, // eslint-disable-line
    info, // eslint-disable-line
    hasError, // eslint-disable-line
    isChanged, // eslint-disable-line
    htmlAttributes, // eslint-disable-line
    setHasFocus, // eslint-disable-line
    handleFocus, // eslint-disable-line
    handleBlur, // eslint-disable-line
    handleChange, // eslint-disable-line
    updateValue, // eslint-disable-line
    forceUpdate, // eslint-disable-line

    /** HTML Attributes */
    autoComplete, // eslint-disable-line

    /** Internal */
    dataContext, // eslint-disable-line
    fieldState, // eslint-disable-line
    ...restProps
  } = props

  return restProps
}

function resolveValidatingState(state: SubmitStateWithValidating) {
  return state === 'validating' ? 'pending' : state
}
