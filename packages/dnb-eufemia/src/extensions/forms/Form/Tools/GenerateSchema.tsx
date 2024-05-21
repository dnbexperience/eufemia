import { useContext } from 'react'
import pointer from 'json-pointer'
import DataContext from '../../DataContext/Context'

export type GenerateSchemaObject = Record<string, unknown>
export type GenerateSchemaProps = {
  generateRef: React.MutableRefObject<() => GenerateSchemaObject>
  children: React.ReactNode
}

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
  const { generateRef, children } = props
  const { fieldPropsRef, data } = useContext(DataContext)

  if (generateRef) {
    generateRef.current = () => {
      const schema = Object.entries(fieldPropsRef.current).reduce(
        (acc, [path, props]) => {
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

            if (Object.hasOwnProperty.call(props, 'value')) {
              pointer.set(data, path, props.value)
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
                  pointer.set(acc, pathToSet, pathValue)
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

                  pointer.set(acc, pathToSet, pathValue)
                }
              }
            } else {
              pointer.set(acc.properties, path, propertyValue)
              if (props.required) {
                acc.required.push(objectKey)
              }
            }
          }

          return acc
        },
        { type: 'object', properties: {}, required: [] }
      )

      if (schema.required.length === 0) {
        delete schema.required
      }

      return { schema, data }
    }
  }

  return children
}
