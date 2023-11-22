import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { JSONSchema7 } from 'json-schema'
import { ValidateFunction } from 'ajv'
import ajv, { ajvErrorsToFormErrors } from '../../utils/ajv'
import { FormError } from '../../types'
import useMountEffect from '../../hooks/useMountEffect'
import useUpdateEffect from '../../hooks/useUpdateEffect'
import Context, { ContextState } from '../Context'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export interface Props<Data extends JsonObject> {
  /** Default source data, only used if no other source is available, and not leading to updates if changed after mount */
  defaultData?: Partial<Data>
  /** Dynamic source data used as both initial data, and updates internal data if changed after mount */
  data?: Partial<Data>
  /** JSON Schema for validating the data, like during input or after attempting submit */
  schema?: JSONSchema7
  /** Change handler for the whole data set */
  onChange?: (data: Data) => void
  /** Change handler for each value  */
  onPathChange?: (path: string, value: any) => void
  /** Submit called, data was valid (if validation available) */
  onSubmit?: (data: Data) => void
  /** Submit was requested, but data was invalid */
  onSubmitRequest?: () => void
  scrollTopOnSubmit?: boolean
  /** Key for caching the data in session storage */
  sessionStorageId?: string
  children: React.ReactNode
}

type PathList = string[]

function addListPath(paths: PathList, path: string): PathList {
  return paths.includes(path) ? paths : paths.concat(path)
}

function removeListPath(paths: PathList, path: string): PathList {
  return paths.filter((thisPath) => thisPath !== path)
}

const isArrayJsonPointer = /^\/\d+(\/|$)/

export default function Provider<Data extends JsonObject>({
  defaultData,
  data,
  schema,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  scrollTopOnSubmit,
  sessionStorageId,
  children,
  ...rest
}: Props<Data>) {
  const [, forceUpdate] = useReducer(() => ({}), {})
  // Prop error handling
  if (data !== undefined && sessionStorageId !== undefined) {
    console.error(
      'Providing both data and sessionStorageId could lead to competing data sources. To provide default data to use only before anything is changed in the interface, use defaultData.'
    )
  }

  // State
  const mountedFieldPathsRef = useRef<string[]>([])
  // - Errors from provider validation (the whole data set)
  const errorsRef = useRef<Record<string, FormError> | undefined>()
  const showAllErrorsRef = useRef<boolean>(false)
  const setShowAllErrors = useCallback((showAllErrors: boolean) => {
    showAllErrorsRef.current = showAllErrors
  }, [])
  // - Errors reported by fields, based on their direct validation rules
  const valuesWithErrorRef = useRef<string[]>([])
  // - Data
  const initialData = useMemo(() => {
    if (sessionStorageId && typeof window !== 'undefined') {
      const sessionDataJSON =
        window.sessionStorage?.getItem(sessionStorageId)
      if (sessionDataJSON) {
        return JSON.parse(sessionDataJSON)
      }
    }
    return data ?? defaultData
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Avoid triggering code that should only run initially
  }, [])
  const internalDataRef = useRef<Partial<Data>>(initialData)
  // - Validator
  const ajvSchemaValidatorRef = useRef<ValidateFunction>()

  const validateData = useCallback(() => {
    if (!ajvSchemaValidatorRef.current) {
      // No schema-based validator. Assume data is valid.
      return
    }

    if (!ajvSchemaValidatorRef.current(internalDataRef.current)) {
      // Errors found
      const errors = ajvErrorsToFormErrors(
        ajvSchemaValidatorRef.current.errors
      )
      errorsRef.current = errors
    } else {
      errorsRef.current = undefined
    }
    forceUpdate()
  }, [])

  useEffect(() => {
    if (!schema) {
      return
    }
    ajvSchemaValidatorRef.current = ajv.compile(schema)
    validateData()
  }, [schema, validateData])

  // Error handling
  const hasErrors = useCallback(
    () =>
      Boolean(
        mountedFieldPathsRef.current.find(
          (mountedFieldPath) =>
            errorsRef.current?.[mountedFieldPath] !== undefined ||
            valuesWithErrorRef.current.includes(mountedFieldPath)
        )
      ),
    []
  )

  const setValueWithError = useCallback(
    (identifier: string, withError: boolean) => {
      if (withError !== valuesWithErrorRef.current.includes(identifier)) {
        // The boolean error state for the target value was changed
        valuesWithErrorRef.current = withError
          ? addListPath(valuesWithErrorRef.current, identifier)
          : removeListPath(valuesWithErrorRef.current, identifier)
        forceUpdate()
      }
    },
    []
  )

  const handlePathChange = useCallback(
    (path, value) => {
      if (!path) {
        return
      }
      onPathChange?.(path, value)

      // Update the data even if it contains errors. Submit/SubmitRequest will be called accordingly
      const newData = structuredClone(
        path === '/'
          ? // When setting the root of the data, the whole data set should be the new value
            value
          : // For sub paths, use the the existing data set (or empty array/object), but modify it below (since pointer.set is not immutable)
            internalDataRef.current ??
              (path.match(isArrayJsonPointer) ? [] : {})
      )
      if (path !== '/') {
        pointer.set(newData as Data, path, value)
      }

      onChange?.(newData as Data)

      if (sessionStorageId && typeof window !== 'undefined') {
        window.sessionStorage?.setItem(
          sessionStorageId,
          JSON.stringify(newData)
        )
      }

      internalDataRef.current = newData

      validateData()
      showAllErrorsRef.current = false
      forceUpdate()
    },
    [onChange, onPathChange, validateData, sessionStorageId]
  )

  // Mounted fields
  const handleMountField = useCallback((path: string) => {
    mountedFieldPathsRef.current = addListPath(
      mountedFieldPathsRef.current,
      path
    )
  }, [])

  const handleUnMountField = useCallback((path: string) => {
    mountedFieldPathsRef.current = removeListPath(
      mountedFieldPathsRef.current,
      path
    )
  }, [])

  /**
   * Request to submit the whole form
   */
  const handleSubmit = useCallback<ContextState['handleSubmit']>(
    ({ formElement = null } = {}) => {
      if (!hasErrors()) {
        onSubmit?.(internalDataRef.current as Data)

        formElement?.reset?.()

        if (typeof window !== 'undefined') {
          if (sessionStorageId) {
            window.sessionStorage.removeItem(sessionStorageId)
          }

          if (scrollTopOnSubmit) {
            window?.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }
      } else {
        showAllErrorsRef.current = true
        onSubmitRequest?.()
        forceUpdate()
      }
      return internalDataRef.current
    },
    [
      scrollTopOnSubmit,
      hasErrors,
      onSubmit,
      onSubmitRequest,
      sessionStorageId,
    ]
  )

  useMountEffect(() => {
    // Validate the initial data
    validateData()
  })

  useUpdateEffect(() => {
    // Update and validate changes to the external data set
    internalDataRef.current = data
    validateData()
    forceUpdate()
  }, [data, validateData, forceUpdate])

  return (
    <Context.Provider
      value={{
        data: internalDataRef.current,
        ...rest,
        handlePathChange,
        handleSubmit,
        errors: errorsRef.current,
        showAllErrors: showAllErrorsRef.current,
        setShowAllErrors,
        mountedFieldPaths: mountedFieldPathsRef.current,
        handleMountField,
        handleUnMountField,
        hasErrors,
        setValueWithError,
      }}
    >
      {children}
    </Context.Provider>
  )
}
