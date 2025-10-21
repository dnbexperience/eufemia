// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * Web ToggleButtonGroup Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import classnames from 'classnames'
import {
  isTrue,
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
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

class ToggleButtonGroup extends React.PureComponent<ToggleButtonGroupProps> {
  static contextType = Context

  static defaultProps = {
    label: null,
    label_direction: null,
    label_sr_only: null,
    title: null,
    multiselect: null,
    variant: null,
    left_component: null,
    disabled: null,
    skeleton: null,
    id: null,
    name: null,
    size: null,
    status: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    globalStatus: null,
    suffix: null,
    vertical: null,
    layout_direction: 'row',
    value: undefined,
    values: undefined,
    attributes: null,

    className: null,
    children: null,

    on_change: null,
  }

  static getDerivedStateFromProps(props, state) {
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

  static getValues(props) {
    if (typeof props.values === 'string' && props.values[0] === '[') {
      return JSON.parse(props.values)
    }
    return props.values
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._name = props.name || makeUniqueId() // cause we need an id anyway
    this.state = {
      // do not set the value here, else get true in this check } else if (context.values && Array.isArray(context.values)) {
      _listenForPropChanges: true,
    }
  }

  onChangeHandler = ({ value, event }) => {
    const { multiselect } = this.props
    const values = this.state.values || []

    if (isTrue(multiselect)) {
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

    dispatchCustomElementEvent(this, 'on_change', {
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
      this.context.getTranslation(this.props).ToggleButton,
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
      pickFormElementProps(this.context?.formElement),
      this.context.ToggleButtonGroup
    )

    const {
      status,
      status_state,
      status_props,
      status_no_animation,
      globalStatus,
      suffix,
      label_direction,
      label_sr_only,
      vertical,
      layout_direction,
      label,
      variant,
      left_component,
      size,
      disabled,
      skeleton,
      className,

      multiselect,
      id: _id, // eslint-disable-line
      name: _name, // eslint-disable-line
      value: _value, // eslint-disable-line
      values: _values, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line

      ...rest
    } = props

    const { value, values } = this.state

    const id = this._id
    const showStatus = getStatusState(status)

    const classes = classnames(
      'dnb-toggle-button-group',
      status && `dnb-toggle-button-group__status--${status_state}`,
      !label && 'dnb-toggle-button-group--no-label',
      `dnb-toggle-button-group--${layout_direction}`,
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
      multiselect: isTrue(multiselect),
      variant,
      left_component,
      disabled,
      skeleton,
      setContext: (context) => {
        // also look for a function, where we are able to fill old values
        // this is used in the "constructor" inside the ToggleButton.js component
        if (typeof context === 'function') {
          context = context(this._tmp)
        }
        this._tmp = { ...this._tmp, ...context }
        this.setState({
          ...context,
          _listenForPropChanges: false,
        })
      },
      onChange: this.onChangeHandler,
    }

    const Fieldset = label ? 'fieldset' : 'div'

    return (
      <ToggleButtonGroupContext.Provider value={context}>
        <div className={classes}>
          <AlignmentHelper />
          <Fieldset
            className="dnb-toggle-button-group__fieldset"
            aria-labelledby={label ? id + '-label' : undefined}
            role={variant === 'radio' ? 'radiogroup' : 'group'}
          >
            <Flex.Container
              direction={
                vertical || label_direction === 'vertical'
                  ? 'vertical'
                  : 'horizontal'
              }
              gap={vertical ? 'x-small' : 'small'}
            >
              {label && (
                <FormLabel
                  element="legend"
                  id={id + '-label'}
                  srOnly={label_sr_only}
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
                  state={status_state}
                  noAnimation={status_no_animation}
                  skeleton={skeleton}
                  {...status_props}
                />

                <span
                  className={classnames(
                    'dnb-toggle-button-group__shell__children',
                    `dnb-toggle-button-group__shell__children--${layout_direction}`
                  )}
                >
                  {children}

                  {suffix && (
                    <Suffix
                      className="dnb-toggle-button-group__suffix"
                      id={id + '-suffix'} // used for "aria-describedby"
                      context={props}
                    >
                      {suffix}
                    </Suffix>
                  )}
                </span>
              </Space>
            </Flex.Container>
          </Fieldset>
        </div>
      </ToggleButtonGroupContext.Provider>
    )
  }
}

ToggleButtonGroup._supportsSpacingProps = true

export default ToggleButtonGroup as React.ComponentClass<ToggleButtonGroupProps>

// Type definitions
import type {
  FormStatusProps,
  FormStatusState,
  FormStatusText,
} from '../FormStatus'
import type { ButtonSize } from '../Button'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps, SpaceType } from '../space/types'
import type { GlobalStatusConfigObject } from '../GlobalStatus'

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
export type ToggleButtonGroupAttributes = string | Record<string, unknown>
export type ToggleButtonGroupChildren =
  | string
  | ((...args: any[]) => any)
  | React.ReactNode

export interface ToggleButtonGroupProps
  extends Omit<React.HTMLProps<HTMLElement>, 'label' | 'value'>,
    Omit<SpacingProps, 'top' | 'right' | 'bottom' | 'left'> {
  /**
   * Use either the `label` property or provide a custom one.
   */
  label?: string | React.ReactNode
  label_direction?: 'horizontal' | 'vertical'
  label_sr_only?: boolean
  /**
   * The `title` of the input - describing it a bit further for accessibility reasons.
   */
  title?: string
  /**
   * Determine whether the ToggleButtonGroup is checked or not. The default will be `false`.
   */
  checked?: boolean
  variant?: ToggleButtonGroupVariant
  left_component?: React.ReactNode
  disabled?: boolean
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  id?: string
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState
  /**
   * Use an object to define additional FormStatus properties.
   */
  status_props?: FormStatusProps
  status_no_animation?: boolean
  /**
   * The [configuration](/uilib/components/global-status/properties/#configuration-object) used for the target [GlobalStatus](/uilib/components/global-status).
   */
  globalStatus?: GlobalStatusConfigObject
  /**
   * Text describing the content of the ToggleButtonGroup more than the label. You can also send in a React component, so it gets wrapped inside the ToggleButtonGroup component.
   */
  suffix?: ToggleButtonGroupSuffix
  /**
   * Defines the `value` as a string. Use it to get the value during the `on_change` event listener callback in the **ToggleButtonGroup**.
   */
  value?: ToggleButtonGroupValue
  /**
   * The size of the button. For now there is `small`, `medium`, `default` and `large`.
   */
  size?: ButtonSize
  /**
   * Defines the layout direction of the ToggleButtonGroup. Set to `column` or `row`. Defaults to `row` if not set.
   */
  layout_direction?: ToggleButtonGroupLayoutDirection
  /**
   * Defines the `values` as a string. Use it to get the values during the `on_change` event listener callback in the **ToggleButtonGroup**.
   */
  values?: ToggleButtonGroupValues
  attributes?: ToggleButtonGroupAttributes
  readOnly?: boolean
  className?: string
  children?: ToggleButtonGroupChildren
  on_change?: (...args: any[]) => any
  on_state_update?: (...args: any[]) => any
  // Additional properties that are used in tests and stories
  onChange?: (...args: any[]) => any
  top?: SpaceType
  right?: SpaceType
  bottom?: SpaceType
  left?: SpaceType
  multiselect?: boolean
  name?: string
  vertical?: boolean
}
