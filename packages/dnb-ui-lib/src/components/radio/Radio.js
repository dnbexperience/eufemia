/**
 * Web Radio Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../skeleton/SkeletonHelper'

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

/**
 * The radio component is our enhancement of the classic radio button.
 */
export default class Radio extends React.PureComponent {
  static tagName = 'dnb-radio'
  static contextType = RadioGroupContext

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label_position: PropTypes.oneOf(['left', 'right']),
    checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    group: PropTypes.string,
    size: PropTypes.oneOf(['default', 'medium', 'large']),
    status: PropTypes.oneOfType([
      PropTypes.string,
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
    value: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    /// React props
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,
    on_change: PropTypes.func,
    on_state_update: PropTypes.func
  }

  static defaultProps = {
    label: null,
    label_sr_only: null,
    label_position: null,
    checked: undefined,
    disabled: false,
    id: null,
    size: null,
    group: null,
    status: null,
    status_state: 'error',
    status_animation: null,
    global_status_id: null,
    suffix: null,
    value: '',
    attributes: null,
    readOnly: false,
    skeleton: null,
    class: null,

    className: null,
    children: null,

    custom_element: null,
    custom_method: null,

    on_change: null,
    on_state_update: null
  }

  static Group = RadioGroup

  static enableWebComponent() {
    registerElement(Radio.tagName, Radio, Radio.defaultProps)
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.checked !== state._checked) {
        state.checked = Radio.parseChecked(props.checked)
      }
      if (typeof props.checked !== 'undefined') {
        state._checked = props.checked
      }
    }
    state._listenForPropChanges = true

    if (state.checked !== state.__checked) {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        checked: state.checked
      })
    }

    if (typeof state.checked === 'undefined') {
      state.checked = false
    }
    state.__checked = state.checked

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
  }

  onKeyDownHandler = (event) => {
    const key = keycode(event)
    // only have key support if there is only a single radio
    if (this.isInNoGroup()) {
      switch (key) {
        case 'enter':
          this.onChangeHandler(event)
          break
      }
    } else if (this.isContextGroupOrSingle()) {
      switch (key) {
        case 'space':
        case 'enter': {
          const { value } = this.context
          if (value !== null && typeof value !== 'undefined') {
            event.preventDefault()
          }
          if (key === 'enter') {
            const checked = !this.state.checked
            this.setState({ checked, _listenForPropChanges: false })
          }
          break
        }
      }
    } else {
      // else we only use the native support, and don't want space support
      // because only arrow keys has to be used
      switch (key) {
        case 'space': {
          event.preventDefault()
          break
        }
      }
    }
    dispatchCustomElementEvent(this, 'on_key_down', { event })
  }

  onChangeHandler = (_event) => {
    const event = _event
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    const value = event.target.value
    const checked = !this.state.checked

    // delay in case we have a props group only
    if (this.isPlainGroup()) {
      // in case we have a false "hasContext" but a "group"
      // then we have to use a delay, to overwrite the uncrontrolled state
      setTimeout(() => {
        this.setState({ checked, _listenForPropChanges: false }, () =>
          this.callOnChange({ value, checked, event })
        )
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

  onClickHandler = (event) => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    // only have click support if there are more plain radio
    if (!this.isPlainGroup()) {
      return
    }
    const value = event.target.value
    const checked = event.target.checked
    this.callOnChange({ value, checked, event })
  }

  callOnChange = ({ value, checked, event }) => {
    const { group } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      group,
      checked,
      value,
      event
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
          // use only the props from context, who are available here anyway
          const props = extendPropsWithContext(
            this.props,
            Radio.defaultProps,
            this.context, // internal context
            { skeleton: context?.skeleton },
            context.formRow
          )

          const {
            status,
            status_state,
            status_animation,
            global_status_id,
            suffix,
            label,
            label_sr_only,
            label_position,
            size,
            readOnly,
            skeleton,
            className,
            class: _className,
            id: _id, // eslint-disable-line
            group: _group, // eslint-disable-line
            value: _value, // eslint-disable-line
            checked: _checked, // eslint-disable-line
            disabled: _disabled, // eslint-disable-line
            attributes, // eslint-disable-line
            children, // eslint-disable-line
            on_change, // eslint-disable-line
            on_state_update, // eslint-disable-line
            custom_method, // eslint-disable-line
            custom_element, // eslint-disable-line

            ...rest
          } = props

          let { checked } = this.state
          let { value, group, disabled } = props // get it from context also

          const hasContext = typeof this.context.name !== 'undefined'

          if (hasContext) {
            if (typeof this.context.value !== 'undefined') {
              checked = this.context.value === value
            }
            group = this.context.name
            disabled = isTrue(this.context.disabled)
          } else if (typeof rest.name !== 'undefined') {
            group = rest.name
          }

          const id = this._id
          const showStatus = getStatusState(status)

          const mainParams = {
            className: classnames(
              'dnb-radio',
              status && `dnb-radio__status--${status_state}`,
              size && `dnb-radio--${size}`,
              label &&
                `dnb-radio--label-position-${label_position || 'right'}`,
              createSpacingClasses(props),
              className,
              _className
            )
          }

          const inputParams = {
            role: hasContext || group ? 'radio' : null,
            type: hasContext || group ? 'radio' : 'checkbox', // overwriting the type
            ...rest
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

          if (!group) {
            inputParams.type = 'checkbox'
            inputParams.role = 'radio' // breaks axe test
          }

          skeletonDOMAttributes(inputParams, skeleton, this.context)

          // also used for code markup simulation
          validateDOMAttributes(this.props, inputParams)

          const labelComp = label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              text={label}
              disabled={disabled}
              skeleton={skeleton}
              sr_only={label_sr_only}
            />
          )

          return (
            <span {...mainParams}>
              <span className="dnb-radio__order">
                {label_position === 'left' && labelComp}

                <span className="dnb-radio__inner">
                  <AlignmentHelper />

                  {showStatus && (
                    <FormStatus
                      id={id + '-form-status'}
                      global_status_id={global_status_id}
                      label={label}
                      text_id={id + '-status'} // used for "aria-describedby"
                      width_selector={id + ', ' + id + '-label'}
                      text={status}
                      status={status_state}
                      animation={status_animation}
                      skeleton={skeleton}
                    />
                  )}

                  <span className="dnb-radio__row">
                    <span className="dnb-radio__shell">
                      <input
                        type="radio"
                        value={value}
                        id={id}
                        name={group}
                        className="dnb-radio__input"
                        checked={checked}
                        aria-checked={checked}
                        disabled={isTrue(disabled)}
                        ref={this._refInput}
                        {...inputParams}
                        onChange={this.onChangeHandler}
                        onClick={this.onClickHandler}
                        onKeyDown={this.onKeyDownHandler}
                      />

                      <span
                        className={classnames(
                          'dnb-radio__button',
                          createSkeletonClass(
                            'shape',
                            skeleton,
                            this.context
                          )
                        )}
                        aria-hidden
                      />
                      <span className="dnb-radio__focus" aria-hidden />
                      <span className="dnb-radio__dot" aria-hidden />
                    </span>

                    {label_position !== 'left' && labelComp}

                    {suffix && (
                      <span
                        className="dnb-radio__suffix"
                        id={id + '-suffix'} // used for "aria-describedby"
                      >
                        <Suffix {...props}>{suffix}</Suffix>
                      </span>
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
