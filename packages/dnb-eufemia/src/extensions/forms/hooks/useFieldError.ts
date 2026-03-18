import React, { useRef, useCallback, useMemo } from 'react'
import type { ValidateFunction } from 'ajv/dist/2020.js'
import { errorChanged, FormError } from '../utils'
import { extendErrorMessagesWithTranslationMessages } from '../utils/errors'
import type {
  FieldPropsGeneric,
  SubmitState,
  UseFieldProps,
  FieldStatus,
  ErrorProp,
  MessageProp,
  MessageTypes,
  MessagePropParams,
  Identifier,
  DefaultErrorMessages,
} from '../types'
import type { GetValueByPath } from './useDataValue'
import type { FormsTranslation } from './useTranslation'
import { convertJsxToString } from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import type { FieldBlockContextProps } from '../FieldBlock/FieldBlockContext'

export function checkForError(
  potentialErrors: Array<
    | FieldPropsGeneric['error']
    | FieldPropsGeneric['warning']
    | FieldPropsGeneric['info']
  >
): boolean {
  return potentialErrors.some((error) => {
    return error instanceof Error || error instanceof FormError
  })
}

export type SubmitStateWithValidating = SubmitState | 'validating'

export type PersistErrorStateMethod =
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

export type ErrorInitiator =
  | 'required'
  | 'schema'
  | 'errorProp'
  | 'onChangeValidator'
  | 'onBlurValidator'
  | 'dataContextError'

export type UseFieldErrorParams<Value> = {
  // Props
  initialErrorProp: FieldPropsGeneric<Value>['error'] | 'initial'
  warningProp:
    | FieldStatus['warning']
    | MessageProp<Value, FieldStatus['warning']>
  infoProp: FieldStatus['info'] | MessageProp<Value, FieldStatus['info']>
  errorMessages: DefaultErrorMessages
  validateInitially: boolean
  validateContinuously: boolean
  disabled: boolean

  // Identity
  identifier: Identifier
  locale: string

  // Flags
  handleFieldAsVisible: boolean | undefined
  inFieldBlock: boolean
  prerenderFieldProps: boolean
  updateContextDataInSync: boolean
  hasZodSchema: boolean

  // Context dispatch
  setFieldStateDataContext: (
    identifier: Identifier,
    state: SubmitState
  ) => void
  setFieldStateFieldBlock: FieldBlockContextProps['setFieldState']
  setFieldErrorDataContext: (
    identifier: Identifier,
    error: Error | FormError | undefined
  ) => void
  setFieldErrorBoundary: (
    identifier: Identifier,
    error: Error | FormError | undefined
  ) => void
  setFieldErrorWizard: (
    wizardIndex: number,
    identifier: Identifier,
    hasError: boolean | undefined
  ) => void
  setBlockRecord: FieldBlockContextProps['setBlockRecord']
  showFieldErrorFieldBlock: FieldBlockContextProps['showFieldError']
  revealErrorDataContext: (
    identifier: Identifier,
    hasError: boolean
  ) => void
  revealErrorBoundary: (identifier: Identifier, hasError: boolean) => void
  wizardIndex: number

  // Data
  dataContextErrors: Record<string, Error | FormError>
  contextErrorMessages: Record<string, unknown>

  // Shared refs
  valueRef: React.RefObject<Value>
  hasFocusRef: React.RefObject<boolean>
  isInternalRerenderRef: React.RefObject<unknown>
  schemaValidatorRef: React.RefObject<
    ValidateFunction | ((value: unknown) => unknown)
  >

  // Translation
  translationRef: React.RefObject<FormsTranslation>
  formatMessage: (key: string, values?: Record<string, string>) => string

  // Helpers
  getFieldByPath: MessagePropParams<Value, unknown>['getFieldByPath']
  getValueByPath: GetValueByPath<Value>

  // Other
  forceUpdate: () => void
}

export default function useFieldError<Value>({
  initialErrorProp,
  warningProp,
  infoProp,
  errorMessages,
  validateInitially,
  validateContinuously,
  disabled,
  identifier,
  locale,
  handleFieldAsVisible,
  inFieldBlock,
  prerenderFieldProps,
  updateContextDataInSync,
  hasZodSchema,
  setFieldStateDataContext,
  setFieldStateFieldBlock,
  setFieldErrorDataContext,
  setFieldErrorBoundary,
  setFieldErrorWizard,
  setBlockRecord,
  showFieldErrorFieldBlock,
  revealErrorDataContext,
  revealErrorBoundary,
  wizardIndex,
  dataContextErrors,
  contextErrorMessages,
  valueRef,
  hasFocusRef,
  isInternalRerenderRef,
  schemaValidatorRef,
  translationRef,
  formatMessage,
  getFieldByPath,
  getValueByPath,
  forceUpdate,
}: UseFieldErrorParams<Value>) {
  const stateId = useId()

  // -- ensureErrorMessageObject --

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

    // Cache jsx errors to avoid rendering/infinite loop
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

  // -- Error refs (defined early so executeMessage can access revealErrorRef) --

  // Should errors received through validation be shown initially
  const revealErrorRef = useRef<boolean | null>(null)

  // -- executeMessage --

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

  // -- Compute error/warning/info from props --

  const errorProp =
    initialErrorProp === 'initial' ? undefined : initialErrorProp
  const error = executeMessage<UseFieldProps['error'] | 'initial'>(
    // @ts-expect-error -- strictFunctionTypes
    errorProp,
    true
  )
  const warning = executeMessage<FieldStatus['warning']>(warningProp)
  const info = executeMessage<FieldStatus['info']>(infoProp)

  // -- Error refs --

  if (revealErrorRef.current === null) {
    revealErrorRef.current = validateInitially ?? Boolean(errorProp)
  }

  // Local errors are errors based on validation instructions received
  const errorMethodRef = useRef<
    Partial<Record<PersistErrorStateMethod, Error | FormError>>
  >({})
  const localErrorRef = useRef<Error | FormError | undefined>(undefined)
  const localErrorInitiatorRef = useRef<ErrorInitiator>(undefined)

  // Context errors are from outer contexts, like validation for this field as part of the whole data set
  const contextErrorRef = useRef<Error | FormError | undefined>(undefined)

  // -- Combined error messages --

  const errorMessagesCacheRef = useRef({
    locale: null,
    errorMessages: null,
    extendedErrorMessages: null,
  })

  const combinedErrorMessages = useMemo(() => {
    const cache = errorMessagesCacheRef.current
    if (
      cache.locale === locale &&
      errorMessages &&
      cache.extendedErrorMessages &&
      Object.values(cache.errorMessages || {}).join('') ===
        Object.values(errorMessages || {}).join('')
    ) {
      return cache.extendedErrorMessages
    }

    const messages = {
      ...contextErrorMessages,
      ...(contextErrorMessages?.[identifier] as Record<string, string>),
      ...errorMessages,
    } as DefaultErrorMessages

    const extendedErrorMessages =
      extendErrorMessagesWithTranslationMessages(
        messages,
        translationRef.current
      )

    errorMessagesCacheRef.current = {
      locale,
      errorMessages,
      extendedErrorMessages,
    }

    return extendedErrorMessages
  }, [contextErrorMessages, errorMessages, identifier, locale])

  // -- prepareError --

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

          if (combinedErrorMessages?.[message]) {
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
          // @ts-expect-error -- strictFunctionTypes
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

  // -- Context error computation --

  contextErrorRef.current = useMemo(() => {
    // Skip context errors for disabled and readOnly fields
    if (disabled) {
      return undefined
    }

    const dataContextError = dataContextErrors?.[identifier]
    if (!dataContextError) {
      return undefined
    }
    const error = prepareError(dataContextError)
    if (errorChanged(error, contextErrorRef.current)) {
      return error
    }
    return contextErrorRef.current
  }, [dataContextErrors, identifier, prepareError, disabled])

  // If the error is a type error, we want to show it even if the field has not been used
  if (
    localErrorRef.current?.['ajvKeyword'] === 'type' ||
    contextErrorRef.current?.['ajvKeyword'] === 'type'
  ) {
    revealErrorRef.current = true
  }

  // -- Buffered error --

  const getBufferedError = useCallback(() => {
    if (
      initialErrorProp !== 'initial' &&
      typeof errorProp !== 'function'
    ) {
      return prepareError(errorProp)
    } else if (revealErrorRef.current) {
      // For type errors, prioritize context (Provider) errors over local validation errors
      if (contextErrorRef.current?.['ajvKeyword'] === 'type') {
        return contextErrorRef.current
      }
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
  const bufferedErrorRef = useRef<FieldStatus['error']>(bufferedError)
  bufferedErrorRef.current = bufferedError

  const errorIsVisible = Boolean(bufferedError)

  const hasError = useCallback(() => {
    return Boolean(
      error ?? localErrorRef.current ?? contextErrorRef.current
    )
  }, [error])

  // -- Field state --

  const fieldStateRef = useRef<SubmitStateWithValidating>(undefined)

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
      forceUpdate,
    ]
  )

  // -- Error state management --

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

  // Will reveal the error as a visible error (hasVisibleError)
  const revealError = useCallback(() => {
    // To support "validateInitially={false}" prop
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
        return
      }

      const currentError =
        handleFieldAsVisible !== false ? error : undefined
      localErrorRef.current = currentError

      // Tell the data context about the error
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

      if (updateContextDataInSync && !prerenderFieldProps) {
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
      prerenderFieldProps,
      setBlockRecord,
      setFieldErrorBoundary,
      setFieldErrorDataContext,
      setFieldErrorWizard,
      setFieldStateDataContext,
      stateId,
      updateContextDataInSync,
      validateInitially,
      wizardIndex,
      forceUpdate,
    ]
  )

  const clearErrorState = useCallback(() => {
    persistErrorState('wipe', undefined)
    localErrorInitiatorRef.current = undefined
    const schemaValidator = schemaValidatorRef.current as ValidateFunction

    // Clear AJV errors if it's an AJV validator
    if (
      schemaValidator &&
      !hasZodSchema &&
      Array.isArray((schemaValidator as ValidateFunction)?.errors)
    ) {
      schemaValidator.errors = []
    }
  }, [persistErrorState, hasZodSchema, schemaValidatorRef])

  // -- Status refs --

  const warningRef = useRef<FieldStatus['warning']>(warning)
  const infoRef = useRef<FieldStatus['info']>(info)
  useMemo(() => {
    warningRef.current = warning
  }, [warning])
  useMemo(() => {
    infoRef.current = info
  }, [info])

  // -- handleError --

  const handleError = useCallback(() => {
    if (
      validateContinuously ||
      (validateContinuously !== false && !hasFocusRef.current)
    ) {
      revealError()
    } else {
      hideError()
    }
  }, [validateContinuously, hideError, revealError])

  return {
    // Refs
    revealErrorRef,
    localErrorRef,
    localErrorInitiatorRef,
    contextErrorRef,
    errorMethodRef,
    fieldStateRef,
    warningRef,
    infoRef,
    bufferedErrorRef,

    // Computed values
    error,
    warning,
    info,
    errorProp,
    combinedErrorMessages,
    bufferedError,
    errorIsVisible,

    // Functions
    ensureErrorMessageObject,
    executeMessage,
    prepareError,
    persistErrorState,
    clearErrorState,
    revealError,
    hideError,
    setErrorState,
    setFieldState,
    hasError,
    handleError,
    getBufferedError,
  }
}

function resolveValidatingState(
  state: SubmitStateWithValidating
): SubmitState {
  return state === 'validating' ? 'pending' : state
}

// Re-export for use in useFieldProps
export { resolveValidatingState }
