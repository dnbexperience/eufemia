/**
 * Web Input Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import keycode from 'keycode'

import Input, { SubmitButton } from './Input'
import {
  makeUniqueId,
  extendPropsWithContext,
  combineDescribedBy
} from '../../shared/component-helper'

export default class InputReset extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    clear_button_title: PropTypes.string,
    ...Input.propTypes
  }
  static defaultProps = {
    clear_button_title: null,
    ...Input.defaultProps
  }

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._ref = props.inner_ref || React.createRef()
    this._inputRef = React.createRef()
  }

  onKeyDownHandler = ({ event }) => {
    const key = keycode(event)

    if (key === 'esc') {
      this.reset(event)
    }
  }

  reset = (event) => {
    event.target = ''

    if (this._inputRef.current) {
      this._inputRef.current.onChangeHandler(event)
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      InputReset.defaultProps,
      { skeleton: this.context?.skeleton },
      this.context.getTranslation(this.props).Input,
      this.context.FormRow,
      this.context.Input,
      this.context.InputReset
    )

    const id = this._id
    const params = {}
    params['aria-describedby'] = combineDescribedBy(
      this.props,
      id + '-submit-button'
    )

    return (
      <Input
        id={id}
        {...this.props}
        {...params}
        on_key_down={this.onKeyDownHandler}
        inner_ref={this._ref}
        ref={this._inputRef}
        input_element={(inputParams, ref) => (
          <>
            <input {...inputParams} ref={ref} />
            <span className="dnb-input--reset dnb-input__submit-element">
              <SubmitButton
                id={id + '-submit-button'}
                variant="tertiary"
                aria-controls={id}
                aria-label={props.clear_button_title}
                title={props.clear_button_title}
                icon="close"
                icon_size={props.size === 'small' ? 'small' : undefined}
                skeleton={props.skeleton}
                onClick={this.reset}
              />
            </span>
          </>
        )}
      />
    )
  }
}
