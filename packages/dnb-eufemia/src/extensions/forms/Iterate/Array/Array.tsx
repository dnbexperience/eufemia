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
import useData from '../../Form/data-context/useData'
import { DataContext } from '../..'

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
    value: arrayValue,
    withoutFlex,
    concatWithArray,
    emptyValue,
    placeholder,
    handleChange,
    onChange,
    addTo,
    children,
  } = useFieldProps<Value, Props>(props)

  const idsRef = useRef<Array<Identifier>>([])
  const isNewRef = useRef<Record<string, boolean>>({})
  const modesRef = useRef<Record<Identifier, ContainerMode>>({})
  const valueWhileClosingRef = useRef<Array<unknown>>()
  const valueCountRef = useRef(arrayValue)
  const containerRef = useRef<HTMLDivElement>()
  const hadPushRef = useRef<boolean>()
  const innerRefs = useRef<
    Record<string, React.RefObject<HTMLDivElement>>
  >({})

  const omitFlex = withoutFlex ?? (summaryListContext || valueBlockContext)

  const { update, data } = useData()
  console.log('data', id, data)

  useEffect(() => {
    // Update inside the useEffect, to support React.StrictMode
    valueCountRef.current = arrayValue || []
  }, [arrayValue])

  const mapItem = useCallback(
    (
      value: unknown,
      index: number,
      extendItemWith?: IterateElementContextState | unknown
    ): IterateElementContextState => {
      const id = idsRef.current[index] || makeUniqueId()

      const hasNewItems = arrayValue.length > valueCountRef.current?.length

      if (!idsRef.current[index]) {
        isNewRef.current[id] = hasNewItems
        idsRef.current.push(id)
      }

      const isNew =
        concatWithArray ||
        // && array.length === 1
        isNewRef.current[id] ||
        false
      const animateIn = isNew
      // && array.length === 1
      // (!concatWithArray && isNewRef.current[id]) || false
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
        update,
        containerMode: modesRef.current[id],
        switchContainerMode: (mode: ContainerMode) => {
          modesRef.current[id] = mode
          delete isNewRef.current?.[id]
          forceUpdate()
        },
        handleChange: (path: Path, value: unknown) => {
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
    [salt, arrayValue, concatWithArray, handleChange, path]
  )

  const preparedArray = useMemo(() => {
    const array = (valueWhileClosingRef.current || arrayValue) ?? []
    const preparedArray = array.map(mapItem)

    console.log('arrayValue.length', arrayValue)

    if (concatWithArray) {
      // const arrayWithItems =
      //   typeof concatWithArray === 'function'
      //     ? concatWithArray(preparedArray) || preparedArray
      //     : preparedArray.concat(concatWithArray)
      // const diff = arrayWithItems.length - preparedArray.length
      // console.log('diff', diff)
      // const last = preparedArray[preparedArray.length - 1]
      // if(){
      // }
      // array.concat(arrayWithItems)
      // preparedArray.push(
      //   mapItem(concatWithArray, array.length, {
      //     animateIn: false,
      //   })
      // )
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

    return preparedArray
    // return array.map(mapItem)

    // In order to update "valueWhileClosingRef" we need to have "salt" in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrayValue, concatWithArray, mapItem])

  // - Call the onChange callback when a new element is added without calling "handlePush"
  useMemo(() => {
    const last = preparedArray?.[preparedArray.length - 1]
    if (last?.isNew && !hadPushRef.current) {
      onChange?.(arrayValue)
    } else {
      hadPushRef.current = false
    }
  }, [arrayValue, preparedArray, onChange])

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

ArrayComponent._supportsSpacingProps = true
export default ArrayComponent
