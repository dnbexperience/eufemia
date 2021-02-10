/**
 * Web RadioGroup Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContext,
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses
} from '../space/SpacingHelper'

import FormRow from '../form-row/FormRow'
import FormStatus from '../form-status/FormStatus'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import RadioGroupContext from './RadioGroupContext'

/**
 * The radio component is our enhancement of the classic radio button. It acts like a radio. Example: On/off, yes/no.
 */
export default class RadioGroup extends React.PureComponent {
  static tagName = 'dnb-radio-group'
  static contextType = Context

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label_position: PropTypes.oneOf(['left', 'right']),
    title: PropTypes.string,
    no_fieldset: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.oneOf(['default', 'medium', 'large']),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node
    ]),
    status_state: PropTypes.string,
    status_animation: PropTypes.string,
    global_status_id: PropTypes.string,
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    layout_direction: PropTypes.oneOf(['column', 'row']),
    vertical: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    value: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,
    on_change: PropTypes.func
  }

  static defaultProps = {
    label: null,
    label_direction: null,
    label_sr_only: null,
    label_position: null,
    title: null,
    no_fieldset: null,
    disabled: null,
    skeleton: null,
    id: null,
    name: null,
    size: null,
    status: null,
    status_state: 'error',
    status_animation: null,
    global_status_id: null,
    suffix: null,
    vertical: null,
    layout_direction: 'row',
    value: undefined,
    attributes: null,
    class: null,

    className: null,
    children: null,

    custom_element: null,
    custom_method: null,

    on_change: null
  }

  static enableWebComponent() {
    registerElement(
      RadioGroup.tagName,
      RadioGroup,
      RadioGroup.defaultProps
    )
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.value !== state._value) {
        state.value = props.value
      }
      if (typeof props.value !== 'undefined') {
        state._value = props.value
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._name = props.name || this._id
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
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      RadioGroup.defaultProps,
      this.context.FormRow,
      this.context.RadioGroup
    )

    const {
      status,
      status_state,
      status_animation,
      global_status_id,
      suffix,
      label,
      label_direction,
      label_sr_only,
      label_position,
      vertical,
      layout_direction,
      no_fieldset,
      size,
      disabled,
      skeleton,
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
    } = props

    const { value } = this.state

    const id = this._id
    const showStatus = getStatusState(status)

    const classes = classnames(
      'dnb-radio-group',
      status && `dnb-radio-group__status--${status_state}`,
      `dnb-radio-group--${layout_direction}`,
      'dnb-form-component',
      createSpacingClasses(props),
      className,
      _className
    )

    const params = {
      ...rest
    }

    if (showStatus || suffix) {
      params['aria-describedby'] = combineDescribedBy(
        params,
        showStatus ? id + '-status' : null,
        suffix ? id + '-suffix' : null
      )
    }
    if (label) {
      params['aria-labelledby'] = id + '-label'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const context = {
      name: this._name,
      value,
      size,
      disabled,
      label_position,
      onChange: this.onChangeHandler
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
      skipContentWrapperIfNested: true
    }

    return (
      <RadioGroupContext.Provider value={context}>
        <div className={classes}>
          <FormRow {...formRowParams}>
            <span
              id={id}
              className="dnb-radio-group__shell"
              role="radiogroup"
              {...params}
            >
              {children}

              {suffix && (
                <Suffix
                  className="dnb-radio-group__suffix"
                  id={id + '-suffix'} // used for "aria-describedby"
                  context={props}
                >
                  {suffix}
                </Suffix>
              )}

              {showStatus && (
                <FormStatus
                  id={id + '-form-status'}
                  global_status_id={global_status_id}
                  label={label}
                  text={status}
                  status={status_state}
                  text_id={id + '-status'} // used for "aria-describedby"
                  width_selector={id + ', ' + id + '-label'}
                  animation={status_animation}
                  skeleton={skeleton}
                />
              )}
            </span>
          </FormRow>
        </div>
      </RadioGroupContext.Provider>
    )
  }
}
