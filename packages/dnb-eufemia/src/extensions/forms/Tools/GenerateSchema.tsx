import { useCallback, useContext, useRef } from 'react'
import pointer, { JsonObject } from '../utils/json-pointer'
import DataContext, { FilterData } from '../DataContext/Context'
import { JSONSchema } from '../types'

export type GenerateSchemaReturn = {
  schema: JSONSchema
  data: JsonObject
  propsOfFields: JsonObject
  propsOfValues: JsonObject
}
export type GenerateSchemaProps = {
  log?: boolean
  generateRef?: React.MutableRefObject<() => GenerateSchemaReturn>
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

          const type = props.valueType || 'string'
          const propertyValue = {
            type,
          }

          for (const prop of schemaParams) {
            if (props[prop]) {
              propertyValue[prop] = props[prop]
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
                if (filterData?.[pathToSet] !== false) {
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

                if (filterData?.[pathToSet] !== false) {
                  pointer.set(acc, pathToSet, pathValue)
                }
              }
            }
          } else {
            if (filterData?.[path] !== false) {
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
    ).reduce((acc, [path, { props }]) => {
      if (path.startsWith('/')) {
        const propertyValue = {}

        for (const prop in props) {
          if (
            props[prop] !== undefined &&
            typeof props[prop] !== 'function'
          ) {
            propertyValue[prop] = props[prop]
          }
        }

        pointer.set(acc, path, propertyValue)
      }

      return acc
    }, {})

    const propsOfValues = Object.entries(
      valueInternalsRef?.current || {}
    ).reduce((acc, [path, { props }]) => {
      if (path.startsWith('/')) {
        const propertyValue = {}

        for (const prop in props) {
          if (
            props[prop] !== undefined &&
            typeof props[prop] !== 'function'
          ) {
            propertyValue[prop] = props[prop]
          }
        }

        pointer.set(acc, path, propertyValue)
      }

      return acc
    }, {})

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
      generateRef.current = generate
    }
  }

  return children
}
