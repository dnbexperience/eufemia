import { useCallback, useContext, useRef } from 'react'
import type { JsonObject } from '../utils/json-pointer'
import pointer from '../utils/json-pointer'
import type { FilterData } from '../DataContext/Context'
import DataContext from '../DataContext/Context'
import type { JSONSchema } from '../types'

export type GenerateSchemaReturn = {
  schema: JSONSchema
  data: JsonObject
  propsOfFields: JsonObject
  propsOfValues: JsonObject
}
export type GenerateSchemaProps = {
  log?: boolean
  generateRef?: React.RefObject<() => GenerateSchemaReturn>
  filterData?: FilterData
  children: React.ReactNode
}
export type GenerateRef = GenerateSchemaProps['generateRef']['current']

export const schemaParams = [
  'minLength',
  'maxLength',
  'pattern',
  'description',
  'min',
  'max',
  'multipleOf',
  'exclusiveMinimum',
  'exclusiveMaximum',
]

export default function GenerateSchema(props: GenerateSchemaProps) {
  const { generateRef, filterData, log, children } = props || {}
  const { fieldInternalsRef, valueInternalsRef, data, hasContext } =
    useContext(DataContext)

  const dataRef = useRef<JsonObject>({})
  dataRef.current = data

  const generate = useCallback(() => {
    const schema = Object.entries(fieldInternalsRef?.current || {}).reduce(
      (acc, [path, { props }]) => {
        if (path.startsWith('/')) {
          const objectKey = path.substring(1)

          const pathList = objectKey.split('/')
          const slashCount = pathList.length

          const type =
            (props as unknown as Record<string, unknown>).valueType ||
            'string'
          const propertyValue: Record<string, unknown> = {
            type,
          }

          for (const prop of schemaParams) {
            if ((props as unknown as Record<string, unknown>)[prop]) {
              propertyValue[prop] = (
                props as unknown as Record<string, unknown>
              )[prop]
            }
          }

          if (slashCount > 1) {
            const nestedPath = ['']
            for (const path of pathList) {
              nestedPath.push(path)
              const pathToSet = nestedPath.join('/properties/')
              const isLast = nestedPath.length - 1 === pathList.length

              const existingValue = pointer.has(acc, pathToSet)
                ? pointer.get(acc, pathToSet)
                : null

              const pathValue = isLast ? propertyValue : existingValue

              if (isLast) {
                if (
                  (filterData as Record<string, unknown>)?.[pathToSet] !==
                  false
                ) {
                  pointer.set(acc, pathToSet, pathValue)
                }
              } else {
                const pathValue = {
                  type: 'object',
                  ...existingValue,
                }

                // - Add required
                const required = []
                if (props.required) {
                  required.push(pathList.at(-1))
                }
                if (existingValue?.required) {
                  required.push(...existingValue.required)
                }
                if (required.length > 0) {
                  pathValue.required = required
                }

                if (
                  (filterData as Record<string, unknown>)?.[pathToSet] !==
                  false
                ) {
                  pointer.set(acc, pathToSet, pathValue)
                }
              }
            }
          } else {
            if (
              (filterData as Record<string, unknown>)?.[path] !== false
            ) {
              pointer.set(acc.properties, path, propertyValue)
            }
            if (props.required) {
              acc.required.push(objectKey)
            }
          }
        }

        return acc
      },
      { type: 'object', properties: {}, required: [] }
    )

    const propsOfFields = Object.entries(
      fieldInternalsRef?.current || {}
    ).reduce(
      (acc, [path, { props }]) => {
        if (path.startsWith('/')) {
          const propertyValue: Record<string, unknown> = {}

          for (const prop in props) {
            if (
              (props as unknown as Record<string, unknown>)[prop] !==
                undefined &&
              typeof (props as unknown as Record<string, unknown>)[
                prop
              ] !== 'function'
            ) {
              propertyValue[prop] = (
                props as unknown as Record<string, unknown>
              )[prop]
            }
          }

          pointer.set(acc, path, propertyValue)
        }

        return acc
      },
      {} as Record<string, unknown>
    )

    const propsOfValues = Object.entries(
      valueInternalsRef?.current || {}
    ).reduce(
      (acc, [path, { props }]) => {
        if (path.startsWith('/')) {
          const propertyValue: Record<string, unknown> = {}

          for (const prop in props) {
            if (
              (props as unknown as Record<string, unknown>)[prop] !==
                undefined &&
              typeof (props as unknown as Record<string, unknown>)[
                prop
              ] !== 'function'
            ) {
              propertyValue[prop] = (
                props as unknown as Record<string, unknown>
              )[prop]
            }
          }

          pointer.set(acc, path, propertyValue)
        }

        return acc
      },
      {} as Record<string, unknown>
    )

    if (schema.required.length === 0) {
      delete schema.required
    }

    return {
      schema,
      data: dataRef.current,
      propsOfFields,
      propsOfValues,
    } as GenerateSchemaReturn
  }, [fieldInternalsRef, filterData, valueInternalsRef])

  if (hasContext) {
    if (log) {
      console.log(generate().schema)
    }

    if (generateRef) {
      const mutableGenerateRef = generateRef as React.RefObject<
        () => GenerateSchemaReturn
      >
      mutableGenerateRef.current = generate
    }
  }

  return children
}
