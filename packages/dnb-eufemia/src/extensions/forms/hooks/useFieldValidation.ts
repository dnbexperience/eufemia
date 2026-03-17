import { useRef, useCallback, useMemo } from 'react'
import type { ValidateFunction } from 'ajv/dist/2020.js'
import {
  FormError,
  isZodSchema,
  createZodValidator,
  zodErrorsToOneFormError,
} from '../utils'
import { ajvErrorsToOneFormError } from '../utils/ajvErrors'
import type * as z from 'zod'
import type {
  FieldPropsGeneric,
  ReceiveAdditionalEventArgs,
  Validator,
  Identifier,
} from '../types'
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
  getAjvInstanceDataContext: () => {
    compile: (schema: unknown) => ValidateFunction
  }
  setFieldEventListener: (
    identifier: Identifier,
    event: string,
    fn: () => void
  ) => void
  getValueByPath: (path: string) => unknown
  getSourceValue: (path: string) => unknown
  exportValidators: unknown
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
  valueRef: React.RefObject<Value>
  changedRef: React.RefObject<boolean>
  transformers: React.RefObject<TransformerFns<Value>>
  schemaValidatorRef: React.RefObject<
    ValidateFunction | ((value: unknown) => true | z.ZodError<unknown>)
  >
  asyncProcessRef: React.RefObject<AsyncProcesses | null>
  validatedValueRef: React.RefObject<Value>
  changeEventResultRef: React.RefObject<unknown>
  localErrorInitiatorRef: React.RefObject<ErrorInitiator>

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
  revealErrorRef: React.RefObject<boolean | null>
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
  additionalArgsRef.current.validators = exportValidators as any
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
        return
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
        return // stop here
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

  const revealOnChangeValidatorResult = useCallback(
    ({ result, unchangedValue }) => {
      const runAsync = isAsync(onChangeValidatorRef.current)

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
          setFieldState(result instanceof Error ? 'error' : 'complete')
        } else {
          setFieldState('pending')
        }
      }
    },
    [
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

    const tmpValue = valueRef.current

    let result = isAsync(onChangeValidatorRef.current)
      ? await callValidatorFnAsync(onChangeValidatorRef.current)
      : callValidatorFnSync(onChangeValidatorRef.current)
    if (result instanceof Promise) {
      result = await result
    }

    const unchangedValue = tmpValue === valueRef.current
    return { result, unchangedValue }
  }, [callValidatorFnAsync, callValidatorFnSync, valueRef])

  const startOnChangeValidatorValidation = useCallback(async () => {
    if (typeof onChangeValidatorRef.current !== 'function') {
      return
    }

    if (isAsync(onChangeValidatorRef.current)) {
      defineAsyncProcess('onChangeValidator')
      setFieldState('validating')
      hideError()
    }

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
    valueRef,
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

      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        'onBlurValidator'
      )

      let result = isAsync(onBlurValidatorRef.current)
        ? await callValidatorFnAsync(onBlurValidatorRef.current, value)
        : callValidatorFnSync(onBlurValidatorRef.current, value)
      if (result instanceof Promise) {
        result = await result
      }

      return { result }
    },
    [callValidatorFnAsync, callValidatorFnSync, transformers, valueRef]
  )

  const revealOnBlurValidatorResult = useCallback(
    ({ result }) => {
      persistErrorState('gracefully', 'onBlurValidator', result)

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
        return // stop here
      }

      if (
        (localErrorInitiatorRef.current === 'required' ||
          localErrorInitiatorRef.current === 'schema') &&
        !asyncBehaviorIsEnabled &&
        !isAsync(onChangeValidatorRef.current)
      ) {
        return // stop here
      }

      if (isAsync(onBlurValidatorRef.current)) {
        defineAsyncProcess('onBlurValidator')
        setFieldState('validating')
      }

      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        'onBlurValidator'
      )

      let result = isAsync(onBlurValidatorRef.current)
        ? await callValidatorFnAsync(onBlurValidatorRef.current, value)
        : callValidatorFnSync(onBlurValidatorRef.current, value)
      if (result instanceof Promise) {
        result = await result
      }

      revealOnBlurValidatorResult({ result })

      return { result }
    },
    [
      asyncBehaviorIsEnabled,
      callValidatorFnAsync,
      callValidatorFnSync,
      defineAsyncProcess,
      revealOnBlurValidatorResult,
      setFieldState,
      localErrorInitiatorRef,
      transformers,
      valueRef,
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
  }, [dataContextSchema, errorPrioritization, identifier])

  const prioritizeSectionSchema = useMemo(() => {
    return (
      errorPrioritization?.indexOf('sectionSchema') === 0 &&
      hasSectionSchema
    )
  }, [errorPrioritization, hasSectionSchema])

  // -- validateValue --

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
    validatedValueRef.current = null
    let initiator: ErrorInitiator = null

    try {
      const requiredError = transformers.current.validateRequired(value, {
        emptyValue,
        required,
        isChanged: changedRef.current,
        error: new FormError('Field.errorRequired'),
      })
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
            error = ajvErrorsToOneFormError(
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
        const { result } = await startOnChangeValidatorValidation()

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
        persistErrorState('weak', initiator, error)

        if (validateContinuously && changedRef.current) {
          revealError()
        }
      }
    }
  }, [
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
  ])

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
