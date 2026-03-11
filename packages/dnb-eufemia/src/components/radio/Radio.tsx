/**
 * Web Radio Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type { ComponentMarkers } from '../../shared/helpers/withComponentMarkers'
import React from 'react'
import clsx from 'clsx'
import {
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

import type { FormStatusBaseProps } from '../FormStatus'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

export type RadioLabel = string | React.ReactNode
export type RadioLabelPosition = 'left' | 'right'
export type RadioSize = 'default' | 'medium' | 'large'
export type RadioSuffix = string | React.ReactNode
export type RadioChildren = string | React.ReactNode

export type RadioEvent<E = React.SyntheticEvent> = {
  group?: string
  checked: boolean
  value: string
  event: E
}

export type RadioChangeEvent = RadioEvent<
  | React.ChangeEvent<HTMLInputElement>
  | React.KeyboardEvent<HTMLInputElement>
  | React.MouseEvent<HTMLInputElement>
>

export interface RadioProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'ref' | 'onChange' | 'label' | 'size' | 'children'
    >,
    SpacingProps,
    FormStatusBaseProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: RadioLabel
  /**
   * Use `true` to make the label only readable by screen readers.
   */
  labelSrOnly?: boolean
  /**
   * Defines the position of the `label`. Use either `left` or `right`. Defaults to `right`.
   */
  labelPosition?: RadioLabelPosition
  /**
   * Determine whether the radio is checked or not. Default will be `false`.
   */
  checked?: boolean
  disabled?: boolean
  id?: string
  element?: React.ElementType
  /**
   * Use a unique group identifier to define the Radio buttons that belongs together.
   */
  group?: string
  /**
   * The size of the Radio button. For now there is **medium** (default) and **large**.
   */
  size?: RadioSize
  suffix?: RadioSuffix
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **RadioGroup**.
   */
  value?: string
  skeleton?: SkeletonShow
  readOnly?: boolean
  className?: string
  children?: RadioChildren
  onChange?: (event: RadioChangeEvent) => void
  /**
   * By providing a React.ref we can get the internally used input element (DOM). E.g. `ref={myRef}` by using `React.useRef()`.
   */
  ref?: React.Ref<HTMLInputElement>
}

interface RadioComponentState {
  checked?: boolean
  _checked?: boolean
  __checked?: boolean
  _listenForPropChanges: boolean
}

/**
 * The radio component is our enhancement of the classic radio button.
 */
class RadioClass extends React.PureComponent<
  RadioProps,
  RadioComponentState
> {
  static contextType = RadioGroupContext
  context!: React.ContextType<typeof RadioGroupContext>

  _refInput: React.RefObject<HTMLInputElement | null>
  _id: string

  static defaultProps = {
    label: null,
    labelSrOnly: null,
    labelPosition: null,
    checked: null,
    disabled: null,
    id: null,
    size: null,
    element: 'input',
    group: null,
    status: null,
    statusState: 'error',
    statusProps: null,
    statusNoAnimation: null,
    globalStatus: null,
    suffix: null,
    value: '',
    readOnly: false,
    skeleton: null,

    className: null,
    children: null,

    onChange: null,

    ref: null,
  }

  static Group = RadioGroup

  static parseChecked = (state: string | boolean | null | undefined) =>
    /true|on/.test(String(state))

  static getDerivedStateFromProps(
    props: RadioProps,
    state: RadioComponentState
  ) {
    if (state._listenForPropChanges) {
      if (props.checked !== state._checked) {
        state.checked = RadioClass.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    state._checked = props.checked
    state.__checked = state.checked

    return state
  }

  constructor(props: RadioProps) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true,
    }
  }

  onKeyDownHandler = (event: React.KeyboardEvent) => {
    const key = event.key
    // only have key support if there is only a single radio
    if (this.isInNoGroup()) {
      if (key === 'Enter') {
        this.onChangeHandler(event)
      }
    } else if (this.isContextGroupOrSingle()) {
      if (key === 'Enter' || key === ' ') {
        const { value } = this.context
        if (value !== null && typeof value !== 'undefined') {
          event.preventDefault()
        }
        this.onChangeHandler(event)
      }
    } else {
      // else we only use the native support, and don't want space support
      // because only arrow keys has to be used
      if (key === ' ') {
        event.preventDefault()
      }
    }
    dispatchCustomElementEvent(this, 'onKeyDown', { event })
  }

  onChangeHandler = (
    _event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent
  ) => {
    const event = _event
    if (this.props.readOnly) {
      return event.preventDefault()
    }
    const value = (event.target as HTMLInputElement).value
    const checked = !this.state.checked

    // delay in case we have a props group only
    if (this.isPlainGroup()) {
      // in case we have a false "hasContext" but a "group"
      // then we have to use a delay, to overwrite the uncontrolled state
      setTimeout(() => {
        this.setState({ checked, _listenForPropChanges: false }, () => {
          this.callOnChange({ value, checked, event })
        })
      }, 1)
    } else {
      this.setState({ checked, _listenForPropChanges: false })
      this.callOnChange({ value, checked, event })
    }
  }

  // only support on change if there is either:
  // 1. context group usage
  // 2. or a single, no group usage
  isContextGroupOrSingle = () =>
    typeof this.context.value !== 'undefined' && !this.props.group
  isPlainGroup = () =>
    typeof this.context.value === 'undefined' && this.props.group
  isInNoGroup = () =>
    typeof this.context.value === 'undefined' && !this.props.group

  onClickHandler = (event: React.MouseEvent<HTMLInputElement>) => {
    if (this.props.readOnly) {
      return event.preventDefault()
    }
    // only have click support if there are more plain radio
    if (!this.isPlainGroup()) {
      return
    }
    const value = (event.target as HTMLInputElement).value
    const checked = (event.target as HTMLInputElement).checked
    this.callOnChange({ value, checked, event })
  }

  callOnChange = ({
    value,
    checked,
    event,
  }: {
    value: string
    checked: boolean
    event: React.SyntheticEvent
  }) => {
    const { group } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value,
        event,
      })
    }
    dispatchCustomElementEvent(this, 'onChange', {
      group,
      checked,
      value,
      event,
    })

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          // from internal context
          const contextProps = extendPropsWithContextInClassComponent(
            this.props,
            RadioClass.defaultProps,
            this.context as Record<string, unknown>
          )

          // use only the props from context, who are available here anyway
          const props = extendPropsWithContextInClassComponent(
            this.props,
            RadioClass.defaultProps,
            contextProps,
            { skeleton: context?.skeleton },
            pickFormElementProps(context.formElement),
            (context as Record<string, unknown>)?.Radio as
              | Record<string, unknown>
              | undefined
          )

          const {
            status,
            statusState,
            statusProps,
            statusNoAnimation,
            globalStatus,
            suffix,
            element,
            label,
            labelSrOnly,
            labelPosition,
            size,
            readOnly,
            skeleton,
            className,
            id: _id,
            group: _group,
            value: _value,
            checked: _checked,
            disabled: _disabled,
            children,
            onChange,
            ref: _ref,

            ...rest
          } = props

          let { checked } = this.state
          const { value } = props
          let { group, disabled } = props // get it from context also

          const hasContext = typeof this.context.name !== 'undefined'

          if (hasContext) {
            if (typeof this.context.value !== 'undefined') {
              checked = this.context.value === value
            }
            group = this.context.name
            if (this.context.disabled && disabled !== false) {
              disabled = true
            }
          } else if (typeof rest.name !== 'undefined') {
            group = rest.name
          }

          const id = this._id
          const showStatus = getStatusState(status)

          const mainParams = {
            className: clsx(
              'dnb-radio',
              status && `dnb-radio__status--${statusState}`,
              size && `dnb-radio--${size}`,
              label &&
                `dnb-radio--label-position-${labelPosition || 'right'}`,
              createSpacingClasses(props),
              className
            ),
          }

          let inputParams: Record<string, any> = {
            role: hasContext || group ? 'radio' : null,
            type: hasContext || group ? 'radio' : 'checkbox', // overwriting the type
          }

          if (!group) {
            inputParams.type = 'checkbox'
            inputParams.role = 'radio' // breaks axe test
          }

          if (showStatus || suffix) {
            inputParams['aria-describedby'] = combineDescribedBy(
              inputParams,
              showStatus ? id + '-status' : null,
              suffix ? id + '-suffix' : null
            )
          }
          if (readOnly) {
            inputParams['aria-readonly'] = inputParams.readOnly = true
          }

          inputParams = Object.assign(inputParams, rest)

          skeletonDOMAttributes(inputParams, skeleton, context)

          // also used for code markup simulation
          validateDOMAttributes(this.props, inputParams)

          const labelComp = label && (
            <FormLabel
              id={id + '-label'}
              forId={id}
              text={label as React.ReactNode}
              disabled={disabled}
              skeleton={skeleton}
              srOnly={labelSrOnly}
            />
          )

          const Element = element || 'input'

          return (
            <span {...mainParams}>
              <span className="dnb-radio__order">
                {labelPosition === 'left' && labelComp}

                <span className="dnb-radio__inner">
                  <AlignmentHelper />

                  <FormStatus
                    show={showStatus}
                    id={id + '-form-status'}
                    globalStatus={globalStatus}
                    label={label as React.ReactNode}
                    textId={id + '-status'} // used for "aria-describedby"
                    widthSelector={id + ', ' + id + '-label'}
                    text={status}
                    state={statusState}
                    noAnimation={statusNoAnimation}
                    skeleton={skeleton}
                    {...statusProps}
                  />

                  <span className="dnb-radio__row">
                    <span className="dnb-radio__shell">
                      <Element
                        type="radio"
                        value={value}
                        id={id}
                        name={group}
                        className="dnb-radio__input"
                        checked={checked}
                        aria-checked={
                          this.isPlainGroup() ? undefined : checked
                        }
                        disabled={disabled}
                        ref={this._refInput}
                        {...inputParams}
                        onChange={this.onChangeHandler}
                        onClick={this.onClickHandler}
                        onKeyDown={this.onKeyDownHandler}
                      />

                      <span
                        className={clsx(
                          'dnb-radio__button',
                          createSkeletonClass('shape', skeleton, context)
                        )}
                        aria-hidden
                      />
                      <span className="dnb-radio__focus" aria-hidden />
                      <span
                        className={clsx(
                          'dnb-radio__dot',
                          createSkeletonClass('font', skeleton, context)
                        )}
                        aria-hidden
                      />
                    </span>

                    {labelPosition !== 'left' && labelComp}

                    {suffix && (
                      <Suffix
                        className="dnb-radio__suffix"
                        id={id + '-suffix'} // used for "aria-describedby"
                        context={props}
                      >
                        {suffix as React.ReactNode}
                      </Suffix>
                    )}
                  </span>
                </span>
              </span>
            </span>
          )
        }}
      </Context.Consumer>
    )
  }
}

/**
 * Function wrapper that forwards `ref` to the inner DOM element of the class component.
 */
function RadioComponent({ ref, ...props }: RadioProps) {
  const instanceRef = React.useCallback(
    (instance: RadioClass | null) => {
      const el = instance?._refInput?.current ?? null
      if (typeof ref === 'function') {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    },
    [ref]
  )

  return (
    <RadioClass ref={(ref ? instanceRef : undefined) as any} {...props} />
  )
}

const Radio = RadioComponent as typeof RadioComponent & {
  Group: typeof RadioGroup
  parseChecked: typeof RadioClass.parseChecked
} & ComponentMarkers

Radio.Group = RadioGroup
Radio.parseChecked = RadioClass.parseChecked

export default withComponentMarkers(Radio, {
  _formElement: true,
  _supportsSpacingProps: true,
})
