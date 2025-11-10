/**
 * Web Radio Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  dispatchCustomElementEvent,
  keycode,
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

import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'
import RadioGroup from './RadioGroup'
import RadioGroupContext from './RadioGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

/**
 * The radio component is our enhancement of the classic radio button.
 */
export default class Radio extends React.PureComponent {
  static contextType = RadioGroupContext

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    labelSrOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    labelPosition: PropTypes.oneOf(['left', 'right']),
    checked: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    element: PropTypes.node,
    group: PropTypes.string,
    size: PropTypes.oneOf(['default', 'medium', 'large']),
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node,
    ]),
    statusState: PropTypes.string,
    statusProps: PropTypes.object,
    statusNoAnimation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    value: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

    onChange: PropTypes.func,
    onStateUpdate: PropTypes.func,
  }

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
    attributes: null,
    readOnly: false,
    skeleton: null,

    className: null,
    children: null,

    onChange: null,
    onStateUpdate: null,

    innerRef: null,
  }

  static Group = RadioGroup

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.checked !== state._checked) {
        state.checked = Radio.parseChecked(props.checked)
      }
    }
    state._listenForPropChanges = true

    if (state.checked !== state.__checked) {
      dispatchCustomElementEvent({ props }, 'onStateUpdate', {
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

  componentDidMount() {
    if (this.props.innerRef) {
      typeof this.props.innerRef === 'function'
        ? this.props.innerRef(this._refInput.current)
        : (this.props.innerRef.current = this._refInput.current)
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
          this.onChangeHandler(event)
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
            Radio.defaultProps,
            this.context
          )

          // use only the props from context, who are available here anyway
          const props = extendPropsWithContextInClassComponent(
            this.props,
            Radio.defaultProps,
            contextProps,
            { skeleton: context?.skeleton },
            pickFormElementProps(context.formElement),
            context.Radio
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
            id: _id, // eslint-disable-line
            group: _group, // eslint-disable-line
            value: _value, // eslint-disable-line
            checked: _checked, // eslint-disable-line
            disabled: _disabled, // eslint-disable-line
            children, // eslint-disable-line
            onChange, // eslint-disable-line
            onStateUpdate, // eslint-disable-line
            innerRef, // eslint-disable-line

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
            if (isTrue(this.context.disabled) && disabled !== false) {
              disabled = true
            }
          } else if (typeof rest.name !== 'undefined') {
            group = rest.name
          }

          const id = this._id
          const showStatus = getStatusState(status)

          const mainParams = {
            className: classnames(
              'dnb-radio',
              status && `dnb-radio__status--${statusState}`,
              size && `dnb-radio--${size}`,
              label &&
                `dnb-radio--label-position-${labelPosition || 'right'}`,
              createSpacingClasses(props),
              className
            ),
          }

          let inputParams = {
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

          skeletonDOMAttributes(inputParams, skeleton, this.context)

          // also used for code markup simulation
          validateDOMAttributes(this.props, inputParams)

          const labelComp = label && (
            <FormLabel
              id={id + '-label'}
              forId={id}
              text={label}
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
                    label={label}
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
                      <span
                        className={classnames(
                          'dnb-radio__dot',
                          createSkeletonClass(
                            'font',
                            skeleton,
                            this.context
                          )
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
                        {suffix}
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

Radio._formElement = true
Radio._supportsSpacingProps = true
