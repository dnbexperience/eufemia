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
        <UseOnTests />
        <ComponentBox caption="ToggleButton group" data-dnb-test="toggle-button-group">
          {/* @jsx */ `
<ToggleButton.Group
  label="ToggleButton Group:"
  title="Give me a Title"
  on_change={({ value }) => { console.log('on_change', value) }}
  value="first"
>
  <ToggleButton label="First" value="first" />
  <ToggleButton label="Second" value="second" />
  <ToggleButton
    label="Third"
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
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <ToggleButton label="First" value="first" />
  <ToggleButton label="Second" value="second" />
  <ToggleButton
    label="Third"
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
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <ToggleButton
    label="First"
    value="first"
    status="error"
  />
  <ToggleButton
    label="Second"
    value="second"
    status="Error message"
  />
  <ToggleButton
    label="Third"
    value="third"
    checked
    status="Info message"
    status_state="info"
  />
</ToggleButton.Group>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Plain ToggleButton group. Without **<ToggleButton.Group>**"
          data-dnb-test="toggle-button-group-plain"
        >
          {/* @jsx */ `
<p className="dnb-p dnb-toggle-button-group">
  <FormLabel id="MyToggleButtonGroup">Plain ToggleButton group:</FormLabel>
  <ToggleButton
    value="first"
    label="First"
    group="MyToggleButtonGroup"
    labelledby="MyToggleButtonGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
  <ToggleButton
    checked
    value="second"
    label="Second"
    group="MyToggleButtonGroup"
    labelledby="MyToggleButtonGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
  <ToggleButton
    checked
    value="third"
    label="Third"
    group="MyToggleButtonGroup"
    labelledby="MyToggleButtonGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
</p>
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
  <ToggleButton label="First" value="first" />
  <ToggleButton label="Second" value="second" />
  <ToggleButton
    label="Third"
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

class UseOnTests extends PureComponent {
  render() {
    return typeof window !== 'undefined' && window.IS_TEST ? (
      <>
        <ComponentBox
          caption="Unchecked ToggleButton (Single ToggleButton buttons should not be used)"
          data-dnb-test="toggle-button-default"
        >
          {/* @jsx */ `
      <ToggleButton
      label="Single ToggleButton:"
      />
        `}
        </ComponentBox>
        <ComponentBox
          caption="Checked ToggleButton (Single ToggleButton buttons should not be used)"
          data-dnb-test="toggle-button-checked"
        >
          {/* @jsx */ `
      <ToggleButton
      label="Checked ToggleButton:"
      title="Ths is the title"
      checked
      on_change={({ checked }) => console.log(checked)}
      />
        `}
        </ComponentBox>
      </>
    ) : (
      <></>
    )
  }
}

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
  const [toggle-buttonIsEnabled, setState] = useState(false)
  useEffect(() => {
    const timer = setInterval(() => setState(!toggle-buttonIsEnabled), 1e3)
    return () => clearTimeout(timer)
  })
  return (<>
    <FormLabel
      id="toggle-button-1-label"
      for_id="toggle-button-1"
      text="ToggleButton label:"
    />
    <ToggleButton
      id="toggle-button-1"
      title_positive="Yes"
      title_negative="No"
      aria-labelledby="toggle-button-1-label"
      checked={toggle-buttonIsEnabled}
      on_state_update={({checked}) => {}}
      readOnly
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
