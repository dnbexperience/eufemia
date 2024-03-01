import React, { useRef, useMemo, useCallback, useReducer } from 'react'
import pointer, { JsonObject } from 'json-pointer'
import { ValidateFunction } from 'ajv/dist/2020'
import {
  Ajv,
  makeAjvInstance,
  ajvErrorsToFormErrors,
} from '../../utils/ajv'
import {
  FormError,
  CustomErrorMessagesWithPaths,
  AllJSONSchemaVersions,
  FieldProps,
  Path,
} from '../../types'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../../../shared/helpers/useUpdateEffect'
import { useSharedState } from '../../../../shared/helpers/useSharedState'
import Context, { ContextState } from '../Context'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export type UpdateDataValue = (path: Path, data: unknown) => void

export type FilterDataHandler<Data> = (
  data: Data,
  filter: FilterData
) => Partial<Data>
export type FilterData = (
  path: Path,
  value: any,
  props: FieldProps
) => boolean | undefined

export type OnSubmitReturn = {
  /** Will remove browser-side stored autocomplete data  */
  resetForm: () => void
  /** Will empty the whole internal data set of the form  */
  clearData: () => void
}

export type OnSubmit<Data = JsonObject> = (
  data: Partial<Data>,
  { resetForm, clearData }: OnSubmitReturn
) => void

export interface Props<Data extends JsonObject> {
  /**
   * Unique ID to communicate with the hook Form.useData
   */
  id?: string
  /**
   * Default source data, only used if no other source is available, and not leading to updates if changed after mount
   */
  defaultData?: Partial<Data>
  /**
   * Source data, will be used instead of defaultData, and leading to updates if changed after mount
   */
  data?: Partial<Data>
  /**
   * JSON Schema to validate the data against.
   */
  schema?: AllJSONSchemaVersions
  /**
   * Custom Ajv instance, if you want to use your own
   */
  ajvInstance?: Ajv
  /**
   * Custom error messages for the whole data set
   */
  errorMessages?: CustomErrorMessagesWithPaths
  /**
   * Filter the internal data context based on your criteria: `(path, value, props) => !props?.disabled`. It will iterate on each data entry.
   */
  filterData?: FilterData
  /**
   * Change handler for the whole data set
   */
  onChange?: (data: Data) => void
  /**
   * Change handler for each value
   */
  onPathChange?: (path: Path, value: any) => void
  /**
   * Submit called, data was valid (if validation available)
   */
  onSubmit?: OnSubmit
  /**
   * Submit was requested, but data was invalid
   */
  onSubmitRequest?: () => void
  /**
   * Scroll to top on submit
   */
  scrollTopOnSubmit?: boolean
  /**
   * Key for caching the data in session storage
   */
  sessionStorageId?: string
  children: React.ReactNode
}

const isArrayJsonPointer = /^\/\d+(\/|$)/

export default function Provider<Data extends JsonObject>({
  id,
  defaultData,
  data,
  schema,
  onChange,
  onPathChange,
  onSubmit,
  onSubmitRequest,
  scrollTopOnSubmit,
  sessionStorageId,
  ajvInstance,
  filterData,
  errorMessages: contextErrorMessages,
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

  // - Ajv
  const ajvRef = useRef<Ajv>(makeAjvInstance(ajvInstance))
  // - Paths
  const mountedFieldPathsRef = useRef<Path[]>([])
  // - Errors from provider validation (the whole data set)
  const errorsRef = useRef<Record<string, FormError> | undefined>()
  const showAllErrorsRef = useRef<boolean>(false)
  const setShowAllErrors = useCallback((showAllErrors: boolean) => {
    showAllErrorsRef.current = showAllErrors
    forceUpdate()
  }, [])

  // - Errors reported by fields, based on their direct validation rules
  const valuesWithErrorRef = useRef<Path[]>([])

  // - Data
  const initialData = useMemo<Data>(() => {
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
  const ajvValidatorRef = useRef<ValidateFunction>()
  const validateDataNow = useCallback(() => {
    if (!ajvValidatorRef.current) {
      // No schema-based validator. Assume data is valid.
      return
    }

    if (!ajvValidatorRef.current?.(internalDataRef.current)) {
      // Errors found
      errorsRef.current = ajvErrorsToFormErrors(
        ajvValidatorRef.current.errors
      )
    } else {
      errorsRef.current = undefined
    }
  }, [])
  const validateData = useCallback(() => {
    if (!ajvValidatorRef.current) {
      // No schema-based validator. Assume data is valid.
      return
    }

    validateDataNow()
    forceUpdate()
  }, [validateDataNow])

  // - Error handling
  const hasFieldError = useCallback((path: Path) => {
    return Boolean(
      errorsRef.current?.[path] !== undefined ||
        valuesWithErrorRef.current.includes(path)
    )
  }, [])
  const hasErrors = useCallback(() => {
    return Boolean(
      mountedFieldPathsRef.current.find((path) => hasFieldError(path))
    )
  }, [hasFieldError])

  /**
   * Sets the error state for a specific path
   */
  const setValueWithError = useCallback(
    (path: Path, withError: boolean) => {
      if (withError !== valuesWithErrorRef.current.includes(path)) {
        // The boolean error state for the target value was changed
        valuesWithErrorRef.current = withError
          ? addListPath(valuesWithErrorRef.current, path)
          : removeListPath(valuesWithErrorRef.current, path)
        forceUpdate()
      }
    },
    []
  )

  /**
   * Filter the data set based on the filterData function
   */
  const filterDataHandler = useCallback(
    (data: Data, filter = filterData) => {
      if (filter) {
        const filtered = { ...data }
        Object.entries(fieldPropsRef.current).forEach(([path, props]) => {
          const exists = pointer.has(data, path)
          const result = filter(
            path,
            exists ? pointer.get(data, path) : undefined,
            props
          )
          if (result === false && exists) {
            pointer.remove(filtered, path)
          }
        })

        return filtered
      }

      return data
    },
    [filterData]
  )
  const fieldPropsRef = useRef<Record<string, FieldProps>>({})
  const setProps = useCallback(
    (path: Path, props: Record<string, unknown>) => {
      fieldPropsRef.current[path] = props
    },
    []
  )

  // - Shared state
  const sharedData = useSharedState<Data>(id)
  const sharedAttachments = useSharedState<{
    filterDataHandler?: Props<Data>['filterData']
    hasErrors?: () => boolean
    rerenderUseDataHook?: () => void
  }>(id + '-attachments')

  const updateSharedData = sharedData.update
  const extendSharedData = sharedData.extend
  const extendAttachment = sharedAttachments.extend
  const rerenderUseDataHook = sharedAttachments.data?.rerenderUseDataHook

  const cacheRef = useRef({
    data,
    schema,
    shared: sharedData.data,
    hasUsedInitialData: false,
  })

  internalDataRef.current = useMemo(() => {
    // NB: "sharedData.data" is only available on a rerender.
    // Update the shared state, if initialData is given and no shared state is available.
    // We do almost the same later in a useLayoutEffect, but we need to do it here as well, so we set the data as early as possible.
    if (id && initialData && !sharedData.data) {
      sharedData.update(initialData)
    }

    // Merge both internal data and the shared state, if it both where given
    if (
      id &&
      initialData &&
      sharedData.data &&
      cacheRef.current.shared === sharedData.data &&
      internalDataRef.current === initialData
    ) {
      return {
        ...internalDataRef.current,
        ...sharedData.data,
      }
    }

    // Use shared state if no initial and initial data, and the shared state exists
    if (
      id &&
      !initialData &&
      !internalDataRef.current &&
      sharedData.data &&
      cacheRef.current.shared === sharedData.data
    ) {
      return sharedData.data
    }

    // Merge the internal data with the shared state, if the shared was updated and not the same as internal data
    if (
      id &&
      sharedData.data &&
      cacheRef.current.shared !== sharedData.data &&
      sharedData.data !== internalDataRef.current
    ) {
      cacheRef.current.shared = sharedData.data
      return {
        ...internalDataRef.current,
        ...sharedData.data,
      }
    }

    // When external data has changed, update the internal data
    if (data !== cacheRef.current.data) {
      cacheRef.current.data = data
      return data
    }

    return internalDataRef.current
  }, [data, id, initialData, sharedData])

  useLayoutEffect(() => {
    // Set the shared state, if initialData was given
    if (id && initialData && !sharedData.data) {
      extendSharedData?.(initialData)
    }
  }, [id, initialData, extendSharedData, sharedData.data])

  useMemo(() => {
    validateDataNow()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalDataRef.current]) // run validation when internal data has changed

  useLayoutEffect(() => {
    if (id) {
      extendAttachment?.({ filterDataHandler, hasErrors })
      if (filterData) {
        rerenderUseDataHook?.()
      }
    }
  }, [
    filterData,
    filterDataHandler,
    rerenderUseDataHook,
    hasErrors,
    id,
    extendAttachment,
  ])

  /**
   * Update the data set
   */
  const updateDataValue: UpdateDataValue = useCallback(
    (path, value) => {
      if (!path) {
        return
      }

      const givenData = (
        path === '/'
          ? // When setting the root of the data, the whole data set should be the new value
            value
          : // For sub paths, use the the existing data set (or empty array/object), but modify it below (since pointer.set is not immutable)
            internalDataRef.current ??
            (path.match(isArrayJsonPointer) ? [] : {})
      ) as Data

      let newData: Data = null
      try {
        // Update the data even if it contains errors. Submit/SubmitRequest will be called accordingly
        newData = structuredClone(givenData)
      } catch (e) {
        newData = givenData
      }

      if (path !== '/') {
        pointer.set(newData, path, value)
      }

      if (id) {
        updateSharedData?.(newData)
        if (filterData) {
          rerenderUseDataHook?.()
        }
      }

      internalDataRef.current = newData

      if (sessionStorageId && typeof window !== 'undefined') {
        window.sessionStorage?.setItem(
          sessionStorageId,
          JSON.stringify(newData)
        )
      }

      forceUpdate()

      return newData
    },
    [
      filterData,
      id,
      sessionStorageId,
      rerenderUseDataHook,
      updateSharedData,
    ]
  )

  /**
   * Update the data set on user interaction
   */
  const handlePathChange: UpdateDataValue = useCallback(
    (path, value) => {
      if (!path) {
        return
      }

      onPathChange?.(path, value)

      const newData = updateDataValue(path, value)

      onChange?.(newData as Data)

      showAllErrorsRef.current = false

      validateData()
    },
    [onPathChange, updateDataValue, onChange, validateData]
  )

  // - Mounted fields
  const handleMountField = useCallback((path: Path) => {
    mountedFieldPathsRef.current = addListPath(
      mountedFieldPathsRef.current,
      path
    )
  }, [])

  const handleUnMountField = useCallback((path: Path) => {
    mountedFieldPathsRef.current = removeListPath(
      mountedFieldPathsRef.current,
      path
    )
    if (fieldPropsRef.current?.[path]) {
      delete fieldPropsRef.current[path]
    }
  }, [])

  // - Features
  const scrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      window?.scrollTo?.({ top: 0, behavior: 'smooth' })
    }
  }, [])

  /**
   * Request to submit the whole form
   */
  const handleSubmit = useCallback<ContextState['handleSubmit']>(
    ({ formElement = null } = {}) => {
      if (!hasErrors()) {
        const resetForm = () => {
          formElement?.reset?.()

          if (typeof window !== 'undefined') {
            if (sessionStorageId) {
              window.sessionStorage.removeItem(sessionStorageId)
            }
          }

          forceUpdate() // in order to fill "empty fields" again with their internal states
        }
        const clearData = () => {
          internalDataRef.current = {}
          forceUpdate()
        }

        onSubmit?.(filterDataHandler(internalDataRef.current as Data), {
          resetForm,
          clearData,
        })

        if (scrollTopOnSubmit) {
          scrollToTop()
        }
      } else {
        setShowAllErrors(true)
        onSubmitRequest?.()
      }

      return internalDataRef.current
    },
    [
      hasErrors,
      onSubmit,
      filterDataHandler,
      scrollTopOnSubmit,
      sessionStorageId,
      scrollToTop,
      setShowAllErrors,
      onSubmitRequest,
    ]
  )

  // - ajv validator routines

  useMountEffect(() => {
    if (schema) {
      ajvValidatorRef.current = ajvRef.current?.compile(schema)
    }

    // Validate the initial data
    validateData()
  })

  useUpdateEffect(() => {
    if (schema && schema !== cacheRef.current.schema) {
      cacheRef.current.schema = schema
      ajvValidatorRef.current = ajvRef.current?.compile(schema)

      validateData()
      forceUpdate()
    }
  }, [schema, validateData, forceUpdate])

  return (
    <Context.Provider
      value={{
        hasContext: true,
        data: internalDataRef.current,
        ...rest,
        handlePathChange,
        updateDataValue,
        validateData,
        handleSubmit,
        scrollToTop,
        errors: errorsRef.current,
        showAllErrors: showAllErrorsRef.current,
        setShowAllErrors,
        mountedFieldPaths: mountedFieldPathsRef.current,
        handleMountField,
        handleUnMountField,
        hasErrors,
        hasFieldError,
        setValueWithError,
        setProps,
        ajvInstance: ajvRef.current,
        schema,
        contextErrorMessages,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type PathList = string[]

function addListPath(paths: PathList, path: Path): PathList {
  return paths.includes(path) ? paths : paths.concat(path)
}

function removeListPath(paths: PathList, path: Path): PathList {
  return paths.filter((thisPath) => thisPath !== path)
}
