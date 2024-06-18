import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ValidateFunction } from 'ajv/dist/2020'
import {
  AllJSONSchemaVersionsBasis,
  SchemaValidatorProps,
  SchemaValidatorReturn,
} from '../../../types'
import { Ajv, ajvErrorsToFormErrors, makeAjvInstance } from './ajv'

export function ajvSchema(
  schema: AllJSONSchemaVersionsBasis<unknown>,
  ajvInstance?: Ajv
) {
  return () => {
    if (ajvInstance) {
      return {
        schema,
        schemaValidator: useAjvSchemaValidator,
        ajvInstance,
      }
    }
    return { schema, schemaValidator: useAjvSchemaValidator }
  }
}

export function useAjvSchemaValidator<Data>({
  schema,
  dataRef,
  setErrors = undefined,
  ajvInstance = undefined,
}: SchemaValidatorProps<Data>) {
  const ajvRef = useRef<Ajv>()
  ajvRef.current = useMemo(() => {
    return schema && isAjvSchema(schema)
      ? makeAjvInstance(ajvInstance)
      : undefined
  }, [ajvInstance, schema])

  const ajvValidatorRef = useRef<ValidateFunction>()

  useEffect(() => {
    if (schema) {
      ajvValidatorRef.current = ajvRef.current?.compile(schema)
    }
  }, [schema])

  const executeSchemaValidator = useCallback<
    SchemaValidatorReturn['executeSchemaValidator']
  >(() => {
    if (!ajvValidatorRef.current) {
      return
    }

    if (ajvValidatorRef.current?.(dataRef.current)) {
      setErrors?.(undefined)
    } else {
      const errors = ajvErrorsToFormErrors<Data>(
        ajvValidatorRef.current.errors,
        dataRef.current
      )

      setErrors?.(errors)

      return errors
    }
  }, [dataRef, setErrors])

  return {
    executeSchemaValidator,
  }
}

// TODO: Add required logic from useFieldProps.tsx in here as a function or part of the hook?
// ... const requiredList = [schema?.['required']]

export function isAjvSchema(schema: unknown) {
  return (
    Object.prototype.hasOwnProperty.call(schema ?? {}, '$schema') ||
    Object.prototype.hasOwnProperty.call(schema ?? {}, 'properties') ||
    (Object.prototype.hasOwnProperty.call(schema ?? {}, 'type') &&
      !schema?.['_run']) // check for "_run" because type is used by Valibot too
  )
}
