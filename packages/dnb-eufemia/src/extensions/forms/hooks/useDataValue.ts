import {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react'
import pointer from 'json-pointer'
import { ValidateFunction } from 'ajv'
import { errorChanged } from '../utils'
import ajv, { ajvErrorsToOneFormError } from '../utils/ajv'
import { FormError, FieldProps, AdditionalEventArgs } from '../types'
import { Context, ContextState } from '../DataContext'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateElementContext'
import {
  makeUniqueId,
  toCapitalized,
} from '../../../shared/component-helper'
import useMountEffect from './useMountEffect'
import useUpdateEffect from './useUpdateEffect'
import useProcessManager from './useProcessManager'

interface ReturnAdditional<Value> {
  id: string
  value: Value
  error: Error | FormError | undefined
  hasError: boolean
  dataContext: ContextState
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: FieldProps<unknown>['onChange']
  updateValue: (value: Value) => void
  forceUpdate: () => void
}

export default function useDataValue<
  Value = unknown,
  Props extends FieldProps<Value> = FieldProps<Value>,
>(props: Props): Props & ReturnAdditional<Value> {
  const {
    path,
    itemPath,
    emptyValue,
    required,
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
    toInput = (value: Value) => value,
    fromInput = (value: Value) => value,
    toEvent = (value: Value) => value,
    fromExternal = (value: Value) => value,
    validateRequired = (value: Value, { emptyValue, required }) => {
      const res =
        required &&
        (value === emptyValue ||
          (typeof emptyValue === 'undefined' && value === ''))
          ? new FormError('The value is required', {
              validationRule: 'required',
            })
          : undefined
      return res
    },
  } = props

  const [, forceUpdate] = useReducer(() => ({}), {})
  const { startProcess } = useProcessManager()
  const id = useMemo(() => props.id ?? makeUniqueId(), [props.id])
  const dataContext = useContext(Context)
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateElementContext = useContext(IterateElementContext)

  const transformers = useRef({
    toInput,
    fromInput,
    toEvent,
    fromExternal,
    validateRequired,
  })

  const {
    handlePathChange: dataContextHandlePathChange,
    updateDataValue: dataContextUpdateDataValue,
    setValueWithError: dataContextSetValueWithError,
    errors: dataContextErrors,
  } = dataContext ?? {}
  const dataContextError = path ? dataContextErrors?.[path] : undefined
  const inFieldBlock = Boolean(fieldBlockContext)
  const {
    setError: setFieldBlockError,
    setShowError: setShowFieldBlockError,
  } = fieldBlockContext ?? {}
  const inIterate = Boolean(iterateElementContext)
  const {
    index: iterateElementIndex,
    value: iterateElementValue,
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
  if (itemPath && !iterateElementContext) {
    throw new Error(
      'itemPath cannot be used when not inside an iterate element context. Wrap the component in an Iterate.Loop.'
    )
  }

  const identifier = useMemo(() => {
    // Identifier is used is registries of multiple fields, like in the DataContext keeping track of errors
    return path ?? id
  }, [path, id])

  const externalValue = useMemo(() => {
    if (props.value !== undefined) {
      let value = transformers.current.fromExternal(props.value)

      if (props.capitalize) {
        value = toCapitalized(String(value || '')) as Value
      }

      // Value-prop sent directly to the field has highest priority, overriding any surrounding source
      return value
    }

    if (inIterate && itemPath) {
      // This field is inside an iterate, and has a pointer from the base of the element being iterated
      if (itemPath === '/') {
        return iterateElementValue
      }

      return pointer.has(iterateElementValue, itemPath)
        ? pointer.get(iterateElementValue, itemPath)
        : undefined
    }

    if (dataContext.data && path) {
      // There is a surrounding data context and a path for where in the source to find the data
      if (path === '/') {
        return dataContext.data
      }

      return pointer.has(dataContext.data, path)
        ? pointer.get(dataContext.data, path)
        : undefined
    }
    return undefined
  }, [
    props.value,
    props.capitalize,
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
  const showErrorInitially = validateInitially || errorProp
  // - Local errors are errors based on validation instructions received by
  const localErrorRef = useRef<Error | FormError | undefined>()
  // - Context errors are from outer contexts, like validation for this field as part of the whole data set
  const contextErrorRef = useRef<Error | FormError | undefined>(
    dataContextError
  )

  const showErrorRef = useRef<boolean>(Boolean(showErrorInitially))
  const errorMessagesRef = useRef(errorMessages)
  useEffect(() => {
    errorMessagesRef.current = errorMessages
  }, [errorMessages])
  const validatorRef = useRef(validator)
  useEffect(() => {
    validatorRef.current = validator
  }, [validator])

  const schemaValidatorRef = useRef<ValidateFunction>(
    schema ? ajv.compile(schema) : undefined
  )

  const showError = useCallback(() => {
    showErrorRef.current = true
    setShowFieldBlockError?.(path ?? id, true)
  }, [path, id, setShowFieldBlockError])

  const hideError = useCallback(() => {
    showErrorRef.current = false
    setShowFieldBlockError?.(path ?? id, false)
  }, [path, id, setShowFieldBlockError])

  /**
   * Prepare error from validation logic with correct error messages based on props
   */
  const prepareError = useCallback(
    (error: Error | FormError | undefined): FormError | undefined => {
      if (error === undefined) {
        return
      }

      if (error instanceof FormError) {
        const message =
          (typeof error.validationRule === 'string' &&
            errorMessagesRef.current?.[error.validationRule]) ||
          error.message

        const messageWithValues = Object.entries(
          error.messageValues ?? {}
        ).reduce((message, [key, value]) => {
          return message.replace(`{${key}}`, value)
        }, message)

        return new FormError(messageWithValues)
      }

      return error
    },
    []
  )

  /**
   * Based on validation, update error state, locally and relevant surrounding contexts
   */
  const persistErrorState = useCallback(
    (errorArg: FormError | undefined) => {
      const error = prepareError(errorArg)

      if (!errorChanged(error, localErrorRef.current)) {
        // In case different triggers lead to validation with no changes in the result (like still no error, or the same error),
        // avoid unnecessary re-renders by letting the old error object stay in the state and skip re-rendering.
        return
      }

      localErrorRef.current = error

      // Tell the data context about the error, so it can stop the user from submitting the form until the error has been fixed
      dataContextSetValueWithError?.(identifier, Boolean(error))

      setFieldBlockError?.(path ?? id, error)
      forceUpdate()
    },
    [
      path,
      identifier,
      id,
      prepareError,
      dataContextSetValueWithError,
      setFieldBlockError,
      forceUpdate,
    ]
  )

  const clearErrorState = useCallback(
    () => persistErrorState(undefined),
    [persistErrorState]
  )

  /**
   * Validate the current state value by provided validator instructions
   */
  const validateValue = useCallback(async () => {
    const isProcessActive = startProcess()

    try {
      // Validate required
      const requiredError = transformers.current.validateRequired(
        valueRef.current,
        {
          emptyValue,
          required,
          isChanged: changedRef.current,
        }
      )
      if (requiredError instanceof Error) {
        throw requiredError
      }

      // Validate by provided JSON Schema for this value
      if (
        schemaValidatorRef.current &&
        valueRef.current !== undefined &&
        !schemaValidatorRef.current(valueRef.current)
      ) {
        const error = ajvErrorsToOneFormError(
          schemaValidatorRef.current.errors
        )
        throw error
      }

      // Validate by provided derivative validator
      if (validatorRef.current) {
        const res = await validatorRef.current?.(
          valueRef.current,
          errorMessagesRef.current
        )
        if (res instanceof Error) {
          throw res
        }
      }

      if (isProcessActive()) {
        clearErrorState()
      }
    } catch (error: unknown) {
      if (isProcessActive()) {
        persistErrorState(error as Error)
      }
    }
  }, [
    startProcess,
    emptyValue,
    required,
    clearErrorState,
    persistErrorState,
  ])

  useUpdateEffect(() => {
    if (!schema) {
      schemaValidatorRef.current = undefined
      return
    }
    schemaValidatorRef.current = ajv.compile(schema)
    validateValue()
  }, [schema, validateValue])

  useUpdateEffect(() => {
    // Error or removed error for this field from the surrounding data context (by path)
    valueRef.current = externalValue
    validateValue()
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
    if (dataContext.showAllErrors) {
      // If showError on a surrounding data context was changed and set to true, it is because the user clicked next, submit or
      // something else that should lead to showing the user all errors.
      showError()
      forceUpdate()
    }
  }, [dataContext.showAllErrors, showError])

  useEffect(() => {
    if (path && props.value) {
      const hasValue = pointer.has(dataContext.data, path)
      const value = hasValue
        ? pointer.get(dataContext.data, path)
        : undefined
      if (
        !hasValue ||
        (props.value !== value && valueRef.current !== value)
      ) {
        // Update the data context when a pointer not exists,
        // but was given initially.
        dataContextUpdateDataValue?.(path, props.value)
      }
    }
  }, [dataContext.data, dataContextUpdateDataValue, path, props.value])

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
    (hasFocus: boolean, valueOverride?: Value) => {
      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        onFocus?.(
          transformers.current.toEvent(valueOverride ?? valueRef.current)
        )
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        onBlur?.(
          transformers.current.toEvent(valueOverride ?? valueRef.current)
        )

        if (!changedRef.current && !validateUnchanged) {
          // Avoid showing errors when blurring without having changed the value, so tabbing through several
          // fields does not make errors pop up all over the place
          return
        }

        // External blur validators makes it possible to validate values but not on every character change in case of
        // expensive validation calling external services etc.
        if (typeof onBlurValidator === 'function') {
          // Since the validator can return either a synchronous result or an asynchronous
          Promise.resolve(
            onBlurValidator(
              transformers.current.toEvent(
                valueOverride ?? valueRef.current
              )
            )
          ).then(persistErrorState)
        }

        // Since the user left the field, show error (if any)
        showError()
        forceUpdate()
      }
    },
    [
      onBlur,
      onBlurValidator,
      onFocus,
      persistErrorState,
      showError,
      validateUnchanged,
    ]
  )

  const updateValue = useCallback(
    (newValue: Value) => {
      if (newValue === valueRef.current) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      valueRef.current = newValue

      // Always validate the value immediately when it is changed
      validateValue()

      handleError()

      if (path) {
        dataContextHandlePathChange?.(path, newValue)
      }

      forceUpdate()
    },
    [dataContextHandlePathChange, handleError, path, validateValue]
  )

  const handleChange = useCallback(
    (
      argFromInput: Value,
      additionalArgs: AdditionalEventArgs = undefined
    ) => {
      let newValue = transformers.current.fromInput(argFromInput)

      if (newValue === valueRef.current) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      if (props.capitalize) {
        newValue = toCapitalized(String(newValue || '')) as Value
      }

      updateValue(newValue)

      changedRef.current = true

      const value = transformers.current.toEvent(newValue)
      onChange?.apply(
        this,
        typeof additionalArgs !== 'undefined'
          ? [value, additionalArgs]
          : [value]
      )

      if (itemPath) {
        const iterateValuePath = `/${iterateElementIndex}${
          itemPath && itemPath !== '/' ? itemPath : ''
        }`
        handleIterateElementChange?.(iterateValuePath, newValue)
      }
    },
    [
      props.capitalize,
      updateValue,
      onChange,
      itemPath,
      iterateElementIndex,
      handleIterateElementChange,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])

  const handleBlur = useCallback(() => {
    if (props.trim && /^\s|\s$/.test(String(valueRef.current))) {
      const value = String(valueRef.current).trim()
      handleChange(value as Value)
    }

    setHasFocus(false)
  }, [props.trim, setHasFocus, handleChange])

  useMountEffect(() => {
    dataContext?.handleMountField(identifier)

    validateValue()

    if (showErrorInitially) {
      showError()
    }

    return () => {
      // Unmount procedure
      dataContext?.handleUnMountField(identifier)
    }
  })

  const error = showErrorRef.current
    ? errorProp ?? localErrorRef.current ?? contextErrorRef.current
    : undefined

  return {
    ...props,
    autoComplete:
      props.autoComplete ??
      (dataContext.autoComplete === true ? 'on' : 'off'),
    id,
    name: props.name || props.path?.replace('/', '') || id,
    value: transformers.current.toInput(valueRef.current),
    error: !inFieldBlock ? error : undefined,
    hasError: Boolean(error),
    isChanged: changedRef.current,
    dataContext,
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    forceUpdate,
  }
}
