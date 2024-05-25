import { useCallback, useContext, useRef } from 'react'
import pointer, { JsonObject } from 'json-pointer'
import DataContext, { FilterData } from '../DataContext/Context'

export type ListAllPropsReturn = {
  propsOfFields: JsonObject
  propsOfValues: JsonObject
}
export type ListAllPropsProps = {
  log?: boolean
  generateRef?: React.MutableRefObject<() => ListAllPropsReturn>
  filterData?: FilterData
  children: React.ReactNode
}

export default function ListAllProps(props: ListAllPropsProps) {
  const { log, generateRef, filterData, children } = props || {}
  const { fieldPropsRef, valuePropsRef, data, hasContext } =
    useContext(DataContext)

  const dataRef = useRef<JsonObject>({})
  dataRef.current = data

  const generate = useCallback(() => {
    const propsOfFields = Object.entries(
      fieldPropsRef?.current || {}
    ).reduce((acc, [path, props]) => {
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

        if (filterData?.[path] !== false) {
          pointer.set(acc, path, propertyValue)
        }
      }

      return acc
    }, {})

    const propsOfValues = Object.entries(
      valuePropsRef?.current || {}
    ).reduce((acc, [path, props]) => {
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

        if (filterData?.[path] !== false) {
          pointer.set(acc, path, propertyValue)
        }
      }

      return acc
    }, {})

    return { propsOfFields, propsOfValues } as ListAllPropsReturn
  }, [fieldPropsRef, filterData, valuePropsRef])

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
