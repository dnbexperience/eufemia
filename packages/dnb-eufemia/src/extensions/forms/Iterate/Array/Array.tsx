import React, {
  useMemo,
  useRef,
  useEffect,
  useReducer,
  createRef,
  useContext,
  useCallback,
} from 'react'
import classnames from 'classnames'
import pointer from '../../utils/json-pointer'
import { useFieldProps, usePath } from '../../hooks'
import { makeUniqueId } from '../../../../shared/component-helper'
import { Flex, FormStatus, HeightAnimation } from '../../../../components'
import { Span } from '../../../../elements'
import { pickSpacingProps } from '../../../../components/flex/utils'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../../../shared/helpers/useUpdateEffect'
import {
  BasicProps as FlexContainerProps,
  Props as FlexContainerAllProps,
  pickFlexContainerProps,
} from '../../../../components/flex/Container'
import IterateItemContext, {
  IterateItemContextState,
  ModeOptions,
} from '../IterateItemContext'
import SummaryListContext from '../../Value/SummaryList/SummaryListContext'
import ValueBlockContext from '../../ValueBlock/ValueBlockContext'
import FieldBoundaryProvider from '../../DataContext/FieldBoundary/FieldBoundaryProvider'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import { useArrayLimit, useSwitchContainerMode } from '../hooks'
import { getMessagesFromError } from '../../FieldBlock'

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

  const {
    path: pathProp,
    itemPath: itemPathProp,
    countPath,
    countPathTransform,
    countPathLimit = Infinity,
  } = props || {}

  // Support for "itemPath"
  const nestedIterateItemContext = useContext(IterateItemContext)
  const { joinPath } = usePath()
  const nestedIteratePath =
    itemPathProp && nestedIterateItemContext
      ? joinPath([
          nestedIterateItemContext.path,
          String(nestedIterateItemContext.index),
          itemPathProp,
        ])
      : undefined

  const dataContext = useContext(DataContext)
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)
  const { setLimitProps, error: limitWarning } = useArrayLimit(
    pathProp || nestedIteratePath
  )

  const { getValueByPath } = useDataValue()
  const getCountValue = useCallback(() => {
    if (!countPath) {
      return -1
    }

    let countValue = parseFloat(getValueByPath(countPath))
    if (!(countValue >= 0)) {
      countValue = 0
    }
    if (countValue > countPathLimit) {
      countValue = countPathLimit
    }

    return countValue
  }, [countPath, countPathLimit, getValueByPath])
  const countValue = getCountValue()

  const validateRequired = useCallback(
    (value: Value, { emptyValue, required, error }) => {
      if (
        required &&
        (!value || value?.length === 0 || value === emptyValue)
      ) {
        return error
      }
    },
    []
  )

  const preparedProps = useMemo(() => {
    const shared = {
      required: false,
      validateRequired,
    }

    if (countPath) {
      const arrayValue = getValueByPath(pathProp)
      const newValue = []
      for (let i = 0, l = countValue; i < l; i++) {
        const value = arrayValue?.[i]
        newValue.push(
          countPathTransform
            ? countPathTransform({ value, index: i })
            : value
        )
      }

      return {
        ...shared,
        ...props,
        value: newValue,
      }
    }

    return {
      ...shared,
      ...props,
    }
  }, [
    countPath,
    countPathTransform,
    countValue,
    getValueByPath,
    pathProp,
    props,
    validateRequired,
  ])

  const {
    path,
    itemPath,
    value: arrayValue,
    limit,
    error,
    withoutFlex,
    emptyValue,
    placeholder,
    containerMode,
    animate,
    handleChange,
    setChanged,
    onChange,
    validateValue,
    children,
  } = useFieldProps(preparedProps, {
    // To ensure the defaultValue set on the Iterate.Array is set in the data context,
    // and will not overwrite defaultValues set by fields inside the Iterate.Array.
    updateContextDataInSync: true,
    omitMultiplePathWarning: true,
    forceUpdateWhenContextDataIsSet: Boolean(countPath),
    alwaysRevealError: true,
  })

  // - Call onChange on the data context, if the count value changes
  const countValueRef = useRef<number>()
  useUpdateEffect(() => {
    if (countPath) {
      if (
        typeof countValueRef.current === 'number' &&
        countValue !== countValueRef.current
      ) {
        window.requestAnimationFrame(() => {
          dataContext.handlePathChange(path, getValueByPath(path))
        }) // so we get the correct value inside the array.
      }
      countValueRef.current = countValue
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countValue])

  useEffect(() => {
    // Update inside the useEffect, to support React.StrictMode
    valueCountRef.current = arrayValue || []
  }, [arrayValue])

  const idsRef = useRef<Array<Identifier>>([])
  const isNewRef = useRef<Record<string, boolean>>({})
  const modesRef = useRef<
    Record<
      Identifier,
      {
        current: ContainerMode
        previous?: ContainerMode
        options?: ModeOptions
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

  const { getNextContainerMode } = useSwitchContainerMode()

  const arrayItems = useMemo(() => {
    const list = (valueWhileClosingRef.current || arrayValue) ?? []
    const limitedList =
      typeof limit === 'number' ? list.slice(0, limit) : list

    return limitedList.map((value, index) => {
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
        itemPath,
        value,
        index,
        arrayValue,
        containerRef,
        isNew,
        containerMode: modesRef.current[id].current,
        previousContainerMode: modesRef.current[id].previous,
        initialContainerMode: containerMode || 'auto',
        modeOptions: modesRef.current[id].options,
        nestedIteratePath,
        switchContainerMode: (mode, options = {}) => {
          modesRef.current[id].previous = modesRef.current[id].current
          modesRef.current[id].current = mode
          modesRef.current[id].options = options
          delete isNewRef.current?.[id]
          if (options?.preventUpdate !== true) {
            forceUpdate()
          }
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
  }, [
    salt,
    arrayValue,
    limit,
    path,
    itemPath,
    nestedIteratePath,
    handleChange,
  ])

  const total = arrayItems.length
  useEffect(() => {
    if (limit) {
      setLimitProps({ limit, total })
    }
  }, [total, limit, setLimitProps])

  useUpdateEffect(() => {
    validateValue()
  }, [total, validateValue])

  useMountEffect(() => {
    // To ensure the validator is called when a new item is added
    setChanged(true)
  })

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
      'dnb-forms-section', // To support containers
      props?.className
    ),
    ...pickFlexContainerProps(props as FlexContainerProps),
    ...pickSpacingProps(props),
    innerRef: containerRef,
  }

  const arrayElements =
    arrayValue === emptyValue || props?.value?.length === 0 ? (
      typeof placeholder === 'string' ? (
        <Span size="small">{placeholder}</Span>
      ) : (
        placeholder
      )
    ) : (
      arrayItems.map((itemProps) => {
        const { id, value, index } = itemProps
        const elementRef = (innerRefs.current[id] =
          innerRefs.current[id] || createRef<HTMLDivElement>())

        const renderChildren = (elementChild: ElementChild) => {
          return typeof elementChild === 'function'
            ? elementChild(value, index, arrayItems)
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
    )

  const content = omitFlex ? (
    arrayElements
  ) : (
    <Flex.Stack {...flexProps}>{arrayElements}</Flex.Stack>
  )

  return (
    <>
      {animate ? <HeightAnimation>{content}</HeightAnimation> : content}

      <FormStatus
        show={Boolean(error || limitWarning)}
        state={!error && limitWarning ? 'warning' : undefined}
        shellSpace={{ top: 0, bottom: 'medium' }}
        no_animation={false}
      >
        {getMessagesFromError({ content: error || limitWarning })[0]}
      </FormStatus>
    </>
  )
}

ArrayComponent._supportsSpacingProps = true
export default ArrayComponent
