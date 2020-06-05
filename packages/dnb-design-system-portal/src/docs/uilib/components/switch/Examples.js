/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  onChangeHandler = (state) => {
    console.log('onChangeHandler', state)
  }

  render() {
    const { onChangeHandler: onChange } = this
    return (
      <React.Fragment>
        <ComponentBox
          title="Unchecked Switch (default state)"
          data-dnb-test="switch-default"
          scope={{ onChange }}
        >
          {
            /* @jsx */ `
<Switch
  label="Switch"
  on_change={onChange}
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Checked Switch"
          data-dnb-test="switch-checked"
          scope={{ onChange }}
        >
          {
            /* @jsx */ `
<Switch
  label="Label:"
  label_position="left"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Checked Switch with error message"
          data-dnb-test="switch-error"
          scope={{ onChange }}
        >
          {
            /* @jsx */ `
<Switch
  label="Switch"
  checked
  status="Error message"
/>
          `
          }
        </ComponentBox>
        <ComponentBox title="Switch with suffix" scope={{ onChange }}>
          {
            /* @jsx */ `
<Switch
  label="Switch"
  checked
  suffix={<Modal title="Modal Title">Modal content</Modal>}
/>
          `
          }
        </ComponentBox>
        <ComponentBox data-dnb-test="switch-disabled">
          {
            /* @jsx */ `
<Switch
  checked
  disabled
  label="Disabled"
/>
`
          }
        </ComponentBox>
      </React.Fragment>
    )
  }
}

export default Example
