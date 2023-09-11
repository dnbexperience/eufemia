import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { JSONSchema7 } from 'json-schema'
import ajv, { ajvErrorsToFormErrors } from '../utils/ajv'
import { FormError } from '../types'
import Context from './Context'

export interface Props<Data extends JsonObject> {
  data: Partial<Data>
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
  children: React.ReactNode
}

type PathList = string[]

function addListPath(paths: PathList, path: string): PathList {
  return paths.includes(path) ? paths : paths.concat(path)
}

function removeListPath(paths: PathList, path: string): PathList {
  return paths.filter((thisPath) => thisPath !== path)
}

export default function Provider<Data extends JsonObject>({
  data: externalData,
  schema,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  scrollTopOnSubmit,
  children,
}: Props<Data>) {
  const ajvSchemaValidator = useMemo(
    () => (schema ? ajv.compile(schema) : undefined),
    [schema]
  )
  const [internalData, setInternalData] =
    useState<Partial<Data>>(externalData)
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
    // When receivint the initial data, or receiving updated data by props, update the internal data (controlled state)
    setInternalData(externalData)
  }, [externalData])

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
      const newData = structuredClone(path === '/' ? value : internalData)
      if (path !== '/') {
        pointer.set(newData as Data, path, value)
      }

      onChange?.(newData)

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
        window && window?.scrollTo({ top: 0, behavior: 'smooth' })
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
    if (externalData) {
      // Validate the initial data to know if the user can submit, and to show errors if inputs are requested to with props
      validateBySchemaAndUpdateState(externalData)
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
