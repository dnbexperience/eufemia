/**
 * Web RadioGroup Component
 *
 * This is a legacy component.
 * For refferencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  extendPropsWithContextInClassComponent,
  makeUniqueId,
  validateDOMAttributes,
  getStatusState,
  combineDescribedBy,
  combineLabelledBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import FormLabel from '../FormLabel'
import FormStatus from '../FormStatus'
import Flex from '../Flex'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import RadioGroupContext from './RadioGroupContext'

/**
 * The radio component is our enhancement of the classic radio button. It acts like a radio. Example: On/off, yes/no.
 */
export default class RadioGroup extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
    label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    label_position: PropTypes.oneOf(['left', 'right']),
    title: PropTypes.string,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    name: PropTypes.string,
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
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    suffix: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
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
      PropTypes.node,
    ]),

    on_change: PropTypes.func,
  }

  static defaultProps = {
    label: null,
    label_direction: null,
    label_sr_only: null,
    label_position: null,
    title: null,
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
    attributes: null,
    class: null,

    className: null,
    children: null,

    on_change: null,
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
      _listenForPropChanges: true,
    }
  }

  onChangeHandler = ({ value, event }) => {
    this.setState({ value, _listenForPropChanges: false })
    dispatchCustomElementEvent(this, 'on_change', {
      value,
      event,
    })
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      RadioGroup.defaultProps,
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
      pickFormElementProps(this.context?.formElement),
      this.context.RadioGroup
    )

    const {
      status,
      status_state,
      status_props,
      status_no_animation,
      globalStatus,
      suffix,
      label,
      label_direction,
      label_sr_only,
      label_position,
      vertical,
      layout_direction,
      size,
      disabled,
      skeleton,
      className,
      class: _className,

      id: _id, // eslint-disable-line
      name: _name, // eslint-disable-line
      value: _value, // eslint-disable-line
      children, // eslint-disable-line
      on_change, // eslint-disable-line

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
      size,
      disabled,
      label_position,
      onChange: this.onChangeHandler,
    }

    const Fieldset = label ? 'fieldset' : 'div'

    return (
      <RadioGroupContext.Provider value={context}>
        <div className={classes}>
          <AlignmentHelper />
          <Fieldset>
            <Flex.Container
              align="baseline"
              direction={
                vertical || label_direction === 'vertical'
                  ? 'vertical'
                  : 'horizontal'
              }
              spacing={vertical ? 'x-small' : undefined}
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

                <FormStatus
                  show={showStatus}
                  id={id + '-form-status'}
                  globalStatus={globalStatus}
                  label={label}
                  text={status}
                  state={status_state}
                  text_id={id + '-status'} // used for "aria-describedby"
                  width_selector={id + ', ' + id + '-label'}
                  no_animation={status_no_animation}
                  skeleton={skeleton}
                  {...status_props}
                />
              </span>
            </Flex.Container>
          </Fieldset>
        </div>
      </RadioGroupContext.Provider>
    )
  }
}

RadioGroup._supportsSpacingProps = true
