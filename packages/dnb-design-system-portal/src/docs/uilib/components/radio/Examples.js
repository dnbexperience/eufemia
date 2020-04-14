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
        <UseOnTests />
        <ComponentBox title="Radio group" data-dnb-test="radio-group">
          {/* @jsx */ `
<Radio.Group
  label="Radio Group:"
  on_change={({ value }) => { console.log('on_change', value) }}
  value="first"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio
    label="Third"
    value="third"
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="Vertical aligned Radio group"
          data-dnb-test="radio-group-vertical"
        >
          {/* @jsx */ `
<Radio.Group
  label="Vertical Group:"
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio
    label="Third"
    value="third"
    checked
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="Radio group with status messages"
          data-dnb-test="radio-group-status"
        >
          {/* @jsx */ `
<Radio.Group
  label="Radio Group with status:"
  layout_direction="column"
  on_change={({ value }) => { console.log('on_change', value) }}
>
  <Radio
    label="First"
    value="first"
    status="error"
  />
  <Radio
    label="Second"
    value="second"
    status="Error message"
  />
  <Radio
    label="Third"
    value="third"
    checked
    status="Info message"
    status_state="info"
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox
          title="Plain Radio group without `<Radio.Group>`. It is recomended to use the `<Radio.Group>` if You are using **React**."
          data-dnb-test="radio-group-plain"
        >
          {/* @jsx */ `
<p className="dnb-p dnb-radio-group">
  <FormLabel id="MyRadioGroup">Plain Radio group:</FormLabel>
  <Radio
    value="first"
    label="First"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
  <Radio
    checked
    value="second"
    label="Second"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
  <Radio
    checked
    value="third"
    label="Third"
    group="MyRadioGroup"
    labelledby="MyRadioGroup"
    on_change={({ value, checked }) => { console.log('on_change', value, checked) }}
  />
</p>
          `}
        </ComponentBox>
        <ComponentBox
          title="Disabled Radio group with `label_position` set to left"
          data-dnb-test="radio-group-disabled"
        >
          {/* @jsx */ `
<Radio.Group
  label="Disabled Group:"
  disabled
  label_position="left"
  name="MyGroup"
>
  <Radio label="First" value="first" />
  <Radio label="Second" value="second" />
  <Radio
    label="Third"
    value="third"
    checked
  />
</Radio.Group>
          `}
        </ComponentBox>
        <ComponentBox title="Radio Buttons with suffix">
          {/* @jsx */ `
<Radio.Group
  label="With suffixes:"
  label_position="left"
>
  <Radio label="First" value="first" />
  <Radio
    label="Second"
    value="second"
    suffix={<Modal title="Modal Title">Modal content</Modal>}
  />
  <Radio
    label="Third"
    value="third"
    status="Error message"
    suffix={<Modal title="Modal Title">Modal content</Modal>}
    checked
  />
</Radio.Group>
          `}
        </ComponentBox>
        <StateDemo />
      </React.Fragment>
    )
  }
}

class UseOnTests extends React.PureComponent {
  render() {
    return typeof window !== 'undefined' && window.IS_TEST ? (
      <>
        <ComponentBox
          title="Unchecked Radio (Single Radio buttons should not be used)"
          data-dnb-test="radio-default"
        >
          {/* @jsx */ `
      <Radio
      label="Single Radio"
      />
        `}
        </ComponentBox>
        <ComponentBox
          title="Checked Radio (Single Radio buttons should not be used)"
          data-dnb-test="radio-checked"
        >
          {/* @jsx */ `
      <Radio
      label="Checked Radio"
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
  const [radioIsEnabled, setState] = React.useState(false)
  React.useEffect(() => {
    const timer = setInterval(() => setState(!radioIsEnabled), 1e3)
    return () => clearTimeout(timer)
  })
  return (<>
    <FormLabel
      id="radio-1-label"
      for_id="radio-1"
      text="Radio label:"
    />
    <Radio
      id="radio-1"
      aria-labelledby="radio-1-label"
      checked={radioIsEnabled}
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

export default Example
