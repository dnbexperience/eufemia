import {
  useRef,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react'
import pointer from 'json-pointer'
import { FormError } from '../../types'
import ajv, { ajvErrorsToOneFormError } from '../../utils/ajv'
import DataContext from '../../DataContext'
import type { FieldProps } from '../../field-types'
import { FieldGroupContext } from '../../FieldGroup'
import { makeUniqueId } from '../../../../shared/component-helper'

interface ReturnAdditional {
  setHasFocus: (hasFocus: boolean, valueOverride?: unknown) => void;
  handleFocus: FieldProps<unknown>['onFocus'];
  handleBlur: FieldProps<unknown>['onBlur'];
  handleChange: FieldProps<unknown>['onChange'];
} 

export default function useField<Props extends FieldProps<unknown>>(
  props: Props
): Props & ReturnAdditional {
  const {
    path,
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
    toInput = (value) => value,
    fromInput = (value) => value,
  } = props
  const id = useMemo(() => props.id ?? makeUniqueId(), [props.id])
  const dataContext = useContext(DataContext.Context)
  const fieldGroupContext = useContext(FieldGroupContext)
  const inFieldGroup = Boolean(fieldGroupContext)
  const {
    setFieldError: setFieldGroupError,
    setShowFieldError: setShowFieldGroupError,
  } = fieldGroupContext ?? {}
  const {
    handlePathChange: dataContextHandlePathChange,
    setPathWithError: dataContextSetPathWithError,
    errors: dataContextErrors,
  } = dataContext ?? {}

  if (path && path.substring(0, 1) !== '/') {
    throw new Error(
      'Invalid path. Input path JSON Pointers  must be from root (starting with a /).',
    )
  }

  const externalValue = useMemo(() => {
    return (
      props.value ??
      (dataContext.data &&
      path !== undefined &&
      pointer.has(dataContext.data, path)
        ? pointer.get(dataContext.data, path)
        : undefined)
    )
  }, [path, props.value, dataContext.data])

  // Hold an internal copy of the input value in case the input component is used uncontrolled,
  // and to handle errors in Eufemia on components that does not take updated callback functions into account.
  const [value, setValue] = useState(externalValue)
  const changedRef = useRef(false)

  useEffect(() => {
    // When receiving the initial value, or receiving an updated value by props, update the internal value
    // so the component can be used "controlled".
    setValue(externalValue)
  }, [externalValue])

  // Error handling
  const [error, setError] = useState<Error | FormError | undefined>()
  const [showError, setShowError] = useState<boolean>(
    Boolean(validateInitially || errorProp),
  )
  const schemaValidator = useMemo(
    () =>
      schema && Object.keys(schema).length > 0
        ? ajv.compile(schema)
        : undefined,
    [schema],
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

      setFieldGroupError?.(path ?? id, errorWithCorrectMessage)
    },
    [
      path,
      id,
      errorMessages,
      dataContextSetPathWithError,
      setFieldGroupError,
    ],
  )

  const validateValue = useCallback(
    (valueToValidate): FormError | undefined => {
      // Prioritize received validator functions first
      // Possible future change: Merge errors if multiple, like one message with each message concatinated.
      if (typeof validator === 'function') {
        // Since the validator can return either a synchronous result or an asynchronous
        Promise.resolve(validator(valueToValidate))
          // This is a validator, so it is expected to resolve with an error when the value is invalid. If it
          // throws an error, it is not caught here as that will cause programmatic errors to show inside the form
          // as if they where operational errors.
          .then(setErrorAndUpdateDataContext)
      }

      if (valueToValidate === emptyValue && required) {
        const error = new FormError('The value is required', {
          validationRule: 'required',
        }) // TO DO: Lib-specific translations
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
      setShowFieldGroupError?.(path ?? id, true)
    }
  }, [id, path, dataContext.showAllErrors, setShowFieldGroupError])
  
  const setHasFocus = useCallback((hasFocus: boolean, valueOverride?: unknown) => {
    if (hasFocus) {
      // Field was put in focus (like when clicking in a text field or opening a dropdown menu)
      onFocus?.(valueOverride ?? value)
    } else {
      // Field was removed from focus (like when tabbing out of a text field or closing a dropdown menu)
      onBlur?.(valueOverride ?? value)

      if (!changedRef.current && !validateUnchanged) {
        // Avoid showing errors when blurring without havinc hanged the value, so tabbing through several
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
          // as if they where operational errors.
          .then(setErrorAndUpdateDataContext)
      }

      // Since the user left the field, show error (if any)
      setShowError(true)
      setShowFieldGroupError?.(path ?? id, true);
    }
  }, [id, path, value, validateUnchanged, onFocus, onBlur, onBlurValidator, setErrorAndUpdateDataContext, setShowFieldGroupError]);

  const handleFocus = useCallback(() => setHasFocus(true), [setHasFocus]);
  const handleBlur = useCallback(() => setHasFocus(false), [setHasFocus]);

  const handleChange = useCallback(
    (argFromInput) => {
      const newValue = fromInput(argFromInput)
      if (newValue === value) {
        // Avoid triggering a change if the value was not actually changed. This may be caused by rendering components
        // calling onChange even if the actual value did not change.
        return;
      }
      setValue(newValue)
      changedRef.current = true
      // When changing the value, hide errors to avoid annoying the user before they are finished filling in that value
      setShowError(false)
      setShowFieldGroupError?.(path ?? id, false)
      // Always validate the value immediately when it is changed
      validateValue(newValue)

      // Tell any parent data context about the error, so they can take it into consideration when a submit button is clicked for instance
      onChange?.(newValue)
      if (path) {
        dataContextHandlePathChange?.(path, newValue)
      }
    },
    [
      id,
      path,
      value,
      onChange,
      validateValue,
      dataContextHandlePathChange,
      setShowFieldGroupError,
      fromInput,
    ],
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
    value: toInput(value),
    error: inFieldGroup ? undefined : (showError ? exportError : undefined),
    setHasFocus,
    handleFocus,
    handleBlur,
    handleChange,
  }
}
