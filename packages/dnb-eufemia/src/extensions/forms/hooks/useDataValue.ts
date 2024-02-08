import {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useReducer,
} from 'react'
import pointer from 'json-pointer'
import { ValidateFunction } from 'ajv/dist/2020'
import { errorChanged } from '../utils'
import { ajvErrorsToOneFormError } from '../utils/ajv'
import { FormError, FieldProps, AdditionalEventArgs } from '../types'
import { Context, ContextState } from '../DataContext'
import SharedContext from '../../../shared/Context'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateElementContext'
import useMountEffect from './useMountEffect'
import useUpdateEffect from './useUpdateEffect'
import useProcessManager from './useProcessManager'
import useId from './useId'

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
  const dataContext = useContext(Context)
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateElementContext = useContext(IterateElementContext)
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const transformers = useRef({
    toInput,
    fromInput,
    toEvent,
    fromExternal,
    transformValue,
    validateRequired,
  })

  const {
    handlePathChange: dataContextHandlePathChange,
    updateDataValue: dataContextUpdateDataValue,
    validateData: dataContextValidateData,
    setValueWithError: dataContextSetValueWithError,
    setProps: dataContextSetProps,
    errors: dataContextErrors,
    contextErrorMessages,
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

  // Put props into the surrounding data context
  dataContextSetProps?.(identifier, props)

  const showErrorRef = useRef<boolean>(Boolean(showErrorInitially))
  const validatorRef = useRef(validator)
  useUpdateEffect(() => {
    validatorRef.current = validator
  }, [validator])

  const schemaValidatorRef = useRef<ValidateFunction>(
    schema ? dataContext.ajvInstance?.compile(schema) : undefined
  )

  const showError = useCallback(() => {
    showErrorRef.current = true
    setShowFieldBlockError?.(path ?? id, true)
  }, [path, id, setShowFieldBlockError])

  const hideError = useCallback(() => {
    showErrorRef.current = false
    setShowFieldBlockError?.(path ?? id, false)
  }, [path, id, setShowFieldBlockError])

  const errorMessagesRef = useRef(null)
  errorMessagesRef.current = useMemo(() => {
    return {
      required: tr.fieldErrorRequired,
      ...errorMessages,
    }
  }, [errorMessages, tr.fieldErrorRequired])

  /**
   * Prepare error from validation logic with correct error messages based on props
   */
  const prepareError = useCallback(
    (error: Error | FormError | undefined): FormError | undefined => {
      if (error === undefined) {
        return
      }

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

    if (disabled) {
      if (isProcessActive()) {
        clearErrorState()
      }
      hideError()
      return
    }

    try {
      // Validate required
      const requiredError = transformers.current.validateRequired(
        valueRef.current,
        {
          emptyValue,
          required,
          isChanged: changedRef.current,
          error: new FormError('The value is required', {
            validationRule: 'required',
          }),
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
        const res = await validatorRef.current?.(valueRef.current, {
          ...contextErrorMessages,
          ...errorMessagesRef.current,
        })
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
    disabled,
    hideError,
    clearErrorState,
    emptyValue,
    required,
    contextErrorMessages,
    persistErrorState,
  ])

  useUpdateEffect(() => {
    schemaValidatorRef.current = schema
      ? dataContext.ajvInstance?.compile(schema)
      : undefined
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
    if (path) {
      const hasValue = pointer.has(dataContext.data, path)
      const existingValue = hasValue
        ? pointer.get(dataContext.data, path)
        : undefined

      if (
        !hasValue ||
        (props.value !== existingValue &&
          // Prevents an infinite loop by skipping the update if the value hasn't changed
          valueRef.current !== existingValue)
      ) {
        // Update the data context when a pointer not exists,
        // but was given initially.
        dataContextUpdateDataValue?.(path, props.value, { disabled })
        dataContextValidateData?.()
      }
    }
  }, [
    dataContext.data,
    dataContextUpdateDataValue,
    dataContextValidateData,
    disabled,
    path,
    props.value,
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
    (hasFocus: boolean, valueOverride?: Value) => {
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

        // External blur validators makes it possible to validate values but not on every character change in case of
        // expensive validation calling external services etc.
        if (typeof onBlurValidator === 'function') {
          // Since the validator can return either a synchronous result or an asynchronous
          const value = transformers.current.toEvent(
            valueOverride ?? valueRef.current,
            'onBlurValidator'
          )
          Promise.resolve(onBlurValidator(value)).then(persistErrorState)
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
        // setTimeout(() => {
        dataContextHandlePathChange?.(path, newValue)
        // forceUpdate()
        // }, 1e3)
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
      const currentValue = valueRef.current
      let newValue = transformers.current.fromInput(argFromInput)

      if (newValue === currentValue) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }

      newValue = transformers.current.transformValue(
        newValue,
        currentValue
      )

      updateValue(newValue)

      changedRef.current = true

      const value = transformers.current.toEvent(newValue, 'onChange')
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
      updateValue,
      onChange,
      itemPath,
      iterateElementIndex,
      handleIterateElementChange,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])

  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

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

  const ariaAttributes = {}
  if (error) {
    ariaAttributes['aria-invalid'] = String(Boolean(error))
  }
  if (required) {
    ariaAttributes['aria-required'] = String(required)
  }

  return {
    ...props,
    id,
    name: props.name || props.path?.replace('/', '') || id,
    value: transformers.current.toInput(valueRef.current),
    error: !inFieldBlock ? error : undefined,
    hasError: Boolean(error),
    isChanged: changedRef.current,
    autoComplete:
      props.autoComplete ??
      (dataContext.autoComplete === true ? 'on' : 'off'),
    disabled,
    ariaAttributes,
    dataContext,
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    forceUpdate,
  }
}

interface ReturnAdditional<Value> {
  id: string
  name: string
  value: Value
  error: Error | FormError | undefined
  autoComplete: HTMLInputElement['autocomplete']
  disabled: boolean
  hasError: boolean
  isChanged: boolean
  dataContext: ContextState
  ariaAttributes: {
    'aria-invalid'?: 'true' | 'false'
    'aria-required'?: 'true' | 'false'
  }
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: FieldProps<unknown>['onChange']
  updateValue: (value: Value) => void
  forceUpdate: () => void
}

export function omitDataValueProps<
  OmittedProps extends ReturnAdditional<unknown>,
>(props: OmittedProps) {
  // Do not include typical HTML attributes
  const {
    name,
    error,
    hasError,
    isChanged,
    autoComplete,
    ariaAttributes,
    dataContext,
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
    forceUpdate,
    ...restProps
  } = props
  return Object.freeze(restProps) as Omit<
    OmittedProps,
    keyof ReturnAdditional<unknown>
  >
}
