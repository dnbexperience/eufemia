import React, {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useReducer,
  AriaAttributes,
} from 'react'
import pointer from '../utils/json-pointer'
import { ValidateFunction } from 'ajv/dist/2020'
import {
  ajvErrorsToOneFormError,
  errorChanged,
  overwriteErrorMessagesWithGivenAjvKeys,
  extendErrorMessagesWithTranslationMessages,
  FormError,
} from '../utils'
import {
  FieldPropsGeneric,
  ProvideAdditionalEventArgs,
  SubmitState,
  EventReturnWithStateObjectAndSuccess,
  EventStateObjectWithSuccess,
  ReceiveAdditionalEventArgs,
  Validator,
  Identifier,
  MessageProp,
  MessageTypes,
  MessagePropParams,
  UseFieldProps,
  ErrorProp,
} from '../types'
import { Context as DataContext, ContextState } from '../DataContext'
import { clearedData } from '../DataContext/Provider/Provider'
import FieldProviderContext from '../Field/Provider/FieldProviderContext'
import {
  combineDescribedBy,
  convertJsxToString,
  warn,
} from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import useUpdateEffect from '../../../shared/helpers/useUpdateEffect'
import FieldBlockContext, {
  FieldBlockContextProps,
} from '../FieldBlock/FieldBlockContext'
import IterateItemContext from '../Iterate/IterateItemContext'
import SectionContext from '../Form/Section/SectionContext'
import FieldBoundaryContext from '../DataContext/FieldBoundary/FieldBoundaryContext'
import VisibilityContext from '../Form/Visibility/VisibilityContext'
import WizardContext from '../Wizard/Context'
import WizardStepContext from '../Wizard/Step/StepContext'
import SnapshotContext from '../Form/Snapshot/SnapshotContext'
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

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

type SubmitStateWithValidating = SubmitState | 'validating'
type AsyncProcesses =
  | 'onChangeValidator'
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
type ErrorInitiator =
  | 'required'
  | 'schema'
  | 'errorProp'
  | 'onChangeValidator'
  | 'onBlurValidator'
  | 'dataContextError'
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
  localProps: Props & FieldPropsGeneric<Value, EmptyValue>,
  {
    executeOnChangeRegardlessOfError = false,
    updateContextDataInSync = false,
    omitMultiplePathWarning = false,
    forceUpdateWhenContextDataIsSet = false,
    omitSectionPath = false,
  } = {}
): typeof localProps & ReturnAdditional<Value> {
  const { extend } = useContext(FieldProviderContext)
  const props = extend(localProps)

  const {
    path: pathProp,
    value: valueProp,
    defaultValue,
    itemPath,
    emptyValue,
    required: requiredProp,
    disabled: disabledProp,
    info: infoProp,
    warning: warningProp,
    error: initialErrorProp = 'initial',
    errorMessages,
    onFocus,
    onBlur,
    onChange,
    onBlurValidator,
    // Deprecated – can be removed in v11
    validator,
    onChangeValidator = validator,
    exportValidators,
    schema,
    validateInitially,
    validateUnchanged,
    // Deprecated – can be removed in v11
    continuousValidation,
    validateContinuously = continuousValidation,
    transformIn = (external: unknown) => external as Value,
    transformOut = (internal: Value) => internal,
    toInput = (value: Value) => value,
    fromInput = (value: Value) => value,
    toEvent = (value: Value) => value,
    transformValue = (value: Value) => value,
    provideAdditionalArgs = (
      value: Value,
      additionalArgs: ProvideAdditionalEventArgs
    ) => additionalArgs,
    fromExternal = (value: Value) => value,
    validateRequired = (value, { emptyValue, required, error }) => {
      if (
        required &&
        ((value as unknown) === emptyValue ||
          (typeof emptyValue === 'undefined' && value === ''))
      ) {
        return error
      }
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
  const iterateItemContext = useContext(IterateItemContext)
  const sectionContext = useContext(SectionContext)
  const fieldBoundaryContext = useContext(FieldBoundaryContext)
  const wizardContext = useContext(WizardContext)
  const wizardStepContext = useContext(WizardStepContext)
  const { setMountedField: setMountedFieldSnapshot } =
    useContext(SnapshotContext) || {}
  const { isVisible, keepInDOM } = useContext(VisibilityContext) || {}
  const handleFieldAsVisible = isVisible || keepInDOM

  const { getValueByPath, getSourceValue } = useDataValue()
  const translation = useTranslation()
  const { formatMessage } = translation
  const translationRef = useRef(translation)
  translationRef.current = translation

  const transformers = useRef({
    transformIn,
    transformOut,
    provideAdditionalArgs,
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
    setFieldInternals: setFieldInternalsDataContext,
    setFieldConnection: setFieldConnectionDataContext,
    revealError: revealErrorDataContext,
    setMountedFieldState: setMountedFieldStateDataContext,
    setFieldEventListener,
    errors: dataContextErrors,
    showAllErrors,
    contextErrorMessages,
    fieldDisplayValueRef,
    existingFieldsRef,
    fieldInternalsRef,
    prerenderFieldProps,
  } = dataContext || {}
  const onChangeContext = dataContext?.props?.onChange

  const disabled = disabledProp ?? props.readOnly
  const inFieldBlock = Boolean(
    fieldBlockContext && fieldBlockContext.disableStatusSummary !== true
  )
  const {
    setBlockRecord,
    setFieldState: setFieldStateFieldBlock,
    showFieldError: showFieldErrorFieldBlock,
    mountedFieldsRef: mountedFieldsRefFieldBlock,
  } = (inFieldBlock ? fieldBlockContext : {}) as FieldBlockContextProps
  const {
    activeIndex,
    activeIndexRef,
    setFieldError: setFieldErrorWizard,
  } = wizardContext || {}
  const { index: wizardIndex } = wizardStepContext || {}
  const {
    handleChange: handleChangeIterateContext,
    index: iterateIndex,
    arrayValue: iterateArrayValue,
    nestedIteratePath,
  } = iterateItemContext || {}
  const { path: sectionPath, errorPrioritization } = sectionContext || {}
  const {
    setFieldError: setFieldErrorBoundary,
    revealError: revealErrorBoundary,
    showBoundaryErrors,
  } = fieldBoundaryContext || {}

  const hasPath = Boolean(pathProp)
  const hasItemPath = Boolean(itemPath)
  const { path, identifier, makeIteratePath, joinPath, cleanPath } =
    usePath({
      id,
      path: pathProp,
      itemPath,
      omitSectionPath,
    })

  const defaultValueRef = useRef(defaultValue)
  useLayoutEffect(() => {
    // To support React.StrictMode, we also need to add it from inside a useEffect
    defaultValueRef.current = defaultValue
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const tmpValue = useExternalValue<Value>({
    path: identifier,
    itemPath,
    value: valueProp,
    transformers,
    emptyValue: defaultValue ? undefined : emptyValue,
  })
  const externalValueDeps = tmpValue
  const externalValue = transformers.current.transformIn(
    tmpValue ?? defaultValueRef.current
  )

  // Many variables are kept in refs to avoid triggering unnecessary update loops because updates using
  // useEffect depend on them (like the external `value`)

  // Hold an internal copy of the input value in case the input component is used uncontrolled,
  // and to handle errors in Eufemia on components that does not take updated callback functions into account.
  const valueRef = useRef<Value>(externalValue)
  const changedRef = useRef<boolean>()
  const hasFocusRef = useRef<boolean>()

  // - Should errors received through validation be shown initially. Assume that providing a direct prop to
  // the component means it is supposed to be shown initially.
  const revealErrorRef = useRef<boolean>(null)

  const required = useMemo(() => {
    if (typeof requiredProp !== 'undefined') {
      return requiredProp
    }

    if (schema || dataContext?.schema) {
      const paths = identifier.split('/')
      if (paths.length > 0) {
        const requiredInSchema = [schema?.['required']]

        // - Handle context schema
        if (paths.length > 1) {
          const schema = dataContext.schema
          const pathWithoutLast = paths.slice(0, -1).join('/properties/')
          const schemaPart = pointer.has(schema, pathWithoutLast)
            ? pointer.get(schema, pathWithoutLast)
            : schema

          const requiredSchemaList = schemaPart?.['required']
          if (Array.isArray(requiredSchemaList)) {
            const rootPath = pathWithoutLast.replace(/properties\//g, '')
            const requiredList = requiredSchemaList.map((path) => {
              path = cleanPath('/' + path)
              return sectionPath && path.startsWith(sectionPath)
                ? path
                : joinPath([sectionPath || rootPath, path])
            })
            requiredInSchema.push(requiredList)
          }
        }

        const collected = requiredInSchema
          .flatMap((value) => value)
          .filter(Boolean)

        if (
          collected.filter(Boolean).some((path) => {
            path = cleanPath('/' + path)
            return identifier === path || sectionPath === path
          })
        ) {
          return true
        }
      }
    }
  }, [
    cleanPath,
    dataContext.schema,
    identifier,
    joinPath,
    requiredProp,
    schema,
    sectionPath,
  ])

  const getFieldByPath: MessagePropParams<
    Value,
    unknown
  >['getFieldByPath'] = useCallback(
    (path) => {
      return (
        fieldInternalsRef.current?.[path] || {
          props: undefined,
          id: undefined,
        }
      )
    },
    [fieldInternalsRef]
  )

  const errorMessageCacheRef = useRef<Map<string, ErrorProp<Value>>>(
    new Map()
  )
  const ensureErrorMessageObject = useCallback(<T>(error: T): T => {
    let key = null
    let returnValue: T | ErrorProp<Value> = error

    if (typeof error === 'string') {
      key = error
      returnValue = new Error(error)
    } else if (error && React.isValidElement(error)) {
      key = error.key || convertJsxToString(error)
      returnValue = new FormError('Error', {
        formattedMessage: error,
      })
    }

    // - Cache jsx errors to avoid rendering/infinite loop
    if (key) {
      if (errorMessageCacheRef.current.has(key)) {
        return errorMessageCacheRef.current.get(key) as T
      } else {
        errorMessageCacheRef.current.set(
          key,
          returnValue as ErrorProp<Value>
        )
      }
    }

    return returnValue as T
  }, [])

  const messageCacheRef = useRef<{
    isSet: boolean
    message: MessageTypes<Value>
  }>({ isSet: false, message: undefined })
  const executeMessage = useCallback(
    <ReturnValue extends MessageTypes<Value>>(
      message: MessageProp<Value, ReturnValue>,
      forceReturnErrorMessageObject?: boolean
    ): ReturnValue => {
      if (typeof message === 'function') {
        const ALWAYS = 4
        const INITIALLY = 8

        let currentMode = ALWAYS

        const msg = message(valueRef.current, {
          conditionally: (callback, options) => {
            currentMode &= ~ALWAYS

            if (options?.showInitially) {
              currentMode |= INITIALLY
            }

            return executeMessage(callback())
          },
          getValueByPath,
          getFieldByPath,
        })

        if (msg === undefined) {
          messageCacheRef.current.message = undefined
          return null // hide the message
        }

        const isError =
          msg instanceof Error ||
          msg instanceof FormError ||
          (Array.isArray(msg) && checkForError(msg))

        if (
          (!messageCacheRef.current.isSet && currentMode & INITIALLY) ||
          currentMode & ALWAYS ||
          hasFocusRef.current === false ||
          // Ensure we don't remove the message when the value is e.g. empty string
          messageCacheRef.current.message
        ) {
          if (
            // Ensure to only update the message when component did re-render internally
            isInternalRerenderRef.current ||
            currentMode & ALWAYS ||
            (!messageCacheRef.current.isSet && currentMode & INITIALLY)
          ) {
            if (msg) {
              messageCacheRef.current.isSet = true
            }
            if (msg || !hasFocusRef.current || currentMode & ALWAYS) {
              messageCacheRef.current.message = msg
            }
          }

          message = messageCacheRef.current.message as ReturnValue

          if (isError && message) {
            revealErrorRef.current = true
          }

          if (!isError && !message) {
            return null // hide the message
          }
        } else {
          return undefined // no message
        }
      }

      return forceReturnErrorMessageObject
        ? ensureErrorMessageObject(message)
        : message
    },
    [getFieldByPath, getValueByPath, ensureErrorMessageObject]
  )

  const errorProp =
    initialErrorProp === 'initial' ? undefined : initialErrorProp
  const error = executeMessage<UseFieldProps['error'] | 'initial'>(
    errorProp,
    true
  )
  const warning = executeMessage<UseFieldProps['warning']>(warningProp)
  const info = executeMessage<UseFieldProps['info']>(infoProp)

  if (revealErrorRef.current === null) {
    revealErrorRef.current = validateInitially ?? Boolean(errorProp)
  }

  // - Local errors are errors based on validation instructions received by
  const errorMethodRef = useRef<
    Partial<Record<PersistErrorStateMethod, Error | FormError>>
  >({})
  const localErrorRef = useRef<Error | FormError | undefined>()
  const localErrorInitiatorRef = useRef<ErrorInitiator>()

  // - Context errors are from outer contexts, like validation for this field as part of the whole data set
  const contextErrorRef = useRef<Error | FormError | undefined>()

  const onChangeValidatorRef = useRef(onChangeValidator)
  useUpdateEffect(() => {
    onChangeValidatorRef.current = onChangeValidator
  }, [onChangeValidator]) // Tobias, will this still work? now that we do onChangeValidator = validator?
  const onBlurValidatorRef = useRef(onBlurValidator)
  useUpdateEffect(() => {
    onBlurValidatorRef.current = onBlurValidator
  }, [onBlurValidator])

  const schemaValidatorRef = useRef<ValidateFunction>()
  if (!schemaValidatorRef.current && schema) {
    schemaValidatorRef.current = dataContext.ajvInstance?.compile(schema)
  }

  // - Async behavior
  const asyncBehaviorIsEnabled = useMemo(() => {
    return isAsync(onChange) || isAsync(onChangeContext)
  }, [onChangeContext, onChange])
  const validatedValueRef = useRef<Value>()
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
    onChangeValidator: null,
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
      if (!eventPool.current[key]) {
        continue
      }

      const { fn, runAsync } = eventPool.current[key] || {}
      if (fn) {
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
      setFieldStateDataContext?.(identifier, resolveValidatingState(state))
      setFieldStateFieldBlock?.(identifier, resolveValidatingState(state))

      if (!validateInitially) {
        forceUpdate()
      }
    },
    [
      setFieldStateDataContext,
      identifier,
      setFieldStateFieldBlock,
      validateInitially,
    ]
  )

  const setErrorState = useCallback(
    (hasError: boolean) => {
      setFieldErrorWizard?.(
        wizardIndex,
        identifier,
        handleFieldAsVisible !== false ? hasError : undefined
      )

      showFieldErrorFieldBlock?.(identifier, hasError)
      revealErrorBoundary?.(identifier, hasError)
      revealErrorDataContext?.(identifier, hasError)
    },
    [
      identifier,
      handleFieldAsVisible,
      revealErrorBoundary,
      revealErrorDataContext,
      setFieldErrorWizard,
      showFieldErrorFieldBlock,
      wizardIndex,
    ]
  )

  // - Will reveal the error as a visible error (hasVisibleError)
  const revealError = useCallback(() => {
    // To support "validateInitially={false}" prop, we need to make sure that the error is not shown initially
    if (validateInitially === false && revealErrorRef.current === false) {
      revealErrorRef.current = undefined
      return // stop here
    }

    const hasError = Boolean(localErrorRef.current)
    revealErrorRef.current = true
    setErrorState(hasError)
  }, [validateInitially, setErrorState])

  const hideError = useCallback(() => {
    if (revealErrorRef.current) {
      revealErrorRef.current = undefined
      setErrorState(false)
    }
  }, [setErrorState])

  const errorMessagesCacheRef = useRef({
    errorMessages: null,
    extendedErrorMessages: null,
  })
  const combinedErrorMessages = useMemo(() => {
    // Compare the error messages with the previous ones,
    // in case "errorMessages" is not wrapped in useMemo.
    const cache = errorMessagesCacheRef.current
    if (
      errorMessages &&
      cache.extendedErrorMessages &&
      // We compare the "errorMessages" object with the cached version.
      // Ideally, this comparison would be unnecessary when using useMemo, as documented.
      // However, to safeguard against potential infinite loops, we perform this comparison.
      // Why can this happen? Because the "errorMessages" object is a reference, and when provided without useMemo,
      // it will come in as a new object every time it is used, so combinedErrorMessages as a hook dependency will be updated.
      // Using array.join('') is approximately twice as fast as concatenating strings in a loop.
      Object.values(cache.errorMessages || {}).join('') ===
        Object.values(errorMessages || {}).join('')
    ) {
      return cache.extendedErrorMessages
    }

    const messages = {
      ...contextErrorMessages,
      ...contextErrorMessages?.[identifier],
      ...errorMessages,
    }

    const extendedErrorMessages =
      extendErrorMessagesWithTranslationMessages(
        overwriteErrorMessagesWithGivenAjvKeys(messages),
        translationRef.current
      )

    errorMessagesCacheRef.current = {
      errorMessages,
      extendedErrorMessages,
    }

    return extendedErrorMessages
  }, [contextErrorMessages, errorMessages, identifier])

  /**
   * Prepare error from validation logic with correct error messages based on props
   */
  const prepareError = useCallback(
    (error: FieldPropsGeneric<Value>['error']): FormError | undefined => {
      const prepare = (error: FormError) => {
        if (error instanceof FormError) {
          let message = error.message

          const { ajvKeyword } = error
          if (typeof ajvKeyword === 'string') {
            const ajvMessage = combinedErrorMessages?.[ajvKeyword]
            if (ajvMessage) {
              message = ajvMessage
            }
          }

          /** @deprecated – can be removed in v11 */
          const { validationRule } = error
          if (typeof validationRule === 'string') {
            const ajvMessage = combinedErrorMessages?.[validationRule]
            if (ajvMessage) {
              message = ajvMessage
            }
          }

          if (combinedErrorMessages?.[message]) {
            // - For when the message is e.g. Field.errorRequired or Custom.key, but delivered in the `errorMessages` object
            message = combinedErrorMessages?.[message]

            if (error.messageValues) {
              message = Object.entries(error.messageValues || {}).reduce(
                (msg, [key, value]) => {
                  return msg.replace(`{${key}}`, value)
                },
                message
              )
            }
          } else if (message.includes('.')) {
            // - For when the message is e.g. Field.errorRequired
            message = formatMessage(message, error.messageValues)
          }

          if (React.isValidElement(message)) {
            error.formattedMessage = message
          } else {
            error.message = message
          }
        }

        return ensureErrorMessageObject(error)
      }

      if (Array.isArray(error)) {
        return new FormError('Error', {
          errors: error.map(prepare),
        })
      }

      if (error instanceof FormError) {
        if (Array.isArray(error.errors)) {
          error.errors = error.errors.map(prepare)
          return error
        }
        return prepare(error)
      }

      return error as FormError
    },
    [combinedErrorMessages, ensureErrorMessageObject, formatMessage]
  )

  contextErrorRef.current = useMemo(() => {
    const dataContextError = dataContextErrors?.[identifier]
    if (!dataContextError) {
      return undefined
    }
    const error = prepareError(dataContextError)
    if (errorChanged(error, contextErrorRef.current)) {
      return error
    }
    return contextErrorRef.current
  }, [dataContextErrors, identifier, prepareError])

  // If the error is a type error, we want to show it even if the field has not been used
  if (localErrorRef.current?.['ajvKeyword'] === 'type') {
    revealErrorRef.current = true
  }

  const getBufferedError = useCallback(() => {
    if (
      initialErrorProp !== 'initial' &&
      typeof errorProp !== 'function'
    ) {
      return prepareError(errorProp)
    } else if (revealErrorRef.current) {
      return (
        prepareError(error as FormError) ??
        localErrorRef.current ??
        contextErrorRef.current
      )
    } else if (error === null) {
      return null
    }
  }, [error, errorProp, initialErrorProp, prepareError])

  const bufferedError = getBufferedError()

  const errorIsVisible =
    Boolean(bufferedError) ||
    (inFieldBlock && fieldBlockContext.hasErrorProp)
  const hasError = useCallback(() => {
    return Boolean(
      error ?? localErrorRef.current ?? contextErrorRef.current
    )
  }, [error])

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

  const additionalArgsRef = useRef<
    Partial<ReceiveAdditionalEventArgs<Value>>
  >({
    validators: exportValidators,
    props,
    dataContext,
    getValueByPath,
    getSourceValue,
    setFieldEventListener,
  })
  additionalArgsRef.current.validators = exportValidators
  additionalArgsRef.current.props = props
  const additionalArgs = useMemo(() => {
    const args: ReceiveAdditionalEventArgs<Value> = {
      /** Deprecated – can be removed in v11 */
      ...combinedErrorMessages,

      errorMessages: combinedErrorMessages,
      ...additionalArgsRef.current,
      connectWithPath: (path) => {
        return handleConnectWithPath(path)
      },
      connectWithItemPath: (itemPath) => {
        return handleConnectWithPath(makeIteratePath(itemPath))
      },
    }

    return args
  }, [combinedErrorMessages, handleConnectWithPath, makeIteratePath])

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
    [additionalArgs, hasBeenCalledRef, ensureErrorMessageObject]
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
    ]
  )

  /**
   * Based on validation, update error state, locally and relevant surrounding contexts
   */
  const stateId = useId()
  const persistErrorState = useCallback(
    (
      method: PersistErrorStateMethod,
      initiator: ErrorInitiator,
      errorArg:
        | Error
        | FormError
        | Array<Error | FormError>
        | undefined = undefined
    ) => {
      const error = prepareError(errorArg)

      if (!errorChanged(error, localErrorRef.current)) {
        // In case different triggers lead to validation with no changes in the result (like still no error, or the same error),
        // avoid unnecessary re-renders by letting the old error object stay in the state and skip re-rendering.
        return
      }

      if (initiator !== 'dataContextError') {
        localErrorInitiatorRef.current = initiator
      }

      if (method === 'wipe') {
        errorMethodRef.current = {}
      } else {
        errorMethodRef.current[method] = error
      }

      if (
        !error &&
        method === 'gracefully' &&
        (errorMethodRef.current?.weak ||
          errorMethodRef.current?.gracefully)
      ) {
        // If the error is removed, we need to check if there are other errors that still should be shown
        return
      }

      const currentError =
        handleFieldAsVisible !== false ? error : undefined
      localErrorRef.current = currentError

      // Tell the data context about the error, so it can stop the user from submitting the form until the error has been fixed
      setFieldErrorDataContext?.(identifier, currentError)
      setFieldErrorBoundary?.(identifier, currentError)

      // Set the visual states
      setBlockRecord?.({
        stateId,
        identifier,
        type: 'error',
        content: currentError,
        showInitially: Boolean(inFieldBlock && validateInitially),
      })
      setFieldStateDataContext?.(identifier, error ? 'error' : undefined)

      if (updateContextDataInSync) {
        setFieldErrorWizard?.(
          wizardIndex,
          identifier,
          Boolean(currentError)
        )
      }

      forceUpdate()
    },
    [
      handleFieldAsVisible,
      identifier,
      inFieldBlock,
      prepareError,
      setBlockRecord,
      setFieldErrorBoundary,
      setFieldErrorDataContext,
      setFieldErrorWizard,
      setFieldStateDataContext,
      stateId,
      updateContextDataInSync,
      validateInitially,
      wizardIndex,
    ]
  )

  const clearErrorState = useCallback(() => {
    persistErrorState('wipe', undefined)
    localErrorInitiatorRef.current = undefined
    if (Array.isArray(schemaValidatorRef.current?.errors)) {
      schemaValidatorRef.current.errors = []
    }
  }, [persistErrorState])

  const setChanged = useCallback((state: boolean) => {
    changedRef.current = state
  }, [])

  const validatorCacheRef = useRef({
    onChangeValidator: null,
    onBlurValidator: null,
  })

  const revealOnChangeValidatorResult = useCallback(
    ({ result, unchangedValue }) => {
      const runAsync = isAsync(onChangeValidatorRef.current)

      // Don't show the error if the value has changed in the meantime
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
          runAsync // Because it's a better UX to show the error when the validation is async/delayed
        ) {
          // Because we first need to throw the error to be able to display it, we delay the showError call
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
      defineAsyncProcess('onChangeValidator')
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
        !asyncBehaviorIsEnabled && // Has async "onChange" event
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

      return { result }
    },
    [
      asyncBehaviorIsEnabled,
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

      // Validate by provided JSON Schema for this value
      if (
        value !== undefined &&
        !prioritizeContextSchema &&
        typeof schemaValidatorRef.current === 'function'
      ) {
        if (!schemaValidatorRef.current(value)) {
          const error = ajvErrorsToOneFormError(
            schemaValidatorRef.current.errors,
            value
          )
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
      }
    }
  }, [
    clearErrorState,
    disabled,
    emptyValue,
    error,
    hideError,
    persistErrorState,
    prioritizeContextSchema,
    required,
    setFieldState,
    startOnBlurValidatorProcess,
    startOnChangeValidatorValidation,
    startProcess,
    validateInitially,
    validateUnchanged,
  ])

  const removeError = useCallback(() => {
    // Mark as not changed,
    // so the field is considered "fresh" when the user starts typing again.
    setChanged(false)

    // Hide the error message.
    hideError()

    // Remove the local error states.
    clearErrorState()

    // To ensure this field will report back to the context if there are any errors.
    validateValue()
  }, [clearErrorState, hideError, setChanged, validateValue])

  const handleError = useCallback(() => {
    if (
      validateContinuously ||
      (validateContinuously !== false && !hasFocusRef.current)
    ) {
      // When there is a change to the value without there having been any focus callback beforehand, it is likely
      // to believe that the blur callback will not be called either, which would trigger the display of the error.
      // The error is therefore displayed immediately (unless instructed not to with validateContinuously set to false).
      revealError()
    } else {
      // When changing the value, hide errors to avoid annoying the user before they are finished filling in that value
      hideError()
    }
  }, [validateContinuously, hideError, revealError])

  const getEventArgs = useCallback(
    ({
      eventName,
      additionalArgs,
      overrideValue = undefined,
    }): [Value] | [Value, ProvideAdditionalEventArgs] => {
      const value = transformers.current.toEvent(
        overrideValue ?? valueRef.current,
        eventName
      )
      const args = transformers.current.provideAdditionalArgs(
        value,
        additionalArgs
      )
      const transformedValue = transformers.current.transformOut(
        value,
        args
      ) as Value

      if (typeof args !== 'undefined') {
        return [transformedValue, args]
      }

      return [transformedValue]
    },
    []
  )

  const setHasFocus = useCallback(
    async (
      hasFocus: boolean,
      overrideValue?: Value,
      localAdditionalArgs?: ProvideAdditionalEventArgs
    ) => {
      const args = getEventArgs({
        eventName: hasFocus ? 'onFocus' : 'onBlur',
        overrideValue,
        additionalArgs: localAdditionalArgs
          ? { ...additionalArgs, ...localAdditionalArgs }
          : additionalArgs,
      })

      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        onFocus?.apply(this, args)
        setMountedFieldStateDataContext(identifier, {
          isFocused: true,
        })
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        onBlur?.apply(this, args)
        setMountedFieldStateDataContext(identifier, {
          isFocused: false,
        })

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
      getEventArgs,
      additionalArgs,
      onFocus,
      setMountedFieldStateDataContext,
      identifier,
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
                hasValue === validatedValueRef.current

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
      changeEventResultRef.current || ({} as EventStateObjectWithSuccess)

    if ('error' in result) {
      if (!result.error) {
        removeError()
      } else {
        persistErrorState('gracefully', 'onChangeValidator', result.error)
        revealError()
      }
    }
    if ('warning' in result) {
      warningRef.current = result.warning
    }
    if ('info' in result) {
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

    forceUpdate()
  }, [
    asyncBehaviorIsEnabled,
    defineAsyncProcess,
    removeError,
    persistErrorState,
    revealError,
    yieldAsyncProcess,
    setFieldState,
  ])

  const setEventResult = useCallback(
    async (result: EventReturnWithStateObjectAndSuccess) => {
      if (result instanceof Error) {
        result = { error: result }
      }
      changeEventResultRef.current = {
        ...changeEventResultRef.current,
        ...result,
      } as EventStateObjectWithSuccess

      await handleChangeEventResult()
    },
    [handleChangeEventResult]
  )

  const callOnChangeContext = useCallback(async () => {
    if (asyncBehaviorIsEnabled && !executeOnChangeRegardlessOfError) {
      await yieldAsyncProcess({
        name: 'onChangeContext',
        waitFor: [
          {
            processName: 'onChangeValidator',
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
          await setEventResult(
            (await handlePathChangeDataContext?.(
              identifier
            )) as EventReturnWithStateObjectAndSuccess
          )
        } else {
          await setEventResult(null)
        }
      } else if (onChangeContext || !asyncBehaviorIsEnabled) {
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
      const currentValue = valueRef.current
      if (newValue === currentValue) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      const transformedValue =
        transformers.current.transformValue(newValue, currentValue) ??
        (emptyValue as unknown as Value)
      const contextValue = transformers.current.transformOut(
        transformedValue,
        transformers.current.provideAdditionalArgs(
          transformedValue,
          additionalArgs
        )
      )

      valueRef.current = transformedValue

      if (hasPath || itemPath) {
        handlePathChangeUnvalidatedDataContext(
          nestedIteratePath || identifier,
          contextValue
        )
      }

      if (itemPath) {
        handleChangeIterateContext?.(
          makeIteratePath(itemPath, '', {
            omitSectionPath: true,
          }),
          contextValue
        )
      }

      addToPool(
        'onChangeValidator',
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
      emptyValue,
      additionalArgs,
      hasPath,
      itemPath,
      addToPool,
      validateValue,
      callOnChangeContext,
      onChangeContext,
      runPool,
      handlePathChangeUnvalidatedDataContext,
      nestedIteratePath,
      identifier,
      handleChangeIterateContext,
      makeIteratePath,
      handleError,
    ]
  )

  const setDisplayValue: ReturnAdditional<Value>['setDisplayValue'] =
    useCallback(
      (value, options) => {
        const {
          path: fieldPath = itemPath ? identifier : path,
          type = 'field',
        } = options || {}
        if (!fieldPath || !fieldDisplayValueRef?.current) {
          return // stop here
        }

        fieldDisplayValueRef.current[fieldPath] =
          valueRef.current === (emptyValue as unknown as Value)
            ? { type }
            : { value, type }
      },
      [identifier, emptyValue, fieldDisplayValueRef, itemPath, path]
    )

  const handleChange = useCallback(
    async (
      argFromInput: Value | unknown,
      localAdditionalArgs: ProvideAdditionalEventArgs = undefined
    ) => {
      const currentValue = valueRef.current
      const fromInput = transformers.current.fromInput(argFromInput)

      if (fromInput === currentValue) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      // Must be set before validation
      setChanged(true)

      if (asyncBehaviorIsEnabled) {
        hideError()
        await updateValue(fromInput)
      } else {
        updateValue(fromInput)
      }

      if (isAsync(onChange)) {
        addToPool(
          'onChangeLocal',
          async () => {
            const args = getEventArgs({
              eventName: 'onChange',
              additionalArgs: localAdditionalArgs
                ? { ...additionalArgs, ...localAdditionalArgs }
                : additionalArgs,
            })

            await yieldAsyncProcess({
              name: 'onChangeLocal',
              waitFor: [
                {
                  processName: 'onChangeValidator',
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
              await setEventResult(await onChange?.apply(this, args))
            } else {
              await setEventResult(null)
            }
          },
          true
        )
      } else {
        const args = getEventArgs({
          eventName: 'onChange',
          additionalArgs: localAdditionalArgs
            ? { ...additionalArgs, ...localAdditionalArgs }
            : additionalArgs,
        })

        setEventResult(onChange?.apply(this, args))
      }

      await runPool()
    },
    [
      addToPool,
      additionalArgs,
      asyncBehaviorIsEnabled,
      defineAsyncProcess,
      getEventArgs,
      hasError,
      hideError,
      onChange,
      runPool,
      setChanged,
      setEventResult,
      updateValue,
      yieldAsyncProcess,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

  // Put props into the surrounding data context as early as possible
  setFieldInternalsDataContext?.(identifier, {
    id,
    props,
  })

  const activeIndexTmpRef = useRef(activeIndex)
  useEffect(() => {
    activeIndexTmpRef.current = activeIndex
  }, [activeIndex]) // We want to watch for step changes

  useMemo(() => {
    setMountedFieldStateDataContext(identifier, {
      isPreMounted: true,
    })

    if (typeof isVisible === 'boolean') {
      setMountedFieldStateDataContext(identifier, { isVisible })
    }
  }, [setMountedFieldStateDataContext, identifier, isVisible])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    if (typeof activeIndexRef?.current === 'number') {
      setMountedFieldStateDataContext(identifier, {
        wasStepChange: false,
      })

      return () => {
        const wasStepChange =
          typeof activeIndex === 'number' &&
          // eslint-disable-next-line react-hooks/exhaustive-deps
          activeIndexRef.current !== activeIndexTmpRef.current

        setMountedFieldStateDataContext(identifier, {
          wasStepChange,
        })
      }
    }
  }, [
    activeIndex,
    activeIndexRef,
    identifier,
    prerenderFieldProps,
    setMountedFieldStateDataContext,
  ])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    // Mount procedure.
    setMountedFieldStateDataContext(identifier, {
      isMounted: true,
      isPreMounted: true,
    })
    setMountedFieldSnapshot?.(identifier, { isMounted: true })

    // Unmount procedure.
    return () => {
      setMountedFieldStateDataContext(identifier, {
        isMounted: false,
        isPreMounted: false,
      })
      setMountedFieldSnapshot?.(identifier, { isMounted: false })
    }
  }, [
    identifier,
    prerenderFieldProps,
    setMountedFieldSnapshot,
    setMountedFieldStateDataContext,
  ])

  // - Warn when a field path is used multiple times
  useEffect(() => {
    if (
      !omitMultiplePathWarning &&
      process.env.NODE_ENV !== 'production' &&
      (hasPath || hasItemPath) &&
      (hasPath ? !iterateItemContext : true) &&
      existingFieldsRef?.current
    ) {
      const existingFields = existingFieldsRef.current
      if (existingFields.has(identifier)) {
        warn('Path declared multiple times:', identifier)
      } else {
        existingFields.set(identifier, true)
        return () => {
          existingFields.delete(identifier)
        }
      }
    }
  }, [
    existingFieldsRef,
    hasItemPath,
    hasPath,
    identifier,
    iterateItemContext,
    omitMultiplePathWarning,
  ])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    // Unmount procedure.
    return () => {
      setFieldErrorDataContext?.(identifier, undefined)
      setFieldErrorBoundary?.(identifier, undefined)
      localErrorRef.current = undefined
    }
  }, [
    identifier,
    prerenderFieldProps,
    setFieldErrorBoundary,
    setFieldErrorDataContext,
  ])

  useEffect(() => {
    if (prerenderFieldProps) {
      return // stop here, we don't want to set the state of the field
    }

    // Unmount procedure.
    return () => {
      // Have this in a separate useEffect to avoid calling unmount when a step changes
      setFieldErrorWizard?.(wizardIndex, identifier, undefined)
    }
  }, [identifier, prerenderFieldProps, setFieldErrorWizard, wizardIndex])

  useEffect(() => {
    validateValue()
  }, [validateValue])

  useUpdateEffect(() => {
    schemaValidatorRef.current = schema
      ? dataContext.ajvInstance?.compile(schema)
      : undefined
    validateValue()
  }, [schema])

  // Use "useLayoutEffect" and "externalValueDidChangeRef"
  // to cooperate with the the data context "updateDataValueDataContext" routine further down,
  // which also uses useLayoutEffect.
  const externalValueDidChangeRef = useRef(false)
  useLayoutEffect(() => {
    if (valueRef.current !== externalValue) {
      valueRef.current = externalValue
      externalValueDidChangeRef.current = true
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalValueDeps, hasItemPath])

  useUpdateEffect(() => {
    // Error or removed error for this field from the surrounding data context (by path)
    if (externalValueDidChangeRef.current) {
      externalValueDidChangeRef.current = false

      // Hide error when the external value has changed, but is the same as the empty value.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (!validateContinuously && valueRef.current === emptyValue) {
        hideError()
      }

      validateValue()
      forceUpdate()
    }
  }, [externalValueDeps, emptyValue, validateContinuously]) // Keep "externalValue" in the dependency list, so it will be updated when it changes

  useEffect(() => {
    // Check against the local error state,
    // so we prioritize the local error state over the context error state
    if (!localErrorInitiatorRef.current) {
      const error = contextErrorRef.current
      if (error) {
        persistErrorState('weak', 'dataContextError', error)
        if (validateInitially) {
          handleError()
        }
      } else {
        clearErrorState()
      }
    }
  }, [
    dataContextErrors, // Is needed in order to trigger a re-render when the error state changes.
    clearErrorState,
    handleError,
    persistErrorState,
    prepareError,
    validateInitially,
  ])

  const tmpTransValueRef = useRef<Record<Identifier, unknown>>({
    // Use an unique (per field) starting value (id) for the itemPath, so we later can check if the valueToStore is the same as the current value.
    itemPath: id,
  })
  const setContextData = useCallback(
    ({ preventUpdate = undefined } = {}) => {
      if (!hasPath && !hasItemPath) {
        return // stop here
      }

      let valueToStore: Value | unknown = valueProp

      const data = prerenderFieldProps
        ? dataContext.data
        : dataContext.internalDataRef?.current

      const storePath = nestedIteratePath
        ? makeIteratePath(itemPath, nestedIteratePath)
        : identifier

      // First, look for existing data in the context
      const hasValue = pointer.has(data, storePath) || storePath === '/'
      const existingValue =
        storePath === '/'
          ? data
          : hasValue
          ? pointer.get(data, storePath)
          : undefined

      // If no data where found in the dataContext, look for shared data
      if (
        dataContext.id &&
        !hasValue &&
        typeof existingValue === 'undefined' &&
        typeof valueToStore === 'undefined'
      ) {
        const sharedState = createSharedState(dataContext.id)
        const hasValue = pointer.has(sharedState.data, storePath)
        if (hasValue) {
          const sharedValue = pointer.get(sharedState.data, storePath)
          if (sharedValue) {
            valueToStore = sharedValue as Value
          }
        }
      }

      const hasDefaultValue =
        typeof defaultValueRef.current !== 'undefined' &&
        typeof valueToStore === 'undefined'

      if (hasDefaultValue) {
        // Set the default value if it's not set yet.
        // This takes precedence over the valueToStore.
        valueToStore = defaultValueRef.current
        defaultValueRef.current = undefined
      } else if (!hasValue && typeof valueToStore === 'undefined') {
        valueToStore = emptyValue
      }

      let skipEqualCheck = false

      if (hasItemPath) {
        if (existingValue === valueToStore) {
          if (hasValue) {
            return // stop here, don't store the same value again
          } else {
            // Because the valueToStore is not a part of the data context,
            // we need to check if the valueToStore is the same as the current value,
            // to avoid infinite rerenders.
            if (tmpTransValueRef.current['itemPath'] === valueToStore) {
              return // stop here to avoid infinite rerenders
            }
          }
        }

        // We need to store the valueToStore in a ref, so we can check if it is the same as the current value later.
        tmpTransValueRef.current['itemPath'] = valueToStore

        if (iterateArrayValue === clearedArray) {
          return // stop here, because the array was cleared by handleRemove in the Iterate.Array component
        }

        if (
          typeof valueToStore === 'undefined' &&
          typeof existingValue !== 'undefined'
        ) {
          // On the rerender (after defaultValue was set) and the data context was given, but as "undefined",
          // then we want to use the current value (the defaultValue from the previous render),
          // because else the comparison "valueRef.current !== existingValue" is true and we will set undefined as the new data context value.
          valueToStore = existingValue
        }

        if (itemPath === '/') {
          // The push container uses an object as the default value for the array.
          // But when a root slash is used, we want to make sure the field don't gets the object.
          if (existingValue === clearedData) {
            valueRef.current = undefined
          }

          if (hasDefaultValue && Array.isArray(existingValue)) {
            // Ensures support to have a field with a defaultValue and a itemPath of "/"
            // This way, we ensure the defaultValue is actually set in the data context.
            skipEqualCheck = true
          }
        }
      }

      // Used by e.g. Iterate.Array
      if (updateContextDataInSync) {
        // When an array is given (iterate), we don't want to overwrite the existing array
        if (hasDefaultValue && hasValue) {
          return // stop here, we don't want to overwrite the existing array
        }

        // React.StrictMode will come with "undefined" on the second render,
        // because "defaultValueRef.current" was removed.
        // But because we run "useMemo" on the first render when updateContextDataInSync is true,
        // we have still a valid value/array.
        if (!Array.isArray(valueToStore)) {
          return // stop here, never use a non-array value when in "updateContextDataInSync"
        }

        if (Array.isArray(existingValue)) {
          if (valueToStore.length !== existingValue.length) {
            skipEqualCheck = true // in order to update the items
          }

          // Keep Iterate.Array in sync with the data context
          valueRef.current = existingValue as Value
        }
      }

      // When an Array or Object is used as the value,
      // and the field uses transformIn, the instance may have been changed.
      // The "valueToStore" can be undefined,
      // we then need to ensure we don't overwrite the existing data context value with "undefined".
      if (
        typeof valueToStore === 'undefined' &&
        typeof existingValue !== 'undefined'
      ) {
        valueToStore = existingValue
      }

      if (
        !skipEqualCheck &&
        hasValue &&
        (valueToStore === existingValue ||
          // Prevents an infinite loop by skipping the update if the value hasn't changed
          valueRef.current === existingValue)
      ) {
        return // stop here, we don't want to set same value twice
      }

      if (
        storePath in tmpTransValueRef.current &&
        tmpTransValueRef.current[storePath] === valueToStore
      ) {
        return // stop here, avoid infinite loop
      }

      const valueIn = transformers.current.transformIn(valueToStore)
      const transformedValue = transformers.current.transformOut(
        valueIn,
        transformers.current.provideAdditionalArgs(valueIn as Value)
      )
      if (transformedValue !== valueToStore) {
        // When the value got transformed, we want to update the internal value, and avoid an infinite loop
        tmpTransValueRef.current[storePath] = valueToStore
        valueToStore = transformedValue
      }

      // When an itemPath is given, we don't want to rerender the context on every iteration because of performance reasons.
      // We know when the last item is reached, so we can prevent rerenders during the iteration.
      if (
        hasItemPath &&
        !nestedIteratePath && // Ensure we still rerender when absolutePath is set
        iterateIndex < iterateArrayValue?.length - 1
      ) {
        preventUpdate = true
      }

      // Update the data context when a pointer not exists,
      // but was given initially.
      updateDataValueDataContext?.(storePath, valueToStore, {
        preventUpdate,
      })

      if (!preventUpdate) {
        validateDataDataContext?.()
      }
    },
    [
      dataContext.data,
      dataContext.id,
      dataContext.internalDataRef,
      emptyValue,
      hasItemPath,
      hasPath,
      identifier,
      itemPath,
      iterateArrayValue,
      iterateIndex,
      makeIteratePath,
      nestedIteratePath,
      updateContextDataInSync,
      updateDataValueDataContext,
      validateDataDataContext,
      valueProp,
      prerenderFieldProps,
    ]
  )

  const isEmptyData = useCallback(
    () => {
      return (
        dataContext.isEmptyDataRef?.current ||
        dataContext.internalDataRef?.current ===
          (dataContext.props?.emptyData ?? clearedData)
      )
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dataContext.internalDataRef,
      dataContext.props?.emptyData,
      externalValueDeps, // ensure to include "externalValue" in order to properly remove errors
    ]
  )

  // Use "useLayoutEffect" to be in sync with the data context "updateDataValueDataContext".
  useLayoutEffect(() => {
    if (isEmptyData()) {
      defaultValueRef.current = defaultValue
      setChanged(false)
      hideError()
      clearErrorState()
    }
  }, [clearErrorState, defaultValue, hideError, isEmptyData, setChanged])

  useMemo(() => {
    if (updateContextDataInSync && !isEmptyData()) {
      setContextData({ preventUpdate: true })
    }
  }, [isEmptyData, updateContextDataInSync, setContextData])

  // Use "useLayoutEffect" to avoid flickering when value/defaultValue gets set, and other fields dependent on it.
  // Form.Visibility is an example of a logic, where a field value/defaultValue can be used to set the set state of a path,
  // where again other fields depend on it.
  useLayoutEffect(() => {
    if (!updateContextDataInSync && !isEmptyData()) {
      setContextData()
    }

    // In order to render Iterate.Array with "countPath" immediately
    if (forceUpdateWhenContextDataIsSet) {
      forceUpdate()
    }
  }, [
    forceUpdateWhenContextDataIsSet,
    isEmptyData,
    setContextData,
    updateContextDataInSync,
  ])

  useEffect(() => {
    if (isEmptyData()) {
      setContextData()
      validateValue()
    }
  }, [isEmptyData, setContextData, validateValue])

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
      'onChangeValidator',
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
    setFieldEventListener?.(identifier, 'onSubmitCall', onSubmitHandler)
  }, [identifier, onSubmitHandler, setFieldEventListener])

  // Set the error in the field block context if this field is inside a field block
  useEffect(() => {
    if (inFieldBlock) {
      setBlockRecord?.({
        identifier,
        type: 'error',
        content: error,
        showInitially: true,
        show: true,
      })
      setBlockRecord?.({
        identifier,
        type: 'warning',
        content: warning,
        showInitially: true,
        show: true,
      })
      setBlockRecord?.({
        identifier,
        type: 'info',
        content: info,
        showInitially: true,
        show: true,
      })

      return () => {
        // Unmount procedure
        if (mountedFieldsRefFieldBlock) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          mountedFieldsRefFieldBlock.current.set(identifier, true)
        }
      }
    }
  }, [
    error,
    identifier,
    inFieldBlock,
    info,
    mountedFieldsRefFieldBlock,
    setBlockRecord,
    warning,
  ])

  const infoRef = useRef<UseFieldProps['info']>(info)
  const warningRef = useRef<UseFieldProps['warning']>(warning)
  useMemo(() => {
    infoRef.current = info
  }, [info])
  useMemo(() => {
    warningRef.current = warning
  }, [warning])

  const connections = useMemo(() => {
    return {
      setEventResult,
      emptyValue,
    }
  }, [emptyValue, setEventResult])
  setFieldConnectionDataContext?.(identifier, connections)

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

  if (bufferedError) {
    htmlAttributes['aria-invalid'] = bufferedError ? 'true' : 'false'
  }
  if (required) {
    htmlAttributes['aria-required'] = 'true'
  }
  if (inFieldBlock) {
    // Mount the field in the field block context
    if (mountedFieldsRefFieldBlock) {
      mountedFieldsRefFieldBlock.current.set(identifier, true)
    }

    // Check if there are any state IDs to be added to the aria-describedby attribute
    const stateIds = fieldBlockContext.fieldStateIdsRef?.current

    if (stateIds) {
      htmlAttributes['aria-describedby'] = combineDescribedBy(
        htmlAttributes,
        [
          bufferedError && stateIds.error,
          warning && stateIds.warning,
          info && stateIds.info,
        ].filter(Boolean)
      )
    }
  } else {
    const ids = [
      (bufferedError || error) && `${id}-form-status--error`,
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

  const help = props.help
  if (help?.title || help?.content) {
    htmlAttributes['aria-describedby'] = combineDescribedBy(
      htmlAttributes,
      `${id}-help`
    )
  }

  const fieldBlockProps = {
    /** Documented APIs */
    info: !inFieldBlock ? infoRef.current : undefined,
    warning: !inFieldBlock ? warningRef.current : undefined,
    error: !inFieldBlock ? bufferedError : undefined,
    required,
    label: props.label,
    labelDescription: props.labelDescription,
    labelDescriptionInline: props.labelDescriptionInline,
    labelSuffix: props.labelSuffix,
    labelSize: props.labelSize,
    labelSrOnly: props.labelSrOnly,
    layout: props.layout,
    layoutOptions: props.layoutOptions,
    help: props.help,

    /** HTML Attributes */
    disabled:
      onBlurValidator &&
      asyncProcessRef.current === 'onBlurValidator' &&
      fieldStateRef.current === 'validating'
        ? true
        : disabled,

    /** Internal */
    fieldState: resolveValidatingState(fieldStateRef.current),
    labelHeight:
      typeof props['size'] === 'string' ? props['size'] : undefined, // component/field size
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
      (typeof dataContext.autoComplete === 'boolean'
        ? dataContext.autoComplete
          ? 'on'
          : 'off'
        : undefined),

    /** Documented APIs */
    id,
    value: transformers.current.toInput(valueRef.current),
    hasError: errorIsVisible,
    isChanged: Boolean(changedRef.current),
    props,
    htmlAttributes,
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    setChanged,
    setDisplayValue,
    validateValue,
    revealError,
    forceUpdate,

    /** Internal */
    additionalArgs,
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
    additionalArgs?: ProvideAdditionalEventArgs
  ) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: (
    value: Value | unknown,
    additionalArgs?: ProvideAdditionalEventArgs
  ) => void
  updateValue: (value: Value) => void
  setChanged: (state: boolean) => void
  setDisplayValue: (
    value: React.ReactNode,
    { path, type }?: { path?: Identifier; type?: 'field' }
  ) => void
  forceUpdate: () => void
  hasError?: boolean

  /** Internal */
  dataContext: ContextState
  fieldState: SubmitState
  additionalArgs: ReceiveAdditionalEventArgs<Value>
}

function resolveValidatingState(state: SubmitStateWithValidating) {
  return state === 'validating' ? 'pending' : state
}

export function checkForError(
  potentialErrors: Array<
    | FieldPropsGeneric['error']
    | FieldPropsGeneric['warning']
    | FieldPropsGeneric['info']
  >
) {
  return potentialErrors.some((error) => {
    return error instanceof Error || error instanceof FormError
  })
}

export const clearedArray = []
