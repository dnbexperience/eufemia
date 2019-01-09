/**
 * UI lib Component Example
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Switch from './Switch'
import FormLabel from '../../components/form-label/FormLabel'

// we call this later on componentDidMount()
// Switch.enableWebComponent()

class SwitchDemo extends PureComponent {
  static propTypes = {
    onStateUpdate: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }
  static defaultProps = {
    active_second: false
  }

  static onChangeHandler = state => {
    console.log('onChangeHandler', state)
  }
  static onStateUpdateHandler = state => {
    console.log('onStateUpdateHandler', state)
  }

  render() {
    return (
      <Switch
        id="switch-1"
        text_positive="Yes"
        text_negative="No"
        labelledby="switch-1-label"
        title="Ths is the title"
        value="Value of switch"
        default_state={false}
        checked={false}
        on_state_update={this.props.onStateUpdate}
        on_change={this.props.onChange}
        attributes={{
          'data-fake:on_change': 'SwitchDemo.onChangeHandler()',
          'data-fake:on_state_update': 'SwitchDemo.onStateUpdateHandler()'
        }}
      />
    )
  }
}

class Example extends PureComponent {
  state = {
    active_first: false,
    active_second: false
  }

  // Web Component stuff, also the static functions
  componentDidMount() {
    Switch.enableWebComponent()
    window.SwitchDemo = SwitchDemo
  }

  render() {
    return (
      <div className="example-box">
        <form className="dnb-form">
          <div className="dnb-form__item">
            <div className="dnb-form__cell">
              <FormLabel
                id="switch-1-label"
                for_id="switch-1"
                text="Form Label Text"
              />
            </div>
            <div className="dnb-form__cell">
              <SwitchDemo
                active_second={this.state.active_second}
                onStateUpdate={({ checked }) =>
                  this.setState({
                    active_first: checked,
                    active_second: checked
                  })
                }
                onChange={({ checked }) =>
                  this.setState({
                    active_first: checked,
                    active_second: checked
                  })
                }
              />
              <dnb-switch
                id="switch-2"
                title="Ths is the title"
                disabled
                default_state="true"
                checked={this.state.active_second ? 'true' : 'false'}
                on_change="SwitchDemo.onChangeHandler"
                on_state_update="SwitchDemo.onStateUpdateHandler"
              />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export { Example }
export default () => <Example />
