/**
 * Web Switch Component
 *
 * This is a legacy component.
 * For refferencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

/**
 * The switch component is our enhancement of the classic radio button. It acts like a switch. Example: On/off, yes/no.
 */
export default class Switch extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_position: PropTypes.oneOf(['left', 'right']),
    label_sr_only: PropTypes.bool,
    title: PropTypes.string,
    checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    size: PropTypes.oneOf(['default', 'medium', 'large']),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    status_state: PropTypes.string,
    status_props: PropTypes.object,
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    status_no_animation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    value: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    on_change: PropTypes.func,
    on_change_end: PropTypes.func,
    on_state_update: PropTypes.func,
  }

  static defaultProps = {
    label: null,
    label_position: null,
    label_sr_only: null,
    title: null,
    checked: null,
    disabled: null,
    id: null,
    size: null,
    status: null,
    status_state: 'error',
    status_props: null,
    globalStatus: null,
    status_no_animation: null,
    suffix: null,
    value: null,
    attributes: null,
    readOnly: false,
    skeleton: null,

    className: null,
    children: null,

    on_change: null,
    on_change_end: null,
    on_state_update: null,

    innerRef: null,
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.checked !== state._checked) {
        state.checked = Switch.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    if (state.checked !== state.__checked) {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        checked: state.checked,
      })
    }

    state._checked = props.checked
    state.__checked = state.checked

    return state
  }

  constructor(props) {
    super(props)
    this._refInput = React.createRef()
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true,
    }
    this.helperParams = { onMouseDown: (e) => e.preventDefault() }
  }

  componentDidMount() {
    if (this.props.innerRef) {
      typeof this.props.innerRef === 'function'
        ? this.props.innerRef(this._refInput.current)
        : (this.props.innerRef.current = this._refInput.current)
    }
  }

  componentWillUnmount() {
    clearTimeout(this._onChangeEndId)
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.onChangeHandler(event)
        break
    }
  }

  onChangeHandler = (event) => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    const checked = !this.state.checked
    this.setState({ checked, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', { checked, event })

    if (this.props.on_change_end) {
      clearTimeout(this._onChangeEndId)
      if (event && event.persist) {
        event.persist()
      }
      this._onChangeEndId = setTimeout(
        () =>
          dispatchCustomElementEvent(this, 'on_change_end', {
            checked,
            event,
          }),
        500
      )
    }

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Switch.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Switch,
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
      pickFormElementProps(this.context?.formElement),
      this.context.Switch
    )

    const {
      value,
      size,
      status,
      status_state,
      status_props,
      globalStatus,
      status_no_animation,
      suffix,
      label,
      label_position,
      label_sr_only,
      title,
      disabled,
      readOnly,
      skeleton,
      className,

      id: _id, // eslint-disable-line
      checked: _checked, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      on_state_update, // eslint-disable-line
      innerRef, // eslint-disable-line

      ...rest
    } = props

    const { checked } = this.state

    const id = this._id
    const showStatus = getStatusState(status)

    const mainParams = {
      className: classnames(
        'dnb-switch',
        size && `dnb-switch--${size}`,
        status && `dnb-switch__status--${status_state}`,
        `dnb-switch--label-position-${label_position || 'right'}`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        className
      ),
    }

    const inputParams = {
      disabled: isTrue(disabled),
      checked,
      ...rest,
    }

    skeletonDOMAttributes(inputParams, skeleton, this.context)

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
        <span className="dnb-switch__order">
          {label_position === 'left' && labelComp}

          <span className="dnb-switch__inner">
            <AlignmentHelper />

            <FormStatus
              show={showStatus}
              id={id + '-form-status'}
              globalStatus={globalStatus}
              label={label}
              text_id={id + '-status'} // used for "aria-describedby"
              width_selector={id + ', ' + id + '-label'}
              text={status}
              state={status_state}
              skeleton={skeleton}
              no_animation={status_no_animation}
              {...status_props}
            />

            <span className="dnb-switch__shell">
              {(label_position === 'right' || !label_position) &&
                labelComp}

              <span className="dnb-switch__row">
                <input
                  id={id}
                  name={id}
                  type="checkbox"
                  role="switch"
                  title={title}
                  aria-checked={checked}
                  className="dnb-switch__input"
                  value={checked ? value || '' : ''}
                  ref={this._refInput}
                  {...inputParams}
                  onChange={this.onChangeHandler}
                  onKeyDown={this.onKeyDownHandler}
                />
                <span
                  draggable
                  aria-hidden
                  className="dnb-switch__background"
                  onDragStart={this.onChangeHandler}
                  {...this.helperParams}
                />
                <span
                  className={classnames(
                    'dnb-switch__button',
                    createSkeletonClass('shape', skeleton, this.context)
                  )}
                  aria-hidden
                >
                  <span className="dnb-switch__focus">
                    <span className="dnb-switch__focus__inner" />
                  </span>
                </span>
              </span>

              {suffix && (
                <Suffix
                  className="dnb-switch__suffix"
                  id={id + '-suffix'} // used for "aria-describedby"
                  context={props}
                >
                  {suffix}
                </Suffix>
              )}
            </span>
          </span>
        </span>
      </span>
    )
  }
}

Switch._formElement = true
Switch._supportsSpacingProps = true
