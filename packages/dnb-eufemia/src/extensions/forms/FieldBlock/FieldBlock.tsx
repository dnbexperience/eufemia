import React, {
  useMemo,
  useContext,
  useCallback,
  useRef,
  useReducer,
  useEffect,
} from 'react'
import classnames from 'classnames'
import FieldBlockContext, {
  StateWithMessage,
  StatesWithMessages,
  FieldErrorIdsRef,
  MountedFieldsRef,
  StateRecord,
  StateMessage,
  StateTypes,
  StatusContent,
  FieldBlockContextProps,
  StateBasis,
} from './FieldBlockContext'
import DataContext from '../DataContext/Context'
import IterateElementContext from '../Iterate/IterateItemContext'
import { Space, FormLabel, FormStatus } from '../../../components'
import { Ul, Li } from '../../../elements'
import {
  convertJsxToString,
  findElementInChildren,
  warn,
} from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import {
  ComponentProps,
  FieldProps,
  SubmitState,
  Identifier,
  FieldBlockWidth,
} from '../types'
import type { FormLabelAllProps } from '../../../components/FormLabel'
import SubmitIndicator from '../Form/SubmitIndicator/SubmitIndicator'
import { createSharedState } from '../../../shared/helpers/useSharedState'
import useTranslation from '../hooks/useTranslation'
import { FormError } from '../utils'

export const states: Array<StateTypes> = ['error', 'info', 'warning']

export type Props = Pick<
  FieldProps,
  | keyof ComponentProps
  | 'layout'
  | 'label'
  | 'labelSuffix'
  | 'labelDescription'
  | 'info'
  | 'warning'
  | 'error'
  | 'disabled'
> & {
  /** The id to link a element with */
  forId?: string
  /** Use true if you have more than one form element */
  asFieldset?: boolean
  /** use `true` to make the label only readable by screen readers. */
  labelSrOnly?: boolean
  /** Defines the layout of nested fields */
  composition?: FieldBlockContextProps['composition']
  /** Width of outer block element */
  width?: FieldBlockWidth
  /** Width of contents block, while label etc can be wider if space is available */
  contentWidth?: FieldBlockWidth
  /** For composition only: Align the contents vertically */
  align?: 'center' | 'bottom'
  /** Class name for the contents block */
  contentClassName?: string
  /** To show the SubmitIndicator during async validation */
  fieldState?: SubmitState
  /** Typography size */
  labelSize?: 'medium' | 'large'
  /** For internal use only */
  required?: boolean
  children?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

function FieldBlock(props: Props) {
  const dataContext = useContext(DataContext)
  const nestedFieldBlockContext = useContext(FieldBlockContext)

  const sharedData = createSharedState<Props>(
    'field-block-props-' + (props.forId || props.id)
  )
  const {
    className,
    forId,
    layout = 'vertical',
    composition,
    label: labelProp,
    labelDescription,
    labelSuffix,
    labelSrOnly,
    asFieldset,
    required,
    info,
    warning,
    error: errorProp,
    fieldState,
    disabled,
    width,
    contentWidth,
    align,
    labelSize,
    contentClassName,
    children,
    ...rest
  } = Object.assign({}, sharedData.data, props)
  const hasCustomWidth = /\d(rem)$/.test(String(width))
  const hasCustomContentWidth = /\d(rem)$/.test(String(contentWidth))

  const iterateItemContext = useContext(IterateElementContext)
  const { index: iterateIndex } = iterateItemContext ?? {}

  const blockId = useId(props.id)
  const [wasUpdated, forceUpdate] = useReducer(() => ({}), {})
  const mountedFieldsRef = useRef<MountedFieldsRef>({})
  const stateRecordRef = useRef<StateRecord>({})
  const fieldStateIdsRef = useRef<FieldErrorIdsRef>(null)
  const contentsRef = useRef<HTMLDivElement>(null)
  const hasInitiallyErrorProp = useMemo(() => {
    return Boolean(errorProp)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const { optionalLabelSuffix } = useTranslation().Field
  const labelSuffixText = useMemo(() => {
    if (required === false || typeof labelSuffix !== 'undefined') {
      return labelSuffix ?? optionalLabelSuffix
    }
    return ''
  }, [required, labelSuffix, optionalLabelSuffix])

  const label = useMemo(() => {
    let content = labelProp

    if (iterateIndex !== undefined) {
      content = convertJsxToString(labelProp).replace(
        '{itemNo}',
        String(iterateIndex + 1)
      )
    }

    if (labelSuffixText) {
      if (convertJsxToString(content).includes(optionalLabelSuffix)) {
        return content
      }

      if (typeof content === 'string') {
        return content + ' ' + labelSuffixText
      }

      if (React.isValidElement(content)) {
        return (
          <>
            {content}
            {' '}
            {labelSuffixText}
          </>
        )
      }
    }

    return content
  }, [iterateIndex, labelProp, labelSuffixText, optionalLabelSuffix])

  const setInternalRecord = useCallback((props: StateBasis) => {
    const { stateId, identifier, type } = props

    if (!stateRecordRef.current[identifier]) {
      stateRecordRef.current[identifier] = []
    }

    fieldStateIdsRef.current = { error: null, warning: null, info: null }

    const existingIndex = stateRecordRef.current[identifier].findIndex(
      (item) => {
        return item.stateId === stateId && item.type === type
      }
    )

    if (existingIndex > -1) {
      stateRecordRef.current[identifier][existingIndex] = {
        ...stateRecordRef.current[identifier][existingIndex],
        ...props,
      }
    } else {
      stateRecordRef.current[identifier].push(props)
    }
  }, [])

  const setFieldState = useCallback(
    (props: StateBasis) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.setFieldState(props)
        return
      }

      setInternalRecord(props)

      forceUpdate()
    },
    [nestedFieldBlockContext, setInternalRecord]
  )

  const showFieldError = useCallback(
    (identifier: Identifier, show: boolean) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.showFieldError(identifier, show)
        return
      }

      if (stateRecordRef.current[identifier]) {
        stateRecordRef.current[identifier] = stateRecordRef.current[
          identifier
        ].map((item) => {
          if (item.showInitially) {
            return item
          }

          return {
            ...item,
            show,
          }
        })

        forceUpdate()
      }
    },
    [nestedFieldBlockContext]
  )

  const statusContent = useMemo(() => {
    if (typeof errorProp !== 'undefined') {
      setInternalRecord({
        identifier: blockId,
        showInitially: hasInitiallyErrorProp,
        type: 'error',
        content: errorProp,
      })
    }

    if (typeof warning !== 'undefined') {
      setInternalRecord({
        identifier: blockId,
        showInitially: true,
        type: 'warning',
        content: warning,
      })
    }

    if (typeof info !== 'undefined') {
      setInternalRecord({
        identifier: blockId,
        showInitially: true,
        type: 'info',
        content: info,
      })
    }

    const statesWithMessages: Array<StatesWithMessages> =
      // 1. Prepare the states for later use
      Object.entries(stateRecordRef.current)
        .flatMap(([identifier, states]) =>
          states.map((props) => {
            return {
              identifier,
              ...props,
            }
          })
        )

        // 2. Take states and group the same type together
        .reduce((acc, cur) => {
          const existing = acc.find((item) => {
            return item.type === cur.type
          })

          const messages = getMessagesFromError(cur).map((message) => {
            return {
              ...cur,
              message,
            }
          })

          if (existing) {
            existing.messages.push(...messages)
          } else {
            acc.push({
              ...cur,
              content: undefined,
              messages,
            })
          }

          return acc
        }, [] as Array<StatesWithMessages>)

    // 3. Return the grouped states/messages
    return states.reduce((acc, type) => {
      const id = `${props.id || forId || blockId}-form-status--${type}`
      acc[type] = {
        id,
        label,
        state: type === 'warning' ? 'warn' : type,
        width_element: contentsRef,

        // Enable animation only in the browser and not in tests
        no_animation:
          process.env.NODE_ENV === 'test'
            ? true
            : typeof globalThis !== 'undefined'
            ? globalThis.IS_TEST === true
            : false,
      }

      const found = statesWithMessages.find((item) => {
        return item.type === type
      })

      if (found?.messages) {
        // Hide/remove messages that should be hidden and are not marked as to be shown initially
        const messages = found.messages
          .map((msg) => {
            if (msg.type === 'error') {
              if (!msg.showInitially && !msg.show) {
                msg.message = null
              }
            }

            return msg
          })
          .filter(({ message }) => message)
          .reduce((acc, msg, i, arr) => {
            const existingIndex = arr.findIndex((item) => {
              return (
                convertJsxToString(item.message) ===
                convertJsxToString(msg.message)
              )
            })

            // Remove duplicates, use the first found message
            if (existingIndex === i) {
              acc.push(msg)
            }

            return acc
          }, [])

        // Combine the messages and put them in an ul/li list
        if (messages.length > 0) {
          acc[type] = {
            ...acc[type],
            text: <CombineMessages type={type} messages={messages} />,
          }

          fieldStateIdsRef.current[type] = id
        } else {
          fieldStateIdsRef.current[type] = undefined
        }
      }

      return acc
    }, {}) as StatusContent

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    info,
    warning,
    errorProp,
    nestedFieldBlockContext,
    setInternalRecord,
    blockId,
    wasUpdated, // wasUpdated is needed to get the current errors
  ])

  // Handle the error prop from outside
  useEffect(() => {
    if (!nestedFieldBlockContext) {
      showFieldError(blockId, Boolean(errorProp))
    }
  }, [errorProp, blockId, showFieldError, nestedFieldBlockContext])

  useEffect(
    () => () => {
      mountedFieldsRef.current = {}
      stateRecordRef.current = {}
    },
    []
  )

  const mainClasses = classnames(
    'dnb-forms-field-block',
    width &&
      `dnb-forms-field-block--width-${hasCustomWidth ? 'custom' : width}`,
    className
  )
  const gridClasses = classnames(
    'dnb-forms-field-block__grid',
    `dnb-forms-field-block--layout-${layout}`
  )

  // A child component with a label was found, use fieldset/legend instead of div/label
  const enableFieldset = useEnableFieldset({
    label,
    asFieldset,
    children,
    nestedFieldBlockContext,
  })

  const labelProps: FormLabelAllProps = {
    element: enableFieldset ? 'legend' : 'label',
    forId: enableFieldset ? undefined : forId,
    srOnly: labelSrOnly,
    space: { top: 0, bottom: 'x-small' },
    size: labelSize,
    disabled,
  }

  const mainStyle = useMemo(() => {
    if (hasCustomWidth) {
      return {
        '--dnb-forms-field-block-width': width,
      } as React.CSSProperties
    }
  }, [hasCustomWidth, width])

  const contentsStyle = useMemo(() => {
    if (hasCustomContentWidth) {
      return {
        '--dnb-forms-field-block-content-width': contentWidth,
      } as React.CSSProperties
    }
  }, [contentWidth, hasCustomContentWidth])

  if (dataContext?.prerenderFieldProps) {
    return null
  }

  if (fieldState && typeof label === 'undefined') {
    warn(
      'Provide a label when using an async validator or onChange event.'
    )
  }

  const hasLabelDescription = isFragment(labelDescription)
    ? fragmentHasChildren(labelDescription) &&
      !fragmentHasOnlyUndefinedChildren(labelDescription)
    : labelDescription

  return (
    <FieldBlockContext.Provider
      value={{
        setFieldState,
        showFieldError,
        hasErrorProp: Boolean(errorProp),
        fieldStateIdsRef,
        mountedFieldsRef,
        composition,
      }}
    >
      <Space
        element={enableFieldset ? 'fieldset' : 'div'} // use fieldset and legend to enhance a11y
        style={mainStyle}
        className={mainClasses}
        {...rest}
      >
        <div className={gridClasses}>
          <LabelDescription labelDescription={labelDescription}>
            {(label || labelDescription) && (
              <FormLabel {...labelProps}>
                <SubmitIndicator state={fieldState}>
                  {label}
                  {hasLabelDescription && (
                    <span className="dnb-forms-field-block__label-description">
                      {labelDescription}
                    </span>
                  )}
                </SubmitIndicator>
              </FormLabel>
            )}
          </LabelDescription>

          <div className="dnb-forms-field-block__status">
            <FormStatus {...statusContent?.error} />
            <FormStatus {...statusContent?.warning} />
            <FormStatus {...statusContent?.info} />
          </div>

          <div
            style={contentsStyle}
            className={classnames(
              'dnb-forms-field-block__contents',
              contentWidth &&
                `dnb-forms-field-block__contents--width-${
                  hasCustomContentWidth ? 'custom' : contentWidth
                }`,
              align && `dnb-forms-field-block__contents--align-${align}`,
              composition &&
                `dnb-forms-field-block__contents__composition--${
                  composition === true ? 'horizontal' : composition
                }`,
              contentClassName
            )}
            ref={contentsRef}
          >
            {children}
          </div>
        </div>
      </Space>
    </FieldBlockContext.Provider>
  )
}

function useEnableFieldset({
  label,
  asFieldset,
  children,
  nestedFieldBlockContext,
}) {
  return useMemo(() => {
    if (asFieldset === false) {
      return false
    }

    let result = asFieldset

    if (label && !result && !nestedFieldBlockContext) {
      let count = 0

      findElementInChildren(children, (child: React.ReactElement) => {
        if (
          child?.props?.label ||
          child?.type?.['_formElement'] === true
        ) {
          count++
        }
        if (count > 1) {
          return (result = true)
        }
      })
    }

    return Boolean(result)
  }, [asFieldset, children, label, nestedFieldBlockContext])
}

function CombineMessages({
  type,
  messages,
}: {
  type: StateTypes
  messages: Array<StateWithMessage>
}) {
  const translations = useTranslation().Field

  if (messages.length === 1) {
    return <>{messages[0].message}</>
  }

  return (
    <>
      {type === 'error'
        ? translations.errorSummary
        : translations.stateSummary}
      <Ul>
        {messages.map(({ message }, i) => {
          return <Li key={i}>{message}</Li>
        })}
      </Ul>
    </>
  )
}

function LabelDescription({ labelDescription, children }) {
  if (!labelDescription) {
    return children ?? null
  }
  return <div className="dnb-forms-field-block__label">{children}</div>
}

export function getMessagesFromError(
  item: Partial<StateWithMessage>
): Array<StateMessage> {
  const { content } = item

  if (content instanceof FormError && Array.isArray(content.errors)) {
    return content.errors.map((error) => {
      return error.message
    })
  }

  return [
    ((content instanceof Error && content.message) ||
      (content instanceof FormError && content.message) ||
      content?.toString() ||
      content) as StateMessage,
  ]
}

function isFragment(fragment: React.ReactNode) {
  return React.isValidElement(fragment) && fragment.type === React.Fragment
}

function fragmentHasChildren(fragment: React.ReactNode) {
  return (
    React.isValidElement(fragment) &&
    React.Children.count(fragment.props.children) > 0
  )
}

function fragmentHasOnlyUndefinedChildren(fragment: React.ReactNode) {
  const isUndefined = (child) => child === undefined

  return (
    React.isValidElement(fragment) &&
    React.Children.toArray(fragment.props.children).every(isUndefined)
  )
}

FieldBlock._supportsSpacingProps = true

export default FieldBlock
