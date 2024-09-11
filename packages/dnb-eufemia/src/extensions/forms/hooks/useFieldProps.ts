import React, {
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
  FieldPropsGeneric,
  AdditionalEventArgs,
  SubmitState,
  EventReturnWithStateObjectAndSuccess,
  EventStateObjectWithSuccess,
  ValidatorAdditionalArgs,
  Validator,
} from '../types'
import { Context as DataContext, ContextState } from '../DataContext'
import { clearedData } from '../DataContext/Provider/Provider'
import FieldPropsContext from '../Form/FieldProps/FieldPropsContext'
import { combineDescribedBy, warn } from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import useUpdateEffect from '../../../shared/helpers/useUpdateEffect'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateItemContext'
import SectionContext from '../Form/Section/SectionContext'
import FieldBoundaryContext from '../DataContext/FieldBoundary/FieldBoundaryContext'
import useProcessManager from './useProcessManager'
import usePath from './usePath'
import {
  createSharedState,
  useSharedState,
} from '../../../shared/helpers/useSharedState'
import { isAsync } from '../../../shared/helpers/isAsync'
import useTranslation from './useTranslation'
import useExternalValue from './useExternalValue'
import useDataValue from './useDataValue'

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
  [property: `data-${string}`]: string | boolean | number
}

// Many variables are kept in refs to avoid triggering unnecessary update loops because updates using
// useEffect depend on them (like the external `value`)

export default function useFieldProps<Value, EmptyValue, Props>(
  localeProps: Props & FieldPropsGeneric<Value, EmptyValue>,
  { executeOnChangeRegardlessOfError = false } = {}
): typeof localeProps & ReturnAdditional<Value> {
  const { extend } = useContext(FieldPropsContext)
  const props = extend(localeProps)

  const {
    path: pathProp,
    value: valueProp,
    defaultValue,
    itemPath,
    emptyValue,
    required: requiredProp,
    disabled: disabledProp,
    info,
    warning,
    error: errorProp,
    errorMessages,
    onFocus,
    onBlur,
    onChange,
    onBlurValidator,
    validator,
    exportValidators,
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
    transformAdditionalArgs = (additionalArgs: AdditionalEventArgs) =>
      additionalArgs,
    fromExternal = (value: Value) => value,
    validateRequired = (value, { emptyValue, required, error }) => {
      const res =
        required &&
        ((value as any) === emptyValue ||
          (typeof emptyValue === 'undefined' && value === ''))
          ? error
          : undefined

      return res
    },
  } = props

  const [salt, forceUpdate] = useReducer(() => ({}), {})
  const isInternalRerenderRef = useRef(undefined)
  useMemo(() => {
    /**
     * This is currently not used, but we keep it here for future use.
     * It lets you check for isInternalRerenderRef.current !== undefined
     * inside a useUpdateEffect or useEffect to know if the component is rerendering from inside or outside.
     */
    isInternalRerenderRef.current = salt
  }, [salt])
  const { startProcess } = useProcessManager()
  const id = useId(props.id)
  const dataContext = useContext(DataContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateItemContext = useContext(IterateElementContext)
  const sectionContext = useContext(SectionContext)
  const fieldBoundaryContext = useContext(FieldBoundaryContext)
  const translation = useTranslation()

  const transformers = useRef({
    transformIn,
    transformOut,
    transformAdditionalArgs,
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
    setFieldProps: setPropsDataContext,
    setHasVisibleError: setHasVisibleErrorDataContext,
    handleMountField,
    handleUnMountField,
    setFieldEventListener,
    errors: dataContextErrors,
    showAllErrors,
    contextErrorMessages,
  } = dataContext || {}
  const onChangeContext = dataContext?.props?.onChange

  const disabled = disabledProp ?? props.readOnly
  const inFieldBlock = Boolean(fieldBlockContext)
  const {
    setFieldState: setFieldStateFieldBlock,
    showFieldError: showFieldErrorFieldBlock,
    mountedFieldsRef: mountedFieldsRefFieldBlock,
  } = fieldBlockContext || {}
  const { handleChange: handleChangeIterateContext } =
    iterateItemContext || {}
  const { path: sectionPath, errorPrioritization } = sectionContext || {}
  const { setFieldError, showBoundaryErrors } = fieldBoundaryContext || {}

  const hasPath = Boolean(pathProp)
  const { path, identifier, makeIteratePath } = usePath({
    id,
    path: pathProp,
    itemPath,
  })

  const defaultValueRef = useRef(defaultValue)
  const externalValue =
    useExternalValue<Value>({
      path,
      itemPath,
      value: valueProp,
      transformers,
      emptyValue,
    }) ?? defaultValueRef.current

  // Many variables are kept in refs to avoid triggering unnecessary update loops because updates using
  // useEffect depend on them (like the external `value`)

  // Hold an internal copy of the input value in case the input component is used uncontrolled,
  // and to handle errors in Eufemia on components that does not take updated callback functions into account.
  const valueRef = useRef<Value>(externalValue)
  const changedRef = useRef<boolean>()
  const hasFocusRef = useRef<boolean>()

  const required = useMemo(() => {
    if (requiredProp) {
      return requiredProp
    }

    const paths = identifier.split('/')
    if (paths.length > 0 && (schema || dataContext?.schema)) {
      const requiredList = [schema?.['required']]

      if (paths.length > 1) {
        const schema = dataContext.schema
        const schemaPath = paths.slice(0, -1).join('/properties/')
        const schemaPart = pointer.has(schema, schemaPath)
          ? pointer.get(schema, schemaPath)
          : schema

        requiredList.push(schemaPart?.required)
      }

      if (sectionPath) {
        paths.push(sectionPath.substring(1))
      }

      const collected = requiredList.flatMap((v) => v).filter(Boolean)
      if (
        paths
          .filter(Boolean)
          .some((p) => collected.some((c) => c.includes(p)))
      ) {
        return true
      }
    }
  }, [sectionPath, dataContext.schema, identifier, requiredProp, schema])

  // Error handling
  // - Should errors received through validation be shown initially. Assume that providing a direct prop to
  // the component means it is supposed to be shown initially.
  const revealErrorRef = useRef<boolean>(
    validateInitially ?? Boolean(errorProp)
  )
  // - Local errors are errors based on validation instructions received by
  const errorMethodRef = useRef<
    Partial<Record<PersistErrorStateMethod, Error | FormError>>
  >({})
  const localErrorRef = useRef<Error | FormError | undefined>()
  const hasLocalErrorRef = useRef(false)
  // - Context errors are from outer contexts, like validation for this field as part of the whole data set
  const dataContextError = useMemo(() => {
    return path ? dataContextErrors?.[identifier] : undefined
  }, [dataContextErrors, identifier, path])
  const contextErrorRef = useRef<Error | FormError | undefined>(
    dataContextError
  )

  const onChangeValidatorRef = useRef(validator)
  useUpdateEffect(() => {
    onChangeValidatorRef.current = validator
  }, [validator])
  const onBlurValidatorRef = useRef(onBlurValidator)
  useUpdateEffect(() => {
    onBlurValidatorRef.current = onBlurValidator
  }, [onBlurValidator])

  const schemaValidatorRef = useRef<ValidateFunction>(
    schema ? dataContext.ajvInstance?.compile(schema) : undefined
  )

  // Needs to be placed before "prepareError"
  const errorMessagesRef = useRef(null)
  errorMessagesRef.current = useMemo(() => {
    return {
      required: translation.Field.errorRequired,
      ...errorMessages,
    }
  }, [errorMessages, translation.Field.errorRequired])

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

  const revealError = useCallback(() => {
    // To support "validateInitially={false}" prop, we need to make sure that the error is not shown initially
    if (revealErrorRef.current === false && validateInitially === false) {
      revealErrorRef.current = undefined
      return // stop here
    }

    if (!revealErrorRef.current) {
      revealErrorRef.current = true
      showFieldErrorFieldBlock?.(identifier, true)
      setHasVisibleErrorDataContext?.(identifier, !!localErrorRef.current)
    }
  }, [
    identifier,
    setHasVisibleErrorDataContext,
    showFieldErrorFieldBlock,
    validateInitially,
  ])

  const hideError = useCallback(() => {
    if (revealErrorRef.current) {
      revealErrorRef.current = undefined
      showFieldErrorFieldBlock?.(identifier, false)
      setHasVisibleErrorDataContext?.(identifier, false)
    }
  }, [identifier, setHasVisibleErrorDataContext, showFieldErrorFieldBlock])

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

        const messageHasValues = Object.entries(
          error.messageValues || {}
        ).reduce((message, [key, value]) => {
          return message.replace(`{${key}}`, value)
        }, message)

        error.message = messageHasValues

        return error
      }

      return error
    },
    []
  )

  contextErrorRef.current = useMemo(() => {
    if (!dataContextError) {
      return undefined
    }
    const error = prepareError(dataContextError)
    if (errorChanged(error, contextErrorRef.current)) {
      return error
    }
  }, [dataContextError, prepareError])

  const error =
    revealErrorRef.current ||
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

  const connectWithPathListenerRef = useRef(async () => {
    if (
      localErrorRef.current ||
      validateUnchanged ||
      continuousValidation
    ) {
      if (onChangeValidatorRef.current) {
        runOnChangeValidator()
      }
    }

    if (localErrorRef.current && onBlurValidatorRef.current) {
      runOnBlurValidator()
    }
  })

  const { getValueByPath } = useDataValue()
  const exportValidatorsRef = useRef(exportValidators)
  exportValidatorsRef.current = exportValidators
  const additionalArgs = useMemo(() => {
    const errorMessages = {
      ...contextErrorMessages,
      ...errorMessagesRef.current,
    }
    const args: ValidatorAdditionalArgs<Value> = {
      /** @deprecated – can be removed in v11 */
      ...errorMessages,

      errorMessages,
      validators: exportValidatorsRef.current,
      connectWithPath: (path) => {
        setFieldEventListener?.(
          path,
          'onPathChange',
          connectWithPathListenerRef.current
        )

        return {
          getValue: () => getValueByPath(path),
        }
      },
    }

    return args
  }, [contextErrorMessages, getValueByPath, setFieldEventListener])
  const extendWithExportedValidators = useCallback(
    (
      validator: Validator<Value>,
      result: ReturnType<Validator<Value>>
    ) => {
      if (
        exportValidatorsRef.current &&
        !result &&
        (validator === onChangeValidatorRef.current ||
          validator === onBlurValidatorRef.current) &&
        !Array.isArray(result)
      ) {
        return Object.values(exportValidatorsRef.current)
      }

      return result
    },
    []
  )

  const callValidatorFnSync = useCallback(
    (
      validator: Validator<Value>,
      value: Value = valueRef.current
    ): ReturnType<Validator<Value>> => {
      if (typeof validator !== 'function') {
        return undefined
      }

      const result = extendWithExportedValidators(
        validator,
        validator(value, additionalArgs)
      )

      if (Array.isArray(result)) {
        for (const validator of result) {
          const result = callValidatorFnSync(validator, value)
          if (result instanceof Error) {
            return result
          }
        }

        return // stop here
      }

      return result
    },
    [additionalArgs, extendWithExportedValidators]
  )

  const callValidatorFnAsync = useCallback(
    async (
      validator: Validator<Value>,
      value: Value = valueRef.current
    ): Promise<ReturnType<Validator<Value>>> => {
      if (typeof validator !== 'function') {
        return undefined
      }

      const result = extendWithExportedValidators(
        validator,
        await validator(value, additionalArgs)
      )

      if (Array.isArray(result)) {
        for (const validator of result) {
          const result = await callValidatorFnAsync(validator, value)

          if (result instanceof Error) {
            return result
          }
        }

        return // stop here
      }

      return result
    },
    [additionalArgs, extendWithExportedValidators]
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
      setFieldError?.(identifier, error)

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
      setFieldError,
      setFieldStateDataContext,
      setFieldStateFieldBlock,
      stateId,
      inFieldBlock,
      validateInitially,
    ]
  )

  const clearErrorState = useCallback(() => {
    persistErrorState('wipe')
    hasLocalErrorRef.current = false
  }, [persistErrorState])

  const validatorCacheRef = useRef({
    onChangeValidator: null,
    onBlurValidator: null,
  })

  const revealOnChangeValidatorResult = useCallback(
    ({ result, unchangedValue }) => {
      const runAsync = isAsync(onChangeValidatorRef.current)

      // Don't show the error if the value has changed in the meantime
      if (unchangedValue) {
        persistErrorState('gracefully', result as Error)

        if (
          (validateInitially && !changedRef.current) ||
          validateUnchanged ||
          continuousValidation ||
          runAsync // Because its a better UX to show the error when the validation is async/delayed
        ) {
          // Because we first need to throw the error to be able to display it, we delay the showError call
          window.requestAnimationFrame(() => {
            revealError()
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
    },
    [
      continuousValidation,
      defineAsyncProcess,
      persistErrorState,
      revealError,
      setFieldState,
      validateInitially,
      validateUnchanged,
    ]
  )

  const callOnChangeValidator = useCallback(async () => {
    if (typeof onChangeValidatorRef.current !== 'function') {
      return {}
    }

    const tmpValue = valueRef.current

    let result = isAsync(onChangeValidatorRef.current)
      ? await callValidatorFnAsync(onChangeValidatorRef.current)
      : callValidatorFnSync(onChangeValidatorRef.current)
    if (result instanceof Promise) {
      result = await result
    }

    const unchangedValue = tmpValue === valueRef.current
    return { result, unchangedValue }
  }, [callValidatorFnAsync, callValidatorFnSync])

  const startOnChangeValidatorValidation = useCallback(async () => {
    if (typeof onChangeValidatorRef.current !== 'function') {
      return
    }

    if (isAsync(onChangeValidatorRef.current)) {
      defineAsyncProcess('validator')
      setFieldState('validating')
      hideError()
    }

    // Ideally, we should rather call "callOnChangeValidator", but sadly it's not possible,
    // because we get an additional delay due to the async nature, which is too much.
    // So when a submit button is pressed, and there is a sync validator, it needs to be validated without a delay.
    const tmpValue = valueRef.current
    let result = isAsync(onChangeValidatorRef.current)
      ? await callValidatorFnAsync(onChangeValidatorRef.current)
      : callValidatorFnSync(onChangeValidatorRef.current)
    if (result instanceof Promise) {
      result = await result
    }
    const unchangedValue = tmpValue === valueRef.current

    revealOnChangeValidatorResult({ result, unchangedValue })

    return { result }
  }, [
    callValidatorFnAsync,
    callValidatorFnSync,
    defineAsyncProcess,
    hideError,
    revealOnChangeValidatorResult,
    setFieldState,
  ])

  const runOnChangeValidator = useCallback(async () => {
    if (!onChangeValidatorRef.current) {
      return // stop here
    }

    const { result, unchangedValue } = await callOnChangeValidator()

    if (
      String(result) !==
      String(validatorCacheRef.current.onChangeValidator)
    ) {
      if (result) {
        revealOnChangeValidatorResult({ result, unchangedValue })
      } else {
        hideError()
        clearErrorState()
      }
    }

    validatorCacheRef.current.onChangeValidator = result || null
  }, [
    callOnChangeValidator,
    clearErrorState,
    hideError,
    revealOnChangeValidatorResult,
  ])

  const callOnBlurValidator = useCallback(
    async ({
      overrideValue = null,
    }: {
      overrideValue?: Value
    } = {}) => {
      if (typeof onBlurValidatorRef.current !== 'function') {
        return {}
      }

      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        'onBlurValidator'
      )

      // Since the validator can return either a synchronous result or an asynchronous.
      let result = isAsync(onBlurValidatorRef.current)
        ? await callValidatorFnAsync(onBlurValidatorRef.current, value)
        : callValidatorFnSync(onBlurValidatorRef.current, value)
      if (result instanceof Promise) {
        result = await result
      }

      return { result }
    },
    [callValidatorFnAsync, callValidatorFnSync]
  )

  const revealOnBlurValidatorResult = useCallback(
    ({ result }) => {
      persistErrorState('gracefully', result as Error)

      if (isAsync(onBlurValidatorRef.current)) {
        defineAsyncProcess(undefined)
        setFieldState(result instanceof Error ? 'error' : 'complete')
      }

      revealError()
    },
    [defineAsyncProcess, persistErrorState, revealError, setFieldState]
  )

  const startOnBlurValidatorProcess = useCallback(
    async ({
      overrideValue = null,
    }: {
      overrideValue?: Value
    } = {}) => {
      if (typeof onBlurValidatorRef.current !== 'function') {
        return
      }

      if (isAsync(onBlurValidatorRef.current)) {
        defineAsyncProcess('onBlurValidator')
        setFieldState('validating')
      }

      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        'onBlurValidator'
      )

      // Since the validator can return either a synchronous result or an asynchronous.
      // Ideally, we should rather call "callOnBlurValidator", but sadly it's not possible,
      // because we get an additional delay due to the async nature, which is too much.
      // So when a submit button is pressed, and there is a sync validator, it needs to be validated without a delay.
      let result = isAsync(onBlurValidatorRef.current)
        ? await callValidatorFnAsync(onBlurValidatorRef.current, value)
        : callValidatorFnSync(onBlurValidatorRef.current, value)
      if (result instanceof Promise) {
        result = await result
      }

      revealOnBlurValidatorResult({ result })
    },
    [
      callValidatorFnAsync,
      callValidatorFnSync,
      defineAsyncProcess,
      revealOnBlurValidatorResult,
      setFieldState,
    ]
  )

  const runOnBlurValidator = useCallback(async () => {
    if (!onBlurValidatorRef.current) {
      return // stop here
    }

    const { result } = await callOnBlurValidator()

    if (
      String(result) !==
        String(validatorCacheRef.current.onBlurValidator) &&
      revealErrorRef.current
    ) {
      if (result) {
        revealOnBlurValidatorResult({ result })
      } else {
        hideError()
        clearErrorState()
      }
    }

    validatorCacheRef.current.onBlurValidator = result || null
  }, [
    callOnBlurValidator,
    clearErrorState,
    hideError,
    revealOnBlurValidatorResult,
  ])

  const prioritizeContextSchema = useMemo(() => {
    if (errorPrioritization) {
      const schemaPath = identifier.split('/').join('/properties/')
      const hasContextSchema = pointer.has(
        dataContext?.schema || {},
        schemaPath
      )
      return (
        hasContextSchema &&
        errorPrioritization?.indexOf('contextSchema') === 0
      )
    }
  }, [dataContext?.schema, errorPrioritization, identifier])

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
      const requiredError = transformers.current.validateRequired(value, {
        emptyValue,
        required: requiredProp ?? required,
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
        !schemaValidatorRef.current(value) &&
        !prioritizeContextSchema
      ) {
        const error = ajvErrorsToOneFormError(
          schemaValidatorRef.current.errors,
          valueRef.current
        )
        throw error
      }

      // Validate by provided derivative validator
      if (
        onChangeValidatorRef.current &&
        (changedRef.current || validateInitially || validateUnchanged)
      ) {
        const { result } = await startOnChangeValidatorValidation()

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
        hasLocalErrorRef.current = true
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
    requiredProp,
    required,
    prioritizeContextSchema,
    validateInitially,
    validateUnchanged,
    startOnChangeValidatorValidation,
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
      revealError()
    } else {
      // When changing the value, hide errors to avoid annoying the user before they are finished filling in that value
      hideError()
    }
  }, [continuousValidation, hideError, revealError])

  const setHasFocus = useCallback(
    async (
      hasFocus: boolean,
      overrideValue?: Value,
      additionalArgs?: AdditionalEventArgs
    ) => {
      const getArgs = (
        type: Parameters<typeof transformers.current.toEvent>[1]
      ) => {
        const value = transformers.current.toEvent(
          overrideValue ?? valueRef.current,
          type
        )
        const transformedAdditionalArgs =
          transformers.current.transformAdditionalArgs(
            additionalArgs,
            value
          )

        return typeof transformedAdditionalArgs !== 'undefined'
          ? [value, transformedAdditionalArgs]
          : [value]
      }

      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        const args = getArgs('onFocus')
        onFocus?.apply(this, args)
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        const args = getArgs('onBlur')
        onBlur?.apply(this, args)

        if (!changedRef.current && !validateUnchanged) {
          // Avoid showing errors when blurring without having changed the value, so tabbing through several
          // fields does not make errors pop up all over the place
          return
        }

        addToPool(
          'onBlurValidator',
          async () => await startOnBlurValidatorProcess({ overrideValue }),
          isAsync(onBlurValidatorRef.current)
        )

        await runPool(() => {
          // Since the user left the field, show error (if any)
          revealError()
          forceUpdate()
        })
      }
    },
    [
      onFocus,
      onBlur,
      validateUnchanged,
      addToPool,
      runPool,
      startOnBlurValidatorProcess,
      revealError,
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
        hasValue?: Value
      }>
    }) => {
      return new Promise<void>((resolve) => {
        const validateProcesses = () => {
          const result = waitFor.some(
            ({ processName, withStates, hasValue }) => {
              const hasMatchingValue =
                // If the value has changed during the async process, we don't want to resolve anymore
                hasValue === validatedValue.current

              const result =
                (typeof hasValue === 'undefined'
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
      revealError()
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
    revealError,
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
    if (asyncBehaviorIsEnabled && !executeOnChangeRegardlessOfError) {
      await yieldAsyncProcess({
        name: 'onChangeContext',
        waitFor: [
          {
            processName: 'validator',
            withStates: ['validating', 'error'],
            hasValue: valueRef.current,
          },
          {
            processName: 'onBlurValidator',
            withStates: ['validating', 'error'],
            hasValue: valueRef.current,
          },
        ],
      })
    }

    if (hasPath) {
      if (isAsync(onChangeContext)) {
        defineAsyncProcess('onChangeContext')

        // Skip sync errors, such as required
        if (!hasError() || executeOnChangeRegardlessOfError) {
          setEventResult(
            (await handlePathChangeDataContext?.(
              identifier
            )) as EventReturnWithStateObjectAndSuccess
          )
        } else {
          setEventResult(null)
        }
      } else {
        setEventResult(
          handlePathChangeDataContext?.(
            identifier
          ) as EventReturnWithStateObjectAndSuccess
        )
      }
    }

    forceUpdate()
  }, [
    asyncBehaviorIsEnabled,
    executeOnChangeRegardlessOfError,
    hasPath,
    yieldAsyncProcess,
    onChangeContext,
    defineAsyncProcess,
    hasError,
    setEventResult,
    handlePathChangeDataContext,
    identifier,
  ])

  const updateValue = useCallback(
    async (newValue: Value) => {
      if (newValue === valueRef.current) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      valueRef.current = newValue

      if (hasPath) {
        handlePathChangeUnvalidatedDataContext(identifier, newValue)
      }

      addToPool(
        'validator',
        validateValue,
        isAsync(onChangeValidatorRef.current)
      )

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
      hasPath,
      addToPool,
      validateValue,
      callOnChangeContext,
      onChangeContext,
      runPool,
      handlePathChangeUnvalidatedDataContext,
      identifier,
      handleError,
    ]
  )

  const handleChange = useCallback(
    async (
      argFromInput: Value | unknown,
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
        handleChangeIterateContext?.(
          makeIteratePath(itemPath, ''),
          transformedValue
        )
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

        const transformedAdditionalArgs =
          transformers.current.transformAdditionalArgs(
            additionalArgs,
            value
          )

        return typeof transformedAdditionalArgs !== 'undefined'
          ? [value, transformedAdditionalArgs]
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
                  hasValue: args[0],
                },
                {
                  processName: 'onBlurValidator',
                  withStates: ['validating', 'error'],
                  hasValue: args[0],
                },
                {
                  processName: 'onChangeContext',
                  withStates: ['pending', 'error'],
                  hasValue: args[0],
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
      itemPath,
      asyncBehaviorIsEnabled,
      onChange,
      runPool,
      handleChangeIterateContext,
      makeIteratePath,
      hideError,
      updateValue,
      addToPool,
      yieldAsyncProcess,
      defineAsyncProcess,
      hasError,
      setEventResult,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

  // Put props into the surrounding data context as early as possible
  setPropsDataContext?.(identifier, props)

  useEffect(() => {
    // Mount procedure.
    handleMountField(identifier)

    // Unmount procedure.
    return () => {
      handleUnMountField(identifier)
      setFieldErrorDataContext?.(identifier, undefined)
      setFieldError?.(identifier, undefined)
      localErrorRef.current = undefined
    }
  }, [
    handleMountField,
    handleUnMountField,
    identifier,
    setFieldError,
    setFieldErrorDataContext,
  ])

  useEffect(() => {
    validateValue()
  }, [validateValue])

  useUpdateEffect(() => {
    schemaValidatorRef.current = schema
      ? dataContext.ajvInstance?.compile(schema)
      : undefined
    validateValue()
  }, [schema, validateValue])

  const isEmptyData = useCallback(() => {
    return (
      dataContext.internalDataRef?.current ===
      (dataContext.props?.emptyData ?? clearedData)
    )
  }, [dataContext.internalDataRef, dataContext.props?.emptyData])

  useEffect(() => {
    if (isEmptyData()) {
      hideError()
    }
  }, [externalValue, hideError, isEmptyData])

  useUpdateEffect(() => {
    // Error or removed error for this field from the surrounding data context (by path)
    if (valueRef.current !== externalValue) {
      valueRef.current = externalValue
      validateValue()
      forceUpdate()
    }
  }, [externalValue, validateValue])

  useEffect(() => {
    // Check against the local error state,
    // so we prioritize the local error state over the context error state
    if (!hasLocalErrorRef.current) {
      const error = prepareError(dataContextError)
      if (error) {
        persistErrorState('weak', error)
        if (validateInitially) {
          handleError()
        }
      } else {
        clearErrorState()
      }
    }
  }, [
    clearErrorState,
    dataContextError,
    handleError,
    persistErrorState,
    prepareError,
    validateInitially,
  ])

  useEffect(() => {
    if (itemPath && valueProp !== undefined) {
      warn(
        `Using value="${valueProp}" prop inside Iterate is not supported yet`
      )
    }
    if (itemPath && defaultValue !== undefined) {
      warn(
        `Using defaultValue="${defaultValue}" prop inside Iterate is not supported yet`
      )
    }
  }, [defaultValue, itemPath, valueProp])

  useEffect(() => {
    if (hasPath) {
      let value = valueProp

      // First, look for existing data in the context
      const hasValue =
        pointer.has(dataContext.data, identifier) || identifier === '/'
      const existingValue =
        identifier === '/'
          ? dataContext.data
          : hasValue
          ? pointer.get(dataContext.data, identifier)
          : undefined

      // If no data where found in the dataContext, look for shared data
      if (
        dataContext.id &&
        !hasValue &&
        typeof existingValue === 'undefined' &&
        typeof value === 'undefined'
      ) {
        const sharedState = createSharedState(dataContext.id)
        const hasValue = pointer.has(sharedState.data, identifier)
        if (hasValue) {
          const sharedValue = pointer.get(sharedState.data, identifier)
          if (sharedValue) {
            value = sharedValue
          }
        }
      }

      if (
        typeof defaultValueRef.current !== 'undefined' &&
        typeof value === 'undefined'
      ) {
        value = defaultValueRef.current
        defaultValueRef.current = undefined
      }

      if (
        !hasValue ||
        (value !== existingValue &&
          // Prevents an infinite loop by skipping the update if the value hasn't changed
          valueRef.current !== existingValue)
      ) {
        // Update the data context when a pointer not exists,
        // but was given initially.
        updateDataValueDataContext?.(identifier, value)
        validateDataDataContext?.()
      }
    }
  }, [
    dataContext.data,
    dataContext.id,
    defaultValue,
    hasPath,
    identifier,
    updateDataValueDataContext,
    validateDataDataContext,
    valueProp,
  ])

  useEffect(() => {
    if (showAllErrors || showBoundaryErrors) {
      // In case of async validation, we don't want to show existing errors before the validation has been completed
      if (fieldStateRef.current !== 'validating') {
        // If showError on a surrounding data context was changed and set to true, it is because the user clicked next, submit or
        // something else that should lead to showing the user all errors.
        revealError()
      }
    } else if (showBoundaryErrors === false) {
      hideError()
    }
  }, [hideError, revealError, showAllErrors, showBoundaryErrors])

  useEffect(() => {
    if (
      dataContext.formState === 'pending' &&
      (onChangeValidatorRef.current || onBlurValidatorRef.current)
    ) {
      hideError()
      forceUpdate()
    }
  }, [dataContext.formState, hideError])

  const onSubmitHandler = useCallback(async () => {
    if (hasError()) {
      return // stop here
    }

    addToPool(
      'validator',
      startOnChangeValidatorValidation,
      isAsync(onChangeValidatorRef.current)
    )

    addToPool(
      'onBlurValidator',
      startOnBlurValidatorProcess,
      isAsync(onBlurValidatorRef.current)
    )

    await runPool()
  }, [
    addToPool,
    startOnBlurValidatorProcess,
    hasError,
    runPool,
    startOnChangeValidatorValidation,
  ])

  // Validate/call validator functions during submit of the form
  useEffect(() => {
    setFieldEventListener?.(identifier, 'onSubmit', onSubmitHandler)
  }, [identifier, onSubmitHandler, setFieldEventListener])

  // Set the error in the field block context if this field is inside a field block
  useEffect(() => {
    if (inFieldBlock) {
      setFieldStateFieldBlock?.({
        identifier,
        type: 'error',
        content: errorProp,
        showInitially: true,
        show: true,
      })
      setFieldStateFieldBlock?.({
        identifier,
        type: 'warning',
        content: warning,
        showInitially: true,
        show: true,
      })
      setFieldStateFieldBlock?.({
        identifier,
        type: 'info',
        content: info,
        showInitially: true,
        show: true,
      })

      return () => {
        // Unmount procedure
        if (mountedFieldsRefFieldBlock) {
          mountedFieldsRefFieldBlock.current[identifier] = true
        }
      }
    }
  }, [
    errorProp,
    identifier,
    inFieldBlock,
    info,
    mountedFieldsRefFieldBlock,
    setFieldStateFieldBlock,
    warning,
  ])

  const infoRef = useRef<React.ReactNode>(info)
  const warningRef = useRef<React.ReactNode>(warning)
  useUpdateEffect(() => {
    infoRef.current = info
    warningRef.current = warning
    forceUpdate()
  }, [info, warning])

  // - Handle htmlAttributes
  const htmlAttributes = useMemo(() => {
    return Object.keys(props).reduce<AriaAttributes>(
      (acc, cur) => {
        if (cur.startsWith('aria-') || cur.startsWith('data-')) {
          acc[cur] = props[cur]
        }
        return acc
      },
      { ...props.htmlAttributes }
    )
  }, [props])

  if (error) {
    htmlAttributes['aria-invalid'] = error ? 'true' : 'false'
  }
  if (required) {
    htmlAttributes['aria-required'] = 'true'
  }
  if (inFieldBlock) {
    // Mount the field in the field block context
    if (mountedFieldsRefFieldBlock) {
      mountedFieldsRefFieldBlock.current[identifier] = true
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

  const sharedData = useSharedState('field-block-props-' + id)
  sharedData.set(fieldBlockProps)

  useEffect(() => {
    isInternalRerenderRef.current = undefined
  })

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
    isChanged: Boolean(changedRef.current),
    props,
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
  setHasFocus: (
    hasFocus: boolean,
    overrideValue?: Value,
    additionalArgs?: AdditionalEventArgs
  ) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: (
    value: Value | unknown,
    additionalArgs?: AdditionalEventArgs
  ) => void
  updateValue: (value: Value) => void
  forceUpdate: () => void
  hasError?: boolean

  /** Internal */
  dataContext: ContextState
  fieldState: SubmitState
}

function resolveValidatingState(state: SubmitStateWithValidating) {
  return state === 'validating' ? 'pending' : state
}
