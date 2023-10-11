import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { JSONSchema7 } from 'json-schema'
import ajv, { ajvErrorsToFormErrors } from '../../utils/ajv'
import { FormError } from '../../types'
import Context from '../Context'

/**
 * Deprecated, as it is supported my all mihor browsers and Node.js >=v18
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
}: Props<Data>) {
  // Prop error handling
  if (data !== undefined && sessionStorageId !== undefined) {
    console.error(
      'Providing both data and sessionStorageId could lead to competing data sources. To provide default data to use only before anything is changed in the interface, use defaultData.'
    )
  }

  // State
  const wasMounted = useRef(false)
  const initialData = useMemo(() => {
    if (sessionStorageId && typeof window !== 'undefined') {
      const sessionDataJSON =
        window.sessionStorage?.getItem(sessionStorageId)
      if (sessionDataJSON) {
        return JSON.parse(sessionDataJSON)
      }
    }
    return data ?? defaultData
  }, [data, defaultData, sessionStorageId])
  const ajvSchemaValidator = useMemo(
    () => (schema ? ajv.compile(schema) : undefined),
    [schema]
  )
  const [internalData, setInternalData] =
    useState<Partial<Data>>(initialData)
  const mountedFieldPathsRef = useRef<string[]>([])

  // Errors from provider validation (the whole data set)
  const errorsRef = useRef<Record<string, FormError>>({})
  const [showAllErrors, setShowAllErrors] = useState<boolean>(false)
  // Errors reported by fields, based on their direct validation rules
  const pathsWithErrorRef = useRef<string[]>([])

  const hasErrors = useCallback(
    () =>
      Boolean(
        mountedFieldPathsRef.current.find(
          (mountedFieldPath) =>
            errorsRef.current[mountedFieldPath] !== undefined ||
            pathsWithErrorRef.current.includes(mountedFieldPath)
        )
      ),
    []
  )

  useEffect(() => {
    if (!wasMounted.current) {
      wasMounted.current = true
      return
    }
    // When receivint the initial data, or receiving updated data by props, update the internal data (controlled state)
    setInternalData(data)
  }, [data])

  const validateBySchema = useCallback(
    (data: Partial<Data>): Record<string, Error> | undefined => {
      if (!ajvSchemaValidator) {
        // No schema-based validator. Assume data is valid.
        return
      }

      if (!ajvSchemaValidator(data)) {
        // Errors found
        const errors = ajvErrorsToFormErrors(ajvSchemaValidator.errors)
        return errors
      } else {
        return
      }
    },
    [ajvSchemaValidator]
  )

  const validateBySchemaAndUpdateState = useCallback(
    (data: Partial<Data>) => {
      errorsRef.current = validateBySchema(data) ?? {}
    },
    [validateBySchema]
  )

  const setPathWithError = useCallback(
    (path: string, hasError: boolean) => {
      pathsWithErrorRef.current = hasError
        ? addListPath(pathsWithErrorRef.current, path)
        : removeListPath(pathsWithErrorRef.current, path)
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
            internalData ?? (path.match(isArrayJsonPointer) ? [] : {})
      )
      if (path !== '/') {
        pointer.set(newData as Data, path, value)
      }

      onChange?.(newData)

      if (sessionStorageId && typeof window !== 'undefined') {
        window.sessionStorage?.setItem(
          sessionStorageId,
          JSON.stringify(newData)
        )
      }

      validateBySchemaAndUpdateState(newData)

      setInternalData(newData)

      setShowAllErrors(false)
    },
    [internalData, onChange, onPathChange, validateBySchemaAndUpdateState]
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
  const handleSubmit = useCallback(() => {
    if (!hasErrors()) {
      onSubmit?.(internalData as Data)
      if (scrollTopOnSubmit) {
        typeof window !== 'undefined' &&
          window?.scrollTo({ top: 0, behavior: 'smooth' })
      }
    } else {
      setShowAllErrors(true)
      onSubmitRequest?.()
    }
    return internalData
  }, [
    internalData,
    scrollTopOnSubmit,
    hasErrors,
    onSubmit,
    onSubmitRequest,
  ])

  useEffect(() => {
    // Mount procedure
    if (initialData) {
      // Validate the initial data to know if the user can submit, and to show errors if inputs are requested to with props
      validateBySchemaAndUpdateState(initialData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only run for mount and unmount
  }, [])

  return (
    <Context.Provider
      value={{
        data: internalData,
        handlePathChange,
        handleSubmit,
        errors: errorsRef.current,
        showAllErrors,
        setShowAllErrors,
        mountedFieldPaths: mountedFieldPathsRef.current,
        handleMountField,
        handleUnMountField,
        hasErrors,
        setPathWithError,
      }}
    >
      {children}
    </Context.Provider>
  )
}
