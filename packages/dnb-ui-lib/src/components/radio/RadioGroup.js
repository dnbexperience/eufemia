/**
 * Web RadioGroup Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroupContext from './RadioGroupContext'

const renderProps = {
  on_change: null
}

export const propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  name: PropTypes.string,
  status: PropTypes.string,
  status_state: PropTypes.string,
  status_animation: PropTypes.string,
  layout_direction: PropTypes.string,
  value: PropTypes.string,
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

export const defaultProps = {
  label: null,
  title: null,
  disabled: false,
  id: null,
  name: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  layout_direction: 'row',
  value: null,
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

/**
 * The radio component is our enhancement of the classic radio button. It acts like a radio. Example: On/off, yes/no.
 */
export default class RadioGroup extends PureComponent {
  static tagName = 'dnb-radio-group'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps

  static enableWebComponent() {
    registerElement(RadioGroup.tagName, RadioGroup, defaultProps)
  }

  static parseChecked = state => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (typeof props.value !== 'undefined') {
        state.value = props.value
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id =
      props.id || `dnb-radio-group-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this._name =
      props.name || `dnb-radio-group-${Math.round(Math.random() * 999)}` // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
  }

  onChangeHandler = ({ value, event }) => {
    this.setState({ value, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', {
      value,
      event
    })
  }

  render() {
    const {
      status,
      status_state,
      status_animation,
      layout_direction,
      label,
      disabled,
      className,
      class: _className,

      id: _id, // eslint-disable-line
      name: _name, // eslint-disable-line
      value: _value, // eslint-disable-line
      attributes, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

      ...rest
    } = this.props

    const { value } = this.state

    const id = this._id
    const showStatus = status && status !== 'error'

    const classes = classnames(
      'dnb-radio-group',
      showStatus && 'dnb-radio-group__form-status',
      status && `dnb-radio-group__status--${status_state}`,
      layout_direction &&
        `dnb-radio-group--layout-direction-${layout_direction}`,
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
      disabled,
      onChange: this.onChangeHandler
    }

    return (
      <RadioGroupContext.Provider value={context}>
        <span className={classes}>
          {label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              aria-hidden
              text={label}
              disabled={disabled}
            />
          )}
          <span id={id} role="radiogroup" {...params}>
            <span className="dnb-radio_group__shell">{children}</span>
            {showStatus && (
              <FormStatus
                text={status}
                status={status_state}
                text_id={id + '-status'} // used for "aria-describedby"
                animation={status_animation}
              />
            )}
          </span>
        </span>
      </RadioGroupContext.Provider>
    )
  }
}
