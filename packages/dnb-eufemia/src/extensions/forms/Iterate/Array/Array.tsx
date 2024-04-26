import React, {
  useMemo,
  useRef,
  useEffect,
  useReducer,
  createRef,
  useContext,
  Fragment,
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
import DataContext from '../../DataContext/Context'

import type { ContainerMode, ElementChild, Props, Value } from './types'
import type { Identifier, Path } from '../../types'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export type * from './types'

function ArrayComponent(props: Props) {
  const [salt, forceUpdate] = useReducer(() => ({}), {})

  const { showAllErrors } = useContext(DataContext)
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)

  const {
    path,
    value: arrayValue,
    withoutFlex,
    emptyValue,
    placeholder,
    handleChange,
    onChange,
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
  const errorsRef = useRef<Record<Identifier, unknown>>({})

  const omitFlex = withoutFlex ?? (summaryListContext || valueBlockContext)

  useEffect(() => {
    // Update inside the useEffect, to support React.StrictMode
    valueCountRef.current = arrayValue || []
  }, [arrayValue])

  const elementData = useMemo(() => {
    return ((valueWhileClosingRef.current || arrayValue) ?? []).map(
      (value, index) => {
        const id = idsRef.current[index] || makeUniqueId()

        const hasNewItems =
          arrayValue.length > valueCountRef.current?.length

        if (!idsRef.current[index]) {
          isNewRef.current[id] = hasNewItems
          idsRef.current.push(id)
        }

        const isNew = isNewRef.current[id] || false
        const hasError = Boolean(errorsRef.current[id])
        const showEditItem = hasError && showAllErrors

        if (showEditItem || !modesRef.current[id]) {
          modesRef.current[id] = isNew || showEditItem ? 'edit' : 'view'
        }

        return {
          id,
          path,
          value,
          index,
          arrayValue,
          containerRef,
          isNew,
          containerMode: modesRef.current[id],
          hasError,
          setFieldError: (path: Path, error: Error) => {
            if (error) {
              if (!errorsRef.current[id]) {
                errorsRef.current[id] = {}
              }
              errorsRef.current[id][path] = !!error
            } else {
              delete errorsRef.current[id]?.[path]
              if (Object.keys(errorsRef.current[id] || {}).length === 0) {
                delete errorsRef.current[id]
              }
            }
          },
          switchContainerMode: (mode: ContainerMode) => {
            modesRef.current[id] = mode
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
      }
    )

    // In order to update "valueWhileClosingRef" we need to have "salt" in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salt, arrayValue, showAllErrors, path, handleChange])

  // - Call the onChange callback when a new element is added without calling "handlePush"
  useMemo(() => {
    const last = elementData?.[elementData.length - 1]
    if (last?.isNew && !hadPushRef.current) {
      onChange?.(arrayValue)
    } else {
      hadPushRef.current = false
    }
  }, [arrayValue, elementData, onChange])

  const flexProps: FlexContainerProps & {
    innerRef: FlexContainerAllProps['innerRef']
  } = {
    className: classnames('dnb-form-iterate', props?.className),
    ...pickFlexContainerProps(props as FlexContainerProps),
    ...pickSpacingProps(props),
    innerRef: containerRef,
  }

  const WrapperElement = omitFlex ? Fragment : Flex.Stack

  return (
    <WrapperElement {...(omitFlex ? null : flexProps)}>
      {arrayValue === emptyValue || props?.value?.length === 0
        ? placeholder
        : elementData.map((elementProps) => {
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
                  {content}
                </IterateElementContext.Provider>
              )
            }

            return (
              <Flex.Item
                className="dnb-form-iterate__element"
                tabIndex={-1}
                innerRef={elementRef}
                key={`element-${id}`}
              >
                <IterateElementContext.Provider value={contextValue}>
                  {content}
                </IterateElementContext.Provider>
              </Flex.Item>
            )
          })}
    </WrapperElement>
  )
}

ArrayComponent._supportsSpacingProps = true
export default ArrayComponent
