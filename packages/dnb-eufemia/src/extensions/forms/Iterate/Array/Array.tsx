import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type { ReactNode, RefObject } from 'react'
import * as z from 'zod'
import { clsx } from 'clsx'
import pointer from '../../utils/json-pointer'
import { useFieldProps } from '../../hooks'
import { makeUniqueId } from '../../../../shared/component-helper'
import { Flex, FormStatus, HeightAnimation } from '../../../../components'
import { Span } from '../../../../elements'
import { pickSpacingProps } from '../../../../components/flex/utils'
import useMountEffect from '../../../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../../../shared/helpers/useUpdateEffect'
import type {
  FlexContainerProps,
  FlexContainerAllProps,
} from '../../../../components/flex/Container'
import { pickFlexContainerProps } from '../../../../components/flex/Container'
import type {
  IterateItemContextState,
  ModeOptions,
} from '../IterateItemContext'
import IterateItemContext from '../IterateItemContext'
import SummaryListContext from '../../Value/SummaryList/SummaryListContext'
import ValueBlockContext from '../../ValueBlock/ValueBlockContext'
import FieldBoundaryProvider from '../../DataContext/FieldBoundary/FieldBoundaryProvider'
import DataContext from '../../DataContext/Context'
import useDataValue from '../../hooks/useDataValue'
import {
  useArrayLimit,
  useItemPath,
  useSwitchContainerMode,
} from '../hooks'
import { getMessagesFromError } from '../../FieldBlock'
import { clearedArray } from '../../hooks/useFieldProps'

import type {
  ContainerMode,
  ElementChild,
  IterateArrayProps,
  Value,
} from './types'
import type { Identifier } from '../../types'
import { structuredClone } from '../../../../shared/helpers/structuredClone'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type * from './types'

function ArrayComponent(props: IterateArrayProps) {
  const [salt, forceUpdate] = useReducer(() => ({}), {})

  const {
    path: pathProp,
    itemPath: itemPathProp,
    reverse,
    countPath,
    countPathTransform,
    countPathLimit = Infinity,
    omitSectionPath,
  } = props || {}

  const dataContext = useContext(DataContext)
  const summaryListContext = useContext(SummaryListContext)
  const valueBlockContext = useContext(ValueBlockContext)
  const { absolutePath } = useItemPath(itemPathProp)
  const { setLimitProps, error: limitWarning } = useArrayLimit(
    pathProp || absolutePath
  )

  const { value: countPathValue, getValueByPath } = useDataValue(countPath)
  const { value: contextArrayValue } = useDataValue(
    countPath ? pathProp : undefined
  )
  const countValue = useMemo(() => {
    if (!countPath) {
      return -1
    }

    let countValue = parseFloat(countPathValue as string)
    if (!(countValue >= 0)) {
      countValue = 0
    }
    if (countValue > countPathLimit) {
      countValue = countPathLimit
    }

    return countValue
  }, [countPath, countPathLimit, countPathValue])
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
      schema: undefined,
      emptyValue: undefined,
      required: false,
      validateRequired,
      ...props,
    }

    if (
      typeof props.minItems === 'number' ||
      typeof props.maxItems === 'number'
    ) {
      shared.schema = (p: IterateArrayProps) => {
        let s = z.array(z.any())
        if (typeof p.minItems === 'number') {
          s = s.min(p.minItems, { message: 'IterateArray.errorMinItems' })
        }
        if (typeof p.maxItems === 'number') {
          s = s.max(p.maxItems, { message: 'IterateArray.errorMaxItems' })
        }
        return s
      }
    }

    if (countPath) {
      const arrayValue = contextArrayValue as Array<Value> | undefined
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
        value: newValue,
      }
    }

    return {
      ...shared,
    }
  }, [
    contextArrayValue,
    countPath,
    countPathTransform,
    countValue,
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
    omitSectionPath,
    getExternalValueSnapshot: getArrayShapeSnapshot,
  })

  // Ensure the path exists as an array before children try to set values at numeric paths
  useMountEffect(() => {
    // Only run this if the array is using a defaultValue that needs to initialize the context
    // Skip if data was already set by useFieldProps (which uses updateContextDataInSync)
    if (
      path &&
      dataContext?.internalDataRef?.current &&
      props.defaultValue !== undefined
    ) {
      const currentValue = pointer.has(
        dataContext.internalDataRef.current,
        path
      )
        ? pointer.get(dataContext.internalDataRef.current, path)
        : undefined

      // If not already an array, initialize it as one
      if (!Array.isArray(currentValue)) {
        dataContext.updateDataValue?.(path, arrayValue)
      }
    }
  })

  // - Call onChange on the data context, if the count value changes
  const countValueRef = useRef<number>(undefined)
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
  }, [countValue])

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
  const valueCountRef = useRef(arrayValue)
  const arrayValueRef = useRef(arrayValue)
  const containerRef = useRef<HTMLDivElement>(undefined)
  const hadPushRef = useRef<boolean>(undefined)
  const elementRefs = useRef<Record<string, RefObject<HTMLDivElement>>>({})

  const omitFlex =
    withoutFlex ?? Boolean(summaryListContext || valueBlockContext)

  const { getNextContainerMode } = useSwitchContainerMode()

  useEffect(() => {
    // Update inside the useEffect, to support React.StrictMode
    valueCountRef.current = arrayValue || []
    arrayValueRef.current = arrayValue || []
  }, [arrayValue])

  const arrayItems = useMemo(() => {
    const list = Array.isArray(arrayValue) ? arrayValue : []
    const limitedList =
      typeof limit === 'number' ? list.slice(0, limit) : list

    const arrayItems = limitedList.map((value, index) => {
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
            (isNew ? (getNextContainerMode() ?? 'edit') : 'auto'),
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
        nestedIteratePath: absolutePath,
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
          const newArrayValue = [...(arrayValueRef.current || [])]
          const currentItemValue = newArrayValue[index]

          // Make sure the changed item has a new object reference,
          // while unchanged items keep their references.
          newArrayValue[index] =
            currentItemValue && typeof currentItemValue === 'object'
              ? structuredClone(currentItemValue)
              : {}

          pointer.set(newArrayValue, path, value)
          arrayValueRef.current = newArrayValue
          handleChange(newArrayValue)
        },
        handlePush: (element) => {
          hadPushRef.current = true
          handleChange([...(arrayValueRef.current || []), element])
        },
        handleRemove: ({ keepItems = false } = {}) => {
          if (keepItems) {
            return // so we don't call fulfillRemove immediately
          }

          itemContext.fulfillRemove()
        },

        // - Called after animation end
        fulfillRemove: () => {
          const newArrayValue = structuredClone(
            arrayValueRef.current || []
          )
          newArrayValue.splice(index, 1)
          handleChange(
            newArrayValue.length === 0 ? clearedArray : newArrayValue
          )

          delete modesRef.current?.[id]
          delete isNewRef.current?.[id]
          const findIndex = idsRef.current.indexOf(id)
          idsRef.current.splice(findIndex, 1)
          forceUpdate()
        },

        // - Called when cancel button press
        restoreOriginalValue: (value) => {
          if (value) {
            const newArrayValue = structuredClone(
              arrayValueRef.current || []
            )
            newArrayValue[index] = value
            handleChange(newArrayValue)
          }
        },
      }

      return itemContext
    })

    if (reverse) {
      return arrayItems.reverse()
    }

    return arrayItems

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    salt,
    arrayValue,
    limit,
    path,
    itemPath,
    absolutePath,
    reverse,
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
    id?: string
    ref: FlexContainerAllProps['ref']
  } = {
    className: clsx(
      'dnb-forms-iterate',
      'dnb-forms-section', // To support containers
      props?.className
    ),
    ...pickFlexContainerProps(props as FlexContainerProps),
    ...pickSpacingProps(props),
    id: props?.id,
    ref: containerRef,
  }

  const arrayElements =
    total === 0 ? (
      typeof placeholder === 'string' ? (
        <Span size="small">{placeholder}</Span>
      ) : (
        placeholder
      )
    ) : (
      arrayItems.map((itemProps) => {
        const { id } = itemProps
        const elementRef = (elementRefs.current[id] = elementRefs.current[
          id
        ] || { current: null as HTMLDivElement | null })
        return (
          <ArrayElement
            key={`element-${id}`}
            itemProps={itemProps}
            elementRef={elementRef}
            arrayItems={arrayItems}
            omitFlex={omitFlex}
          >
            {children}
          </ArrayElement>
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
        noAnimation={false}
      >
        {/* @ts-expect-error -- strictFunctionTypes */}
        {getMessagesFromError({ content: error || limitWarning })[0]}
      </FormStatus>
    </>
  )
}

withComponentMarkers(ArrayComponent, {
  _supportsSpacingProps: true,
})

export default ArrayComponent

type ArrayElementProps = {
  itemProps: IterateItemContextState
  elementRef: RefObject<HTMLDivElement>
  arrayItems: Array<IterateItemContextState>
  omitFlex?: boolean
  children: ElementChild | Array<ElementChild>
}

const ArrayElement = memo(function ArrayElement({
  itemProps,
  elementRef,
  arrayItems,
  omitFlex,
  children,
}: ArrayElementProps) {
  const { value, index } = itemProps

  const renderChildren = (elementChild: ElementChild): ReactNode => {
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
      <IterateItemContext value={contextValue}>
        <FieldBoundaryProvider>{content}</FieldBoundaryProvider>
      </IterateItemContext>
    )
  }

  return (
    <Flex.Item
      className="dnb-forms-iterate__element"
      tabIndex={-1}
      ref={elementRef}
    >
      <IterateItemContext value={contextValue}>
        <FieldBoundaryProvider>{content}</FieldBoundaryProvider>
      </IterateItemContext>
    </Flex.Item>
  )
}, shouldKeepArrayElement)

function shouldKeepArrayElement(
  previous: ArrayElementProps,
  next: ArrayElementProps
) {
  return (
    previous.children === next.children &&
    previous.elementRef === next.elementRef &&
    previous.omitFlex === next.omitFlex &&
    previous.itemProps.id === next.itemProps.id &&
    previous.itemProps.index === next.itemProps.index &&
    previous.itemProps.path === next.itemProps.path &&
    previous.itemProps.itemPath === next.itemProps.itemPath &&
    previous.itemProps.value === next.itemProps.value &&
    previous.itemProps.isNew === next.itemProps.isNew &&
    previous.itemProps.containerMode === next.itemProps.containerMode &&
    previous.itemProps.previousContainerMode ===
      next.itemProps.previousContainerMode &&
    previous.itemProps.initialContainerMode ===
      next.itemProps.initialContainerMode &&
    previous.itemProps.modeOptions === next.itemProps.modeOptions
  )
}

function getArrayShapeSnapshot(value: unknown) {
  return Array.isArray(value) ? value.length : value
}
