/**
 * Local type definitions for AJV-compatible types.
 *
 * These types decouple our internal code from the `ajv` package,
 * so that ajv is only loaded at runtime when consumers explicitly
 * use JSON Schema validation with `ajvInstance`.
 */

/**
 * Minimal representation of an AJV error object.
 * Compatible with `ErrorObject` from `ajv/dist/2020.js`.
 */
export type AjvErrorObject = {
  keyword: string
  instancePath: string
  schemaPath?: string
  params: Record<string, unknown>
  message?: string
}

/**
 * Minimal representation of an AJV validate function.
 * Compatible with `ValidateFunction` from `ajv/dist/2020.js`.
 */
export type AjvValidateFunction = {
  (data: unknown): boolean
  errors?: AjvErrorObject[] | null
}

/**
 * Minimal representation of an AJV instance.
 * Compatible with `Ajv2020` from `ajv/dist/2020.js`.
 */
export type AjvInstance = {
  compile(schema: unknown): AjvValidateFunction
}
