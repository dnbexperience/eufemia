import {
  Children,
  Fragment,
  Suspense,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'
import type {
  StateWithMessage,
  StatesWithMessages,
  StateRecord,
  StateMessage,
  FieldState,
  StatusContent,
  FieldBlockContextProps,
  StateBasis,
} from './FieldBlockContext'
import FieldBlockContext from './FieldBlockContext'
import DataContext from '../DataContext/Context'
import { Space, FormLabel, FormStatus } from '../../../components'
import { Ul, Li } from '../../../elements'
import {
  convertJsxToString,
  findElementInChildren,
} from '../../../shared/component-helper'
import useId from '../../../shared/helpers/useId'
import type {
  ComponentProps,
  FieldProps,
  SubmitState,
  Identifier,
} from '../types'
import type { FormLabelAllProps } from '../../../components/FormLabel'
import type { HelpProps } from '../../../components/help-button/HelpButtonInline'
import HelpButtonInline, {
  HelpButtonInlineContent,
} from '../../../components/help-button/HelpButtonInline'
import SubmitIndicator from '../Form/SubmitIndicator/SubmitIndicator'
import { createSharedState } from '../../../shared/helpers/useSharedState'
import useTranslation from '../hooks/useTranslation'
import { FormError } from '../utils'
import { useIterateItemNo } from '../Iterate/ItemNo/useIterateItemNo'
import withComponentMarkers from '../../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../../shared/helpers/withComponentMarkers'

export const states: Array<FieldState> = [
  'error',
  'information',
  'warning',
]

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
   * Layout for the label and input. Can be `horizontal` or `vertical`.
   */
  layout?: 'vertical' | 'horizontal'
  /**
   * Use this to set additional options for the `horizontal` layout, e.g. `{ width: "medium" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width, e.g. `{ minWidth: "6rem", maxWidth: "12rem" }`.
   */
  layoutOptions?: {
    width?: FieldBlockHorizontalLabelWidth
    minWidth?: FieldBlockHorizontalLabelWidth
    maxWidth?: FieldBlockHorizontalLabelWidth
  }
  /**
   * Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.
   */
  label?: ReactNode
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Will append additional text to the label, like "(optional)" or "(recommended)", displayed in a secondary text color.
   */
  labelSuffix?: ReactNode
  /**
   * Supporting text displayed below the label by default. Set `labelDescriptionInline` to `true` to display it on the same line as the label.
   */
  labelDescription?: ReactNode
  /**
   * If `true`, the `labelDescription` will be displayed on the same line as the label.
   */
  labelDescriptionInline?: boolean
  /**
   * Define one of the following [heading sizes](/uilib/elements/heading/): `medium` or `large`.
   */
  labelSize?: 'medium' | 'large'
  /**
   * Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.
   */
  width?: FieldBlockWidth
  /**
   * Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.
   */
  contentWidth?: FieldBlockWidth
  /**
   * Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).
   */
  help?: HelpProps
  /**
   * Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.
   */
  hideHelpButton?: boolean
  /**
   * Controls where status messages (`error`, `warning`, `information`) are visually shown. Use `below` (default) or `above`.
   */
  statusPosition?: 'below' | 'above'
}

export type FieldBlockProps<Value = unknown> = SharedFieldBlockProps &
  Pick<
    FieldProps<Value>,
    keyof ComponentProps | 'info' | 'warning' | 'error' | 'disabled'
  > & {
    /** The id to link an element with */
    forId?: string
    /**
     * Use `true` when you have several form elements. This way a `fieldset` with a `legend` is used.
     */
    asFieldset?: boolean
    /**
     * Use `true` for when you have more than one field wrapped.
     */
    composition?: FieldBlockContextProps['composition']
    /**
     * `center` or `bottom` for aligning the contents vertically. Defaults to `bottom`.
     */
    align?: 'center' | 'bottom'
    /** Class name for the contents block */
    contentClassName?: string
    /** To show the SubmitIndicator during async validation */
    fieldState?: SubmitState
    /**
     * Defines the height of a component (size property), so the label can be aligned correctly. Can be `default`, `small`, `medium`, `large`.
     */
    labelHeight?: FieldBlockHorizontalLabelHeight
    /**
     * Use `true` to disable the error summary.
     */
    disableStatusSummary?: boolean
    /** For internal use only */
    required?: boolean
    /** Role for the fieldset element when using fieldset */
    fieldsetRole?: string
    children?: ReactNode
  } & HTMLAttributes<HTMLDivElement>

function FieldBlock<Value = unknown>(props: FieldBlockProps<Value>) {
  const dataContext = useContext(DataContext)
  const fieldBlockContext = useContext(FieldBlockContext)
  const nestedFieldBlockContext = !fieldBlockContext?.disableStatusSummary
    ? fieldBlockContext
    : null

  const id = useId(props.id ?? props.forId)
  const sharedData = createSharedState<FieldBlockProps>(
    'field-block-props-' + id
  )
  const {
    className,
    style: givenStyle,
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
    hideHelpButton,
    statusPosition,
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
    fieldsetRole,
    children,
    ...rest
  } = Object.assign({}, sharedData.data, props)
  const hasCustomWidth = /\d(rem)$/.test(String(width))
  const hasCustomContentWidth = /\d(rem)$/.test(String(contentWidth))

  const blockId = useId(props.id)
  const [, forceUpdate] = useReducer(() => ({}), {})
  const fieldStatesRef = useRef<Map<Identifier, SubmitState>>(new Map())
  const stateRecordRef = useRef<StateRecord>({})
  const hiddenFieldsRef = useRef(new Set<Identifier>())
  const statusId = props.id || forId || blockId
  const renderRecords: StateRecord = {}
  const statusChildrenRef = useRef<
    Partial<
      Record<
        FieldState,
        ReactElement<{ messages: Array<StateWithMessage> }>
      >
    >
  >({})
  const contentsRef = useRef<HTMLDivElement>(null)
  const hasInitiallyErrorPropRef = useRef(Boolean(error))

  const label = useIterateItemNo({
    label: labelProp,
    labelSuffix,
    required,
  })

  const setInternalRecord = useCallback(
    (props: StateBasis, record = stateRecordRef.current) => {
      const { stateId, identifier, type } = props

      if (!record[identifier]) {
        record[identifier] = []
      }

      const records = record[identifier]
      const existingIndex = records.findIndex((item) => {
        return item.stateId === stateId && item.type === type
      })

      if (existingIndex > -1) {
        records[existingIndex] = {
          ...records[existingIndex],
          ...props,
        }
      } else if (stateId) {
        // Keep validation messages before the messages given as props, which register during render
        const index = records.findIndex((item) => !item.stateId)
        records.splice(index > -1 ? index : records.length, 0, props)
      } else {
        records.push(props)
      }
    },
    []
  )

  const setBlockRecordNested = nestedFieldBlockContext?.setBlockRecord
  const setBlockRecord = useCallback(
    (props: StateBasis, options?: { remove?: boolean }) => {
      if (setBlockRecordNested) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        setBlockRecordNested(props, options)
        return undefined
      }

      if (options?.remove) {
        hiddenFieldsRef.current.add(props.identifier)
      } else {
        if (!props.stateId) {
          hiddenFieldsRef.current.delete(props.identifier)
        }
        setInternalRecord(props)
      }

      forceUpdate()
    },
    [setBlockRecordNested, setInternalRecord]
  )

  // Server and hydration records belong only to this render. Client records
  // are registered after commit so suspended fields cannot enter the summary.
  const collectMessages =
    nestedFieldBlockContext?.collectMessages ??
    ((record: StateBasis) => setInternalRecord(record, renderRecords))

  const setFieldState = useCallback(
    (identifier: Identifier, fieldState: SubmitState) => {
      if (composition) {
        nestedFieldBlockContext?.setFieldState?.(identifier, fieldState)
        return undefined
      }

      if (fieldState !== fieldStatesRef.current.get(identifier)) {
        if (fieldState) {
          fieldStatesRef.current.set(identifier, fieldState)
        } else {
          fieldStatesRef.current.delete(identifier)
        }

        forceUpdate()
      }
    },
    [composition, nestedFieldBlockContext]
  )

  const showFieldError = useCallback(
    (identifier: Identifier, show: boolean) => {
      if (nestedFieldBlockContext) {
        // If this FieldBlock is inside another one, forward the call to the outer one
        nestedFieldBlockContext.showFieldError(identifier, show)
        return undefined
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

  for (const [type, content] of [
    ['error', error],
    ['warning', warning],
    ['information', info],
  ] as const) {
    if (
      content !== undefined ||
      stateRecordRef.current[blockId]?.some((item) => item.type === type)
    ) {
      setInternalRecord({
        identifier: blockId,
        showInitially:
          type !== 'error' || hasInitiallyErrorPropRef.current,
        type,
        content,
      })
    }
  }

  // Called after the children have rendered, so messages they register during render are included
  const getStatusContent = () => {
    const statesWithMessages: Array<StatesWithMessages> =
      // 1. Prepare the states for later use
      Object.entries({ ...stateRecordRef.current, ...renderRecords })
        .filter(([identifier]) => !hiddenFieldsRef.current.has(identifier))
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
      const id = `${statusId}-form-status--${type}`
      acc[type] = {
        id,
        label,
        state: type,
        widthElement: contentsRef,

        // Enable animation only in the browser and not in tests
        noAnimation:
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
          const cached = statusChildrenRef.current[type]

          // Reuse the children while the messages are unchanged, so FormStatus skips re-rendering
          if (
            cached?.props.messages.length !== messages.length ||
            cached.props.messages.some(
              (msg, i) => msg.message !== messages[i].message
            )
          ) {
            statusChildrenRef.current[type] = (
              <CombineMessages type={type} messages={messages} />
            )
          }

          acc[type] = {
            ...acc[type],
            children: statusChildrenRef.current[type],
          }
        }
      }

      return acc
    }, {}) as StatusContent
  }

  // Handle the error prop from outside
  useEffect(() => {
    if (!nestedFieldBlockContext) {
      showFieldError(blockId, Boolean(error))
    }
  }, [error, blockId, showFieldError, nestedFieldBlockContext])

  const mainClasses = clsx(
    'dnb-forms-field-block',
    width &&
      `dnb-forms-field-block--width-${hasCustomWidth ? 'custom' : width}`,
    contentWidth &&
      `dnb-forms-field-block--content-width-${
        hasCustomContentWidth ? 'custom' : contentWidth
      }`,
    labelHeight && `dnb-forms-field-block--label-height-${labelHeight}`,
    statusPosition === 'above' &&
      'dnb-forms-field-block--status-position-above',
    composition && 'dnb-forms-field-block__composition',
    composition &&
      `dnb-forms-field-block__composition--${
        composition === true ? 'horizontal' : composition
      }`,
    className
  )
  const gridClasses = clsx(
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
    // Without a label, the field's own control may already use this id (Field.Toggle)
    id: label || enableFieldset ? `${id}-label` : undefined,
    className: 'dnb-forms-field-block__label',
    element: enableFieldset ? 'legend' : forId ? 'label' : 'span',
    forId: enableFieldset ? undefined : forId,
    srOnly: labelSrOnly,
    space: 0, // Use CSS for spacing, but we need to reset space for doing so
    size: labelSize,
    disabled,
  }

  const mainStyle = useMemo(() => {
    const style: CSSProperties = {}

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

    return { ...style, ...givenStyle }
  }, [
    contentWidth,
    givenStyle,
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
  const showLabel =
    label || labelDescription || (hasHelp && !hideHelpButton)

  return (
    <FieldBlockContext
      value={{
        setBlockRecord,
        collectMessages,
        setFieldState,
        showFieldError,
        hasErrorProp: Boolean(error),
        statusId: nestedFieldBlockContext?.statusId ?? statusId,
        composition,
        disableStatusSummary,
      }}
    >
      <Space
        element={enableFieldset ? 'fieldset' : 'div'} // use fieldset and legend to enhance a11y
        style={mainStyle}
        className={mainClasses}
        aria-labelledby={
          enableFieldset && showLabel ? labelProps.id : undefined
        }
        role={enableFieldset ? fieldsetRole : undefined}
        {...rest}
      >
        <div className={gridClasses}>
          {showLabel && (
            <FormLabel {...labelProps}>
              <span>
                {label && (
                  <span className="dnb-forms-field-block__label__content">
                    {label}
                  </span>
                )}

                {hasHelp &&
                  !hasOnlyLabelDescription &&
                  !hideHelpButton && (
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

                {hasHelp && hasOnlyLabelDescription && !hideHelpButton && (
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
            className={clsx(
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

          {/* Hydrate the summary after any deferred field boundaries. */}
          <Suspense fallback={null}>
            <RenderAfterChildren
              render={() => {
                const statusContent = getStatusContent()

                return (
                  <div
                    className={clsx(
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
                    <FormStatus {...statusContent.error} />
                    <FormStatus {...statusContent.warning} />
                    <FormStatus {...statusContent.information} />
                  </div>
                )
              }}
            />
          </Suspense>

          <SubmitIndicator
            state={
              fieldState ?? getAggregateFieldState(fieldStatesRef.current)
            }
            className="dnb-forms-field-block__indicator dnb-forms-submit-indicator--inline-wrap"
          />
        </div>
      </Space>
    </FieldBlockContext>
  )
}

function RenderAfterChildren({ render }: { render: () => ReactNode }) {
  return render()
}

const fieldStatePriority: Record<SubmitState, number> = {
  abort: 0,
  complete: 1,
  success: 2,
  error: 3,
  pending: 4,
}

function getAggregateFieldState(
  fieldStates: Map<Identifier, SubmitState>
): SubmitState | undefined {
  let aggregateState: SubmitState

  fieldStates.forEach((state) => {
    if (
      !aggregateState ||
      fieldStatePriority[state] > fieldStatePriority[aggregateState]
    ) {
      aggregateState = state
    }
  })

  return aggregateState
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

      findElementInChildren(
        children,
        (child: ReactElement<{ label?: ReactNode }>) => {
          if (
            child?.props?.label ||
            (child?.type as ComponentMarkers)?._formElement === true
          ) {
            count++
          }
          if (count > 1) {
            return (result = true)
          }

          return undefined
        }
      )
    }

    return Boolean(result)
  }, [asFieldset, children, label, nestedFieldBlockContext])
}

function CombineMessages({
  type,
  messages,
}: {
  type: FieldState
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
    ((isValidElement(content) ? content : content?.toString()) ||
      content) as StateMessage,
  ]
}

function isFragment(fragment: ReactNode) {
  return isValidElement(fragment) && fragment.type === Fragment
}

function fragmentHasChildren(fragment: ReactNode) {
  return (
    isValidElement<{ children?: ReactNode }>(fragment) &&
    Children.count(fragment.props.children) > 0
  )
}

function fragmentHasOnlyUndefinedChildren(fragment: ReactNode) {
  const isUndefined = (child) => child === undefined

  return (
    isValidElement<{ children?: ReactNode }>(fragment) &&
    Children.toArray(fragment.props.children).every(isUndefined)
  )
}

withComponentMarkers(FieldBlock, {
  _supportsSpacingProps: true,
})

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
