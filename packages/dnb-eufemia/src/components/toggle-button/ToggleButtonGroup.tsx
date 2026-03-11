/**
 * Web ToggleButtonGroup Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import React from 'react'
import clsx from 'clsx'
import {
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import FormLabel from '../FormLabel'
import FormStatus from '../FormStatus'
import Flex from '../Flex'
import Space from '../Space'
import Context, { type ContextProps } from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

interface ToggleButtonGroupState {
  value?: ToggleButtonGroupValue
  values?: any[]
  _listenForPropChanges: boolean
}

class ToggleButtonGroup extends React.PureComponent<
  ToggleButtonGroupProps,
  ToggleButtonGroupState
> {
  static contextType = Context
  context!: ContextProps

  static defaultProps = {
    label: null,
    labelDirection: null,
    labelSrOnly: null,
    title: null,
    multiselect: null,
    variant: null,
    leftComponent: null,
    disabled: null,
    skeleton: null,
    id: null,
    name: null,
    size: null,
    status: null,
    statusState: 'error',
    statusProps: null,
    statusNoAnimation: null,
    globalStatus: null,
    suffix: null,
    vertical: null,
    layoutDirection: 'row',
    value: undefined,
    values: undefined,

    className: null,
    children: null,

    onChange: null,
  }

  static getDerivedStateFromProps(
    props: ToggleButtonGroupProps,
    state: ToggleButtonGroupState
  ) {
    if (state._listenForPropChanges) {
      if (
        typeof props.value !== 'undefined' &&
        props.value !== state.value
      ) {
        state.value = props.value
      }
      if (
        typeof props.values !== 'undefined' &&
        props.values !== state.values
      ) {
        state.values = ToggleButtonGroup.getValues(props)
      }
    }
    state._listenForPropChanges = true

    return state
  }

  static getValues(props: ToggleButtonGroupProps) {
    if (typeof props.values === 'string' && props.values[0] === '[') {
      return JSON.parse(props.values)
    }
    return props.values
  }

  _refInput = React.createRef<HTMLInputElement>()
  _id: string
  _name: string
  _tmp: Record<string, unknown> | undefined = undefined

  constructor(props: ToggleButtonGroupProps) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._name = props.name || makeUniqueId() // cause we need an id anyway
    this.state = {
      // do not set the value here, else get true in this check } else if (context.values && Array.isArray(context.values)) {
      _listenForPropChanges: true,
    }
  }

  onChangeHandler = ({
    value,
    event,
  }: {
    value: ToggleButtonGroupValue
    event: React.SyntheticEvent
  }) => {
    const { multiselect } = this.props
    const values = this.state.values || []

    if (multiselect) {
      if (!values.includes(value)) {
        values.push(value)
      } else {
        values.splice(values.indexOf(value), 1)
      }
    }

    this.setState({
      value,
      values,
      _listenForPropChanges: false,
    })

    dispatchCustomElementEvent(this, 'onChange', {
      value,
      values,
      event,
    })
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      ToggleButtonGroup.defaultProps,
      (
        this.context.getTranslation(this.props) as Record<
          string,
          Record<string, string>
        >
      ).ToggleButton,
      pickFormElementProps(this.context?.formElement),
      (this.context as Record<string, unknown>)
        .ToggleButtonGroup as Record<string, unknown>
    )

    const {
      status,
      statusState,
      statusProps,
      statusNoAnimation,
      globalStatus,
      suffix,
      labelDirection,
      labelSrOnly,
      vertical,
      layoutDirection,
      label,
      variant,
      leftComponent,
      size,
      disabled,
      skeleton,
      className,

      multiselect,
      id: _id,
      name: _name,
      value: _value,
      values: _values,
      children,
      onChange,

      ...rest
    } = props

    const { value, values } = this.state

    const id = this._id
    const showStatus = getStatusState(status)

    const classes = clsx(
      'dnb-toggle-button-group',
      status && `dnb-toggle-button-group__status--${statusState}`,
      !label && 'dnb-toggle-button-group--no-label',
      `dnb-toggle-button-group--${layoutDirection}`,
      'dnb-form-component',
      createSpacingClasses(props),
      className
    )

    const params = {
      ...rest,
    }

    if (showStatus || suffix) {
      params['aria-describedby'] = combineDescribedBy(
        params,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }
    if (label) {
      params['aria-labelledby'] = combineLabelledBy(params, id + '-label')
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const context = {
      name: this._name,
      value,
      values,
      size,
      multiselect: multiselect,
      variant,
      leftComponent,
      disabled,
      skeleton,
      setContext: (
        contextArg:
          | Record<string, unknown>
          | ((
              tmp: Record<string, unknown> | undefined
            ) => Record<string, unknown>)
      ) => {
        let resolved: Record<string, unknown>
        // also look for a function, where we are able to fill old values
        // this is used in the "constructor" inside the ToggleButton.js component
        if (typeof contextArg === 'function') {
          resolved = contextArg(this._tmp)
        } else {
          resolved = contextArg
        }
        this._tmp = { ...this._tmp, ...resolved }
        this.setState({
          ...resolved,
          _listenForPropChanges: false,
        } as ToggleButtonGroupState)
      },
      onChange: this.onChangeHandler,
    }

    const Fieldset = label ? 'fieldset' : 'div'

    return (
      <ToggleButtonGroupContext value={context}>
        <div className={classes}>
          <AlignmentHelper />
          <Fieldset
            className="dnb-toggle-button-group__fieldset"
            aria-labelledby={label ? id + '-label' : undefined}
            role={variant === 'radio' ? 'radiogroup' : 'group'}
          >
            <Flex.Container
              direction={
                vertical || labelDirection === 'vertical'
                  ? 'vertical'
                  : 'horizontal'
              }
              gap={vertical ? 'x-small' : 'small'}
            >
              {label && (
                <FormLabel
                  element="legend"
                  id={id + '-label'}
                  srOnly={labelSrOnly}
                >
                  {label}
                </FormLabel>
              )}

              <Space
                element="span"
                id={id}
                className="dnb-toggle-button-group__shell"
                {...params}
              >
                <FormStatus
                  show={showStatus}
                  id={id + '-form-status'}
                  globalStatus={globalStatus}
                  label={label}
                  textId={id + '-status'} // used for "aria-describedby"
                  text={status}
                  state={statusState}
                  noAnimation={statusNoAnimation}
                  skeleton={skeleton}
                  {...statusProps}
                />

                <span
                  className={clsx(
                    'dnb-toggle-button-group__shell__children',
                    `dnb-toggle-button-group__shell__children--${layoutDirection}`
                  )}
                >
                  {children as React.ReactNode}

                  {suffix && (
                    <Suffix
                      className="dnb-toggle-button-group__suffix"
                      id={id + '-suffix'} // used for "aria-describedby"
                      context={props}
                    >
                      {suffix as React.ReactNode}
                    </Suffix>
                  )}
                </span>
              </Space>
            </Flex.Container>
          </Fieldset>
        </div>
      </ToggleButtonGroupContext>
    )
  }
}

export default withComponentMarkers(ToggleButtonGroup, {
  _supportsSpacingProps: true,
})

// Type definitions
import type { FormStatusBaseProps } from '../FormStatus'
import type { ButtonSize } from '../Button'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceType } from '../space/types'

export type ToggleButtonGroupVariant = 'default' | 'checkbox' | 'radio'
export type ToggleButtonGroupSuffix =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode
export type ToggleButtonGroupLayoutDirection = 'column' | 'row'
export type ToggleButtonGroupValue =
  | string
  | number
  | Record<string, unknown>
  | any[]
export type ToggleButtonGroupValues = string | any[]
export type ToggleButtonGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode

export interface ToggleButtonGroupProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'label' | 'value' | 'children' | 'onChange' | 'size'
    >,
    Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'>,
    FormStatusBaseProps {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: string | React.ReactNode
  labelDirection?: 'horizontal' | 'vertical'
  labelSrOnly?: boolean
  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the ToggleButtonGroup is checked or not. The default will be `false`.
   */
  checked?: boolean
  variant?: ToggleButtonGroupVariant
  leftComponent?: React.ReactNode
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  id?: string
  /**
   * Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.
   */
  suffix?: ToggleButtonGroupSuffix
  /**
   * Defines the `value` as a string. Use it to get the value during the `onChange` event listener callback in the **ToggleButtonGroup**.
   */
  value?: ToggleButtonGroupValue
  /**
   * The size of the button. For now there is `small`, `medium`, `default` and `large`.
   */
  size?: ButtonSize
  /**
   * Defines the layout direction of the ToggleButtonGroup. Set to `column` or `row`. Defaults to `row` if not set.
   */
  layoutDirection?: ToggleButtonGroupLayoutDirection
  /**
   * Defines the `values` as a string. Use it to get the values during the `onChange` event listener callback in the **ToggleButtonGroup**.
   */
  values?: ToggleButtonGroupValues
  readOnly?: boolean
  className?: string
  children?: ToggleButtonGroupChildren
  onChange?: (...args: any[]) => any
  // Additional properties that are used in tests and stories
  top?: SpaceType
  right?: SpaceType
  bottom?: SpaceType
  left?: SpaceType
  multiselect?: boolean
  name?: string
  vertical?: boolean
}
