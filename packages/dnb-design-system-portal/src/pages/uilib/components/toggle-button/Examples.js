/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          caption="Unchecked ToggleButton"
          data-dnb-test="toggle-button-default"
        >
          {/* @jsx */ `
<ToggleButton
  label="Label:"
  text="Click Me"
/>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Checked ToggleButton"
          data-dnb-test="toggle-button-checked"
        >
          {/* @jsx */ `
<ToggleButton
  label="Label:"
  text="Checked ToggleButton"
  title="Ths is the title"
  checked
  on_change={({ value }) => { console.log('on_change', value) }}
/>
        `}
        </ComponentBox>
        <ComponentBox
          caption="Default ToggleButton group"
          data-dnb-test="toggle-button-group-default"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="ToggleButton Group:"
  title="Give me a Title"
  on_change={({ value }) => { console.log('on_change', value) }}
  value="first"
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
          caption="Multi-select ToggleButton group"
          data-dnb-test="toggle-button-group-multiselect"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="Multi-select Group:"
  title="Give me a Title"
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
          caption="Vertical aligned ToggleButton group"
          data-dnb-test="toggle-button-group-vertical"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="Vertical Group:"
  layout_direction="column"
  multiselect={true}
  left_component="checkbox"
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
        <ComponentBox
          caption="ToggleButton group with status messages"
          data-dnb-test="toggle-button-group-status"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="ToggleButton Group with status:"
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
    status="Error message"
  />
  <ToggleButton
    text="Third"
    value="third"
    checked
    status="Info message"
    status_state="info"
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Disabled ToggleButton group"
          data-dnb-test="toggle-button-group-disabled"
        >
          {/* @jsx */ `
<ToggleButton.Group
  label="Disabled Group:"
  disabled
  name="MyGroup"
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
        <StateDemo />
      </Fragment>
    )
  }
}

// class UseOnTests extends PureComponent {
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

class StateDemo extends PureComponent {
  render() {
    return typeof window !== 'undefined' && window.IS_TEST ? (
      <></>
    ) : (
      <ComponentBox
        caption="External state update with possible event **on_state_update**"
        noFragments={false}
      >
        {/* @jsx */ `
() => {
  const [isEnabled, setState] = useState(false)
  // useEffect(() => {
  //   const timer = setInterval(() => setState(!isEnabled), 1e3)
  //   return () => clearTimeout(timer)
  // })
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

export { Example }
export default () => <Example />
