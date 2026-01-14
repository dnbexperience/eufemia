import { isValidElement, useCallback, useContext, useRef } from 'react'
import pointer, { JsonObject } from '../utils/json-pointer'
import DataContext, { FilterData } from '../DataContext/Context'

export type ListAllPropsReturn<Data> = {
  propsOfFields: Data
  propsOfValues: Data
}
export type ListAllPropsProps<Data> = {
  log?: boolean
  generateRef?: React.RefObject<() => ListAllPropsReturn<Data>>
  filterData?: FilterData
  children: React.ReactNode
}
export type GenerateRef<Data extends JsonObject = JsonObject> =
  ListAllPropsProps<Data>['generateRef']['current']

export default function ListAllProps<Data extends JsonObject = JsonObject>(
  props: ListAllPropsProps<Data>
) {
  const { log, generateRef, filterData, children } = props || {}
  const { fieldInternalsRef, valueInternalsRef, data, hasContext } =
    useContext(DataContext)

  const dataRef = useRef<JsonObject>({})
  dataRef.current = data

  const generate = useCallback(() => {
    const includeSchema = Boolean(log)

    const propsOfFields = Object.entries(
      fieldInternalsRef?.current || {}
    ).reduce((acc, [path, { props }]) => {
      if (path.startsWith('/')) {
        const propertyValue = {}

        for (const prop in props) {
          const value = props[prop]
          if (value === undefined) {
            continue
          }

          // Resolve schema functions to their concrete schema objects
          if (prop === 'schema') {
            if (!includeSchema) {
              continue
            }
            try {
              // Some fields provide schema as a factory function depending on props
              // Ensure we expose the resolved schema object for tooling like ListAllProps
              propertyValue[prop] =
                typeof value === 'function' ? value(props) : value
            } catch {
              // Ignore schema resolution errors and fall back to the raw value if it is not a function
              if (typeof value !== 'function') {
                propertyValue[prop] = value
              }
            }
            continue
          }

          if (typeof value !== 'function' && !isValidElement(value)) {
            propertyValue[prop] = value
          }
        }

        if (filterData?.[path] !== false) {
          pointer.set(acc, path, propertyValue)
        }
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
            typeof props[prop] !== 'function' &&
            !isValidElement(props[prop])
          ) {
            propertyValue[prop] = props[prop]
          }
        }

        if (filterData?.[path] !== false) {
          pointer.set(acc, path, propertyValue)
        }
      }

      return acc
    }, {})

    return { propsOfFields, propsOfValues } as ListAllPropsReturn<Data>
  }, [fieldInternalsRef, filterData, valueInternalsRef])

  if (hasContext) {
    if (log) {
      console.log(generate())
    }

    if (generateRef) {
      generateRef.current = generate
    }
  }

  return children
}
