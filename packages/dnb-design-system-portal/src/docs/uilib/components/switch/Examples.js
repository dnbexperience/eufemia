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
          {/* @jsx */ `
<Switch
  label="Switch"
  on_change={onChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Checked Switch"
          data-dnb-test="switch-checked"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Switch
  label="Label:"
  label_position="left"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Checked Switch with error message"
          data-dnb-test="switch-error"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Switch
  label="Switch"
  checked
  status="Error message"
/>
          `}
        </ComponentBox>
        <ComponentBox title="Switch with suffix" scope={{ onChange }}>
          {/* @jsx */ `
<Switch
  label="Switch"
  checked
  suffix={<Modal title="Modal Title">Modal content</Modal>}
/>
          `}
        </ComponentBox>
        <StateDemo />
      </React.Fragment>
    )
  }
}

class StateDemo extends React.PureComponent {
  render() {
    return typeof window !== 'undefined' && window.IS_TEST ? (
      <ComponentBox data-dnb-test="switch-disabled">
        {/* @jsx */ `
<Switch
  checked
  disabled
  label="Disabled"
/>
`}
      </ComponentBox>
    ) : (
      <ComponentBox
        title="Disabled Switch in checked state"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [switchIsEnabled, setState] = React.useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => setState(!switchIsEnabled), 1e3)
    return () => clearInterval(timer)
  })
  return (<>
    <FormLabel
      id="switch-1-label"
      for_id="switch-1"
      text="Switch label:"
    />
    <Switch
      id="switch-1"
      aria-labelledby="switch-1-label"
      default_state={true}
      checked={switchIsEnabled}
      on_state_update={({checked}) => {}}
      disabled
    />
  </>)
}
        `}
      </ComponentBox>
    )
  }
}

export default Example
