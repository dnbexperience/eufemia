/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'

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
          caption="Default unchecked Switch"
          data-dnb-test="switch-default"
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
          caption="Disabled Switch in checked state"
          scope={{ onStateUpdate, onChange }}
          noInline
        >
          {/* @jsx */ `
render(<Switch
  label="Label:"
  text_positive="Yes"
  text_negative="No"
  disabled
  default_state="true"
  checked={false}
  on_state_update={onStateUpdate}
  on_change={onChange}
/>)
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

export { Example }
export default () => <Example />
