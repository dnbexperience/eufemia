/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

export const ToggleButtonUnchecked = () => (
  <ComponentBox data-visual-test="toggle-button-default">
    {
      /* @jsx */ `
<ToggleButton
  label="Label:"
  text="Toggle Me"
/>
`
    }
  </ComponentBox>
)

export const ToggleButtonChecked = () => (
  <ComponentBox data-visual-test="toggle-button-checked">
    {
      /* @jsx */ `
<ToggleButton
  label="Label:"
  text="Checked ToggleButton"
  checked
  on_change={({ checked }) => { console.log('on_change', checked) }}
/>
`
    }
  </ComponentBox>
)

export const ToggleButtonDefault = () => (
  <ComponentBox data-visual-test="toggle-button-group-default">
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const ToggleButtonMultiselect = () => (
  <ComponentBox data-visual-test="toggle-button-group-multiselect">
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const ToggleButtonVertical = () => (
  <ComponentBox data-visual-test="toggle-button-group-vertical">
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const ToggleButtonStatus = () => (
  <ComponentBox>
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const ToggleButtonStatusMessages = () => (
  <ComponentBox data-visual-test="toggle-button-group-status">
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const ToggleButtonDisabledGroup = () => (
  <ComponentBox data-visual-test="toggle-button-group-disabled">
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)

export const ToggleButtonSuffix = () => (
  <ComponentBox>
    {
      /* @jsx */ `
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
  `
    }
  </ComponentBox>
)
