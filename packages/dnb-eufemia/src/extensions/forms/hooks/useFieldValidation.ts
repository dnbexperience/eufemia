import { useCallback, useMemo, useRef } from 'react'
import type { RefObject } from 'react'
import type { ValidateFunction } from 'ajv/dist/2020.js'
import {
  FormError,
  isZodSchema,
  createZodValidator,
  zodErrorsToOneFormError,
} from '../utils'
import { hasAsyncValidatorBehavior } from '../utils/validatorOptions'
import type { AjvInstance } from '../utils/ajv'
import type * as z from 'zod'
import type {
  FieldPropsGeneric,
  ReceiveAdditionalEventArgs,
  Validator,
  Identifier,
} from '../types'
import type { ContextState } from '../DataContext'
import pointer from '../utils/json-pointer'
import { isAsync } from '../../../shared/helpers/isAsync'
import useProcessManager from './useProcessManager'
import useUpdateEffect from '../../../shared/helpers/useUpdateEffect'
import type { TransformerFns } from './useFieldTransform'
import type {
  SubmitStateWithValidating,
  PersistErrorStateMethod,
  ErrorInitiator,
} from './useFieldError'
import type { AsyncProcesses } from './useFieldAsync'

export type UseFieldValidationParams<Value> = {
  // Schema
  finalSchema: unknown
  hasZodSchema: boolean

  // Validator props
  onChangeValidatorProp: Validator<Value>
  onBlurValidator: Validator<Value>
  validateInitially: boolean
  validateUnchanged: boolean
  validateContinuously: boolean

  // Context
  identifier: Identifier
  disabled: boolean
  emptyValue: unknown
  required: boolean
  hasDataContext: boolean
  getAjvInstanceDataContext: () => AjvInstance
  setFieldInternalsDataContext: ContextState['setFieldInternals']
  setFieldEventListener(
    identifier: Identifier,
    event: string,
    fn: () => void
  ): void
  getValueByPath: (path: string) => unknown
  getSourceValue: (path: string) => unknown
  exportValidators: Record<string, Validator<Value>>
  props: unknown
  dataContext: unknown
  combinedErrorMessages: Record<string, string>
  makeIteratePath: (
    path: string,
    suffix?: string,
    options?: unknown
  ) => string
  errorPrioritization: string[]
  sectionPath: string
  hasSectionSchema: boolean
  dataContextSchema: unknown

  // Shared refs
  valueRef: RefObject<Value>
  changedRef: RefObject<boolean>
  transformers: RefObject<TransformerFns<Value>>
  schemaValidatorRef: RefObject<
    ValidateFunction | ((value: unknown) => true | z.ZodError<unknown>)
  >
  asyncProcessRef: RefObject<AsyncProcesses | null>
  validatedValueRef: RefObject<Value>
  changeEventResultRef: RefObject<unknown>
  localErrorInitiatorRef: RefObject<ErrorInitiator>

  // Error methods (from useFieldError)
  error: FieldPropsGeneric<Value>['error']
  persistErrorState: (
    method: PersistErrorStateMethod,
    initiator: ErrorInitiator,
    error?: Error | FormError | Array<Error | FormError>
  ) => void
  clearErrorState: () => void
  revealError: () => void
  hideError: () => void
  setFieldState: (state: SubmitStateWithValidating) => void
  ensureErrorMessageObject: <T>(error: T) => T

  // Async methods (from useFieldAsync)
  asyncBehaviorIsEnabled: boolean
  defineAsyncProcess: (name: AsyncProcesses) => void

  // From useFieldProps orchestrator
  forceUpdate: () => void
  revealErrorRef: RefObject<boolean | null>
}

export default function useFieldValidation<Value>({
  finalSchema,
  hasZodSchema,
  onChangeValidatorProp,
  onBlurValidator,
  validateInitially,
  validateUnchanged,
  validateContinuously,
  identifier,
  disabled,
  emptyValue,
  required,
  hasDataContext,
  getAjvInstanceDataContext,
  setFieldInternalsDataContext,
  setFieldEventListener,
  getValueByPath,
  getSourceValue,
  exportValidators,
  props,
  dataContext,
  combinedErrorMessages,
  makeIteratePath,
  errorPrioritization,
  sectionPath,
  hasSectionSchema,
  dataContextSchema,
  valueRef,
  changedRef,
  transformers,
  schemaValidatorRef,
  asyncProcessRef,
  validatedValueRef,
  changeEventResultRef,
  localErrorInitiatorRef,
  error,
  persistErrorState,
  clearErrorState,
  revealError,
  hideError,
  setFieldState,
  ensureErrorMessageObject,
  asyncBehaviorIsEnabled,
  defineAsyncProcess,
  forceUpdate,
  revealErrorRef,
}: UseFieldValidationParams<Value>) {
  const { startProcess } = useProcessManager()

  // A validator that is not declared async can still return a Promise, which
  // is only visible once it has been called. Tell the data context the first
  // time we see it, so the submit waits for the validation the same way it
  // does for a validator declared async.
  const hasDetectedAsyncRef = useRef(false)
  const detectAsyncValidator = useCallback(() => {
    if (!hasDetectedAsyncRef.current) {
      hasDetectedAsyncRef.current = true
      setFieldInternalsDataContext?.(identifier, {
        enableAsyncMode: true,
      })
    }
  }, [setFieldInternalsDataContext, identifier])

  // -- onChangeValidator resolution --

  const onChangeValidator = useMemo(() => {
    if (onChangeValidatorProp) {
      return onChangeValidatorProp
    }
    if (validateContinuously && onBlurValidator) {
      return onBlurValidator
    }
    return undefined
  }, [onChangeValidatorProp, validateContinuously, onBlurValidator])

  const onChangeValidatorRef = useRef(onChangeValidator)
  useUpdateEffect(() => {
    onChangeValidatorRef.current = onChangeValidator
  }, [onChangeValidator])

  const onBlurValidatorRef = useRef(onBlurValidator)
  useUpdateEffect(() => {
    onBlurValidatorRef.current = onBlurValidator
  }, [onBlurValidator])

  // -- Schema compilation --

  const getAjvInstance = useCallback(() => {
    if (hasDataContext) {
      return getAjvInstanceDataContext?.()
    }

    return undefined
  }, [hasDataContext, getAjvInstanceDataContext])

  // Compile synchronously on first pass
  if (!schemaValidatorRef.current && finalSchema) {
    if (hasZodSchema) {
      schemaValidatorRef.current = createZodValidator(
        finalSchema as z.ZodSchema
      )
    } else {
      schemaValidatorRef.current = getAjvInstance()?.compile?.(finalSchema)
    }
  }

  // Update schema validator when schema changes
  useUpdateEffect(() => {
    if (finalSchema) {
      if (hasZodSchema) {
        schemaValidatorRef.current = createZodValidator(
          finalSchema as z.ZodSchema
        )
      } else {
        schemaValidatorRef.current =
          getAjvInstance()?.compile?.(finalSchema)
      }
    } else {
      schemaValidatorRef.current = undefined
    }
    validateValue()
  }, [finalSchema, hasZodSchema])

  // -- connectWithPath --

  const connectWithPathListenerRef = useRef(() => {
    runOnChangeValidator()
    runOnBlurValidator()
  })

  const handleConnectWithPath = useCallback(
    (path: Identifier) => {
      setFieldEventListener?.(
        path,
        'onPathChange',
        connectWithPathListenerRef.current
      )

      return {
        getValue: () => getValueByPath(path),
      }
    },
    [getValueByPath, setFieldEventListener]
  )

  // -- additionalArgs --

  const additionalArgsRef = useRef<
    Partial<ReceiveAdditionalEventArgs<Value>>
  >({
    validators: exportValidators,
    props,
    dataContext,
    getValueByPath,
    getSourceValue,
    setFieldEventListener,
  } as Partial<ReceiveAdditionalEventArgs<Value>>)
  additionalArgsRef.current.validators = exportValidators
  additionalArgsRef.current.props = props

  const additionalArgs = useMemo(() => {
    const args = {
      errorMessages: combinedErrorMessages,
      ...additionalArgsRef.current,
      connectWithPath: (path) => {
        return handleConnectWithPath(path)
      },
      connectWithItemPath: (itemPath) => {
        return handleConnectWithPath(makeIteratePath(itemPath))
      },
    } as ReceiveAdditionalEventArgs<Value>

    return args
  }, [combinedErrorMessages, handleConnectWithPath, makeIteratePath])

  // -- Validator execution --

  const callStackRef = useRef<Array<Validator<Value>>>([])

  const hasBeenCalledRef = useCallback((validator: Validator<Value>) => {
    const result = callStackRef.current.includes(validator)
    callStackRef.current.push(validator)
    return result
  }, [])

  const callValidatorFnAsync = useCallback(
    async (
      validator: Validator<Value>,
      value: Value = valueRef.current
    ): Promise<ReturnType<Validator<Value>>> => {
      if (typeof validator !== 'function') {
        return undefined
      }

      const result = await validator(value, additionalArgs)

      if (Array.isArray(result)) {
        const errors = []

        for (const validatorOrError of result) {
          if (validatorOrError instanceof Error) {
            errors.push(validatorOrError)
          } else if (!hasBeenCalledRef(validatorOrError)) {
            const result = await callValidatorFnAsync(
              validatorOrError,
              value
            )
            if (result instanceof Error) {
              callStackRef.current = []
              return result
            }
          }
        }

        if (errors.length > 0) {
          return new FormError('Error', {
            errors,
          })
        }

        callStackRef.current = []
      } else {
        return ensureErrorMessageObject(result)
      }
    },
    [additionalArgs, hasBeenCalledRef, ensureErrorMessageObject, valueRef]
  )

  const callValidatorFnSync = useCallback(
    (
      validator: Validator<Value>,
      value: Value = valueRef.current
    ): ReturnType<Validator<Value>> => {
      if (typeof validator !== 'function') {
        return undefined // stop here
      }

      const result = validator(value, additionalArgs)

      if (Array.isArray(result)) {
        const hasAsyncValidator = result.some((validator) =>
          isAsync(validator)
        )
        if (hasAsyncValidator) {
          return new Promise((resolve) => {
            callValidatorFnAsync(validator, value).then((result) => {
              resolve(result)
            })
          })
        }

        const hasMarkedAsyncValidator = result.some((validator) => {
          return hasAsyncValidatorBehavior(validator)
        })
        if (hasMarkedAsyncValidator) {
          return callValidatorFnAsync(
            (() => result) as Validator<Value>,
            value
          ) as ReturnType<Validator<Value>>
        }

        const errors = []

        for (const validatorOrError of result) {
          if (validatorOrError instanceof Error) {
            errors.push(validatorOrError)
          } else if (!hasBeenCalledRef(validatorOrError)) {
            const result = callValidatorFnSync(validatorOrError, value)
            if (result instanceof Error) {
              callStackRef.current = []
              return result
            }
          }
        }

        if (errors.length > 0) {
          return new FormError('Error', {
            errors,
          })
        }

        callStackRef.current = []
      } else {
        return ensureErrorMessageObject(result)
      }
    },
    [
      additionalArgs,
      callValidatorFnAsync,
      hasBeenCalledRef,
      ensureErrorMessageObject,
      valueRef,
    ]
  )

  // -- Validator cache --

  const validatorCacheRef = useRef({
    onChangeValidator: null,
    onBlurValidator: null,
  })

  // -- onChange validator orchestration --

  const onChangeValidationIdRef = useRef(0)
  const onBlurPathValidationIdRef = useRef(0)

  const revealOnChangeValidatorResult = useCallback(
    ({
      result,
      unchangedValue,
      runAsync,
      keepPendingForAsyncBehavior = false,
    }) => {
      if (unchangedValue) {
        persistErrorState(
          runAsync ? 'gracefully' : 'weak',
          'onChangeValidator',
          result
        )

        if (
          (validateInitially && !changedRef.current) ||
          validateUnchanged ||
          validateContinuously ||
          runAsync
        ) {
          window.requestAnimationFrame(() => {
            if (localErrorInitiatorRef.current === 'onChangeValidator') {
              revealError()
              forceUpdate()
            }
          })
        }
      }

      if (runAsync) {
        defineAsyncProcess(undefined)

        if (unchangedValue) {
          setFieldState(
            result instanceof Error
              ? 'error'
              : keepPendingForAsyncBehavior && asyncBehaviorIsEnabled
                ? 'pending'
                : 'complete'
          )
        } else {
          setFieldState('pending')
        }
      }
    },
    [
      asyncBehaviorIsEnabled,
      validateContinuously,
      defineAsyncProcess,
      persistErrorState,
      revealError,
      setFieldState,
      validateInitially,
      validateUnchanged,
      changedRef,
      localErrorInitiatorRef,
    ]
  )

  const callOnChangeValidator = useCallback(async () => {
    if (typeof onChangeValidatorRef.current !== 'function') {
      return {}
    }

    const validationId = ++onChangeValidationIdRef.current
    const tmpValue = valueRef.current
    const validationResult = isAsync(onChangeValidatorRef.current)
      ? callValidatorFnAsync(onChangeValidatorRef.current)
      : callValidatorFnSync(onChangeValidatorRef.current)
    const runAsync = validationResult instanceof Promise

    if (runAsync) {
      detectAsyncValidator()
      defineAsyncProcess('onChangeValidator')
      setFieldState('validating')
      hideError()
    }

    const result = ensureErrorMessageObject(
      runAsync ? await validationResult : validationResult
    )
    const isCurrent = validationId === onChangeValidationIdRef.current

    if (
      isCurrent &&
      (runAsync || hasAsyncValidatorBehavior(onChangeValidatorRef.current))
    ) {
      defineAsyncProcess(undefined)
      setFieldState(result instanceof Error ? 'error' : 'complete')
    }

    const unchangedValue = tmpValue === valueRef.current

    return { result, unchangedValue, runAsync, isCurrent }
  }, [
    callValidatorFnAsync,
    callValidatorFnSync,
    detectAsyncValidator,
    defineAsyncProcess,
    ensureErrorMessageObject,
    hideError,
    setFieldState,
    valueRef,
  ])

  const startOnChangeValidatorValidation = useCallback(
    async ({
      keepPendingForAsyncBehavior = false,
    }: {
      keepPendingForAsyncBehavior?: boolean
    } = {}) => {
      if (typeof onChangeValidatorRef.current !== 'function') {
        return undefined
      }

      const validationId = ++onChangeValidationIdRef.current
      const tmpValue = valueRef.current
      const validationResult = isAsync(onChangeValidatorRef.current)
        ? callValidatorFnAsync(onChangeValidatorRef.current)
        : callValidatorFnSync(onChangeValidatorRef.current)
      const runAsync = validationResult instanceof Promise

      if (runAsync) {
        if (!isAsync(onChangeValidatorRef.current)) {
          clearErrorState()
        }
        detectAsyncValidator()
        defineAsyncProcess('onChangeValidator')
        setFieldState('validating')
        hideError()
      }

      const result = ensureErrorMessageObject(
        runAsync ? await validationResult : validationResult
      )
      const isCurrent = validationId === onChangeValidationIdRef.current

      if (!isCurrent) {
        return { result: undefined, isCurrent }
      }

      if (
        !runAsync &&
        hasAsyncValidatorBehavior(onChangeValidatorRef.current)
      ) {
        defineAsyncProcess(undefined)
        setFieldState(result instanceof Error ? 'error' : 'complete')
      }

      const unchangedValue = tmpValue === valueRef.current

      revealOnChangeValidatorResult({
        result,
        unchangedValue,
        runAsync,
        keepPendingForAsyncBehavior,
      })

      return { result }
    },
    [
      callValidatorFnAsync,
      callValidatorFnSync,
      detectAsyncValidator,
      clearErrorState,
      defineAsyncProcess,
      ensureErrorMessageObject,
      hideError,
      revealOnChangeValidatorResult,
      setFieldState,
      valueRef,
    ]
  )

  const runOnChangeValidator = useCallback(async () => {
    if (!onChangeValidatorRef.current) {
      return undefined // stop here
    }

    const { result, unchangedValue, runAsync, isCurrent } =
      await callOnChangeValidator()

    if (!isCurrent) {
      return undefined // stop here
    }

    if (
      String(result) !==
      String(validatorCacheRef.current.onChangeValidator)
    ) {
      if (result) {
        revealOnChangeValidatorResult({
          result,
          unchangedValue,
          runAsync,
        })
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

  // -- onBlur validator orchestration --

  const callOnBlurValidator = useCallback(
    async ({
      overrideValue = null,
    }: {
      overrideValue?: Value
    } = {}) => {
      if (typeof onBlurValidatorRef.current !== 'function') {
        return {}
      }

      const validationId = ++onBlurPathValidationIdRef.current
      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        'onBlurValidator'
      )
      const validationResult = isAsync(onBlurValidatorRef.current)
        ? callValidatorFnAsync(onBlurValidatorRef.current, value)
        : callValidatorFnSync(onBlurValidatorRef.current, value)
      const runAsync = validationResult instanceof Promise

      if (runAsync) {
        detectAsyncValidator()
        defineAsyncProcess('onBlurValidator')
        setFieldState('validating')
      }

      const result = ensureErrorMessageObject(
        runAsync ? await validationResult : validationResult
      )
      const isCurrent = validationId === onBlurPathValidationIdRef.current

      if (
        isCurrent &&
        !runAsync &&
        hasAsyncValidatorBehavior(onBlurValidatorRef.current)
      ) {
        defineAsyncProcess(undefined)
        setFieldState(result instanceof Error ? 'error' : 'complete')
      }

      return { result, runAsync, isCurrent }
    },
    [
      callValidatorFnAsync,
      callValidatorFnSync,
      detectAsyncValidator,
      defineAsyncProcess,
      ensureErrorMessageObject,
      setFieldState,
      transformers,
      valueRef,
    ]
  )

  const revealOnBlurValidatorResult = useCallback(
    ({ result, runAsync = isAsync(onBlurValidatorRef.current) }) => {
      persistErrorState('gracefully', 'onBlurValidator', result)

      if (runAsync) {
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
        return undefined // stop here
      }

      if (
        (localErrorInitiatorRef.current === 'required' ||
          localErrorInitiatorRef.current === 'schema') &&
        !asyncBehaviorIsEnabled &&
        !hasAsyncValidatorBehavior(onChangeValidatorRef.current)
      ) {
        return undefined // stop here
      }

      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        'onBlurValidator'
      )
      const usesMarkedAsyncBehavior =
        !isAsync(onBlurValidatorRef.current) &&
        hasAsyncValidatorBehavior(onBlurValidatorRef.current)

      if (usesMarkedAsyncBehavior) {
        const validationResult = callValidatorFnSync(
          onBlurValidatorRef.current,
          value
        )
        const runAsync = validationResult instanceof Promise

        if (runAsync) {
          defineAsyncProcess('onBlurValidator')
          setFieldState('validating')
        }

        const result = ensureErrorMessageObject(
          runAsync ? await validationResult : validationResult
        )

        if (!runAsync) {
          defineAsyncProcess(undefined)
          setFieldState(result instanceof Error ? 'error' : 'complete')
        }

        revealOnBlurValidatorResult({ result, runAsync })

        return { result }
      }

      const validationResult = isAsync(onBlurValidatorRef.current)
        ? callValidatorFnAsync(onBlurValidatorRef.current, value)
        : callValidatorFnSync(onBlurValidatorRef.current, value)

      // Detect the Promise on the returned value instead of on the function,
      // the same way the onChangeValidator does
      const runAsync = validationResult instanceof Promise

      if (runAsync) {
        detectAsyncValidator()
        defineAsyncProcess('onBlurValidator')
        setFieldState('validating')
      }

      const result = runAsync ? await validationResult : validationResult

      revealOnBlurValidatorResult({ result, runAsync })

      return { result }
    },
    [
      asyncBehaviorIsEnabled,
      callValidatorFnAsync,
      callValidatorFnSync,
      detectAsyncValidator,
      defineAsyncProcess,
      ensureErrorMessageObject,
      revealOnBlurValidatorResult,
      setFieldState,
      localErrorInitiatorRef,
      transformers,
      valueRef,
    ]
  )

  const runOnBlurValidator = useCallback(async () => {
    if (!onBlurValidatorRef.current) {
      return undefined // stop here
    }

    const { result, runAsync, isCurrent } = await callOnBlurValidator()

    if (!isCurrent) {
      return undefined // stop here
    }

    if (
      String(result) !==
        String(validatorCacheRef.current.onBlurValidator) &&
      revealErrorRef.current
    ) {
      if (result) {
        revealOnBlurValidatorResult({ result, runAsync })
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

  // -- Schema prioritization --

  const prioritizeContextSchema = useMemo(() => {
    if (errorPrioritization) {
      const contextSchema = dataContextSchema

      if (isZodSchema(contextSchema)) {
        return errorPrioritization?.indexOf('contextSchema') === 0
      }

      const schemaPath = identifier.split('/').join('/properties/')
      const hasContextSchema = pointer.has(contextSchema || {}, schemaPath)
      return (
        hasContextSchema &&
        errorPrioritization?.indexOf('contextSchema') === 0
      )
    }

    return undefined
  }, [dataContextSchema, errorPrioritization, identifier])

  const prioritizeSectionSchema = useMemo(() => {
    return (
      errorPrioritization?.indexOf('sectionSchema') === 0 &&
      hasSectionSchema
    )
  }, [errorPrioritization, hasSectionSchema])

  // -- validateValue --

  const validateValue = useCallback(
    async ({
      keepPendingForAsyncBehavior = false,
    }: {
      keepPendingForAsyncBehavior?: boolean
    } = {}) => {
      const isProcessActive = startProcess()

      if (disabled) {
        if (isProcessActive()) {
          clearErrorState()
        }
        hideError()
        setFieldState(undefined)
        return undefined // stop here
      }

      const value = valueRef.current
      changeEventResultRef.current = null
      validatedValueRef.current = null
      let initiator: ErrorInitiator = null

      try {
        const requiredError = transformers.current.validateRequired(
          value,
          {
            emptyValue,
            required,
            isChanged: changedRef.current,
            error: new FormError('Field.errorRequired'),
          }
        )
        if (requiredError instanceof Error) {
          initiator = 'required'
          throw requiredError
        }

        if (error instanceof Error) {
          initiator = 'errorProp'
          throw error
        }

        // Validate by provided schema (AJV or Zod) for this value
        const skipLocalSchema =
          prioritizeContextSchema || prioritizeSectionSchema
        if (
          value !== undefined &&
          !skipLocalSchema &&
          typeof schemaValidatorRef.current === 'function'
        ) {
          const validationResult = schemaValidatorRef.current(value)
          if (validationResult !== true) {
            let error: FormError | undefined

            if (hasZodSchema) {
              const zodError = validationResult as z.ZodError<unknown>
              error = zodErrorsToOneFormError(zodError.issues)
            } else {
              error = getAjvInstance()?.ajvErrorsToOneFormError(
                (schemaValidatorRef.current as ValidateFunction).errors,
                value
              )
            }

            initiator = 'schema'
            throw error
          }
        }

        // Validate by provided derivative validator
        if (
          onChangeValidatorRef.current &&
          (changedRef.current || validateInitially || validateUnchanged)
        ) {
          const { result, isCurrent = true } =
            await startOnChangeValidatorValidation({
              keepPendingForAsyncBehavior,
            })

          if (!isCurrent) {
            return undefined // stop here
          }

          if (result instanceof Error) {
            initiator = 'onChangeValidator'
            throw result
          }
        }

        // Only for when "validateInitially" is set to true
        if (
          onBlurValidatorRef.current &&
          validateInitially &&
          !changedRef.current
        ) {
          const { result } = await startOnBlurValidatorProcess()

          if (result instanceof Error) {
            initiator = 'onBlurValidator'
            throw result
          }
        }

        if (isProcessActive()) {
          clearErrorState()
        }

        validatedValueRef.current = value
      } catch (error) {
        if (isProcessActive()) {
          if (
            asyncProcessRef.current ||
            hasAsyncValidatorBehavior(onChangeValidatorRef.current) ||
            hasAsyncValidatorBehavior(onBlurValidatorRef.current)
          ) {
            onChangeValidationIdRef.current++
            onBlurPathValidationIdRef.current++
            defineAsyncProcess(undefined)
            setFieldState('error')
          }

          persistErrorState('weak', initiator, error as Error | FormError)

          if (validateContinuously && changedRef.current) {
            revealError()
          }
        }
      }
    },
    [
      clearErrorState,
      disabled,
      emptyValue,
      error,
      hasZodSchema,
      hideError,
      persistErrorState,
      prioritizeContextSchema,
      prioritizeSectionSchema,
      required,
      revealError,
      setFieldState,
      startOnBlurValidatorProcess,
      startOnChangeValidatorValidation,
      startProcess,
      validateInitially,
      validateContinuously,
      validateUnchanged,
      valueRef,
      changedRef,
      changeEventResultRef,
      validatedValueRef,
      transformers,
      schemaValidatorRef,
    ]
  )

  // Update connectWithPathListenerRef when validators change
  connectWithPathListenerRef.current = () => {
    runOnChangeValidator()
    runOnBlurValidator()
  }

  return {
    validateValue,
    startOnChangeValidatorValidation,
    startOnBlurValidatorProcess,
    runOnChangeValidator,
    runOnBlurValidator,
    callOnBlurValidator,
    handleConnectWithPath,
    onChangeValidator,
    onChangeValidatorRef,
    onBlurValidatorRef,
    additionalArgs,
  }
}
