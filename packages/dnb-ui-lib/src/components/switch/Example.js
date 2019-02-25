/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'
// import Switch from './Switch'
// import FormLabel from '../../components/form-label/FormLabel'

class Example extends PureComponent {
  static onChangeHandler = state => {
    console.log('onChangeHandler', state)
  }
  static onStateUpdateHandler = state => {
    console.log('onStateUpdateHandler', state)
  }

  render() {
    const {
      onStateUpdateHandler: onStateUpdate,
      onChangeHandler: onChange
    } = this
    return (
      <Fragment>
        <ComponentBox
          caption="Default Swtich"
          data-dnb-test="swtich-default"
          scope={{ onStateUpdate, onChange }}
        >
          {/* @jsx */ `
<FormLabel
  for_id="switch-1"
  text="Switch label:"
/>
<Switch
  id="switch-1"
  text_positive="Yes"
  text_negative="No"
  // labelledby="switch-1-label"
  title="Ths is the title"
  value="Value of switch"
  default_state={false}
  checked={false}
  on_state_update={onStateUpdate}
  on_change={onChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Disabled Swtich"
          data-dnb-test="swtich-default"
          scope={{ onStateUpdate, onChange }}
        >
          {/* @jsx */ `
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
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
