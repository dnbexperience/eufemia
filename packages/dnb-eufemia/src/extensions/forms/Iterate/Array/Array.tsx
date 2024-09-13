import React, {
  useMemo,
  useRef,
  useEffect,
  useReducer,
  createRef,
  useContext,
} from 'react'
import classnames from 'classnames'
import pointer from 'json-pointer'
import { useFieldProps } from '../../hooks'
import { makeUniqueId } from '../../../../shared/component-helper'
import { Flex, FormStatus, HeightAnimation } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import {
  BasicProps as FlexContainerProps,
  Props as FlexContainerAllProps,
  pickFlexContainerProps,
} from '../../../../components/flex/Container'
import IterateItemContext, {
  IterateItemContextState,
} from '../IterateItemContext'
import SummaryListContext from '../../Value/SummaryList/SummaryListContext'
import ValueBlockContext from '../../ValueBlock/ValueBlockContext'
import FieldBoundaryProvider from '../../DataContext/FieldBoundary/FieldBoundaryProvider'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import { useSwitchContainerMode } from '../hooks'
import { getMessage } from '../../FieldBlock'

import type { ContainerMode, ElementChild, Props, Value } from './types'
import type { Identifier } from '../../types'

/**
 * Deprecated, as it is supported by all major browsers and Node.js >=v18
 * So its a question of time, when we will remove this polyfill
 */
import structuredClone from '@ungap/structured-clone'

export type * from './types'

function ArrayComponent(props: Props) {
  const [salt, forceUpdate] = useReducer(() => ({}), {})

  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)

  const { getValueByPath } = useDataValue()
  const preparedProps = useMemo(() => {
    const {
      path,
      countPath,
      countPathLimit = Infinity,
      countPathTransform,
    } = props

    if (countPath) {
      const arrayValue = getValueByPath(path)
      let countValue = parseFloat(getValueByPath(countPath))
      if (!(countValue >= 0)) {
        countValue = 0
      }
      if (countValue > countPathLimit) {
        countValue = countPathLimit
      }
      if (arrayValue?.length !== countValue) {
        const newValue = []
        for (let i = 0, l = countValue; i < l; i++) {
          const value = arrayValue?.[i]
          newValue.push(countPathTransform?.({ value, index: i }))
        }

        return {
          ...props,
          value: newValue,
        }
      }
    }

    return props
  }, [getValueByPath, props])

  const {
    path,
    value: arrayValue,
    error,
    defaultValue,
    withoutFlex,
    emptyValue,
    placeholder,
    containerMode,
    animate,
    handleChange,
    setChanged,
    onChange,
    children,
  } = useFieldProps(preparedProps)

  useMountEffect(() => {
    // To ensure the validator is called when a new item is added
    setChanged(true)
  })

  const idsRef = useRef<Array<Identifier>>([])
  const isNewRef = useRef<Record<string, boolean>>({})
  const modesRef = useRef<
    Record<
      Identifier,
      {
        current: ContainerMode
        previous?: ContainerMode
        options?: { omitFocusManagement?: boolean }
      }
    >
  >({})
  const valueWhileClosingRef = useRef<Value>()
  const valueCountRef = useRef(arrayValue)
  const containerRef = useRef<HTMLDivElement>()
  const hadPushRef = useRef<boolean>()
  const innerRefs = useRef<
    Record<string, React.RefObject<HTMLDivElement>>
  >({})

  const omitFlex = withoutFlex ?? (summaryListContext || valueBlockContext)

  // To support React.StrictMode, we inject the defaultValue into the data context this way.
  // The routine inside useFieldProps where updateDataValueDataContext is called, does not support React.StrictMode
  const { handlePathChange } = useContext(DataContext) || {}
  useMountEffect(() => {
    if (defaultValue) {
      handlePathChange?.(path, defaultValue)
    }
  })

  useEffect(() => {
    // Update inside the useEffect, to support React.StrictMode
    valueCountRef.current = arrayValue || []
  }, [arrayValue])

  const { getNextContainerMode } = useSwitchContainerMode()

  const arrayItems = useMemo(() => {
    const list = valueWhileClosingRef.current || arrayValue
    return (list ?? []).map((value, index) => {
      const id = idsRef.current[index] || makeUniqueId()

      const hasNewItems =
        arrayValue?.length > valueCountRef.current?.length

      if (!idsRef.current[index]) {
        isNewRef.current[id] = hasNewItems
        idsRef.current.push(id)
      }

      const isNew = isNewRef.current[id] || false
      if (!modesRef.current[id]?.current) {
        modesRef.current[id] = {
          current:
            containerMode ??
            (isNew ? getNextContainerMode() ?? 'edit' : 'auto'),
        }
      }

      const itemContext: IterateItemContextState = {
        id,
        path,
        value,
        index,
        arrayValue,
        containerRef,
        isNew,
        containerMode: modesRef.current[id].current,
        previousContainerMode: modesRef.current[id].previous,
        initialContainerMode: containerMode || 'auto',
        modeOptions: modesRef.current[id].options,
        switchContainerMode: (mode, options = {}) => {
          modesRef.current[id].previous = modesRef.current[id].current
          modesRef.current[id].current = mode
          modesRef.current[id].options = options
          delete isNewRef.current?.[id]
          forceUpdate()
        },
        handleChange: (path, value) => {
          const newArrayValue = structuredClone(arrayValue)

          // Make sure we have a new object reference,
          // else two new objects will be the same
          newArrayValue[index] = { ...newArrayValue[index] }

          pointer.set(newArrayValue, path, value)
          handleChange(newArrayValue)
        },
        handlePush: (element) => {
          hadPushRef.current = true
          handleChange([...(arrayValue || []), element])
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
        restoreOriginalValue: (value) => {
          if (value) {
            const newArrayValue = structuredClone(arrayValue)
            newArrayValue[index] = value
            handleChange(newArrayValue)
          }
        },
      }

      return itemContext
    })

    // In order to update "valueWhileClosingRef" we need to have "salt" in the deps array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salt, arrayValue, path, handleChange])

  // - Call the onChange callback when a new element is added without calling "handlePush"
  useMemo(() => {
    const last = arrayItems?.[arrayItems.length - 1]
    if (last?.isNew && !hadPushRef.current) {
      onChange?.(arrayValue)
    } else {
      hadPushRef.current = false
    }
  }, [arrayValue, arrayItems, onChange])

  const flexProps: FlexContainerProps & {
    innerRef: FlexContainerAllProps['innerRef']
  } = {
    className: classnames(
      'dnb-forms-iterate',
      'dnb-forms-section',
      props?.className
    ),
    ...pickFlexContainerProps(props as FlexContainerProps),
    ...pickSpacingProps(props),
    innerRef: containerRef,
  }

  const arrayElements =
    arrayValue === emptyValue || props?.value?.length === 0
      ? placeholder
      : arrayItems.map((itemProps) => {
          const { id, value, index } = itemProps
          const elementRef = (innerRefs.current[id] =
            innerRefs.current[id] || createRef<HTMLDivElement>())

          const renderChildren = (elementChild: ElementChild) => {
            return typeof elementChild === 'function'
              ? elementChild(value, index)
              : elementChild
          }

          const contextValue = {
            ...itemProps,
            elementRef,
          }

          const content = Array.isArray(children)
            ? children.map((child) => renderChildren(child))
            : renderChildren(children)

          if (omitFlex) {
            return (
              <IterateItemContext.Provider
                key={`element-${id}`}
                value={contextValue}
              >
                <FieldBoundaryProvider>{content}</FieldBoundaryProvider>
              </IterateItemContext.Provider>
            )
          }

          return (
            <Flex.Item
              className="dnb-forms-iterate__element"
              tabIndex={-1}
              innerRef={elementRef}
              key={`element-${id}`}
            >
              <IterateItemContext.Provider value={contextValue}>
                <FieldBoundaryProvider>{content}</FieldBoundaryProvider>
              </IterateItemContext.Provider>
            </Flex.Item>
          )
        })

  const content = omitFlex ? (
    arrayElements
  ) : (
    <Flex.Stack {...flexProps}>{arrayElements}</Flex.Stack>
  )

  return (
    <>
      {animate ? <HeightAnimation>{content}</HeightAnimation> : content}

      <FormStatus
        top={0}
        bottom={0}
        show={Boolean(error)}
        no_animation={false}
        shellSpace={{ top: true, bottom: true }}
      >
        {getMessage({ content: error })}
      </FormStatus>
    </>
  )
}

ArrayComponent._supportsSpacingProps = false // disable flex support to avoid rerender, which could result in flickering
export default ArrayComponent
