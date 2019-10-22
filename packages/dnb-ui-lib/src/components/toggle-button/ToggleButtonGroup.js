/**
 * Web ToggleButtonGroup Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import FormRow from '../form-row/FormRow'
import FormStatus from '../form-status/FormStatus'
import Context from '../../shared/Context'
import ToggleButtonGroupContext from './ToggleButtonGroupContext'

const renderProps = {
  on_change: null
}

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  title: PropTypes.string,
  multiselect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
  left_component: PropTypes.node,
  no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  global_status_id: PropTypes.string,
  vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  layout_direction: PropTypes.oneOf(['column', 'row']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
    PropTypes.array
  ]),
  values: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func
}

const defaultProps = {
  label: null,
  label_direction: null,
  title: null,
  multiselect: null,
  variant: null,
  left_component: null,
  no_fieldset: null,
  disabled: null,
  id: null,
  name: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  vertical: null,
  layout_direction: 'row',
  value: undefined,
  values: undefined,
  attributes: null,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

export default class ToggleButtonGroup extends PureComponent {
  static tagName = 'dnb-toggle-button-group'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(
      ToggleButtonGroup.tagName,
      ToggleButtonGroup,
      defaultProps
    )
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (typeof props.value !== 'undefined') {
        state.value = props.value
      }
      if (typeof props.values !== 'undefined') {
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
      _listenForPropChanges: true
    }
  }

  onChangeHandler = ({ value, event }) => {
    const { multiselect } = this.props
    const { values } = this.state
    if (isTrue(multiselect)) {
      if (!values.includes(value)) {
        values.push(value)
      } else {
        values.splice(values.indexOf(value), 1)
      }
    } else {
      this.setState({
        value,
        values,
        _listenForPropChanges: false
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      value,
      values,
      event
    })
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      status,
      status_state,
      status_animation,
      global_status_id,
      label_direction,
      vertical,
      layout_direction,
      label,
      variant,
      left_component,
      no_fieldset,
      disabled,
      className,
      class: _className,

      multiselect,
      id: _id, // eslint-disable-line
      name: _name, // eslint-disable-line
      value: _value, // eslint-disable-line
      values: _values, // eslint-disable-line
      attributes, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

      ...rest
    } = props

    const { value, values } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const classes = classnames(
      'dnb-toggle-button-group',
      status && `dnb-toggle-button-group__status--${status_state}`,
      `dnb-toggle-button-group--${layout_direction}`,
      createSpacingClasses(props),
      className,
      _className
    )

    const params = {
      ...rest
    }

    if (showStatus) {
      params['aria-describedby'] = id + '-status'
    }
    if (label) {
      params['aria-labelledby'] = id + '-label'
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
      setContext: context => {
        // also look for a fuctions, we we are able to fill old values
        // this is ued in the "constructor" inside the ToggleButton.js component
        if (typeof context === 'function') {
          context = context(this._tmp)
        }
        this._tmp = { ...this._tmp, ...context }
        this.setState({
          ...context,
          _listenForPropChanges: false
        })
      },
      onChange: this.onChangeHandler
    }

    const formRowParams = {
      id,
      label,
      label_id: id + '-label', // send the id along, so the FormRow component can use it
      label_direction,
      direction: label_direction,
      vertical,
      disabled,
      no_fieldset,
      skipContentWrapperIfNested: true
      // status,
      // status_state
    }

    return (
      <ToggleButtonGroupContext.Provider value={context}>
        <div className={classes}>
          <FormRow {...formRowParams}>
            <span
              id={id}
              className="dnb-toggle-button-group__shell"
              role="group"
              {...params}
            >
              {children}
              {showStatus && (
                <FormStatus
                  id={id + '-form-status'}
                  global_status_id={global_status_id}
                  text_id={id + '-status'} // used for "aria-describedby"
                  text={status}
                  status={status_state}
                  animation={status_animation}
                />
              )}
            </span>
          </FormRow>
        </div>
      </ToggleButtonGroupContext.Provider>
    )
  }
}
