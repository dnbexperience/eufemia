import {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import pointer from 'json-pointer'
import { FormError, FieldProps } from '../types'
import ajv, { ajvErrorsToOneFormError } from '../utils/ajv'
import { Context } from '../DataContext'
import FieldBlockContext from '../FieldBlock/FieldBlockContext'
import IterateElementContext from '../Iterate/IterateElementContext'
import { makeUniqueId } from '../../../shared/component-helper'

interface ReturnAdditional<Value> {
  id: string
  value: Value
  error: Error | FormError | undefined
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void
  handleFocus: () => void
  handleBlur: () => void
  handleChange: FieldProps<unknown>['onChange']
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
  const id = useMemo(() => props.id ?? makeUniqueId(), [props.id])
  const dataContext = useContext(Context)
  const fieldBlockContext = useContext(FieldBlockContext)
  const iterateElementContext = useContext(IterateElementContext)

  const {
    handlePathChange: dataContextHandlePathChange,
    setPathWithError: dataContextSetPathWithError,
    errors: dataContextErrors,
  } = dataContext ?? {}
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

  // Hold an internal copy of the input value in case the input component is used uncontrolled,
  // and to handle errors in Eufemia on components that does not take updated callback functions into account.
  const [value, setValue] = useState(externalValue)
  const changedRef = useRef(false)
  const hasFocusRef = useRef(false)

  useEffect(() => {
    // When receiving the initial value, or receiving an updated value by props, update the internal value
    // so the component can be used "controlled".
    setValue(externalValue)
  }, [externalValue])

  // Error handling
  const [error, setError] = useState<Error | FormError | undefined>()
  const [showError, setShowError] = useState<boolean>(
    Boolean(validateInitially || errorProp)
  )
  const schemaValidator = useMemo(
    () =>
      schema && Object.keys(schema).length > 0
        ? ajv.compile(schema)
        : undefined,
    [schema]
  )

  const setErrorAndUpdateDataContext = useCallback(
    (error: FormError | undefined) => {
      const errorWithCorrectMessage =
        error instanceof FormError &&
        typeof error.validationRule === 'string' &&
        errorMessages?.[error.validationRule] !== undefined
          ? new FormError(errorMessages[error.validationRule])
          : error

      setError(errorWithCorrectMessage)

      if (path) {
        // Tell the data context about the error, so it can stop the user from submitting the form until the error has been fixed
        dataContextSetPathWithError?.(path, Boolean(error))
      }

      setFieldBlockError?.(path ?? id, errorWithCorrectMessage)
    },
    [
      path,
      id,
      errorMessages,
      dataContextSetPathWithError,
      setFieldBlockError,
    ]
  )

  const validateValue = useCallback(
    (valueToValidate): FormError | undefined => {
      // Prioritize received validator functions first
      // Possible future change: Merge errors if multiple, like one message with each message concatenated.
      if (typeof validator === 'function') {
        // Since the validator can return either a synchronous result or an asynchronous
        Promise.resolve(validator(valueToValidate))
          // This is a validator, so it is expected to resolve with an error when the value is invalid. If it
          // throws an error, it is not caught here as that will cause programmatic errors to show inside the form
          // as if they were operational errors.
          .then(setErrorAndUpdateDataContext)
      }

      if (valueToValidate === emptyValue && required) {
        const error = new FormError('The value is required', {
          validationRule: 'required',
        })
        setErrorAndUpdateDataContext(error)
        return error
      } else if (schemaValidator) {
        // This input has a direct schema (through props)
        if (valueToValidate === undefined && emptyValue === undefined) {
          // Avoid validating undefined-values if they are expected (set with emptyValue) as they will
          // usually fail against json-schema type
          setErrorAndUpdateDataContext(undefined)
          return undefined
        }
        schemaValidator(valueToValidate)
        const error = ajvErrorsToOneFormError(schemaValidator.errors)
        setErrorAndUpdateDataContext(error)
        return error
      } else {
        // Removing any previous error from required
        setErrorAndUpdateDataContext(undefined)
        return undefined
      }
    },
    [
      schemaValidator,
      emptyValue,
      required,
      setErrorAndUpdateDataContext,
      validator,
    ]
  )

  useEffect(() => {
    // If a surrounding data context has an error for this field (by path) and no error has been set by local component validation, use the data context error
    if (!error && path && dataContextErrors?.[path]) {
      setErrorAndUpdateDataContext(dataContextErrors[path])
    }
  }, [path, dataContextErrors, error, setErrorAndUpdateDataContext])

  useEffect(() => {
    if (dataContext.showAllErrors) {
      // If showError on a surrounding data context was changed and set to true, it is because the user clicked next, submit or
      // something else that should lead to showing the user all errors.
      setShowError(true)
      setShowFieldBlockError?.(path ?? id, true)
    }
  }, [id, path, dataContext.showAllErrors, setShowFieldBlockError])

  const setHasFocus = useCallback(
    (hasFocus: boolean, valueOverride?: unknown) => {
      if (hasFocus) {
        // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
        hasFocusRef.current = true
        onFocus?.(valueOverride ?? value)
      } else {
        // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
        hasFocusRef.current = false
        onBlur?.(valueOverride ?? value)

        if (!changedRef.current && !validateUnchanged) {
          // Avoid showing errors when blurring without having changed the value, so tabbing through several
          // fields does not make errors pop up all over the place
          return
        }

        // External blur validators makes it possible to validate values but not on every character change in case of
        // expensive validation calling external services etc.
        if (typeof onBlurValidator === 'function') {
          // Since the validator can return either a synchronous result or an asynchronous
          Promise.resolve(onBlurValidator(valueOverride ?? value))
            // This is a validator, so it is expected to resolve with an error when the value is invalid. If it
            // throws an error, it is not caught here as that will cause programmatic errors to show inside the form
            // as if they were operational errors.
            .then(setErrorAndUpdateDataContext)
        }

        // Since the user left the field, show error (if any)
        setShowError(true)
        setShowFieldBlockError?.(path ?? id, true)
      }
    },
    [
      id,
      path,
      value,
      validateUnchanged,
      onFocus,
      onBlur,
      onBlurValidator,
      setErrorAndUpdateDataContext,
      setShowFieldBlockError,
    ]
  )

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus])
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus])

  const handleChange = useCallback(
    (argFromInput) => {
      const newValue = fromInput(argFromInput)

      if (newValue === value) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return
      }
      setValue(newValue)
      changedRef.current = true

      if (
        continuousValidation ||
        (continuousValidation !== false && !hasFocusRef.current)
      ) {
        // When there is a change to the value without there having been any focus callback beforehand, it is likely
        // to believe that the blur callback will not be called either, which would trigger the display of the error.
        // The error is therefore displayed immediately (unless instructed not to with continuousValidation set to false).
        setShowError(true)
        setShowFieldBlockError?.(path ?? id, true)
      } else {
        // When changing the value, hide errors to avoid annoying the user before they are finished filling in that value
        setShowError(false)
        setShowFieldBlockError?.(path ?? id, false)
      }
      // Always validate the value immediately when it is changed
      validateValue(newValue)

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
    },
    [
      id,
      path,
      elementPath,
      iterateElementIndex,
      value,
      continuousValidation,
      onChange,
      validateValue,
      dataContextHandlePathChange,
      setShowFieldBlockError,
      handleIterateElementChange,
      fromInput,
    ]
  )

  const exportError = useMemo(() => errorProp ?? error, [errorProp, error])

  useEffect(() => {
    // Mount procedure
    if (path) {
      dataContext?.handleMountField(path)
    }
    validateValue(externalValue)

    return () => {
      // Unmount procedure
      if (path) {
        dataContext?.handleUnMountField(path)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only run for mount and unmount
  }, [])

  return {
    ...props,
    id,
    name: props.name || props.path?.replace('/', '') || id,
    value: toInput(value),
    error: inFieldBlock ? undefined : showError ? exportError : undefined,
    autoComplete:
      props.autoComplete ??
      (dataContext.autoComplete === true ? 'on' : 'off'),
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
  }
}
