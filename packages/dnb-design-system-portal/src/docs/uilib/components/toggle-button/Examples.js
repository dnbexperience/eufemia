/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          title="Unchecked ToggleButton"
          data-dnb-test="toggle-button-default"
        >
          {/* @jsx */ `
<ToggleButton
  label="Label:"
  text="Toggle Me"
/>
        `}
        </ComponentBox>
        <ComponentBox
          title="Checked ToggleButton"
          data-dnb-test="toggle-button-checked"
        >
          {/* @jsx */ `
<ToggleButton
  label="Label:"
  text="Checked ToggleButton"
  checked
  on_change={({ checked }) => { console.log('on_change', checked) }}
/>
        `}
        </ComponentBox>
        <ComponentBox
          title="Default ToggleButton group"
          data-dnb-test="toggle-button-group-default"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="ToggleButton Group:"
  value="first"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton
    text="Third"
    value="third"
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="Multi-select ToggleButton group"
          data-dnb-test="toggle-button-group-multiselect"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="Multi-select:"
  multiselect="true"
  values={['first', 'third']}
  on_change={({ values }) => { console.log('on_change', values) }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton
    text="Third"
    value="third"
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="Vertical aligned ToggleButton group with `checkbox` variant and `multiselect`"
          data-dnb-test="toggle-button-group-vertical"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="Vertical Group:"
  layout_direction="column"
  multiselect={true}
  variant="checkbox"
  on_change={({ values }) => { console.log('on_change', values) }}
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton
    text="Third"
    value="third"
    checked
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox title="ToggleButton group as `multiselect` with status message">
          {/* @jsx */ `
<ToggleButton.Group
  label="ToggleButton Group with status:"
  status="Error message"
  multiselect={true}
  on_change={({ values }) => { console.log('on_change', values) }}
>
  <ToggleButton
    text="First"
    value="first"
  />
  <ToggleButton
    text="Second"
    value="second"
    checked

  />
  <ToggleButton
    text="Third"
    value="third"
    checked="true"
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="ToggleButton with status messages and a gorup variant as `radio`"
          data-dnb-test="toggle-button-group-status"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="ToggleButtons with status:"
  variant="radio"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <ToggleButton
    text="First"
    value="first"
    status="error"
  />
  <ToggleButton
    text="Second"
    value="second"
    checked
    status="Error message"
  />
  <ToggleButton
    text="Third"
    value="third"
    status="Info message"
    status_state="info"
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="Disabled ToggleButton group"
          data-dnb-test="toggle-button-group-disabled"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="Disabled Group:"
  disabled
  variant="checkbox"
>
  <ToggleButton text="First" value="first" />
  <ToggleButton text="Second" value="second" />
  <ToggleButton
    text="Third"
    value="third"
    checked
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox title="ToggleButtons with suffix">
          {/* @jsx */ `
<ToggleButton.Group
  label="With suffixes:"
  suffix="And a group suffix"
>
  <ToggleButton text="First" value="first" />
  <ToggleButton
    text="Second"
    value="second"
    status="Error message"
    suffix={<Modal title="Modal Title">Modal content</Modal>}
  />
  <ToggleButton
    text="Third"
    value="third"
    checked
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <StateDemo />
      </React.Fragment>
    )
  }
}

// class UseOnTests extends React.PureComponent {
//   render() {
//     return typeof window !== 'undefined' && window.IS_TEST ? (
//       <>
//
//       </>
//     ) : (
//       <></>
//     )
//   }
// }

class StateDemo extends React.PureComponent {
  render() {
    return typeof window !== 'undefined' && window.IS_TEST ? (
      <></>
    ) : (
      <ComponentBox
        title="External state update with possible event **on_state_update**"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [isEnabled, setState] = React.useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => setState(!isEnabled), 1e3)
    return () => clearTimeout(timer)
  })
  return (
    <>
      <FormLabel
        id="toggle-button-1-label"
        for_id="toggle-button-1"
        text="ToggleButton label:"
      />
      <ToggleButton
        id="toggle-button-1"
        aria-labelledby="toggle-button-1-label"
        text="ToggleButton"
        variant="checkbox"
        checked={isEnabled}
        on_state_update={({checked}) => {}}
        readOnly
      />
    </>
  )
}
        `}
      </ComponentBox>
    )
  }
}

export default Example
