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
import { Space, FormLabel, FormStatus } from '../../../components'
import { Ul, Li } from '../../../elements'
import {
  convertJsxToString,
  findElementInChildren,
} from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import {
  ComponentProps,
  FieldProps,
  SubmitState,
  Identifier,
  UseFieldProps,
} from '../types'
import type { FormLabelAllProps } from '../../../components/FormLabel'
import HelpButtonInline, {
  HelpButtonInlineContent,
  HelpProps,
} from '../../../components/help-button/HelpButtonInline'
import SubmitIndicator from '../Form/SubmitIndicator/SubmitIndicator'
import { createSharedState } from '../../../shared/helpers/useSharedState'
import useTranslation from '../hooks/useTranslation'
import { FormError } from '../utils'
import { useIterateItemNo } from '../Iterate/ItemNo/useIterateItemNo'

export const states: Array<StateTypes> = ['error', 'info', 'warning']

/**
 * The width of a field block
 */
export type CustomWidth = `${number}rem`
export type FieldBlockWidth =
  | false
  | 'small'
  | 'medium'
  | 'large'
  | 'stretch'
  | CustomWidth
export type FieldBlockHorizontalLabelWidth =
  | 'small'
  | 'medium'
  | 'large'
  | CustomWidth
export type FieldBlockHorizontalLabelHeight =
  | 'default'
  | 'small'
  | 'medium'
  | 'large'

export type SharedFieldBlockProps = {
  /**
   * The layout of the field block
   */
  layout?: 'vertical' | 'horizontal'
  /** Use this to set additional options for the layout */
  layoutOptions?: {
    width?: FieldBlockHorizontalLabelWidth
    minWidth?: FieldBlockHorizontalLabelWidth
    maxWidth?: FieldBlockHorizontalLabelWidth
  }
  /**
   * Main label text for the field
   */
  label?: React.ReactNode
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Will append an additional text to the label, like "(optional)" or "(recommended)"
   */
  labelSuffix?: React.ReactNode
  /**
   * A more discreet text displayed beside the label
   */
  labelDescription?: React.ReactNode
  /**
   * If true, the labelDescription will be displayed on the same line as the label.
   */
  labelDescriptionInline?: boolean
  /**
   * Define the font-size of the label based on the [heading sizes](/uilib/elements/heading/) table.
   */
  labelSize?: 'medium' | 'large'
  /**
   * Width of outer block element
   */
  width?: FieldBlockWidth
  /**
   * Width of contents block, while label etc can be wider if space is available
   */
  contentWidth?: FieldBlockWidth
  /**
   * Provide help content for the field.
   */
  help?: HelpProps
}

export type Props<Value = unknown> = SharedFieldBlockProps &
  Pick<
    FieldProps<Value>,
    keyof ComponentProps | 'info' | 'warning' | 'error' | 'disabled'
  > & {
    /** The id to link a element with */
    forId?: string
    /** Use true if you have more than one form element */
    asFieldset?: boolean
    /** Defines the layout of nested fields */
    composition?: FieldBlockContextProps['composition']
    /** For composition only: Align the contents vertically */
    align?: 'center' | 'bottom'
    /** Class name for the contents block */
    contentClassName?: string
    /** To show the SubmitIndicator during async validation */
    fieldState?: SubmitState
    /** Defines the height of an component (size prop), so the label can be aligned correctly */
    labelHeight?: FieldBlockHorizontalLabelHeight
    /** Disable the error summary for this field block */
    disableStatusSummary?: boolean
    /** For internal use only */
    required?: boolean
    children?: React.ReactNode
  } & React.HTMLAttributes<HTMLDivElement>

function FieldBlock<Value = unknown>(props: Props<Value>) {
  const dataContext = useContext(DataContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const nestedFieldBlockContext = !fieldBlockContext?.disableStatusSummary
    ? fieldBlockContext
    : null

  const id = useId(props.id ?? props.forId)
  const sharedData = createSharedState<Props>('field-block-props-' + id)
  const {
    className,
    forId,
    layout = 'vertical',
    layoutOptions,
    composition,
    label: labelProp,
    labelDescription,
    labelDescriptionInline,
    labelSuffix,
    labelSrOnly,
    labelSize,
    labelHeight,
    help,
    asFieldset,
    required,
    info,
    warning,
    error,
    disableStatusSummary,
    fieldState,
    disabled,
    width,
    contentWidth,
    align,
    contentClassName,
    children,
    ...rest
  } = Object.assign({}, sharedData.data, props)
  const hasCustomWidth = /\d(rem)$/.test(String(width))
  const hasCustomContentWidth = /\d(rem)$/.test(String(contentWidth))

  const infoRef = useRef<UseFieldProps['info']>()
  const warningRef = useRef<UseFieldProps['warning']>()
  const errorRef = useRef<UseFieldProps['error']>()

  const blockId = useId(props.id)
  const [salt, forceUpdate] = useReducer(() => ({}), {})
  const mountedFieldsRef = useRef<MountedFieldsRef>(new Map())
  const fieldStateRef = useRef<SubmitState>(null)
  const stateRecordRef = useRef<StateRecord>({})
  const fieldStateIdsRef = useRef<FieldErrorIdsRef>(null)
  const contentsRef = useRef<HTMLDivElement>(null)
  const hasInitiallyErrorPropRef = useRef(Boolean(error))

  const label = useIterateItemNo({
    label: labelProp,
    labelSuffix,
    required,
  })

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

  const setBlockRecordNested = nestedFieldBlockContext?.setBlockRecord
  const setBlockRecord = useCallback(
    (props: StateBasis) => {
      if (setBlockRecordNested) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        setBlockRecordNested(props)
        return
      }

      setInternalRecord(props)

      forceUpdate()
    },
    [setBlockRecordNested, setInternalRecord]
  )

  const setFieldState = useCallback(
    (identifier: Identifier, fieldState: SubmitState) => {
      if (fieldState !== fieldStateRef.current) {
        fieldStateRef.current = fieldState

        forceUpdate()
      }
    },
    []
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
    if (typeof error !== 'undefined' || (errorRef.current && !error)) {
      errorRef.current = error
      setInternalRecord({
        identifier: blockId,
        showInitially: hasInitiallyErrorPropRef.current,
        type: 'error',
        content: error,
      })
    }

    if (typeof warning !== 'undefined' || warningRef.current !== warning) {
      warningRef.current = warning
      setInternalRecord({
        identifier: blockId,
        showInitially: true,
        type: 'warning',
        content: warning,
      })
    }

    if (typeof info !== 'undefined' || infoRef.current !== info) {
      infoRef.current = info
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
            children: <CombineMessages type={type} messages={messages} />,
          }

          fieldStateIdsRef.current[type] = id
        } else {
          fieldStateIdsRef.current[type] = undefined
        }
      }

      return acc
    }, salt) as StatusContent
  }, [
    error,
    warning,
    info,
    salt,
    setInternalRecord,
    blockId,
    props.id,
    forId,
    label,
  ])

  // Handle the error prop from outside
  useEffect(() => {
    if (!nestedFieldBlockContext) {
      showFieldError(blockId, Boolean(error))
    }
  }, [error, blockId, showFieldError, nestedFieldBlockContext])

  useEffect(
    () => () => {
      mountedFieldsRef.current = new Map()
      stateRecordRef.current = {}
    },
    []
  )

  const mainClasses = classnames(
    'dnb-forms-field-block',
    width &&
      `dnb-forms-field-block--width-${hasCustomWidth ? 'custom' : width}`,
    contentWidth &&
      `dnb-forms-field-block--content-width-${
        hasCustomContentWidth ? 'custom' : contentWidth
      }`,
    labelHeight && `dnb-forms-field-block--label-height-${labelHeight}`,
    composition && 'dnb-forms-field-block__composition',
    composition &&
      `dnb-forms-field-block__composition--${
        composition === true ? 'horizontal' : composition
      }`,
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
    id: `${id}-label`,
    className: 'dnb-forms-field-block__label',
    element: enableFieldset ? 'legend' : 'label',
    forId: enableFieldset ? undefined : forId,
    srOnly: labelSrOnly,
    space: 0, // Use CSS for spacing, but we need to reset space for doing so
    size: labelSize,
    disabled,
  }

  const mainStyle = useMemo(() => {
    const style: React.CSSProperties = {}

    if (hasCustomWidth) {
      style['--dnb-forms-field-block-width'] = width
    }

    if (hasCustomContentWidth) {
      style['--dnb-forms-field-block-content-width'] = contentWidth
    }

    const lO = layoutOptions || {}
    const min = getFieldWidth(lO.minWidth ?? lO.width)
    const max = getFieldWidth(lO.maxWidth ?? lO.width)

    if (typeof min === 'string') {
      style['--dnb-forms-field-block-layout-width-min'] = min
    }
    if (typeof max === 'string') {
      style['--dnb-forms-field-block-layout-width-max'] = max
    }

    return style
  }, [
    contentWidth,
    hasCustomContentWidth,
    hasCustomWidth,
    layoutOptions,
    width,
  ])

  if (dataContext?.prerenderFieldProps) {
    return null
  }

  const hasLabelDescription = isFragment(labelDescription)
    ? fragmentHasChildren(labelDescription) &&
      !fragmentHasOnlyUndefinedChildren(labelDescription)
    : labelDescription
  const hasHelp = help?.title || help?.content
  const hasOnlyLabelDescription = !label && hasLabelDescription

  return (
    <FieldBlockContext.Provider
      value={{
        setBlockRecord,
        setFieldState,
        showFieldError,
        hasErrorProp: Boolean(error),
        fieldStateIdsRef,
        mountedFieldsRef,
        composition,
        disableStatusSummary,
      }}
    >
      <Space
        element={enableFieldset ? 'fieldset' : 'div'} // use fieldset and legend to enhance a11y
        style={mainStyle}
        className={mainClasses}
        {...rest}
      >
        <div className={gridClasses}>
          {(label || labelDescription || hasHelp) && (
            <FormLabel {...labelProps}>
              <span>
                {label && (
                  <span className="dnb-forms-field-block__label__content">
                    {label}
                  </span>
                )}

                {hasHelp && !hasOnlyLabelDescription && (
                  <span className="dnb-help-button__word-joiner">
                    <HelpButtonInline
                      contentId={`${id}-help`}
                      help={help}
                    />
                  </span>
                )}

                {label &&
                  hasLabelDescription &&
                  !labelDescriptionInline && <br />}

                {hasLabelDescription && (
                  <span className="dnb-forms-field-block__label__description">
                    {labelDescription}
                  </span>
                )}

                {hasHelp && hasOnlyLabelDescription && (
                  <span className="dnb-help-button__word-joiner">
                    <HelpButtonInline
                      contentId={`${id}-help`}
                      help={help}
                    />
                  </span>
                )}
              </span>
            </FormLabel>
          )}

          {hasHelp && (
            <HelpButtonInlineContent
              contentId={`${id}-help`}
              className="dnb-forms-field-block__help"
              help={help}
              breakout={
                layout === 'vertical' &&
                !nestedFieldBlockContext?.composition
              }
              outset={layout !== 'horizontal'}
            />
          )}

          <div
            className={classnames(
              'dnb-forms-field-block__status',

              // Handle the width of the status messages
              contentWidth &&
                contentWidth !== 'small' &&
                contentWidth !== 'medium' &&
                !(parseFloat(contentWidth) <= 11) &&
                `dnb-forms-field-block__contents--width-${
                  hasCustomContentWidth ? 'custom' : contentWidth
                }`
            )}
          >
            <FormStatus {...statusContent?.error} />
            <FormStatus {...statusContent?.warning} />
            <FormStatus {...statusContent?.info} />
          </div>

          <div
            className={classnames(
              'dnb-forms-field-block__contents',
              contentWidth &&
                `dnb-forms-field-block__contents--width-${
                  hasCustomContentWidth ? 'custom' : contentWidth
                }`,
              align && `dnb-forms-field-block__contents--align-${align}`,
              contentClassName
            )}
            ref={contentsRef}
          >
            {children}
          </div>

          <SubmitIndicator
            state={fieldState ?? fieldStateRef.current}
            className="dnb-forms-field-block__indicator dnb-forms-submit-indicator--inline-wrap"
          />
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

function getMessage(error: FormError | Error) {
  if (error instanceof FormError) {
    return error.formattedMessage ?? error.message
  }

  return error.message
}

export function getMessagesFromError(
  item: Partial<StateWithMessage>
): Array<StateMessage> {
  const { content } = item

  if (content instanceof FormError && Array.isArray(content.errors)) {
    return content.errors.map((content) => {
      return getMessage(content)
    })
  }

  if (Array.isArray(content)) {
    return content.map((content) => {
      return content instanceof FormError || content instanceof Error
        ? getMessage(content)
        : content
    })
  }

  if (content instanceof FormError || content instanceof Error) {
    return [getMessage(content)]
  }

  return [
    ((React.isValidElement(content) ? content : content?.toString()) ||
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

function getFieldWidth(width: FieldBlockHorizontalLabelWidth) {
  switch (width) {
    case 'small':
      return 'var(--forms-field-width--small)'
    case 'medium':
      return 'var(--forms-field-width--medium)'
    case 'large':
      return 'var(--forms-field-width--large)'
  }

  return width
}
