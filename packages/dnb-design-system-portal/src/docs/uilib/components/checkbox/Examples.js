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
          title="Unchecked Checkbox (default state)"
          data-dnb-test="checkbox-default"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Checkbox
  label="Checkbox"
  on_change={onChange}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Checked Checkbox, left label position"
          data-dnb-test="checkbox-checked"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Checkbox
  label="Label:"
  label_position="left"
  checked
  on_change={({ checked }) => console.log(checked)}
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Checked Checkbox with error message"
          data-dnb-test="checkbox-error"
          scope={{ onChange }}
        >
          {/* @jsx */ `
<Checkbox
  label="Checkbox"
  checked
  status="Error message"
/>
          `}
        </ComponentBox>
        <ComponentBox title="Checkbox with suffix" scope={{ onChange }}>
          {/* @jsx */ `
<Checkbox
  label="Checkbox"
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
      <ComponentBox data-dnb-test="checkbox-disabled">
        {/* @jsx */ `
<Checkbox
  checked
  disabled
/>
`}
      </ComponentBox>
    ) : (
      <ComponentBox
        title="Disabled Checkbox in checked state"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [checkboxIsEnabled, setState] = React.useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => setState(!checkboxIsEnabled), 1e3)
    return () => clearTimeout(timer)
  })
  return (<>
    <FormLabel
      id="checkbox-1-label"
      for_id="checkbox-1"
      text="Checkbox label:"
    />
    <Checkbox
      id="checkbox-1"
      aria-labelledby="checkbox-1-label"
      default_state
      checked={checkboxIsEnabled}
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

export { Example }
export default () => <Example />
