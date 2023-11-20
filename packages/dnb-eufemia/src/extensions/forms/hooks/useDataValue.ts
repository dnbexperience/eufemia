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
import { FormError, FieldProps } from '../types'
import { Context } from '../DataContext'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateElementContext'
import { makeUniqueId } from '../../../shared/component-helper'
import useMountEffect from './useMountEffect'
import useUpdateEffect from './useUpdateEffect'
import useProcessManager from './useProcessManager'

interface ReturnAdditional<Value> {
  id: string
  value: Value
  error: Error | FormError | undefined
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: FieldProps<unknown>['onChange']
  updateValue: (value: Value) => void
}

export default function useDataValue<
  Value = unknown,
  Props extends FieldProps<Value> = FieldProps<Value>,
>(props: Props): Props & ReturnAdditional<Value> {
  const {
    path,
    elementPath,
    emptyValue,
    required,
    error: errorProp,
    onFocus,
    onBlur,
    onChange,
    validator,
    onBlurValidator,
    schema,
    errorMessages,
    validateInitially,
    validateUnchanged,
    continuousValidation,
    toInput = (value) => value,
    fromInput = (value) => value,
  } = props
  const [, forceUpdate] = useReducer(() => ({}), {})
  const { startProcess } = useProcessManager()
  const id = useMemo(() => props.id ?? makeUniqueId(), [props.id])
  const dataContext = useContext(Context)
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateElementContext = useContext(IterateElementContext)

  const {
    handlePathChange: dataContextHandlePathChange,
    setPathWithError: dataContextSetPathWithError,
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
  if (elementPath && elementPath.substring(0, 1) !== '/') {
    throw new Error(
      'Invalid elementPath. Element pathJSON Pointers must be from root of iterate element (starting with a /).'
    )
  }
  if (elementPath && !iterateElementContext) {
    throw new Error(
      'elementPath cannot be used when not inside an iterate element context. Wrap the component in an Iterate.Loop.'
    )
  }

  const externalValue = useMemo(() => {
    if (props.value !== undefined) {
      // Value-prop sent directly to the field has highest priority, overriding any surrounding source
      return props.value
    }

    if (inIterate && elementPath) {
      // This field is inside an iterate, and has a pointer from the base of the element being iterated
      if (elementPath === '/') {
        return iterateElementValue
      }

      return pointer.has(iterateElementValue, elementPath)
        ? pointer.get(iterateElementValue, elementPath)
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
    path,
    elementPath,
    inIterate,
    iterateElementValue,
    props.value,
    dataContext.data,
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
  const schemaRef = useRef(schema)
  useEffect(() => {
    schemaRef.current = schema
  }, [schema])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (path) {
        // Tell the data context about the error, so it can stop the user from submitting the form until the error has been fixed
        dataContextSetPathWithError?.(path, Boolean(error))
      }

      setFieldBlockError?.(path ?? id, error)
      forceUpdate()
    },
    [
      path,
      id,
      prepareError,
      dataContextSetPathWithError,
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
      if (valueRef.current === emptyValue && required) {
        throw new FormError('The value is required', {
          validationRule: 'required',
        })
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
        const res = await validatorRef.current?.(valueRef.current)
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
    emptyValue,
    required,
    startProcess,
    persistErrorState,
    clearErrorState,
  ])

  useUpdateEffect(() => {
    if (!schema) {
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
    }
  }, [dataContext.showAllErrors, showError])

  const setHasFocus = useCallback(
    (hasFocus: boolean, valueOverride?: Value) => {
      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        onFocus?.(valueOverride ?? valueRef.current)
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        onBlur?.(valueOverride ?? valueRef.current)

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
            onBlurValidator(valueOverride ?? valueRef.current)
          ).then(persistErrorState)
        }

        // Since the user left the field, show error (if any)
        showError()
        forceUpdate()
      }
    },
    [
      validateUnchanged,
      onFocus,
      onBlur,
      onBlurValidator,
      persistErrorState,
      showError,
      forceUpdate,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

  const updateValue = useCallback(
    (argFromInput) => {
      valueRef.current = fromInput(argFromInput)
      forceUpdate()
    },
    [fromInput]
  )

  const handleChange = useCallback(
    (argFromInput) => {
      const newValue = fromInput(argFromInput)

      if (newValue === valueRef.current) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }
      valueRef.current = newValue
      changedRef.current = true

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
      // Always validate the value immediately when it is changed
      validateValue()

      onChange?.(newValue)
      if (path) {
        dataContextHandlePathChange?.(path, newValue)
      }
      if (elementPath) {
        const iterateValuePath = `/${iterateElementIndex}${
          elementPath && elementPath !== '/' ? elementPath : ''
        }`
        handleIterateElementChange?.(iterateValuePath, newValue)
      }
      forceUpdate()
    },
    [
      path,
      elementPath,
      iterateElementIndex,
      continuousValidation,
      onChange,
      validateValue,
      dataContextHandlePathChange,
      showError,
      hideError,
      handleIterateElementChange,
      fromInput,
      forceUpdate,
    ]
  )

  useMountEffect(() => {
    if (path) {
      dataContext?.handleMountField(path)
    }
    validateValue()

    if (showErrorInitially) {
      showError()
    }

    return () => {
      // Unmount procedure
      if (path) {
        dataContext?.handleUnMountField(path)
      }
    }
  })

  return {
    ...props,
    id,
    name: props.name || props.path?.replace('/', '') || id,
    value: toInput(valueRef.current),
    error:
      !inFieldBlock && showErrorRef.current
        ? errorProp ?? localErrorRef.current ?? contextErrorRef.current
        : undefined,
    autoComplete:
      props.autoComplete ??
      (dataContext.autoComplete === true ? 'on' : 'off'),
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
    updateValue,
  }
}
