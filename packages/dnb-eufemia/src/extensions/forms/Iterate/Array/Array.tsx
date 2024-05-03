import React, {
  useMemo,
  useRef,
  useEffect,
  useReducer,
  createRef,
  useContext,
  Fragment,
  useCallback,
} from 'react'
import classnames from 'classnames'
import pointer from 'json-pointer'
import { useFieldProps } from '../../hooks'
import { makeUniqueId } from '../../../../shared/component-helper'
import { Flex } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import {
  BasicProps as FlexContainerProps,
  Props as FlexContainerAllProps,
  pickFlexContainerProps,
} from '../../../../components/flex/Container'
import useData from '../../Form/data-context/useData'
import IterateElementContext, {
  IterateElementContextState,
} from '../IterateElementContext'
import SummaryListContext from '../../Value/SummaryList/SummaryListContext'
import ValueBlockContext from '../../ValueBlock/ValueBlockContext'
import FieldBoundaryProvider from '../../DataContext/FieldBoundary/FieldBoundaryProvider'

import type { ContainerMode, ElementChild, Props, Value } from './types'
import type { Identifier, Path } from '../../types'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'
import useId from '../../../../shared/helpers/useId'

export type * from './types'

function ArrayComponent(props: Props) {
  const [salt, forceUpdate] = useReducer(() => ({}), {})

  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)
  // const context = useContext(DataContext.Context)
  // console.log('context.data', context.data)

  const {
    id,
    path,
    value,
    defaultValue,
    mapInternalData,
    emptyValue,
    withoutFlex,
    placeholder,
    handleChange,
    onChange,
    onDone,
    // isolate,
    children,
  } = useFieldProps<Value, Props>(props)

  const initialValue = useMemo(() => {
    return defaultValue ?? value

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const valueRef = useRef<Value>(initialValue)
  valueRef.current = useMemo(() => {
    return value || valueRef.current
  }, [value])
  const arrayValue = valueRef.current

  const idsRef = useRef<Array<Identifier>>([])
  const isNewRef = useRef<Record<string, boolean>>({})
  const modesRef = useRef<Record<Identifier, ContainerMode>>({})
  const valueWhileClosingRef = useRef<Array<IterateElementContextState>>()
  const valueCountRef = useRef(arrayValue)
  const containerRef = useRef<HTMLDivElement>()
  const hadPushRef = useRef<boolean>()
  const innerRefs = useRef<
    Record<string, React.RefObject<HTMLDivElement>>
  >({})

  const omitFlex = withoutFlex ?? (summaryListContext || valueBlockContext)

  // const { update, data } = useData()
  // console.log('data', id, data)

  useEffect(() => {
    // Update inside the useEffect, to support React.StrictMode
    valueCountRef.current = arrayValue || []
  }, [arrayValue])

  const mapItem = useCallback(
    (
      value: unknown,
      index: number,
      extendItemWith?: Partial<IterateElementContextState>
    ): IterateElementContextState => {
      const id =
        extendItemWith?.id || idsRef.current[index] || makeUniqueId()

      const hasNewItems =
        arrayValue?.length > valueCountRef.current?.length

      if (!idsRef.current[index]) {
        isNewRef.current[id] = hasNewItems
        idsRef.current.push(id)
      }

      const isNew =
        // map ||
        // && array.length === 1
        isNewRef.current[id] || false
      const animateIn = isNew
      // && array.length === 1
      // (!map && isNewRef.current[id]) || false
      if (!modesRef.current[id]) {
        modesRef.current[id] = isNew ? 'edit' : 'view'
      }

      const item = {
        id,
        path,
        value,
        index,
        arrayValue,
        containerRef,
        isNew,
        animateIn,
        onDone,
        containerMode: modesRef.current[id],
        switchContainerMode: (mode: ContainerMode) => {
          modesRef.current[id] = mode
          delete isNewRef.current?.[id]
          forceUpdate()
        },
        handleChange: (path: Path, value: unknown) => {
          // if (isolate) {
          //   return // stop here
          // }
          // console.log('handleChange', extendItemWith?.isolated, value)
          // return
          const newArrayValue = structuredClone(arrayValue)

          // Make sure we have a new object reference,
          // else two new objects will be the same
          newArrayValue[index] = { ...newArrayValue[index] }

          pointer.set(newArrayValue, path, value)
          handleChange(newArrayValue)
        },
        handlePush: (element: unknown) => {
          hadPushRef.current = true
          handleChange([...(arrayValue ?? []), element])
        },
        handleRemove: ({ keepItems = false } = {}) => {
          if (keepItems) {
            // Add a backup as the array value while animating
            valueWhileClosingRef.current = arrayValue
          }

          const newArrayValue = structuredClone(arrayValue)
          newArrayValue.splice(index, 1)
          handleChange(newArrayValue)
        },

        // - Called after animation end
        fulfillRemove: () => {
          valueWhileClosingRef.current = null
          delete modesRef.current?.[id]
          delete isNewRef.current?.[id]
          const findIndex = idsRef.current.indexOf(id)
          idsRef.current.splice(findIndex, 1)
          forceUpdate()
        },

        // - Called when cancel button press
        restoreOriginalValue: (value: unknown) => {
          const newArrayValue = structuredClone(arrayValue)
          newArrayValue[index] = value
          handleChange(newArrayValue)
        },
      } as IterateElementContextState

      if (extendItemWith) {
        Object.assign(item, extendItemWith)
      }

      return item
    },

    // In order to update "valueWhileClosingRef" we need to have "salt" in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [salt, arrayValue, handleChange, path]
  )

  const preparedArray = useMemo(() => {
    const array = (valueWhileClosingRef.current || arrayValue) ?? []
    const items = array.map(mapItem)

    // console.log('arrayValue.length', arrayValue)

    if (mapInternalData) {
      // const arrayWithItems =
      //   typeof map === 'function'
      //     ? map(items) || items
      //     : items.concat(map)
      // console.log('arrayWithItems', arrayWithItems)
      // const diff = arrayWithItems.length - items.length
      // console.log('diff', diff)
      // const last = items[items.length - 1]
      // if(){
      // }
      // array.concat(arrayWithItems)
      // console.log('arrayWithItems', arrayWithItems)

      if (items) {
        // console.log('items', items)
        return items.map((item, i) => {
          return mapInternalData(item, i, items) || item
          // if (item?.['arrayValue']) {
          //   return item
          // }
          // const id = makeUniqueId()
          // modesRef.current[id] = 'edit'
          // return mapItem(item, i, {
          //   id,
          //   animateIn: false,
          //   isNew: true,
          //   // isolated: true,
          // })
        })
      }

      // return mapItem(arrayWithItems, array.length, {
      //   animateIn: false,
      //   isNew: true,
      //   containerMode: 'edit',
      // })

      // items.push(
      //   mapItem(arrayWithItems[0], array.length, {
      //     animateIn: false,
      //     isNew: true,
      //     containerMode: 'edit',
      //   })
      // )
      // console.log('items', items[0])
      // return arrayWithItems.map((item, index) => {
      // return arrayWithItems.map((item, index) => {
      //   if (index >= array.length - diff) {
      //     return mapItem(item, index, {
      //       animateIn: false,
      //     })
      //   }
      //   // : mapItem(item, index)
      //   if (!item?.handleChange) {
      //     return mapItem(item, index)
      //   }
      //   return item
      // })
    }

    return items
    // return array.map(mapItem)

    // In order to update "valueWhileClosingRef" we need to have "salt" in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayValue, mapInternalData, mapItem])

  // console.log('preparedArray', preparedArray)

  // - Call the onChange callback when a new element is added without calling "handlePush"
  // useMemo(() => {
  //   const last = preparedArray?.[preparedArray.length - 1]
  //   if (last?.isNew && !hadPushRef.current) {
  //     onChange?.(arrayValue)
  //   } else {
  //     hadPushRef.current = false
  //   }
  // }, [arrayValue, preparedArray, onChange])

  const flexProps: FlexContainerProps & {
    innerRef: FlexContainerAllProps['innerRef']
  } = {
    className: classnames('dnb-forms-iterate', props?.className),
    ...pickFlexContainerProps(props as FlexContainerProps),
    ...pickSpacingProps(props),
    innerRef: containerRef,
  }

  const WrapperElement = omitFlex ? Fragment : Flex.Stack

  return (
    <WrapperElement {...(omitFlex ? null : flexProps)}>
      {arrayValue === emptyValue || props?.value?.length === 0
        ? placeholder
        : preparedArray.map((elementProps) => {
            const { id, value, index } = elementProps
            const elementRef = (innerRefs.current[id] =
              innerRefs.current[id] || createRef<HTMLDivElement>())

            const renderChildren = (elementChild: ElementChild) => {
              return typeof elementChild === 'function'
                ? elementChild(value, index)
                : elementChild
            }

            const contextValue = {
              ...elementProps,
              elementRef,
            }

            const content = Array.isArray(children)
              ? children.map((child) => renderChildren(child))
              : renderChildren(children)

            if (omitFlex) {
              return (
                <IterateElementContext.Provider
                  key={`element-${id}`}
                  value={contextValue}
                >
                  <FieldBoundaryProvider>{content}</FieldBoundaryProvider>
                </IterateElementContext.Provider>
              )
            }

            return (
              <Flex.Item
                className="dnb-forms-iterate__element"
                tabIndex={-1}
                innerRef={elementRef}
                key={`element-${id}`}
              >
                <IterateElementContext.Provider value={contextValue}>
                  <FieldBoundaryProvider>{content}</FieldBoundaryProvider>
                </IterateElementContext.Provider>
              </Flex.Item>
            )
          })}
    </WrapperElement>
  )
}

ArrayComponent.New = function NewItem(props) {
  const [salt, forceUpdate] = useReducer(() => ({}), {})
  const { update } = useData()

  const { children, defaultValue, path } = props
  // const storeRef = useRef()
  const valueRef = useRef(defaultValue)
  // console.log('valueRef', valueRef)
  // const id = useId()
  // const keyRef = useRef(id)

  const mapFunc = useCallback(
    (item, index, array) => {
      // console.log(
      //   'valueRef.current',
      //   valueRef.current.length,
      //   defaultValue.length
      // )
      // console.log('mapFunc', item.isNew)
      // Object.assign(item, { isNew: true })
      // return item
      // if (array.length === 1) {
      return {
        ...item,
        isNew: true,
        animateIn: valueRef.current.length > defaultValue.length,
        containerMode: 'edit',
      }
      // }

      // return item
    },
    [defaultValue]
  )

  const handleDone = useCallback(
    (item) => {
      update(path, (array) => {
        // return [...(array || []), ...storeRef.current]
        return [...(array || []), item]
      })
      // keyRef.current = makeUniqueId()
      // valueRef.current = valueRef.current.filter((current) => {
      //   // console.log('item filter', item, current)
      //   return item !== current
      // })
      valueRef.current = [...defaultValue]
      // forceUpdate()
      // storeRef.current = undefined
    },
    [defaultValue, path, update]
  )

  const handleChange = useCallback((value) => {
    console.log('value', value)
    valueRef.current = value
  }, [])

  const restToRender = useMemo(() => [], [])

  // console.log('valueRef.current', valueRef.current)

  // Map over React children by using React.Children and check if one is of type PushButton
  const itemsToRender = useMemo(() => {
    return React.Children.map(children, (child, key) => {
      if (React.isValidElement(child)) {
        // console.log('child.type.name', child.type.name)
        if (child.type['name'] === 'PushButton') {
          const props = {
            key,
            path: undefined,
            onClick: () => {
              // console.log('onClick')
              valueRef.current = [...valueRef.current, {}]
              forceUpdate()
              // handleDone({ firstName: 'Tony' })
            },
          }
          restToRender.push(React.cloneElement(child, props))
          return null
        }
      }
      return child
    })
  }, [children, restToRender])

  return (
    <>
      <ArrayComponent
        withoutFlex
        // path="/x"
        // key={keyRef.current}
        // map={defaultValue}
        // map={defaultValue}
        // value={
        //   valueRef.current.length > defaultValue.length
        //     ? valueRef.current
        //     : defaultValue
        // }
        value={valueRef.current}
        defaultValue={defaultValue}
        // onChange={(data) => {
        //   storeRef.current = data
        //   // console.log('data', data)
        //   // Object.assign(storeRef.current, data)
        //   // // storeRef.current.data = data
        //   // console.log('Array2 onChange', storeRef.current)
        // }}
        onDone={handleDone}
        onChange={handleChange}
        mapInternalData={mapFunc}
      >
        {/* XXXX-s */}
        {itemsToRender}
        {/* XXXX-e */}
      </ArrayComponent>

      {restToRender}
    </>
  )
}

ArrayComponent._supportsSpacingProps = true
export default ArrayComponent
