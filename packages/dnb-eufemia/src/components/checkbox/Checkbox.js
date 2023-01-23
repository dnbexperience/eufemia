/**
 * Web Checkbox Component
 *
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
import AlignmentHelper from '../../shared/AlignmentHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { includeValidProps } from '../form-row/FormRowHelpers'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

/**
 * The checkbox component is our enhancement of the classic checkbox button. It acts like a checkbox. Example: On/off, yes/no.
 */
export default class Checkbox extends React.PureComponent {
  static tagName = 'dnb-checkbox'
  static contextType = Context

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_position: PropTypes.oneOf(['left', 'right']),
    title: PropTypes.string,
    element: PropTypes.node,
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
    value: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    custom_element: PropTypes.object,
    custom_method: PropTypes.func,
    on_change: PropTypes.func,
    on_state_update: PropTypes.func,
  }

  static defaultProps = {
    label: null,
    label_position: null,
    title: null,
    element: 'input',
    checked: null,
    disabled: null,
    id: null,
    size: null,
    status: null,
    status_state: 'error',
    status_props: null,
    status_no_animation: null,
    global_status_id: null,
    suffix: null,
    value: null,
    attributes: null,
    readOnly: false,
    skeleton: null,
    class: null,

    className: null,
    children: null,

    custom_element: null,
    custom_method: null,

    on_change: null,
    on_state_update: null,
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.checked !== state._checked) {
        state.checked = Checkbox.parseChecked(props.checked)
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

    // help firefox and safari to have an correct state after a click
    if (this._refInput.current) {
      this._refInput.current.focus()
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      Checkbox.defaultProps,
      { skeleton: this.context && this.context.skeleton },
      this.context.getTranslation(this.props).Checkbox,
      includeValidProps(this.context.FormRow),
      this.context.Checkbox
    )

    const {
      value,
      status,
      status_state,
      status_props,
      status_no_animation,
      global_status_id,
      suffix,
      size,
      label,
      label_position,
      label_sr_only,
      title,
      element,
      disabled,
      readOnly,
      skeleton,
      className,
      class: _className,

      id: _id, // eslint-disable-line
      checked: _checked, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line
      on_state_update, // eslint-disable-line
      custom_method, // eslint-disable-line
      custom_element, // eslint-disable-line

      ...rest
    } = props

    const { checked } = this.state

    const id = this._id
    const showStatus = getStatusState(status)

    const mainParams = {
      className: classnames(
        'dnb-checkbox',
        status && `dnb-checkbox__status--${status_state}`,
        size && `dnb-checkbox--${size}`,
        label &&
          `dnb-checkbox--label-position-${label_position || 'right'}`,
        'dnb-form-component',
        createSkeletonClass(null, skeleton),
        createSpacingClasses(props),
        className,
        _className
      ),
    }

    const inputParams = {
      disabled,
      checked,
      ...rest,
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

    skeletonDOMAttributes(inputParams, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, inputParams)

    const statusComp = (
      <FormStatus
        show={showStatus}
        id={id + '-form-status'}
        global_status_id={global_status_id}
        label={label}
        text_id={id + '-status'} // used for "aria-describedby"
        width_selector={id + ', ' + id + '-label'}
        text={status}
        state={status_state}
        no_animation={status_no_animation}
        skeleton={skeleton}
        {...status_props}
      />
    )

    const Element = element || 'input'

    return (
      <span {...mainParams}>
        <span className="dnb-checkbox__order">
          {label && (
            <FormLabel
              id={id + '-label'}
              for_id={id}
              text={label}
              disabled={disabled}
              skeleton={skeleton}
              sr_only={label_sr_only}
            />
          )}

          <span className="dnb-checkbox__inner">
            <AlignmentHelper />
            {label_position === 'left' && statusComp}

            <span className="dnb-checkbox__shell">
              <Element
                id={id}
                name={id}
                type="checkbox"
                title={title}
                className="dnb-checkbox__input"
                value={checked ? value || '' : ''}
                disabled={isTrue(disabled)}
                {...inputParams}
                onChange={this.onChangeHandler}
                onKeyDown={this.onKeyDownHandler}
                ref={this._refInput}
              />

              <span
                className={classnames(
                  'dnb-checkbox__button',
                  createSkeletonClass('shape', skeleton, this.context)
                )}
                aria-hidden
              >
                <span className="dnb-checkbox__focus" />
              </span>

              <CheckIcon size={size} />
            </span>
          </span>

          {suffix && (
            <Suffix
              className="dnb-checkbox__suffix"
              id={id + '-suffix'} // used for "aria-describedby"
              context={props}
            >
              {suffix}
            </Suffix>
          )}
        </span>

        {(label_position === 'right' || !label_position) && statusComp}
      </span>
    )
  }
}

// The new checkbox has too low contrast, as it is too thin on web
export const CheckIcon = ({ size, ...props }) => {
  let vB = 16
  if (size === 'large') {
    vB = 24
  }
  return (
    <svg
      width={vB}
      height={vB}
      viewBox={`0 0 ${vB} ${vB}`}
      fill="none"
      className="dnb-checkbox__gfx"
      aria-hidden
      {...props}
    >
      <path
        d={size === 'large' ? 'M1.5 15L7.5 21L22.5 3' : 'M1 10L5 14L15 2'}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
CheckIcon.propTypes = {
  size: PropTypes.string,
}
CheckIcon.defaultProps = {
  size: 'default',
}
