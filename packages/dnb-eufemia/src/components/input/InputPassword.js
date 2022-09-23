/**
 * Web Input Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'

import Input, { SubmitButton } from './Input'
import { includeValidProps } from '../form-row/FormRowHelpers'
import {
  makeUniqueId,
  extendPropsWithContextInClassComponent,
  convertStatusToStateOnly,
  combineDescribedBy,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import IconView from '../../icons/view'
import IconViewOff from '../../icons/hide'
import IconViewMedium from '../../icons/view_medium'
import IconViewOffMedium from '../../icons/hide_medium'

export default class InputPassword extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    show_password: PropTypes.string,
    hide_password: PropTypes.string,
    on_show_password: PropTypes.func,
    on_hide_password: PropTypes.func,
    ...Input.propTypes,
  }
  static defaultProps = {
    show_password: null,
    hide_password: null,
    on_show_password: null,
    on_hide_password: null,
    ...Input.defaultProps,
  }

  state = { hidden: true }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._ref = props.inner_ref || React.createRef()
  }

  toggleVisibility = (event) => {
    const hidden = this.state.hidden
    this.setState(
      {
        hidden: !hidden,
      },
      () => {
        if (this._ref.current) {
          this._ref.current.focus()
        }
      }
    )

    dispatchCustomElementEvent(
      this,
      hidden ? 'on_show_password' : 'on_hide_password',
      { event }
    )
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      InputPassword.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Input,
      includeValidProps(this.context.FormRow),
      this.context.Input,
      this.context.InputPassword
    )

    const id = this._id
    const params = { id }
    params['aria-describedby'] = combineDescribedBy(
      this.props,
      id + '-submit-button'
    )

    return (
      <Input
        {...this.props}
        {...params}
        className={classnames('dnb-input--password', this.props.className)}
        type={this.state.hidden ? 'password' : 'text'}
        inner_ref={this._ref}
        submit_element={
          <SubmitButton
            id={id + '-submit-button'}
            type="button"
            variant="secondary"
            aria-controls={id}
            aria-label={
              this.state.hidden ? props.show_password : props.hide_password
            }
            icon={
              props.size === 'large'
                ? this.state.hidden
                  ? IconViewMedium
                  : IconViewOffMedium
                : this.state.hidden
                ? IconView
                : IconViewOff
            }
            skeleton={props.skeleton}
            status={convertStatusToStateOnly(
              props.status,
              props.status_state
            )}
            status_state={props.status_state}
            onClick={this.toggleVisibility}
          />
        }
      />
    )
  }
}
