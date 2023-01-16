/**
 * Web ToggleButtonGroup Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  registerElement,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import FormRow from '../form-row/FormRow'
import FormStatus from '../form-status/FormStatus'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'
import { includeValidProps } from '../form-row/FormRowHelpers'

export default class ToggleButtonGroup extends React.PureComponent {
  static tagName = 'dnb-toggle-button-group'
  static contextType = Context

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    title: PropTypes.string,
    multiselect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
    left_component: PropTypes.node,
    no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    status_state: PropTypes.string,
    status_props: PropTypes.object,
    status_no_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    global_status_id: PropTypes.string,
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    layout_direction: PropTypes.oneOf(['column', 'row']),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
      PropTypes.array,
    ]),
    values: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,
    on_change: PropTypes.func,
  }

  static defaultProps = {
    label: null,
    label_direction: null,
    label_sr_only: null,
    title: null,
    multiselect: null,
    variant: null,
    left_component: null,
    no_fieldset: null,
    disabled: null,
    skeleton: null,
    id: null,
    name: null,
    status: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    global_status_id: null,
    suffix: null,
    vertical: null,
    layout_direction: 'row',
    value: undefined,
    values: undefined,
    attributes: null,
    class: null,

    className: null,
    children: null,

    custom_element: null,
    custom_method: null,
    on_change: null,
  }

  static enableWebComponent() {
    registerElement(
      ToggleButtonGroup?.tagName,
      ToggleButtonGroup,
      ToggleButtonGroup.defaultProps
    )
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
      includeValidProps(this.context.FormRow),
      this.context.ToggleButtonGroup
    )

    const {
      status,
      status_state,
      status_props,
      status_no_animation,
      global_status_id,
      suffix,
      label_direction,
      label_sr_only,
      vertical,
      layout_direction,
      label,
      variant,
      left_component,
      no_fieldset,
      disabled,
      skeleton,
      className,
      class: _className,

      multiselect,
      id: _id, // eslint-disable-line
      name: _name, // eslint-disable-line
      value: _value, // eslint-disable-line
      values: _values, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

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
      // (isTrue(vertical) || label_direction === 'vertical') &&
      //   `dnb-toggle-button-group--vertical`,
      (isTrue(vertical) || label_direction) &&
        `dnb-form-row--${
          isTrue(vertical) ? 'vertical' : label_direction
        }-label`, // <-- has label
      'dnb-form-component',
      createSpacingClasses(props),
      className,
      _className
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
      multiselect: isTrue(multiselect),
      variant,
      left_component,
      disabled,
      skeleton,
      setContext: (context) => {
        // also look for a fuctions, we we are able to fill old values
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

    const formRowParams = {
      id,
      label,
      label_id: id + '-label', // send the id along, so the FormRow component can use it
      label_direction,
      label_sr_only,
      direction: label_direction,
      vertical,
      disabled,
      skeleton,
      no_fieldset,
      skipContentWrapperIfNested: true,
      // status,
      // status_state
    }

    return (
      <ToggleButtonGroupContext.Provider value={context}>
        <div className={classes}>
          <AlignmentHelper />
          <FormRow {...formRowParams}>
            <span
              id={id}
              className="dnb-toggle-button-group__shell"
              role="group"
              {...params}
            >
              <FormStatus
                show={showStatus}
                id={id + '-form-status'}
                global_status_id={global_status_id}
                label={label}
                text_id={id + '-status'} // used for "aria-describedby"
                text={status}
                state={status_state}
                no_animation={status_no_animation}
                skeleton={skeleton}
                {...status_props}
              />

              <span className="dnb-toggle-button-group__children">
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
            </span>
          </FormRow>
        </div>
      </ToggleButtonGroupContext.Provider>
    )
  }
}
