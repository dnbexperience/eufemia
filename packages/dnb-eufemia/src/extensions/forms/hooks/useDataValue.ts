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
} from '../types'
import { Context as DataContext, ContextState } from '../DataContext'
import { combineDescribedBy } from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import useUpdateEffect from '../../../shared/helpers/useUpdateEffect'
import useMountEffect from '../../../shared/helpers/useMountEffect'
import useUnmountEffect from '../../../shared/helpers/useUnmountEffect'
import SharedContext from '../../../shared/Context'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateElementContext'
import useProcessManager from './useProcessManager'
import {
  createSharedState,
  useSharedState,
} from '../../../shared/helpers/useSharedState'
import { isAsync } from '../../../shared/helpers/isAsync'

export default function useDataValue<
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
    handlePathChange: handlePathChangeInDataContext,
    updateDataValue: updateDataValueInDataContext,
    validateData: validateDataInDataContext,
    setFieldState: setFieldStateInDataContext,
    setProps: setPropsInDataContext,
    errors: dataContextErrors,
    contextErrorMessages,
  } = dataContext ?? {}

  const dataContextError = path ? dataContextErrors?.[path] : undefined
  const inFieldBlock = Boolean(fieldBlockContext)
  const {
    setFieldState: setFieldBlockState,
    showFieldError: showFieldBlockError,
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
  const showErrorInitially = validateInitially || errorProp
  // - Local errors are errors based on validation instructions received by
  const localErrorRef = useRef<Error | FormError | undefined>()
  // - Context errors are from outer contexts, like validation for this field as part of the whole data set
  const contextErrorRef = useRef<Error | FormError | undefined>(
    dataContextError
  )

  // Put props into the surrounding data context
  setPropsInDataContext?.(identifier, props)

  const showErrorRef = useRef<boolean>(Boolean(showErrorInitially))
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

  const fieldStateRef = useRef<SubmitState>()
  const setFieldState = useCallback(
    (state: SubmitState) => {
      fieldStateRef.current = state
      setFieldStateInDataContext(identifier, state)
      if (!validateInitially) {
        forceUpdate()
      }
    },
    [setFieldStateInDataContext, identifier, validateInitially]
  )

  const showError = useCallback(() => {
    showErrorRef.current = true
    showFieldBlockError?.(identifier, true)
  }, [showFieldBlockError, identifier])

  const hideError = useCallback(() => {
    showErrorRef.current = false
    showFieldBlockError?.(identifier, false)
  }, [showFieldBlockError, identifier])

  const error = showErrorRef.current
    ? errorProp ?? localErrorRef.current ?? contextErrorRef.current
    : undefined

  const hasError =
    Boolean(error) || (inFieldBlock && fieldBlockContext.hasErrorProp)

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
  const stateId = useId()
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
      setFieldStateInDataContext?.(identifier, error ? 'error' : undefined)

      setFieldBlockState?.({
        stateId,
        identifier,
        type: 'error',
        state: error,
        showInitially: Boolean(inFieldBlock && validateInitially),
      })

      forceUpdate()
    },
    [
      stateId,
      prepareError,
      setFieldStateInDataContext,
      identifier,
      setFieldBlockState,
      inFieldBlock,
      validateInitially,
    ]
  )

  const clearErrorState = useCallback(
    () => persistErrorState(undefined),
    [persistErrorState]
  )

  const callValidator = useCallback(async () => {
    const runAsync = isAsync(validatorRef.current)

    if (runAsync) {
      setFieldState('pending')
    }

    const opts = {
      ...contextErrorMessages,
      ...errorMessagesRef.current,
    }

    // Run the validator with await regardless (for jest.fn() to work as expected)
    const result = await validatorRef.current?.(valueRef.current, opts)

    persistErrorState(result as Error)

    if (runAsync) {
      setFieldState(result instanceof Error ? 'error' : 'complete')
    }

    // Because its a better UX to show the error when the validation is async/delayed
    if (continuousValidation || runAsync) {
      // Because we first need to throw the error to be able to display it, we delay the showError call
      window.requestAnimationFrame(() => {
        showError()
        forceUpdate()
      })
    }

    return result
  }, [
    contextErrorMessages,
    continuousValidation,
    persistErrorState,
    setFieldState,
    showError,
  ])

  const callOnBlurValidator = useCallback(
    async ({ valueOverride = null } = {}) => {
      // External blur validators makes it possible to validate values but not on every character change in case of
      // expensive validation calling external services etc.

      // Since the validator can return either a synchronous result or an asynchronous
      const value = transformers.current.toEvent(
        valueOverride ?? valueRef.current,
        'onBlurValidator'
      )

      const runAsync = isAsync(onBlurValidatorRef.current)

      if (runAsync) {
        setFieldState('pending')
      }

      // Run the onBlurValidator with await regardless (for jest.fn() to work as expected)
      const result = await onBlurValidatorRef.current(value)

      persistErrorState(result as Error)

      if (runAsync) {
        setFieldState(result instanceof Error ? 'error' : 'complete')
      }

      showError()
      forceUpdate()
    },
    [persistErrorState, setFieldState, showError]
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

        if (typeof onBlurValidatorRef.current === 'function') {
          await callOnBlurValidator({ valueOverride })
        }

        // Since the user left the field, show error (if any)
        if (fieldStateRef.current !== 'pending') {
          showError()
          forceUpdate()
        }
      }
    },
    [callOnBlurValidator, onBlur, onFocus, showError, validateUnchanged]
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
        handlePathChangeInDataContext?.(path, newValue)
      }

      forceUpdate()
    },
    [handlePathChangeInDataContext, handleError, path, validateValue]
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

      changedRef.current = true

      updateValue(newValue)

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
        updateDataValueInDataContext?.(path, value, { disabled })
        validateDataInDataContext?.()
      }
    }
  }, [
    dataContext.data,
    dataContext.id,
    updateDataValueInDataContext,
    validateDataInDataContext,
    disabled,
    path,
    props.value,
  ])

  useEffect(() => {
    if (dataContext.showAllErrors) {
      // If showError on a surrounding data context was changed and set to true, it is because the user clicked next, submit or
      // something else that should lead to showing the user all errors.
      showError()
      forceUpdate()
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

  // Validate/call validator functions during submit of the form
  useMountEffect(() => {
    dataContext?.setEventListener?.(identifier, 'onSubmit', () => {
      if (typeof validatorRef.current === 'function') {
        callValidator()
      }
      if (typeof onBlurValidatorRef.current === 'function') {
        callOnBlurValidator()
      }
    })
  })

  // Set the error in the field block context if this field is inside a field block
  useMountEffect(() => {
    if (inFieldBlock) {
      if (errorProp) {
        setFieldBlockState?.({
          identifier,
          type: 'error',
          state: errorProp,
          showInitially: true,
          show: true,
        })
      }
      if (warning) {
        setFieldBlockState?.({
          identifier,
          type: 'warning',
          state: warning,
          showInitially: true,
          show: true,
        })
      }
      if (info) {
        setFieldBlockState?.({
          identifier,
          type: 'info',
          state: info,
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

  // - Handle ariaAttributes
  const ariaAttributes = useMemo(() => {
    return Object.keys(props).reduce<AriaAttributes>((acc, cur) => {
      if (!cur.startsWith('aria-')) {
        return acc
      }
      acc[cur] = props[cur]
      return acc
    }, {})
  }, [props])
  if (error) {
    ariaAttributes['aria-invalid'] = error ? 'true' : 'false'
  }
  if (required) {
    ariaAttributes['aria-required'] = required ? 'true' : 'false'
  }
  if (inFieldBlock) {
    // Mount the field in the field block context
    if (fieldBlockContext.mountedFieldsRef) {
      fieldBlockContext.mountedFieldsRef.current[identifier] = true
    }

    // Check if there are any state IDs to be added to the aria-describedby attribute
    const stateIds = fieldBlockContext.fieldStateIdsRef?.current

    if (stateIds) {
      ariaAttributes['aria-describedby'] = combineDescribedBy(
        props,
        [
          error && stateIds.error,
          warning && stateIds.warning,
          info && stateIds.info,
        ].filter(Boolean)
      )
    }
  } else {
    ariaAttributes['aria-describedby'] = combineDescribedBy(
      props,
      [
        (error || errorProp) && `${id}-form-status--error`,
        warning && `${id}-form-status--warning`,
        info && `${id}-form-status--info`,
      ].filter(Boolean)
    )
  }

  const fieldState = fieldStateRef.current
  const fieldBLockProps = {
    /** Documented APIs */
    info: !inFieldBlock ? info : undefined,
    warning: !inFieldBlock ? warning : undefined,
    error: !inFieldBlock ? error : undefined,

    /** HTML Attributes */
    disabled:
      onBlurValidator && fieldState === 'pending' ? true : disabled,

    /** Internal */
    fieldState,
  }

  const sharedData = useSharedState(id)
  sharedData.set(fieldBLockProps)

  return {
    ...props,
    ...fieldBLockProps,

    /** HTML Attributes */
    name: props.name || props.path?.replace('/', '') || id,
    autoComplete:
      props.autoComplete ??
      (dataContext.autoComplete === true ? 'on' : undefined),

    /** Documented APIs */
    id,
    value: transformers.current.toInput(valueRef.current),
    hasError,
    isChanged: changedRef.current,
    ariaAttributes,
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
  ariaAttributes: AriaAttributes
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: FieldProps<Value>['onChange']
  updateValue: (value: Value) => void
  forceUpdate: () => void

  /** Internal */
  dataContext: ContextState
  fieldState: SubmitState
}

export function omitDataValueProps<
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
    ariaAttributes, // eslint-disable-line
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
